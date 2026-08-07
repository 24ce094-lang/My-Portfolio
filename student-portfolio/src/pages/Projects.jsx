// Projects.jsx — Practical 3: GitHub API fetch with loading, error, and fallback data
import { useState, useEffect } from 'react';

const GITHUB_USERNAME = '24ce094-lang';

// Fallback data shown when GitHub API is rate-limited (60 req/hr unauthenticated)
const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'Student_placement_pro',
    description: 'A comprehensive student placement management system built with modern web technologies.',
    html_url: `https://github.com/${GITHUB_USERNAME}/Student_placement_pro`,
    language: 'JavaScript',
    stargazers_count: 0,
  },
  {
    id: 2,
    name: 'student_placement-pro',
    description: 'Enhanced version of the student placement platform with advanced features.',
    html_url: `https://github.com/${GITHUB_USERNAME}/student_placement-pro`,
    language: 'JavaScript',
    stargazers_count: 0,
  },
  {
    id: 3,
    name: 'Mentor-Selector',
    description: 'Smart mentor selection application to help students find the right guidance.',
    html_url: `https://github.com/${GITHUB_USERNAME}/Mentor-Selector`,
    language: 'Python',
    stargazers_count: 0,
  },
  {
    id: 4,
    name: 'SGP-TESTING-',
    description: 'Student Group Project testing repository for collaborative development.',
    html_url: `https://github.com/${GITHUB_USERNAME}/SGP-TESTING-`,
    language: 'HTML',
    stargazers_count: 0,
  },
];

function Projects() {
  const [repos,    setRepos]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [fromApi,  setFromApi]  = useState(true);  // false = showing fallback

  useEffect(() => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`,
      { signal: controller.signal }
    )
      .then(res => {
        if (res.status === 403) {
          throw new Error('rate_limited');
        }
        if (res.status === 404) {
          throw new Error('user_not_found');
        }
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setRepos(data);
        setFromApi(true);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;

        // On rate-limit or network failure → show fallback repos
        if (err.message === 'rate_limited' || err.message.includes('fetch')) {
          setRepos(FALLBACK_REPOS);
          setFromApi(false);
          setError('rate_limited');
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // ── Loading state ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="spinner-wrap" id="loading-spinner">
            <div className="spinner" />
            <p>Fetching GitHub repositories…</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Hard error (user not found, etc.) ──────────────────────────────
  if (error && error !== 'rate_limited') {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="error-banner" id="error-message" role="alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Render repos (live or fallback) ────────────────────────────────
  const LANG_COLORS = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python:     '#3776ab',
    HTML:       '#e34c26',
    CSS:        '#264de4',
    Java:       '#b07219',
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="section-divider" />
        <h1 className="section-title gradient-text animate-fade-slide">
          GitHub Projects
        </h1>
        <p className="section-subtitle animate-fade-slide delay-1">
          {fromApi
            ? `Live data from GitHub API · ${repos.length} repositories`
            : 'My repositories on GitHub'}
        </p>

        {/* Rate-limit notice (soft warning, repos still shown) */}
        {error === 'rate_limited' && (
          <div
            style={{
              padding: '14px 20px',
              borderRadius: '10px',
              background: 'rgba(234, 179, 8, 0.08)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              color: '#fde68a',
              fontSize: '0.88rem',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>⚡</span>
            <span>
              GitHub API rate limit reached (60 req/hr) — showing pinned repos.{' '}
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#fbbf24', fontWeight: 600 }}
              >
                View all on GitHub ↗
              </a>
            </span>
          </div>
        )}

        <div className="repo-grid" id="repo-list">
          {repos.map((repo, index) => (
            <div
              key={repo.id}
              className="glass-card repo-card animate-fade-slide"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="repo-icon">📦</div>

              {/* Repo name */}
              <h3 className="repo-name">{repo.name}</h3>

              {/* Description */}
              <p className="repo-desc">
                {repo.description || 'No description provided.'}
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                {repo.language && (
                  <span
                    className="badge"
                    style={{
                      fontSize: '0.75rem',
                      color: LANG_COLORS[repo.language] || '#a78bfa',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: LANG_COLORS[repo.language] || '#a78bfa',
                        display: 'inline-block',
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    ⭐ {repo.stargazers_count}
                  </span>
                )}
              </div>

              {/* html_url link */}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="repo-link"
                style={{ marginTop: '20px', display: 'inline-flex' }}
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>

        {/* Link to full profile */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            🐙 &nbsp;See All Repositories on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default Projects;
