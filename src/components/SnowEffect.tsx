import React, { useEffect, useRef, useState } from 'react';

interface SnowFlake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
  drift: number; // Yatay kayma miktarı
}

interface SnowEffectProps {
  enabled?: boolean;
  intensity?: 'light' | 'medium' | 'heavy'; // Kar yoğunluğu
}

const SnowEffect: React.FC<SnowEffectProps> = ({ 
  enabled = true, 
  intensity = 'medium' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snowflakes, setSnowflakes] = useState<SnowFlake[]>([]);

  // Intensity ayarları
  const intensityConfig = {
    light: { count: 30, minSize: 3, maxSize: 6, minDuration: 8, maxDuration: 12 },
    medium: { count: 50, minSize: 4, maxSize: 8, minDuration: 6, maxDuration: 10 },
    heavy: { count: 80, minSize: 5, maxSize: 10, minDuration: 4, maxDuration: 8 }
  };

  const config = intensityConfig[intensity];

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    // Kar taneleri oluştur
    const createSnowflakes = (): SnowFlake[] => {
      const flakes: SnowFlake[] = [];
      for (let i = 0; i < config.count; i++) {
        flakes.push({
          id: i,
          left: Math.random() * 100, // 0-100% arası rastgele pozisyon
          animationDuration: config.minDuration + Math.random() * (config.maxDuration - config.minDuration),
          animationDelay: Math.random() * 5, // 0-5 saniye gecikme
          size: config.minSize + Math.random() * (config.maxSize - config.minSize),
          opacity: 0.5 + Math.random() * 0.5, // 0.5-1.0 arası opacity
          drift: (Math.random() - 0.5) * 100 // -50px ile +50px arası yatay kayma
        });
      }
      return flakes;
    };

    setSnowflakes(createSnowflakes());

    // CSS animasyonlarını dinamik olarak ekle
    const styleId = 'snow-effect-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .snowflake {
          position: fixed;
          top: -10px;
          color: white;
          pointer-events: none;
          user-select: none;
          z-index: 9999;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
          animation: snowfall linear infinite;
        }
        
        .snowflake::before {
          content: '❄';
        }
        
        @keyframes snowfall {
          0% {
            transform: translateY(-100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--snow-drift, 0px)) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Cleanup - style'ı kaldırma (diğer component'ler de kullanabilir)
    };
  }, [enabled, intensity, config]);

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
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            '--snow-drift': `${flake.drift}px`
          } as React.CSSProperties & { '--snow-drift': string }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;

