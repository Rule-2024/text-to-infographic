'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FeaturesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-24 bg-gradient-to-b from-background to-muted">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 w-full max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl text-center gradient-heading">
          AI Text to Infographic Features
        </h1>
        <p className="mb-12 text-lg text-center text-muted-foreground max-w-3xl mx-auto">
          Discover the powerful features that make our free AI text to infographic tool the best choice for creating stunning visual content from your text, no login required.
        </p>

        {/* SEO优化标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free Infographic Maker
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            AI-Powered Design
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No Login Required
          </span>
        </div>

        {/* 特性卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* 文本分析特性 */}
          <Link href="/features/text-analysis" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Text Analysis</h3>
            <p className="text-muted-foreground">Our AI analyzes your text to identify key points, relationships, and important data to create meaningful infographics.</p>
          </Link>

          {/* 设计风格特性 */}
          <Link href="/features/design-styles" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Design Styles</h3>
            <p className="text-muted-foreground">Choose from various design styles and color schemes that best match your content and purpose.</p>
          </Link>

          {/* 导出选项特性 */}
          <Link href="/features/export-options" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 mb-4 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Export Options</h3>
            <p className="text-muted-foreground">Download your infographics in multiple formats including PNG, JPG, and PDF for different use cases.</p>
          </Link>

          {/* 多种尺寸特性 */}
          <Link href="/features/size-options" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Sizes</h3>
            <p className="text-muted-foreground">Create infographics in various sizes including 16:9 for presentations, A4 for printing, and mobile-friendly vertical formats.</p>
          </Link>

          {/* 语言支持特性 */}
          <Link href="/features/language-support" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 mb-4 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Language Support</h3>
            <p className="text-muted-foreground">Our tool automatically detects and processes text in multiple languages to create infographics in your preferred language.</p>
          </Link>

          {/* 无需登录特性 */}
          <Link href="/features/no-login" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
            <div className="w-12 h-12 mb-4 rounded-full bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Login Required</h3>
            <p className="text-muted-foreground">Use our tool without creating an account. No registration, no login, just instant infographic creation.</p>
          </Link>
        </div>

        {/* 行动号召 */}
        <div className="text-center">
          <Link
            href="/create"
            className="btn-gradient text-lg px-8 py-4 rounded-lg inline-block"
          >
            Start Creating Now
          </Link>
        </div>
      </div>
    </main>
  );
}
