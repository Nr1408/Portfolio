import React from "react";
import { Tape, type TapeKind } from "./Tape";
import { Pushpin, Paperclip, Staple } from "./Fasteners";

export type StickyColor =
  | "yellow"
  | "pink"
  | "cyan"
  | "green"
  | "orange"
  | "lavender";

export interface StickyNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: StickyColor;
  tilt?: number; // deg
  fastener?: "pushpin" | "tape" | "paperclip" | "staple" | "none";
  tapeKind?: TapeKind;
  fastenerColor?: "red" | "blue" | "green" | "steel" | "brass";
  className?: string;
  children?: React.ReactNode;
}

export function StickyNote({
  color = "yellow",
  tilt = -1.5,
  fastener = "tape",
  tapeKind = "masking",
  fastenerColor = "steel",
  className = "",
  style,
  children,
  ...props
}: StickyNoteProps) {
  const colorStyles = {
    yellow: {
      bg: "#fef08a",
      darkBg: "#854d0e",
      text: "#1c1917",
      border: "#ca8a04",
      highlight: "#fef9c3",
    },
    pink: {
      bg: "#fbcfe8",
      darkBg: "#831843",
      text: "#1c1917",
      border: "#db2777",
      highlight: "#fdf2f8",
    },
    cyan: {
      bg: "#bae6fd",
      darkBg: "#0c4a6e",
      text: "#1c1917",
      border: "#0284c7",
      highlight: "#f0f9ff",
    },
    green: {
      bg: "#bbf7d0",
      darkBg: "#14532d",
      text: "#1c1917",
      border: "#16a34a",
      highlight: "#f0fdf4",
    },
    orange: {
      bg: "#fed7aa",
      darkBg: "#7c2d12",
      text: "#1c1917",
      border: "#ea580c",
      highlight: "#fff7ed",
    },
    lavender: {
      bg: "#e9d5ff",
      darkBg: "#581c87",
      text: "#1c1917",
      border: "#9333ea",
      highlight: "#faf5ff",
    },
  }[color];

  return (
    <div
      data-slot="sticky-note"
      className={`relative isolate p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:shadow-[5px_6px_0px_rgba(30,27,24,0.9)] ${className}`}
      style={{
        backgroundColor: colorStyles.bg,
        color: colorStyles.text,
        transform: `rotate(${tilt}deg)`,
        border: `2px solid #23201d`,
        borderRadius: "2px 2px 18px 2px",
        boxShadow: "3px 3px 0px rgba(35,32,29,0.85)",
        ...style,
      }}
      {...props}
    >
      {/* Top sticky adhesive strip shade */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-4 bg-black/5 rounded-t-sm pointer-events-none"
      />

      {/* Fasteners */}
      {fastener === "tape" && (
        <Tape
          kind={tapeKind}
          position="top-center"
          length={65}
          height={18}
          angle={tilt > 0 ? -1 : 1.5}
        />
      )}
      {fastener === "pushpin" && (
        <Pushpin
          position="top-center"
          color={fastenerColor === "blue" ? "blue" : "red"}
          size={28}
        />
      )}
      {fastener === "paperclip" && (
        <Paperclip
          position="top-right"
          tone={fastenerColor === "brass" ? "brass" : "steel"}
          size={40}
        />
      )}
      {fastener === "staple" && <Staple position="top-left" angle={-25} />}

      {/* Bottom corner paper curl effect */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl from-black/20 via-black/5 to-transparent pointer-events-none"
        style={{
          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
        }}
      />

      {children}
    </div>
  );
}

