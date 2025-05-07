import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text to Infographic | Free AI Tool to Create Infographics in Seconds',
  description: 'Create infographics from text instantly with our AI text visualization tool. Convert articles to visual infographics in seconds. Online infographic maker with multiple formats, no design skills needed, 100% free with no login required.',
  alternates: {
    canonical: 'https://texttoinfographic.online',
  },
  keywords: ['text to infographic', 'ai text to infographic', 'text to infographic ai free', 'convert text to infographic', 'free infographic maker', 'ai infographic generator', 'infographic from text', 'no login infographic'],
  openGraph: {
    title: 'Text to Infographic | Free AI Tool to Create Infographics in Seconds',
    description: 'Create infographics from text instantly with our AI text visualization tool. Convert articles to visual infographics in seconds. Online infographic maker with multiple formats, no design skills needed, 100% free with no login required.',
    url: 'https://texttoinfographic.online',
    siteName: 'Text to Infographic',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://texttoinfographic.online/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Text to Infographic - AI-powered infographic generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text to Infographic | Free AI Tool to Create Infographics in Seconds',
    description: 'Create infographics from text instantly with our AI text visualization tool. The easiest way to convert text to visual infographics online. Free, no login required.',
    images: ['https://texttoinfographic.online/images/twitter-card.png'],
  },
}

import { Faq } from '@/components/faq';
import { Cta } from '@/components/cta';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 pb-12 bg-gradient-to-b from-background to-muted">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl gradient-heading">
          Text to Infographic AI Generator
        </h1>

        {/* 显眼的优势标语 */}
        <div className="flex flex-nowrap justify-center gap-2 mb-6 max-w-4xl mx-auto overflow-x-auto md:overflow-visible py-2 px-1">
          <div className="bg-gradient-to-r from-primary/90 to-primary text-white font-medium text-sm px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              100% Free
            </span>
          </div>
          <div className="bg-gradient-to-r from-secondary/90 to-secondary text-white font-medium text-sm px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No Login Required
            </span>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium text-sm px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No Design Skills Needed
            </span>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unlimited Generations
            </span>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
          Instantly convert your text to beautiful infographics using AI,
          <span className="block mt-2">100% free with no design experience needed</span>
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground">
          Transform articles, reports, essays, and any text into professional infographics in seconds
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <a
          href="/create"
          className="btn-gradient mb-8 text-lg"
        >
          Start Creating
        </a>

        {/* 特点卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-8 mb-24">
          <div className="glass-card p-6 card-shadow">
            <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Text to Infographic Conversion</h3>
            <p className="text-muted-foreground">Generate professional infographics from text in seconds, not hours</p>
          </div>

          <div className="glass-card p-6 card-shadow">
            <div className="w-12 h-12 mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Infographic Design</h3>
            <p className="text-muted-foreground">Smart layouts and visuals that automatically enhance your content</p>
          </div>

          <div className="glass-card p-6 card-shadow">
            <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Infographic Generator</h3>
            <p className="text-muted-foreground">100% free to use with no account creation required</p>
          </div>
        </div>

        {/* 功能亮点部分 - 增加内部链接 */}
        <div className="mt-0 mb-24 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-heading">Explore Our Features</h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Discover the powerful features that make our AI text to infographic tool the best choice for creating stunning visual content
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a href="/features/text-analysis" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Text Analysis</h3>
              <p className="text-muted-foreground mb-4">Our AI analyzes your text to identify key points and important data</p>
              <span className="text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/features/design-styles" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Styles</h3>
              <p className="text-muted-foreground mb-4">Choose from various design styles and color schemes for your infographics</p>
              <span className="text-secondary font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/features/export-options" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 mb-4 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Export Options</h3>
              <p className="text-muted-foreground mb-4">Download your infographics in multiple formats including PNG, JPG, and PDF</p>
              <span className="text-purple-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/features/size-options" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Size Options</h3>
              <p className="text-muted-foreground mb-4">Create infographics in various sizes including 16:9, A4, and mobile formats</p>
              <span className="text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/features/language-support" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 mb-4 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Language Support</h3>
              <p className="text-muted-foreground mb-4">Create infographics in multiple languages with automatic language detection</p>
              <span className="text-green-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/features/no-login" className="glass-card p-6 card-shadow hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 mb-4 rounded-full bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Login Required</h3>
              <p className="text-muted-foreground mb-4">Use our tool without creating an account, just instant infographic creation</p>
              <span className="text-amber-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>

          <div className="text-center mt-8">
            <a href="/features" className="btn-gradient inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View All Features
            </a>
          </div>
        </div>

        {/* 额外特点 */}
        <div className="mt-0 mb-24 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-heading">Why Choose Our Text to Infographic Tool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-7 card-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 mr-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Multiple Output Formats</h3>
              </div>
              <p className="text-muted-foreground">Export your infographics in PNG, JPG, and PDF formats</p>
            </div>
            <div className="glass-card p-7 card-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 mr-3 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M6 12h12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Various Size Options</h3>
              </div>
              <p className="text-muted-foreground">Choose from 16:9, A4 landscape, A4 portrait, and mobile-friendly sizes</p>
            </div>
            <div className="glass-card p-7 card-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 mr-3 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Supports All Languages</h3>
              </div>
              <p className="text-muted-foreground">Create infographics in any language you input</p>
            </div>
            <div className="glass-card p-7 card-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 mr-3 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">No Design Skills Needed</h3>
              </div>
              <p className="text-muted-foreground">Our AI handles all the design work for you automatically</p>
            </div>
          </div>
        </div>

        {/* FAQ部分 - 对SEO非常有帮助 */}
        <Faq />

        {/* CTA部分 */}
        <Cta />
      </div>
    </main>
  )
}