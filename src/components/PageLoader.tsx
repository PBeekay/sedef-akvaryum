import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 to-primary-50">
      <div className="text-center">
        <div className="mb-6">
          <div className="text-4xl transform animate-bounce mb-4">🦐</div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-extrabold bg-gradient-to-r from-ocean-600 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Sedef Akvaryum
            </span>
            <span className="text-xs text-gray-500 font-medium">Hediye Evi</span>
          </div>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-ocean-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
