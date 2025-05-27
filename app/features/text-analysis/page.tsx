import Link from 'next/link';
import Image from 'next/image';

export default function TextAnalysisPage() {
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
          <Link
            href="/features"
            className="text-sm font-medium flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Features
          </Link>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl gradient-heading">
          AI Text Analysis for Infographics
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Our advanced AI text to infographic technology transforms your content into visually
          appealing infographics by identifying key elements and relationships - completely free,
          with no login required.
        </p>

        {/* SEO关键词标签 */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full">
            Free Text Analysis
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full">
            AI-Powered Infographics
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Key Point Extraction
          </span>
          <span className="bg-blue-100 text-blue-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Data Visualization
          </span>
        </div>

        {/* 特性详情 */}
        <div className="space-y-12 mb-16">
          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Key Point Extraction
            </h2>
            <p className="text-muted-foreground mb-4">
              Our AI automatically identifies the most important points in your text, ensuring that
              your infographic highlights the essential information. This works for various content
              types including articles, reports, essays, and research papers.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">How it works:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>The AI analyzes your text structure and content</li>
                <li>Important sentences and key points are identified</li>
                <li>The system ranks information by relevance</li>
                <li>Top points are selected for inclusion in the infographic</li>
              </ol>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              Data Visualization
            </h2>
            <p className="text-muted-foreground mb-4">
              When your text contains numerical data, statistics, or comparisons, our system
              automatically identifies these elements and represents them visually using appropriate
              charts, graphs, or visual metaphors.
            </p>
            <div className="bg-secondary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Supported data visualizations:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Bar charts for comparisons</li>
                <li>Pie charts for proportions</li>
                <li>Line graphs for trends over time</li>
                <li>Icon-based visualizations for quantities</li>
                <li>Comparison tables for multiple data points</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Processing Modes
            </h2>
            <p className="text-muted-foreground mb-4">
              Choose between two processing modes to control how your text is analyzed and presented
              in the infographic:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-purple-700">Full Text Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Preserves your original content structure and includes all important details. Best
                  for when you want to maintain the complete logical flow of your text.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2 text-blue-700">Summary Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Extracts only the most essential points and key data. Ideal for creating concise
                  infographics from longer texts or when you need to highlight just the core
                  message.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 行动号召 */}
        <div className="text-center">
          <Link href="/create" className="btn-gradient text-lg px-8 py-4 rounded-lg inline-block">
            Try Text Analysis Now
          </Link>
        </div>
      </div>
    </main>
  );
}
