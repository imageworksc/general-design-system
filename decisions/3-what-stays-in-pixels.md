# 3 · Hairlines, the focus ring and touch minimums stay in `px`

**Status** Settled
**Date** 2026-09-22
**Touches** `--hairline`, `--ring-width`, `--ring-offset`, `--touch-min`

## What we decided

Three things do not scale with the root:

```css
--hairline: 1px;
--ring-width: 3px;    /* 4px above 2400 */
--touch-min: 44px;
```

Everything else structural is `rem` ([1](1-rem-and-a-stepping-root.md)).

## Why

Each is anchored to something outside the page's own proportions.

**Touch minimum** is the size of a fingertip. It does not grow because the
viewport did, and it must not shrink because the viewport is narrow — 44px is
44px on a 320px phone and on a tablet.

**The focus ring** is a visibility affordance, not a proportion. It needs to be
seen, and 3px is the threshold for that regardless of how large the text is.

**A hairline** is 1px because 1px is the thinnest visible line. Scaled to `rem`
it becomes 1.44px at 4K, which is no longer a hairline — it is a border.

## The one exception

`--hairline` and `--ring-width` do step once, at 2400px, to `1.5px` and `4px`.
Against type that has grown by half, a 1px rule stops registering as a divider
and starts reading as an artefact. This is a threshold adjustment, not
proportional scaling — which is why it is a single bump rather than a `rem`.

## What we gave up

Consistency of rule. "Everything is rem" is easier to remember than "everything
is rem except these three", and someone converting the exceptions for tidiness
is the likely failure.

## What breaks if this changes

Convert `--touch-min` to `rem` and it grows on large screens, which is
harmless — but the same instinct applied to a `min-height` elsewhere shrinks a
target below the threshold on a phone. Convert `--hairline` and every divider
on a 4K display doubles in weight.
