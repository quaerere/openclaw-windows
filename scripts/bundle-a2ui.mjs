#!/usr/bin/env node
/**
 * A2UI bundle script (Node.js). Use when bash is unavailable (e.g. Windows).
 * Same behavior as scripts/bundle-a2ui.sh.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HASH_FILE = path.join(ROOT_DIR, "src/canvas-host/a2ui/.bundle.hash");
const OUTPUT_FILE = path.join(ROOT_DIR, "src/canvas-host/a2ui/a2ui.bundle.js");
const A2UI_RENDERER_DIR = path.join(ROOT_DIR, "vendor/a2ui/renderers/lit");
const A2UI_APP_DIR = path.join(ROOT_DIR, "apps/shared/OpenClawKit/Tools/CanvasA2UI");

function onError() {
  console.error("A2UI bundling failed. Re-run with: pnpm canvas:a2ui:bundle");
  console.error("If this persists, verify pnpm deps and try again.");
}

try {
  if (!existsSync(A2UI_RENDERER_DIR) || !existsSync(A2UI_APP_DIR)) {
    if (existsSync(OUTPUT_FILE)) {
      console.log("A2UI sources missing; keeping prebuilt bundle.");
      process.exit(0);
    }
    console.error(`A2UI sources missing and no prebuilt bundle found at: ${OUTPUT_FILE}`);
    process.exit(1);
  }

  const INPUT_PATHS = [
    path.join(ROOT_DIR, "package.json"),
    path.join(ROOT_DIR, "pnpm-lock.yaml"),
    A2UI_RENDERER_DIR,
    A2UI_APP_DIR,
  ];

  function walk(entryPath, files) {
    const st = statSync(entryPath);
    if (st.isDirectory()) {
      for (const entry of readdirSync(entryPath)) {
        walk(path.join(entryPath, entry), files);
      }
      return;
    }
    files.push(entryPath);
  }

  const files = [];
  for (const input of INPUT_PATHS) {
    walk(input, files);
  }

  function normalize(p) {
    return p.split(path.sep).join("/");
  }
  files.sort((a, b) => normalize(a).localeCompare(normalize(b)));

  const hash = createHash("sha256");
  for (const filePath of files) {
    const rel = normalize(path.relative(ROOT_DIR, filePath));
    hash.update(rel);
    hash.update("\0");
    hash.update(readFileSync(filePath));
    hash.update("\0");
  }
  const currentHash = hash.digest("hex");

  if (existsSync(HASH_FILE) && existsSync(OUTPUT_FILE)) {
    const previousHash = readFileSync(HASH_FILE, "utf8").trim();
    if (previousHash === currentHash) {
      console.log("A2UI bundle up to date; skipping.");
      process.exit(0);
    }
  }

  execSync(`pnpm -s exec tsc -p "${path.join(A2UI_RENDERER_DIR, "tsconfig.json")}"`, {
    stdio: "inherit",
    cwd: ROOT_DIR,
    shell: true,
  });

  let rolldownRan = false;
  try {
    execSync("rolldown --version", { stdio: "pipe" });
    execSync(`rolldown -c "${path.join(A2UI_APP_DIR, "rolldown.config.mjs")}"`, {
      stdio: "inherit",
      cwd: ROOT_DIR,
      shell: true,
    });
    rolldownRan = true;
  } catch (_) {
    // rolldown not in PATH
  }
  if (!rolldownRan) {
    execSync(`pnpm -s dlx rolldown -c "${path.join(A2UI_APP_DIR, "rolldown.config.mjs")}"`, {
      stdio: "inherit",
      cwd: ROOT_DIR,
      shell: true,
    });
  }

  writeFileSync(HASH_FILE, currentHash, "utf8");
} catch (err) {
  onError();
  throw err;
}
