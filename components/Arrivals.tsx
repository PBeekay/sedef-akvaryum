"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ARRIVALS } from "@/data";
import { Arrival } from "@/types";
import { SectionHeading } from "./SectionHeading";

export function Arrivals() {
  // Limit to max 10 items, shuffled randomly
  const [items, setItems] = useState<Arrival[]>(() => ARRIVALS.slice(0, 10));

  useEffect(() => {
    // Fisher-Yates random shuffle on mount so new items are placed randomly
    const shuffled = [...ARRIVALS]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 10);

    setItems(shuffled);
  }, []);

  // Duplicate the 10 items so the infinite ticker loops seamlessly from 0% to -50%
  const tickerItems = useMemo(() => [...items, ...items], [items]);

  return (
    <section className="py-[10vw] border-b border-line overflow-hidden">
      <SectionHeading eyebrow="Envanter">Şu An Sedef&apos;te</SectionHeading>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full group"
      >
        {/* Left & Right ambient fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-bg via-bg/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-bg via-bg/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous moving ticker container (Zero scrollbar, continuous left drift, pause on hover) */}
        <div className="flex overflow-hidden select-none">
          <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused] py-2">
            {tickerItems.map((arrival, i) => (
              <div
                key={`${arrival.name}-${i}`}
                className="w-[240px] md:w-[260px] shrink-0 border border-line bg-bg transition-all duration-300 hover:border-accent/50 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] group/card cursor-pointer flex flex-col"
              >
                {/* Visual Swatch */}
                <div
                  className="h-[180px] md:h-[200px] border-b border-line relative overflow-hidden"
                  style={{
                    background: `linear-gradient(155deg, ${arrival.accent}2a, var(--bg-soft) 85%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-40 group-hover/card:opacity-70 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${arrival.accent}44, transparent 70%)`,
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-line-strong bg-bg/70 text-ink-dim">
                      {arrival.cat}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="p-4 md:p-5 flex flex-col gap-1.5 bg-bg">
                  <span className="font-serif text-[16px] text-ink group-hover/card:text-white transition-colors truncate">
                    {arrival.name}
                  </span>
                  <span
                    className="text-[11.5px] tracking-[0.05em] font-medium"
                    style={{ color: arrival.accent }}
                  >
                    {arrival.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
