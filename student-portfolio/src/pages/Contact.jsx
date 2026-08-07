// Contact.jsx — Working contact form: opens user's mail client pre-filled with the message.
// Uses mailto: — zero backend needed, works immediately.
import { useState } from 'react';

const RECIPIENT = 'Shaswatpatel111@gmail.com';

function Contact() {
  // Controlled inputs (Practical 2)
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');

  // UI states
  const [submitted, setSubmitted] = useState(false);
  const [showHelp,  setShowHelp]  = useState(false);   // Practical 2 toggle

  const MAX_CHARS = 500;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Build mailto URL — opens system mail client pre-filled
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(
      `Hi Shaswat,\n\nName : ${name}\nEmail: ${email}\n\n${message}\n\n— Sent via your portfolio`
    );
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;

    // Show success state
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="section-divider" />
        <h1 className="section-title gradient-text animate-fade-slide">
          Get In Touch
        </h1>
        <p className="section-subtitle animate-fade-slide delay-1">
          Have a project idea or just want to say hi?
        </p>

        <div className="contact-layout">
          {/* ── Left: info ─────────────────────────────────────── */}
          <div className="contact-info animate-fade-slide delay-1">
            <h2>Let's <span className="gradient-text">Connect</span></h2>
            <p>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of an innovative team.
            </p>

            <div className="contact-detail">
              <span className="contact-detail-icon">📧</span>
              <div className="contact-detail-text">
                <h4>Email</h4>
                <p>Shaswatpatel111@gmail.com</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon">🏫</span>
              <div className="contact-detail-text">
                <h4>University</h4>
                <p>CHARUSAT, Anand, Gujarat</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon">💼</span>
              <div className="contact-detail-text">
                <h4>Open To</h4>
                <p>Internships &amp; Freelance</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon">🐙</span>
              <div className="contact-detail-text">
                <h4>GitHub</h4>
                <a
                  href="https://github.com/24ce094-lang"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--accent-1)', fontWeight: 600, fontSize: '0.95rem' }}
                >
                  github.com/24ce094-lang ↗
                </a>
              </div>
            </div>

            {/* Practical 2: toggle help panel */}
            <div style={{ marginTop: '24px' }}>
              <button
                id="help-toggle-btn"
                className="btn btn-outline"
                onClick={() => setShowHelp(prev => !prev)}
                aria-expanded={showHelp}
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
                  Clicking "Send Message" will open your default mail app with the form
                  pre-filled — just hit Send there.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: form ─────────────────────────────────────── */}
          <form
            className="glass-card form-card animate-fade-slide delay-2"
            id="contact-form"
            onSubmit={handleSubmit}
          >
            {/* Success confirmation */}
            {submitted && (
              <div className="success-banner" id="success-message" style={{ marginBottom: '24px' }}>
                <strong>✅ Your mail app should have opened!</strong>
                <p>
                  The message is pre-filled — just click Send in your email client to
                  deliver it to <strong>Shaswatpatel111@gmail.com</strong>.
                </p>
              </div>
            )}

            {/* Name + Email side-by-side */}
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
              {/* Practical 2: controlled textarea — updates state on every keystroke */}
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder="Tell me about your project or idea…"
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={MAX_CHARS}
                required
              />
              {/* Live character counter from state */}
              <p className="form-char-count" id="char-count">
                {message.length} / {MAX_CHARS} characters
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

            <p style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              This will open your mail app pre-filled → just click Send there.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
