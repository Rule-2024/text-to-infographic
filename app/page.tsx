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

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gradient-to-b from-background to-muted">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-8">
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

        {/* 额外特点 */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center gradient-heading">Why Choose Our Text to Infographic Tool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">Multiple Output Formats</h3>
              <p className="text-muted-foreground">Export your infographics in PNG, JPG, and PDF formats</p>
            </div>
            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">Various Size Options</h3>
              <p className="text-muted-foreground">Choose from 16:9, A4 landscape, A4 portrait, and mobile-friendly sizes</p>
            </div>
            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">Supports All Languages</h3>
              <p className="text-muted-foreground">Create infographics in any language you input</p>
            </div>
            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">No Design Skills Needed</h3>
              <p className="text-muted-foreground">Our AI handles all the design work for you automatically</p>
            </div>
          </div>
        </div>

        {/* FAQ部分 - 对SEO非常有帮助 */}
        <div className="mt-16 max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-8 text-center gradient-heading">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">How does the text to infographic AI tool work?</h3>
              <p className="text-muted-foreground">Our AI-powered tool analyzes your text, identifies key points and relationships, and automatically generates a visually appealing infographic that represents your content. The entire process takes just seconds.</p>
            </div>

            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">Is this text to infographic converter really free?</h3>
              <p className="text-muted-foreground">Yes, our text to infographic generator is completely free to use. There are no hidden fees, no credit card required, and no login needed to create and download your infographics.</p>
            </div>

            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">What types of text can I convert to infographics?</h3>
              <p className="text-muted-foreground">You can convert virtually any text up to 5000 characters, including articles, reports, essays, blog posts, research papers, and more. Our AI adapts to different content types to create appropriate infographic styles.</p>
            </div>

            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">Can I customize the infographics generated from my text?</h3>
              <p className="text-muted-foreground">While the current version focuses on automatic generation, you can choose different output sizes including 16:9 (for presentations), A4 landscape, A4 portrait, and mobile-friendly vertical formats. More customization options will be available in future updates.</p>
            </div>

            <div className="glass-card p-6 card-shadow">
              <h3 className="text-lg font-semibold mb-2">How do I download my text-to-infographic conversion?</h3>
              <p className="text-muted-foreground">After your infographic is generated, you'll see download options on the preview page. You can save your infographic in PNG, JPG, or PDF formats with just one click.</p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Free to use, no login required
        </p>
      </div>
    </main>
  )
}