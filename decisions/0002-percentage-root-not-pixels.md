# 0002 · The root steps in percentages, never pixels

**Status** Settled
**Date** 2026-09-22
**Touches** the four `html { font-size }` declarations

## What we decided

`html { font-size: 100% }`, stepping to `112.5%`, `125%` and `143.75%`. Never
`16px`, `18px`, `20px`, `23px` — even though those are the values the
percentages resolve to.

## Why

A visitor who has raised their browser's default text size has done so because
they need to. A percentage multiplies their setting; a pixel value replaces it.

Someone running a 20px default gets 22.5px body copy from our first step. Write
`font-size: 18px` instead and they get 18px — we have quietly taken away an
accessibility setting they deliberately turned on, and there is no way for them
to get it back short of browser zoom.

The comments in the stylesheet carry the px equivalents, so nobody has to do
the arithmetic to know what a step means.

## What we gave up

Legibility of the source, slightly. `143.75%` is not a number anyone reads as
23px without the comment beside it, and the temptation to tidy it into pixels
is real. That temptation is the reason this record exists.

## What breaks if this changes

Nothing visible in testing, which is the danger. Every reviewer on a default
browser setting sees exactly the same page either way. The people it breaks are
the ones who will not file a bug about it.
