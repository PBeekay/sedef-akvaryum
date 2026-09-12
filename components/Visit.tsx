"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Navigation,
  Check,
  Copy,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface VisitProps {
  id: string;
}

export function Visit({ id }: VisitProps) {
  const [copied, setCopied] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Store information
  const storeInfo = useMemo(
    () => ({
      address: "Caferağa Mah. Moda Cad. No: 42/A",
      district: "Kadıköy / İstanbul",
      transportHint: "Kadıköy Vapur İskelesi ve M4 Metroya 5 dk yürüme",
      phone: "+90 (216) 555 43 21",
      whatsapp: "+90 532 555 43 21",
      whatsappClean: "905325554321",
      hoursWeekday: "10:00 – 19:00",
      hoursSunday: "12:00 – 18:00",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Moda+Caddesi+Kadikoy+Istanbul",
    }),
    []
  );

  // Check live operating status
  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday
    const hour = now.getHours();

    if (day === 0) {
      // Sunday: 12 - 18
      setIsOpenNow(hour >= 12 && hour < 18);
    } else {
      // Mon - Sat: 10 - 19
      setIsOpenNow(hour >= 10 && hour < 19);
    }
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${storeInfo.address}, ${storeInfo.district}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id={id}
      className="flex flex-col lg:flex-row border-b border-line min-h-[75vh]"
    >
      {/* Information Column */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 px-[6vw] py-12 lg:py-16 flex flex-col justify-center gap-7"
      >
        <div className="flex flex-col gap-3">
          <SectionHeading eyebrow="Ziyaret Et" className="px-0 mb-0">
            Ekrandan Akvaryuma.
          </SectionHeading>

          <p className="text-ink-dim max-w-[440px] text-[15px] leading-[1.65]">
            Canlıları yakından inceleyin, tankınızı mağazamızda uzmanlarımızla
            birlikte planlayın. Ücretsiz su değerleri testi ve akvaryum danışmanlığı
            sunuyoruz.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isOpenNow ? "bg-accent" : "bg-coral"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isOpenNow ? "bg-accent" : "bg-coral"
              }`}
            />
          </span>
          <span className={isOpenNow ? "text-accent" : "text-coral"}>
            {isOpenNow
              ? "Şu Anda Açık · Ziyaret Edebilirsiniz"
              : "Şu Anda Kapalı · Açılış 10:00"}
          </span>
        </div>

        {/* Details Grid */}
        <div className="flex flex-col gap-4 border-y border-line py-6">
          {/* Address */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <MapPin
                size={18}
                strokeWidth={1.5}
                className="text-accent shrink-0 mt-0.5"
              />
              <div className="text-[13.5px]">
                <p className="text-ink font-medium">{storeInfo.address}</p>
                <p className="text-ink-dim">{storeInfo.district}</p>
                <p className="text-[11.5px] text-ink-faint mt-0.5">
                  {storeInfo.transportHint}
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyAddress}
              className="text-xs text-ink-dim hover:text-ink border border-line-strong px-2.5 py-1 inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Adresi Kopyala"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-accent" />
                  <span className="text-accent">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>

          {/* Working Hours */}
          <div className="flex items-start gap-3">
            <Clock
              size={18}
              strokeWidth={1.5}
              className="text-accent shrink-0 mt-0.5"
            />
            <div className="text-[13.5px]">
              <div className="flex items-center gap-3">
                <span className="text-ink-dim">Pzt – Cmt:</span>
                <span className="text-ink font-medium">
                  {storeInfo.hoursWeekday}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-ink-dim">Pazar:</span>
                <span className="text-ink font-medium">
                  {storeInfo.hoursSunday}
                </span>
              </div>
            </div>
          </div>

          {/* Phone & WhatsApp */}
          <div className="flex items-start gap-3">
            <Phone
              size={18}
              strokeWidth={1.5}
              className="text-accent shrink-0 mt-0.5"
            />
            <div className="text-[13.5px] flex flex-col gap-0.5">
              <a
                href={`tel:${storeInfo.phone.replace(/[^0-9+]/g, "")}`}
                className="text-ink hover:text-accent transition-colors font-medium"
              >
                {storeInfo.phone}
              </a>
              <span className="text-[11.5px] text-ink-faint">
                Mağaza Danışma & Stok Bilgisi
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap pt-1">
          <a
            href={storeInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-[13.5px] tracking-[0.02em] inline-flex items-center gap-2 border border-line-strong text-ink hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer bg-bg hover:bg-accent/5"
          >
            <Navigation size={15} />
            <span>Yol Tarifi Al</span>
            <ExternalLink size={12} className="opacity-60" />
          </a>

          <a
            href={`https://wa.me/${storeInfo.whatsappClean}?text=${encodeURIComponent(
              "Merhaba Sedef Akvaryum, mağazanızı ziyaret etmek ve bilgi almak istiyorum."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-[13.5px] tracking-[0.02em] inline-flex items-center gap-2 border border-accent/40 text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>WhatsApp&apos;tan Yaz</span>
          </a>
        </div>
      </motion.div>

      {/* Styled Schematic Map Column */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative min-h-[420px] lg:min-h-full bg-bg-soft border-t lg:border-t-0 lg:border-l border-line overflow-hidden select-none flex items-center justify-center p-6"
      >
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-40" />

        {/* Coastal Curve Silhouette (Stylized Kadıköy / Moda shore) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50,200 Q200,100 450,250 T900,400"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M-50,280 Q250,180 500,320 T950,480"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Stylized Street Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Moda Caddesi main line */}
          <div className="absolute top-[20%] left-[10%] right-[15%] h-[1px] bg-line-strong rotate-[-12deg]" />
          <span className="absolute top-[28%] left-[22%] text-[10px] font-mono tracking-widest text-ink-faint/60 -rotate-12">
            MODA CADDESİ
          </span>

          {/* Bahariye connector */}
          <div className="absolute top-[10%] bottom-[25%] left-[65%] w-[1px] bg-line rotate-[24deg]" />
          <span className="absolute top-[48%] left-[68%] text-[10px] font-mono tracking-widest text-ink-faint/60 rotate-24">
            RIHTIM / İSKELE
          </span>
        </div>

        {/* Transit Landmark Badges */}
        <div className="absolute top-[15%] right-[12%] flex items-center gap-1.5 px-2.5 py-1 border border-line bg-bg/90 text-[11px] font-mono text-ink-faint">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
          <span>M4 Kadıköy Metro (5 dk)</span>
        </div>

        <div className="absolute bottom-[16%] left-[10%] flex items-center gap-1.5 px-2.5 py-1 border border-line bg-bg/90 text-[11px] font-mono text-ink-faint">
          <span className="w-1.5 h-1.5 rounded-full bg-stone" />
          <span>Moda Sahil (3 dk)</span>
        </div>

        {/* Central Store Pin Card */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Floating Beacon */}
          <div className="relative flex items-center justify-center mb-3">
            <motion.div
              animate={{
                scale: [1, 2, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-12 h-12 rounded-full bg-accent/30"
            />
            <div className="w-3.5 h-3.5 rounded-full bg-accent shadow-[0_0_15px_rgba(111,169,140,0.8)] relative z-10" />
          </div>

          {/* Interactive Card on Map */}
          <div className="border border-line-strong bg-bg/95 backdrop-blur-sm p-4 text-center shadow-2xl max-w-[250px] flex flex-col gap-1.5">
            <span className="font-serif italic text-base text-ink tracking-wide">
              SEDEF AKVARYUM
            </span>
            <span className="text-[11px] text-accent font-mono">
              Doğal Su Altı Dünyaları
            </span>
            <p className="text-[11px] text-ink-dim pt-1 border-t border-line">
              {storeInfo.address}
            </p>
            <a
              href={storeInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-[11px] text-accent hover:underline inline-flex items-center justify-center gap-1 font-mono"
            >
              <span>Haritada İncele</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
