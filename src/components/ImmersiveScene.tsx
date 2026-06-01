import { useEffect, useMemo, useRef, type PropsWithChildren } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Scroll, ScrollControls, useScroll } from "@react-three/drei";
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

const PAGES = 8;
const RESUME =
  "https://drive.google.com/file/d/1BQAB5HDXa2AYEe1-YYs18O4uS-7t665K/view?usp=drive_link";
const GH_URL = "https://github.com/Nr1408";
const LI_URL = "https://www.linkedin.com/in/nishit-rajput-0a12a5320/";

const SKILLS = [
  { label: "Languages", c: "tone-cyan", items: ["JavaScript", "TypeScript", "Python"] },
  { label: "Frontend", c: "tone-indigo", items: ["React", "Next.js", "Tailwind", "HTML", "CSS"] },
  { label: "Backend", c: "tone-emerald", items: ["FastAPI", "Django"] },
  { label: "Mobile", c: "tone-amber", items: ["Capacitor", "React Native"] },
  { label: "Database", c: "tone-rose", items: ["PostgreSQL", "Firebase", "Supabase"] },
  { label: "AI / ML", c: "tone-violet", items: ["TensorFlow", "Keras", "CNNs"] },
  { label: "Tools", c: "tone-sky", items: ["Git", "Linux", "VS Code"] },
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

const WAYPOINTS: Vec3[] = [
  [0, 0, 14],
  [7.5, 4.5, 6.5],
  [-6.5, -3.5, 8],
  [0.5, 7.5, 5.5],
  [8.5, -5.2, 7.5],
  [-7.8, 5.5, 10],
  [5.6, -6.3, 6.2],
  [0, 0, 20],
];

const FOVS = [45, 38, 42, 35, 40, 44, 37, 50];

const LIGHT_COLORS: Vec3[] = [
  [0.28, 0.78, 0.9],
  [0.54, 0.58, 0.86],
  [0.32, 0.74, 0.62],
  [0.38, 0.68, 0.86],
  [0.28, 0.78, 0.9],
  [0.86, 0.68, 0.34],
  [0.58, 0.48, 0.82],
  [0.28, 0.78, 0.9],
];

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function range(seed: number, min: number, max: number) {
  return min + seeded(seed) * (max - min);
}

type Orb = {
  position: Vec3;
  color: string;
  size: number;
  speed: number;
};

const HERO_ORBS: Orb[] = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  const radius = range(i + 1, 5.2, 8.1);
  return {
    position: [Math.cos(a) * radius, range(i + 20, -2.5, 2.5), Math.sin(a) * radius],
    color: i % 3 === 0 ? "#7dd3fc" : i % 3 === 1 ? "#a5b4fc" : "#86efac",
    size: range(i + 40, 0.05, 0.12),
    speed: range(i + 60, 0.45, 1),
  };
});

const ABOUT_CRYSTALS: Orb[] = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2;
  return {
    position: [Math.cos(a) * range(i + 80, 2.7, 5.3), range(i + 100, -2.2, 2.2), Math.sin(a) * range(i + 120, 2.8, 5)],
    color: i % 2 ? "#a5b4fc" : "#7dd3fc",
    size: range(i + 140, 0.28, 0.58),
    speed: range(i + 160, 0.65, 1.4),
  };
});

const SKILL_NODES: Orb[] = [
  "#7dd3fc",
  "#a5b4fc",
  "#86efac",
  "#fcd34d",
  "#fda4af",
  "#c4b5fd",
  "#93c5fd",
  "#7dd3fc",
  "#86efac",
  "#fcd34d",
  "#a5b4fc",
  "#fda4af",
].map((color, i) => {
  const theta = (i / 12) * Math.PI * 2;
  const y = range(i + 220, -2.8, 2.8);
  const radius = range(i + 240, 2.4, 6);
  return {
    position: [Math.cos(theta) * radius, y, Math.sin(theta) * radius],
    color,
    size: range(i + 260, 0.14, 0.34),
    speed: range(i + 280, 0.7, 1.7),
  };
});

