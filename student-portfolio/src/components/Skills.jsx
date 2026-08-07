// Skills.jsx — Practical 1: receives `skillsList` array as a prop and renders it
function Skills({ skillsList }) {

  return (
    <section id="skills" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-divider" />
        <h2 className="section-title gradient-text animate-fade-slide">
          Skills &amp; Technologies
        </h2>
        <p className="section-subtitle animate-fade-slide delay-1">
          Tools and technologies I work with
        </p>

        <div className="skills-grid">
          {skillsList.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="skill-pill"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <span className="skill-icon">{skill.icon || '⚡'}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
