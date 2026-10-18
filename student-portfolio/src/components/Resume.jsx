import { useState } from 'react';
import githubData from '../data/github-repositories.json';

function Resume() {
  const [activeTab, setActiveTab] = useState('all');
  const [copied, setCopied] = useState(false);

  function handleCopyContact() {
    navigator.clipboard.writeText('shsaswatpatel111@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="resume" className="resume-section" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-divider" />
        <div className="resume-top-bar">
          <div>
            <h2 className="section-title gradient-text animate-fade-slide">My Resume</h2>
            <p className="section-subtitle animate-fade-slide delay-1" style={{ marginBottom: '24px' }}>
              Curriculum Vitae, Academic Background & Highlights
            </p>
          </div>

          <div className="resume-actions animate-fade-slide delay-2">
            <a
              href="/shaswat_patel_resume.pdf"
              download="Shaswat_Patel_Resume.pdf"
              className="btn btn-primary"
              title="Download PDF Resume"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>

            <button
              onClick={handleCopyContact}
              className="btn btn-outline"
              title="Copy Email"
              style={{ minHeight: '46px' }}
            >
              {copied ? '✓ Email Copied!' : '📋 Copy Email'}
            </button>
          </div>
        </div>

        {/* Resume Card Layout */}
        <div className="glass-card resume-main-card animate-fade-slide delay-2">
          {/* Header Banner inside card */}
          <div className="resume-card-header">
            <div className="resume-user-info">
              <h3>Shaswat Trusharkumar Patel</h3>
              <p className="resume-subtitle-role">Computer Engineering Student & Full-Stack Developer</p>
              <div className="resume-contact-chips">
                <span>📍 CHARUSAT, Anand, Gujarat</span>
                <span>📧 shsaswatpatel111@gmail.com</span>
                <span>📞 +91 8160043432</span>
                <a href="https://github.com/24ce094-lang" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
                <a href="https://linkedin.com/in/shaswat-patel-b96987332" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
                <a href="https://leetcode.com/u/Shsawat_651/" target="_blank" rel="noopener noreferrer">🧩 LeetCode</a>
              </div>
            </div>
          </div>

          {/* Career Objective Banner */}
          <div className="resume-objective-box">
            <span className="objective-label">🎯 Career Objective</span>
            <p>
              Motivated Computer Engineering student seeking an AIML/Software Engineering internship to apply programming skills, contribute to real-world projects, and enhance problem-solving abilities in a professional environment.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="resume-tabs" role="tablist">
            <button
              className={`resume-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Overview
            </button>
            <button
              className={`resume-tab ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              🎓 Education
            </button>
            <button
              className={`resume-tab ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              🚀 Featured Projects
            </button>
            <button
              className={`resume-tab ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              💡 Technical Skills
            </button>
            <button
              className={`resume-tab ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              🏆 Achievements & Certs
            </button>
          </div>

          {/* Tab Content */}
          <div className="resume-content-grid">
            {/* EDUCATION */}
            {(activeTab === 'all' || activeTab === 'education') && (
              <div className="resume-block">
                <div className="resume-block-title">
                  <span className="icon">🎓</span>
                  <h4>Education</h4>
                </div>
                <div className="resume-item-card">
                  <div className="resume-item-header">
                    <div>
                      <h5 className="resume-degree">Bachelor of Engineering in Computer Engineering</h5>
                      <span className="resume-institution">Charotar University of Science and Technology (CHARUSAT)</span>
                    </div>
                    <div className="resume-item-meta">
                      <span className="badge">2024 – 2028</span>
                      <span className="badge-highlight">CGPA: 7.0 (NEP)</span>
                    </div>
                  </div>
                  <p className="resume-item-desc">Currently in 2nd Year (5th Semester). Specialising in Advanced Web Development, Data Structures, and Software Engineering principles.</p>
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {(activeTab === 'all' || activeTab === 'projects') && (
              <div className="resume-block">
                <div className="resume-block-title">
                  <span className="icon">🚀</span>
                  <h4>GitHub Projects ({githubData.repositories.length})</h4>
                </div>
                <p className="resume-item-desc" style={{ marginBottom: '16px' }}>
                  Automatically synced from all public, non-fork repositories on GitHub.
                  {' '}
                  <a href={`https://github.com/${githubData.username}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                    View all repositories ↗
                  </a>
                </p>
                <div className="resume-projects-grid">
                  {githubData.repositories.map((repo) => (
                    <div className="resume-item-card" key={repo.id}>
                      <div className="resume-item-header">
                        <h5 className="resume-project-name">
                          <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                        </h5>
                        <span className="badge">{repo.language}</span>
                      </div>
                      <p className="resume-item-desc">{repo.description}</p>
                      <div className="resume-item-meta" style={{ marginTop: '10px' }}>
                        <span className="badge">★ {repo.stars}</span>
                        {repo.updated_at && (
                          <span className="badge">Updated {new Date(repo.updated_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</span>
                        )}
                        {repo.homepage && (
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="resume-item-desc" style={{ marginTop: '12px', fontSize: '0.8rem' }}>
                  Last synced: {githubData.generated_at ? new Date(githubData.generated_at).toLocaleString() : 'waiting for first sync'}.
                  {' '}GitHub sync runs every six hours.
                </p>
              </div>
            )}

            {/* TECHNICAL SKILLS */}
            {(activeTab === 'all' || activeTab === 'skills') && (
              <div className="resume-block">
                <div className="resume-block-title">
                  <span className="icon">💡</span>
                  <h4>Technical & Soft Skills</h4>
                </div>
                <div className="resume-skills-categories">
                  <div className="skill-cat-card">
                    <h6>Programming Languages</h6>
                    <div className="skill-tags">
                      <span className="tag">C</span>
                      <span className="tag">C++</span>
                      <span className="tag">Java</span>
                      <span className="tag">JavaScript</span>
                      <span className="tag">Python</span>
                    </div>
                  </div>
                  <div className="skill-cat-card">
                    <h6>Web Technologies & Databases</h6>
                    <div className="skill-tags">
                      <span className="tag">React 18</span>
                      <span className="tag">Node.js</span>
                      <span className="tag">Express</span>
                      <span className="tag">HTML5</span>
                      <span className="tag">CSS3</span>
                      <span className="tag">SQL / MySQL</span>
                      <span className="tag">OpenSearch</span>
                    </div>
                  </div>
                  <div className="skill-cat-card">
                    <h6>Tools & Frameworks</h6>
                    <div className="skill-tags">
                      <span className="tag">Git & GitHub</span>
                      <span className="tag">Docker</span>
                      <span className="tag">Redux Toolkit</span>
                      <span className="tag">JWT & RBAC</span>
                      <span className="tag">RESTful APIs</span>
                    </div>
                  </div>
                  <div className="skill-cat-card">
                    <h6>Soft Skills</h6>
                    <div className="skill-tags">
                      <span className="tag-soft">Strong Communication</span>
                      <span className="tag-soft">Confident & Quick Learner</span>
                      <span className="tag-soft">Team Collaboration</span>
                      <span className="tag-soft">Problem Solving</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACHIEVEMENTS & CERTIFICATIONS */}
            {(activeTab === 'all' || activeTab === 'achievements') && (
              <div className="resume-block">
                <div className="resume-block-title">
                  <span className="icon">🏆</span>
                  <h4>Certifications & Achievements</h4>
                </div>
                <div className="achievements-list-grid">
                  <div className="achieve-card">
                    <span className="achieve-badge">🏅 Rank 100 / 1500</span>
                    <p>Secured Top 100 rank out of 1,500 participants at DAIICT Gandhinagar Hackathon.</p>
                  </div>
                  <div className="achieve-card">
                    <span className="achieve-badge">💻 5–6 Hackathons</span>
                    <p>Active participant in competitive hackathons and web development challenges.</p>
                  </div>
                  <div className="achieve-card">
                    <span className="achieve-badge">📜 Coursera Certified</span>
                    <p>Algorithm Design: Mastering Computational Problem Solving.</p>
                  </div>
                  <div className="achieve-card">
                    <span className="achieve-badge">🧩 LeetCode Active</span>
                    <p>Consistently solving Data Structures & Algorithms challenges on LeetCode (Shsawat_651).</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
