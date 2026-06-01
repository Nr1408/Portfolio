import { useEffect, useMemo, useRef, useState, type PointerEvent, type PropsWithChildren } from "react";
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
  [0, 0, 13.4],
  [7.2, 3.7, 5.8],
  [-6.2, -3.2, 6.4],
  [0.4, 7.2, 4.8],
  [8.1, -4.8, 6.2],
  [-7.4, 5.1, 8.5],
  [5.2, -5.8, 5.4],
  [0, 0, 18.5],
];

const FOVS = [42, 35, 39, 33, 38, 41, 35, 48];

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

const PORTAL_PALETTE = [
  { color: "#7dd3fc", accent: "#a5b4fc", tilt: 0.08 },
  { color: "#a5b4fc", accent: "#7dd3fc", tilt: -0.14 },
  { color: "#86efac", accent: "#7dd3fc", tilt: 0.2 },
  { color: "#7dd3fc", accent: "#86efac", tilt: -0.1 },
  { color: "#93c5fd", accent: "#c4b5fd", tilt: 0.16 },
  { color: "#fcd34d", accent: "#a5b4fc", tilt: -0.18 },
  { color: "#c4b5fd", accent: "#86efac", tilt: 0.12 },
  { color: "#7dd3fc", accent: "#c4b5fd", tilt: 0 },
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
      <ambientLight intensity={0.18} color="#9aa7bd" />
      <directionalLight position={[5, 8, 6]} intensity={0.38} />
      <pointLight ref={keyLight} intensity={2.4} distance={35} />
      <pointLight ref={rimLight} intensity={1.8} distance={30} />
    </>
  );
}

function DataGridField({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const points = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const lane = i % 9;
      const layer = Math.floor(i / 9) % 7;
      points[i * 3] = range(i + 700, -42, 42);
      points[i * 3 + 1] = (lane - 4) * 1.35 + range(i + 1700, -0.08, 0.08);
      points[i * 3 + 2] = -22 + layer * 7 + range(i + 2700, -0.12, 0.12);
    }

    return points;
  }, [count]);
  const traces = useMemo(() => {
    const lines: number[] = [];

    for (let layer = 0; layer < 7; layer += 1) {
      const z = -22 + layer * 7;

      for (let lane = -3; lane <= 3; lane += 2) {
        const y = lane * 1.35;
        lines.push(-34, y, z, 34, y, z);
      }

      for (let x = -30; x <= 30; x += 10) {
        lines.push(x, -5.2, z, x, 5.2, z);
      }
    }

    return new Float32Array(lines);
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.z = Math.sin(clock.elapsedTime * 0.12) * 0.8;
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.025;
    }
  });

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#7dd3fc" size={0.028} sizeAttenuation transparent opacity={0.22} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={traces} count={traces.length / 3} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.04} />
      </lineSegments>
    </group>
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

