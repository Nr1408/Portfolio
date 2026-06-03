import { useEffect, useMemo, useRef, useState, type MutableRefObject, type PropsWithChildren } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ArrowDown,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import * as THREE from "three";

type Vec3 = [number, number, number];
type ProgressRef = MutableRefObject<number>;
type SceneSettings = {
  antialias: boolean;
  dpr: number;
  lightweight: boolean;
  mobileScene: boolean;
};

const RESUME =
  "https://drive.google.com/file/d/1BQAB5HDXa2AYEe1-YYs18O4uS-7t665K/view?usp=drive_link";
const GH_URL = "https://github.com/Nr1408";
const LI_URL = "https://www.linkedin.com/in/nishit-rajput-0a12a5320/";

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "education",
  "achievements",
  "interests",
  "contact",
];

const SKILLS = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind", "HTML", "CSS"] },
  { label: "Backend", items: ["FastAPI", "Django"] },
  { label: "Mobile", items: ["Capacitor", "React Native"] },
  { label: "Database", items: ["PostgreSQL", "Firebase", "Supabase"] },
  { label: "AI / ML", items: ["TensorFlow", "Keras", "CNNs"] },
  { label: "Tools", items: ["Git", "Linux", "VS Code"] },
];

const PROJECTS = [
  {
    award: "1st Place - KnowBuild '25",
    title: "WorkFromCafe",
    description:
      "Crowdsourced cafe discovery for remote workers with live ratings, community check-ins, and workspace signals.",
    tags: ["React", "Supabase", "JavaScript"],
    github: "https://github.com/Nr1408/WorkfromCafe",
  },
  {
    award: "Top 20 Finalist - CodePrix 1.0",
    title: "TruPay",
    description:
      "A security-first UPI payment ecosystem featuring real-time AI fraud detection, dynamic threat mitigation, and an analyst monitoring dashboard.",
    tags: ["React", "Capacitor", "Flask"],
    github: "https://github.com/Nr1408/TruPay",
  },
  {
    award: null,
    title: "LabVerse",
    description:
      "An interactive virtual laboratory platform for remote learning, simulating real-world science experiments through real-time 3D web graphics.",
    tags: ["React", "Three.js", "Node.js"],
    github: "https://github.com/Nr1408/LabVerse",
  },
  {
    award: null,
    title: "Strengthy",
    description:
      "A full-stack fitness PWA for personalized workout programming, progress tracking, and offline set logging.",
    tags: ["React", "TypeScript", "Capacitor"],
    github: "https://github.com/Nr1408/Strengthy",
  },
  {
    award: null,
    title: "LeafLens",
    description:
      "AI plant disease detection using a custom CNN model and a FastAPI service for inference.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    github: "https://github.com/Nr1408/Leaflens",
  },
];

const SEMESTERS = [
  { label: "Sem 1", value: 7.24 },
  { label: "Sem 2", value: 8.07 },
  { label: "Sem 3", value: 9.45 },
  { label: "Sem 4", value: 9.64 },
  { label: "Sem 5", value: 9.14 },
];

const CAMERA_POINTS: Vec3[] = [
  [0, 0.1, 12.2],
  [3.5, 1.8, 9.5],
  [-3.6, -1.5, 9.8],
  [0.6, 2.9, 8.4],
  [3.9, -2.4, 9],
  [-3.8, 2.3, 9.7],
  [2.8, -2.6, 8.9],
  [0, 0.2, 13.2],
];

const MOTIF_SCALES = [
  [8.2, 4.8, 1],
  [5.7, 3.4, 1],
  [6.6, 4.1, 1],
  [7.6, 4.7, 1],
  [5.8, 4.8, 1],
  [5.5, 3.8, 1],
  [6.2, 3.6, 1],
  [7.1, 4.2, 1],
] as const;

function seeded(seed: number) {
  const x = Math.sin(seed * 92821 + 49297) * 233280;
  return x - Math.floor(x);
}

