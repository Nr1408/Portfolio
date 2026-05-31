import { useEffect, useRef, useState } from "react";

/* Scroll reveal hook */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* CGPA bar animation hook */
function useCgpaBars() {
  useEffect(() => {
    const bars = document.querySelectorAll(".cgpa-bar-fill");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animated");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    bars.forEach((b) => obs.observe(b));
    return () => obs.disconnect();
  }, []);
}

/* Particle canvas */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      color: string;
    }[] = [];

    const colors = ["rgba(0,212,255,", "rgba(129,140,248,", "rgba(52,211,153,"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

/* Navbar */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <nav className="navbar">
      <a href="#" className="nav-logo">
        NR<span>.</span>
      </a>
      <ul className={`nav-links${open ? " open" : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="hamburger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        style={{ background: "none", border: "none" }}
      >
        <span
          style={
            open ? { transform: "rotate(45deg) translate(5px,5px)" } : undefined
          }
        />
        <span style={open ? { opacity: 0 } : undefined} />
        <span
          style={
            open
              ? { transform: "rotate(-45deg) translate(5px,-5px)" }
              : undefined
          }
        />
      </button>
    </nav>
  );
}

/* Hero */
function Hero() {
  return (
    <section id="hero" className="hero">
      <ParticleCanvas />
      <div className="hero-gradient" />

      {/* Decorative blobs */}
      <div
        className="blob"
        style={{
          width: 400,
          height: 400,
          background: "rgba(0,212,255,0.06)",
          top: "-100px",
          left: "-100px",
          animation: "drift 12s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: 300,
          height: 300,
          background: "rgba(129,140,248,0.06)",
          bottom: "-80px",
          right: "-60px",
          animation: "drift 15s ease-in-out infinite reverse",
        }}
      />

      <div
        className="hero-content"
        style={{ animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Profile picture */}
        <div className="profile-ring">
          <img
            id="profile-pic"
            src="/profile.webp"
            alt="Nishit Rajput"
            onError={(e) => {
              const t = e.currentTarget;
              t.style.background =
                "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(129,140,248,0.15))";
              t.style.display = "flex";
            }}
          />
        </div>

        <h1 className="hero-name shimmer-text">Nishit Rajput</h1>
        <p className="hero-subtitle">Full-Stack Developer &amp; CS Student</p>
        <p className="hero-tagline">
          Building practical software, one project at a time.
        </p>

        <div className="hero-cta">
          <a href="#projects" className="btn-primary">
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
            View Projects
          </a>
          <a
            href="https://drive.google.com/file/d/1BQAB5HDXa2AYEe1-YYs18O4uS-7t665K/view?usp=drive_link"
            className="btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0120 9.414V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="social-row">
          {/* GitHub */}
          <a
            href="https://github.com/Nr1408"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nishit-rajput-0a12a5320/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          {/* Email */}
          <a
            href="mailto:nr14082005@gmail.com"
            className="social-icon"
            aria-label="Email"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
          {/* Phone */}
          <a
            href="tel:+919136115989"
            className="social-icon"
            aria-label="Phone"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* About */
function About() {
  const stats = [
    { value: "2", label: "Hackathon Awards" },
    { value: "9.1", label: "Avg CGPA - 5 Sems" },
    { value: "3+", label: "Projects Shipped" },
    { value: "MUM", label: "Mumbai, India" },
  ];
  return (
    <section
      id="about"
      style={{ padding: "6rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}
    >
      <div className="section-label reveal">
        <span>01</span> About
      </div>
      <h2 className="section-title reveal">About Me</h2>

      <div className="about-grid">
        <div className="reveal" style={{ transitionDelay: "0.1s" }}>
          <p className="about-text">
            I'm a third-year Computer Science student with a passion for
            building practical software and web solutions. Quick to adapt and
            always eager to solve real-world problems - from mobile fitness apps
            to AI-powered plant disease detectors.
          </p>
          <p className="about-text" style={{ marginTop: "1.25rem" }}>
            My work spans full-stack web development, mobile apps, and machine
            learning - always with a focus on shipping something real. I thrive
            in fast-paced environments like hackathons and love turning ideas
            into functional products.
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:nr14082005@gmail.com"
              className="btn-outline"
              style={{ fontSize: "0.82rem", padding: "0.5rem 1.1rem" }}
            >
              nr14082005@gmail.com
            </a>
            <a
              href="tel:+919136115989"
              className="btn-outline"
              style={{ fontSize: "0.82rem", padding: "0.5rem 1.1rem" }}
            >
              +91 9136115989
            </a>
          </div>
        </div>

        <div className="stats-grid reveal" style={{ transitionDelay: "0.2s" }}>
          {stats.map((s) => (
            <div key={s.label} className="glass-card stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Skills */
function Skills() {
  const groups = [
    {
      label: "Languages",
      color: "badge-cyan",
      items: ["JavaScript (ES6+)", "TypeScript", "Python"],
    },
    {
      label: "Frontend",
      color: "badge-indigo",
      items: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      label: "Backend & APIs",
      color: "badge-emerald",
      items: ["FastAPI", "Django"],
    },
    {
      label: "Mobile",
      color: "badge-amber",
      items: ["Capacitor (Android)", "React Native"],
    },
    {
      label: "Database & Cloud",
      color: "badge-rose",
      items: ["PostgreSQL", "Firebase", "MySQL", "Supabase"],
    },
    {
      label: "AI / ML",
      color: "badge-violet",
      items: ["TensorFlow", "Keras", "CNNs"],
    },
    {
      label: "Tools",
      color: "badge-sky",
      items: ["Git", "Linux", "Windows", "Microsoft 365"],
    },
  ];

  return (
    <section
      id="skills"
      style={{
        padding: "6rem 1.5rem",
        background:
          "linear-gradient(to bottom, transparent, rgba(0,212,255,0.02), transparent)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label reveal">
          <span>02</span> Skills
        </div>
        <h2 className="section-title reveal">Tech Stack</h2>

        <div className="skills-wrapper">
          {groups.map((g, i) => (
            <div
              key={g.label}
              className="reveal"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="skill-group-label">{g.label}</div>
              <div className="skill-badges">
                {g.items.map((item) => (
                  <span key={item} className={`badge ${g.color}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Projects */
function Projects() {
  const projects = [
    {
      winner: "1st Place - KnowBuild '25",
      title: "WorkFromCafe",
      desc: "A live, crowdsourced discovery platform to help remote professionals find productive cafe workspaces with real-time ratings, amenity filters, and community check-ins.",
      tags: ["React", "Supabase", "JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/Nr1408/WorkfromCafe",
      accent: true,
    },
    {
      winner: null,
      title: "Strengthy",
      desc: "A full-stack fitness application providing personalized workout programming and advanced set tracking built as a mobile-first PWA with offline support.",
      tags: ["React", "TypeScript", "Supabase", "Capacitor", "Tailwind CSS"],
      github: "https://github.com/Nr1408/Strengthy",
      accent: false,
    },
    {
      winner: null,
      title: "LeafLens",
      desc: "An AI-powered plant disease detection app specializing in identifying banana plant pathologies using a custom-trained CNN model served via a REST API.",
      tags: ["Python", "TensorFlow/Keras", "React Native", "FastAPI"],
      github: "https://github.com/Nr1408/Leaflens",
      accent: false,
    },
  ];

  return (
    <section
      id="projects"
      style={{ padding: "6rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}
    >
      <div className="section-label reveal">
        <span>03</span> Projects
      </div>
      <h2 className="section-title reveal">Projects</h2>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            key={p.title}
            className="glass-card project-card reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {p.winner && (
              <div className="winner-badge">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {p.winner}
              </div>
            )}
            <div className="project-title gradient-text">{p.title}</div>
            <p className="project-desc">{p.desc}</p>
            <div className="project-footer">
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t} className="project-tag">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.github}
                className="icon-btn"
                aria-label={`GitHub - ${p.title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Education */
function Education() {
  const semesters = [
    { sem: "Sem 1", cgpa: 7.24, pct: (7.24 / 10) * 100, delay: 0 },
    { sem: "Sem 2", cgpa: 8.07, pct: (8.07 / 10) * 100, delay: 0.1 },
    { sem: "Sem 3", cgpa: 9.45, pct: (9.45 / 10) * 100, delay: 0.2 },
    { sem: "Sem 4", cgpa: 9.64, pct: (9.64 / 10) * 100, delay: 0.3 },
    { sem: "Sem 5", cgpa: 9.14, pct: (9.14 / 10) * 100, delay: 0.4 },
  ];

  return (
    <section
      id="education"
      style={{
        padding: "6rem 1.5rem",
        background:
          "linear-gradient(to bottom, transparent, rgba(129,140,248,0.02), transparent)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label reveal">
          <span>04</span> Education
        </div>
        <h2 className="section-title reveal">Education</h2>

        <div className="timeline">
          {/* Entry 1 */}
          <div className="timeline-item reveal">
            <div className="timeline-dot" />
            <div className="glass-card edu-card">
              <div className="edu-institution">
                K.J. Somaiya Institute of Technology
              </div>
              <div className="edu-degree">B.Tech in Computer Science</div>
              <div className="edu-period">Aug 2023 - Present - Mumbai</div>

              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                CGPA Progression
              </div>
              <div className="cgpa-bars">
                {semesters.map((s) => (
                  <div key={s.sem} className="cgpa-row">
                    <span className="cgpa-sem">{s.sem}</span>
                    <div className="cgpa-bar-track">
                      <div
                        className="cgpa-bar-fill"
                        style={
                          {
                            "--target-width": `${s.pct}%`,
                            "--delay": `${s.delay}s`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                    <span className="cgpa-val">{s.cgpa}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Entry 2 */}
          <div
            className="timeline-item reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            <div
              className="timeline-dot"
              style={{
                background: "var(--indigo)",
                boxShadow:
                  "0 0 0 3px rgba(129,140,248,0.2), 0 0 12px rgba(129,140,248,0.4)",
              }}
            />
            <div className="glass-card edu-card">
              <div className="edu-institution">
                Sheth Karamshi Kanji English High School &amp; Junior College
              </div>
              <div className="edu-degree">
                Higher Secondary Certificate (HSC)
              </div>
              <div className="edu-period">Completed April 2023 - Mumbai</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Achievements */
function Achievements() {
  return (
    <section
      id="achievements"
      style={{ padding: "6rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}
    >
      <div className="section-label reveal">
        <span>05</span> Achievements
      </div>
      <h2 className="section-title reveal">Achievements</h2>

      <div className="achievements-grid">
        {/* Card 1 */}
        <div className="glass-card achievement-card reveal">
          <span className="trophy-icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fbbf24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7H8M16 7c0 3.314-1.79 6-4 6s-4-2.686-4-6M16 7h2a2 2 0 012 2v1a4 4 0 01-4 4M8 7H6a2 2 0 00-2 2v1a4 4 0 004 4m4 0v4m0 0H9m3 0h3"
              />
            </svg>
          </span>
          <div className="achievement-rank" style={{ color: "#fbbf24" }}>
            1st Place
          </div>
          <div className="achievement-title">
            KnowBuild '25 - 8-Hour Startup Hackathon
          </div>
          <p className="achievement-desc">
            Awarded by the S4DS-KJSIT Student Chapter at K.J. Somaiya Institute
            of Technology. Built WorkFromCafe - a crowdsourced cafe discovery
            platform for remote workers.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="glass-card achievement-card reveal"
          style={{ transitionDelay: "0.1s" }}
        >
          <span className="trophy-icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--indigo)"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </span>
          <div className="achievement-rank" style={{ color: "var(--indigo)" }}>
            Finalist - Top 20 of 400+ Teams
          </div>
          <div className="achievement-title">
            CodePrix 1.0 - National 24-Hour Hackathon
          </div>
          <p className="achievement-desc">
            ATLAS SkillTech University - IET KJSIT organized. Qualified via a
            Top 5 rank in the 8-hour qualifier round before advancing to the
            national 24-hour final.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Hobbies */
function Hobbies() {
  const hobbies = [
    { icon: "⚽", label: "Football" },
    { icon: "💪", label: "Fitness" },
    { icon: "🚴", label: "Cycling" },
    { icon: "✏️", label: "Drawing" },
  ];
  return (
    <section
      style={{
        padding: "3rem 1.5rem 6rem",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div className="section-label reveal">
        <span>06</span> Beyond Code
      </div>
      <h2
        className="reveal"
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          marginBottom: "2rem",
        }}
      >
        Interests
      </h2>
      <div className="hobbies-row">
        {hobbies.map((h, i) => (
          <div
            key={h.label}
            className="hobby-chip reveal"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <span style={{ fontSize: "1.2rem" }} aria-hidden="true">
              {h.icon}
            </span>
            <span>{h.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Contact */
function Contact() {
  return (
    <>
      <div className="section-divider" />
      <section id="contact" className="contact-section">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            className="section-label reveal"
            style={{ justifyContent: "center" }}
          >
            <span>07</span> Contact
          </div>
          <h2 className="section-title reveal" style={{ marginBottom: "1rem" }}>
            Get In Touch
          </h2>
          <p
            className="contact-tagline reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            Open to internships, collaborations, and interesting problems.
          </p>
          <div
            className="contact-actions reveal"
            style={{ transitionDelay: "0.15s" }}
          >
            <a href="mailto:nr14082005@gmail.com" className="btn-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              nr14082005@gmail.com
            </a>
            <a href="tel:+919136115989" className="btn-outline">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +91 9136115989
            </a>
          </div>
          <div
            className="social-row reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <a
              href="https://github.com/Nr1408"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/nishit-rajput-0a12a5320/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">
            &copy; 2025 Nishit Rajput - Built with React &amp; Vite
          </span>
          <div className="footer-socials">
            <a
              href="https://github.com/Nr1408"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
              style={{ width: 34, height: 34, borderRadius: 8 }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/nishit-rajput-0a12a5320/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
              style={{ width: 34, height: 34, borderRadius: 8 }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  useReveal();
  useCgpaBars();

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Achievements />
      <Hobbies />
      <Contact />
    </>
  );
}
