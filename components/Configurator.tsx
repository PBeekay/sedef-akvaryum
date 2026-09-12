"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Sparkles } from "lucide-react";
import { CONFIG_STEPS, BUILD_LAYERS } from "@/data";
import { SectionHeading } from "./SectionHeading";

interface ConfiguratorProps {
  id: string;
}

export function Configurator({ id }: ConfiguratorProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hoverLayer, setHoverLayer] = useState<string | null>(null);

  const isDone = CONFIG_STEPS.every((step) => Boolean(answers[step.key]));
  const activeStepIndex = CONFIG_STEPS.findIndex((step) => !answers[step.key]);
  const currentStep =
    activeStepIndex === -1 ? CONFIG_STEPS.length - 1 : activeStepIndex;

  const handleSelect = (key: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [key]: option }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  return (
    <section id={id} className="py-[10vw] border-b border-line">
      <SectionHeading eyebrow="İnteraktif Kurulum">Akvaryumunu Oluştur</SectionHeading>

      <div className="grid gap-10 px-[6vw] lg:grid-cols-[0.85fr_1.15fr] lg:gap-[70px]">
        {/* Questions column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          {CONFIG_STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const stepAnswer = answers[step.key];
            const hasAnswer = Boolean(stepAnswer);

            return (
              <motion.div
                key={step.key}
                animate={{
                  opacity: isActive || hasAnswer ? 1 : 0.45,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="py-[22px] border-b border-line"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[15px] font-medium text-ink flex items-center gap-2.5">
                    <span className="text-[12px] font-mono text-ink-faint">
                      0{index + 1}
                    </span>
                    <span>{step.q}</span>
                  </p>
                  {hasAnswer && (
                    <span className="text-xs text-accent tracking-wider font-mono">
                      ✓ Seçildi
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {step.options.map((opt) => {
                    const isSelected = stepAnswer === opt;

                    return (
                      <motion.button
                        key={opt}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSelect(step.key, opt)}
                        className={`px-4 py-2.2 text-[13px] border transition-all duration-250 cursor-pointer ${
                          isSelected
                            ? "border-accent text-accent bg-accent/10 shadow-[0_0_15px_rgba(111,169,140,0.15)]"
                            : "border-line-strong text-ink-dim hover:border-accent/60 hover:text-ink hover:bg-bg-soft"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          {Object.keys(answers).length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-6"
            >
              <button
                onClick={handleReset}
                className="text-[12.5px] text-ink-faint hover:text-coral transition-colors underline underline-offset-4 cursor-pointer"
              >
                Seçimleri Temizle
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Dynamic preview result */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="border border-line p-7 md:p-9 min-h-[420px] flex flex-col justify-center bg-bg"
        >
          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="m-auto text-center text-ink-faint flex flex-col items-center gap-3.5 max-w-[260px] text-[13.5px]"
              >
                <div className="w-12 h-12 rounded-full border border-line-strong flex items-center justify-center text-accent/70 bg-bg-soft">
                  <Waves size={24} strokeWidth={1.25} />
                </div>
                <p className="leading-relaxed">
                  Seçimlerini tamamladığında akvaryumun burada şekillenecek.
                </p>
                <span className="text-xs text-ink-faint/60 font-mono">
                  ({Object.keys(answers).length} / {CONFIG_STEPS.length} Adım)
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="font-serif italic text-lg text-ink">
                    Senin {answers.volume} {answers.style}&apos;un
                  </p>
                  <span className="text-[11px] text-accent flex items-center gap-1 font-mono tracking-wider">
                    <Sparkles size={12} /> HAZIR
                  </span>
                </div>

                {/* Simulated Aquarium Box */}
                <div className="relative h-[200px] border border-line-strong overflow-hidden mb-6 bg-bg-soft">
                  {/* Water layer with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-accent/5 pointer-events-none" />

                  {/* Substrate bottom */}
                  <div className="absolute left-0 right-0 bottom-0 h-[18%] bg-gradient-to-b from-[#3a2f22] to-[#241c15]" />

                  {/* Plants swaying with Framer Motion */}
                  <motion.div
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-[18%] left-[18%] w-[3px] h-[90px] bg-accent origin-bottom rounded-t-sm"
                  />
                  <motion.div
                    animate={{ rotate: [3, -3, 3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.5,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-[18%] left-[26%] w-[3px] h-[60px] bg-accent/80 origin-bottom rounded-t-sm"
                  />
                  <motion.div
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-[18%] left-[22%] w-[2px] h-[75px] bg-accent/60 origin-bottom rounded-t-sm"
                  />

                  {/* Aquascaping Stone with polygon clip-path */}
                  <div className="absolute right-[20%] bottom-[18%] w-[46px] h-[26px] bg-[#4a4640] tank-stone-clip shadow-inner" />
                </div>

                {/* Build Layers Breakdown */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.05 },
                    },
                  }}
                  className="grid grid-cols-2 gap-[1px] bg-line border border-line"
                >
                  {BUILD_LAYERS.map((layer) => {
                    const isHovered = hoverLayer === layer.n;

                    return (
                      <motion.button
                        key={layer.n}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.35 }}
                        onMouseEnter={() => setHoverLayer(layer.n)}
                        onMouseLeave={() => setHoverLayer(null)}
                        className={`p-[13px_16px] flex items-center gap-2.5 text-[12.5px] transition-colors duration-250 cursor-pointer text-left ${
                          isHovered
                            ? "bg-bg-raised text-ink"
                            : "bg-bg text-ink-dim"
                        }`}
                      >
                        <span className="text-[11px] text-ink-faint font-mono">
                          {layer.n}
                        </span>
                        <span className="font-sans">{layer.label}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
