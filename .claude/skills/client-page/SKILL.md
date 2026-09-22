---
name: client-page
description: Build or update a client landing page on the structural design system — space, type scale, grid and layout from system.css, with colour and typeface in a brand layer. Use whenever the task is a landing page, marketing page, hero, section, band, CTA, pricing table, FAQ or contact form for a client, or when someone hands over source copy, a deck or a brief to turn into a page. Also use before editing any page already built on system.css.
---

# Building a client landing page

This file is the procedure. The rules are in [CLAUDE.md](../../../CLAUDE.md) —
read that first.

Two stylesheets, and the split is the whole discipline:

```
system.css   space, type sizes, measure, grid, layout, component geometry
brand.css    colour, typeface, the one radius — and nothing else
```

Before overruling anything, check [decisions/](../../../decisions/). Most of
what looks arbitrary was measured. Start with
[1](../../../decisions/1-rem-and-a-stepping-root.md) — everything above 1800px
assumes it.

---

## A new page

### 1. Settle the scope before writing anything

Read the source copy end to end, then list its sections back to whoever handed
it over — numbered, in order, with what each one carries. **That list is the
page.** Nothing joins it later without coming from the client.

Flag in the same message: anything missing, any claim you cannot source, any
route or link you cannot confirm. Do not start building while one of those is
open — a wrong fact on a client page costs more than a round trip.

### 2. Collect the brand values

From the client's **live stylesheet**, not a screenshot and not a brand PDF. A
brand guide says the blue is one thing; the site has been shipping something
slightly different for years, and that is what people recognise.

You need: the heading colour, the action colour, a text colour and two greys, a
band tint, the typeface file, and the corner radius. If there is no live site,
the brand guide is the source — and this page becomes the reference every later
one is measured against, so be slow about it.

### 3. Scaffold

```
index.html      copied from index.template.html
system.css      copied in unchanged — it has no blanks
brand.css       copied from brand.template.css, then filled in
reveal.js       only if the page uses entrance reveals
assets/         only what the page references
```

`index.template.html` already carries the skip link, the icon sheet, a hero,
three section shapes, a form and a closing band. **Delete what the copy does
not need rather than inventing what it does not have.**

### 4. Fill the brand layer

Primitives first, then check the semantic slots read correctly. Two things to
get right:

- **`--brand-action-ink`** is the action colour dark enough to carry *text*. A
  bright green or yellow will not clear AA on white, and the pair is why the
  template has two tokens rather than one.
- **`--radius`** is one value, everywhere. A system with three radii has none.

Nothing else in `brand.css` may move a size, a gap or a breakpoint. If it wants
to, the geometry is wrong — fix `system.css`, for every client, not this one.

### 5. Build section by section

Each section is a band holding a wrap holding a stack:

```html
<section class="band band--tint" aria-labelledby="s-title">
  <div class="wrap stack" data-reveal>
    <p class="kicker">Kicker</p>
    <h2 id="s-title">The heading</h2>
    <p class="lead">The lead paragraph.</p>
    <!-- the section's own content -->
  </div>
</section>
```

Alternate grounds so the page reads in slabs. The closing call is one band, at
the end — not a CTA after every section.

| The section is | Reach for |
| --- | --- |
| a row of equal things | `.grid` with `.grid--2/3/4` |
| a card set whose count varies | `.grid--auto` with `--card-min` |
| copy beside a figure or aside | `.split`, `--sidebar` or `--aside` |
| a list of short claims | `.rule-list` |
| buttons or tags in a row | `.cluster` |
| questions and answers | `<details>` — never an accordion script |
| a form | `.field` / `.field--area`, `:user-invalid` |
| the closing call | `.band--dark` |

### 6. Write the head

Title, description, canonical, Open Graph, Twitter, one JSON-LD `@graph`.

**No `PLACEHOLDER` may reach a review link.** If a route or an image is not
confirmed, it goes in the README's "before this goes live" list and you say so
out loud when handing over.

### 7. Measure it

```
320 · 360 · 390 · 430 · 640 · 768 · 960 · 1180 · 1440 · 1920 · 2560 · 3840 · 5120
```

Set the viewport width directly — device presets lie. At each width: no
horizontal overflow, every disclosure open, and read a paragraph.

A 4K laptop at 200% scaling reports **1920** CSS pixels and is a 1920 display
as far as the page is concerned. If nothing changes on your 4K screen, check
the OS scaling before changing the CSS.

### 8. Run the checklist

At the foot of [CLAUDE.md](../../../CLAUDE.md). Then hand the page over with
whatever still needs confirming, stated plainly.

### 9. Write down anything you had to decide

If a measurement settled it, or it is a deliberate exception, it is a decision
record — not a comment. Add it to [decisions/](../../../decisions/) using the
template in that folder, and point the code comment at it.

---

## An existing page

**Before touching it, work out which file you are in.**

- **A colour, the typeface, the radius** → `brand.css`. Go ahead.
- **A size, a gap, a width, a breakpoint** → `system.css`, and it changes for
  every client on the system. Stop and say so before doing it.
- **This page's own sizes** → the page's own block, behind a prefix, with every
  size declared once as a token at the head of that block.

Never put a bare pixel size in a page block. It will not move at 1800px, and
the page reads as a stripe on a large display — a failure that does not show at
the design width, which is why it survives review.

---

## The five failures to watch for

1. **Inventing content** to fill a layout. A band that feels empty needs better
   content or a snugger `--band-y`, not filler.
2. **A colour or a font-family in `system.css`.** One is not a problem; it is a
   precedent, and the file stops being droppable into the next project.
3. **A bare pixel size** where a `rem` token belongs. Breaks silently, above
   1800px only.
4. **Adding grid columns on a large display.** One layout, scaled. Two layouts
   means two to maintain and bugs nobody can reproduce.
5. **Body copy or a form field under 16px.** Hard to read, and iOS zooms the
   page mid-form.
