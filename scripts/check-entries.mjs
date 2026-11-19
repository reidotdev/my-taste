// Validates every entry in entries/. Exits 1 on any error.
// Run: npm run check

import { existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, VERDICTS, KEBAB, DATE, stem, loadConfig, readEntries } from "./lib.mjs";

const MAX_RULE = 140;
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

const config = loadConfig();
const categories = config.categories ?? [];
const problems = [];
const seen = new Map();

const entries = readEntries();

for (const entry of entries) {
  const where = `entries/${entry.folder}/${entry.name}`;
  const fail = (msg) => problems.push(`${where}: ${msg}`);
  const d = entry.data;

  entry.errors.forEach(fail);

  for (const key of ["id", "verdict", "rule", "category", "image", "created", "status"]) {
    if (d[key] === undefined) fail(`missing "${key}"`);
  }

  if (d.id !== undefined) {
    if (!KEBAB.test(d.id)) fail(`id "${d.id}" is not kebab-case`);
    if (seen.has(d.id)) fail(`id "${d.id}" is also used by ${seen.get(d.id)}`);
    seen.set(d.id, where);
    const expected = d.created ? `${d.created}-${d.id}` : d.id;
    if (stem(entry.name) !== expected) fail(`file name should be "${expected}.md"`);
  }

  if (d.verdict !== undefined) {
    if (!VERDICTS.includes(d.verdict)) fail(`verdict must be "do" or "dont", got "${d.verdict}"`);
    else if (d.verdict !== entry.folder) fail(`verdict "${d.verdict}" but file is in entries/${entry.folder}/`);
  }

  if (typeof d.rule === "string") {
    if (d.rule.length > MAX_RULE) fail(`rule is ${d.rule.length} characters; keep it under ${MAX_RULE}`);
  } else if (d.rule !== undefined) fail("rule must be a single line of text");

  if (d.category !== undefined && categories.length && !categories.includes(d.category)) {
    fail(`category "${d.category}" is not in taste.config.json (${categories.join(", ")})`);
  }

  if (typeof d.image === "string") {
    if (!d.image.startsWith("assets/entries/")) fail("image must be under assets/entries/");
    if (!IMAGE_EXT.test(d.image)) fail(`image "${d.image}" is not an image file`);
    if (!KEBAB.test(stem(d.image))) fail(`image file name "${stem(d.image)}" is not kebab-case`);
    if (!existsSync(join(ROOT, d.image))) fail(`image "${d.image}" does not exist`);
  }

  if (d.created !== undefined && !DATE.test(d.created)) fail(`created "${d.created}" is not YYYY-MM-DD`);

  if (d.status !== undefined && d.status !== "approved") {
    fail(`status is "${d.status}"; only approved entries belong in the library`);
  }

  if (d.tags !== undefined && !Array.isArray(d.tags)) fail("tags must be a list, e.g. [spacing, forms]");
}

if (problems.length) {
  console.error(`${problems.length} problem(s) in ${entries.length} entries:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const count = (v) => entries.filter((e) => e.folder === v).length;
console.log(`OK: ${entries.length} entries (${count("do")} do, ${count("dont")} dont)`);
