"use client";

import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Taxonomy } from "./Taxonomy";

interface HeroProps {
  id: string;
  onNavigate: (id: string) => void;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  accent: string;
  ctaText: string;
  ctaTarget: string;
  bgImage?: string; // Tam ekran arka plan görseli (örn: "/images/hero-1.jpg")
  ambientHue: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "ecosystem",
    eyebrow: "01 · SU ALTI MİMARİSİ",
    titleLine1: "SEDEF",
    titleLine2: "AKVARYUM",
    subtitle: "Kendi su altı dünyanı ve yaşayan ekosistemini oluştur.",
    accent: "#6fa98c",
    ctaText: "Keşfet",
    ctaTarget: "worlds",
    bgImage: "", // Arka planı komple kaplayacak resim yolu
    ambientHue: "160 28% 14%",
  },
  {
    id: "creatures",
    eyebrow: "02 · YAŞAYAN BİYOÇEŞİTLİLİK",
    titleLine1: "CANLILAR &",
    titleLine2: "KARİDESLER",
    subtitle: "Tetra sürülerinden nano karides kolonilerine zarif su altı türleri.",
    accent: "#c9846f",
    ctaText: "Canlıları İncele",
    ctaTarget: "world-shrimp",
    bgImage: "",
    ambientHue: "9 32% 16%",
  },
  {
    id: "aquascaping",
    eyebrow: "03 · DOĞAL PEYZAJ & TAŞLAR",
    titleLine1: "AQUASCAPING",
    titleLine2: "VE SANAT",
    subtitle: "Dragon stone, kökler ve substrat ile suyun altında yaşayan bir tablo yarat.",
    accent: "#c9a165",
    ctaText: "Dünyanı Seç",
    ctaTarget: "collections",
    bgImage: "",
    ambientHue: "38 24% 15%",
  },
  {
    id: "gear",
    eyebrow: "04 · PROFESYONEL EKİPMAN",
    titleLine1: "HASSAS FİLTRE",
    titleLine2: "VE IŞIK SİSTEMİ",
    subtitle: "CO₂ sistemleri, WRGB LED aydınlatma ve biyolojik denge katmanları.",
    accent: "#8f9fa0",
    ctaText: "Ekipmanları Gör",
    ctaTarget: "world-gear",
    bgImage: "",
    ambientHue: "200 14% 14%",
  },
];

const SLIDE_DURATION = 6500; // 6.5 saniye

