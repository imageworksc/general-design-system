# Structural design system

Space, size, measure, grid and layout for any brand.

**There is not one colour and not one typeface in this system, and there should
never be.** Those belong to the brand and change with every client. What does
not change is the geometry: how far apart things sit, how large text gets, how
wide a line is allowed to run, how a layout divides, and how all of it behaves
from a 320px phone to a 5K display.

Drop in [`system.css`](system.css), add the brand's palette and typeface on
top, and the structure is already settled.

---

## 1. What this owns, and what it does not

| This system decides | The brand decides |
| --- | --- |
| The spacing scale and every gap | Every colour |
| Type **sizes**, line heights, tracking | The **typeface** |
| Line length and column widths | Weight choices within the scale |
| The grid and how it collapses | Border and shadow *style* |
| Control heights, insets, icon sizes | The corner radius value |
| Every breakpoint, mobile through 5K | Tone, imagery, iconography |
| Focus ring geometry, touch targets | Focus ring colour |

The brand layer is a second stylesheet that assigns colour to the semantic
slots this one leaves open. It never changes a size, a gap or a breakpoint — if
it wants to, the system is wrong and should be fixed here.

**One exception:** `--radius`. The system holds it at `2px` because a value is
needed, and insists only that there be *one* — pick a radius and hold it across
buttons, cards, inputs and panels. A system with three radii has none. The
brand may override that single token.

---

## 2. The one idea

**Everything structural is in `rem`, and the root font size steps at four
widths.** That is the whole mechanism, and it is what makes the system work on
a 4K panel without forty per-breakpoint overrides.

```css
html { font-size: 100%; }                                   /* 16px */
@media (min-width: 1800px) { html { font-size: 112.5%; } }  /* 18px */
@media (min-width: 2400px) { html { font-size: 125%; } }    /* 20px */
@media (min-width: 3200px) { html { font-size: 143.75%; } } /* 23px */
```

Because the column, the type, the gaps and the control heights are all `rem`,
they rise together. The page is not re-laid-out on a large display — it is
*scaled*, and the proportions that were tuned at the design width survive
intact. A line of prose measures the same 66 characters on a phone and on a 5K
panel.

**Percentages, not pixels.** A visitor who has raised their browser's default
text size keeps that increase — their setting multiplies ours instead of being
overwritten by it. `font-size: 18px` on `html` silently discards it.

**What stays in pixels:** hairlines, the focus ring, and touch minimums. These
should not grow with the page — a 1px border is a 1px border, and 44px is 44px
because that is the size of a fingertip, not a proportion of a column.

---

## 3. Space

A 4px grid in `rem`. The names are the multiple, not a t-shirt size, so
`--space-6` is six units — 24px at the base, 34.5px at 4K.

```
--space-1   4px      --space-8    32px
--space-2   8px      --space-10   40px
--space-3  12px      --space-12   48px
--space-4  16px      --space-16   64px
--space-5  20px      --space-20   80px
--space-6  24px      --space-24   96px
                     --space-32  128px
```

- **Between bands:** `--band-y`, which is `clamp(--space-12, 8vw, --space-24)`
  — 48px on a phone, 96px at the design width, and more again at each root
  step. Fluid inside a step so a phone does not need its own rule.
- **Between paragraphs:** `--space-5` (20px). Between a heading and its lead:
  `--space-3`. Inside a `.stack`: `--space-5` by default.
- **Page side padding:** `--gutter`, `clamp(1.125rem, 4vw, 2.5rem)` — 18px on a
  phone, 40px at the design width.

Use whitespace generously; do not create large empty areas for their own sake.
A band that feels empty needs better content or a snugger `--band-y`, not more
of both.

---

## 4. Type sizes

Typeface-agnostic by design. Each step is fluid between a floor — what a 320px
phone gets — and a cap, reached at the design width, and the whole ladder rises
again at each root step.

