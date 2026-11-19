// Shared helpers for check-entries and build-json. No dependencies.
//
// Entry frontmatter uses a small, strict subset of YAML on purpose:
//   key: value              plain or "quoted" string
//   key: [a, b, c]          inline list
//   key:                    empty (treated as missing)
//   # comment               full-line or after a value, preceded by a space
// Anything else (nested maps, multi-line strings) is rejected by the check.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const VERDICTS = ["do", "dont"];

export function loadConfig() {
  const path = join(ROOT, "taste.config.json");
  if (!existsSync(path)) throw new Error("taste.config.json is missing");
  return JSON.parse(readFileSync(path, "utf8"));
}

function stripComment(raw) {
  const value = raw.trim();
  const q = value.match(/^(["'])(.*?)\1/);
  if (q) return q[0];
  const i = value.search(/\s#/);
  return i === -1 ? value : value.slice(0, i);
}

function parseValue(raw) {
  const value = stripComment(raw).trim();
  if (value === "") return undefined;
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (inner === "") return [];
    return inner.split(",").map((item) => unquote(item.trim()));
  }
  return unquote(value);
}

function unquote(value) {
  const m = value.match(/^(["'])(.*)\1$/);
  return m ? m[2] : value;
}

/** Parse one entry file. Returns { data, body, errors }. */
export function parseEntry(text) {
  const errors = [];
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: "", errors: ["no frontmatter block (--- ... ---)"] };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (line.trim() === "" || line.trim().startsWith("#")) continue;
    const kv = line.match(/^([a-z][a-z0-9-]*):(.*)$/);
    if (!kv) {
      errors.push(`unsupported frontmatter line: "${line}"`);
      continue;
    }
    data[kv[1]] = parseValue(kv[2]);
  }
  return { data, body: m[2].trim(), errors };
}

/** Every entry file under entries/do and entries/dont. */
export function listEntryFiles() {
  const files = [];
  for (const folder of VERDICTS) {
    const dir = join(ROOT, "entries", folder);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir).sort()) {
      if (name.endsWith(".md")) files.push({ folder, name, path: join(dir, name) });
    }
  }
  return files;
}

export function readEntries() {
  return listEntryFiles().map((file) => ({
    ...file,
    ...parseEntry(readFileSync(file.path, "utf8")),
  }));
}

export const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const DATE = /^\d{4}-\d{2}-\d{2}$/;
export const stem = (name) => basename(name).replace(/\.[^.]+$/, "");
