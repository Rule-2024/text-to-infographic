import Link from 'next/link';

export default function ExportOptionsPage() {
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
          AI Infographic Export Options
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Download your AI-generated infographics in multiple formats to suit your specific needs, whether for digital sharing, presentations, or printing - all with our free text to infographic tool.
        </p>

        {/* SEO关键词标签 */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full">
            Multiple Export Formats
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full">
            Free Downloads
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Custom Size Options
          </span>
          <span className="bg-blue-100 text-blue-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Easy Sharing
          </span>
        </div>

        {/* 导出选项详情 */}
        <div className="space-y-12 mb-16">
          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Available Formats
            </h2>
            <p className="text-muted-foreground mb-6">
              Choose from multiple export formats to best suit your needs:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">PNG Format</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  High-quality images with transparent background support. Ideal for digital use and web publishing.
                </p>
                <div className="text-sm font-medium text-primary">
                  Best for: Web & Digital Sharing
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">JPG Format</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Compressed image format with smaller file sizes. Perfect for email attachments and social media sharing.
                </p>
                <div className="text-sm font-medium text-secondary">
                  Best for: Social Media & Email
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">PDF Format</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Vector-based document format that maintains quality at any size. Ideal for printing and professional documents.
                </p>
                <div className="text-sm font-medium text-purple-600">
                  Best for: Printing & Documents
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Size Options
            </h2>
            <p className="text-muted-foreground mb-6">
              Create and export infographics in various sizes to suit different purposes:
            </p>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-blue-50 rounded-lg">
                <div className="w-full md:w-1/4 aspect-video bg-white rounded border border-blue-200 flex items-center justify-center text-blue-600 font-medium">
                  16:9
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="font-medium text-blue-700 mb-1">Landscape 16:9 (1920×1080px)</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for presentations, digital displays, and video content. This widescreen format is the standard for most modern screens and projectors.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-green-50 rounded-lg">
                <div className="w-full md:w-1/4 aspect-[1.414] bg-white rounded border border-green-200 flex items-center justify-center text-green-600 font-medium">
                  A4-L
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="font-medium text-green-700 mb-1">A4 Landscape (297×210mm)</h3>
                  <p className="text-sm text-muted-foreground">
                    Ideal for printed materials and documents. This standard paper size works well for handouts, reports, and printed presentations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-amber-50 rounded-lg">
                <div className="w-full md:w-1/4 aspect-[0.7] bg-white rounded border border-amber-200 flex items-center justify-center text-amber-600 font-medium">
                  A4-P
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="font-medium text-amber-700 mb-1">A4 Portrait (210×297mm)</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for detailed infographics with vertical flow. Suitable for reports, academic papers, and professional documents.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-purple-50 rounded-lg">
                <div className="w-full md:w-1/4 aspect-[0.5625] bg-white rounded border border-purple-200 flex items-center justify-center text-purple-600 font-medium">
                  750px
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="font-medium text-purple-700 mb-1">Mobile Portrait (750px wide)</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimized for mobile devices and social media stories. This vertical format is perfect for sharing on Instagram, Facebook Stories, and other mobile platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Sharing Options
            </h2>
            <p className="text-muted-foreground mb-6">
              In addition to downloading your infographics, you can easily share them:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Direct Link Sharing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generate a shareable link that allows others to view your infographic online without downloading it. Perfect for quick sharing via email, messaging apps, or social media.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Social Media Integration
                </h3>
                <p className="text-sm text-muted-foreground">
                  Coming soon: Direct sharing to popular social media platforms with optimized formatting for each platform. Share your infographics directly to Twitter, LinkedIn, Facebook, and more.
                </p>
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
            Create & Export Now
          </Link>
        </div>
      </div>
    </main>
  );
}
