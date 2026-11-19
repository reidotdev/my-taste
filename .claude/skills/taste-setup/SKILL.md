---
name: taste-setup
description: Set up a new, empty taste library for a designer, from the my-taste GitHub template. Use when someone says "set up my taste library", "start my taste", or has just created a repo from the my-taste template.
---

# taste-setup

Sets up a new taste library for one designer. The library always starts
empty: taste is built, not copied.

## Steps

1. **Check the repo.** It should be a copy of the my-taste template:
   `taste.config.json`, `entries/do/`, `entries/dont/` and `scripts/` exist.
   If they don't, tell the designer to create a repo from the template
   ("Use this template" on GitHub, or
   `gh repo create <name> --template reidotdev/my-taste --public --clone`)
   and stop.
2. **Ask for the basics:**
   - Name, as it should appear publicly
   - Where the page will live, e.g. `https://example.com/taste` (can be
     empty for now)
   - Whether there is or will be an MCP address (can be empty for now)
   - Starting categories. Offer the defaults in `taste.config.json` and let
     them add, remove or rename.
3. **Write `taste.config.json`** with the answers. Leave `assetBaseUrl` as
   `null` until the images are hosted somewhere.
4. **Make sure the library is empty.** `entries/do/` and `entries/dont/`
   hold only `.gitkeep`, and `assets/entries/` holds only `.gitkeep`. Never
   add example entries.
5. **Rewrite the README's first section** with the designer's name and one
   line on what the library is. Leave the rest.
6. **Run `npm run build`** and confirm it reports 0 entries.
7. **Commit:** `Set up taste library for <name>`.
8. **Explain the next step:** add entries with the `taste-capture` skill,
   one image at a time. Suggest a first goal of 10 Do and 10 Don't, from
   real products they use, not from inspiration sites.

## Never

- Pre-fill entries, even as examples
- Copy entries from another designer's library
- Push to a remote the designer hasn't set up themselves
