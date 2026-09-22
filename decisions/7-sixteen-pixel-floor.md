# 7 · Body copy and form fields never go under 16px

**Status** Settled
**Date** 2026-09-22
**Touches** `--text-base`, `.field`, and every page that uses them

## What we decided

`--text-base` floors at `1rem`, and `.field` uses `max(1rem, var(--text-base))`
so no arithmetic can take an input below it. `--text-sm` and `--text-xs` exist,
but for chrome — a caption, a tag, a skip link — never for body copy.

## Why

Two separate reasons that happen to land on the same number.

Readability: below 16px, body copy on a phone held at arm's length is hard work
for a substantial share of readers, and the share grows with the audience's
age.

And iOS. Safari zooms the page when a focused input has a font size under 16px,
which yanks the layout sideways mid-form. It is not a rendering bug to work
around — it is the platform deciding the text was too small to type into, and
it is right.

This is the one place in the type scale where the value is a floor rather than
a guideline. Everything else in the ladder is "approximately"; this is not.

## What we gave up

Compactness in dense interfaces. A data table or a sidebar of metadata would
often prefer 14px, and `--text-sm` is there for exactly that — but the moment
the content is something a visitor reads rather than scans, it goes back to
`--text-base`.

## What breaks if this changes

On a phone: legibility, quietly. In a form: the layout, loudly, and only on
iOS — which is the kind of bug that reaches a client before it reaches the
person who wrote it.
