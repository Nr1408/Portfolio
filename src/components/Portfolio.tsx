import React, { useState, useEffect } from "react";
import {
  ArrowDown,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  Trophy,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Heart,
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
  Star,
  Check,
} from "lucide-react";

import { Tape } from "./looseleaf/Tape";
import { Paperclip, Pushpin, Staple, BinderClip } from "./looseleaf/Fasteners";
import { Stamp } from "./looseleaf/Stamp";
import {
  ArrowCurved,
  ArrowPointDown,
  ArrowPointUpLeft,
  ArrowPointDownLeft,
  ArrowLoop,
  StarDrawn,
  SparkleDrawn,
  SquiggleUnderline,
  DoubleUnderline,
  HandCircle,
  CoffeeRing,
  LightbulbDoodle,
  CodeBracketsDoodle,
  Highlighter,
} from "./looseleaf/Doodles";
import { Paper, type PaperStock } from "./looseleaf/Paper";
import { StickyNote } from "./looseleaf/StickyNote";
import { LooseleafButton } from "./looseleaf/LooseleafButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardDrawnRule,
} from "./looseleaf/LooseleafCard";
import { LooseleafBadge } from "./looseleaf/LooseleafBadge";
import { NotebookNav, type PaperTheme } from "./looseleaf/NotebookNav";
import { DoodleScratchpad } from "./looseleaf/DoodleScratchpad";

const RESUME =
  "https://drive.google.com/file/d/1L5B7JbPYkD-P8icA9x_pAfXQlkX2FmwK/view?usp=sharing";
const GH_URL = "https://github.com/Nr1408";
const LI_URL = "https://www.linkedin.com/in/nishit-rajput-0a12a5320/";

const EXPERIENCE = [
  {
    role: "Backend Intern",
    company: "Nexkirana",
    date: "Feb 2026 - May 2026 · 4 mos",
    location: "Remote",
    skill: "Back-End Web Development",
    tone: "cyan" as const,
    description: [
      "Built order fulfillment and cancellation workflows.",
      "Integrated QR code scanning for delivery validation.",
      "Implemented backend multi-language support.",
      "Optimized API endpoints, database, and authentication.",
    ],
  },
  {
    role: "AI/ML Intern",
    company: "The AgriOrbit Technology · Internship",
    date: "Jan 2026 - Mar 2026 · 3 mos",
    location: "Mumbai, Maharashtra, India",
    skill: "Machine Learning & AI",
    tone: "green" as const,
    description: [
      "Built and fine-tuned ML models for agricultural use cases using Python and TensorFlow.",
      "Developed AI-driven data pipelines and model evaluation workflows.",
    ],
  },
];

const SKILLS = [
  {
    category: "Languages",
    color: "yellow" as const,
    tilt: -1.5,
    items: ["SQL", "Python", "JavaScript", "TypeScript"],
  },
  {
    category: "Frontend",
    color: "pink" as const,
    tilt: 1.2,
    items: ["HTML", "Tailwind CSS", "CSS3", "React 19"],
  },
  {
    category: "Backend",
    color: "cyan" as const,
    tilt: -1,
    items: ["FastAPI", "Django", "Node.js", "REST APIs"],
  },
  {
    category: "Mobile",
    color: "green" as const,
    tilt: 1.8,
    items: ["Capacitor", "React Native", "PWA Architecture"],
  },
  {
    category: "Databases",
    color: "orange" as const,
    tilt: -1.2,
    items: ["PostgreSQL", "Firebase", "Supabase", "MySQL"],
  },
  {
    category: "AI & ML",
    color: "lavender" as const,
    tilt: 1.4,
    items: ["TensorFlow", "Keras", "CNNs", "PyTorch"],
  },
  {
    category: "Dev Tools",
    color: "yellow" as const,
    tilt: -0.8,
    items: ["Git", "Linux", "Power BI", "Vite", "MS 365"],
  },
];

