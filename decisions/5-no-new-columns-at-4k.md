# 5 · A large display gets the same layout, scaled — never more columns

**Status** Settled
**Date** 2026-09-22
**Touches** `.grid` and every section layout

## What we decided

The grid collapses downward — twelve columns, then six, then four — and never
expands upward. Three cards at the design width are three cards at 3840px,
larger. No layout exists only on a big screen.

## Why

Two reasons, and the second is the binding one.

Scaling preserves the design. The proportions were tuned at the design width;
a page that adds a fourth column at 4K is not the same design larger, it is a
second design that happens to share a stylesheet.

And it is a second design to maintain. Every section that behaves differently
above 3200px is a section that has to be reviewed twice, breaks twice, and
looks like a different product depending on which monitor the client opens it
on. The bug reports from that are the worst kind: irreproducible unless you
happen to own the hardware.

`.grid--auto` is the deliberate exception, and it is bounded — it reflows on
`--card-min` for a set whose count is not known ahead of time, which is a
content problem rather than a viewport one.

## What we gave up

Density on large displays. There is visible empty space either side of the
shell at 4K, and the instinct to fill it is strong.

## What breaks if this changes

Nothing at once — a four-column variant at 3200px works fine the day it ships.
What breaks is six months later, when a card design changes and the person
making the change has a 1440px laptop and never sees the other layout.
