import React from "react";
import { Tape, type TapeKind } from "./Tape";
import { Paperclip, Pushpin, Staple } from "./Fasteners";
import { SquiggleUnderline } from "./Doodles";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  stock?: "paper" | "lined" | "grid" | "kraft" | "index-card";
  tape?: "none" | "corner-tl" | "corner-tr" | "both" | "top-center";
  tapeKind?: TapeKind;
  fastener?: "none" | "paperclip" | "pushpin" | "staple";
  fastenerTone?: "steel" | "brass" | "red" | "blue";
  tilt?: number; // deg
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  stock = "paper",
  tape = "none",
  tapeKind = "masking",
  fastener = "none",
  fastenerTone = "steel",
  tilt = 0,
  className = "",
  style,
  children,
  ...props
}: CardProps) {
  // Stock background classes
  const stockClass =
    stock === "lined"
      ? "bg-paper-lined"
      : stock === "grid"
      ? "bg-paper-grid"
      : stock === "kraft"
      ? "bg-[#e8dcce] text-stone-900 border-[#443e39]"
      : stock === "index-card"
      ? "bg-[#fffefb] border-t-4 border-t-red-400"
      : "bg-[#fffefc] dark:bg-[#1c1917] text-stone-900 dark:text-stone-100";

  return (
    <div
      data-slot="card"
      className={`relative isolate flex flex-col rounded-[255px_20px_225px_20px/20px_225px_20px_255px] border-2 border-[#1c1917] dark:border-stone-700 shadow-[3.5px_4px_0px_#1c1917] dark:shadow-[3.5px_4px_0px_#292524] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5.5px_6px_0px_#1c1917] dark:hover:shadow-[5.5px_6px_0px_#292524] ${stockClass} ${className}`}
      style={{
        transform: tilt !== 0 ? `rotate(${tilt}deg)` : undefined,
        ...style,
      }}
      {...props}
    >
      {/* Tape Placements */}
      {tape === "corner-tl" && (
        <Tape kind={tapeKind} position="corner-tl" angle={-38} />
      )}
      {tape === "corner-tr" && (
        <Tape kind={tapeKind} position="corner-tr" angle={36} />
      )}
      {tape === "top-center" && (
        <Tape kind={tapeKind} position="top-center" angle={-1.5} />
      )}
      {tape === "both" && (
        <>
          <Tape kind={tapeKind} position="corner-tl" angle={-38} />
          <Tape kind={tapeKind} position="corner-tr" angle={36} />
        </>
      )}

      {/* Fasteners */}
      {fastener === "paperclip" && (
        <Paperclip position="top-right" tone={fastenerTone} />
      )}
      {fastener === "pushpin" && (
        <Pushpin position="top-center" color="red" />
      )}
      {fastener === "staple" && <Staple position="top-left" />}

      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  rule = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { rule?: boolean }) {
  return (
    <div
      data-slot="card-header"
      className={`relative flex flex-col gap-1.5 p-5 sm:p-6 ${
        rule ? "border-b border-dashed border-stone-300 dark:border-stone-700" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={`font-hand text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="card-description"
      className={`font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-content"
      className={`p-5 sm:p-6 pt-0 font-sans text-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  rule = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { rule?: boolean }) {
  return (
    <div
      data-slot="card-footer"
      className={`flex items-center gap-3 p-5 sm:p-6 pt-0 ${
        rule ? "border-t border-dashed border-stone-300 dark:border-stone-700 pt-4" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardDrawnRule({
  style = "pencil",
  className = "",
}: {
  style?: "pencil" | "dashed" | "wavy";
  className?: string;
}) {
  if (style === "wavy") {
    return (
      <div className={`py-1 px-4 ${className}`}>
        <SquiggleUnderline width="100%" color="#78716c" />
      </div>
    );
  }

  if (style === "dashed") {
    return (
      <div
        className={`border-b-2 border-dashed border-stone-300 dark:border-stone-700 my-2 mx-4 ${className}`}
      />
    );
  }

  return (
    <div
      className={`border-b border-stone-300 dark:border-stone-700 my-2 mx-4 ${className}`}
    />
  );
}

