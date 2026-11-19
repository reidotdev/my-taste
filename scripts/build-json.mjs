// Builds dist/entries.json from entries/. This file is what the page and
// the MCP server read. Run `npm run check` first; build stops on bad entries.
// Run: npm run build

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT, loadConfig, readEntries } from "./lib.mjs";

execFileSync(process.execPath, [join(ROOT, "scripts", "check-entries.mjs")], { stdio: "inherit" });

const config = loadConfig();
const assetBase = (config.assetBaseUrl ?? "").replace(/\/$/, "");

const entries = readEntries()
  .map(({ data: d, body }) => ({
    id: d.id,
    verdict: d.verdict,
    rule: d.rule,
    category: d.category,
    tags: d.tags ?? [],
    product: d.product ?? null,
    image: assetBase ? `${assetBase}/${d.image}` : d.image,
    notes: body || null,
    created: d.created,
  }))
  .sort((a, b) => (a.created === b.created ? a.id.localeCompare(b.id) : b.created.localeCompare(a.created)));

const out = {
  owner: config.owner,
  site: config.site ?? null,
  mcp: config.mcp ?? null,
  categories: config.categories ?? [],
  counts: {
    do: entries.filter((e) => e.verdict === "do").length,
    dont: entries.filter((e) => e.verdict === "dont").length,
  },
  entries,
};

mkdirSync(join(ROOT, "dist"), { recursive: true });
writeFileSync(join(ROOT, "dist", "entries.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote dist/entries.json (${entries.length} entries)`);