| Token | 320px | design width | ≥1800 | ≥2400 | ≥3200 |
| --- | --- | --- | --- | --- | --- |
| `--text-display` | 32 | 72 | 81 | 90 | 104 |
| `--text-h1` | 30 | 56 | 63 | 70 | 81 |
| `--text-h2` | 28 | 44 | 50 | 55 | 63 |
| `--text-h3` | 22 | 28 | 32 | 35 | 40 |
| `--text-lead` | 16.5 | 18 | 20 | 22.5 | 26 |
| `--text-base` | 16 | 17 | 19 | 21 | 24.5 |
| `--text-sm` | 14 | 15 | 17 | 19 | 21.5 |
| `--text-xs` | 12.5 | 13.5 | 15 | 17 | 19.5 |

**16px is a floor, not a preference.** Below it body copy is hard to read, and
iOS zooms the page on any focused input under 16px. `--text-sm` and `--text-xs`
exist for chrome — a caption, a tag, a skip link — never for body copy.

### Line height and tracking

Tightens as size grows. A display line at 1.6 looks loose; a body line at 1.2
is unreadable.

```
--leading-body      1.6      --tracking-heading   -.018em
--leading-lead      1.7      --tracking-display   -.032em
--leading-heading   1.2
--leading-display   1.08
```

### Adapting to a typeface

The sizes above assume a typeface of ordinary x-height. When the brand face
lands, check the body size against a known-good reference at the same
measurement:

- **Small x-height** (Garamond, Baskerville, many display serifs) — raise the
  `--text-base` floor and cap by about 1px. The ladder above it follows.
- **Large x-height** (Inter, Söhne, most modern UI sans) — leave it, or drop
  the cap by 0.5px if it reads heavy.
- **Condensed or wide faces** — the sizes hold; the `ch`-based measures do the
  adjusting on their own, since `ch` is derived from the face itself.

That is the only place the typeface touches this system.

---

## 5. Width and measure

Two mechanisms, deliberately overlapping: a container width in `rem`, and a
line length in `ch`. Whichever is narrower wins, so a long line is impossible
either way.

```
--w-prose    43rem     688px at base   one column of body copy
--w-content  55rem     880px           prose plus a figure or an aside
--w-shell    73.75rem  1180px          the page's main column
--w-wide     85rem     1360px          a grid that earns extra room
```

```
--measure           66ch    any run of prose
--measure-tight     46ch    a ruled list, a caption
--measure-heading   21ch    a section heading
--measure-display   16ch    a hero headline
```

A heading is capped tighter than body copy on purpose: a ragged left column of
three short lines reads faster than one wide centred block.

`p` carries `max-width: var(--measure)` in the base layer, so the cap applies
whether or not anyone remembers it.

---

## 6. The grid

Twelve columns, because twelve divides by 2, 3, 4 and 6 — every split a
marketing page needs. It collapses twice.

| Viewport | Columns | Default child span |
| --- | --- | --- |
| < 640px | 4 | full row |
| 640–767px | 6 | full row, or `--span-sm` |
| ≥ 768px | 12 | `--span` |

```html
<div class="grid grid--3">     <!-- three across, two-up at 640, stacked below -->
  <article>…</article>
  <article>…</article>
  <article>…</article>
</div>
```

`.grid--2`, `.grid--3` and `.grid--4` cover the common cases. For anything
else, set `--span` (and `--span-sm` if the six-column step should differ) on
the children.

**When the number of items is not known ahead of time**, use `.grid--auto` and
set `--card-min` — the narrowest a card may get before the row drops one. It
reflows on its own and needs no breakpoint.

**Do not add columns just because a large display has room.** Three cards at
1180px are three cards at 3840px, larger. Four columns at 4K and three
everywhere else means two layouts to maintain and a page that looks like a
different product on a big monitor.

---

## 7. Layout primitives

Five, and almost every section is a combination of them.

| | |
| --- | --- |
| `.wrap` | The page column: `--w-shell`, centred, with `--gutter` either side. Variants `--prose`, `--content`, `--wide`. |
| `.band` | A full-width horizontal slab with `--band-y` top and bottom. Alternate grounds so the page reads in sections rather than as one scroll. |
| `.stack` | Vertical rhythm inside a band — a column with one gap. `--tight`, `--loose`, `--center`. |
| `.cluster` | A row that wraps instead of overflowing: button rows, tag rows, meta rows. |
| `.split` | Two columns above 960px, one below. `--split-ratio` sets the division; `--sidebar` and `--aside` are the common ones. |

