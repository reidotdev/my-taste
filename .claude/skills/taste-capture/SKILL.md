---
name: taste-capture
description: Turn an image into a Do or Don't entry in this taste library, and save it only after the owner approves. Use when the owner shares an image (screenshot, photo, file path or URL) and says things like "add to my taste", "this is good", "this is bad", "do", "don't", or "capture this".
---

# taste-capture

Turns one example image into one entry for the owner's taste library. Nothing
is saved until the owner approves the draft.

## Input

- **An image**, as a file path in the repo or on disk, a URL, or an image
  pasted into the conversation
- **Optional:** the verdict (good or bad), the product it comes from, and a
  short note in the owner's own words about why

## Steps

1. **Get the image as a file.** You need a real file to save. Use the path or
   download the URL. If the image is only pasted into the conversation, you
   can see it but cannot write its bytes to disk: ask the owner for a file
   path or URL. Never draw, recreate or substitute the image.
2. **Look at the image.** Work out which single element or pattern it is
   about. If it shows several things, ask which one the entry is for.
3. **Get the verdict.** If the owner said good/bad or do/don't, use it. If
   not, ask. Never guess the verdict.
4. **Draft the entry**, following `templates/entry.md`:
   - `id`: short kebab-case name for the pattern, e.g. `tight-label-spacing`
   - `verdict`: `do` or `dont`
   - `rule`: one line, under 140 characters, written like a rule. If the owner
     gave a reason, keep their wording and only tighten it. If not, propose
     one and mark it as your suggestion.
   - `category`: one of the categories in `taste.config.json`
   - `tags`: two to four short tags
   - `product`: only if it is visible in the image or the owner named it
   - `image`: `assets/entries/<id>.<ext>`
   - `created`: today, `YYYY-MM-DD`
   - notes (body): only what the rule doesn't cover, such as which part of
     the screenshot matters
5. **Check for near-duplicates.** Read the existing rules in `entries/`. If
   one says nearly the same thing, show it and ask whether to merge, replace
   or keep both.
6. **Show the draft for approval.** Show the full entry as it will be saved,
   including the file names. Say which fields are your suggestions. The owner
   can edit any field, especially the rule.
7. **On approval:**
   - Copy the image to `assets/entries/<id>.<ext>`
   - Write `entries/<verdict>/<created>-<id>.md` with `status: approved`
   - Run `npm run check` and fix anything it reports
   - Commit both files: `Add <do|dont>: <id>`
8. **On rejection:** discard the draft and the copied image. Nothing is
   written to the repo.

## Rules

- No approval, no entry. "Looks good", "yes" or "approve" counts. Silence or
  a change request does not.
- Only approved entries go in the repo. There are no drafts in `entries/`.
- One entry per image and one pattern per entry.
- The rule is the owner's taste, not general best practice. Don't add rules
  the owner didn't approve.
- Image file names describe the image in kebab-case. `IMG_4821.png` is not
  acceptable.
- Never upload, publish or push anywhere other than this repo's normal remote.