function range(seed: number, min: number, max: number) {
  return min + seeded(seed) * (max - min);
}

function currentSegment(value: number, count: number) {
  const raw = value * (count - 1);
  const index = Math.min(Math.max(Math.floor(raw), 0), count - 2);
  const local = raw - index;
  const smooth = local * local * (3 - 2 * local);
  return { index, smooth };
}

function useScenePerformanceSettings() {
  const getSettings = (): SceneSettings => {
    const lowEnd = typeof navigator !== "undefined" ? (navigator.hardwareConcurrency || 8) <= 4 : false;
    const coarsePointer =
      typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : false;
    const narrowScreen =
      typeof window !== "undefined" ? window.matchMedia("(max-width: 760px)").matches : false;
    const mobileScene = coarsePointer || narrowScreen;
    const lightweight = mobileScene || lowEnd;
    const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const maxDpr = lowEnd ? 1.1 : mobileScene ? 1.35 : 1.7;

    return {
      antialias: !mobileScene && !lowEnd,
      dpr: Math.min(Math.max(pixelRatio, 1), maxDpr),
      lightweight,
      mobileScene,
    };
  };

  const [settings, setSettings] = useState(getSettings);

  useEffect(() => {
    const update = () => setSettings(getSettings());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return settings;
}

function useScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? window.scrollY / max : 0;
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    const settleTimer = window.setTimeout(update, 500);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.clearTimeout(settleTimer);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return progressRef;
}

function MobileRenderDriver({ enabled }: { enabled: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!enabled) return;

    let activeUntil = 0;
    let timeout = 0;

    const tick = () => {
      invalidate();
      if (performance.now() < activeUntil) {
        timeout = window.requestAnimationFrame(tick);
      } else {
        timeout = 0;
      }
    };

    const burst = (duration = 600) => {
      activeUntil = Math.max(activeUntil, performance.now() + duration);
      if (!timeout) tick();
    };

    const idlePulse = window.setInterval(() => invalidate(), 900);
    const onInteraction = () => burst();
    const onResize = () => burst(700);

    burst(900);
    window.addEventListener("scroll", onInteraction, { passive: true });
    window.addEventListener("touchstart", onInteraction, { passive: true });
    window.addEventListener("touchmove", onInteraction, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.clearInterval(idlePulse);
      if (timeout) window.cancelAnimationFrame(timeout);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      window.removeEventListener("touchmove", onInteraction);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [enabled, invalidate]);

  return null;
}

function CameraRig({ progressRef }: { progressRef: ProgressRef }) {
  useFrame((state, delta) => {
    const { index, smooth } = currentSegment(progressRef.current, CAMERA_POINTS.length);
    const a = CAMERA_POINTS[index];
    const b = CAMERA_POINTS[index + 1] ?? a;

    const x = THREE.MathUtils.lerp(a[0], b[0], smooth);
    const y = THREE.MathUtils.lerp(a[1], b[1], smooth);
    const z = THREE.MathUtils.lerp(a[2], b[2], smooth);

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, x, 3.2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, y, 3.2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, z, 3.2, delta);
    state.camera.lookAt(0, 0, 0);

    const camera = state.camera as THREE.PerspectiveCamera;
    camera.fov = THREE.MathUtils.damp(camera.fov, 40 + smooth * 4, 4, delta);
    camera.updateProjectionMatrix();
  });

  return null;
}

function SceneLights({ progressRef }: { progressRef: ProgressRef }) {
  const key = useRef<THREE.PointLight>(null);
  const rim = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    const progress = progressRef.current;

    if (key.current) {
      key.current.position.set(Math.sin(time * 0.18) * 6, 3.2, 7);
      key.current.intensity = 2.1 + progress * 0.4;
    }

    if (rim.current) {
      rim.current.position.set(Math.cos(time * 0.14) * -5, -2.5, -5.5);
      rim.current.intensity = 1.3 + Math.sin(time * 0.25) * 0.2;
    }
  });

  return (
    <>
      <ambientLight color="#b8c0c7" intensity={0.22} />
      <directionalLight color="#dfe6ea" position={[4, 8, 5]} intensity={0.34} />
      <pointLight ref={key} color="#c7f7ff" distance={28} intensity={2.1} />
      <pointLight ref={rim} color="#7d8b94" distance={22} intensity={1.2} />
    </>
  );
}

