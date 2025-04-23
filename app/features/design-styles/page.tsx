'use client';

import Link from 'next/link';

export default function DesignStylesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-24 bg-gradient-to-b from-background to-muted">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-8">
          <Link href="/features" className="text-sm font-medium flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Features
          </Link>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl gradient-heading">
          AI Infographic Design Styles
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Our free AI text to infographic tool automatically applies professional design principles to create visually appealing infographics that effectively communicate your content.
        </p>

        {/* SEO关键词标签 */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full">
            Free Infographic Templates
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full">
            AI-Generated Designs
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Professional Color Schemes
          </span>
          <span className="bg-blue-100 text-blue-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Automatic Layout Selection
          </span>
        </div>

        {/* 设计风格展示 */}
        <div className="space-y-12 mb-16">
          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Color Schemes
            </h2>
            <p className="text-muted-foreground mb-6">
              Our AI selects harmonious color palettes that enhance readability and visual appeal while maintaining professional aesthetics suitable for your content.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-full h-24 rounded-lg mb-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <span className="text-sm text-muted-foreground">Professional</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-24 rounded-lg mb-2 bg-gradient-to-r from-green-400 to-teal-500"></div>
                <span className="text-sm text-muted-foreground">Nature</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-24 rounded-lg mb-2 bg-gradient-to-r from-orange-400 to-pink-500"></div>
                <span className="text-sm text-muted-foreground">Energetic</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-24 rounded-lg mb-2 bg-gradient-to-r from-gray-700 to-gray-900"></div>
                <span className="text-sm text-muted-foreground">Corporate</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Layout Templates
            </h2>
            <p className="text-muted-foreground mb-6">
              Our system automatically selects the most appropriate layout based on your content type, ensuring optimal organization and visual hierarchy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-full h-8 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-4 mb-4">
                  <div className="w-1/3 h-32 bg-gray-200 rounded"></div>
                  <div className="w-2/3 space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
                <p className="text-center mt-4 text-sm text-muted-foreground">Informational Layout</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-full h-8 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
                <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <p className="text-center mt-4 text-sm text-muted-foreground">Data-Focused Layout</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Visual Elements
            </h2>
            <p className="text-muted-foreground mb-6">
              Our AI enhances your infographics with appropriate visual elements that complement your content and improve understanding.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">Charts</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">Graphs</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">Icons</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">Lists</span>
              </div>
            </div>
          </div>
        </div>

        {/* 行动号召 */}
        <div className="text-center">
          <Link
            href="/create"
            className="btn-gradient text-lg px-8 py-4 rounded-lg inline-block"
          >
            Create Your Infographic
          </Link>
        </div>
      </div>
    </main>
  );
}
