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
    // 确保立即恢复滚动
    document.body.style.overflow = '';
  };

  // 当菜单打开时禁止背景滚动
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // 组件卸载时确保恢复原始滚动状态
    return () => {
      document.body.style.overflow = originalStyle;
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
      {/* 移动端导航栏 */}
      <div className="flex items-center justify-between w-full px-4">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="relative h-10 w-10">
            <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" priority />
          </div>
        </Link>

        {/* 汉堡菜单按钮 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-touch-target flex items-center justify-center p-2 rounded-lg"
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

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background pt-16 mobile-scroll">
          <div className="container px-4 py-6 flex flex-col gap-6 h-full overflow-y-auto">
            {/* 创建按钮 */}
            <Link
              href="/create"
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 font-medium text-lg"
              onClick={closeMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              创建信息图
            </Link>

            {/* 功能菜单 */}
            <div className="border-b pb-4">
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="flex items-center justify-between w-full py-3 text-lg"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  功能特点
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
                  <Link href="/features/text-analysis" className="py-2 text-muted-foreground" onClick={closeMenu}>
                    文本分析
                  </Link>
                  <Link href="/features/design-styles" className="py-2 text-muted-foreground" onClick={closeMenu}>
                    设计风格
                  </Link>
                  <Link href="/features/export-options" className="py-2 text-muted-foreground" onClick={closeMenu}>
                    导出选项
                  </Link>
                  <Link href="/features/size-options" className="py-2 text-muted-foreground" onClick={closeMenu}>
                    尺寸选项
                  </Link>
                  <Link href="/features/language-support" className="py-2 text-muted-foreground" onClick={closeMenu}>
                    语言支持
                  </Link>
                  <Link href="/features/no-login" className="py-2 text-muted-foreground" onClick={closeMenu}>
                    无需登录
                  </Link>
                  <Link href="/features" className="py-2 font-medium text-primary" onClick={closeMenu}>
                    查看所有功能
                  </Link>
                </div>
              )}
            </div>

            {/* FAQ链接 */}
            <a
              href="/#faq-section"
              onClick={handleFaqClick}
              className="flex items-center gap-2 py-3 border-b text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              常见问题
            </a>

            {/* 登录链接 */}
            <Link
              href="/auth/sign-in"
              className="flex items-center gap-2 py-3 text-lg"
              onClick={closeMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              登录
            </Link>

            {/* 关闭菜单按钮 */}
            <button
              onClick={closeMenu}
              className="mt-6 py-4 w-full flex items-center justify-center gap-2 border-t border-border/50 text-muted-foreground mobile-touch-target"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              关闭菜单
            </button>
          </div>
        </div>
      )}
    </>
  )
}
