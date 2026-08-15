// Skills.jsx — Liquid Glass tinted pills with staggered flip reveal + per-skill glow
import { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const SKILL_COLORS = {
  'React':        'rgba(97,218,251,0.35)',
  'JavaScript':   'rgba(247,223,30,0.35)',
  'HTML5':        'rgba(227,76,38,0.35)',
  'CSS3':         'rgba(38,77,228,0.35)',
  'Node.js':      'rgba(104,160,99,0.35)',
  'Python':       'rgba(55,118,171,0.35)',
  'Git & GitHub': 'rgba(240,80,50,0.35)',
  'Vite':         'rgba(189,52,254,0.35)',
  'REST APIs':    'rgba(0,201,167,0.35)',
  'SQL':          'rgba(0,114,209,0.35)',
  'Figma':        'rgba(162,89,255,0.35)',
  'TypeScript':   'rgba(49,120,198,0.35)',
};

function Skills({ skillsList }) {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '96px 0' }}>
      <div className="section-divider reveal" />
      <h2 className="section-title gradient-text reveal">Skills &amp; Technologies</h2>
      <p className="section-subtitle reveal td-1">Tools and technologies I work with</p>

      <div className="skills-grid">
        {skillsList.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="skill-pill reveal-flip"
            style={{
              animationDelay: `${index * 0.055}s`,
              transitionDelay: `${index * 0.055}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 8px 28px ${SKILL_COLORS[skill.name] || 'rgba(91,141,238,0.30)'}, inset 0 1px 0 rgba(255,255,255,0.25)`;
              e.currentTarget.style.borderColor = (SKILL_COLORS[skill.name] || 'rgba(91,141,238,0.40)').replace('0.35)', '0.5)');
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.borderColor = '';
            }}
          >
            <span className="skill-icon">{skill.icon || '⚡'}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
