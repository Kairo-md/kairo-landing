import React, { forwardRef } from "react";

interface KairoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

export const KairoButton = forwardRef<HTMLButtonElement, KairoButtonProps>(
  ({ children, className = '', variant = 'default', style, ...props }, ref) => {
    
    let variantStyles = "bg-(--hover) text-(--text-primary) hover:bg-(--active) border-(--border-strong)";
    
    if (variant === 'primary') {
      variantStyles = "bg-accent text-white hover:opacity-90 border-transparent shadow-xs";
    } else if (variant === 'secondary') {
      variantStyles = "bg-accent text-white hover:opacity-90 border-transparent shadow-xs";
    } else if (variant === 'outline') {
      variantStyles = "bg-transparent text-(--text-primary) hover:bg-(--hover) border-(--border-strong)";
    }

    const hasTextSize = /\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)\b/.test(className);
    const hasFontWeight = /\bfont-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/.test(className);

    const defaultTextSize = hasTextSize ? "" : "text-sm";
    const defaultFontWeight = hasFontWeight ? "" : "font-medium";

    return (
      <button
        ref={ref}
        style={style}
        {...props}
        className={`transition-all duration-100 ease-in-out active:translate-y-px border rounded-sm ${defaultFontWeight} px-4 py-2 ${defaultTextSize} inline-flex items-center justify-center gap-2 cursor-pointer shadow-none ${variantStyles} ${className}`}
      >
        {children}
      </button>
    );
  }
);

KairoButton.displayName = "KairoButton";
