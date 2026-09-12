"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ARTICLES } from "@/data";
import { SectionHeading } from "./SectionHeading";

interface GuideProps {
  id: string;
}

export function Guide({ id }: GuideProps) {
  return (
    <section id={id} className="py-[10vw] border-b border-line">
      <SectionHeading eyebrow="Rehber">Sedef Rehber</SectionHeading>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="border-t border-line"
      >
        {ARTICLES.map((article) => (
          <motion.a
            key={article.title}
            href="#guide"
            onClick={(e) => e.preventDefault()}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 px-[6vw] py-[26px] border-b border-line transition-all duration-300 hover:bg-bg-soft hover:pl-[calc(6vw+10px)] group cursor-pointer"
          >
            <span className="text-[11px] text-ink-faint w-[90px] shrink-0 font-mono uppercase tracking-wider">
              {article.tag}
            </span>
            <span className="font-serif italic text-[clamp(17px,2.4vw,24px)] font-normal flex-1 text-ink group-hover:text-white transition-colors">
              {article.title}
            </span>
            <ArrowRight
              size={16}
              strokeWidth={1.25}
              className="text-ink-faint shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-accent"
            />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
