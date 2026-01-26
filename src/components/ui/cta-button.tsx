import React from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "large";
  onClick?: () => void;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "default",
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "font-bold !text-white transition-none duration-0 focus:outline-none";

    const variants = {
      primary: "bg-[#940909] hover:bg-[#7b0707]",
      secondary: "bg-[#B90021] hover:bg-[#940909]",
    };

    const sizes = {
      default: "py-4 px-8 text-lg",
      large: "py-6 px-12 text-xl",
    };

    const roundedClass = "rounded-sm"; // Minimal rounded corners as requested

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          roundedClass,
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";

export { CTAButton };
