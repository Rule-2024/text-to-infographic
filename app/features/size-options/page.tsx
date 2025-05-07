import Link from 'next/link';

export default function SizeOptionsPage() {
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
          Multiple Size Options for Infographics
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Our AI text to infographic tool offers multiple size options to fit your specific needs, whether you're creating content for presentations, documents, or mobile viewing.
        </p>

        {/* SEO关键词标签 */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full">
            Presentation Format
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full">
            Printable Infographics
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Mobile-Friendly Design
          </span>
          <span className="bg-blue-100 text-blue-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Custom Dimensions
          </span>
        </div>

        {/* 尺寸选项详情 */}
        <div className="space-y-12 mb-16">
          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Presentation Format (16:9)
            </h2>
            <p className="text-muted-foreground mb-4">
              Perfect for slide presentations, this widescreen format (1920×1080 pixels) ensures your infographic looks great when projected or shared on screens. Ideal for business presentations, lectures, and online webinars.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Best for:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Business presentations and pitches</li>
                <li>Educational lectures and webinars</li>
                <li>Conference displays</li>
                <li>Digital signage and displays</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              A4 Landscape Format
            </h2>
            <p className="text-muted-foreground mb-4">
              Designed for printing, this format (297×210 mm) is perfect for handouts, reports, and printed materials. The landscape orientation provides more horizontal space for complex information flows.
            </p>
            <div className="bg-secondary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Best for:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Printed reports and documents</li>
                <li>Handouts for meetings and conferences</li>
                <li>Educational materials</li>
                <li>Marketing collateral</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Mobile Format (Vertical)
            </h2>
            <p className="text-muted-foreground mb-4">
              Our mobile-optimized format (750px width) is designed specifically for viewing on smartphones and tablets. The vertical layout ensures easy scrolling and readability on smaller screens.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Best for:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Social media sharing (Instagram, Pinterest)</li>
                <li>Mobile-first content strategies</li>
                <li>Email marketing campaigns</li>
                <li>Mobile app content</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              A4 Portrait Format
            </h2>
            <p className="text-muted-foreground mb-4">
              This traditional document format (210×297 mm) is perfect for formal reports, academic papers, and professional documents where a vertical orientation is preferred.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Best for:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Academic papers and research</li>
                <li>Formal business reports</li>
                <li>Professional documentation</li>
                <li>Content with vertical information flow</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 行动号召 */}
        <div className="text-center">
          <Link
            href="/create"
            className="btn-gradient text-lg px-8 py-4 rounded-lg inline-block"
          >
            Try Different Sizes Now
          </Link>
        </div>
      </div>
    </main>
  );
}
