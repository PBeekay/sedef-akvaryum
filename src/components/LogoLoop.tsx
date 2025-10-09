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
    <div className="relative bg-white py-8 overflow-hidden border-y border-gray-200">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

      {/* Scrolling container */}
      <div className="flex animate-scroll">
        {duplicatedFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-8 whitespace-nowrap"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-2xl">{feature.icon}</span>
              <span className="font-semibold text-sm">{feature.text}</span>
            </div>
            {/* Separator */}
            {index < duplicatedFeatures.length - 1 && (
              <span className="text-gray-300 text-2xl">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
