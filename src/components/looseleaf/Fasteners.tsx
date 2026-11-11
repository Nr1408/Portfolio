import React from "react";

export interface PaperclipProps extends React.SVGProps<SVGSVGElement> {
  tone?: "steel" | "brass" | "red" | "blue" | "green";
  size?: number;
  angle?: number;
  position?: "top-left" | "top-right" | "top-center" | "free";
}

export function Paperclip({
  tone = "steel",
  size = 46,
  angle = -12,
  position = "free",
  className = "",
  style,
  ...props
}: PaperclipProps) {
  const colors = {
    steel: { stroke: "#64748b", highlight: "#cbd5e1", shadow: "#334155" },
    brass: { stroke: "#d97706", highlight: "#fde68a", shadow: "#92400e" },
    red: { stroke: "#dc2626", highlight: "#fca5a5", shadow: "#991b1b" },
    blue: { stroke: "#2563eb", highlight: "#93c5fd", shadow: "#1e40af" },
    green: { stroke: "#16a34a", highlight: "#86efac", shadow: "#166534" },
  }[tone];

  const posClass =
    position === "top-left"
      ? "absolute -top-5 left-6"
      : position === "top-right"
      ? "absolute -top-5 right-6"
      : position === "top-center"
      ? "absolute -top-5 left-1/2 -translate-x-1/2"
      : "";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none z-20 ${posClass} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.25))",
        ...style,
      }}
    >
      <svg
        width={size * 0.44}
        height={size}
        viewBox="0 0 24 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Outer loop shadow */}
        <path
          d="M6 18 V42 C6 47 18 47 18 42 V8 C18 3 10 3 10 8 V38 C10 41 15 41 15 38 V16"
          stroke={colors.shadow}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Main wire */}
        <path
          d="M6 18 V42 C6 47 18 47 18 42 V8 C18 3 10 3 10 8 V38 C10 41 15 41 15 38 V16"
          stroke={colors.stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Wire highlight */}
        <path
          d="M5.6 20 V41 M17.6 10 V39 M10.4 12 V36"
          stroke={colors.highlight}
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}

export interface PushpinProps extends React.SVGProps<SVGSVGElement> {
  color?: "red" | "yellow" | "blue" | "green" | "black";
  size?: number;
  position?: "top-center" | "top-left" | "top-right" | "free";
  className?: string;
}

export function Pushpin({
  color = "red",
  size = 32,
  position = "free",
  className = "",
  style,
  ...props
}: PushpinProps) {
  const pinColors = {
    red: { head: "#ef4444", dark: "#991b1b", light: "#fca5a5" },
    yellow: { head: "#eab308", dark: "#854d0e", light: "#fef08a" },
    blue: { head: "#3b82f6", dark: "#1e3a8a", light: "#bfdbfe" },
    green: { head: "#22c55e", dark: "#14532d", light: "#bbf7d0" },
    black: { head: "#27272a", dark: "#09090b", light: "#71717a" },
  }[color];

  const posClass =
    position === "top-center"
      ? "absolute -top-3.5 left-1/2 -translate-x-1/2"
      : position === "top-left"
      ? "absolute -top-3.5 left-4"
      : position === "top-right"
      ? "absolute -top-3.5 right-4"
      : "";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none z-20 ${posClass} ${className}`}
      style={{
        filter: "drop-shadow(2px 3px 3px rgba(0,0,0,0.35))",
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Metal pin needle */}
        <path d="M18 18 L26 34" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 18 L26 34" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
        {/* Pin base */}
        <ellipse cx="16" cy="18" rx="8" ry="4" fill={pinColors.dark} />
        {/* Pin cone body */}
        <path d="M11 17 L13 8 L19 8 L21 17 Z" fill={pinColors.head} />
        {/* Pin rim */}
        <ellipse cx="16" cy="8" rx="7" ry="3" fill={pinColors.dark} />
        {/* Pin top dome */}
        <ellipse cx="16" cy="6.5" rx="6" ry="3.5" fill={pinColors.head} />
        {/* Specular highlight */}
        <ellipse cx="14.5" cy="5.8" rx="2.5" ry="1.2" fill={pinColors.light} opacity="0.9" />
      </svg>
    </div>
  );
}

export interface StapleProps {
  position?: "top-left" | "top-right" | "top-center" | "free";
  angle?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Staple({
  position = "free",
  angle = -35,
  className = "",
  style,
}: StapleProps) {
  const posClass =
    position === "top-left"
      ? "absolute top-2 left-2"
      : position === "top-right"
      ? "absolute top-2 right-2"
      : position === "top-center"
      ? "absolute top-2 left-1/2 -translate-x-1/2"
      : "";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none z-20 ${posClass} ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        filter: "drop-shadow(0.5px 1px 1px rgba(0,0,0,0.3))",
        ...style,
      }}
    >
      <div className="w-6 h-1 bg-stone-400 rounded-sm border border-stone-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] flex justify-between px-0.5">
        <div className="w-0.5 h-full bg-stone-700/60" />
        <div className="w-0.5 h-full bg-stone-700/60" />
      </div>
    </div>
  );
}

export interface BinderClipProps {
  size?: number;
  position?: "top-center" | "top-left" | "top-right" | "free";
  className?: string;
}

export function BinderClip({
  size = 36,
  position = "top-center",
  className = "",
}: BinderClipProps) {
  const posClass =
    position === "top-center"
      ? "absolute -top-5 left-1/2 -translate-x-1/2"
      : position === "top-left"
      ? "absolute -top-5 left-8"
      : position === "top-right"
      ? "absolute -top-5 right-8"
      : "";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none z-20 ${posClass} ${className}`}
      style={{
        filter: "drop-shadow(1px 3px 3px rgba(0,0,0,0.4))",
      }}
    >
      <svg width={size} height={size * 0.9} viewBox="0 0 40 36" fill="none">
        {/* Wire loops */}
        <path
          d="M14 18 V6 C14 2 26 2 26 6 V18"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M14 18 V6 C14 2 26 2 26 6 V18"
          stroke="#475569"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Black clamp body */}
        <path
          d="M6 18 H34 L31 34 H9 Z"
          fill="#18181b"
          stroke="#27272a"
          strokeWidth="1.5"
        />
        {/* Clamp highlight edge */}
        <line x1="7" y1="19" x2="33" y2="19" stroke="#52525b" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

