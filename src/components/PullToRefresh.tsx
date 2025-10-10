import React from 'react';

interface PullToRefreshProps {
  pullDistance: number;
  isRefreshing: boolean;
  refreshThreshold: number;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  pullDistance,
  isRefreshing,
  refreshThreshold,
}) => {
  const progress = Math.min((pullDistance / refreshThreshold) * 100, 100);
  const rotation = (pullDistance / refreshThreshold) * 360;

  if (pullDistance === 0 && !isRefreshing) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-200"
      style={{
        transform: `translateY(${Math.min(pullDistance, 80)}px)`,
      }}
    >
      <div className="bg-white rounded-full shadow-lg p-3 flex items-center justify-center">
        {isRefreshing ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-primary-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm font-medium text-gray-700">Yenileniyor...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-primary-600 transition-transform duration-200"
              style={{ transform: `rotate(${rotation}deg)` }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {progress >= 100 ? (
              <span className="text-sm font-medium text-primary-600">Bırakın...</span>
            ) : (
              <span className="text-sm font-medium text-gray-700">
                Yenilemek için çekin
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PullToRefresh;

