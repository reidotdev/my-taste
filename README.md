# My Taste

A template for your own design taste library.

Designers now direct AI agents. Generic "make it less sloppy" skills make
output less bad, but they don't make it yours. You can't borrow someone
else's taste. You build your own by showing the AI what you consider good and
bad, one example at a time, each with a short rule.

This template gives you the format, the checks and the Claude skills. It
doesn't give you any taste. The library starts empty.

## How it works

Each entry is one example:

- An image of one element or pattern
- A verdict: **Do** or **Don't**
- A one-line rule, e.g. "Keep labels close to the field they describe."
- Optional: the product it comes from, tags, and a few notes

Entries are Markdown files in `entries/do/` and `entries/dont/`. They work in
git, on GitHub, and in an agent's context with no tooling.
`npm run build` turns them into `dist/entries.json` for a page or an MCP
server to read.

## Start your library

1. Create a repo from this template: **Use this template** on GitHub, or

   ```bash
   gh repo create my-taste --template reidotdev/my-taste --public --clone
   ```

2. Open it in Claude Code and say **"set up my taste library"**. The
   `taste-setup` skill asks for your name, site and categories.
3. Add entries: share an image and say **"add this to my taste, it's good
   because…"**. The `taste-capture` skill drafts the entry and saves it only
   after you approve.
4. Use it: in any design or front-end task, say **"use my taste"**. The
   `taste` skill applies your rules and tells you which ones it followed.

Start with 10 Do and 10 Don't from products you actually use.

## Skills

| Skill           | What it does                                                |
| --------------- | ----------------------------------------------------------- |
| `taste`         | Applies your library while designing, building or reviewing |
| `taste-capture` | Image in, draft entry out, saved only after you approve     |
| `taste-setup`   | Sets up a new, empty library from this template             |

## Commands

- `npm run check`: validates every entry (rule, image, file names, verdict)
- `npm run build`: checks, then writes `dist/entries.json`

No dependencies. Node 20 or newer.

## Coming next

- A Do / Don't page you can host at `yoursite.com/taste`
- An MCP server, so any agent can ask what your taste is