export function Hero({ id, onNavigate }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth springs for mouse parallax
  const springX = useSpring(0, { stiffness: 60, damping: 20 });
  const springY = useSpring(0, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      springX.set(x * -14);
      springY.set(y * -10);
    },
    [springX, springY]
  );

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Otomatik slayt geçişi (Hover esnasında durur)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide, current]);

  const motes = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      duration: 14 + (i % 7) * 2,
      delay: -(i * 1.3),
      opacity: 0.15 + (i % 5) * 0.04,
    }));
  }, []);

  const activeSlide = HERO_SLIDES[current];

  return (
    <section
      id={id}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-bg"
    >
      {/* 
        TAM EKRAN ARKA PLAN RESMİ VE SİNEMATİK ATMOSFER KATMANI
        (Tüm alanı komple kaplar, GPU opacity ile sıfır kasmayla cross-fade yapar)
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-1000 ease-out will-change-transform"
            style={{ opacity: idx === current ? 1 : 0 }}
          >
            {/* Arka plan görseli (varsa) */}
            {slide.bgImage ? (
              <img
                src={slide.bgImage}
                alt={slide.titleLine1}
                className="w-full h-full object-cover scale-105 transform-gpu"
              />
            ) : (
              /* Doğal su altı gradyan atmosferi (Görsel yüklenmediğinde) */
              <div
                className="w-full h-full"
                style={{
                  background: `radial-gradient(ellipse at 35% 25%, hsl(${slide.ambientHue} / 95%) 0%, transparent 60%), radial-gradient(ellipse at 75% 75%, ${slide.accent}24, transparent 65%), var(--bg)`,
                }}
              />
            )}
          </div>
        ))}

        {/* Sinematik Koyu Vignette & Degrade Kaplamaları (Yazıların kusursuz okunması için) */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,16,14,0.65)_100%)]" />

        {/* Parallaks ile hareket eden ışık huzmesi ve ince ızgara */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute inset-[-5%] will-change-transform"
        >
          {/* Işık huzmeleri */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(237,238,230,0.035)_34%,transparent_46%),linear-gradient(100deg,transparent_55%,rgba(237,238,230,0.02)_64%,transparent_78%)]" />

          {/* İnce mimari ızgara deseni */}
          <div className="absolute inset-0 bg-grid-pattern bg-[size:100%_25%,8.333%_100%] opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_50%,black_80%,transparent)]" />

          {/* Süzülen su moteleri */}
          {motes.map((m) => (
            <span
              key={m.id}
              className="absolute bottom-[-5%] w-[3px] h-[3px] rounded-full bg-accent animate-drift"
              style={{
                left: m.left,
                animationDuration: `${m.duration}s`,
                animationDelay: `${m.delay}s`,
                opacity: m.opacity,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* 
        ORİJİNAL VE GÖRKEMLİ HERO İÇERİĞİ
        (Tam ekran tek kolon, dev Fraunces tipografi ve kusursuz okunurluk)
      */}
      <div className="relative z-10 px-[6vw] pb-[8vw] w-full">
        <Taxonomy />

        <div className="my-[22px] mb-[26px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.03 },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="transform-gpu will-change-transform"
            >
              {/* Eyebrow Rozeti */}
              <div className="overflow-hidden mb-3">
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                    exit: { y: -15, opacity: 0 },
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xs font-mono tracking-widest uppercase flex items-center gap-2"
                  style={{ color: activeSlide.accent }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: activeSlide.accent }}
                  />
                  <span>{activeSlide.eyebrow}</span>
                </motion.div>
              </div>

              {/* Orijinal Dev Boyutlu Başlık Satırları (Kinetik Maskeli) */}
              <div className="overflow-hidden">
                <motion.h1
                  variants={{
                    hidden: { y: "115%", opacity: 0 },
                    visible: { y: "0%", opacity: 1 },
                    exit: { y: "-100%", opacity: 0 },
                  }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(54px,12.5vw,160px)] tracking-[-0.015em] block leading-[0.92] font-serif font-normal text-ink"
                >
                  {activeSlide.titleLine1}
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  variants={{
                    hidden: { y: "115%", opacity: 0 },
                    visible: { y: "0%", opacity: 1 },
                    exit: { y: "-100%", opacity: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(54px,12.5vw,160px)] tracking-[-0.015em] block leading-[0.92] font-serif font-normal text-ink"
                >
                  {activeSlide.titleLine2}
                </motion.h1>
              </div>

              {/* Alt Başlık */}
              <div className="overflow-hidden mt-6">
                <motion.p
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                    exit: { y: -15, opacity: 0 },
                  }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-[clamp(17px,2vw,22px)] text-ink-dim max-w-[460px] leading-relaxed"
                >
                  {activeSlide.subtitle}
                </motion.p>
              </div>

              {/* Alt Satır: Aksiyon Butonları & Slider Kontrolü */}
              <motion.div
                variants={{
                  hidden: { y: 18, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                  exit: { opacity: 0 },
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-10"
              >
                {/* Sol: Keşfet Butonları */}
                <div className="flex items-center gap-3.5 flex-wrap">
                  <button
                    onClick={() => onNavigate(activeSlide.ctaTarget)}
                    className="px-[26px] py-[13px] text-[13.5px] tracking-[0.02em] inline-flex items-center gap-2 text-ink-dim hover:text-ink transition-colors duration-300 cursor-pointer"
                  >
                    <span>{activeSlide.ctaText}</span>
                    <ChevronDown size={16} strokeWidth={1.25} />
                  </button>
                  <button
                    onClick={() => onNavigate("visit")}
                    className="px-[26px] py-[13px] text-[13.5px] tracking-[0.02em] inline-flex items-center gap-2 border border-line-strong text-ink hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
                  >
                    Mağazayı Keşfet
                  </button>
                </div>

                {/* Sağ: Minimalist Slider Kontrol Paneli */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  {/* Önceki / Sonraki Oklar */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevSlide}
                      className="w-8 h-8 border border-line flex items-center justify-center text-ink-dim hover:text-ink hover:border-line-strong transition-colors cursor-pointer"
                      aria-label="Önceki Slayt"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-8 h-8 border border-line flex items-center justify-center text-ink-dim hover:text-ink hover:border-line-strong transition-colors cursor-pointer"
                      aria-label="Sonraki Slayt"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* İlerleme Çizgileri */}
                  <div className="flex items-center gap-2">
                    {HERO_SLIDES.map((slide, idx) => {
                      const isActive = idx === current;
                      return (
                        <button
                          key={slide.id}
                          onClick={() => setCurrent(idx)}
                          className="py-2 cursor-pointer group"
                          aria-label={`Slayt ${idx + 1}`}
                        >
                          <div className="w-8 md:w-12 h-[2px] bg-line overflow-hidden relative rounded-full">
                            {isActive ? (
                              <motion.div
                                key={`${current}-${isPaused}`}
                                initial={{ width: "0%" }}
                                animate={{ width: isPaused ? undefined : "100%" }}
                                transition={{
                                  duration: SLIDE_DURATION / 1000,
                                  ease: "linear",
                                }}
                                className="h-full"
                                style={{ backgroundColor: slide.accent }}
                              />
                            ) : (
                              <div className="w-full h-full bg-transparent group-hover:bg-line-strong transition-colors" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Slayt Numaratörü */}
                  <span className="text-ink-faint tracking-wider pl-1">
                    0{current + 1} / 0{HERO_SLIDES.length}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