const PROJECT_PLANES = Array.from({ length: 12 }, (_, i) => ({
  position: [((i % 4) - 1.5) * 2.7, (Math.floor(i / 4) - 1) * 1.8, range(i + 320, -2.5, 2.2)] as Vec3,
  rotation: [range(i + 340, -0.18, 0.18), range(i + 360, -0.4, 0.4), range(i + 380, -0.12, 0.12)] as Vec3,
  color: i % 3 === 0 ? "#7dd3fc" : i % 3 === 1 ? "#a5b4fc" : "#86efac",
}));

const ACHIEVEMENT_PARTICLES: Orb[] = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return {
    position: [Math.cos(a) * range(i + 420, 3.2, 5.8), range(i + 440, -2.2, 2.2), Math.sin(a) * range(i + 460, 3.2, 5.8)],
    color: i % 2 ? "#fcd34d" : "#a5b4fc",
    size: range(i + 480, 0.04, 0.1),
    speed: range(i + 500, 0.7, 1.5),
  };
});

const CONTACT_PARTICLES: Orb[] = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  return {
    position: [Math.cos(a) * range(i + 520, 3.6, 7.2), range(i + 540, -3.2, 3.2), Math.sin(a) * range(i + 560, 3.6, 7.2)],
    color: i % 2 ? "#7dd3fc" : "#c4b5fd",
    size: range(i + 580, 0.04, 0.11),
    speed: range(i + 600, 0.45, 1.1),
  };
});

function scrollToScene(index: number) {
  const root = document.getElementById("canvas-root");
  if (!root) return;

  const scroller = Array.from(root.querySelectorAll("div")).find((element) => {
    const style = getComputedStyle(element);
    return style.overflowY === "auto" && element.scrollHeight > element.clientHeight;
  });

  if (!scroller) return;

  const max = scroller.scrollHeight - scroller.clientHeight;
  scroller.scrollTo({ top: max * (index / (PAGES - 1)), behavior: "smooth" });
}

function currentSegment(value: number, count: number) {
  const raw = value * (count - 1);
  const index = Math.min(Math.floor(raw), count - 2);
  const local = raw - index;
  const smooth = local * local * (3 - 2 * local);
  return { index, smooth };
}

function CameraRig() {
  const scroll = useScroll();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const { index, smooth } = currentSegment(scroll.offset, WAYPOINTS.length);
    const a = WAYPOINTS[index];
    const b = WAYPOINTS[index + 1] ?? a;
    const fovA = FOVS[index];
    const fovB = FOVS[index + 1] ?? fovA;

    const targetX = THREE.MathUtils.lerp(a[0], b[0], smooth) + mouse.current.x * 0.35;
    const targetY = THREE.MathUtils.lerp(a[1], b[1], smooth) + mouse.current.y * 0.25;
    const targetZ = THREE.MathUtils.lerp(a[2], b[2], smooth);

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3.2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3.2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3.2, delta);
    state.camera.lookAt(0, 0, 0);

    const camera = state.camera as THREE.PerspectiveCamera;
    camera.fov = THREE.MathUtils.damp(camera.fov, THREE.MathUtils.lerp(fovA, fovB, smooth), 4, delta);
    camera.updateProjectionMatrix();
  });

  return null;
}

