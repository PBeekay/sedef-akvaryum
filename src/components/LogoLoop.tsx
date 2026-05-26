import React from 'react';

/**
 * Logo Loop Component
 * Infinite scrolling logo/feature carousel for trust and credibility
 */

interface LogoItem {
  icon: string;
  text: string;
}

const LogoLoop: React.FC = () => {
  const features: LogoItem[] = [
    { icon: '✓', text: 'Kalite Garantisi' },
    { icon: '🚚', text: 'Hızlı Teslimat' },
    { icon: '💬', text: 'Uzman Destek' },
    { icon: '🏆', text: '58 Yıllık Deneyim' },
    { icon: '❤️', text: '1000+ Mutlu Müşteri' },
    { icon: '🌟', text: 'Premium Ürünler' },
    { icon: '🔒', text: 'Güvenli Alışveriş' },
    { icon: '📦', text: 'Özenli Paketleme' },
  ];

  // Duplicate for seamless loop
  const duplicatedFeatures = [...features, ...features];

  return (
    <div className="relative bg-gradient-to-r from-teal-700 via-teal-600 to-ocean-600 py-8 overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-teal-700 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ocean-600 to-transparent z-10"></div>

      {/* Scrolling container */}
      <div className="flex animate-scroll">
        {duplicatedFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 px-8 whitespace-nowrap"
          >
            <div className="flex items-center gap-2.5 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-lg flex-shrink-0">
                {feature.icon}
              </div>
              <span className="font-semibold text-sm">{feature.text}</span>
            </div>
            {/* Separator */}
            {index < duplicatedFeatures.length - 1 && (
              <span className="text-white/30 text-xl">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