The canonical section:

```html
<section class="band" aria-labelledby="s-title">
  <div class="wrap stack" data-reveal>
    <p class="kicker">Kicker</p>
    <h2 id="s-title">The heading</h2>
    <p class="lead">The lead paragraph.</p>
    <!-- the section's own content -->
  </div>
</section>
```

---

## 8. Component geometry

Shape only — no colour, no border style, no shadow colour.

| | Value | |
| --- | --- | --- |
| Button height | `3.375rem` (54px) | `--lg` 58px, `--sm` 44px |
| Button inset | `1.625rem` (26px) | |
| Field height | `3.25rem` (52px) | textarea min 150px |
| Field inset | `0.875rem` (14px) | font-size never under 16px |
| Card padding | fluid `20–32px` × `24–40px` | |
| Icon | 15px beside a label | 12px in a chip, 24px as a section mark |
| Chip | 22px circle | the one place a circle belongs |
| **Touch minimum** | **44px** | never scaled down, never overridden |

Below 640px a `.cluster--buttons` gives each button the full row rather than
letting two sit cramped side by side.

---

## 9. The range

Built and measured **320px → 5120px**. No horizontal overflow at any width,
with every disclosure open.

### First, the thing that confuses everyone

**Test in CSS pixels, not device pixels.** A 4K laptop running at 200% scaling
reports **1920 CSS pixels** — it is a 1920 display as far as the page is
concerned, and nothing on this list applies to it. A 27" 4K monitor at 100%
scaling reports **3840**, and that is the case the large steps exist for.

If you open a page on a 4K screen and nothing changes, check the OS scaling
before changing the CSS. In DevTools, set the viewport width directly.

### Down — mobile

| Width | What it is | What happens |
| --- | --- | --- |
| **320px** | the floor we support | single column, `--gutter` 18px, grid 4-col, buttons full width |
| **360px** | the most common small phone | nothing extra — the fluid clamps have already adjusted |
| **390–430px** | current iPhone / large Android | the type ladder is mid-ramp; still one column |
| **640px** | phone → tablet | grid goes to 6 columns; button rows sit side by side again |
| **768px** | tablet portrait | grid goes to 12 columns |
| **960px** | tablet landscape | `.split` becomes two columns |
| **1180px** | the design width | `--w-shell` caps; every type step reaches its cap |

On mobile, always:

- **Single-column reading flow.** No multi-column bullet lists.
- **No horizontal scrolling**, at any width, with every row open. A wide table
  or code block scrolls inside its own container, never the page.
- **44px touch minimum** on anything tappable, with space between targets.
- **No tiny screenshots.** An image that needs pinching is better removed.
- Drop decoration that does not help — ambient motion, background flourishes,
  anything that costs bandwidth for nothing.

### Up — large displays

Nothing below 1800px is touched. On a 1440 or 1920 display the caps are the
intended measure.

| Step | Root | `--w-shell` | Body | H1 | Typical display |
| --- | --- | --- | --- | --- | --- |
| base | 16px | 1180px | 17 | 56 | up to 1920 |
| **≥1800** | 18px | 1327px | 19 | 63 | 1920 at 100% |
| **≥2400** | 20px | 1475px | 21 | 70 | 5K at default, 4K at 150% |
| **≥3200** | 23px | 1696px | 24.5 | 81 | 4K at 100% |
| — | — | — | — | — | 5120 (5K at 100%) uses the 3200 step |

**Why it steps at all.** On a 3840px-wide panel, an 1180px column covers under
a third of the screen, at a body size that is physically about half what the
same value gives on a 1080p monitor at the same distance. Left alone, the page
is not "clean" — it is a stripe of unreadably small text.

**Why the shell stops.** It does not grow past ~1700px, and there is no fifth
step for 5120px. Past that, extra width only lengthens the line, and a
90-character line is worse to read, not better. A 5K viewport gets generous
margins, and that is the correct answer rather than a compromise.

**What not to do at 4K:**

- Do not widen the text column beyond the measure.
- Do not add grid columns (§6).
- Do not scale images up past their native resolution — ship a 2× asset or
  leave it at its size inside a larger column.
- Do not introduce a layout that exists only there. One layout, scaled.