const PROJECTS = [
  {
    award: "1st Place - KnowBuild '25",
    awardTone: "amber" as const,
    title: "WorkFromCafe",
    description:
      "Crowdsourced cafe discovery for remote workers with live ratings, community check-ins, and workspace signals.",
    tags: ["React", "Supabase", "JavaScript"],
    github: "https://github.com/Nr1408/WorkfromCafe",
    liveUrl: null,
    tape: "washi-yellow" as const,
    tilt: -0.8,
  },
  {
    award: "Top 20 Finalist - CodePrix 1.0",
    awardTone: "crimson" as const,
    title: "TruPay",
    description:
      "A security-first UPI payment ecosystem featuring real-time AI fraud detection, dynamic threat mitigation, and an analyst monitoring dashboard.",
    tags: ["React", "Capacitor", "Flask", "AI Fraud Detection"],
    github: "https://github.com/Nr1408/TruPay",
    liveUrl: null,
    tape: "washi-coral" as const,
    tilt: 1,
  },
  {
    award: null,
    awardTone: "navy" as const,
    title: "LabVerse",
    description:
      "An interactive virtual laboratory platform for remote learning, simulating real-world science experiments through real-time 3D web graphics.",
    tags: ["React", "Three.js", "Node.js", "WebGL"],
    github: "https://github.com/Nr1408/LabVerse",
    liveUrl: null,
    tape: "washi-teal" as const,
    tilt: -1.2,
  },
  {
    award: null,
    awardTone: "navy" as const,
    title: "Strengthy",
    description:
      "A full-stack fitness PWA for personalized workout programming, progress tracking, and offline set logging.",
    tags: ["React", "TypeScript", "Capacitor", "PWA"],
    github: "https://github.com/Nr1408/Strengthy",
    liveUrl: "https://strengthy-strengthy-frontend.vercel.app/",
    tape: "washi-dots" as const,
    tilt: 0.8,
  },
  {
    award: null,
    awardTone: "navy" as const,
    title: "LeafLens",
    description:
      "AI plant disease detection using a custom CNN model and a FastAPI service for fast, reliable field inference.",
    tags: ["Python", "TensorFlow", "FastAPI", "Computer Vision"],
    github: "https://github.com/Nr1408/Leaflens",
    liveUrl: null,
    tape: "washi-grid" as const,
    tilt: -0.5,
  },
];

const SEMESTERS = [
  { label: "Sem 1", value: 7.24, tone: "bg-blue-400" },
  { label: "Sem 2", value: 8.07, tone: "bg-emerald-400" },
  { label: "Sem 3", value: 9.45, tone: "bg-amber-400" },
  { label: "Sem 4", value: 9.64, tone: "bg-rose-400" },
  { label: "Sem 5", value: 9.14, tone: "bg-purple-400" },
  { label: "Sem 6", value: 9.0, tone: "bg-cyan-400" },
];

const INTERESTS = [
  { label: "Football", icon: "⚽", note: "Weekend matches & tactics" },
  { label: "Fitness", icon: "🏋️‍♂️", note: "Strength training & consistency" },
  { label: "Cycling", icon: "🚴", note: "Long urban routes" },
  { label: "Drawing", icon: "✏️", note: "Sketching & visual ideas" },
  { label: "Music", icon: "🎵", note: "Focus playlists for coding" },
];

