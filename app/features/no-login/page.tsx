import Link from 'next/link';

export default function NoLoginPage() {
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
          No Login Required - Start Creating Instantly
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Our AI text to infographic tool is completely free to use with no registration or account creation required. Jump straight into creating professional infographics without any barriers.
        </p>

        {/* SEO关键词标签 */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full">
            No Registration
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full">
            Free Infographic Maker
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Instant Access
          </span>
          <span className="bg-blue-100 text-blue-600 font-medium text-sm px-4 py-1.5 rounded-full">
            No Account Needed
          </span>
        </div>

        {/* 无需登录特性详情 */}
        <div className="space-y-12 mb-16">
          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Instant Access Without Barriers
            </h2>
            <p className="text-muted-foreground mb-4">
              Unlike many design tools that require account creation, our platform lets you start creating immediately. No forms to fill out, no passwords to remember, and no verification emails to wait for.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Benefits:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Save time with immediate access to all features</li>
                <li>Perfect for one-time or occasional users</li>
                <li>Ideal for classroom settings and workshops</li>
                <li>No commitment required to try the tool</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Privacy-Focused Approach
            </h2>
            <p className="text-muted-foreground mb-4">
              We respect your privacy and don't require personal information to use our tool. Your content is processed securely, and we don't store your text or infographics permanently without your consent.
            </p>
            <div className="bg-secondary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Our privacy principles:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>No personal data collection required</li>
                <li>Secure processing of your content</li>
                <li>No tracking of individual usage patterns</li>
                <li>Temporary storage only during processing</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Completely Free to Use
            </h2>
            <p className="text-muted-foreground mb-4">
              Our tool is 100% free with no hidden costs or premium features locked behind paywalls. Everyone gets access to the full functionality without any financial commitment.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">What's included for free:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Full access to all design features</li>
                <li>Multiple export formats (PNG, JPG, PDF)</li>
                <li>Various size options for different use cases</li>
                <li>AI-powered text analysis and design</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Optional Account Benefits (Coming Soon)
            </h2>
            <p className="text-muted-foreground mb-4">
              While no login is required to use our tool, we're developing optional account features for users who want additional capabilities like saving designs, creating collections, and more.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Future account features:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Save and organize your infographics</li>
                <li>Create templates for repeated use</li>
                <li>Share directly to social media</li>
                <li>Collaborate with team members</li>
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
            Start Creating Now - No Login Needed
          </Link>
        </div>
      </div>
    </main>
  );
}