function BackgroundField({ lightweight }: { lightweight: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = lightweight ? 95 : 360;
  const positions = useMemo(() => {
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      points[i * 3] = range(i + 100, -26, 26);
      points[i * 3 + 1] = range(i + 300, -16, 16);
      points[i * 3 + 2] = range(i + 500, -28, 8);
    }

    return points;
  }, [count]);
  const grid = useMemo(() => {
    const lines: number[] = [];
    const depth = lightweight ? 4 : 7;

    for (let i = 0; i < depth; i += 1) {
      const z = -8 - i * 4.2;
      for (let lane = -4; lane <= 4; lane += 2) {
        lines.push(-18, lane, z, 18, lane, z);
        lines.push(lane * 2, -9, z, lane * 2, 9, z);
      }
    }

    return new Float32Array(lines);
  }, [lightweight]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.04) * 0.08;
    pointsRef.current.position.z = Math.sin(clock.elapsedTime * 0.09) * 0.55;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#dce7ea" size={0.025} sizeAttenuation transparent opacity={0.28} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={grid} count={grid.length / 3} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#9aa5a8" transparent opacity={0.06} />
      </lineSegments>
    </group>
  );
}

function SectionMotif({
  index,
  lightweight,
  y,
}: {
  index: number;
  lightweight: boolean;
  y: number;
}) {
  const group = useRef<THREE.Group>(null);
  const frameGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 0.06)), []);
  const panelGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.2, 0.68, 0.08)), []);
  const nodes = useMemo(
    () =>
      Array.from({ length: lightweight ? 5 : 9 }, (_, i) => {
        const theta = (i / (lightweight ? 5 : 9)) * Math.PI * 2;
        const radius = range(index * 60 + i, 2.4, 4.8);
        return {
          color: i % 3 === 0 ? "#e8eef0" : "#9fb6bb",
          position: [Math.cos(theta) * radius, range(index * 90 + i, -2.2, 2.2), Math.sin(theta) * radius] as Vec3,
          size: range(index * 120 + i, 0.055, 0.13),
        };
      }),
    [index, lightweight],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    group.current.rotation.y = Math.sin(time * 0.08 + index) * 0.16;
    group.current.rotation.z = Math.sin(time * 0.06 + index) * 0.035;
  });

  const [sx, sy, sz] = MOTIF_SCALES[index] ?? MOTIF_SCALES[0];

  return (
    <group ref={group} position={[0, y, -2 - index * 0.12]}>
      {Array.from({ length: lightweight ? 2 : 4 }, (_, layer) => (
        <lineSegments
          key={`frame-${index}-${layer}`}
          geometry={frameGeometry}
          scale={[sx + layer * 1.05, sy + layer * 0.62, sz]}
          rotation={[0.08 * layer, 0.04 * index, (index * 0.12 + layer * 0.18) % Math.PI]}
        >
          <lineBasicMaterial color={layer % 2 ? "#879194" : "#e2edef"} transparent opacity={0.18 - layer * 0.03} />
        </lineSegments>
      ))}

      {index === 3 &&
        Array.from({ length: lightweight ? 4 : 8 }, (_, panel) => (
          <lineSegments
            key={`project-panel-${panel}`}
            geometry={panelGeometry}
            position={[((panel % 4) - 1.5) * 1.7, (Math.floor(panel / 4) - 0.5) * 1.25, range(panel + 20, -2.8, 0.6)]}
            rotation={[0.04 * panel, 0.16 - panel * 0.035, 0.08 * panel]}
          >
            <lineBasicMaterial color="#dce7ea" transparent opacity={0.2} />
          </lineSegments>
        ))}

      {index === 4 && (
        <mesh rotation={[0.18, 0, Math.PI / 4]}>
          <coneGeometry args={[2.2, 4.4, 4]} />
          <meshBasicMaterial color="#c7f7ff" wireframe transparent opacity={0.18} />
        </mesh>
      )}

      {nodes.map((node, nodeIndex) => (
        <mesh key={`node-${index}-${nodeIndex}`} position={node.position}>
          <sphereGeometry args={[node.size, 12, 12]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.72} />
        </mesh>
      ))}
    </group>
  );
}

