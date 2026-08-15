// ScrollProgress.jsx — Thin gradient progress bar at top of viewport
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: `${pct}%`,
        height: '3px',
        background: 'linear-gradient(90deg, #5b8dee, #bf5af2, #5ac8fa)',
        zIndex: 9999,
        transition: 'width 0.1s linear',
        boxShadow: '0 0 12px rgba(91,141,238,0.8), 0 0 24px rgba(191,90,242,0.5)',
        borderRadius: '0 2px 2px 0',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
