// NavBar.jsx — Floating Pill Navigation (Apple Liquid Glass style)
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <nav className="navbar" id="main-navbar" aria-label="Main navigation">
      <div className="container">
        {/* Brand Logo */}
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          SP.
        </NavLink>

        <div className="nav-right">
          {/* Nav Links — Desktop pill row / Mobile dropdown */}
          <ul className={`nav-links ${mobileOpen ? 'mobile-active' : ''}`} role="list">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={closeMenu}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Light / Dark theme toggle */}
          <button
            id="theme-toggle"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
