"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WORLDS } from "@/data";
import { World } from "@/types";

interface WorldsProps {
  id: string;
}

interface WorldCardProps {
  world: World;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function WorldCard({ world, index, total, scrollYProgress }: WorldCardProps) {
  const isReverse = index % 2 === 1;
  const isLast = index === total - 1;

  // Segment of scroll where this card gets covered by the next one
  const startExit = index / (total - 1);
  const endExit = (index + 1) / (total - 1);

  // Hardware-accelerated transforms
  const scale = useTransform(
    scrollYProgress,
    isLast
      ? [0, 1]
      : [Math.max(0, startExit - 0.001), startExit, endExit, 1],
    isLast
      ? [1, 1]
      : [1, 1, 0.94, 0.94]
  );

  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [0, 1]
      : [Math.max(0, startExit - 0.001), startExit, endExit, 1],
    isLast
      ? [1, 1]
      : [1, 1, 0.4, 0.4]
  );

  const yOffset = useTransform(
    scrollYProgress,
    isLast
      ? [0, 1]
      : [Math.max(0, startExit - 0.001), startExit, endExit, 1],
    isLast
      ? [0, 0]
      : [0, 0, -20, -20]
  );

  return (
    <div
      id={`world-${world.id}`}
      className="sticky top-0 h-[100svh] w-full flex items-center justify-center overflow-hidden"
      style={{
        zIndex: 10 + index,
      }}
    >
      <motion.article
        style={{
          scale,
          opacity,
          y: yOffset,
          willChange: "transform, opacity",
          background: `linear-gradient(160deg, hsl(${world.hue} / 50%) 0%, var(--bg) 75%)`,
        }}
        className={`relative w-full h-full bg-bg flex flex-col md:flex-row transform-gpu ${
          isReverse ? "md:flex-row-reverse" : ""
        } ${
          index > 0
            ? "border-t border-line-strong shadow-[0_-12px_30px_rgba(0,0,0,0.5)]"
            : ""
        }`}
      >
        {/* Visual Panel */}
        <div
          className={`flex-1 relative min-h-[38svh] md:min-h-full border-b md:border-b-0 border-line ${
            isReverse ? "md:border-l md:border-line" : "md:border-r md:border-line"
          } overflow-hidden`}
        >
          <div
            className="absolute inset-0 flex items-end p-7 md:p-10"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, hsl(${world.hue} / 80%) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, ${world.accent}33, transparent 60%)`,
            }}
          >
            <span
              className="font-serif italic text-xl md:text-3xl tracking-wide block"
              style={{ color: world.accent }}
            >
              {world.tag}
            </span>
          </div>
        </div>

        {/* Copy & Interaction Panel */}
        <div className="flex-1 px-[6vw] py-8 md:py-0 flex flex-col justify-center gap-5 md:gap-7 bg-bg/95">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: world.accent }}
            />
            <span className="text-xs font-mono uppercase tracking-widest text-ink-dim">
              {world.tag} Koleksiyonu
            </span>
          </div>

          <h3 className="font-serif italic font-normal text-[clamp(26px,3.8vw,48px)] max-w-[500px] leading-[1.08] text-ink">
            {world.headline}
          </h3>

          <p className="text-ink-dim max-w-[440px] text-[14.5px] md:text-[15.5px] leading-[1.65]">
            {world.body}
          </p>

          <ul className="flex flex-wrap gap-x-4 gap-y-2 max-w-[480px]">
            {world.items.map((item) => (
              <li
                key={item}
                className="text-[12px] md:text-[13px] text-ink-faint border-b border-line pb-0.5 tracking-wide"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <button
              className="group inline-flex items-center gap-2.5 text-[14px] text-ink border-b border-line-strong pb-1 hover:gap-4 transition-all duration-300 cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = world.accent;
                e.currentTarget.style.borderColor = world.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <span>{world.cta}</span>
              <ArrowRight
                size={15}
                strokeWidth={1.25}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Worlds({ id }: WorldsProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Measure scroll through the entire sequence of stacked cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative border-t border-line"
    >
      {/* Stacked Cards Sequence */}
      {WORLDS.map((world, i) => (
        <WorldCard
          key={world.id}
          world={world}
          index={i}
          total={WORLDS.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  );
}
