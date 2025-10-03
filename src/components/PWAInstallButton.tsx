import React, { useState } from 'react';
import { usePWA } from '../hooks/usePWA';
import { ButtonLoader } from './LoadingSpinner';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'floating';
  showOfflineIndicator?: boolean;
}

const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'primary',
  showOfflineIndicator = true
}) => {
  const { isInstallable, isInstalled, isOnline, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installApp();
    } catch (error) {
    } finally {
      setIsInstalling(false);
    }
  };

  // Don't show if already installed or not installable
  if (isInstalled || !isInstallable) {
    return null;
  }

  const getButtonClasses = () => {
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200';
    
    switch (variant) {
      case 'floating':
        return `${baseClasses} fixed bottom-20 right-4 z-50 bg-primary-600 text-white shadow-lg hover:bg-primary-700 transform hover:scale-105`;
      case 'secondary':
        return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
      default:
        return `${baseClasses} bg-primary-600 text-white hover:bg-primary-700`;
    }
  };

  return (
    <>
      <button
        onClick={handleInstall}
        disabled={isInstalling}
        className={`${getButtonClasses()} ${className} ${isInstalling ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Uygulamayı telefonunuza kurun"
      >
        {isInstalling ? (
          <>
            <ButtonLoader size="sm" color="white" />
            <span>Kuruluyor...</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Uygulamayı Kur
          </>
        )}
      </button>

      {/* Offline Indicator */}
      {showOfflineIndicator && !isOnline && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Çevrimdışı Mod
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallButton;
