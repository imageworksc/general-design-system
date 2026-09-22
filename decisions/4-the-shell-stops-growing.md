# 4 · The shell stops near 1700px, and 5120 gets no step of its own

**Status** Settled
**Date** 2026-09-22
**Touches** `--w-shell`, and the absence of a fifth media query

## What we decided

`--w-shell` is `73.75rem`, so it grows with the root — 1180px at the base,
1696px at the 3200px step. There it stops. There is no step for 5120px, and a
5K viewport is served by the 3200px rules.

## Why

The shell grows for the reason in [1](1-rem-and-a-stepping-root.md): a
fixed 1180px column on a 3840px panel is a stripe. But the growth has to end
somewhere, and the limit is set by reading, not by the screen.

Line length is the constraint. Prose is capped at `66ch` and the container at
`43rem`, whichever is narrower, and at 1696px the column is already wider than
the measure needs. Past that, extra width does nothing but lengthen lines, and
a 90-character line is worse to read than a 66-character one — not better,
worse.

So a 5120px viewport gets margins of roughly 1700px either side. That is the
correct answer, not a compromise we failed to solve.

## What we gave up

Filling a 5K display. Someone will eventually say the page "looks narrow" on
one, and the answer is that the alternative is a line nobody can track back to
the start of.

We also gave up the option of a wider `--w-wide` grid at 5K. A grid that has
earned extra room can still take `--w-wide` at 85rem (1955px at the top step),
which is the escape hatch — it applies to a grid of cards, not to prose.

## What breaks if this changes

Nothing mechanically; the measure caps hold regardless. What degrades is
reading, and it degrades on exactly the displays nobody tests on. Before adding
a fifth step, open a paragraph at that width and count the characters.
