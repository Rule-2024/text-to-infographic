'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  // 关闭菜单的函数
  const closeMenu = () => {
    setIsMenuOpen(false);
    setFeaturesOpen(false);
  };

  // 当菜单打开时禁止背景滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';

      // 添加ESC键关闭菜单
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };

      // 添加事件监听器
      document.addEventListener('keydown', handleEscKey);

      // 清理函数
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscKey);
      };
    } else {
      document.body.style.overflow = '';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMenuOpen]);

  // 处理窗口大小变化，在大屏幕上自动关闭菜单
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  // FAQ点击处理函数
  const handleFaqClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    // 检查是否在首页
    if (window.location.pathname === '/') {
      // 滚动到FAQ部分
      const faqSection = document.querySelector('#faq-section');
      if (faqSection) {
        // 使用scrollIntoView和scroll-margin-top CSS属性来处理滚动
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // 如果不在首页，跳转到首页并添加hash
      window.location.href = '/#faq-section';
    }
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="flex items-center justify-between w-full px-4">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="relative h-10 w-10">
            <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" priority />
          </div>
          <span className="text-base font-medium gradient-text">Text to infographic</span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            setIsMenuOpen(!isMenuOpen);
          }}
          className="mobile-touch-target flex items-center justify-center p-2 rounded-lg z-[101] mobile-menu-button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed left-0 right-0 bottom-0 z-[100] bg-background mobile-menu-container" style={{ top: '64px', height: 'calc(100vh - 64px)' }}>
          <div className="px-4 py-4 flex flex-col gap-6 h-full overflow-auto mobile-menu-content">
            {/* Create Button */}
            <Link
              href="/create"
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 font-medium text-lg w-full"
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Now
            </Link>

            {/* Features Menu */}
            <div className="border-b pb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  setFeaturesOpen(!featuresOpen);
                }}
                className="flex items-center justify-between w-full py-3 text-lg mobile-touch-target"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Features
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {featuresOpen && (
                <div className="pl-7 flex flex-col gap-4 mt-2 mb-2">
                  <Link href="/features/text-analysis" className="py-2 text-muted-foreground mobile-touch-target" onClick={(e) => { e.stopPropagation(); closeMenu(); }}>
                    Text Analysis
                  </Link>
                  <Link href="/features/design-styles" className="py-2 text-muted-foreground mobile-touch-target" onClick={(e) => { e.stopPropagation(); closeMenu(); }}>
                    Design Styles
                  </Link>
                  <Link href="/features/export-options" className="py-2 text-muted-foreground mobile-touch-target" onClick={(e) => { e.stopPropagation(); closeMenu(); }}>
                    Export Options
                  </Link>
                  <Link href="/features/size-options" className="py-2 text-muted-foreground mobile-touch-target" onClick={(e) => { e.stopPropagation(); closeMenu(); }}>
                    Size Options
                  </Link>
                  <Link href="/features/language-support" className="py-2 text-muted-foreground mobile-touch-target" onClick={(e) => { e.stopPropagation(); closeMenu(); }}>
                    Language Support
                  </Link>
                  <Link href="/features/no-login" className="py-2 text-muted-foreground mobile-touch-target" onClick={(e) => { e.stopPropagation(); closeMenu(); }}>
                    No Login Required
                  </Link>
                  <Link href="/features" className="py-2 font-medium text-primary mobile-touch-target" onClick={(e) => { e.stopPropagation(); closeMenu(); }}>
                    View All Features
                  </Link>
                </div>
              )}
            </div>

            {/* FAQ Link */}
            <a
              href="/#faq-section"
              onClick={(e) => {
                e.stopPropagation();
                handleFaqClick(e);
              }}
              className="flex items-center gap-2 py-3 border-b text-lg mobile-touch-target"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </a>

            {/* Sign In Link */}
            <Link
              href="/auth/sign-in"
              className="flex items-center gap-2 py-3 text-lg mobile-touch-target"
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
