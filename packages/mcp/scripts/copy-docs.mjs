#!/usr/bin/env node
/**
 * Copies docs content into dist/docs for the published package.
 * Only copies components, composables, and guide to keep package size small.
 */
import { cpSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const repoDocs = join(__dirname, "..", "..", "..", "docs");
const distDocs = join(__dirname, "..", "dist", "docs");

if (!existsSync(repoDocs)) {
  console.warn("packages/mcp: docs/ not found, skipping copy");
  process.exit(0);
}

for (const dir of ["components", "composables", "guide"]) {
  const src = join(repoDocs, dir);
  const dest = join(distDocs, dir);
  if (existsSync(src)) {
    mkdirSync(join(distDocs), { recursive: true });
    cpSync(src, dest, { recursive: true });
    console.log(`packages/mcp: copied docs/${dir}`);
  }
}
