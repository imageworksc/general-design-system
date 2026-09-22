# 0006 · No colour and no typeface in the system, ever

**Status** Settled
**Date** 2026-09-22
**Touches** the boundary between `system.css` and the brand layer

## What we decided

`system.css` contains no colour value and no `font-family`. Those live in a
second stylesheet, loaded after it, which assigns paint to the semantic slots
the system leaves open.

The brand layer may change colour, typeface and the single `--radius` token. It
may not change a size, a gap, a width or a breakpoint.

## Why

Colour and typeface are the two things that change with every client. Geometry
is the thing that does not — spacing, measure, the grid and the responsive
behaviour are as right for one brand as another, and re-deriving them per
project is how eight clients end up with eight slightly different systems.

Separating them makes the boundary enforceable rather than aspirational: a
colour in `system.css` is visible in a grep, and so is a `padding` in the brand
layer. The rule can be checked instead of remembered.

The one deliberate near-miss is `a { color: inherit }`, which is not a colour —
it is an instruction to take whatever the brand gave.

## What we gave up

Being able to ship one file. Two stylesheets is one more thing to load and one
more place to look, and a component whose shape and colour are genuinely
coupled has to be written across both.

We also gave up brand-specific geometry. If a client's identity genuinely
depends on unusually tight spacing, this system will not express it without a
change that reaches every other client.

## What breaks if this changes

The reusability, immediately and invisibly. One colour in `system.css` is not a
problem; it is a precedent, and the file stops being droppable into the next
project without review. If the brand layer needs to move a size, the geometry
is wrong — fix it here, for everyone, rather than letting one client drift.
