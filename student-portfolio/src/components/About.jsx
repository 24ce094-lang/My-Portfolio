// About.jsx — Practical 1: standalone About component
function About() {
  return (
    <section id="about" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-divider" />
        <h2 className="section-title gradient-text animate-fade-slide">About Me</h2>
        <p className="section-subtitle animate-fade-slide delay-1">
          A little bit about who I am
        </p>

        <div className="about-grid">
          {/* Avatar Card with Real Photo */}
          <div className="about-avatar-card animate-fade-slide delay-1">
            <img
              src="/shaswat.jpg"
              alt="Shaswat Patel"
              className="about-avatar-img"
            />
          </div>

          {/* Info */}
          <div className="about-info animate-fade-slide delay-2">
            <h2>
              Computer Science Student &amp;{' '}
              <span className="gradient-text">Web Developer</span>
            </h2>
            <p>
              I'm a 5th-semester student at Charotar University of Science and
              Technology (CHARUSAT), specialising in Advanced Web Development
              Frameworks. My passion lies in creating clean, user-centric
              interfaces and robust back-end systems.
            </p>
            <p>
              I enjoy solving real-world problems through code and continuously
              expand my skillset by working on open-source projects and
              participating in hackathons.
            </p>

            <div className="about-stats">
              <div className="stat-box">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Coding</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">5th</div>
                <div className="stat-label">Semester</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
