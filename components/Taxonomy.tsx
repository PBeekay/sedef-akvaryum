"use client";

import { motion } from "framer-motion";

export function Taxonomy() {
  const categories = [
    "BALIKLAR",
    "KARİDESLER",
    "BİTKİLER",
    "EKİPMAN",
    "SAĞLIK VE BAKIM",
    "YEM",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-2 text-xs tracking-[0.08em] text-ink-dim"
    >
      {categories.map((cat, i) => (
        <span key={cat} className="inline-flex items-center gap-2">
          <span>{cat}</span>
          {i < categories.length - 1 && <span className="opacity-40 select-none">·</span>}
        </span>
      ))}
    </motion.div>
  );
}
