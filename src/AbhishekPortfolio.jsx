import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0f",
  surface: "#13131a",
  card: "#1a1a24",
  accent: "#00d4ff",
  accent2: "#7c3aed",
  accent3: "#06ffa5",
  text: "#e8e8f0",
  muted: "#6b6b80",
  border: "#2a2a3a",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.accent}; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.8); opacity: 0; }
  }

  @keyframes scanline {
    0% { top: -10%; }
    100% { top: 110%; }
  }

  .fade-up { animation: fadeUp 0.7s ease forwards; }

  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 2rem;
  }

  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(20px);
    background: rgba(10,10,15,0.8);
    border-bottom: 1px solid ${COLORS.border};
  }

  .nav-logo {
    font-family: 'Space Mono', monospace;
    font-size: 1.1rem;
    color: ${COLORS.accent};
    letter-spacing: 0.05em;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-link {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    color: ${COLORS.muted};
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.2s;
    background: none;
    border: none;
  }
  .nav-link:hover, .nav-link.active { color: ${COLORS.accent}; }

  .hero-content {
    text-align: center;
    position: relative;
    z-index: 2;
    max-width: 900px;
  }

  .hero-tag {
    display: inline-block;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: ${COLORS.accent};
    background: rgba(0,212,255,0.08);
    border: 1px solid rgba(0,212,255,0.2);
    padding: 0.4rem 1rem;
    border-radius: 100px;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  .hero-name {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 800;
    line-height: 1;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .hero-name span.cyan { color: ${COLORS.accent}; }
  .hero-name span.purple { color: ${COLORS.accent2}; }

  .hero-role {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.8rem, 2vw, 1rem);
    color: ${COLORS.muted};
    margin-bottom: 2.5rem;
    letter-spacing: 0.1em;
  }

  .cursor {
    display: inline-block;
    animation: blink 1s infinite;
    color: ${COLORS.accent};
  }

  .hero-btns {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: ${COLORS.accent};
    color: ${COLORS.bg};
    border: none;
    padding: 0.9rem 2rem;
    border-radius: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(0,212,255,0.3); }

  .btn-outline {
    background: transparent;
    color: ${COLORS.text};
    border: 1px solid ${COLORS.border};
    padding: 0.9rem 2rem;
    border-radius: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: ${COLORS.accent}; color: ${COLORS.accent}; transform: translateY(-2px); }

  section {
    padding: 6rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    color: ${COLORS.accent};
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    margin-bottom: 3rem;
    letter-spacing: -0.02em;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .about-avatar {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent});
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    font-weight: 800;
    color: white;
    position: relative;
    margin: 0 auto;
    animation: float 4s ease-in-out infinite;
  }

  .avatar-ring {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 2px solid rgba(0,212,255,0.3);
    animation: pulse-ring 2.5s ease-out infinite;
  }

  .about-text p {
    color: ${COLORS.muted};
    line-height: 1.8;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .about-stats {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .stat {
    text-align: center;
  }

  .stat-num {
    font-size: 2rem;
    font-weight: 800;
    color: ${COLORS.accent};
    font-family: 'Space Mono', monospace;
  }

  .stat-label {
    font-size: 0.75rem;
    color: ${COLORS.muted};
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.05em;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .skill-card {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .skill-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2});
    opacity: 0;
    transition: opacity 0.3s;
  }

  .skill-card:hover { border-color: rgba(0,212,255,0.3); transform: translateY(-4px); }
  .skill-card:hover::before { opacity: 1; }

  .skill-card-title {
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    color: ${COLORS.accent};
    text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    background: rgba(0,212,255,0.08);
    border: 1px solid rgba(0,212,255,0.15);
    color: ${COLORS.text};
    letter-spacing: 0.05em;
  }

  .project-card {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .project-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,212,255,0.03), rgba(124,58,237,0.03));
    opacity: 0;
    transition: opacity 0.3s;
  }

  .project-card:hover { border-color: rgba(0,212,255,0.25); transform: translateY(-3px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .project-card:hover::after { opacity: 1; }

  .project-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .project-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${COLORS.text};
    margin-bottom: 0.3rem;
  }

  .project-period {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: ${COLORS.accent};
    letter-spacing: 0.1em;
  }

  .project-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent});
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .project-desc {
    color: ${COLORS.muted};
    line-height: 1.7;
    font-size: 0.95rem;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.2rem;
  }

  .tech-badge {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    background: rgba(124,58,237,0.15);
    border: 1px solid rgba(124,58,237,0.3);
    color: #a78bfa;
    letter-spacing: 0.05em;
  }

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.accent2}, transparent);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 3rem;
    animation: fadeUp 0.6s ease forwards;
  }

  .timeline-dot {
    position: absolute;
    left: -2.45rem;
    top: 0.3rem;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${COLORS.accent};
    border: 2px solid ${COLORS.bg};
    box-shadow: 0 0 12px ${COLORS.accent};
  }

  .timeline-period {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: ${COLORS.accent};
    letter-spacing: 0.1em;
    margin-bottom: 0.4rem;
  }

  .timeline-role {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
  }

  .timeline-org {
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    color: ${COLORS.muted};
    margin-bottom: 1rem;
  }

  .timeline-points {
    list-style: none;
  }

  .timeline-points li {
    color: ${COLORS.muted};
    font-size: 0.9rem;
    line-height: 1.7;
    padding-left: 1rem;
    position: relative;
    margin-bottom: 0.4rem;
  }

  .timeline-points li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: ${COLORS.accent3};
    font-size: 0.7rem;
    top: 0.15rem;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.2rem;
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    text-decoration: none;
    color: ${COLORS.text};
    transition: all 0.2s;
  }

  .contact-item:hover { border-color: ${COLORS.accent}; transform: translateX(6px); }

  .contact-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(0,212,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .contact-label {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: ${COLORS.muted};
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .contact-value {
    font-size: 0.9rem;
    color: ${COLORS.text};
  }

  .contact-cta {
    background: linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08));
    border: 1px solid ${COLORS.border};
    border-radius: 16px;
    padding: 2.5rem;
    text-align: center;
  }

  .contact-cta h3 {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 0.8rem;
  }

  .contact-cta p {
    color: ${COLORS.muted};
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }

  footer {
    text-align: center;
    padding: 2rem;
    border-top: 1px solid ${COLORS.border};
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: ${COLORS.muted};
    letter-spacing: 0.1em;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: ${COLORS.muted};
    border-radius: 2px;
    transition: all 0.3s;
  }

  @media (max-width: 768px) {
    .hamburger { display: flex; }

    .nav-links {
      display: none;
      position: absolute;
      top: 100%; left: 0; right: 0;
      flex-direction: column;
      background: rgba(10,10,15,0.98);
      border-bottom: 1px solid ${COLORS.border};
      padding: 1rem 2rem;
      gap: 1rem;
    }
    .nav-links.open { display: flex; }

    .about-grid, .contact-grid { grid-template-columns: 1fr; }
    .about-avatar { width: 160px; height: 160px; font-size: 3.5rem; }
    .skills-grid { grid-template-columns: 1fr; }

    .hero-name { font-size: clamp(2.5rem, 10vw, 4rem); }
  }
