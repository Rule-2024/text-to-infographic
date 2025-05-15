'use client';

import { useState, useEffect } from 'react';

interface GestureHintProps {
  message: string;
  duration?: number; // 显示时间（毫秒）
  delay?: number;    // 延迟显示（毫秒）
}

export function GestureHint({ message, duration = 3000, delay = 1000 }: GestureHintProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 检查是否已经显示过提示
    const hasShownHint = localStorage.getItem('gesture-hint-shown');
    
    if (hasShownHint) {
      return; // 如果已经显示过，则不再显示
    }

    // 延迟显示提示
    const showTimer = setTimeout(() => {
      setVisible(true);
      
      // 设置自动隐藏
      const hideTimer = setTimeout(() => {
        setVisible(false);
        // 记录已经显示过提示
        localStorage.setItem('gesture-hint-shown', 'true');
      }, duration);
      
      return () => clearTimeout(hideTimer);
    }, delay);
    
    return () => clearTimeout(showTimer);
  }, [delay, duration]);

  // 如果用户手动关闭，则不再显示
  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem('gesture-hint-shown', 'true');
  };

  if (!visible || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
      <div className="bg-black/80 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-xs">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg>
        </div>
        <div className="flex-1 text-sm">{message}</div>
        <button 
          onClick={handleDismiss}
          className="flex-shrink-0 text-white/70 hover:text-white"
          aria-label="关闭提示"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
