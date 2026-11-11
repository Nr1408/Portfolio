import React from "react";

export type ButtonVariant =
  | "marker"
  | "highlighter"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive";

export type ButtonSize = "sm" | "default" | "lg" | "icon";

export interface LooseleafButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  highlighterColor?: "yellow" | "coral" | "cyan" | "green";
  asChild?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function LooseleafButton({
  variant = "marker",
  size = "default",
  highlighterColor = "yellow",
  className = "",
  children,
  href,
  ...props
}: LooseleafButtonProps) {
  // Variant styles
  const getVariantClasses = () => {
    switch (variant) {
      case "highlighter": {
        const hlBg =
          highlighterColor === "yellow"
            ? "bg-[#fef08a] text-stone-900 border-[#ca8a04]"
            : highlighterColor === "coral"
            ? "bg-[#fed7aa] text-stone-900 border-[#ea580c]"
            : highlighterColor === "green"
            ? "bg-[#bbf7d0] text-stone-900 border-[#16a34a]"
            : "bg-[#bae6fd] text-stone-900 border-[#0284c7]";
        return `${hlBg} border-2 shadow-[2.5px_2.5px_0px_#1c1917] hover:shadow-[4px_4px_0px_#1c1917] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`;
      }
      case "secondary":
        return "bg-[#fcfbf9] text-stone-900 border-2 border-[#1c1917] shadow-[2.5px_2.5px_0px_#1c1917] hover:bg-stone-100 hover:shadow-[4px_4px_0px_#1c1917] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";
      case "outline":
        return "bg-transparent text-stone-900 dark:text-stone-100 border-2 border-[#1c1917] dark:border-stone-300 shadow-[2.5px_2.5px_0px_#1c1917] dark:shadow-[2.5px_2.5px_0px_#e5e5e5] hover:bg-stone-500/10 hover:shadow-[4px_4px_0px_#1c1917] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";
      case "ghost":
        return "bg-transparent text-stone-800 dark:text-stone-200 border-2 border-transparent hover:border-[#1c1917]/30 hover:bg-black/5 active:bg-black/10";
      case "destructive":
        return "bg-[#ef4444] text-white border-2 border-[#991b1b] shadow-[2.5px_2.5px_0px_#1c1917] hover:bg-[#dc2626] hover:shadow-[4px_4px_0px_#1c1917] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";
      case "link":
        return "bg-transparent text-[#1d4ed8] dark:text-[#60a5fa] hover:underline underline-offset-4 font-bold border-none shadow-none";
      case "marker":
      default:
        return "bg-[#1f1d1a] text-white dark:bg-[#f5f5f4] dark:text-stone-900 border-2 border-[#1f1d1a] dark:border-stone-900 shadow-[3px_3px_0px_#ca8a04] hover:shadow-[5px_5px_0px_#ca8a04] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";
    }
  };

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 px-3 text-xs gap-1.5";
      case "lg":
        return "h-11 px-6 text-base gap-2.5";
      case "icon":
        return "h-9 w-9 p-0 justify-center";
      case "default":
      default:
        return "h-9.5 px-4 text-sm gap-2";
    }
  };

  // Hand-drawn organic border shape
  const handBorderRadius =
    variant === "link"
      ? ""
      : "rounded-[255px_15px_225px_15px/15px_225px_15px_255px]";

  const baseClasses = `relative inline-flex items-center justify-center font-hand font-bold tracking-wide select-none cursor-pointer transition-all duration-150 ${handBorderRadius} ${getSizeClasses()} ${getVariantClasses()} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClasses} {...(props as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}

