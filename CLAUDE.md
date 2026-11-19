# Taste library — operating manual

This repo is one designer's taste library: examples of what they consider good
(Do) and bad (Don't), each with a one-line rule. Agents read it to design and
review the way this designer would.

## Layout

```
taste.config.json      owner, site, mcp, categories
entries/do/            one Markdown file per Do entry
entries/dont/          one Markdown file per Don't entry
assets/entries/        the example images
templates/entry.md     the entry format
scripts/               check-entries (validation), build-json (dist/entries.json)
.claude/skills/        taste, taste-capture, taste-setup
```

## Rules

- **Only the owner decides what goes in.** Add entries with the
  `taste-capture` skill, and only after the owner approves the draft.
- **Only approved entries are committed.** No drafts in `entries/`.
- **One entry, one pattern, one rule.** The rule is one line, under 140
  characters, written like a rule.
- **File names:** `entries/<verdict>/<created>-<id>.md` and
  `assets/entries/<id>.<ext>`, all kebab-case.
- **Run `npm run check`** after any change to `entries/` or `assets/`. It
  must pass before committing.
- **Never invent taste.** When applying the library (the `taste` skill), cite
  entries by id and label anything the library doesn't cover as your own call.

## Commands

- `npm run check`: validate every entry
- `npm run build`: check, then write `dist/entries.json` for the page and MCP
