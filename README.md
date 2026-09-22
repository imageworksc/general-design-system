# Structural design system

Space, size, measure, grid and layout for any brand.

**There is not one colour and not one typeface in it.** Those change with every
client. What does not change is the geometry — how far apart things sit, how
large text gets, how wide a line may run, how a layout divides, and how all of
it behaves from a 320px phone to a 5K display.

Two stylesheets:

| | |
| --- | --- |
| **[`system.css`](system.css)** | The geometry. Complete, no blanks, drop it in as-is. |
| **[`brand.template.css`](brand.template.css)** | The paint. Only blanks — colours, the typeface, the one radius. |

And **[`CLAUDE.md`](CLAUDE.md)** — the guidelines behind both, written so an AI
assistant or a new developer works inside the system instead of around it.

**[`decisions/`](decisions/)** holds eight records on the choices that shape
more than the rule they sit on — why the root steps, why the shell stops, why a
4K display gets no extra columns. Read the record before overruling a rule;
most of what looks arbitrary was measured.

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

## Using it

```html
<link rel="stylesheet" href="system.css">
<link rel="stylesheet" href="brand.css">   <!-- your filled-in copy -->
```

1. **Drop in `system.css` unchanged.** It has no blanks.
2. **Copy `brand.template.css` to `brand.css`** and fill in the primitives.
   Take the values out of the client's live stylesheet — not a screenshot, not
   a brand PDF. A brand guide says the blue is one thing; the site has been
   shipping something slightly different for years, and that is what people
   recognise.
3. **Build** with the layout primitives — `.wrap`, `.band`, `.stack`,
   `.cluster`, `.split` — and the twelve-column `.grid`.
4. **Write the decisions down** as you make them, in [`decisions/`](decisions/).
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

## Installing it for an AI assistant

Wherever your tool reads always-on rules:

| Tool | Path |
| --- | --- |
| Claude Code | `CLAUDE.md` at the repo root — loads automatically |
| Claude.ai | Project instructions, with both stylesheets as knowledge |
| Cursor | `.cursorrules` |
| Codex | `AGENTS.md` |
| Copilot | `.github/copilot-instructions.md` |

Nothing in the content is tool-specific — it is Markdown and CSS.

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
