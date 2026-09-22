# Landing page guidelines

The rules for building a client landing page — any client. They are about
method, not about one brand's colours: fill in the brand block below and the
rest applies as written.

Read this before writing anything. Where a rule below and the client's own
live stylesheet disagree, **the client's stylesheet wins** — see §2.

---

## 1. The brand block

Fill this in first. Every rule after it reads from here, and a page cannot be
started until the top half is answered.

```
CLIENT            ____________________
LIVE SITE         ____________________   the source for everything below
PAGE              ____________________   what this page is, in one line
SOURCE COPY       ____________________   the document the page carries

BRAND
  Primary         #______   the colour that carries headings
  Action          #______   the one that carries the button
  Accent          #______   emphasis inside a heading, if there is one
  Ink             #______   body copy
  Muted           #______   secondary copy
  Surface tint    #______   the alternate band ground

TYPE
  Typeface        ____________________   + licence and where the file is
  Weights         ____________________   body / emphasis / headings

SHAPE
  Corner          ____px    one value, everywhere
  Shell           ____px    the content column at the design width

FACTS             the things the page may state as true
  Founded         ______
  Address         ______
  Phone / email   ______
  Anything else   ______

ROUTES            every link the page will carry, confirmed
  CTA             ______
  Secondary       ______
```

**Nothing below the FACTS line may be invented.** If it is not here and not in
the source copy, it does not go on the page — ask.

### Where the values come from

If the client has a live site, **take the values out of its stylesheet, not out
of a screenshot and not out of a brand PDF.** Open the site, read the computed
values, and copy them exactly. A brand guide says the blue is `#1266b5`; the
site has been shipping `#1266B5` at 94% opacity over a tint for three years and
that is what people recognise.

If there is no live site, the brand guide is the source, and the first page
becomes the reference every later page is measured against — so it is worth
being slow about.

---

## 2. Build discipline

**Three files.** `index.html`, `styles.css`, `script.js`. Nothing crosses
between them: no `<style>` block, no `style=` attribute, no `<script>` body,
and the script never writes a style.

The one exception is JSON-LD in the head, which is structured data rather than
behaviour — moved to a file, crawlers would not read it.

The script may set exactly one kind of thing: a custom property holding a
measurement the stylesheet cannot know ahead of time, like a rendered label's
width. What that measurement *does* is still decided in the CSS.

**No dependencies.** No framework, no build step, no CDN. The page opens in a
browser from the filesystem and works. This is not minimalism for its own sake
— these pages get pasted into a CMS, and every dependency is a thing that can
be missing on the other side.

**No external network requests.** The typeface is embedded as a base64
`@font-face`; icons are an inline SVG symbol sheet. A Google Fonts link costs a
DNS lookup, a handshake, a CSS fetch and only then the font — most of a second
of invisible text on the one screen that has to land.

**No chrome, unless asked.** A landing page dropped into a client's site
carries no header and no footer: it is the article, and the chrome belongs to
whatever it is placed into. Confirm which you are building.

---

## 3. Scope is the copy

The page carries the sections of the source copy. **Nothing else.** This is the
rule people break, and it is the one that costs a client relationship.

- Do not invent a statistic, testimonial, price, client name, award, or
  years-in-business figure.
- Do not add a section because the layout looks thin. If a band feels empty,
  the fix is the design, not filler.
- Do not soften or rewrite a client's claim to make it read better.
- Do not write an FAQ the client did not write.

Everything factual on the page traces to the source copy or to the FACTS block.
If the page needs something that is in neither, **say so and ask** — new copy
comes from the client.

**Before building, list the page's sections back to whoever handed over the
copy** — numbered, in order, with what each one carries. That list is the page.
Flag in the same message anything missing, any claim you cannot source, any
route you cannot confirm.

---

## 4. Tokens

Three layers, each named for what it is rather than what it looks like.

