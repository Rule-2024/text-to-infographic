'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { MobileNav } from './mobile-nav'

export function Header() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初始检查
    checkMobile();

    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);

    // 清理函数
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (featuresRef.current && !featuresRef.current.contains(event.target as Node)) {
        setFeaturesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // FAQ点击处理函数
  const handleFaqClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {isMobile ? (
          // 移动端导航
          <div className="w-full">
            <MobileNav />
          </div>
        ) : (
          // 桌面端导航
          <>
            <div className="flex items-center gap-2 ml-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-110">
                  <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" priority />
                </div>
                <span className="text-lg font-medium gradient-text">Text to infographic</span>
              </Link>
            </div>

            <nav className="flex items-center gap-6">
              <Link
                href="/create"
                className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-1.5 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Now
              </Link>

              <div className="relative" ref={featuresRef}>
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className="text-sm font-medium flex items-center gap-1.5 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-secondary hover:after:w-full after:transition-all after:duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Features
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {featuresOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden animate-fadeIn z-50">
                    <div className="py-1">
                      <Link href="/features/text-analysis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-accent-foreground">
                        Text Analysis
                      </Link>
                      <Link href="/features/design-styles" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-accent-foreground">
                        Design Styles
                      </Link>
                      <Link href="/features/export-options" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-accent-foreground">
                        Export Options
                      </Link>
                      <Link href="/features/size-options" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-accent-foreground">
                        Size Options
                      </Link>
                      <Link href="/features/language-support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-accent-foreground">
                        Language Support
                      </Link>
                      <Link href="/features/no-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-accent-foreground">
                        No Login Required
                      </Link>
                      <Link href="/features" className="block px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary">
                        View All Features
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="/#faq-section"
                onClick={handleFaqClick}
                className="text-sm font-medium flex items-center gap-1.5 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-secondary hover:after:w-full after:transition-all after:duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                FAQ
              </a>

              <Link
                href="/auth/sign-in"
                className="gradient-border px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
              </Link>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}