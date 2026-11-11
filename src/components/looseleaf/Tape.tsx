import React from "react";

export type TapeKind =
  | "masking"
  | "washi-stripes"
  | "washi-dots"
  | "washi-grid"
  | "washi-coral"
  | "washi-teal"
  | "washi-yellow"
  | "washi-lavender"
  | "kraft";

export interface TapeProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: TapeKind;
  length?: number; // width in px
  height?: number; // height in px
  angle?: number; // rotation in deg
  position?: "top-left" | "top-right" | "top-center" | "corner-tl" | "corner-tr" | "bottom-left" | "bottom-right" | "free";
  className?: string;
  label?: string;
}

export function Tape({
  kind = "masking",
  length = 90,
  height = 24,
  angle = -3,
  position = "free",
  className = "",
  style,
  label,
  ...props
}: TapeProps) {
  // Preset placement positioning classes
  const posClass =
    position === "top-left"
      ? "absolute -top-3 left-4"
      : position === "top-right"
      ? "absolute -top-3 right-4"
      : position === "top-center"
      ? "absolute -top-3 left-1/2 -translate-x-1/2"
      : position === "corner-tl"
      ? "absolute -top-3 -left-6"
      : position === "corner-tr"
      ? "absolute -top-3 -right-6"
      : position === "bottom-left"
      ? "absolute -bottom-3 left-4"
      : position === "bottom-right"
      ? "absolute -bottom-3 right-4"
      : "";

  // Styling based on tape kind
  const getTapeStyle = () => {
    switch (kind) {
      case "washi-stripes":
        return {
          backgroundColor: "rgba(254, 240, 138, 0.85)", // soft yellow
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(234, 88, 12, 0.3) 6px, rgba(234, 88, 12, 0.3) 12px)",
          borderTop: "1px dashed rgba(202, 138, 4, 0.4)",
          borderBottom: "1px dashed rgba(202, 138, 4, 0.4)",
        };
      case "washi-dots":
        return {
          backgroundColor: "rgba(186, 230, 253, 0.85)", // soft sky blue
          backgroundImage:
            "radial-gradient(rgba(2, 132, 199, 0.4) 1.5px, transparent 1.5px)",
          backgroundSize: "8px 8px",
          borderTop: "1px dashed rgba(2, 132, 199, 0.3)",
          borderBottom: "1px dashed rgba(2, 132, 199, 0.3)",
        };
      case "washi-grid":
        return {
          backgroundColor: "rgba(187, 247, 208, 0.85)", // soft mint green
          backgroundImage:
            "linear-gradient(rgba(22, 163, 74, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 163, 74, 0.25) 1px, transparent 1px)",
          backgroundSize: "7px 7px",
          borderTop: "1px dashed rgba(22, 163, 74, 0.3)",
          borderBottom: "1px dashed rgba(22, 163, 74, 0.3)",
        };
      case "washi-coral":
        return {
          backgroundColor: "rgba(254, 205, 211, 0.88)",
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(225, 29, 72, 0.25) 5px, rgba(225, 29, 72, 0.25) 10px)",
        };
      case "washi-teal":
        return {
          backgroundColor: "rgba(167, 243, 208, 0.88)",
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(13, 148, 136, 0.2) 4px, rgba(13, 148, 136, 0.2) 8px)",
        };
      case "washi-yellow":
        return {
          backgroundColor: "rgba(254, 240, 138, 0.9)",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(202, 138, 4, 0.15) 3px, rgba(202, 138, 4, 0.15) 6px)",
        };
      case "washi-lavender":
        return {
          backgroundColor: "rgba(233, 213, 255, 0.85)",
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(147, 51, 234, 0.25) 6px, rgba(147, 51, 234, 0.25) 12px)",
        };
      case "kraft":
        return {
          backgroundColor: "rgba(217, 182, 140, 0.92)",
          backgroundImage:
            "linear-gradient(rgba(120, 85, 45, 0.08) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
        };
      case "masking":
      default:
        return {
          backgroundColor: "rgba(253, 244, 215, 0.82)", // semi-translucent off-white masking tape
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, rgba(0, 0, 0, 0.04) 100%)",
        };
    }
  };

  return (
    <div
      data-slot="tape"
      aria-hidden="true"
      className={`select-none pointer-events-none z-20 flex items-center justify-center font-hand text-xs font-bold text-stone-700 ${posClass} ${className}`}
      style={{
        width: `${length}px`,
        height: `${height}px`,
        transform: `rotate(${angle}deg)`,
        clipPath:
          "polygon(0% 15%, 4% 0%, 96% 0%, 100% 12%, 98% 85%, 95% 100%, 3% 98%, 0% 88%)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.18), 0 1px 1px rgba(0,0,0,0.12)",
        backdropFilter: "blur(0.5px)",
        ...getTapeStyle(),
        ...style,
      }}
      {...props}
    >
      {label && <span className="opacity-80 px-1 truncate">{label}</span>}
    </div>
  );
}

