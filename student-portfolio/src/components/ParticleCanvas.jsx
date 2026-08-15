// ParticleCanvas.jsx — Professional Interactive Animated Wallpaper Engine
import { useEffect, useRef } from 'react';

const NODE_COUNT_DESKTOP = 85;
const NODE_COUNT_MOBILE = 45;
const CONNECTION_DIST = 145;
const MOUSE_INTERACTION_DIST = 180;

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Rich, professional, brighter tech color shades
    const COLOR_PALETTE = [
      { r: 99,  g: 140, b: 255, name: 'electric-blue' }, // vibrant royal blue
      { r: 176, g: 106, b: 255, name: 'radiant-purple'}, // luminous violet
      { r: 38,  g: 208, b: 245, name: 'cyan-glow'     }, // electric aqua
      { r: 46,  g: 224, b: 154, name: 'mint-emerald'  }, // bright mint emerald
      { r: 255, g: 142, b: 60,  name: 'sunset-amber'  }, // warm luminous amber
      { r: 255, g: 95,  b: 150, name: 'radiant-pink'   }, // bright neon rose
    ];

    // Smooth spring mouse state
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
      radius: MOUSE_INTERACTION_DIST,
    };

    // Ambient floating glow orbs in the background
    const ambientOrbs = [
      { xRatio: 0.15, yRatio: 0.25, r: 320, color: 'rgba(99, 140, 255, 0.14)', vx: 0.12, vy: 0.08, phase: 0 },
      { xRatio: 0.85, yRatio: 0.20, r: 360, color: 'rgba(176, 106, 255, 0.13)', vx: -0.10, vy: 0.10, phase: Math.PI / 3 },
      { xRatio: 0.50, yRatio: 0.75, r: 400, color: 'rgba(38, 208, 245, 0.12)', vx: 0.08, vy: -0.11, phase: Math.PI / 2 },
      { xRatio: 0.20, yRatio: 0.85, r: 280, color: 'rgba(46, 224, 154, 0.10)', vx: -0.09, vy: -0.07, phase: Math.PI },
      { xRatio: 0.80, yRatio: 0.80, r: 300, color: 'rgba(255, 142, 60, 0.09)', vx: 0.11, vy: -0.08, phase: Math.PI * 1.5 },
    ];

    let nodes = [];

    function initNodes() {
      const isMobile = width < 768;
      const count = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
      nodes = [];

      for (let i = 0; i < count; i++) {
        const c = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
        const layer = Math.random(); // 0 (deep background) to 1 (foreground)
        
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          originVx: (Math.random() - 0.5) * (0.35 + layer * 0.45),
          originVy: (Math.random() - 0.5) * (0.35 + layer * 0.45),
          vx: (Math.random() - 0.5) * (0.35 + layer * 0.45),
          vy: (Math.random() - 0.5) * (0.35 + layer * 0.45),
          radius: 1.2 + layer * 2.6,
          color: c,
          baseAlpha: 0.45 + layer * 0.45,
          pulseSpeed: 0.015 + Math.random() * 0.025,
          pulsePhase: Math.random() * Math.PI * 2,
          layer,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    }

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    function render() {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      }

      // ── 1. Render Floating Ambient Radiant Light Glows ──
      for (let i = 0; i < ambientOrbs.length; i++) {
        const orb = ambientOrbs[i];
        const ox = (orb.xRatio * width) + Math.sin(time * 0.8 + orb.phase) * 60;
        const oy = (orb.yRatio * height) + Math.cos(time * 0.7 + orb.phase) * 45;
        const currentR = orb.r * (1 + Math.sin(time + orb.phase) * 0.08);

        const orbGrd = ctx.createRadialGradient(ox, oy, 0, ox, oy, currentR);
        orbGrd.addColorStop(0, orb.color);
        orbGrd.addColorStop(0.5, orb.color.replace(/[\d.]+\)$/, '0.04)'));
        orbGrd.addColorStop(1, 'transparent');

        ctx.fillStyle = orbGrd;
        ctx.beginPath();
        ctx.arc(ox, oy, currentR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. Render Interactive Cursor Aura Glow ──
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const cursorGrd = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 1.2
        );
        cursorGrd.addColorStop(0, 'rgba(120, 165, 255, 0.22)');
        cursorGrd.addColorStop(0.4, 'rgba(176, 106, 255, 0.10)');
        cursorGrd.addColorStop(1, 'transparent');

        ctx.fillStyle = cursorGrd;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 3. Update Nodes & Physics ──
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];

        // Cursor dynamic interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            // Smooth elastic push-pull
            const force = (1 - dist / mouse.radius);
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.18;
            p.vy += Math.sin(angle) * force * 0.18;
          }
        }

        // Apply friction & restore gentle base drift
        p.vx = p.vx * 0.96 + p.originVx * 0.04;
        p.vy = p.vy * 0.96 + p.originVy * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries smoothly
        const pad = 30;
        if (p.x < -pad) p.x = width + pad;
        if (p.x > width + pad) p.x = -pad;
        if (p.y < -pad) p.y = height + pad;
        if (p.y > height + pad) p.y = -pad;

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha * (0.8 + Math.sin(p.pulsePhase) * 0.25);

        // ── 4. Constellation Connection Lines ──
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j];
          const qx = q.x - p.x;
          const qy = q.y - p.y;
          const d = Math.sqrt(qx * qx + qy * qy);

          if (d < CONNECTION_DIST) {
            const lineFactor = 1 - (d / CONNECTION_DIST);
            const alpha = lineFactor * 0.32 * Math.min(p.baseAlpha, q.baseAlpha);

            // Dynamic gradient line blending both nodes' vibrant colors
            const lineGrd = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
            lineGrd.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
            lineGrd.addColorStop(1, `rgba(${q.color.r}, ${q.color.g}, ${q.color.b}, ${alpha * 0.8})`);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lineGrd;
            ctx.lineWidth = 0.9 + lineFactor * 0.7;
            ctx.stroke();
          }
        }

        // Connect nearby nodes to cursor with radiant beam
        if (mouse.active) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < mouse.radius * 0.85) {
            const mFactor = 1 - (mdist / (mouse.radius * 0.85));
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${mFactor * 0.35})`;
            ctx.lineWidth = 1.2 * mFactor;
            ctx.stroke();
          }
        }

        // ── 5. Render Glowing Particle Node ──
        const { r, g, b } = p.color;
        const glowRadius = p.radius * 3.6;

        // Outer ambient halo
        const haloGrd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        haloGrd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.85})`);
        haloGrd.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.35})`);
        haloGrd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = haloGrd;
        ctx.fill();

        // Solid luminous core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, currentAlpha * 1.2)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    }

    render();

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      className="animated-wallpaper-wrapper"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Background Animated Dynamic Aurora Glow Layer */}
      <div className="wallpaper-aurora-mesh" />

      {/* Hi-Def Interactive Canvas with Luminous Constellations & Energy Waves */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.95,
        }}
      />

      {/* Subtle Luminous Tech Grid Texture */}
      <div className="wallpaper-grid-overlay" />
    </div>
  );
}
