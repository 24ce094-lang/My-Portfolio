// useScrollReveal.js — Smooth IntersectionObserver for scroll reveals
import { useEffect } from 'react';

/**
 * Pass a ref to a container. All children with class
 * `reveal`, `reveal-left`, `reveal-right`, `reveal-scale`, or `reveal-flip`
 * will animate in once they cross the viewport threshold and stay visible.
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
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
