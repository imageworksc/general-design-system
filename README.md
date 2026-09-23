# Structural design system

Space, size, measure, grid and layout for any brand.

**There is not one colour and not one typeface in it.** Those change with every
client. What does not change is the geometry — how far apart things sit, how
large text gets, how wide a line may run, how a layout divides, and how all of
it behaves from a 320px phone to a 5K display.

---

## Start here — download `CLAUDE.md`

**[`CLAUDE.md`](CLAUDE.md) is the file to download.** It is the entire system in
one Markdown file. Put it where your AI assistant reads its always-on rules and
every page it builds from then on follows the system — the spacing scale, the
type ladder, the grid, the 4K behaviour, the accessibility floor, all of it.

```bash
curl -O https://raw.githubusercontent.com/imageworksc/general-design-system/main/CLAUDE.md
```

Or open [CLAUDE.md](CLAUDE.md) here in GitHub and use the **download raw file**
button at the top right of the file view.

### Where to put it

| Tool | Put it at | What happens |
| --- | --- | --- |
| **Claude Code** | `CLAUDE.md` in your project root | Loads automatically at the start of every session in that repo. Nothing to invoke, nothing to remember. |
| **Claude.ai / Claude desktop** | Project → **Set project instructions** → paste the whole file | Read on every message in that project. On a Team plan, share the project so everyone works from one copy instead of their own. |
| **Cursor** | `.cursorrules` | |
| **Codex** | `AGENTS.md` | |
| **Copilot** | `.github/copilot-instructions.md` | |

### Then just ask for the page

> Build a landing page from the attached copy.

The rules are already loaded. You do not have to repeat them, paste them, or
remember which ones matter for this particular page — and neither does the next
person on the team.

**That one file is enough to start.** Everything else in this repo is what you
add when you want more:

- [`system.css`](system.css) + [`brand.template.css`](brand.template.css) — the
  actual stylesheets, if you want the geometry as code rather than as rules
- [`.claude/skills/client-page/`](.claude/skills/client-page/SKILL.md) — the
  build procedure as an invocable skill, `/client-page`
- [`decisions/`](decisions/) — why the rules are what they are

Nothing in the content is tool-specific. It is Markdown and CSS.

---

## What ships

| | |
| --- | --- |
| **[`CLAUDE.md`](CLAUDE.md)** | **The guidelines.** The file to download — the whole system, readable on its own. |
| **[`system.css`](system.css)** | The geometry. Complete, no blanks, drop it in as-is. |
| **[`brand.template.css`](brand.template.css)** | The paint. Only blanks — colours, the typeface, the one radius. |
| **[`index.template.html`](index.template.html)** | A starter page with the primitives already assembled: hero, a card grid, a split, a ruled list, a FAQ, a form and a closing band. |
| **[`reveal.js`](reveal.js)** | Scroll entrances, if the page uses them. Delete it if not. |
| **[`.claude/skills/client-page/`](.claude/skills/client-page/SKILL.md)** | The build procedure as an invocable skill. |
| **[`decisions/`](decisions/)** | Eight records on the choices that shape more than the rule they sit on. Read the record before overruling a rule; most of what looks arbitrary was measured. |

---

## The idea

Everything structural is in `rem`, and the root font size steps at four widths:

```css
html { font-size: 100%; }                                   /* 16px */
@media (min-width: 1800px) { html { font-size: 112.5%; } }  /* 18px */
@media (min-width: 2400px) { html { font-size: 125%; } }    /* 20px */
@media (min-width: 3200px) { html { font-size: 143.75%; } } /* 23px */
```

That is the whole mechanism. The column, the type, the gaps and the control
heights all rise together, so a large display is not re-laid-out — it is
**scaled**, and the proportions tuned at the design width survive intact.

A line of prose measures the same 66 characters on a phone and on a 5K panel.

It also means there is no wall of per-breakpoint overrides. One rule moves
everything.

| | Root | Shell | Body | H1 | Typical display |
| --- | --- | --- | --- | --- | --- |
| base | 16px | 1180px | 17 | 56 | up to 1920 |
| ≥1800 | 18px | 1327px | 19 | 63 | 1920 at 100% |
| ≥2400 | 20px | 1475px | 21 | 70 | 5K default, 4K at 150% |
| ≥3200 | 23px | 1696px | 24.5 | 81 | 4K at 100% |

The shell stops growing around 1700px and there is no step for 5120px. Past
that, extra width only lengthens the line — a 5K viewport gets generous
margins, and that is the right answer rather than a compromise.

---

## Building a page with the stylesheets

```html
<link rel="stylesheet" href="system.css">
<link rel="stylesheet" href="brand.css">   <!-- your filled-in copy -->
```

1. **Start from `index.template.html`.** It carries the skip link, the icon
   sheet and six section shapes. Delete what the copy does not need rather
   than inventing what it does not have.
2. **Drop in `system.css` unchanged.** It has no blanks.
3. **Copy `brand.template.css` to `brand.css`** and fill in the primitives.
   Take the values out of the client's live stylesheet — not a screenshot, not
   a brand PDF. A brand guide says the blue is one thing; the site has been
   shipping something slightly different for years, and that is what people
   recognise.
4. **Build** with the layout primitives — `.wrap`, `.band`, `.stack`,
   `.cluster`, `.split` — and the twelve-column `.grid`.
5. **Write the decisions down** as you make them, in [`decisions/`](decisions/).
   Template in that folder, and in CLAUDE.md §12.

### What goes where

| Changing | File |
| --- | --- |
| a colour, the typeface, the radius | `brand.css` |
| a size, a gap, a width, a breakpoint | `system.css` — and it changes for every client |
| this page's own sizes | the page's own block, behind a prefix |

If the brand layer wants to move a size, the geometry is wrong. Fix it in
`system.css` rather than letting one client drift.

---

## Testing the range

Set the viewport width directly rather than trusting a device preset:

```
320 · 360 · 390 · 430 · 640 · 768 · 960 · 1180 · 1440 · 1920 · 2560 · 3840 · 5120
```

At each: no horizontal overflow, every disclosure open, and read a paragraph.

**Test in CSS pixels, not device pixels.** A 4K laptop at 200% scaling reports
1920 CSS pixels and is a 1920 display as far as the page is concerned. A 27"
4K monitor at 100% reports 3840, and that is what the large steps are for. If
nothing changes on your 4K screen, check the OS scaling before changing the CSS.

---

## A worked example

[`imageworksc/iwc-design-system`](https://github.com/imageworksc/iwc-design-system)
is a complete system for one client — the same thinking with a brand attached,
plus ten decision records showing what that folder looks like once real choices
have been made.

---

## Licence

MIT — see [LICENSE](LICENSE).

Author: **Sam Aponte**
