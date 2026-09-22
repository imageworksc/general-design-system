# 8 · Twelve columns, collapsing to six and then four

**Status** Settled
**Date** 2026-09-22
**Touches** `.grid`, `--grid-columns`, the 640px and 768px breakpoints

## What we decided

| Viewport | Columns |
| --- | --- |
| ≥768px | 12 |
| 640–767px | 6 |
| <640px | 4 |

A child spans with `--span` on the twelve-column grid and `--span-sm` on the
six; below 640px it takes the full row.

## Why

Twelve divides by 2, 3, 4 and 6 — every split a marketing page needs, which is
why it is the near-universal choice and why departing from it buys nothing.

The collapses are where the thought is. **Six at 640px** keeps halves and
thirds available on a large phone in landscape and on a small tablet, which is
where a two-up card row still reads. **Four below 640px** is not really a grid
— it is a single column with the grid's gap rules still applying, so a section
does not need different markup on a phone.

Two collapses rather than three because each one is a layout to review. The
`--span-sm` escape hatch covers the cases where the middle step genuinely
differs, without a third breakpoint for everyone else.

## What we gave up

Fine control between 640 and 768px, which is a narrow and thinly populated
band. A layout that genuinely needs something else there sets `--span-sm`
rather than getting a breakpoint of its own.

## What breaks if this changes

Moving 768px moves tablet portrait, which is the width most often checked and
most often assumed. Moving 640px moves the point at which a button row stops
going full width, because `.cluster--buttons` is keyed to the same number — the
two are intentionally in step, and changing one without the other leaves a
phone with two cramped buttons side by side.
