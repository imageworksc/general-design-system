/* ==========================================================================
   Entrance reveals — the one thing on the page that needs a script, because
   it has to know when a section comes into view.

   Loaded with `defer`, so the document is parsed by the time this runs.
   Delete the file and the <script> tag if the page has no [data-reveal].
   ========================================================================== */

'use strict';

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function setupReveals() {
  const targets = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!targets.length) return;

  /* Either way the flag goes on: the stylesheet only hides a target while the
     page is in a position to bring it back. Without this attribute nothing is
     ever hidden, so a failed script leaves a readable page. */
  root.setAttribute('data-anim', 'on');

  if (reduced.matches || !('IntersectionObserver' in window)) {
    for (const el of targets) el.classList.add('is-revealed');
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: .12 });

  for (const el of targets) io.observe(el);

  /* The negative rootMargin means anything sitting in the last slice of a
     fully-scrolled page would never trigger. Once the visitor reaches the
     bottom, reveal whatever is still waiting. */
  const revealRemainder = () => {
    const atBottom = window.innerHeight + window.scrollY >=
                     document.documentElement.scrollHeight - 2;
    if (!atBottom) return;

    for (const el of targets) {
      if (el.classList.contains('is-revealed')) continue;
      el.classList.add('is-revealed');
      io.unobserve(el);
    }
    window.removeEventListener('scroll', revealRemainder);
  };

  window.addEventListener('scroll', revealRemainder, { passive: true });
  window.addEventListener('load', revealRemainder);
  revealRemainder();
}

setupReveals();
