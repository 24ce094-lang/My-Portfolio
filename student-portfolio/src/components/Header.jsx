import { Link } from 'react-router-dom';

// Header.jsx — Hero section with 3D rotating cube, floating mini-cubes, mouse-tilt
function Header({ name, theme, heroRef }) {
  const CUBE_FACES = ['⚛️', '🚀', '💻', '🎨', '⚡', '🔗'];
  const CUBE_SIDES = ['front', 'back', 'left', 'right', 'top', 'bottom'];
  const MINI_FACES = ['f', 'b', 'l', 'r', 't', 'bo'];

  return (
    <header
      ref={heroRef}
      className="hero-section"
      style={theme ? { borderLeft: `4px solid ${theme}`, paddingLeft: '32px' } : {}}
    >
      {/* ── 3D Rotating Cube (right side) ───────────────────────── */}
      <div className="hero-3d-scene" aria-hidden="true">
        <div className="cube-3d">
          {CUBE_SIDES.map((side, i) => (
            <div key={side} className={`cube-face face-${side}`}>
              <span style={{ fontSize: '3rem', opacity: 0.55 }}>{CUBE_FACES[i]}</span>
            </div>
          ))}
        </div>

        {/* Ambient glow orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      {/* ── Floating Mini Cubes ──────────────────────────────────── */}
      {[1, 2, 3].map(n => (
        <div key={n} className={`mini-cube float-cube-${n}`} aria-hidden="true">
          <div
            className="mini-cube-inner"
            style={{
              animation: `spinMini ${8 + n * 2}s linear infinite ${n % 2 === 0 ? 'reverse' : ''}`,
            }}
          >
            {MINI_FACES.map(f => (
              <div key={f} className={`mini-face mini-face-${f}`} />
            ))}
          </div>
        </div>
      ))}

      {/* ── Hero Text Content (mouse-tilt applied via JS in Home.jsx) ─ */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-content hero-content-tilt">
          <div className="hero-eyebrow animate-fade-slide">
            <span className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Welcome to my portfolio</span>
          </div>

          <h1 className="hero-title animate-fade-slide delay-1">
            Hi, I'm <br />
            <span className="gradient-text">{name}</span>
          </h1>

          <p className="hero-desc animate-fade-slide delay-2">
            A passionate computer science student building modern, scalable
            web applications using React, Node.js, and cloud technologies.
          </p>

          <div className="hero-cta animate-fade-slide delay-3">
            <Link to="/projects" className="btn btn-primary">
              View Projects &rarr;
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
              📄 View Resume
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
