import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 500); // 等待动画完成
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-white',
          border: 'border-l-4 border-green-800',
          icon: (
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
              <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ),
          text: 'text-gray-800',
          title: 'Success',
          titleColor: 'text-green-800'
        };
      case 'error':
        return {
          bg: 'bg-white',
          border: 'border-l-4 border-red-500',
          icon: (
            <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          ),
          text: 'text-gray-800',
          title: 'Error',
          titleColor: 'text-red-600'
        };
      case 'info':
        return {
          bg: 'bg-white',
          border: 'border-l-4 border-green-800',
          icon: (
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
              <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          ),
          text: 'text-gray-800',
          title: 'Info',
          titleColor: 'text-green-800'
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-l-4 border-green-800',
          icon: (
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
              <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          ),
          text: 'text-gray-800',
          title: 'Notification',
          titleColor: 'text-green-800'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`fixed top-6 right-6 z-50 max-w-md w-full mx-4 transform transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className={`${styles.bg} ${styles.border} rounded-xl shadow-2xl p-5 flex items-start space-x-4 relative overflow-hidden`}>
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-50 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
        
        {/* 图标 */}
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        
        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`${styles.titleColor} text-sm font-semibold mb-1`}>
              {styles.title}
            </h4>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose?.(), 500);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className={`${styles.text} text-sm leading-relaxed`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