```css
:root {
  /* 1 · primitives — the raw brand values, named literally */
  --navy: #143c66;
  --green: #80c34a;

  /* 2 · semantic — what those values are FOR. Rules read these. */
  --color-heading: var(--navy);
  --color-action: var(--green);
  --surface-band: var(--tint);
  --border-hairline: var(--grey-200);

  /* 3 · component — this page's own sizes, declared once, prefixed */
  --xx-h1: clamp(32px, 4.2vw, 48px);
  --xx-icon: 48px;
}
```

The point of layer 2 is that a dark band re-points the semantic names and every
child flips for free, instead of each component needing a dark variant:

```css
.band--dark {
  --color-heading: #fff;
  --color-text: rgba(255, 255, 255, .82);
  --border-hairline: rgba(255, 255, 255, .16);
}
```

**Never re-point a primitive to its opposite.** `--navy: #ffffff` inside a dark
band works and is the thing that stops every new reader. That is what layer 2
is for.

**Every size a page uses is a token**, declared once at the head of the page's
block behind a prefix. No bare pixel size anywhere else. That is what lets the
whole page move from one place when the range is extended, instead of restating
forty rules.

Keep derived things derived: `calc(var(--xx-icon) * 22 / 48)` sizes a mark's
icon off the mark itself.

**One corner.** Pick a radius and hold it everywhere — buttons, cards, inputs,
panels. A system with three radii has none. The exception worth making is a
circle for an icon well, which reads as deliberate contrast rather than drift.

---

## 5. Type

**Sizes are ranges, not numbers.** Every step is a `clamp()`: the floor is what
a 320px phone gets, the cap what the design width gets.

```css
--step-0: clamp(16px, .25vw + 15.2px, 17px);   /* body */
--step-1: clamp(16.5px, .4vw + 15.5px, 18px);  /* lead */
--step-2: clamp(22px, 1.1vw + 18px, 28px);     /* h3  */
--step-3: clamp(28px, 2.6vw + 18px, 44px);     /* h2  */
--step-4: clamp(30px, 3vw + 20px, 56px);       /* h1  */
```

These hold regardless of brand:

| | Desktop | Mobile |
| --- | --- | --- |
| Body | 17–18px, **never under 16px** | 16–17px |
| H1 | 42–56px | 30–36px |
| H2 | 32–42px | 26–32px |
| H3 | 22–28px | — |
| Body line-height | ~1.6 | |
| Heading line-height | 1.1–1.25 | |

Guidelines, not specifications — hierarchy matters more than hitting a number.
But **16px is a floor, not a guideline**: below it, body copy is hard to read
and iOS zooms the page on any input.

- **Measure**: cap prose at `66ch`. A heading caps tighter — around `21ch` — and
  a hero headline tighter still, because a ragged left column reads faster than
  a wide centred block.
- **Negative tracking** on large headings, roughly `-.02em`, more at hero size.
- `text-wrap: balance` on headings, `pretty` on paragraphs.
- Every major section reads **headline → subhead → body**, largest to smallest.
  Do not put decorative eyebrow copy above a headline unless it was asked for.

---

## 6. Layout

```css
.wrap {                       /* every band's inner column */
  width: 100%;
  max-width: var(--shell);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.band { padding-block: var(--band-y); }
```

A section is always: `<section class="band …">` → `<div class="wrap stack">` →
kicker, heading, lead, content.

- **Shell** 1200–1280px at the design width; **reading measure** 650–720px
  inside it. Full-width backgrounds are fine; the content stays on the grid.
- **Section spacing** 80–120px desktop, **paragraph spacing** 20–28px.
- **Page padding** 32–40px desktop, 18–24px mobile.
- **Alternate grounds** — white, then a tint, then white — so the page reads in
  slabs rather than one scroll.
- Give the page **one closing call**, not a CTA after every section.

---

## 7. Components

A marketing page needs about eight things. Build them once, as recipes, and
reuse them:

