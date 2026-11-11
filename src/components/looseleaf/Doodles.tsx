import React from "react";

export function ArrowCurved({
  className = "",
  color = "#292524",
  width = 64,
  height = 42,
  flip = false,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  flip?: boolean;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M4 14 C 20 4, 48 6, 62 34"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrowhead */}
      <path
        d="M48 30 L 63 35 L 61 21"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowPointDown({
  className = "",
  color = "#292524",
  width = 32,
  height = 48,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M17 4 C 18 16, 16 32, 18 46"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M8 38 L 18 47 L 27 37"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowPointUpLeft({
  className = "",
  color = "#ea580c",
  width = 44,
  height = 36,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none inline-block ${className}`}
    >
      <path
        d="M38 34 C 34 18, 22 12, 10 10"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M22 6 L 8 9 L 13 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowPointDownLeft({
  className = "",
  color = "#d97706",
  width = 44,
  height = 34,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none inline-block ${className}`}
    >
      <path
        d="M40 6 C 36 18, 24 26, 10 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 20 L 8 28 L 16 36"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLoop({
  className = "",
  color = "#292524",
  width = 68,
  height = 52,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M6 34 C 24 10, 48 10, 52 24 C 55 36, 36 44, 30 32 C 24 18, 48 8, 70 24"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M58 20 L 71 25 L 69 13"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarDrawn({
  className = "",
  color = "#eab308",
  size = 28,
  fill = "rgba(254, 240, 138, 0.4)",
}: {
  className?: string;
  color?: string;
  size?: number;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none inline-block ${className}`}
    >
      <path
        d="M16 3 L 20 12 L 30 13 L 22 20 L 25 30 L 16 24 L 7 30 L 10 20 L 2 13 L 12 12 Z"
        fill={fill}
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleDrawn({
  className = "",
  color = "#ca8a04",
  size = 24,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none inline-block ${className}`}
    >
      <path
        d="M14 2 C 14 9, 14 9, 21 14 C 14 14, 14 19, 14 26 C 14 19, 14 14, 7 14 C 14 14, 14 9, 14 2 Z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

export function SquiggleUnderline({
  className = "",
  color = "#ef4444",
  width = 120,
}: {
  className?: string;
  color?: string;
  width?: number | string;
}) {
  return (
    <svg
      width={width}
      height="12"
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none block ${className}`}
    >
      <path
        d="M2 7 Q 12 1, 22 7 T 42 7 T 62 7 T 82 7 T 102 7 T 118 7"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoubleUnderline({
  className = "",
  color = "#2563eb",
  width = 120,
}: {
  className?: string;
  color?: string;
  width?: number | string;
}) {
  return (
    <svg
      width={width}
      height="14"
      viewBox="0 0 120 14"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none block ${className}`}
    >
      <path
        d="M2 4 C 30 2, 70 5, 118 3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 10 C 35 9, 75 11, 114 8"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandCircle({
  className = "",
  color = "#ef4444",
  width = 110,
  height = 50,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none absolute -inset-2 ${className}`}
    >
      <path
        d="M15 32 C 10 16, 35 6, 68 8 C 102 10, 115 24, 110 38 C 104 52, 60 56, 26 50 C 6 46, 8 26, 32 18"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoffeeRing({
  className = "",
  size = 110,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-20 ${className}`}
    >
      <circle
        cx="50"
        cy="50"
        r="42"
        stroke="#78350f"
        strokeWidth="3.5"
        strokeDasharray="40 8 18 5 60 12"
      />
      <circle
        cx="49"
        cy="51"
        r="40"
        stroke="#92400e"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <path
        d="M48 8 C 50 14, 52 20, 51 22"
        stroke="#78350f"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function LightbulbDoodle({
  className = "",
  size = 32,
  color = "#ca8a04",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none inline-block ${className}`}
    >
      {/* Glow rays */}
      <path d="M16 2 V 6 M6 8 L 9 10 M26 8 L 23 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Bulb body */}
      <path
        d="M10 16 C 8 13, 9 8, 16 8 C 23 8, 24 13, 22 16 C 20 18, 19 21, 19 23 H 13 C 13 21, 12 18, 10 16 Z"
        fill="rgba(254, 240, 138, 0.4)"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Filament */}
      <path d="M14 13 L 16 11 L 18 13" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      {/* Screw base */}
      <path d="M13 25 H 19 M14 27 H 18 M15 29 H 17" stroke="#71717a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CodeBracketsDoodle({
  className = "",
  color = "#0284c7",
  size = 28,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size * 1.5}
      height={size}
      viewBox="0 0 42 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none inline-block ${className}`}
    >
      <path
        d="M14 6 L 6 14 L 14 22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 6 L 36 14 L 28 22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="23" y1="5" x2="19" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Highlighter({
  children,
  color = "yellow",
  className = "",
}: {
  children: React.ReactNode;
  color?: "yellow" | "green" | "pink" | "blue" | "orange";
  className?: string;
}) {
  const bg = {
    yellow: "bg-yellow-200/70 dark:bg-yellow-400/35",
    green: "bg-emerald-200/70 dark:bg-emerald-400/35",
    pink: "bg-rose-200/70 dark:bg-rose-400/35",
    blue: "bg-sky-200/70 dark:bg-sky-400/35",
    orange: "bg-orange-200/70 dark:bg-orange-400/35",
  }[color];

  return (
    <mark
      className={`relative inline-block px-1.5 py-0.5 rounded-sm text-inherit font-inherit ${bg} ${className}`}
      style={{
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </mark>
  );
}