### How to check it

Set the viewport width directly rather than trusting a device preset:

```
320 · 360 · 390 · 430 · 640 · 768 · 960 · 1180 · 1440 · 1920 · 2560 · 3840 · 5120
```

At each one: no horizontal overflow, every disclosure open, and read a
paragraph — if the line feels long, the measure is not being applied.

---

## 10. Accessibility geometry

The parts of accessibility this system is responsible for. The rest — contrast,
in particular — belongs to the brand layer and must be checked there.

- **Focus ring** on everything interactive via `:focus-visible`, 3px (4px above
  2400px), following the system radius. Never `outline: none` without a
  replacement.
- **Touch targets** at least 44px, with space between them. Use `data-tap` on
  anything visually smaller that must still be tappable.
- **Text sizes** never below 16px for body copy or form fields.
- **Measure** enforced, so no line runs past 66 characters.
- **Reduced motion** blanketed, then corrected: colour and tint changes stay,
  only travel goes. Nothing may end on a wrong frame or disappear.
- **Skip link** present, visible on focus.
- **`scroll-padding-top`** set from `--nav-h`, so an anchor never lands under a
  fixed header. Leave `--nav-h` at `0px` when the page carries no header.
- Semantic HTML first. A `<div>` with a click handler is a bug. One `<h1>`;
  headings descend without skipping; every `<section>` takes `aria-labelledby`.

---

## 11. Code style

- **No leading zeros — anywhere.** In CSS: `.16em`, `.25vw`, `rgba(0, 0, 0, .08)`,
  never `0.16em`. In anything we number: decision records are `1-`, `9-`, `10-`,
  never `0001-`. The zero-padded form buys lexical sorting and costs readability
  everywhere else; we take the readability.
- **No unit on zero**: `padding: 0`, never `0px`.
- **Logical properties** where one exists: `padding-block`, `inline-size`,
  `margin-inline`, `border-block-end`.
- **Tokens over values.** If you are typing a bare pixel size, check whether a
  token already says it. If none does, add one — do not inline it.
- **`rem` for anything that should scale, `px` for anything that must not.**
  Getting this wrong is the one way to break the large-display behaviour.
- **No `!important`** outside the reduced-motion blanket.
- Media queries in `rem` for layout breakpoints, `px` for the root steps. Note
  that `rem` in a media query always resolves against 16px, never against the
  stepped root — which is what keeps breakpoints from moving under themselves.

**Comments explain why, not what** — the rejected alternative, the measurement
behind a number, the bug the rule fixes. A comment that restates the property
is noise; one carrying a measurement is the most valuable kind, because it is
the thing nobody can recover later.

---

## 12. Write the decisions down

When something is settled by a measurement, or is a deliberate exception, it is
a **decision record** — not a comment buried at line 287.

**This system has eight of them, in [decisions/](decisions/).** Read
[1](decisions/1-rem-and-a-stepping-root.md) before changing anything
above 1800px — everything else assumes it. Read the relevant record before
overruling a rule; most of what looks arbitrary was measured.

Keep new ones in `decisions/`, numbered, one per file:

```markdown
# N · Title

**Status** Settled | Open | Superseded by N
**Date** YYYY-MM-DD
**Touches** which files or pages

## What we decided
## Why                      — the reasoning, and the measurement if there was one
## What we gave up          — the alternative, and what it would have bought
## What breaks if this changes
```

Write one when it touches several rules, when it is a deliberate exception,
when you had to measure something, or when you can imagine someone overturning
it next year without knowing what breaks. Not for an ordinary rule.

---

## Before you say it is done

- [ ] 320 → 5120px, no horizontal overflow, every disclosure open
- [ ] Checked at real CSS-pixel widths, not device presets
- [ ] Body copy never under 16px; form fields never under 16px
- [ ] No line of prose past 66 characters at any width
- [ ] Every tappable thing clears 44px
- [ ] Tabbed through: ring visible everywhere, nothing trapped
- [ ] Reduced motion on: nothing snapped to a wrong frame, nothing hidden
- [ ] No bare pixel size in the page's own block
- [ ] Nothing in `rem` that should have been `px`, or the reverse
- [ ] Contrast checked in the brand layer
