import { getReparentEmail } from "../../app/lib/email-template.js";

const MAX_BODY_BYTES = 8192;
const ARCHETYPES = new Set([
  "Overgiver",
  "Controller",
  "Avoider",
  "Conscious",
  "Unknown",
]);

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

function isAllowedOrigin(origin, env) {
  return Boolean(origin) && allowedOrigins(env).includes(origin);
}

function headers(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: headers(origin),
  });
}

function validEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email);
}

async function rateLimit(request, env) {
  if (!env.LEAD_RATE_LIMITER?.limit) return true;
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const result = await env.LEAD_RATE_LIMITER.limit({ key: `lead:${ip}` });
  return result.success;
}

async function saveLead(env, lead) {
  const response = await fetch(env.GOOGLE_SCRIPT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!response.ok)
    throw new Error(`Google Apps Script returned ${response.status}`);
}

async function sendGuide(env, email, archetype, userName) {
  const siteUrl = (
    env.SITE_URL ||
    env.NEXT_PUBLIC_SITE_URL ||
    "https://reparent.app"
  ).replace(/\/$/, "");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL || "Reparent <onboarding@resend.dev>",
      to: [email],
      subject: `Your Reparent Guide: ${archetype || "Your Journey Begins"}`,
      html: getReparentEmail(archetype, userName, siteUrl),
    }),
  });
  if (!response.ok) throw new Error(`Resend returned ${response.status}`);
}

export function onRequestOptions({ request, env }) {
  const origin = request.headers.get("Origin") || "";
  return isAllowedOrigin(origin, env)
    ? new Response(null, { status: 204, headers: headers(origin) })
    : new Response(null, { status: 403 });
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin") || "";
  if (!isAllowedOrigin(origin, env))
    return json({ error: "Forbidden" }, 403, origin);
  if (!request.headers.get("Content-Type")?.startsWith("application/json")) {
    return json({ error: "JSON is required" }, 415, origin);
  }
  if (!(await rateLimit(request, env)))
    return json({ error: "Too many requests" }, 429, origin);

  let payload;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return json({ error: "Request is too large" }, 413, origin);
    }
    payload = JSON.parse(body);
  } catch {
    return json({ error: "Invalid request" }, 400, origin);
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return json({ success: true }, 202, origin);
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const userName =
    typeof payload.userName === "string"
      ? payload.userName.trim().slice(0, 120)
      : "";
  const archetype = ARCHETYPES.has(payload.archetype)
    ? payload.archetype
    : "Unknown";
  if (!validEmail(email))
    return json({ error: "A valid email is required" }, 400, origin);
  if (!env.GOOGLE_SCRIPT_WEBHOOK_URL || !env.RESEND_API_KEY) {
    console.error("Lead endpoint is missing required secrets");
    return json({ error: "Lead service is not configured" }, 503, origin);
  }

  const lead = {
    schemaVersion: "1",
    source: "reparent-assessment",
    email,
    archetype,
    timestamp: new Date().toISOString(),
    userAgent: (request.headers.get("User-Agent") || "unknown").slice(0, 256),
  };

  const [sheet, emailResult] = await Promise.allSettled([
    saveLead(env, lead),
    sendGuide(env, email, archetype, userName),
  ]);
  if (sheet.status === "rejected") console.error("Lead storage failed");
  if (emailResult.status === "rejected") console.error("Guide email failed");
  if (sheet.status === "rejected" || emailResult.status === "rejected") {
    return json({ error: "Lead delivery failed" }, 502, origin);
  }

  return json({ success: true }, 200, origin);
}
