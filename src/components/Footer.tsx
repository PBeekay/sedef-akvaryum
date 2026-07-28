import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-emerald-950/5 text-[#2c3e44] overflow-hidden border-t border-emerald-500/10">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        
        {/* Top Callout Strip */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center text-2xl shrink-0">
              💬
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#2c3e44] tracking-tight">
                Akvaryum ve Canlı Kurulum Sorularınız Mı Var?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                Uzman ekibimizle WhatsApp üzerinden anında iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/905374492626"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-zen text-xs uppercase tracking-wider font-extrabold py-3.5 px-6 shrink-0 shadow-md hover:scale-[1.03] transition-transform"
          >
            WhatsApp İle Danışın
          </a>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-10">

          {/* Brand & Description (Col 1-4) */}
          <div className="lg:col-span-4 space-y-3">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <span className="text-3xl transform group-hover:rotate-12 transition-transform">🦐</span>
              <div>
                <span className="block text-xl font-black text-[#2c3e44] group-hover:text-emerald-700 transition-colors tracking-tight">
                  Sedef<span className="text-emerald-600">.</span>Akvaryum
                </span>
                <span className="block text-[9px] text-emerald-700 font-bold tracking-widest uppercase mt-0.5">
                  Eskişehir Akvaryum Hobi Evi
                </span>
              </div>
            </Link>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Eskişehir'in en zengin karides, balık ve su altı bitki koleksiyonu. Kaliteli akvaryum ekipmanları ve uzman danışmanlık tek çatı altında.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/sedef_akvaryum_hediye_evi/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-600 border border-emerald-100 text-slate-700 hover:text-white flex items-center justify-center shadow-sm transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://maps.google.com/?q=Sedef+Akvaryum+Eski%C5%9Fehir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-600 border border-emerald-100 text-slate-700 hover:text-white flex items-center justify-center shadow-sm transition-all duration-300"
                aria-label="Google Harita"
              >
                📍
              </a>
            </div>
          </div>

          {/* Quick Categories (Col 5-7) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest mb-3">
              Kategoriler
            </h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                  >
                    <span className="text-emerald-600 text-[10px]">›</span>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Store Info (Col 8-12) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest mb-3">
              Mağaza & İletişim
            </h4>
            <div className="p-4 rounded-2xl bg-white/80 border border-emerald-100/80 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">📍</span>
                <div>
                  <p className="text-xs font-semibold text-[#2c3e44]">İstiklal Mah. Sökmener Sk. No: 8/B</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">26010 Odunpazarı / Eskişehir</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <span className="text-base">📞</span>
                <a href="tel:+905374492626" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
                  0537 449 26 26
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-950/10 pt-6 pb-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sedef Akvaryum. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Eskişehir Akvaryum Evi</span>
            <span>•</span>
            <a
              href="https://berkaypekersoy.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-emerald-700 transition-colors font-medium"
            >
              by <span className="underline decoration-emerald-500/40 underline-offset-4 text-slate-800 hover:text-emerald-700">berkaypekersoy.com.tr</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