function ScrollWorld({ lightweight, progressRef }: { lightweight: boolean; progressRef: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = progressRef.current * (SECTION_IDS.length - 1) * viewport.height;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 4, delta);
  });

  return (
    <group ref={group}>
      {SECTION_IDS.map((id, index) => (
        <SectionMotif key={id} index={index} y={-viewport.height * index} lightweight={lightweight} />
      ))}
    </group>
  );
}

function Experience({
  lightweight,
  mobileScene,
  progressRef,
}: {
  lightweight: boolean;
  mobileScene: boolean;
  progressRef: ProgressRef;
}) {
  return (
    <>
      <fog attach="fog" args={["#050505", 12, 42]} />
      <MobileRenderDriver enabled={mobileScene} />
      <SceneLights progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
      <BackgroundField lightweight={lightweight} />
      <ScrollWorld lightweight={lightweight} progressRef={progressRef} />
    </>
  );
}

function SceneSection({
  id,
  eyebrow,
  title,
  wide = false,
  children,
}: PropsWithChildren<{ id: string; eyebrow: string; title: string; wide?: boolean }>) {
  return (
    <section id={id} className={`folio-section${id === "hero" ? " hero-section" : ""}`}>
      <div className={wide ? "section-inner section-wide" : "section-inner"}>
        {id !== "hero" && (
          <>
            <p className="section-eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </>
        )}
        {children}
      </div>
    </section>
  );
}

