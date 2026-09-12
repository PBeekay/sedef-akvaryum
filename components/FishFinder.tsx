"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge } from "lucide-react";
import { MATCHES } from "@/data";
import { SectionHeading } from "./SectionHeading";

export function FishFinder() {
  const [submitted, setSubmitted] = useState(false);
  const [volume, setVolume] = useState("60L");
  const [temp, setTemp] = useState("24-26°C");
  const [planted, setPlanted] = useState("Evet");
  const [experience, setExperience] = useState("Deneyimliyim");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-[10vw] border-b border-line">
      <SectionHeading eyebrow="Uyumluluk">Akvaryumuna Kim Uygun?</SectionHeading>

      <div className="grid gap-10 px-[6vw] lg:grid-cols-[0.8fr_1.2fr] lg:gap-[70px]">
        {/* Form Filter */}
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-[18px]"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col gap-2 text-[12.5px] text-ink-faint">
            <span>Tank Hacmi</span>
            <select
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="bg-bg-soft border border-line-strong text-ink px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none transition-colors"
            >
              <option value="30L">30L</option>
              <option value="60L">60L</option>
              <option value="100L">100L</option>
              <option value="200L+">200L+</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-[12.5px] text-ink-faint">
            <span>Sıcaklık</span>
            <select
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="bg-bg-soft border border-line-strong text-ink px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none transition-colors"
            >
              <option value="20-23°C">20–23°C</option>
              <option value="24-26°C">24–26°C</option>
              <option value="27-30°C">27–30°C</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-[12.5px] text-ink-faint">
            <span>Bitkili mi?</span>
            <select
              value={planted}
              onChange={(e) => setPlanted(e.target.value)}
              className="bg-bg-soft border border-line-strong text-ink px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none transition-colors"
            >
              <option value="Evet">Evet</option>
              <option value="Hayır">Hayır</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-[12.5px] text-ink-faint">
            <span>Deneyim</span>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="bg-bg-soft border border-line-strong text-ink px-3.5 py-2.5 text-sm focus:border-accent focus:outline-none transition-colors"
            >
              <option value="İlk Akvaryumum">İlk Akvaryumum</option>
              <option value="Deneyimliyim">Deneyimliyim</option>
              <option value="İleri Seviye">İleri Seviye</option>
            </select>
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="px-[26px] py-[13px] text-[13.5px] tracking-[0.02em] inline-flex items-center gap-2 border border-line-strong text-ink hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
            >
              Uygun Türleri Göster
            </button>
          </div>
        </motion.form>

        {/* Results Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="border border-line p-7 md:p-9 min-h-[300px] flex flex-col justify-center bg-bg"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="m-auto text-center text-ink-faint flex flex-col items-center gap-3.5 max-w-[260px] text-[13.5px]"
              >
                <div className="w-12 h-12 rounded-full border border-line-strong flex items-center justify-center text-accent/70 bg-bg-soft">
                  <Gauge size={24} strokeWidth={1.25} />
                </div>
                <p className="leading-relaxed">
                  Tercihlerini seç, sana uygun türleri önerelim.
                </p>
              </motion.div>
            ) : (
              <motion.ul
                key="matches"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-[22px] w-full"
              >
                {MATCHES.map((match, i) => (
                  <li key={match.name} className="flex flex-col">
                    <div className="flex justify-between text-[14.5px] mb-2 text-ink">
                      <span>{match.name}</span>
                      <span className="text-accent text-[12.5px] font-mono">
                        %{match.fit} Uyum
                      </span>
                    </div>
                    <div className="h-[2px] bg-line overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${match.fit}%` }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
