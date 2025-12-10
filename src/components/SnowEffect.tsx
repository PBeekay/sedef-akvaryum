import React, { useEffect, useRef, useState, useMemo } from 'react';

interface SnowFlake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
  drift: number; // Yatay kayma miktarı
  rotationSpeed: number; // Dönme hızı
  flakeType: number; // Farklı kar tanesi tipleri (1-6)
}

interface SnowEffectProps {
  enabled?: boolean;
  intensity?: 'light' | 'medium' | 'heavy'; // Kar yoğunluğu
}

// Detaylı SVG kar tanesi şekilleri
const SnowflakeSVG = ({ type, size }: { type: number; size: number }) => {
  const svgSize = size;
  const strokeWidth = Math.max(0.5, size / 10);
  const radius1 = size / 4;
  const radius2 = size / 8;

  // 6 farklı kar tanesi deseni
  const patterns = [
    // Tip 1: Klasik 6 kollu
    <svg key="type1" width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22M12 2L8 6M12 2L16 6M12 22L8 18M12 22L16 18M2 12H22M2 12L6 8M2 12L6 16M22 12L18 8M22 12L18 16M6.34 6.34L17.66 17.66M17.66 6.34L6.34 17.66" stroke="white" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>,
    // Tip 2: Yıldız şeklinde
    <svg key="type2" width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" stroke="white" strokeWidth={strokeWidth} fill="white" fillOpacity="0.3"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>,
    // Tip 3: Çiçek şeklinde
    <svg key="type3" width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="1.5" fill="white"/>
      <path d="M12 2L12.5 5.5L16 6L12.5 6.5L12 10L11.5 6.5L8 6L11.5 5.5L12 2Z" stroke="white" strokeWidth={strokeWidth} fill="white" fillOpacity="0.2"/>
      <path d="M12 14L12.5 17.5L16 18L12.5 18.5L12 22L11.5 18.5L8 18L11.5 17.5L12 14Z" stroke="white" strokeWidth={strokeWidth} fill="white" fillOpacity="0.2"/>
      <path d="M2 12L5.5 11.5L6 8L6.5 11.5L10 12L6.5 12.5L6 16L5.5 12.5L2 12Z" stroke="white" strokeWidth={strokeWidth} fill="white" fillOpacity="0.2"/>
      <path d="M22 12L18.5 11.5L18 8L17.5 11.5L14 12L17.5 12.5L18 16L18.5 12.5L22 12Z" stroke="white" strokeWidth={strokeWidth} fill="white" fillOpacity="0.2"/>
    </svg>,
    // Tip 4: Basit nokta
    <svg key="type4" width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r={radius1} fill="white" fillOpacity="0.8"/>
      <circle cx="12" cy="12" r={radius2} fill="white"/>
    </svg>,
    // Tip 5: Çapraz çizgili
    <svg key="type5" width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="2" x2="12" y2="22" stroke="white" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="5.66" y1="5.66" x2="18.34" y2="18.34" stroke="white" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="18.34" y1="5.66" x2="5.66" y2="18.34" stroke="white" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="white"/>
    </svg>,
    // Tip 6: Yaprak şeklinde
    <svg key="type6" width={svgSize} height={svgSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" stroke="white" strokeWidth={strokeWidth} fill="white" fillOpacity="0.3"/>
      <circle cx="12" cy="10" r="1.5" fill="white"/>
    </svg>
  ];

  return patterns[type % patterns.length];
};

const SnowEffect: React.FC<SnowEffectProps> = ({ 
  enabled = true, 
  intensity = 'medium' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowflakes, setSnowflakes] = useState<SnowFlake[]>([]);

  // Intensity ayarları - Daha yavaş ve görünür (useMemo ile optimize)
  const intensityConfig = useMemo(() => ({
    light: { count: 30, minSize: 6, maxSize: 12, minDuration: 15, maxDuration: 20 },
    medium: { count: 50, minSize: 8, maxSize: 16, minDuration: 12, maxDuration: 18 },
    heavy: { count: 80, minSize: 10, maxSize: 20, minDuration: 10, maxDuration: 16 }
  }), []);

  const currentConfig = useMemo(() => intensityConfig[intensity], [intensityConfig, intensity]);

  // Kar tanelerini useMemo ile optimize et - sadece enabled veya config değiştiğinde yeniden oluştur
  const snowflakesMemo = useMemo(() => {
    if (!enabled) return [];
    
    const flakes: SnowFlake[] = [];
    for (let i = 0; i < currentConfig.count; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: currentConfig.minDuration + Math.random() * (currentConfig.maxDuration - currentConfig.minDuration),
        animationDelay: Math.random() * 5,
        size: currentConfig.minSize + Math.random() * (currentConfig.maxSize - currentConfig.minSize),
        opacity: 0.7 + Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 100,
        rotationSpeed: 90 + Math.random() * 180,
        flakeType: Math.floor(Math.random() * 6)
      });
    }
    return flakes;
  }, [enabled, currentConfig]);

  useEffect(() => {
    setSnowflakes(snowflakesMemo);

    // CSS animasyonlarını dinamik olarak ekle
    const styleId = 'snow-effect-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .snowflake {
          position: fixed;
          top: -20px;
          pointer-events: none;
          user-select: none;
          z-index: 9999;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
          animation: snowfall linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        @keyframes snowfall {
          0% {
            transform: translate3d(0, -100vh, 0) rotate(0deg);
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          97% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--snow-drift, 0px), 100vh, 0) rotate(var(--snow-rotation, 360deg));
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Cleanup - style'ı kaldırma (diğer component'ler de kullanabilir)
    };
  }, [snowflakesMemo]);

  if (!enabled) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            '--snow-drift': `${flake.drift}px`,
            '--snow-rotation': `${flake.rotationSpeed}deg`
          } as React.CSSProperties & { '--snow-drift': string; '--snow-rotation': string }}
        >
          <SnowflakeSVG type={flake.flakeType} size={flake.size} />
        </div>
      ))}
    </div>
  );
};

export default SnowEffect;
