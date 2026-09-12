"use client";

import {
  ArrowUp,
  Instagram,
  Youtube,
  MessageCircle,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-bg border-t border-line text-ink">
      {/* Top Banner / Consultation Callout */}
      <div className="px-[6vw] py-12 md:py-16 border-b border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2">
            Akvaryum Danışmanlığı
          </span>
          <h3 className="font-serif italic text-2xl md:text-3xl text-ink">
            Kendi su altı dünyanızı kurmaya hazır mısınız?
          </h3>
          <p className="text-sm text-ink-dim mt-1.5 max-w-xl">
            Tank hacminiz, canlı uyumluluğu ve ekipman seçimleriniz için bize
            dilediğiniz zaman ulaşabilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/905325554321"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs tracking-wider uppercase font-mono inline-flex items-center gap-2 bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20 hover:border-accent transition-all cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>Danışma Hattı</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-3 border border-line-strong hover:border-accent hover:text-accent transition-colors cursor-pointer text-ink-dim"
            aria-label="Sayfanın Başına Dön"
            title="Başa Dön"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Main Directory Grid */}
      <div className="px-[6vw] py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 border-b border-line">
        {/* Brand Summary */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="font-serif text-3xl md:text-4xl text-ink tracking-tight">
            SEDEF AKVARYUM
          </div>
          <p className="text-sm text-ink-dim leading-relaxed max-w-sm">
            Doğayı suyun altına taşıyan akvaryum, canlı, bitki, aquascaping ve
            profesyonel yaşam destek çözümleri.
          </p>

          {/* Social Channels */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-line-strong flex items-center justify-center text-ink-dim hover:text-accent hover:border-accent transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-line-strong flex items-center justify-center text-ink-dim hover:text-accent hover:border-accent transition-colors cursor-pointer"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
            <a
              href="https://wa.me/905325554321"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-line-strong flex items-center justify-center text-ink-dim hover:text-accent hover:border-accent transition-colors cursor-pointer"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Categories Column */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-faint">
            Kategoriler
          </span>
          <div className="flex flex-col gap-2 text-sm text-ink-dim">
            <button
              onClick={() => navigateTo("world-fish")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Balıklar
            </button>
            <button
              onClick={() => navigateTo("world-shrimp")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Karidesler
            </button>
            <button
              onClick={() => navigateTo("world-plants")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Bitkiler
            </button>
            <button
              onClick={() => navigateTo("world-gear")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Ekipman
            </button>
            <button
              onClick={() => navigateTo("world-care")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Sağlık ve Bakım
            </button>
            <button
              onClick={() => navigateTo("world-food")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Yem
            </button>
          </div>
        </div>

        {/* Experience & Exploration Column */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-faint">
            Keşif & Rehber
          </span>
          <div className="flex flex-col gap-2 text-sm text-ink-dim">
            <button
              onClick={() => navigateTo("configurator")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Akvaryumunu Kur
            </button>
            <button
              onClick={() => navigateTo("collections")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Kürasyon Dünyaları
            </button>
            <button
              onClick={() => navigateTo("guide")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Sedef Rehber
            </button>
            <button
              onClick={() => navigateTo("visit")}
              className="hover:text-accent text-left transition-colors cursor-pointer"
            >
              Mağazayı Ziyaret Et
            </button>
          </div>
        </div>

        {/* Store & Contact Info */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-faint">
            İletişim
          </span>
          <div className="flex flex-col gap-2.5 text-xs text-ink-dim">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
              <span>Moda Cad. No: 42/A, Kadıköy / İstanbul</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-accent shrink-0" />
              <a
                href="tel:+902165554321"
                className="hover:text-accent transition-colors"
              >
                +90 (216) 555 43 21
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-accent shrink-0" />
              <a
                href="mailto:info@sedefakvaryum.com"
                className="hover:text-accent transition-colors"
              >
                info@sedefakvaryum.com
              </a>
            </div>
            <div className="pt-2 text-[11px] text-ink-faint">
              Pzt – Cmt: 10:00 – 19:00
              <br />
              Pazar: 12:00 – 18:00
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Row */}
      <div className="px-[6vw] py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-faint">
        <div>
          © {currentYear} Sedef Akvaryum. Tüm hakları saklıdır.
        </div>

        <div className="flex items-center gap-6">
          <span className="hover:text-ink cursor-pointer transition-colors">
            Gizlilik Politikası
          </span>
          <span className="hover:text-ink cursor-pointer transition-colors">
            Kullanım Şartları
          </span>
          <span className="hover:text-ink cursor-pointer transition-colors">
            KVKK Aydınlatma
          </span>
        </div>
      </div>
    </footer>
  );
}
