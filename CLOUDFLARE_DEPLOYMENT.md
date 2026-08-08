# Cloudflare Pages deployment

This project now builds as a static Next.js export in `out/` and includes a Cloudflare Pages Function at `/api/save-email`.

## Pages setup

Create a Cloudflare Pages project connected to this repository with:

- Build command: `npm run build`
- Build output directory: `out`
- Production branch: `master`

The root `wrangler.jsonc` records the output directory for Wrangler-based deployments. Do not use dashboard drag-and-drop for this project because the `functions/` directory must be compiled by Wrangler or Git integration.

## Required encrypted secrets/variables

Add these under Cloudflare Pages → Settings → Variables and Secrets for both Production and Preview as appropriate:

- `RESEND_API_KEY` — encrypted Resend API key
- `GOOGLE_SCRIPT_WEBHOOK_URL` — encrypted Google Apps Script web-app URL that writes to the existing Sheet
- `ALLOWED_ORIGINS` — comma-separated site origins, for example `https://reparent.app,https://www.reparent.app`
- `SITE_URL` — public site URL, for example `https://reparent.app`
- `RESEND_FROM_EMAIL` — verified Resend sender, for example `Reparent <guides@reparent.app>`

The endpoint will reject requests from origins not listed in `ALLOWED_ORIGINS`. The client-side honeypot, JSON-only body, 8 KB body limit, email validation, archetype allowlist, and optional `LEAD_RATE_LIMITER` binding provide baseline abuse protection. Configure `LEAD_RATE_LIMITER` later if the public form needs stronger rate limiting.

## Google Apps Script payload

The existing webhook receives this structured JSON shape:

```json
{
  "schemaVersion": "1",
  "source": "reparent-assessment",
  "email": "person@example.com",
  "archetype": "Overgiver",
  "timestamp": "2026-08-08T00:00:00.000Z",
  "userAgent": "..."
}
```

Keep the webhook's existing `doPost` behavior compatible with these fields. The site does not send Resend or Google credentials to the browser.

## Local validation

Build the static site with:

```bash
npm run build
```

For local Pages Function testing, install/use Wrangler and run:

```bash
npx wrangler pages dev out
```

Do not commit `.dev.vars` or any API keys. DNS changes and deployment are intentionally not part of this repository change.
