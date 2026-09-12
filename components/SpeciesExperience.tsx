"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  Thermometer,
  Droplets,
  Ruler,
  Leaf,
  Check,
  AlertTriangle,
  X,
} from "lucide-react";
import { COMPAT } from "@/data";

const TABS = ["Bakım", "Beslenme", "Üreme", "Su Değerleri", "Akvaryum Düzeni"] as const;

type TabKey = (typeof TABS)[number];

const TAB_COPY: Record<TabKey, string> = {
  Bakım:
    "Haftalık %20 su değişimi ve dengeli bir substrat, Neocaridina için yeterlidir.",
  Beslenme:
    "Alg ve biyofilmle beslenir; haftada 2-3 kez küçük porsiyonlar yeterlidir.",
  Üreme: "Uygun su değerlerinde kolayca üreyerek koloni oluşturur.",
  "Su Değerleri": "Sert ve dengeli su, kabuk gelişimi için önemlidir.",
  "Akvaryum Düzeni":
    "Yoğun bitki örtüsü ve moss, yavruların saklanması için gereklidir.",
};

const STATS = [
  { icon: Gauge, label: "Zorluk", value: "Başlangıç" },
  { icon: Thermometer, label: "Sıcaklık", value: "18–28°C" },
  { icon: Droplets, label: "pH", value: "6.5–8.0" },
  { icon: Ruler, label: "Boyut", value: "2–3 cm" },
  { icon: Leaf, label: "Mizaç", value: "Barışçıl" },
];

export function SpeciesExperience() {
  const [activeTab, setActiveTab] = useState<TabKey>("Bakım");

  return (
    <section className="flex flex-col lg:flex-row lg:min-h-[82vh] border-b border-line">
      {/* Visual media area */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 min-h-[40vh] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-line relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(201,132,111,0.28),transparent_60%)] bg-bg-soft" />
      </motion.div>

      {/* Species Body & Details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 p-[8vw_6vw] flex flex-col gap-[22px] justify-center"
      >
        <div>
          <span className="text-[12.5px] tracking-[0.06em] text-ink-faint block mb-2">
            Neocaridina
          </span>
          <h2 className="font-serif italic text-[clamp(30px,3.6vw,46px)] font-normal text-ink">
            Red Cherry
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-[22px] border-y border-line">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2.5 text-ink-dim">
              <stat.icon size={16} strokeWidth={1.25} className="text-accent" />
              <div>
                <span className="block text-[10.5px] text-ink-faint">
                  {stat.label}
                </span>
                <span className="block text-sm text-ink font-medium">
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Compatibility List */}
        <div>
          <h4 className="font-serif italic text-[15px] font-normal text-ink mb-3">
            Birlikte Yaşayabilirler mi?
          </h4>
          <ul className="flex flex-wrap gap-2.5">
            {COMPAT.map((compat) => {
              const statusStyles =
                compat.status === "uyumlu"
                  ? "text-accent border-accent"
                  : compat.status === "dikkat"
                  ? "text-amber border-amber"
                  : "text-coral border-coral";

              return (
                <li
                  key={compat.name}
                  className={`flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 border ${statusStyles}`}
                >
                  {compat.status === "uyumlu" && (
                    <Check size={14} strokeWidth={1.5} />
                  )}
                  {compat.status === "dikkat" && (
                    <AlertTriangle size={14} strokeWidth={1.5} />
                  )}
                  {compat.status === "onerilmez" && (
                    <X size={14} strokeWidth={1.5} />
                  )}
                  <span>{compat.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Informational Tabs with smooth transitions */}
        <div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-line pb-3 mb-3">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[12.5px] pb-1 cursor-pointer transition-colors duration-200 relative ${
                    isActive ? "text-ink font-medium" : "text-ink-faint hover:text-ink-dim"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="speciesTabUnderline"
                      className="absolute bottom-[-13px] left-0 right-0 h-[1px] bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="min-h-[44px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-ink-dim text-sm leading-[1.6]"
              >
                {TAB_COPY[activeTab]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="pt-2">
          <button className="px-[26px] py-[13px] text-[13.5px] tracking-[0.02em] inline-flex items-center gap-2 border border-line-strong text-ink hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer">
            Stok Durumunu Sor
          </button>
        </div>
      </motion.div>
    </section>
  );
}
