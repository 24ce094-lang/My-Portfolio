// Footer.jsx — Practical 1: reusable footer with contact / copyright info
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
          <li><a href="/">Home</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </li>
        </ul>

        <p className="footer-copy">
          © {currentYear} Shaswat Patel · CHARUSAT · Advanced Web Dev
          Frameworks
        </p>
      </div>
    </footer>
  );
}

export default Footer;
