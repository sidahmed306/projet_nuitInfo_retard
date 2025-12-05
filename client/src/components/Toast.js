import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const typeConfig = {
    success: {
      bgColor: 'bg-green-500',
      icon: '✅',
      borderColor: 'border-green-600',
    },
    error: {
      bgColor: 'bg-red-500',
      icon: '❌',
      borderColor: 'border-red-600',
    },
    info: {
      bgColor: 'bg-blue-500',
      icon: 'ℹ️',
      borderColor: 'border-blue-600',
    },
    warning: {
      bgColor: 'bg-yellow-500',
      icon: '⚠️',
      borderColor: 'border-yellow-600',
    },
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <div
      className={`fixed top-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 transform transition-all duration-300 ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div
        className={`${config.bgColor} ${config.borderColor} border-l-4 text-white px-4 py-3 rounded-lg shadow-2xl flex items-start space-x-3 animate-slide-down`}
      >
        <div className="flex-shrink-0 text-xl animate-bounce-subtle">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-5 break-words">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-white hover:text-gray-200 font-bold text-xl leading-none transition-colors duration-200 ml-2"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;

