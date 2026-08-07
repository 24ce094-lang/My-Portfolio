// NavBar.jsx — Receives theme + toggleTheme, shows sun/moon toggle button
import { NavLink } from 'react-router-dom';

function NavBar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar" id="main-navbar">
      <div className="container">
        <NavLink to="/" className="nav-logo">SP.</NavLink>

        <div className="nav-right">
          <ul className="nav-links" role="list">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Light / Dark toggle */}
          <button
            id="theme-toggle"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