| | |
| --- | --- |
| **Button** | 52–56px tall, ~26px inset, 16px/700, the system corner. One solid primary per view; everything else is a bordered quiet variant. Lift 3px on hover. |
| **Link** | An underline that grows from the left on hover reads as considered; a permanent underline reads as a document. |
| **Chip** | A small tinted circle holding an icon — the check beside a benefit. Always an icon, never text. |
| **Card** | Corner + a near-white vertical gradient + one soft shadow. Define it once; every surface uses it. |
| **Ruled list** | Rows between hairlines. Hover is a tint, not a move — five rows shifting under the cursor is busier than the content deserves. |
| **Disclosure** | Native `<details>`. The browser toggles it, announces the state, keeps closed copy out of the accessibility tree and findable by in-page search. An accordion script gets at least one of those wrong. |
| **Form field** | 52px tall, 16px minimum, the system corner. Focus moves the border to the action colour and adds a soft ring. Validate with `:user-invalid`, never `:invalid` — a required field must not turn red before it has been touched. |
| **Closing band** | A dark or brand-gradient ground carrying the one primary call. |

Icons live in an SVG symbol sheet at the top of `<body>`, used as
`<svg aria-hidden="true"><use href="#i-check"/></svg>`. Strokes are
`currentColor` so they take the colour of whatever they sit in.

**Do not use an icon beside every benefit or heading**, do not centre long runs
of body copy, and do not use oversized numbers as decoration.

---

## 8. Motion

- **One easing token** for the whole page. Everything uses it.
- Interaction `.25s`; colour and disclosure `.3–.4s`; entrances `.55–.8s`.
- Animate `transform` and `opacity` only. Nothing that triggers layout.
- Entrances reveal on scroll via `IntersectionObserver`, once per element. If
  the observer is missing, reveal everything immediately — never leave content
  hidden behind a feature check.
- Ambient movement, if any, is slow and cheap: long periods, few elements.

**Reduced motion is not optional.** Blanket the durations, then fix what the
blanket gets wrong — anything that would snap to a wrong end frame, a marquee
that should become a scrollable strip, a rail that should be given its final
length outright. **Colour and tint changes stay. Only the travel goes.** Nothing
may end up hidden.

---

## 9. Accessibility

The floor, not the ceiling. None of this is client-specific.

- `:focus-visible` on everything interactive, with a visible ring. Never
  `outline: none` without a replacement.
- Tab all the way through before calling it done: nothing skipped, nothing
  trapped, focus returns where it came from after a panel closes.
- Semantic HTML first. A `<div>` with a click handler is a bug.
- One `<h1>`. Headings descend without skipping. Every `<section>` takes
  `aria-labelledby` pointing at its own heading.
- Decoration is `aria-hidden="true"`.
- **Check contrast on every pair**, especially a bright brand colour carrying
  text — most brand greens and yellows fail on white and need a darker text
  variant alongside the surface one.
- Body copy never under 16px; inputs never under 16px.
- A skip link, and a visually-hidden class for text the screen reader needs and
  the eye does not.
- `scroll-padding-top` so an anchor does not land under a fixed header.

---

## 10. Performance

- No external requests (§2).
- Images sized, compressed, with real `alt` text — or `alt=""` if decorative.
  `loading="lazy"` below the fold.
- No horizontal scrolling at any width.
- No tiny screenshots and no crowded controls on mobile; remove decoration that
  does not help there.

---

## 11. The head

```html
<title>Page Name | Client</title>
<meta name="description" content="…">
<meta name="theme-color" content="#______">
<link rel="canonical" href="…">
<!-- Open Graph + Twitter, og:image a real 1200×630 file -->
<script type="application/ld+json">{ "@context": "https://schema.org", "@graph": [ … ] }</script>
```

- **No `PLACEHOLDER` may ever reach a review link.** If a route or image is not
  confirmed, it goes in the README's "before this goes live" list and you say so
  out loud when handing over.
- If the client's site already has sitewide `Organization` schema, this page's
  `provider` is name + url only, so the two do not conflict.

---

## 12. The range

Build and measure **320px → 5120px**. No horizontal overflow at any width, with
every disclosure open.

**Down**, roughly: two-column grids collapse near 900px; dense rows tighten near
700px; stat grids stack and buttons go full width near 640px; headlines held on
one line are released near 560px.

