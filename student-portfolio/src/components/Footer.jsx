import { Link } from 'react-router-dom';

// Footer.jsx — Frosted glass footer with gradient luminous top border
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-brand">SP.</div>
        <p className="footer-tagline">
          Building the web, one component at a time.
        </p>

        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <a
              href="https://github.com/24ce094-lang"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </li>
        </ul>

        <p className="footer-copy">
          © {currentYear} Shaswat Patel · CHARUSAT · Advanced Web Dev Frameworks
        </p>
      </div>
    </footer>
  );
}

export default Footer;
