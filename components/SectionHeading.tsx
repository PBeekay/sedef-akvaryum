"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  children,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-[640px] px-[6vw] mb-14 ${
        align === "center" ? "mx-auto text-center" : ""
      } ${className}`}
    >
      {eyebrow && (
        <div className="text-[12.5px] tracking-[0.06em] text-ink-faint mb-3.5">
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-[clamp(28px,4vw,44px)] italic font-normal tracking-[-0.01em] text-ink">
        {children}
      </h2>
    </motion.div>
  );
}
