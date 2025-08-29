import React, { useState } from 'react';
import { usePWA } from '../hooks/usePWA';

interface NotificationButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  className = '',
  variant = 'primary'
}) => {
  const { requestNotificationPermission } = usePWA();
  const [isRequesting, setIsRequesting] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  React.useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    try {
      const granted = await requestNotificationPermission();
      if (granted) {
        setPermission('granted');
        // Test notification
        new Notification('Sedef Akvaryum', {
          body: 'Bildirimler başarıyla etkinleştirildi!',
          icon: '/logo192.png'
        });
      }
    } catch (error) {
      console.error('Notification permission request failed:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  // Don't show if permission is already granted
  if (permission === 'granted') {
    return null;
  }

  const getButtonClasses = () => {
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200';
    
    switch (variant) {
      case 'icon':
        return `${baseClasses} p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full`;
      case 'secondary':
        return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
      default:
        return `${baseClasses} bg-primary-600 text-white hover:bg-primary-700`;
    }
  };

  return (
    <button
      onClick={handleRequestPermission}
      disabled={isRequesting}
      className={`${getButtonClasses()} ${className} ${isRequesting ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="Bildirimleri etkinleştir"
    >
      {isRequesting ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {variant === 'icon' ? '' : 'İstek gönderiliyor...'}
        </>
      ) : (
        <>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 006.28 3h11.44a4 4 0 013.09 1.19l-1.5 1.5A2 2 0 0016.72 5H6.28a2 2 0 00-1.55.69l-1.5-1.5zM4 7v10a2 2 0 002 2h12a2 2 0 002-2V7H4z" />
          </svg>
          {variant === 'icon' ? '' : 'Bildirimleri Etkinleştir'}
        </>
      )}
    </button>
  );
};

export default NotificationButton;