function DynamicLights() {
  const scroll = useScroll();
  const keyLight = useRef<THREE.PointLight>(null);
  const rimLight = useRef<THREE.PointLight>(null);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const { index, smooth } = currentSegment(scroll.offset, LIGHT_COLORS.length);
    const a = LIGHT_COLORS[index];
    const b = LIGHT_COLORS[index + 1] ?? a;
    color.setRGB(
      THREE.MathUtils.lerp(a[0], b[0], smooth),
      THREE.MathUtils.lerp(a[1], b[1], smooth),
      THREE.MathUtils.lerp(a[2], b[2], smooth),
    );

    const time = clock.elapsedTime;

    if (keyLight.current) {
      keyLight.current.color.copy(color);
      keyLight.current.position.set(Math.sin(time * 0.3) * 8, Math.cos(time * 0.22) * 5, 6);
      keyLight.current.intensity = 3.2 + Math.sin(time * 0.5) * 0.75;
    }

    if (rimLight.current) {
      rimLight.current.color.copy(color);
      rimLight.current.position.set(Math.cos(time * 0.24) * 7, Math.sin(time * 0.31) * 4, -5);
      rimLight.current.intensity = 2.2 + Math.cos(time * 0.42) * 0.55;
    }
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#9aa7bd" />
      <directionalLight position={[5, 8, 6]} intensity={0.45} />
      <pointLight ref={keyLight} intensity={2.4} distance={35} />
      <pointLight ref={rimLight} intensity={1.8} distance={30} />
    </>
  );
}

function Stars({ count = 1500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      points[i * 3] = range(i + 700, -55, 55);
      points[i * 3 + 1] = range(i + 1700, -55, 55);
      points[i * 3 + 2] = range(i + 2700, -55, 55);
    }

    return points;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.006;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.04) * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#c7d2fe" size={0.035} sizeAttenuation transparent opacity={0.32} depthWrite={false} />
    </points>
  );
}

