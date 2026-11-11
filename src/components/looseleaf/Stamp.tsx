import React from "react";

export interface StampProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  subtext?: string;
  tone?: "crimson" | "emerald" | "navy" | "amber" | "charcoal" | "violet";
  angle?: number;
  size?: "sm" | "default" | "lg";
  shape?: "rect" | "pill" | "circle";
  className?: string;
}

export function Stamp({
  text = "VERIFIED",
  subtext,
  tone = "crimson",
  angle = -7,
  size = "default",
  shape = "rect",
  className = "",
  style,
  ...props
}: StampProps) {
  const toneStyles = {
    crimson: {
      color: "#be123c",
      border: "rgba(190, 18, 60, 0.85)",
      bg: "rgba(254, 226, 226, 0.15)",
    },
    emerald: {
      color: "#047857",
      border: "rgba(4, 120, 87, 0.85)",
      bg: "rgba(209, 250, 229, 0.15)",
    },
    navy: {
      color: "#1d4ed8",
      border: "rgba(29, 78, 216, 0.85)",
      bg: "rgba(219, 234, 254, 0.15)",
    },
    amber: {
      color: "#b45309",
      border: "rgba(180, 83, 9, 0.85)",
      bg: "rgba(254, 243, 199, 0.15)",
    },
    charcoal: {
      color: "#292524",
      border: "rgba(41, 37, 36, 0.85)",
      bg: "rgba(231, 229, 228, 0.15)",
    },
    violet: {
      color: "#6d28d9",
      border: "rgba(109, 40, 217, 0.85)",
      bg: "rgba(237, 233, 254, 0.15)",
    },
  }[tone];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] tracking-widest",
    default: "px-3 py-1 text-xs sm:text-sm tracking-wider font-extrabold",
    lg: "px-4 py-1.5 text-base sm:text-lg tracking-widest font-black",
  }[size];

  const shapeRadius =
    shape === "circle"
      ? "rounded-full aspect-square flex flex-col items-center justify-center p-3"
      : shape === "pill"
      ? "rounded-full"
      : "rounded-md";

  return (
    <div
      aria-hidden="true"
      data-slot="stamp"
      className={`inline-block select-none font-hand uppercase border-2 sm:border-[2.5px] border-dashed text-center transition-transform hover:scale-105 ${shapeRadius} ${sizeClasses} ${className}`}
      style={{
        color: toneStyles.color,
        borderColor: toneStyles.border,
        backgroundColor: toneStyles.bg,
        transform: `rotate(${angle}deg)`,
        boxShadow: `inset 0 0 0 1px ${toneStyles.border}`,
        opacity: 0.92,
        ...style,
      }}
      {...props}
    >
      <div className="leading-none">{text}</div>
      {subtext && (
        <div className="text-[9px] sm:text-[10px] tracking-normal font-sans opacity-85 mt-0.5">
          {subtext}
        </div>
      )}
    </div>
  );
}

