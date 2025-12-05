import React, { useEffect } from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'warning' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const typeConfig = {
    warning: {
      icon: '⚠️',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-500',
      buttonConfirm: 'bg-yellow-500 hover:bg-yellow-600',
      borderColor: 'border-yellow-300',
    },
    danger: {
      icon: '🗑️',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-500',
      buttonConfirm: 'bg-red-500 hover:bg-red-600',
      borderColor: 'border-red-300',
    },
    info: {
      icon: 'ℹ️',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      buttonConfirm: 'bg-blue-500 hover:bg-blue-600',
      borderColor: 'border-blue-300',
    },
    success: {
      icon: '✅',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-500',
      buttonConfirm: 'bg-green-500 hover:bg-green-600',
      borderColor: 'border-green-300',
    },
  };

  const config = typeConfig[type] || typeConfig.warning;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 my-4 transform transition-all duration-300 animate-scale-in border-2 ${config.borderColor || 'border-gray-200'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center space-x-4 p-5 sm:p-6 border-b border-gray-200 ${config.bgColor} rounded-t-2xl`}>
          <div className={`${config.iconBg} w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 animate-bounce-subtle shadow-lg`}>
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">{title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 ${config.buttonConfirm} text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-sm sm:text-base`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

