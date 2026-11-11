import React, { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";
import { LooseleafButton } from "./LooseleafButton";

export type PaperTheme = "lined" | "grid" | "kraft" | "chalkboard";

interface NotebookNavProps {
  currentTheme: PaperTheme;
  onThemeChange: (theme: PaperTheme) => void;
  resumeUrl: string;
}

export function NotebookNav({
  currentTheme,
  onThemeChange,
  resumeUrl,
}: NotebookNavProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { id: "about", label: "About", color: "#fef08a" },
    { id: "skills", label: "Skills", color: "#bbf7d0" },
    { id: "experience", label: "Experience", color: "#bae6fd" },
    { id: "projects", label: "Projects", color: "#fed7aa" },
    { id: "education", label: "Education", color: "#e9d5ff" },
    { id: "achievements", label: "Wins", color: "#fef08a" },
    { id: "contact", label: "Contact", color: "#fbcfe8" },
  ];

  const themes: { id: PaperTheme; label: string; icon: string }[] = [
    { id: "lined", label: "Lined", icon: "📝" },
    { id: "grid", label: "Grid", icon: "📐" },
    { id: "kraft", label: "Kraft", icon: "📦" },
    { id: "chalkboard", label: "Chalk", icon: "🌙" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full max-w-full backdrop-blur-md bg-[#fbf9f4]/95 dark:bg-[#181615]/95 border-b-2 border-[#1c1917] dark:border-stone-700 shadow-[0_3px_0px_rgba(28,25,23,0.15)] transition-colors duration-200 overflow-x-clip">
      {/* Top seamless repeating notebook spiral binding wire */}
      <div className="h-2.5 w-full bg-stone-200 dark:bg-stone-800 border-b border-stone-300 dark:border-stone-700 overflow-hidden relative">
        <div
          className="w-full h-full opacity-65"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, #44403c 0px, #44403c 2.5px, #d6d3d1 2.5px, #d6d3d1 4.5px, transparent 4.5px, transparent 18px)",
            backgroundSize: "18px 100%",
          }}
        />
      </div>

      {/* Main Full-Width Header Bar */}
      <div className="w-full max-w-full px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 box-border">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#hero"
            className="flex items-center gap-2 group font-hand text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-400 transition-colors shrink-0"
          >
            <span className="inline-block transform -rotate-3 group-hover:rotate-0 transition-transform bg-[#fef08a] dark:bg-amber-400 text-stone-950 px-2 sm:px-2.5 py-0.5 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] font-bold text-base sm:text-lg">
              NR
            </span>
            <div className="flex flex-col">
              <span className="tracking-tight leading-none whitespace-nowrap">
                Nishit Rajput
              </span>
              <span className="hidden md:inline-block text-[11px] font-mono text-stone-500 dark:text-stone-400 font-normal mt-0.5 leading-none whitespace-nowrap">
                CS Student · Full-Stack Dev
              </span>
            </div>
          </a>
        </div>

        {/* Center: Notebook Index Divider Tabs (Responsive and non-overflowing) */}
        <nav
          aria-label="Notebook Sections"
          className="hidden lg:flex items-end justify-center gap-1 xl:gap-1.5 2xl:gap-2 font-hand min-w-0 shrink flex-1 h-full pt-2"
        >
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`relative px-2 xl:px-3 py-1 text-xs xl:text-sm font-bold tracking-wide transition-all duration-150 border-2 border-b-0 border-[#1c1917] dark:border-stone-600 rounded-t-md transform origin-bottom hover:-translate-y-1 shrink-0 ${
                  isActive
                    ? "-translate-y-1.5 shadow-[2px_-2px_0px_#1c1917] z-10"
                    : "opacity-85 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: sec.color,
                  color: "#1c1917",
                }}
              >
                {sec.label}
                {isActive && (
                  <span className="absolute -top-1.5 right-1 w-2 h-2 rounded-full bg-red-600 border border-white dark:border-stone-900 animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Theme Switcher + Resume Button + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0">
          {/* Paper Theme Selector */}
          <div className="flex items-center bg-stone-200/90 dark:bg-stone-800 p-0.5 sm:p-1 rounded-md border-2 border-stone-800 dark:border-stone-600 text-xs font-hand shadow-[1.5px_1.5px_0px_#1c1917] dark:shadow-[1.5px_1.5px_0px_#444] shrink-0">
            {themes.map((t) => {
              const isSelected = currentTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  title={`Switch to ${t.label} paper`}
                  className={`px-1.5 sm:px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                    isSelected
                      ? "bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-100 shadow-sm font-bold scale-105"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  <span className="text-sm sm:text-xs">{t.icon}</span>
                  {/* Show text label only on active theme or very wide screens to prevent overflow */}
                  {isSelected && (
                    <span className="hidden xl:inline text-xs font-hand">
                      {t.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Resume Download Button (Guaranteed visible and shrink-proof) */}
          <div className="shrink-0 flex items-center">
            <LooseleafButton
              variant="marker"
              size="sm"
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 whitespace-nowrap"
            >
              <Download size={14} />
              <span>Resume</span>
            </LooseleafButton>
          </div>

          {/* Mobile Menu Toggle Button (Visible on screens < lg) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1.5 rounded-md border-2 border-stone-900 dark:border-stone-200 bg-[#fef08a] dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-hand text-xs font-bold shadow-[1.5px_1.5px_0px_#1c1917] flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 shrink-0"
            aria-label="Toggle Navigation Index"
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
            <span className="hidden xs:inline">{menuOpen ? "Close" : "Index"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Visible on smaller viewports when opened) */}
      {menuOpen && (
        <div className="lg:hidden px-4 py-4 bg-[#fbf9f4] dark:bg-[#181615] border-t-2 border-stone-900 dark:border-stone-700 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-dashed border-stone-400 pb-2">
            <span className="font-hand font-bold text-sm text-stone-700 dark:text-stone-300">
              📌 Notebook Sections
            </span>
            <span className="font-mono text-xs text-stone-500">
              Select to Jump
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-hand">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={() => setMenuOpen(false)}
                className={`p-2.5 text-center font-bold text-sm rounded border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] transition-transform active:scale-95 ${
                  activeSection === sec.id ? "ring-2 ring-red-500 ring-offset-1" : ""
                }`}
                style={{ backgroundColor: sec.color, color: "#1c1917" }}
              >
                {sec.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-dashed border-stone-400 flex flex-col gap-2">
            <LooseleafButton
              variant="marker"
              size="default"
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center"
            >
              <Download size={16} />
              Download Full Resume (PDF)
            </LooseleafButton>
          </div>
        </div>
      )}
    </header>
  );
}
