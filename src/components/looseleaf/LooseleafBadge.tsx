import React from "react";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "highlighter"
  | "outline"
  | "stamp"
  | "destructive";

export type BadgeTone = "yellow" | "coral" | "cyan" | "green" | "purple";

export interface LooseleafBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: "sm" | "default" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function LooseleafBadge({
  variant = "default",
  tone = "yellow",
  size = "default",
  className = "",
  children,
  ...props
}: LooseleafBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "highlighter": {
        const toneBg = {
          yellow: "bg-[#fef08a] text-stone-900 border-[#ca8a04]",
          coral: "bg-[#fed7aa] text-stone-900 border-[#ea580c]",
          cyan: "bg-[#bae6fd] text-stone-900 border-[#0284c7]",
          green: "bg-[#bbf7d0] text-stone-900 border-[#16a34a]",
          purple: "bg-[#e9d5ff] text-stone-900 border-[#9333ea]",
        }[tone];
        return `${toneBg} border font-bold`;
      }
      case "secondary":
        return "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700";
      case "outline":
        return "bg-transparent text-stone-800 dark:text-stone-200 border-1.5 border-[#1c1917] dark:border-stone-300 shadow-[1.5px_1.5px_0px_#1c1917] dark:shadow-[1.5px_1.5px_0px_#d6d3d1]";
      case "stamp":
        return "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-dashed border-rose-500 uppercase tracking-wider font-extrabold";
      case "destructive":
        return "bg-red-500 text-white border border-red-700";
      case "default":
      default:
        return "bg-[#1f1d1a] text-white dark:bg-stone-100 dark:text-stone-900 border border-[#1f1d1a] shadow-[1px_1px_0px_#78716c]";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-5 px-2 text-[11px]";
      case "lg":
        return "h-7 px-3.5 text-sm";
      case "default":
      default:
        return "h-6 px-2.5 text-xs";
    }
  };

  return (
    <span
      data-slot="badge"
      className={`relative inline-flex items-center justify-center font-hand select-none rounded-[255px_15px_225px_15px/15px_225px_15px_255px] tracking-wide gap-1 whitespace-nowrap transition-transform hover:scale-105 ${getSizeStyles()} ${getVariantStyles()} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

