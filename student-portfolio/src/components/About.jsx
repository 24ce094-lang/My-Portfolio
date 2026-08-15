// About.jsx — Liquid Glass About with multi-directional scroll reveals + counter animation
import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

// Animated counter hook
function useCounter(target, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(target);
    const suffix = target.replace(/[\d.]/g, '');
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.floor(eased * num) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count || '0';
}

function StatBox({ num, label, icon, delay }) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCounter(num, 1400, triggered);

  return (
    <div
      ref={ref}
      className="stat-box reveal-scale"
      style={{ transitionDelay: delay }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{icon}</div>
      <div className="stat-number">{triggered ? count : '0'}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function About() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section id="about" ref={sectionRef} style={{ padding: '96px 0' }}>
      <div className="section-divider reveal" />
      <h2 className="section-title gradient-text reveal">About Me</h2>
      <p className="section-subtitle reveal">A little bit about who I am</p>

      <div className="about-grid">
        {/* Avatar slides in from left */}
        <div className="about-avatar-card reveal-left">
          <img
            src="/shaswat.jpg"
            alt="Shaswat Patel"
            className="about-avatar-img"
          />
        </div>

        {/* Info slides in from right */}
        <div className="about-info">
          <h2 className="reveal-right">
            Computer Science Student &amp;{' '}
            <span className="gradient-text">Web Developer</span>
          </h2>
          <p className="reveal td-1">
            I'm a 5th-semester student at Charotar University of Science and
            Technology (CHARUSAT), specialising in Advanced Web Development
            Frameworks. My passion lies in creating clean, user-centric
            interfaces and robust back-end systems.
          </p>
          <p className="reveal td-2">
            I enjoy solving real-world problems through code and continuously
            expand my skillset by working on open-source projects and
            participating in hackathons.
          </p>

          {/* Animated counter stat boxes */}
          <div className="about-stats">
            <StatBox num="5+" label="Projects Built" icon="🚀" delay="0.1s" />
            <StatBox num="3+" label="Years Coding"   icon="💻" delay="0.2s" />
            <StatBox num="5+" label="Semester"       icon="🎓" delay="0.3s" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
