"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NavProps {
  onNavigate: (id: string) => void;
}

const NAV_LINKS: [string, string][] = [
  ["Balıklar", "world-fish"],
  ["Karidesler", "world-shrimp"],
  ["Bitkiler", "world-plants"],
  ["Ekipman", "world-gear"],
  ["Sağlık ve Bakım", "world-care"],
  ["Yem", "world-food"],
  ["İletişim", "visit"],
];

export function Nav({ onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-[6vw] transition-all duration-400 ease-out ${
          scrolled
            ? "py-[15px] bg-[#0a100e]/85 backdrop-blur-[14px] border-b border-line"
            : "py-[26px] bg-transparent border-b border-transparent"
        }`}
      >
        <button
          className="font-serif text-[17px] tracking-[0.14em] text-ink hover:text-accent transition-colors duration-250 cursor-pointer"
          onClick={() => onNavigate("hero")}
          aria-label="Ana Sayfa"
        >
          SEDEF
        </button>

        <nav className="hidden md:flex items-center gap-[30px]">
          {NAV_LINKS.map(([label, target]) => (
            <button
              key={label}
              onClick={() => onNavigate(target)}
              className="text-[13px] text-ink-dim hover:text-ink transition-colors duration-250 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="flex md:hidden flex-col gap-[5px] w-[26px] cursor-pointer p-1"
          onClick={() => setOpen(true)}
          aria-label="Menüyü Aç"
        >
          <span className="block h-[1px] w-full bg-ink transition-all" />
          <span className="block h-[1px] w-full bg-ink transition-all" />
        </button>
      </header>

      {/* Fullscreen Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-bg flex flex-col justify-center px-[8vw]"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-[26px] right-[6vw] text-ink hover:text-accent transition-colors p-2 cursor-pointer"
              aria-label="Menüyü Kapat"
            >
              <X size={24} strokeWidth={1.25} />
            </button>

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 },
                },
              }}
              className="flex flex-col gap-3"
            >
              {NAV_LINKS.map(([label, target]) => (
                <motion.button
                  key={label}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 16 },
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    setOpen(false);
                    onNavigate(target);
                  }}
                  className="font-serif italic text-[clamp(28px,7vw,52px)] text-ink-dim hover:text-accent text-left transition-colors duration-300 cursor-pointer"
                >
                  {label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
