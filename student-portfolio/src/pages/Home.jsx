// Home.jsx — Composes Header, About, Skills; adds mouse-parallax 3D tilt on hero
import { useRef, useEffect } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Resume from '../components/Resume';
import Skills from '../components/Skills';

const MY_SKILLS = [
  { name: 'React',        icon: '⚛️' },
  { name: 'JavaScript',   icon: '🟨' },
  { name: 'HTML5',        icon: '🌐' },
  { name: 'CSS3',         icon: '🎨' },
  { name: 'Node.js',      icon: '🟩' },
  { name: 'Python',       icon: '🐍' },
  { name: 'Git & GitHub', icon: '🐙' },
  { name: 'Vite',         icon: '⚡' },
  { name: 'REST APIs',    icon: '🔗' },
  { name: 'SQL',          icon: '🗄️' },
  { name: 'Figma',        icon: '🖌️' },
  { name: 'TypeScript',   icon: '🔷' },
];

function Home() {
  const heroRef = useRef(null);

  // Mouse-parallax 3D tilt — tilts hero text with perspective as cursor moves
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    function handleMouseMove(e) {
      const rect = hero.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rotY = ((e.clientX - cx) / rect.width)  *  8;  // ±4 deg
      const rotX = ((e.clientY - cy) / rect.height) * -6;  // ±3 deg

      const el = hero.querySelector('.hero-content-tilt');
      if (el) {
        el.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
      }
    }

    function handleMouseLeave() {
      const el = hero.querySelector('.hero-content-tilt');
      if (el) el.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    }

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <main>
      {/* Passes heroRef so Header can attach it to the <header> element */}
      <Header name="Shaswat Patel" theme="#6c63ff" heroRef={heroRef} />

      <div className="container">
        <About />
        <Resume />
        <Skills skillsList={MY_SKILLS} />
      </div>
    </main>
  );
}

export default Home;
