import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const outputDirectory = resolve("out");
const deploymentDirectory = resolve("dist");

if (!existsSync(outputDirectory)) {
  throw new Error("Next.js did not create the out directory.");
}

rmSync(deploymentDirectory, { force: true, recursive: true });
cpSync(outputDirectory, deploymentDirectory, { recursive: true });

const serverDirectory = resolve("dist/server");
mkdirSync(serverDirectory, { recursive: true });
writeFileSync(
  resolve(serverDirectory, "index.js"),
  `const staticAsset = (env, request, pathname) => {
  const url = new URL(request.url);
  url.pathname = pathname;
  return env.ASSETS.fetch(new Request(url, request));
};

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const pathname = new URL(request.url).pathname;
    const candidates = pathname.endsWith("/")
      ? [pathname + "index.html"]
      : [pathname + "/index.html", pathname + ".html"];

    for (const candidate of candidates) {
      const fallback = await staticAsset(env, request, candidate);
      if (fallback.status !== 404) return fallback;
    }

    return response;
  },
};
`,
);