function SceneOrb({ orb, shape = "sphere" }: { orb: Orb; shape?: "sphere" | "box" | "octa" }) {
  return (
    <Float speed={orb.speed} rotationIntensity={0.7} floatIntensity={0.9}>
      <mesh position={orb.position}>
        {shape === "box" ? (
          <boxGeometry args={[orb.size * 2.5, orb.size * 2.5, orb.size * 2.5]} />
        ) : shape === "octa" ? (
          <octahedronGeometry args={[orb.size * 2.8, 0]} />
        ) : (
          <sphereGeometry args={[orb.size, 18, 18]} />
        )}
        <meshStandardMaterial
          color={orb.color}
          emissive={orb.color}
          emissiveIntensity={0.45}
          transparent
          opacity={0.58}
          roughness={0.34}
          metalness={0.18}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

function World() {
  const { viewport } = useThree();
  const vh = viewport.height;
  const hero = useRef<THREE.Group>(null);
  const about = useRef<THREE.Group>(null);
  const projectWall = useRef<THREE.Group>(null);
  const education = useRef<THREE.Group>(null);
  const trophy = useRef<THREE.Group>(null);
  const contact = useRef<THREE.Group>(null);

  const heroEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.2, 2)), []);
  const panelEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.2, 1.2, 0.06)), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (hero.current) {
      hero.current.rotation.y = t * 0.13;
      hero.current.rotation.x = Math.sin(t * 0.11) * 0.16;
    }

    if (about.current) {
      about.current.rotation.y = Math.sin(t * 0.18) * 0.22;
      about.current.rotation.z = t * 0.035;
    }

    if (projectWall.current) {
      projectWall.current.rotation.y = Math.sin(t * 0.18) * 0.08;
    }

    if (education.current) {
      education.current.rotation.y = t * 0.11;
    }

    if (trophy.current) {
      trophy.current.rotation.y = t * 0.22;
      trophy.current.rotation.x = Math.sin(t * 0.2) * 0.18;
    }

    if (contact.current) {
      contact.current.rotation.x = t * 0.08;
      contact.current.rotation.y = t * 0.12;
    }
  });

  return (
    <>
      <group position={[0, 0, 0]}>
        <group ref={hero}>
          <mesh>
            <icosahedronGeometry args={[2.9, 2]} />
            <meshStandardMaterial color="#07101f" metalness={0.3} roughness={0.48} transparent opacity={0.72} />
          </mesh>
          <lineSegments geometry={heroEdges}>
            <lineBasicMaterial color="#8dd7ee" transparent opacity={0.24} />
          </lineSegments>
        </group>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[4.5, 0.055, 16, 128]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.28} transparent opacity={0.34} />
        </mesh>
        <mesh rotation={[Math.PI / 3.2, 0, Math.PI / 4]}>
          <torusGeometry args={[5.35, 0.04, 16, 128]} />
          <meshStandardMaterial color="#a5b4fc" emissive="#a5b4fc" emissiveIntensity={0.22} transparent opacity={0.24} />
        </mesh>
        <mesh rotation={[Math.PI / 2, Math.PI / 3, 0]}>
          <torusGeometry args={[6.45, 0.025, 16, 128]} />
          <meshStandardMaterial color="#86efac" emissive="#86efac" emissiveIntensity={0.16} transparent opacity={0.14} />
        </mesh>
        {HERO_ORBS.map((orb, index) => (
          <SceneOrb key={`hero-${index}`} orb={orb} />
        ))}
      </group>

      <group position={[0, -vh, 0]}>
        <group ref={about}>
          <Float speed={0.65} rotationIntensity={0.9} floatIntensity={0.6}>
            <mesh>
              <dodecahedronGeometry args={[2.6, 0]} />
              <meshStandardMaterial color="#a5b4fc" wireframe transparent opacity={0.24} />
            </mesh>
          </Float>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[4.1, 0.035, 12, 96]} />
            <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.18} transparent opacity={0.16} />
          </mesh>
        </group>
        {ABOUT_CRYSTALS.map((orb, index) => (
          <SceneOrb key={`about-${index}`} orb={orb} shape="box" />
        ))}
      </group>

      <group position={[0, -vh * 2, 0]}>
        {SKILL_NODES.map((orb, index) => (
          <SceneOrb key={`skill-${index}`} orb={orb} />
        ))}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={
                new Float32Array(
                  SKILL_NODES.flatMap((node, index) => {
                    const next = SKILL_NODES[(index + 3) % SKILL_NODES.length];
                    return [...node.position, ...next.position];
                  }),
                )
              }
              count={SKILL_NODES.length * 2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#7dd3fc" transparent opacity={0.1} />
        </lineSegments>
      </group>

      <group ref={projectWall} position={[0, -vh * 3, 0]}>
        {PROJECT_PLANES.map((plane, index) => (
          <Float key={`project-${index}`} speed={0.55 + index * 0.05} rotationIntensity={0.2} floatIntensity={0.45}>
            <group position={plane.position} rotation={plane.rotation}>
              <mesh>
                <boxGeometry args={[2.2, 1.2, 0.06]} />
                <meshStandardMaterial color="#07101f" metalness={0.36} roughness={0.5} transparent opacity={0.5} />
              </mesh>
              <lineSegments geometry={panelEdges}>
                <lineBasicMaterial color={plane.color} transparent opacity={0.26} />
              </lineSegments>
            </group>
          </Float>
        ))}
      </group>

      <group position={[0, -vh * 4, 0]}>
        <group ref={education}>
          <mesh rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[2.25, 4.4, 4]} />
            <meshStandardMaterial color="#7dd3fc" wireframe transparent opacity={0.18} />
          </mesh>
          {Array.from({ length: 34 }, (_, i) => {
            const a = (i / 34) * Math.PI * 5;
            const y = (i / 34) * 5.2 - 2.6;
            const radius = 1.6 + i * 0.055;
            return (
              <mesh key={`edu-${i}`} position={[Math.cos(a) * radius, y, Math.sin(a) * radius]}>
                <sphereGeometry args={[0.055, 10, 10]} />
                <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.4} />
              </mesh>
            );
          })}
        </group>
      </group>

      <group position={[0, -vh * 5, 0]}>
        <group ref={trophy}>
          <mesh>
            <octahedronGeometry args={[2.15, 0]} />
            <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.14} wireframe transparent opacity={0.28} />
          </mesh>
          <mesh position={[2.9, -1.4, 1.4]}>
            <octahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial color="#a5b4fc" emissive="#a5b4fc" emissiveIntensity={0.14} wireframe transparent opacity={0.22} />
          </mesh>
        </group>
        {ACHIEVEMENT_PARTICLES.map((orb, index) => (
          <SceneOrb key={`achievement-${index}`} orb={orb} shape="octa" />
        ))}
      </group>

      <group position={[0, -vh * 6, 0]}>
        {[
          { color: "#7dd3fc", position: [-2.8, 1, -1] as Vec3 },
          { color: "#a5b4fc", position: [2.5, -0.5, 0.5] as Vec3 },
          { color: "#86efac", position: [-1.1, -2, 2] as Vec3 },
          { color: "#fcd34d", position: [1.6, 2.1, -1.5] as Vec3 },
        ].map((planet, index) => (
          <Float key={`interest-${index}`} speed={0.8 + index * 0.18} rotationIntensity={0.35} floatIntensity={1.2}>
            <mesh position={planet.position}>
              <sphereGeometry args={[0.9, 32, 32]} />
              <meshStandardMaterial color={planet.color} emissive={planet.color} emissiveIntensity={0.1} transparent opacity={0.3} />
            </mesh>
          </Float>
        ))}
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[4.8, 0.025, 12, 128]} />
          <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={0.12} transparent opacity={0.14} />
        </mesh>
      </group>

      <group position={[0, -vh * 7, 0]}>
        <group ref={contact}>
          <mesh>
            <torusKnotGeometry args={[2, 0.42, 144, 32]} />
            <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.1} wireframe transparent opacity={0.16} />
          </mesh>
        </group>
        {CONTACT_PARTICLES.map((orb, index) => (
          <SceneOrb key={`contact-${index}`} orb={orb} />
        ))}
      </group>
    </>
  );
}

