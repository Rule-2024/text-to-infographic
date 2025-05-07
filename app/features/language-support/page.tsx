import Link from 'next/link';

export default function LanguageSupportPage() {
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
          Multilingual Infographic Creation
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Our AI text to infographic tool supports multiple languages, allowing you to create professional infographics in your preferred language. With automatic language detection and processing, you can easily transform content from around the world into stunning visuals.
        </p>

        {/* SEO关键词标签 */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full">
            Multilingual Support
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full">
            Global Content Creation
          </span>
          <span className="bg-green-100 text-green-600 font-medium text-sm px-4 py-1.5 rounded-full">
            Language Detection
          </span>
          <span className="bg-blue-100 text-blue-600 font-medium text-sm px-4 py-1.5 rounded-full">
            International Infographics
          </span>
        </div>

        {/* 语言支持详情 */}
        <div className="space-y-12 mb-16">
          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Automatic Language Detection
            </h2>
            <p className="text-muted-foreground mb-4">
              Our advanced AI system automatically detects the language of your input text, eliminating the need for manual language selection. Simply paste your content, and our tool will identify the language and process it accordingly.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Key benefits:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Seamless processing of content in any language</li>
                <li>No need to specify language before processing</li>
                <li>Accurate detection of mixed-language content</li>
                <li>Support for special characters and diacritical marks</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Global Language Support
            </h2>
            <p className="text-muted-foreground mb-4">
              Our tool supports a wide range of languages from around the world, including those with non-Latin scripts and right-to-left writing systems. Create infographics in virtually any language your audience uses.
            </p>
            <div className="bg-secondary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Supported language categories:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>European languages (English, Spanish, French, German, Italian, etc.)</li>
                <li>Asian languages (Chinese, Japanese, Korean, Thai, Vietnamese, etc.)</li>
                <li>Middle Eastern languages (Arabic, Hebrew, Persian, etc.)</li>
                <li>Cyrillic-based languages (Russian, Ukrainian, Bulgarian, etc.)</li>
                <li>And many more from around the world</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Proper Text Rendering
            </h2>
            <p className="text-muted-foreground mb-4">
              Our system ensures that all text is properly rendered in the final infographic, with correct character display, appropriate font selection, and proper text direction for languages that read right-to-left.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Text rendering features:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Unicode support for all character sets</li>
                <li>Right-to-left text direction for Arabic, Hebrew, etc.</li>
                <li>Appropriate font selection based on language</li>
                <li>Correct spacing and line breaking for all scripts</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 card-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Culturally Appropriate Design
            </h2>
            <p className="text-muted-foreground mb-4">
              Our AI considers cultural context when generating infographics, selecting appropriate visual elements, color schemes, and design patterns that resonate with the target language and culture.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Cultural design considerations:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Culturally appropriate visual metaphors and symbols</li>
                <li>Color schemes that consider cultural associations</li>
                <li>Layout adaptations for different reading patterns</li>
                <li>Sensitivity to cultural preferences and taboos</li>
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
            Create Infographics in Any Language
          </Link>
        </div>
      </div>
    </main>
  );
}
