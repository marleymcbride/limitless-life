"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ApplyNowButtonProps {
  className?: string;
  text?: string;
  fullWidth?: boolean;
}

export default function ApplyNowButton({
  className,
  text = "JOIN THE LIMITLESS PROTOCOL",
  fullWidth = false,
}: ApplyNowButtonProps) {
  return (
    <div className={`${fullWidth ? "w-full" : ""} flex justify-center my-6`}>
      <Button
        className={cn(
          "bg-[#940909] hover:bg-[#7d0808] text-white font-bold py-4 px-8 sm:px-12 rounded-md text-lg sm:text-xl uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
          className
        )}
        asChild
      >
        <a href="#application">{text}</a>
      </Button>
    </div>
  );
}