**Up**: leave everything below ~1800px alone — the caps are the intended
measure on a 1440 or 1920 display. Past that they stop being a measure and
start being a stripe, so step the shell and the type together:

| | Shell | Body | H1 |
| --- | --- | --- | --- |
| base | 1180–1280 | 16–17 | 36–56 |
| ≥1800px | ~1320 | 18 | ~54 |
| ≥2400px | ~1560 | 20 | ~62 |
| ≥3200px | ~1840 | 23 | ~72 |

**Stop the shell growing** around 1840px. Past that, more width only lengthens
the line — a 5120px viewport should get generous margins, not a wider column.

---

## 13. Code style

- **No leading zeros**: `.16em`, `.25vw`, `rgba(0, 0, 0, .08)`. Never `0.16em`.
- **No unit on zero**: `padding: 0`, never `0px`.
- **Hex lowercase**, shortened where it shortens: `#fff`.
- **Logical properties** where one exists: `padding-block`, `inline-size`.
- **Tokens over values.** If you are typing a hex or a bare pixel size, check
  whether a token already says it.
- **No `!important`** outside the reduced-motion blanket.
- Section banners divide the stylesheet; the file opens with one naming the page.
- JS: `'use strict'`, `defer`, `const`/`let`, no `var`, no jQuery.

**Comments explain why, not what** — the rejected alternative, the measurement
behind a number, the bug the rule fixes. A comment that restates the property is
noise. A comment carrying a measurement is the most valuable kind, because it is
the thing nobody can recover later.

```css
/* Was a jump straight to the brand navy, which read louder than the primary
   button beside it. This is the same ring the active step already uses. */
.btn--quiet:hover { border-color: #c3d6ea; }
```

---

## 14. Write the decisions down

When something is settled by a measurement, or is a deliberate exception to a
guideline, it is a **decision record** — not a comment buried at line 287.

Keep them in `decisions/`, numbered, one per file:

```markdown
# NNNN · Title

**Status** Settled | Open | Superseded by NNNN
**Date** YYYY-MM-DD
**Touches** which files or pages

## What we decided
## Why                      — the reasoning, and the measurement if there was one
## What we gave up          — the alternative, and what it would have bought
## What breaks if this changes
```

Write one when it touches several rules or every page, when it is a deliberate
exception, when you had to measure something, or when you can imagine someone
overturning it next year without knowing what breaks. Not for an ordinary rule.

---

## 15. More than one page for the same client

The moment a second page exists, the stylesheet splits in two: the shared system
first, that page's own block after it, behind a prefix.

> **Fix the shared half upstream and carry it across, never inside a page.**
> A page that patches it drifts, and the next page inherits the drift.

Carry the system **whole** — leave the parts a page has no use for. Pruning
page-by-page produces subsets that diverge, and the next fix has to be merged by
hand instead of pasted. The rent is some dead CSS; the return is that a fix is
one paste.

---

## Before you say it is done

- [ ] Every claim traces to the source copy or the FACTS block
- [ ] No `PLACEHOLDER`, no lorem, no invented figure
- [ ] Canonical, `og:url` and JSON-LD `@id` agree and point at the real route
- [ ] `og:image` exists, 1200×630
- [ ] Typeface embedded; zero external requests (check the network panel)
- [ ] No `<style>`, no `style=`, no inline `<script>` body
- [ ] 320 → 5120px, no horizontal overflow, every disclosure open
- [ ] Tabbed through: ring visible, nothing trapped
- [ ] Contrast checked on every text pair
- [ ] Reduced motion on: nothing snapped, nothing hidden
- [ ] Every CTA clicked

---

## How to work

- **Ask before inventing.** Missing copy, an unconfirmed route, an ambiguous
  claim — ask. A wrong fact on a client page costs more than a round trip.
- **Show the whole page**, at real widths, not a snippet.
- **Say what you did not do.** If something was left out or could not be
  confirmed, name it. Do not let it surface at launch.
