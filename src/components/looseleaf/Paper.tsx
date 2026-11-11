import React from "react";
import { Tape, type TapeKind } from "./Tape";
import { Paperclip, Pushpin, Staple, BinderClip } from "./Fasteners";

export type PaperStock =
  | "lined"
  | "grid"
  | "dots"
  | "plain"
  | "kraft"
  | "chalkboard";

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  stock?: PaperStock;
  tilt?: number; // degrees of tilt, e.g. -1, 1, 0
  tape?: "none" | "corner-tl" | "corner-tr" | "both" | "top-center";
  tapeKind?: TapeKind;
  fastener?: "none" | "paperclip" | "pushpin" | "staple" | "binder-clip";
  fastenerColor?: "red" | "steel" | "brass" | "blue" | "green";
  spiral?: "none" | "left" | "top";
  shadow?: "none" | "hand" | "soft" | "deep";
  className?: string;
  children?: React.ReactNode;
}

export function Paper({
  stock = "lined",
  tilt = 0,
  tape = "none",
  tapeKind = "masking",
  fastener = "none",
  fastenerColor = "steel",
  spiral = "none",
  shadow = "hand",
  className = "",
  style,
  children,
  ...props
}: PaperProps) {
  // Stock background styles
  const getStockClasses = () => {
    switch (stock) {
      case "lined":
        return "bg-paper-lined text-ink border-hand";
      case "grid":
        return "bg-paper-grid text-ink border-hand";
      case "dots":
        return "bg-paper-dots text-ink border-hand";
      case "kraft":
        return "bg-paper-kraft text-stone-900 border-hand";
      case "chalkboard":
        return "bg-paper-chalkboard text-stone-100 border-chalk";
      case "plain":
      default:
        return "bg-paper-plain text-ink border-hand";
    }
  };

  const shadowClass =
    shadow === "hand"
      ? "shadow-hand hover:shadow-hand-lg transition-shadow duration-200"
      : shadow === "deep"
      ? "shadow-hand-xl"
      : shadow === "soft"
      ? "shadow-md hover:shadow-lg transition-shadow duration-200"
      : "";

  return (
    <div
      data-slot="paper"
      data-stock={stock}
      className={`relative isolate rounded-sm ${getStockClasses()} ${shadowClass} ${className}`}
      style={{
        transform: tilt !== 0 ? `rotate(${tilt}deg)` : undefined,
        ...style,
      }}
      {...props}
    >
      {/* Tape placements */}
      {tape === "corner-tl" && (
        <Tape kind={tapeKind} position="corner-tl" angle={-38} />
      )}
      {tape === "corner-tr" && (
        <Tape kind={tapeKind} position="corner-tr" angle={36} />
      )}
      {tape === "top-center" && (
        <Tape kind={tapeKind} position="top-center" angle={-2} />
      )}
      {tape === "both" && (
        <>
          <Tape kind={tapeKind} position="corner-tl" angle={-38} />
          <Tape kind={tapeKind} position="corner-tr" angle={36} />
        </>
      )}

      {/* Fasteners */}
      {fastener === "paperclip" && (
        <Paperclip
          position="top-right"
          tone={fastenerColor === "steel" ? "steel" : fastenerColor}
        />
      )}
      {fastener === "pushpin" && (
        <Pushpin
          position="top-center"
          color={fastenerColor === "red" ? "red" : "blue"}
        />
      )}
      {fastener === "staple" && <Staple position="top-left" />}
      {fastener === "binder-clip" && <BinderClip position="top-center" />}

      {/* Spiral wire / binder holes */}
      {spiral === "left" && (
        <div
          aria-hidden="true"
          className="absolute left-2.5 top-0 bottom-0 flex flex-col justify-around pointer-events-none select-none z-10"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full bg-stone-300 dark:bg-stone-700 border border-stone-400 dark:border-stone-600 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]"
            />
          ))}
        </div>
      )}

      {spiral === "top" && (
        <div
          aria-hidden="true"
          className="absolute top-2.5 left-0 right-0 flex justify-around pointer-events-none select-none z-10"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 border border-stone-400 dark:border-stone-600 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]"
            />
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

