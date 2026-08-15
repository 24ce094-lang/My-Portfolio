import { Link } from 'react-router-dom';

// Header.jsx — Hero section with Liquid Glass Orb, floating badge chips, mouse-tilt
function Header({ name, heroRef }) {
  const CHIPS = [
    { label: '⚛️  React Dev',       style: { top: '14%',  right: '3%',  '--chip-dur': '7s',  '--chip-delay': '0s',   '--chip-rot': '-3deg' } },
    { label: '🟩  Node.js',         style: { top: '40%',  right: '0%',  '--chip-dur': '9s',  '--chip-delay': '1.2s', '--chip-rot': '2deg'  } },
    { label: '✅  Open to Work',    style: { bottom: '22%', right: '4%', '--chip-dur': '8s',  '--chip-delay': '0.6s', '--chip-rot': '-1deg' } },
  ];

  return (
    <header ref={heroRef} className="hero-section">

      {/* ── Ambient glow orbs ────────────────────────────────────── */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      {/* ── Liquid Glass Orb ─────────────────────────────────────── */}
      <div className="hero-3d-scene" aria-hidden="true">
        <div className="liquid-orb">
          <div className="orb-ring orb-ring-1" />
          <div className="orb-ring orb-ring-2" />
          <div className="orb-ring orb-ring-3" />
        </div>

        {/* Floating badge chips */}
        {CHIPS.map((chip, i) => (
          <div key={i} className="hero-chip" style={chip.style}>
            {chip.label}
          </div>
        ))}
      </div>

      {/* ── Floating mini orbs ───────────────────────────────────── */}
      <div className="mini-cube float-cube-1" aria-hidden="true">
        <div className="mini-orb" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(91,141,238,0.9), rgba(91,141,238,0.2))', color: 'rgba(91,141,238,0.6)' }} />
      </div>
      <div className="mini-cube float-cube-2" aria-hidden="true">
        <div className="mini-orb" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(191,90,242,0.9), rgba(191,90,242,0.2))', color: 'rgba(191,90,242,0.6)' }} />
      </div>
      <div className="mini-cube float-cube-3" aria-hidden="true">
        <div className="mini-orb" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(50,215,75,0.9), rgba(50,215,75,0.2))', color: 'rgba(50,215,75,0.6)' }} />
      </div>

      {/* ── Hero Text Content ─────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-glass-card hero-content-tilt" style={{ maxWidth: 620 }}>

          <div className="hero-eyebrow animate-fade-slide">
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Portfolio · 2026</span>
          </div>

          <h1 className="hero-title animate-fade-slide delay-1">
            Hi, I'm&nbsp;<br />
            <span className="gradient-text">{name}</span>
          </h1>

          <p className="hero-desc animate-fade-slide delay-2">
            A passionate computer science student building modern, scalable
            web applications with React, Node.js, and cloud technologies.
          </p>

          <div className="hero-cta animate-fade-slide delay-3">
            <Link to="/projects" className="btn btn-primary">
              View Projects →
            </Link>
            <a
              href="#resume"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault();
                const resumeEl = document.getElementById('resume');
                if (resumeEl) {
                  resumeEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open('/shaswat_patel_resume.pdf', '_blank');
                }
              }}
            >
              📄 Resume
            </a>
            <Link to="/contact" className="btn btn-outline">
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
