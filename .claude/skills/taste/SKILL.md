---
name: taste
description: Apply a designer's own taste library (Do and Don't rules) while designing UI, writing front-end code, or reviewing a design, page or screenshot. Use when the user says "use my taste", "check this against my taste", "review this", or is designing or building interface work in a project that has a taste library or a taste MCP server.
---

# taste

Applies one designer's taste library to design and review work. The library
is a set of Do and Don't entries, each with a one-line rule.

## Load the library

Use the first source that is available:

1. **MCP:** if a taste MCP server is connected, call `get_taste_summary`. It
   returns every rule grouped by Do and Don't. Call `get_entry` when you need
   an entry's notes or image.
2. **This repo:** read every file in `entries/do/` and `entries/dont/`. The
   `rule` field is the main content. Notes add context.
3. **A built file:** read `entries.json` from the site, e.g.
   `<site>/entries.json`.

If none is available, say so and stop. Don't fall back to general taste.

## While designing or building

1. Pick the rules that apply to the task, by category and tags. For a form,
   that's `forms`, `spacing`, `typography`, `copy` and similar.
2. Follow the Do rules and avoid the Don't patterns.
3. When you're done, list the rules that shaped the result, by entry id:
   "Followed `tight-label-spacing`, avoided `centered-body-text`."
4. If the task needs a decision the library doesn't cover, say so. Make the
   call yourself and label it as yours, not the designer's.

## While reviewing

1. Go through the work against the relevant rules.
2. For each problem, cite the entry: what you saw, which rule it breaks
   (id and rule text), and a concrete fix.
3. Also say which Do rules the work already follows.
4. Group the findings by category. Keep each one to a line or two.

## Never

- Invent rules or present general best practice as the designer's taste
- Change, add or delete entries. Adding entries is the `taste-capture` skill.
- Overrule an explicit instruction from the user because of a rule. Point out
  the conflict and follow the user.
