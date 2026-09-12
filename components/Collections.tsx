"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/data";
import { SectionHeading } from "./SectionHeading";

interface CollectionsProps {
  id: string;
}

export function Collections({ id }: CollectionsProps) {
  const [activeId, setActiveId] = useState(COLLECTIONS[0].id);
  const current =
    COLLECTIONS.find((c) => c.id === activeId) || COLLECTIONS[0];

  return (
    <section id={id} className="py-[10vw] border-b border-line">
      <SectionHeading eyebrow="Kürasyon">Dünyanı Seç</SectionHeading>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-2.5 px-[6vw] mb-10"
      >
        {COLLECTIONS.map((c) => {
          const isActive = activeId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className="px-[18px] py-[9px] text-[13px] border transition-all duration-250 cursor-pointer"
              style={{
                borderColor: isActive ? c.accent : "var(--line-strong)",
                color: isActive ? c.accent : "var(--ink-dim)",
                backgroundColor: isActive ? `${c.accent}12` : "transparent",
              }}
            >
              {c.name}
            </button>
          );
        })}
      </motion.div>

      {/* Active Collection Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row border-t border-line"
        >
          {/* Visual element */}
          <div
            className="flex-1 min-h-[40vh] md:min-h-[48vh] border-b md:border-b-0 md:border-r border-line relative"
            style={{
              background: `radial-gradient(ellipse at 60% 40%, color-mix(in srgb, ${current.accent} 24%, transparent), var(--bg-soft) 65%)`,
            }}
          />

          {/* Details */}
          <div className="flex-1 p-[6vw] flex flex-col gap-[18px] justify-center">
            <h3 className="font-serif italic text-[clamp(26px,3vw,36px)] text-ink">
              {current.title}
            </h3>
            <p className="text-ink-faint text-[13px]">{current.volume}</p>

            <ul className="flex flex-wrap gap-x-4 gap-y-2.5 my-1.5">
              {current.hotspots.map((hotspot) => (
                <li
                  key={hotspot}
                  className="text-[12.5px] text-ink-dim border-b border-line pb-0.5"
                >
                  {hotspot}
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                className="group inline-flex items-center gap-2 text-[14px] text-ink border-b border-line-strong pb-1 hover:gap-3 transition-all duration-300 cursor-pointer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = current.accent;
                  e.currentTarget.style.borderColor = current.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <span>Bu Akvaryumu Oluştur</span>
                <ArrowRight
                  size={15}
                  strokeWidth={1.25}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
