// App.jsx — Theme management + Particle Canvas + Scroll Progress
import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar         from './components/NavBar';
import Footer         from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import ScrollProgress from './components/ScrollProgress';
import Home           from './pages/Home';
import Projects       from './pages/Projects';
import Contact        from './pages/Contact';

function NotFound() {
  return (
    <div className="page-wrapper" style={{ textAlign: 'center' }}>
      <div className="container">
        <div style={{ padding: '80px 0' }}>
          <p style={{ fontSize: '6rem', marginBottom: '16px' }}>404</p>
          <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '16px' }}>
            Page Not Found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('portfolio-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <HashRouter>
      {/* Fixed background layer — particle canvas */}
      <ParticleCanvas />
      {/* Scroll progress indicator */}
      <ScrollProgress />

      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/resume"   element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="*"         element={<NotFound />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
