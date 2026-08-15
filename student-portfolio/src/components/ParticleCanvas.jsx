// ParticleCanvas.jsx — Interactive neural-network particle canvas fixed behind everything
import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 90;
const CONNECTION_DIST = 140;
const MOUSE_REPEL_DIST = 120;
const MOUSE_REPEL_FORCE = 0.04;

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -9999, y: -9999 };

    // iOS 26 palette
    const COLORS = [
      [91, 141, 238],   // blue
      [191, 90, 242],   // purple
      [90, 200, 250],   // teal
      [50, 215, 75],    // green
      [255, 159, 10],   // orange
    ];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Build particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x:    Math.random() * canvas.width,
        y:    Math.random() * canvas.height,
        vx:   (Math.random() - 0.5) * 0.5,
        vy:   (Math.random() - 0.5) * 0.5,
        r:    Math.random() * 2.2 + 0.8,
        color: c,
        alpha: Math.random() * 0.5 + 0.3,
      };
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update + draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
          p.vx += (dx / dist) * force * MOUSE_REPEL_FORCE;
          p.vy += (dy / dist) * force * MOUSE_REPEL_FORCE;
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx *= 0.96; p.vy *= 0.96; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const qx = q.x - p.x;
          const qy = q.y - p.y;
          const d = Math.sqrt(qx * qx + qy * qy);
          if (d < CONNECTION_DIST) {
            const lineAlpha = (1 - d / CONNECTION_DIST) * 0.25;
            const [r, g, b] = p.color;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle dot
        const [r, g, b] = p.color;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        grd.addColorStop(0, `rgba(${r},${g},${b},${p.alpha})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.65,
      }}
      aria-hidden="true"
    />
  );
}
