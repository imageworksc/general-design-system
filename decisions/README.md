# Design decision records

Short notes on the choices that shape more than the rule they sit on, or that
someone will eventually want to overturn. They exist so the answer to "why is
it like this?" is a document rather than a comment buried in a stylesheet.

Write one when:

- the decision touches several rules, or the whole system
- it is a deliberate exception to something we otherwise follow
- you had to measure something to reach it
- you can imagine someone changing it next year without knowing what breaks

Do not write one for an ordinary rule. The stepping root needs a record; the
fact that `.cluster` uses a 16px gap does not.

## The records

| # | Decision | Status |
| --- | --- | --- |
| [0001](0001-rem-and-a-stepping-root.md) | Everything structural in `rem`, with a root that steps | Settled |
| [0002](0002-percentage-root-not-pixels.md) | The root steps in percentages, never pixels | Settled |
| [0003](0003-what-stays-in-pixels.md) | Hairlines, the focus ring and touch minimums stay in `px` | Settled |
| [0004](0004-the-shell-stops-growing.md) | The shell stops near 1700px, and 5120 gets no step | Settled |
| [0005](0005-no-new-columns-at-4k.md) | A large display gets the same layout, scaled | Settled |
| [0006](0006-no-colour-no-typeface.md) | No colour and no typeface in the system, ever | Settled |
| [0007](0007-sixteen-pixel-floor.md) | Body copy and form fields never go under 16px | Settled |
| [0008](0008-twelve-columns-two-collapses.md) | Twelve columns, collapsing to six and then four | Settled |

**0001 is the one to read first.** Everything else assumes it.

## The template

```markdown
# NNNN · Title

**Status** Settled | Open | Superseded by NNNN
**Date** YYYY-MM-DD
**Touches** which files or rules

## What we decided

One paragraph, present tense.

## Why

The reasoning, and the measurement if there was one.

## What we gave up

The alternative, and what it would have bought.

## What breaks if this changes

What the next person needs to know before overturning it.
```
