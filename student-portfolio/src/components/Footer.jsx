import { Link } from 'react-router-dom';

// Footer.jsx — Apple Liquid Glass Footer Island with interactive pills and smooth back-to-top
function Footer() {
  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer-section">
      <div className="container">
        {/* Liquid Glass Island Container */}
        <div className="footer-glass-card">
          {/* Ambient luminous glow behind card */}
          <div className="footer-ambient-glow" aria-hidden="true" />

          {/* Top Bar: Status Badge + Back to Top */}
          <div className="footer-top-row">
            <div className="footer-status-badge">
              <span className="status-pulse-dot" />
              <span className="status-text">Available for Work &amp; Internships</span>
            </div>

            <button
              onClick={scrollToTop}
              className="footer-top-btn"
              aria-label="Scroll to top of page"
              title="Back to top"
            >
              <span>Back to Top</span>
              <span className="top-arrow">↑</span>
            </button>
          </div>

          {/* Center Content: Brand + Tagline */}
          <div className="footer-main-content">
            <div className="footer-brand-wrap">
              <span className="footer-logo">SP.</span>
              <span className="footer-role-chip">Full-Stack &amp; AI/ML Dev</span>
            </div>
            <p className="footer-tagline">
              Crafting fluid interfaces, scalable systems, and delightful digital experiences.
            </p>
          </div>

          {/* Liquid Glass Navigation & Social Pills */}
          <div className="footer-nav-pills">
            <Link to="/" className="footer-pill">
              <span>🏠 Home</span>
            </Link>
            <Link to="/projects" className="footer-pill">
              <span>🚀 Projects</span>
            </Link>
            <Link to="/contact" className="footer-pill">
              <span>✉️ Contact</span>
            </Link>
            <a
              href="https://github.com/24ce094-lang"
              target="_blank"
              rel="noreferrer"
              className="footer-pill footer-pill-external"
            >
              <span>🐙 GitHub ↗</span>
            </a>
            <a
              href="https://linkedin.com/in/shaswat-patel-b96987332"
              target="_blank"
              rel="noreferrer"
              className="footer-pill footer-pill-external"
            >
              <span>💼 LinkedIn ↗</span>
            </a>
            <a
              href="https://leetcode.com/u/Shsawat_651/"
              target="_blank"
              rel="noreferrer"
              className="footer-pill footer-pill-external"
            >
              <span>🧩 LeetCode ↗</span>
            </a>
          </div>

          {/* Bottom Row: Luminous Divider + Copyright */}
          <div className="footer-bottom-row">
            <p className="footer-copy">
              © {currentYear} <strong>Shaswat Patel</strong> · CHARUSAT · Advanced Web Dev Frameworks
            </p>
            <span className="footer-framework-tag">
              ⚡ Built with React 19 &amp; Liquid Glass UI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