`;

const sections = ["home", "about", "skills", "projects", "experience", "contact"];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const roles = ["Full Stack Developer", "React Developer", "IoT Enthusiast"];
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = roles[roleIndex.current];
      if (!deleting.current) {
        setTypedText(current.slice(0, charIndex.current + 1));
        charIndex.current++;
        if (charIndex.current === current.length) {
          deleting.current = true;
          setTimeout(() => {}, 1200);
        }
      } else {
        setTypedText(current.slice(0, charIndex.current - 1));
        charIndex.current--;
        if (charIndex.current === 0) {
          deleting.current = false;
          roleIndex.current = (roleIndex.current + 1) % roles.length;
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const skillCategories = [
    {
      title: "Frontend",
      icon: "⚡",
      tags: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Responsive Design", "Mobile-First", "Component Architecture", "UI/UX"],
    },
    {
      title: "Backend",
      icon: "🛠",
      tags: ["Node.js", "REST APIs", "Server-Side Logic", "JSON", "API Integration"],
    },
    {
      title: "Database",
      icon: "🗄",
      tags: ["MongoDB", "MySQL"],
    },
    {
      title: "IoT / Embedded",
      icon: "🔌",
      tags: ["Arduino", "Embedded C", "GPS Module", "GSM Module", "Sensor Programming"],
    },
    {
      title: "Tools & Workflow",
      icon: "🧰",
      tags: ["Git", "GitHub", "VS Code", "Google Workspace", "Gmail API", "Agile/Scrum"],
    },
    {
      title: "Soft Skills",
      icon: "🤝",
      tags: ["Team Collaboration", "Problem Solving", "Attention to Detail", "Time Management", "Adaptability"],
    },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">{"<AS />"}</div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {sections.map((s) => (
            <li key={s}>
              <button className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
                {s}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <div id="home" className="hero-section">
        <div className="grid-bg" />
        <div className="glow-orb" style={{ width: 400, height: 400, top: "10%", left: "5%", background: "rgba(0,212,255,0.06)" }} />
        <div className="glow-orb" style={{ width: 500, height: 500, bottom: "10%", right: "5%", background: "rgba(124,58,237,0.07)" }} />

        <div className="hero-content fade-up">
          <div className="hero-tag">✦ Available for Opportunities</div>
          <h1 className="hero-name">
            <span className="cyan">Abhishek</span><br />
            <span className="purple">Sathe</span>
          </h1>
          <p className="hero-role">
            {typedText}<span className="cursor">|</span>
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects</button>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>Get in Touch</button>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="section-label">// 01. about</div>
        <h2 className="section-title">Who I Am</h2>
        <div className="about-grid">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="about-avatar">
              AS
              <div className="avatar-ring" />
            </div>
          </div>
          <div className="about-text">
            <p>
              I'm a <strong style={{ color: COLORS.text }}>Full Stack Developer</strong> and Computer Engineering graduate passionate about building scalable, responsive web applications that deliver exceptional user experiences.
            </p>
            <p>
              With hands-on experience in React.js, Node.js, and REST API design, I thrive in Agile environments and love turning complex problems into elegant digital solutions.
            </p>
            <p>
              Beyond web dev, I have a deep interest in <strong style={{ color: COLORS.text }}>IoT and embedded systems</strong> — from Arduino-based safety devices to real-time GPS tracking solutions.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-num">5+</div>
                <div className="stat-label">Websites Built</div>
              </div>
              <div className="stat">
                <div className="stat-num">1+</div>
                <div className="stat-label">IoT Project</div>
              </div>
              <div className="stat">
                <div className="stat-num">3+</div>
                <div className="stat-label">Years Learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: COLORS.surface, maxWidth: "100%", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">// 02. skills</div>
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="skills-grid">
            {skillCategories.map((cat) => (
              <div className="skill-card" key={cat.title}>
                <div className="skill-card-title">
                  <span>{cat.icon}</span> {cat.title}
                </div>
                <div className="skill-tags">
                  {cat.tags.map((t) => (
                    <span className="skill-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-label">// 03. projects</div>
        <h2 className="section-title">What I've Built</h2>

        <div className="project-card">
          <div className="project-header">
            <div>
              <div className="project-name">Women's Safety Device Using Smart IoT</div>
              <div className="project-period">2023 – 2024</div>
            </div>
            <div className="project-icon">🛡️</div>
          </div>
          <p className="project-desc">
            Designed and built a real-time personal safety device that continuously tracks GPS location and transmits coordinates via GSM to emergency contacts. Programmed the Arduino microcontroller in Embedded C to process sensor data, evaluate trigger conditions, and dispatch automated SOS alerts. Integrated GPS and GSM hardware modules with custom firmware for end-to-end IoT communication.
          </p>
          <div className="project-tech">
            {["Arduino", "Embedded C", "GPS Module", "GSM Module", "IoT", "Embedded Systems"].map(t => (
              <span className="tech-badge" key={t}>{t}</span>
            ))}
          </div>
        </div>

        <div className="project-card">
          <div className="project-header">
            <div>
              <div className="project-name">Responsive Client Websites</div>
              <div className="project-period">Jan 2024 – Mar 2024</div>
            </div>
            <div className="project-icon">🌐</div>
          </div>
          <p className="project-desc">
            Developed and deployed 5+ responsive, mobile-first websites for clients at Kanak Digifex. Built reusable React.js components and integrated REST APIs to enhance frontend functionality. Translated design mockups into pixel-perfect web pages, reducing development time by ~30% through component reusability.
          </p>
          <div className="project-tech">
            {["React.js", "HTML5", "CSS3", "JavaScript", "REST APIs", "Responsive Design"].map(t => (
              <span className="tech-badge" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: COLORS.surface, maxWidth: "100%", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-label">// 04. experience</div>
          <h2 className="section-title">My Journey</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot" style={{ background: COLORS.accent3, boxShadow: `0 0 12px ${COLORS.accent3}` }} />
              <div className="timeline-period" style={{ color: COLORS.accent3 }}>Aug 2022 – Jun 2025</div>
              <div className="timeline-role">B.E. in Computer Engineering</div>
              <div className="timeline-org">Shri Chhatrapati Shivaji Maharaj College of Engineering | Savitribai Phule Pune University</div>
              <ul className="timeline-points">
                <li>Coursework: Data Structures, OOP, Computer Networks, DBMS, Operating Systems, Web Technologies, Embedded Systems.</li>
              </ul>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-period">Jan 2024 – Mar 2024</div>
              <div className="timeline-role">Web Development Intern</div>
              <div className="timeline-org">Kanak Digifex – Digital Marketing & Web Development Agency | Ahmednagar, MH</div>
              <ul className="timeline-points">
                <li>Developed 5+ responsive, mobile-first websites using HTML5, CSS3, and JavaScript with cross-browser compatibility.</li>
                <li>Built reusable React.js components and integrated REST APIs, reducing development time by ~30%.</li>
                <li>Collaborated with developers and UI/UX designers in an Agile/Scrum environment across multiple client projects.</li>
                <li>Performed thorough cross-browser testing and debugging to improve product quality and UX.</li>
              </ul>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" style={{ background: COLORS.accent2, boxShadow: `0 0 12px ${COLORS.accent2}` }} />
              <div className="timeline-period" style={{ color: COLORS.accent2 }}>2025 – Present</div>
              <div className="timeline-role">UI Full Stack Developer Course</div>
              <div className="timeline-org">Naresh IT Technologies | Hyderabad, Telangana</div>
              <ul className="timeline-points">
                <li>Industry-focused program covering React.js, Node.js, JavaScript (ES6+), MongoDB, MySQL, REST APIs, and Git.</li>
                <li>Gaining hands-on experience with real-world project development, REST API integration, and deployment workflows.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-label">// 05. contact</div>
        <h2 className="section-title">Let's Connect</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <a href="mailto:abhisheksathe120@gmail.com" className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">abhisheksathe120@gmail.com</div>
              </div>
            </a>
            <a href="tel:+918261965970" className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value">+91-8261965970</div>
              </div>
            </a>
            <a href="https://linkedin.com/in/abhishek-sathe-63a2302a9" target="_blank" rel="noreferrer" className="contact-item">
              <div className="contact-icon">🔗</div>
              <div>
                <div className="contact-label">LinkedIn</div>
                <div className="contact-value">abhishek-sathe-63a2302a9</div>
              </div>
            </a>
            <a href="https://github.com/Abhisathe2003" target="_blank" rel="noreferrer" className="contact-item">
              <div className="contact-icon">🐙</div>
              <div>
                <div className="contact-label">GitHub</div>
                <div className="contact-value">github.com/Abhisathe2003</div>
              </div>
            </a>
            <div className="contact-item" style={{ cursor: "default" }}>
              <div className="contact-icon">📍</div>
              <div>
                <div className="contact-label">Location</div>
                <div className="contact-value">Hyderabad, Telangana, India</div>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <h3>Open to Work 🚀</h3>
            <p>
              I'm actively looking for React Developer or Full Stack Developer roles. If you have an opportunity or just want to chat about tech, feel free to reach out!
            </p>
            <a href="mailto:abhisheksathe120@gmail.com">
              <button className="btn-primary">Send a Message</button>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <p>Designed & Built by <span style={{ color: COLORS.accent }}>Abhishek Sathe</span> · {new Date().getFullYear()}</p>
        <p style={{ marginTop: "0.5rem" }}>React.js · CSS · JavaScript</p>
      </footer>
    </>
  );
}