export default function Portfolio() {
  const [theme, setTheme] = useState<PaperTheme>("lined");

  useEffect(() => {
    if (theme === "chalkboard") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="desk-surface min-h-screen text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* Sticky Notebook Navigation Header */}
      <NotebookNav
        currentTheme={theme}
        onThemeChange={setTheme}
        resumeUrl={RESUME}
      />

      {/* Main Binder Content Workspace */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-16 sm:space-y-24">
        {/* ============================================================== */}
        {/* HERO SECTION                                                   */}
        {/* ============================================================== */}
        <section id="hero" className="relative pt-6 sm:pt-10 scroll-mt-24">
          <Paper
            stock={theme === "chalkboard" ? "chalkboard" : theme === "kraft" ? "kraft" : theme === "grid" ? "grid" : "lined"}
            spiral="left"
            className="p-6 sm:p-12 pl-10 sm:pl-16 shadow-hand-xl overflow-visible"
          >
            {/* Top Washi Tape fastening the hero paper */}
            <Tape
              kind="washi-stripes"
              position="top-center"
              length={140}
              height={26}
              angle={-1.5}
              label="PORTFOLIO ~ 2026"
            />
            <Paperclip position="top-right" tone="brass" size={54} angle={14} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
              {/* Left Column: Polaroid Photo Card */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative group">
                  {/* Polaroid Frame */}
                  <div className="polaroid-frame transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 w-60 sm:w-68">
                    {/* Washi tape over polaroid top */}
                    <Tape
                      kind="washi-coral"
                      position="top-center"
                      length={90}
                      height={22}
                      angle={-3}
                    />
                    <div className="w-full aspect-[4/4.5] overflow-hidden rounded-sm bg-stone-100 border border-stone-300">
                      <img
                        src="/nishit-profile.jpg"
                        alt="Nishit Rajput"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Handwritten caption */}
                    <div className="mt-3 text-center font-hand text-stone-800 text-sm sm:text-base font-bold">
                      Nishit Rajput
                      <span className="text-xs font-normal opacity-70 block">
                        CS Student · Full-Stack Dev 🚀
                      </span>
                    </div>
                  </div>

                  {/* Stamp badge overlapping photo */}
                  <div className="absolute -bottom-4 -right-4 z-20">
                    <Stamp
                      text="OPEN TO WORK"
                      subtext="INTERNSHIPS & ROLES"
                      tone="emerald"
                      angle={8}
                      size="sm"
                    />
                  </div>
                </div>

                {/* Hand-drawn arrow pointing UP directly at photo */}
                <div className="flex items-center gap-1.5 mt-3 font-script text-lg text-amber-800 dark:text-amber-400 select-none">
                  <span className="font-bold -rotate-3">That's me!</span>
                  <ArrowPointUpLeft width={36} height={30} color="#ea580c" />
                </div>
              </div>

              {/* Right Column: Hero Intro & Actions */}
              <div className="md:col-span-7 flex flex-col space-y-4 sm:space-y-6">
                {/* Section Eyebrow Sticker */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest bg-yellow-200 text-stone-900 border border-stone-800 px-2.5 py-1 rounded-sm shadow-[1.5px_1.5px_0px_#1c1917]">
                    👋 Hello World!
                  </span>
                  <span className="font-hand text-xs text-stone-600 dark:text-stone-400">
                    K.J. Somaiya Institute of Technology, Mumbai
                  </span>
                </div>

                {/* Main Heading with Marker Highlight */}
                <div>
                  <h1 className="font-hand text-4xl sm:text-6xl font-black tracking-tight text-stone-900 dark:text-stone-100 leading-[1.05]">
                    Nishit <span className="underline decoration-wavy decoration-amber-500">Rajput</span>
                  </h1>
                  <p className="font-hand text-xl sm:text-2xl text-amber-700 dark:text-amber-400 font-bold mt-2">
                    Full-Stack Developer & CS Student
                  </p>
                </div>

                {/* Subtext description */}
                <p className="font-sans text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed max-w-xl">
                  I build practical software with focused interfaces, reliable systems, and real-world utility. Experienced with <Highlighter color="yellow">FastAPI</Highlighter>, <Highlighter color="cyan">React</Highlighter>, <Highlighter color="pink">TensorFlow</Highlighter>, and modern databases.
                </p>

                {/* Call-to-actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <LooseleafButton
                    variant="marker"
                    size="lg"
                    href="#projects"
                  >
                    <ExternalLink size={18} />
                    View Projects
                  </LooseleafButton>

                  {/* Relative container keeping arrow directly pointing at Download Resume */}
                  <div className="relative inline-flex items-center">
                    <LooseleafButton
                      variant="highlighter"
                      highlighterColor="yellow"
                      size="lg"
                      href={RESUME}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download size={18} />
                      Download Resume
                    </LooseleafButton>

                    {/* Arrow pointing directly down-left into the Download Resume button */}
                    <div className="hidden sm:flex items-center gap-1 absolute -top-9 right-0 pointer-events-none z-20 select-none">
                      <span className="font-script text-amber-700 dark:text-amber-400 text-sm sm:text-base font-bold whitespace-nowrap -rotate-6">
                        Updated CV!
                      </span>
                      <ArrowPointDownLeft width={34} height={26} color="#d97706" />
                    </div>
                  </div>
                </div>

                {/* Social Links Row */}
                <div className="pt-3 flex items-center gap-3 font-hand text-sm font-bold flex-wrap">
                  <a
                    href={GH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-stone-800 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1c1917] transition-all"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  <a
                    href={LI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-stone-800 bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-200 shadow-[2px_2px_0px_#1c1917] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1c1917] transition-all"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                  <a
                    href="mailto:nr14082005@gmail.com"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-stone-800 bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 shadow-[2px_2px_0px_#1c1917] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1c1917] transition-all"
                  >
                    <Mail size={16} />
                    nr14082005@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Sticky Note Stats in Hero Footer */}
            <div className="mt-10 pt-8 border-t-2 border-dashed border-stone-300 dark:border-stone-700 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StickyNote color="yellow" tilt={-1} fastener="tape" className="p-4">
                <span className="font-hand text-xs font-bold text-stone-500 uppercase block">
                  Academic Record
                </span>
                <span className="font-hand text-2xl font-black text-stone-900">
                  8.77 CGPA
                </span>
                <span className="font-sans text-xs text-stone-700 block mt-1">
                  6-semester cumulative score at KJSIT
                </span>
              </StickyNote>

              <StickyNote color="pink" tilt={1.5} fastener="tape" className="p-4">
                <span className="font-hand text-xs font-bold text-stone-500 uppercase block">
                  Hackathon Win
                </span>
                <span className="font-hand text-xl font-black text-stone-900">
                  1st Place 🏆
                </span>
                <span className="font-sans text-xs text-stone-700 block mt-1">
                  KnowBuild '25 (WorkFromCafe startup)
                </span>
              </StickyNote>

              <StickyNote color="green" tilt={-1.2} fastener="tape" className="p-4">
                <span className="font-hand text-xs font-bold text-stone-500 uppercase block">
                  Industry Practice
                </span>
                <span className="font-hand text-xl font-black text-stone-900">
                  2 Internships
                </span>
                <span className="font-sans text-xs text-stone-700 block mt-1">
                  Backend (Nexkirana) & AI/ML (AgriOrbit)
                </span>
              </StickyNote>
            </div>
          </Paper>
        </section>

        {/* ============================================================== */}
        {/* ABOUT ME SECTION                                               */}
        {/* ============================================================== */}
        <section id="about" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm font-bold bg-[#fef08a] text-stone-900 px-3 py-1 rounded-sm border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
              01 / ABOUT
            </span>
            <h2 className="font-hand text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Built For Real Use
            </h2>
            <StarDrawn size={24} color="#eab308" className="ml-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <Card stock="paper" className="p-6 sm:p-8">
                <Tape kind="washi-dots" position="corner-tl" angle={-35} />
                <Pushpin position="top-right" color="blue" size={30} />

                <div className="space-y-4 font-sans text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
                  <p>
                    I am a fourth-year Computer Science student who enjoys turning rough ideas into polished, usable software products. My work spans <Highlighter color="yellow">full-stack web apps</Highlighter>, cross-platform mobile apps, and machine learning prototypes.
                  </p>
                  <p>
                    I deeply care about fast, predictable interfaces, clean backend architecture, and building systems that remain reliable long after the initial demo.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-wrap items-center justify-between gap-4 font-hand">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded border border-amber-400">
                      Current Focus
                    </span>
                    <strong className="text-sm sm:text-base text-stone-900 dark:text-stone-100">
                      Real-world apps, strong UX, clean backend systems
                    </strong>
                  </div>
                  <div className="font-script text-base text-stone-500">
                    ~ Nishit R.
                  </div>
                </div>
              </Card>
            </div>

            {/* Interactive Scratchpad Sticky Note */}
            <div className="lg:col-span-4">
              <DoodleScratchpad />
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SKILLS SECTION                                                 */}
        {/* ============================================================== */}
        <section id="skills" className="scroll-mt-24">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold bg-[#bbf7d0] text-stone-900 px-3 py-1 rounded-sm border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
                02 / STACK
              </span>
              <h2 className="font-hand text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Technical Range
              </h2>
            </div>
            <span className="font-script text-base text-stone-600 dark:text-stone-400">
              📌 Pinned to desk
            </span>
          </div>

          {/* Sticky Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {SKILLS.map((group) => (
              <StickyNote
                key={group.category}
                color={group.color}
                tilt={group.tilt}
                fastener="tape"
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-stone-800/20 font-hand">
                    <h3 className="font-bold text-base tracking-wide text-stone-900">
                      {group.category}
                    </h3>
                    <CodeBracketsDoodle size={20} color="#44403c" />
                  </div>
                  <ul className="space-y-1.5 font-hand text-sm text-stone-800">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <Check size={14} className="text-stone-700 stroke-[3]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-2 border-t border-dashed border-stone-800/20 text-right">
                  <span className="text-[10px] font-mono opacity-60">
                    verified proficiency
                  </span>
                </div>
              </StickyNote>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* WORK EXPERIENCE SECTION                                        */}
        {/* ============================================================== */}
        <section id="experience" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm font-bold bg-[#bae6fd] text-stone-900 px-3 py-1 rounded-sm border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
              03 / EXPERIENCE
            </span>
            <h2 className="font-hand text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Work Experience
            </h2>
            <Briefcase size={24} className="text-sky-600 dark:text-sky-400" />
          </div>

          {/* Daily Work Log Sheets */}
          <div className="space-y-6">
            {EXPERIENCE.map((exp, index) => (
              <Card
                key={exp.company}
                stock="lined"
                tape={index === 0 ? "corner-tr" : "corner-tl"}
                tapeKind={index === 0 ? "washi-teal" : "washi-coral"}
                fastener="paperclip"
                fastenerTone={index === 0 ? "steel" : "brass"}
                className="p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-hand text-2xl font-bold text-stone-900 dark:text-stone-100">
                        {exp.role}
                      </h3>
                      <LooseleafBadge variant="highlighter" tone={exp.tone}>
                        {exp.skill}
                      </LooseleafBadge>
                    </div>
                    <div className="font-sans text-sm font-semibold text-amber-700 dark:text-amber-400 mt-1 flex items-center gap-2">
                      <span>{exp.company}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-stone-500 font-normal">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-xs font-bold text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 w-fit">
                    <Calendar size={13} className="inline mr-1" />
                    {exp.date}
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="mt-5">
                  <ul className="space-y-2.5 font-sans text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-amber-600 dark:text-amber-400 font-bold select-none text-base">
                          ✎
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* PROJECTS SECTION                                               */}
        {/* ============================================================== */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold bg-[#fed7aa] text-stone-900 px-3 py-1 rounded-sm border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
                04 / WORK
              </span>
              <h2 className="font-hand text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Selected Projects
              </h2>
            </div>
            <span className="font-script text-base text-stone-600 dark:text-stone-400">
              📐 Blueprints & source code
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PROJECTS.map((proj) => (
              <Card
                key={proj.title}
                stock="paper"
                tape="top-center"
                tapeKind={proj.tape}
                tilt={proj.tilt}
                className="p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Award Banner & Live Demo Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    {proj.award ? (
                      <Stamp
                        text={proj.award}
                        tone={proj.awardTone}
                        angle={-2}
                        size="sm"
                      />
                    ) : (
                      <span />
                    )}

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500 shadow-[1.5px_1.5px_0px_#1c1917] hover:scale-105 transition-transform"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Demo ↗
                      </a>
                    )}
                  </div>

                  <h3 className="font-hand text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {proj.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 mb-4 border-t border-dashed border-stone-300 dark:border-stone-700">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-hand text-xs font-semibold px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Links / Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {proj.liveUrl ? (
                      <>
                        <LooseleafButton
                          variant="highlighter"
                          highlighterColor="green"
                          size="sm"
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 justify-center min-w-[150px]"
                        >
                          <ExternalLink size={15} />
                          Explore {proj.title} ↗
                        </LooseleafButton>

                        <LooseleafButton
                          variant="secondary"
                          size="sm"
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="justify-center px-3.5"
                          title="View source code on GitHub"
                        >
                          <Github size={15} />
                          <span>Code</span>
                        </LooseleafButton>
                      </>
                    ) : (
                      <LooseleafButton
                        variant="marker"
                        size="sm"
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full justify-center"
                      >
                        <Github size={15} />
                        View Code on GitHub
                      </LooseleafButton>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* EDUCATION & CGPA LEDGER                                        */}
        {/* ============================================================== */}
        <section id="education" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm font-bold bg-[#e9d5ff] text-stone-900 px-3 py-1 rounded-sm border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
              05 / EDUCATION
            </span>
            <h2 className="font-hand text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Academic Record
            </h2>
            <GraduationCap size={24} className="text-purple-600 dark:text-purple-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left: Somaiya Institute Details */}
            <div className="lg:col-span-5 space-y-6">
              <Card stock="paper" className="p-6 sm:p-7">
                <Tape kind="washi-stripes" position="top-left" length={90} angle={-3} />
                <Pushpin position="top-right" color="yellow" size={28} />

                <div className="font-hand text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1">
                  Degree
                </div>
                <h3 className="font-hand text-2xl font-bold text-stone-900 dark:text-stone-100">
                  K.J. Somaiya Institute of Technology
                </h3>
                <p className="font-sans text-sm font-semibold text-stone-700 dark:text-stone-300 mt-1">
                  B.Tech in Computer Science
                </p>
                <p className="font-mono text-xs text-stone-500 mt-0.5">
                  Aug 2023 - Present · Mumbai, India
                </p>

                <div className="mt-5 p-3 rounded-md bg-amber-50 dark:bg-amber-950/40 border-2 border-dashed border-amber-300 dark:border-amber-800">
                  <div className="flex items-center justify-between">
                    <span className="font-hand text-sm font-bold text-amber-900 dark:text-amber-200">
                      Cumulative CGPA
                    </span>
                    <Stamp
                      text="8.77 / 10"
                      tone="amber"
                      size="sm"
                      angle={3}
                    />
                  </div>
                  <p className="font-sans text-xs text-amber-800 dark:text-amber-300 mt-1">
                    Consistent top-tier academic performance across 6 full semesters.
                  </p>
                </div>
              </Card>

              {/* Schooling card */}
              <Card stock="paper" className="p-5 sm:p-6">
                <Staple position="top-left" />
                <div className="font-hand text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
                  High School
                </div>
                <h4 className="font-hand text-lg font-bold text-stone-900 dark:text-stone-100">
                  SKKES English High School & Junior College
                </h4>
                <p className="font-sans text-xs text-stone-600 dark:text-stone-400">
                  Higher Secondary School · Completed April 2023 · Mumbai
                </p>
              </Card>
            </div>

            {/* Right: Semester Ledger */}
            <div className="lg:col-span-7">
              <Paper
                stock="grid"
                tape="corner-tr"
                tapeKind="washi-dots"
                fastener="paperclip"
                fastenerColor="brass"
                className="p-6 sm:p-8 shadow-hand-lg"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-stone-800 dark:border-stone-400 font-hand">
                  <div>
                    <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">
                      Semester Performance Ledger
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 font-sans">
                      Official grade progression curve
                    </p>
                  </div>
                  <Stamp text="VERIFIED" tone="emerald" size="sm" angle={-4} />
                </div>

                {/* Ledger Bars */}
                <div className="space-y-3 font-hand">
                  {SEMESTERS.map((sem) => {
                    const pct = (sem.value / 10) * 100;
                    return (
                      <div key={sem.label} className="space-y-1">
                        <div className="flex justify-between text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                          <span>{sem.label}</span>
                          <span className="font-mono text-xs">{sem.value} / 10</span>
                        </div>
                        <div className="h-4 w-full bg-stone-200 dark:bg-stone-800 rounded-sm border-2 border-stone-800 dark:border-stone-500 overflow-hidden p-0.5">
                          <div
                            className={`h-full rounded-xs transition-all duration-700 ${sem.tone}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hand-drawn teacher remark */}
                <div className="mt-6 pt-4 border-t-2 border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-between font-script text-base sm:text-lg text-emerald-700 dark:text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={18} />
                    <span>"Strong engineering fundamentals & analytical skills!"</span>
                  </div>
                  <StarDrawn size={22} color="#16a34a" />
                </div>
              </Paper>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* WINS & MILESTONES SECTION                                      */}
        {/* ============================================================== */}
        <section id="achievements" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm font-bold bg-[#fef08a] text-stone-900 px-3 py-1 rounded-sm border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
              06 / HIGHLIGHTS
            </span>
            <h2 className="font-hand text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Wins & Milestones
            </h2>
            <Trophy size={24} className="text-amber-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Paper
              stock="plain"
              tape="corner-tl"
              tapeKind="washi-stripes"
              fastener="pushpin"
              fastenerColor="red"
              className="p-6 sm:p-8 border-2 border-amber-500 shadow-hand-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <Stamp
                  text="1ST PLACE WINNER"
                  tone="amber"
                  size="default"
                  angle={-3}
                />
                <Trophy size={32} className="text-amber-500" />
              </div>
              <h3 className="font-hand text-2xl font-black text-stone-900 dark:text-stone-100">
                KnowBuild '25 - 8-Hour Startup Hackathon
              </h3>
              <p className="font-sans text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                Ideated, developed, and pitched <strong>WorkFromCafe</strong>—a crowdsourced cafe discovery platform with live workspace metrics for remote professionals. Won 1st place among dozens of competing university teams.
              </p>
            </Paper>

            <Paper
              stock="plain"
              tape="corner-tr"
              tapeKind="washi-coral"
              fastener="paperclip"
              fastenerColor="steel"
              className="p-6 sm:p-8 shadow-hand-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <Stamp
                  text="FINALIST: TOP 20"
                  tone="crimson"
                  size="default"
                  angle={2}
                />
                <Sparkles size={32} className="text-rose-500" />
              </div>
              <h3 className="font-hand text-2xl font-black text-stone-900 dark:text-stone-100">
                CodePrix 1.0 - National 24-Hour Hackathon
              </h3>
              <p className="font-sans text-sm sm:text-base text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
                Advanced through nationwide qualifiers into the national grand finals at ATLAS SkillTech University (selected among 400+ participants nationwide) with TruPay—an AI-driven fraud detection fintech engine.
              </p>
            </Paper>
          </div>
        </section>

        {/* ============================================================== */}
        {/* INTERESTS (BEYOND CODE)                                        */}
        {/* ============================================================== */}
        <section id="interests" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-sm font-bold bg-[#bbf7d0] text-stone-900 px-3 py-1 rounded-sm border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917]">
              07 / BEYOND CODE
            </span>
            <h2 className="font-hand text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Personal Interests
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {INTERESTS.map((item, idx) => (
              <div
                key={item.label}
                className="p-4 rounded-sm border-2 border-stone-800 bg-white dark:bg-stone-800 shadow-hand text-center flex flex-col items-center justify-center transform hover:-translate-y-1 transition-transform"
                style={{ rotate: `${(idx % 2 === 0 ? -1 : 1) * 1.5}deg` }}
              >
                <div className="text-3xl mb-1">{item.icon}</div>
                <h3 className="font-hand text-base font-bold text-stone-900 dark:text-stone-100">
                  {item.label}
                </h3>
                <p className="font-sans text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* CONTACT SECTION (AIRMAIL / POSTCARD DESIGN)                    */}
        {/* ============================================================== */}
        <section id="contact" className="scroll-mt-24 pb-12">
          <Paper
            stock="plain"
            tape="both"
            tapeKind="washi-stripes"
            className="p-6 sm:p-12 shadow-hand-xl relative overflow-hidden"
          >
            {/* Airmail striped border around postcard */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none border-8 border-transparent"
              style={{
                borderImage:
                  "repeating-linear-gradient(45deg, #ef4444, #ef4444 12px, transparent 12px, transparent 20px, #3b82f6 20px, #3b82f6 32px, transparent 32px, transparent 40px) 12",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Postcard Note */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest bg-rose-200 text-stone-900 border border-stone-800 px-2.5 py-1 rounded-sm">
                    ✉️ AIRMAIL MEMO
                  </span>
                  <Stamp text="POSTAGE PAID" tone="crimson" size="sm" angle={-3} />
                </div>

                <h2 className="font-hand text-3xl sm:text-5xl font-black text-stone-900 dark:text-stone-100 leading-tight">
                  Let's Build Something <Highlighter color="yellow">Great</Highlighter> Together
                </h2>

                <p className="font-sans text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
                  I am currently open to full-time roles, software engineering internships, freelance projects, and collaborations on interesting problems.
                </p>

                {/* Hand-drawn arrow pointing to buttons */}
                <div className="flex items-center gap-2 font-script text-base text-stone-600 dark:text-stone-300">
                  <span>Drop me a message right here!</span>
                  <ArrowPointDown width={24} height={36} color="#dc2626" />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <LooseleafButton
                    variant="marker"
                    size="lg"
                    href="mailto:nr14082005@gmail.com"
                  >
                    <Mail size={18} />
                    Email: nr14082005@gmail.com
                  </LooseleafButton>

                  <LooseleafButton
                    variant="secondary"
                    size="lg"
                    href="tel:+919136115989"
                  >
                    <Phone size={18} />
                    Call: +91 91361 15989
                  </LooseleafButton>
                </div>
              </div>

              {/* Right Column: Address stamp & coffee ring */}
              <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center relative">
                <CoffeeRing size={130} className="absolute -top-10 -right-6" />

                <div className="p-5 rounded border-2 border-stone-800 bg-amber-50 dark:bg-stone-800 shadow-hand max-w-xs font-hand text-sm space-y-2 relative z-10">
                  <div className="flex justify-between items-center border-b border-stone-400 pb-1.5 font-bold">
                    <span>TO:</span>
                    <span className="font-mono text-xs">MUMBAI, IN</span>
                  </div>
                  <div className="font-sans font-bold text-stone-900 dark:text-stone-100">
                    Nishit Rajput
                  </div>
                  <div className="font-sans text-xs text-stone-600 dark:text-stone-400 leading-normal">
                    K.J. Somaiya Institute of Technology<br />
                    Mumbai, Maharashtra, India<br />
                    nr14082005@gmail.com
                  </div>
                  <div className="pt-2 border-t border-dashed border-stone-400 flex justify-between items-center text-xs font-mono">
                    <span className="text-emerald-700 font-bold">● ONLINE / AVAILABLE</span>
                    <span className="opacity-60">2026</span>
                  </div>
                </div>
              </div>
            </div>
          </Paper>

          {/* Footer note */}
          <div className="mt-12 text-center font-hand text-sm text-stone-600 dark:text-stone-400 flex flex-col items-center justify-center gap-1.5">
            <div className="flex items-center gap-2">
              <StarDrawn size={16} color="#eab308" />
              <span>Designed with the Looseleaf hand-drawn notebook design system</span>
              <StarDrawn size={16} color="#eab308" />
            </div>
            <p className="font-mono text-xs opacity-75">
              © 2026 Nishit Rajput · Handcrafted with React 19, TypeScript & Tailwind CSS
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

