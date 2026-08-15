// Contact.jsx — Liquid Glass contact form with mailto handler
import { useState, useEffect, useRef } from 'react';

const RECIPIENT = 'Shaswatpatel111@gmail.com';

function Contact() {
  const [name,      setName]      = useState('');
  const [email,     setEmail]     = useState('');
  const [message,   setMessage]   = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHelp,  setShowHelp]  = useState(false);
  const sectionRef = useRef(null);

  const MAX_CHARS = 500;

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    sectionRef.current?.querySelectorAll('.reveal')?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(
      `Hi Shaswat,\n\nName : ${name}\nEmail: ${email}\n\n${message}\n\n— Sent via your portfolio`
    );
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  }

  const DETAILS = [
    { icon: '📧', label: 'Email',      value: 'Shaswatpatel111@gmail.com' },
    { icon: '🏫', label: 'University', value: 'CHARUSAT, Anand, Gujarat' },
    { icon: '💼', label: 'Open To',    value: 'Internships & Freelance' },
    {
      icon: '🐙',
      label: 'GitHub',
      value: (
        <a
          href="https://github.com/24ce094-lang"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--ios-blue)', fontWeight: 700, fontSize: '0.95rem' }}
        >
          github.com/24ce094-lang ↗
        </a>
      ),
    },
  ];

  return (
    <div className="page-wrapper" ref={sectionRef}>
      <div className="container">
        <div className="section-divider reveal" />
        <h1 className="section-title gradient-text reveal animate-fade-slide">
          Get In Touch
        </h1>
        <p className="section-subtitle reveal animate-fade-slide delay-1">
          Have a project idea or just want to say hi?
        </p>

        <div className="contact-layout">
          {/* ── Left: contact info ─────────────────────────────────── */}
          <div className="contact-info">
            <h2 className="reveal">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="reveal" style={{ transitionDelay: '0.08s' }}>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of an innovative team.
            </p>

            {DETAILS.map((d, i) => (
              <div
                key={d.label}
                className="contact-detail reveal"
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className="contact-detail-icon">{d.icon}</span>
                <div className="contact-detail-text">
                  <h4>{d.label}</h4>
                  <p>{d.value}</p>
                </div>
              </div>
            ))}

            {/* Practical 2: toggle help panel */}
            <div className="reveal" style={{ marginTop: '24px', transitionDelay: '0.42s' }}>
              <button
                id="help-toggle-btn"
                className="btn btn-outline"
                onClick={() => setShowHelp(prev => !prev)}
                aria-expanded={showHelp}
                style={{ fontSize: '0.88rem', padding: '10px 22px' }}
              >
                {showHelp ? '✕ Hide Tips' : '💡 Message Tips'}
              </button>
            </div>

            <div className={`help-panel ${showHelp ? 'open' : ''}`} id="help-panel">
              <div className="help-content" style={{ marginTop: '16px' }}>
                <strong>Tips for a great message:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '18px' }}>
                  <li>Introduce yourself briefly</li>
                  <li>Describe the project or opportunity</li>
                  <li>Mention your expected timeline</li>
                  <li>Include your contact email so I can reply</li>
                </ul>
                <p style={{ marginTop: '8px', fontSize: '0.82rem', opacity: 0.8 }}>
                  Clicking "Send Message" will open your default mail app pre-filled — just hit Send there.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: form ─────────────────────────────────────────── */}
          <form
            className="glass-card form-card reveal"
            id="contact-form"
            onSubmit={handleSubmit}
            style={{ transitionDelay: '0.14s' }}
          >
            {submitted && (
              <div className="success-banner" id="success-message" style={{ marginBottom: '28px' }}>
                <strong>✅ Your mail app should have opened!</strong>
                <p>
                  The message is pre-filled — just click Send in your email client to
                  deliver it to <strong>Shaswatpatel111@gmail.com</strong>.
                </p>
              </div>
            )}

            <div className="form-row">
              <div>
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="form-label" htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder="Tell me about your project or idea…"
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={MAX_CHARS}
                required
              />
              <p className="form-char-count" id="char-count">
                {message.length} / {MAX_CHARS}
              </p>
            </div>

            <button
              id="submit-btn"
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Send Message ✉️
            </button>

            <p style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Opens your mail app pre-filled → just click Send there.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