function HtmlSections() {
  return (
    <main className="portfolio-content">
      <SceneSection id="hero" eyebrow="00" title="Nishit Rajput" wide>
        <div className="hero-layout">
          <div className="portrait-frame" aria-label="Portrait of Nishit Rajput">
            <img src="/nishit-profile.jpg" alt="Nishit Rajput" />
          </div>

          <div className="hero-copy">
            <p className="hero-kicker">Full-stack developer / Computer Science student</p>
            <h1>Nishit Rajput</h1>
            <p className="hero-text">
              I build practical software with focused interfaces, reliable systems, and real-world utility.
            </p>
            <div className="hero-actions">
              <a className="action action-primary" href="#projects">
                <ExternalLink size={17} />
                View Work
              </a>
              <a className="action action-secondary" href={RESUME} target="_blank" rel="noopener noreferrer">
                <Download size={17} />
                Resume
              </a>
            </div>
            <div className="social-row">
              <a href={GH_URL} target="_blank" rel="noopener noreferrer">
                <Github size={17} />
                GitHub
              </a>
              <a href={LI_URL} target="_blank" rel="noopener noreferrer">
                <Linkedin size={17} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about">
          <ArrowDown size={22} />
        </a>
      </SceneSection>

      <SceneSection id="about" eyebrow="01 / About" title="Built For Real Use">
        <div className="copy-block">
          <p>
            I am a third-year Computer Science student who enjoys turning rough ideas into usable products.
            My work spans full-stack apps, mobile experiences, and machine learning prototypes.
          </p>
          <p>
            I care about fast interfaces, clean architecture, and products that keep working after the demo.
          </p>
        </div>
        <div className="focus-line">
          <span>Current focus</span>
          <strong>Real-world apps, strong UX, clean systems</strong>
        </div>
      </SceneSection>

      <SceneSection id="skills" eyebrow="02 / Stack" title="Technical Range" wide>
        <div className="skill-grid">
          {SKILLS.map((group) => (
            <article key={group.label} className="surface skill-card">
              <span>{group.label}</span>
              <div>
                {group.items.map((item) => (
                  <em key={item}>{item}</em>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SceneSection>

      <SceneSection id="projects" eyebrow="03 / Work" title="Selected Projects" wide>
        <div className="project-list">
          {PROJECTS.map((project) => (
            <article key={project.title} className="surface project-card">
              <div>
                {project.award && <span className="award">{project.award}</span>}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-meta">
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`}>
                  <Github size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </SceneSection>

      <SceneSection id="education" eyebrow="04 / Education" title="Education">
        <div className="surface education-block">
          <h3>K.J. Somaiya Institute of Technology</h3>
          <p>B.Tech in Computer Science</p>
          <span>Aug 2023 - Present, Mumbai</span>
        </div>
        <div className="cgpa-list" aria-label="CGPA progression">
          {SEMESTERS.map((semester) => (
            <div key={semester.label} className="cgpa-row">
              <span>{semester.label}</span>
              <div>
                <i style={{ width: `${(semester.value / 10) * 100}%` }} />
              </div>
              <strong>{semester.value}</strong>
            </div>
          ))}
        </div>
        <div className="surface education-block compact">
          <h3>SKKES English High School & Junior College</h3>
          <p>Higher Secondary Certificate</p>
          <span>Completed April 2023, Mumbai</span>
        </div>
      </SceneSection>

      <SceneSection id="achievements" eyebrow="05 / Highlights" title="Wins & Milestones">
        <div className="achievement-list">
          <article className="surface">
            <span>1st Place</span>
            <h3>KnowBuild '25 - 8-Hour Startup Hackathon</h3>
            <p>Built WorkFromCafe, a crowdsourced cafe discovery platform for remote workers.</p>
          </article>
          <article className="surface">
            <span>Finalist - Top 20 / 400+</span>
            <h3>CodePrix 1.0 - National 24-Hour Hackathon</h3>
            <p>Advanced through qualifiers and into the national final at ATLAS SkillTech.</p>
          </article>
        </div>
      </SceneSection>

      <SceneSection id="interests" eyebrow="06 / Beyond Code" title="Interests">
        <div className="interest-row">
          {["Football", "Fitness", "Cycling", "Drawing"].map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </SceneSection>

      <SceneSection id="contact" eyebrow="07 / Contact" title="Get In Touch">
        <p className="contact-copy">
          Open to internships, collaborations, and interesting problems worth building well.
        </p>
        <div className="hero-actions">
          <a className="action action-primary" href="mailto:nr14082005@gmail.com">
            <Mail size={17} />
            Email Me
          </a>
          <a className="action action-secondary" href="tel:+919136115989">
            <Phone size={17} />
            Call Me
          </a>
        </div>
        <p className="copyright">2026 Nishit Rajput</p>
      </SceneSection>
    </main>
  );
}

export default function ImmersiveScene() {
  const { antialias, dpr, lightweight, mobileScene } = useScenePerformanceSettings();
  const progressRef = useScrollProgress();

  return (
    <div id="portfolio-root">
      <div className="canvas-stage" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 12.2], fov: 42, near: 0.1, far: 80 }}
          fallback={<div className="canvas-fallback" />}
          frameloop={mobileScene ? "demand" : "always"}
          gl={{ antialias, alpha: false, powerPreference: "high-performance" }}
          dpr={dpr}
          resize={{ scroll: false, debounce: { scroll: 120, resize: 0 } }}
          style={{ background: "#050505" }}
        >
          <Experience lightweight={lightweight} mobileScene={mobileScene} progressRef={progressRef} />
        </Canvas>
      </div>
      <HtmlSections />
    </div>
  );
}
