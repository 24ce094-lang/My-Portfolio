// useScrollReveal.js — Attaches IntersectionObserver to all .reveal* elements in a ref
import { useEffect } from 'react';

/**
 * Pass a ref to a container. All children with class
 * `reveal`, `reveal-left`, `reveal-right`, `reveal-scale`, or `reveal-flip`
 * will animate in once they cross the viewport threshold.
 */
export default function useScrollReveal(containerRef, deps = []) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const SELECTORS = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-flip';
    const elements  = container.querySelectorAll(SELECTORS);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Don't unobserve — so it re-animates if user scrolls back
          } else {
            // Re-animate on scroll back up — remove visible so it can retrigger
            // Comment this line out if you only want one-time reveals:
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