function SceneSection({
  index,
  eyebrow,
  title,
  wide = false,
  children,
}: PropsWithChildren<{ index: number; eyebrow: string; title: string; wide?: boolean }>) {
  return (
    <section id={SECTION_IDS[index]} className="scene-section" style={{ top: `${index * 100}vh` }}>
      <div className={wide ? "scene-copy scene-copy-wide" : "scene-copy"}>
        <div className="scene-eyebrow">
          <span>{String(index).padStart(2, "0")}</span>
          {eyebrow}
        </div>
        <h2 className="scene-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function HtmlSections() {
  return (
    <>
      <section id="hero" className="scene-section scene-hero" style={{ top: 0 }}>
        <div className="scene-copy scene-copy-hero">
          <div className="profile-medallion" aria-label="Portrait of Nishit Rajput">
            <img src="/nishit-profile.webp" alt="Nishit Rajput" />
          </div>
          <p className="scene-kicker">Full-Stack Developer & CS Student</p>
          <h1 className="hero-title">Nishit Rajput</h1>
          <p className="hero-text">
            Building practical software with thoughtful UX, scalable systems, and real-world impact.
          </p>
          <div className="hero-actions">
            <button className="action action-primary" type="button" onClick={() => scrollToScene(3)}>
              <ExternalLink size={17} />
              View Projects
            </button>
            <a className="action action-secondary" href={RESUME} target="_blank" rel="noopener noreferrer">
              <Download size={17} />
              Resume
            </a>
          </div>
          <div className="social-row">
            <a href={GH_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
              GitHub
            </a>
            <a href={LI_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
        <button className="scroll-cue" type="button" aria-label="Go to about" onClick={() => scrollToScene(1)}>
          <ArrowDown size={22} />
        </button>
      </section>

      <SceneSection index={1} eyebrow="About" title="About Me">
        <p className="scene-text">
          I am a third-year Computer Science student who likes turning rough ideas into useful,
          reliable products. My work spans full-stack apps, mobile experiences, and machine
          learning prototypes.
        </p>
        <p className="scene-text">
          I enjoy hackathon pressure, clean architecture, and interfaces that feel fast without
          feeling disposable.
        </p>
        <div className="focus-strip">
          <span>Current focus</span>
          <strong>Real-world apps, strong UX, clean systems</strong>
        </div>
      </SceneSection>

      <SceneSection index={2} eyebrow="Skills" title="Tech Stack" wide>
        <div className="skill-grid">
          {SKILLS.map((group) => (
            <div key={group.label} className={`skill-card ${group.c}`}>
              <span>{group.label}</span>
              <div>
                {group.items.map((skill) => (
                  <em key={skill}>{skill}</em>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SceneSection>

      <SceneSection index={3} eyebrow="Projects" title="Selected Work" wide>
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <article key={project.title} className="project-card">
              {project.award && <span className="award">{project.award}</span>}
              <div className="project-heading">
                <h3>{project.title}</h3>
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub`}>
                  <Github size={17} />
                </a>
              </div>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SceneSection>

      <SceneSection index={4} eyebrow="Education" title="Education">
        <div className="education-block">
          <h3>K.J. Somaiya Institute of Technology</h3>
          <p>B.Tech in Computer Science</p>
          <span>Aug 2023 - Present, Mumbai</span>
        </div>
        <div className="cgpa-list" aria-label="CGPA progression">
          {SEMESTERS.map((semester, index) => (
            <div key={semester.label} className="cgpa-row">
              <span>{semester.label}</span>
              <div>
                <i style={{ width: `${(semester.value / 10) * 100}%`, transitionDelay: `${index * 0.08}s` }} />
              </div>
              <strong>{semester.value}</strong>
            </div>
          ))}
        </div>
        <div className="education-block compact">
          <h3>SKK English High School & Junior College</h3>
          <p>Higher Secondary Certificate</p>
          <span>Completed April 2023, Mumbai</span>
        </div>
      </SceneSection>

      <SceneSection index={5} eyebrow="Achievements" title="Wins & Milestones">
        <div className="achievement-list">
          <article>
            <span>1st Place</span>
            <h3>KnowBuild '25 - 8-Hour Startup Hackathon</h3>
            <p>Built WorkFromCafe, a crowdsourced cafe discovery platform for remote workers.</p>
          </article>
          <article>
            <span>Finalist - Top 20 / 400+</span>
            <h3>CodePrix 1.0 - National 24-Hour Hackathon</h3>
            <p>Advanced through qualifiers and into the national final at ATLAS SkillTech.</p>
          </article>
        </div>
      </SceneSection>

      <SceneSection index={6} eyebrow="Beyond Code" title="Interests">
        <div className="interest-row">
          <span>Football</span>
          <span>Fitness</span>
          <span>Cycling</span>
          <span>Drawing</span>
        </div>
      </SceneSection>

      <SceneSection index={7} eyebrow="Contact" title="Get In Touch">
        <p className="scene-text centered">
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
        <div className="social-row">
          <a href={GH_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={18} />
            GitHub
          </a>
          <a href={LI_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>
        <p className="copyright">2026 Nishit Rajput</p>
      </SceneSection>
    </>
  );
}

function Experience() {
  return (
    <>
      <fog attach="fog" args={["#05070b", 14, 48]} />
      <DynamicLights />
      <CameraRig />
      <Stars />

      <Scroll>
        <World />
      </Scroll>

      <Scroll html style={{ width: "100%" }}>
        <HtmlSections />
      </Scroll>
    </>
  );
}

export default function ImmersiveScene() {
  const lowEnd = typeof navigator !== "undefined" ? (navigator.hardwareConcurrency || 8) <= 4 : false;

  return (
    <div id="canvas-root">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45, near: 0.1, far: 120 }}
        gl={{ antialias: !lowEnd, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, lowEnd ? 1 : 1.5]}
        style={{ background: "#05070b" }}
      >
        <ScrollControls pages={PAGES} damping={0.22} distance={1.2}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
