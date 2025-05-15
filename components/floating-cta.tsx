'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 控制按钮的显示和动画
  useEffect(() => {
    // 页面加载后延迟显示按钮
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // 设置定期动画效果
    const animationTimer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    // 清理定时器
    return () => {
      clearTimeout(showTimer);
      clearInterval(animationTimer);
    };
  }, []);

  // 如果按钮不可见，不渲染任何内容
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        href="/create"
        className={`
          bg-gradient-to-r from-primary to-secondary
          text-white font-medium px-4 py-3 rounded-full
          shadow-lg hover:shadow-xl
          flex items-center gap-2
          transition-all duration-300
          mobile-touch-target
          ${isAnimating ? 'animate-pulse scale-110' : ''}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${isAnimating ? 'animate-spin' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="relative">
          开始创建
          {isAnimating && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          )}
        </span>
      </Link>
    </div>
  );
}
