# General design system

Guidelines for building a client landing page — any client, any brand.

It is the method, not one company's colours. Fill in the brand block at the top
of [`CLAUDE.md`](CLAUDE.md) with the client's actual values and everything after
it applies as written: the build discipline, the token architecture, the type
scale, the accessibility floor, the responsive range, the code style, and the
habit of writing decisions down.

**→ [CLAUDE.md](CLAUDE.md)** — the guidelines themselves.
**→ [tokens.template.css](tokens.template.css)** — the `:root` skeleton to fill in.

---

## How to use it

1. **Copy `CLAUDE.md` into the project** and fill in the brand block. If the
   client has a live site, take the values out of its stylesheet — not out of a
   screenshot and not out of a brand PDF. A brand guide says the blue is one
   thing; the site has been shipping something slightly different for three
   years, and that is what people recognise.

2. **Copy `tokens.template.css`** to the top of the project's `styles.css` and
   fill in the primitives. Everything under it reads the semantic layer, so a
   dark band re-points names rather than each component needing a dark variant.

3. **Build.** The rules cover the rest.

4. **Write the decisions down** as you make them — `decisions/`, numbered, one
   per file, with the template in §14. Six months later that folder is the
   difference between a system and a pile of CSS nobody dares touch.

## Installing it for an AI assistant

Wherever your tool reads always-on rules:

| Tool | Path |
| --- | --- |
| Claude Code | `CLAUDE.md` at the repo root — loads automatically |
| Claude.ai | Project instructions, with `tokens.template.css` as knowledge |
| Cursor | `.cursorrules` |
| Codex | `AGENTS.md` |
| Copilot | `.github/copilot-instructions.md` |

There is nothing tool-specific in the content — it is Markdown and CSS.

---

## What it does and does not decide

**Decided here**, because it holds for every brand: the 16px body floor, the
66ch measure, the `clamp()` size ranges, the focus ring, `:user-invalid` over
`:invalid`, native `<details>` over an accordion script, reduced-motion
behaviour, the 320→5120px range, no leading zeros, no external requests, and
that the page carries the source copy and nothing else.

**Left to the brand block**: every colour, the typeface, the corner radius, the
shell width, and the facts the page is allowed to state.

**Left to the project**: the sections, the voice, and anything the client's own
system already settles. Where this document and the client's live stylesheet
disagree, the stylesheet wins.

---

## A worked example

[`imageworksc/iwc-design-system`](https://github.com/imageworksc/iwc-design-system)
is this method applied to one client across nine pages — the same structure with
the blanks filled in, plus ten decision records showing what that folder looks
like in practice once real choices have been made.

Useful to read alongside this, particularly the two records covering deliberate
exceptions: they are the model for how to disagree with a guideline on purpose
rather than by accident.

---

## Licence

MIT — see [LICENSE](LICENSE).

Author: **Sam Aponte**