function PortalField({
  y,
  color,
  accent,
  tilt = 0,
  density = 5,
}: {
  y: number;
  color: string;
  accent: string;
  tilt?: number;
  density?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const frameGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 0.04)), []);
  const frames = useMemo(
    () =>
      Array.from({ length: density }, (_, index) => ({
        height: 4.2 + index * 0.72,
        opacity: Math.max(0.035, 0.13 - index * 0.018),
        rotation: tilt + index * 0.11,
        width: 7.2 + index * 1.1,
        z: -2.2 - index * 1.45,
      })),
    [density, tilt],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    group.current.rotation.z = tilt + Math.sin(time * 0.11 + y * 0.01) * 0.035;
    group.current.position.z = -0.25 + Math.sin(time * 0.16 + y * 0.02) * 0.18;
  });

  return (
    <group ref={group} position={[0, y, -2.6]}>
      {frames.map((frame, index) => (
        <group key={`${color}-${index}`} position={[0, 0, frame.z]} rotation={[0, 0, frame.rotation]}>
          <lineSegments geometry={frameGeometry} scale={[frame.width, frame.height, 1]}>
            <lineBasicMaterial color={index % 2 ? color : accent} transparent opacity={frame.opacity * 0.72} />
          </lineSegments>
          <mesh position={[0, frame.height * 0.37, 0]}>
            <boxGeometry args={[frame.width * 0.44, 0.018, 0.018]} />
            <meshBasicMaterial color={index % 2 ? accent : color} transparent opacity={frame.opacity * 0.8} depthWrite={false} />
          </mesh>
          <mesh position={[0, -frame.height * 0.37, 0]}>
            <boxGeometry args={[frame.width * 0.44, 0.018, 0.018]} />
            <meshBasicMaterial color={index % 2 ? color : accent} transparent opacity={frame.opacity * 0.62} depthWrite={false} />
          </mesh>
          <mesh position={[frame.width * 0.36, 0, 0]}>
            <boxGeometry args={[0.018, frame.height * 0.48, 0.018]} />
            <meshBasicMaterial color={index % 2 ? color : accent} transparent opacity={frame.opacity * 0.58} depthWrite={false} />
          </mesh>
          <mesh position={[-frame.width * 0.36, 0, 0]}>
            <boxGeometry args={[0.018, frame.height * 0.48, 0.018]} />
            <meshBasicMaterial color={index % 2 ? accent : color} transparent opacity={frame.opacity * 0.58} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0, -0.03]}>
            <planeGeometry args={[frame.width * 0.82, 0.018]} />
            <meshBasicMaterial color={index % 2 ? accent : color} transparent opacity={frame.opacity * 0.6} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function LightRibbons() {
  const group = useRef<THREE.Group>(null);
  const ribbons = useMemo(
    () => [
      { color: "#7dd3fc", opacity: 0.08, rotation: -0.58, x: -5.4, z: -8 },
      { color: "#a5b4fc", opacity: 0.06, rotation: 0.5, x: 5.2, z: -11 },
      { color: "#86efac", opacity: 0.045, rotation: -0.44, x: 0.4, z: -14 },
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.12) * 0.25;
  });

  return (
    <group ref={group}>
      {ribbons.map((ribbon) => (
        <mesh key={ribbon.color} position={[ribbon.x, 0, ribbon.z]} rotation={[0, 0, ribbon.rotation]}>
          <boxGeometry args={[0.035, 42, 0.035]} />
          <meshBasicMaterial color={ribbon.color} transparent opacity={ribbon.opacity} depthWrite={false} />
        </mesh>
      ))}
    </group>
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

  const heroEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(4.8, 3.4, 1.8)), []);
  const heroFrameEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 0.04)), []);
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
      {PORTAL_PALETTE.map((portal, index) => (
        <PortalField
          key={SECTION_IDS[index]}
          y={-vh * index}
          color={portal.color}
          accent={portal.accent}
          tilt={portal.tilt}
          density={index === 0 ? 6 : 5}
        />
      ))}

      <group position={[0, 0, 0]}>
        <group ref={hero}>
          <mesh>
            <boxGeometry args={[4.8, 3.4, 1.8]} />
            <meshStandardMaterial color="#07101f" metalness={0.3} roughness={0.48} transparent opacity={0.54} />
          </mesh>
          <lineSegments geometry={heroEdges}>
            <lineBasicMaterial color="#8dd7ee" transparent opacity={0.17} />
          </lineSegments>
        </group>
        <group rotation={[0.18, 0, 0]}>
          <lineSegments geometry={heroFrameEdges} scale={[8.8, 4.7, 1]}>
            <lineBasicMaterial color="#7dd3fc" transparent opacity={0.16} />
          </lineSegments>
          <lineSegments geometry={heroFrameEdges} scale={[6.8, 3.4, 1]} rotation={[0, 0, Math.PI / 7]}>
            <lineBasicMaterial color="#a5b4fc" transparent opacity={0.13} />
          </lineSegments>
          <mesh position={[0, 2.35, 0]}>
            <boxGeometry args={[3.9, 0.05, 0.04]} />
            <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.24} transparent opacity={0.22} />
          </mesh>
          <mesh position={[0, -2.35, 0]}>
            <boxGeometry args={[3.2, 0.04, 0.04]} />
            <meshStandardMaterial color="#86efac" emissive="#86efac" emissiveIntensity={0.12} transparent opacity={0.12} />
          </mesh>
          <mesh position={[-4.4, 0, 0]}>
            <boxGeometry args={[0.05, 2.4, 0.04]} />
            <meshStandardMaterial color="#a5b4fc" emissive="#a5b4fc" emissiveIntensity={0.16} transparent opacity={0.12} />
          </mesh>
          <mesh position={[4.4, 0, 0]}>
            <boxGeometry args={[0.05, 2.4, 0.04]} />
            <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.2} transparent opacity={0.15} />
          </mesh>
        </group>
        {HERO_ORBS.map((orb, index) => (
          <SceneOrb key={`hero-${index}`} orb={orb} shape="box" />
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
          <lineSegments geometry={heroFrameEdges} scale={[5.6, 3.2, 1]} rotation={[0, 0, Math.PI / 9]}>
            <lineBasicMaterial color="#7dd3fc" transparent opacity={0.15} />
          </lineSegments>
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
        ].map((node, index) => (
          <Float key={`interest-${index}`} speed={0.8 + index * 0.18} rotationIntensity={0.35} floatIntensity={1.2}>
            <group position={node.position}>
              <mesh>
                <boxGeometry args={[1.5, 0.86, 0.08]} />
                <meshStandardMaterial color="#07101f" metalness={0.35} roughness={0.5} transparent opacity={0.46} />
              </mesh>
              <lineSegments geometry={panelEdges}>
                <lineBasicMaterial color={node.color} transparent opacity={0.28} />
              </lineSegments>
              <mesh position={[0, 0.18, 0.08]}>
                <boxGeometry args={[0.86, 0.045, 0.04]} />
                <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.4} transparent opacity={0.5} />
              </mesh>
              <mesh position={[-0.2, -0.12, 0.08]}>
                <boxGeometry args={[0.46, 0.04, 0.04]} />
                <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.3} transparent opacity={0.36} />
              </mesh>
            </group>
          </Float>
        ))}
        <lineSegments geometry={heroFrameEdges} scale={[7.4, 4.2, 1]} rotation={[0.2, 0, -0.16]}>
          <lineBasicMaterial color="#c4b5fd" transparent opacity={0.12} />
        </lineSegments>
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
  const [selectedSurface, setSelectedSurface] = useState<string | null>(null);
  const surfaceClass = (base: string, id: string) =>
    `${base} selectable-surface${selectedSurface === id ? " is-selected" : ""}`;
  const surfaceProps = (id: string) => ({
    onMouseMove: () => setSelectedSurface(id),
    onMouseLeave: () => setSelectedSurface((current) => (current === id ? null : current)),
    onPointerEnter: () => setSelectedSurface(id),
    onPointerDown: () => setSelectedSurface(id),
    onPointerLeave: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "touch") {
        setSelectedSurface((current) => (current === id ? null : current));
      }
    },
    onFocus: () => setSelectedSurface(id),
    onBlur: () => setSelectedSurface((current) => (current === id ? null : current)),
  });

  return (
    <>
      <section id="hero" className="scene-section scene-hero" style={{ top: 0 }}>
        <div className="scene-copy scene-copy-hero">
          <div className="profile-medallion" aria-label="Portrait of Nishit Rajput">
            <span className="profile-crop">
              <img src="/nishit-profile.webp" alt="Nishit Rajput" />
            </span>
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
        <div className={surfaceClass("focus-strip", "about-focus")} {...surfaceProps("about-focus")}>
          <span>Current focus</span>
          <strong>Real-world apps, strong UX, clean systems</strong>
        </div>
      </SceneSection>

      <SceneSection index={2} eyebrow="Skills" title="Tech Stack" wide>
        <div className="skill-grid">
          {SKILLS.map((group) => (
            <div
              key={group.label}
              className={surfaceClass(`skill-card ${group.c}`, `skill-${group.label}`)}
              {...surfaceProps(`skill-${group.label}`)}
            >
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
            <article
              key={project.title}
              className={surfaceClass("project-card", `project-${project.title}`)}
              {...surfaceProps(`project-${project.title}`)}
            >
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
        <div className={surfaceClass("education-block", "education-college")} {...surfaceProps("education-college")}>
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
        <div className={surfaceClass("education-block compact", "education-school")} {...surfaceProps("education-school")}>
          <h3>SKK English High School & Junior College</h3>
          <p>Higher Secondary Certificate</p>
          <span>Completed April 2023, Mumbai</span>
        </div>
      </SceneSection>

      <SceneSection index={5} eyebrow="Achievements" title="Wins & Milestones">
        <div className="achievement-list">
          <article className={surfaceClass("", "achievement-knowbuild")} {...surfaceProps("achievement-knowbuild")}>
            <span>1st Place</span>
            <h3>KnowBuild '25 - 8-Hour Startup Hackathon</h3>
            <p>Built WorkFromCafe, a crowdsourced cafe discovery platform for remote workers.</p>
          </article>
          <article className={surfaceClass("", "achievement-codeprix")} {...surfaceProps("achievement-codeprix")}>
            <span>Finalist - Top 20 / 400+</span>
            <h3>CodePrix 1.0 - National 24-Hour Hackathon</h3>
            <p>Advanced through qualifiers and into the national final at ATLAS SkillTech.</p>
          </article>
        </div>
      </SceneSection>

      <SceneSection index={6} eyebrow="Beyond Code" title="Interests">
        <div className="interest-row">
          {["Football", "Fitness", "Cycling", "Drawing"].map((interest) => (
            <span
              key={interest}
              className={surfaceClass("", `interest-${interest}`)}
              {...surfaceProps(`interest-${interest}`)}
            >
              {interest}
            </span>
          ))}
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
      <DataGridField />
      <LightRibbons />

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
