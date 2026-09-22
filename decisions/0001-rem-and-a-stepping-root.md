# 0001 · Everything structural in `rem`, with a root that steps

**Status** Settled
**Date** 2026-09-22
**Touches** the whole system. This is the mechanism everything else assumes.

## What we decided

Every structural value — space, type size, container width, control height — is
declared in `rem`. The root font size is the only thing that changes across the
large breakpoints:

```css
html { font-size: 100%; }                                   /* 16px */
@media (min-width: 1800px) { html { font-size: 112.5%; } }  /* 18px */
@media (min-width: 2400px) { html { font-size: 125%; } }    /* 20px */
@media (min-width: 3200px) { html { font-size: 143.75%; } } /* 23px */
```

## Why

On a 3840px-wide panel an 1180px column covers under a third of the screen, at
a body size physically about half what the same value gives on a 1080p monitor
at the same viewing distance. Left alone the page is not "clean" — it is a
stripe of unreadably small text.

The fix is to scale the page rather than re-lay it out, and `rem` does that for
free: one rule moves the column, the type, the gaps and the control heights
together, so the proportions tuned at the design width survive intact.

It is also verifiable. A paragraph measured 605px at 17px text at the 1180px
design width, and 869px at 24.4px text at 3840px — **35.6em at both**. The line
length does not move across the entire range.

## What we gave up

The ability to tune one token independently at one breakpoint. Everything moves
together or not at all; a token needing its own curve has to leave the `rem`
system deliberately (see [0003](0003-what-stays-in-pixels.md)).

We also gave up the alternative this replaced: restating forty tokens inside
each of three media queries. That version works — it is what the ImageWorks
system does — but each new token is four declarations instead of one, and the
four drift apart the first time someone updates three of them.

## What breaks if this changes

Everything above 1800px, silently. A value written in `px` inside a page block
will not move with the rest, and on a 4K display it lands at a third of its
intended proportion. That failure does not show at the design width, which is
why it survives review.

Note that `rem` inside a **media query** always resolves against 16px, never
against the stepped root — which is what keeps the layout breakpoints from
moving under themselves as the root grows. That is load-bearing, not a detail.
