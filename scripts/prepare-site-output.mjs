import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const outputDirectory = resolve("out");
const deploymentDirectory = resolve("dist");

if (!existsSync(outputDirectory)) {
  throw new Error("Next.js did not create the out directory.");
}

rmSync(deploymentDirectory, { force: true, recursive: true });
cpSync(outputDirectory, deploymentDirectory, { recursive: true });
