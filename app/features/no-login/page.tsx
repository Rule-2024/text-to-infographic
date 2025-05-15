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
            返回功能列表
          </Link>
        </div>

        <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-heading mobile-heading">
          无需登录 - 立即开始创建
        </h1>
        <p className="mb-6 text-base md:text-lg text-muted-foreground mobile-text">
          我们的AI文本转信息图工具完全免费使用，无需注册或创建账户。直接开始创建专业信息图，没有任何障碍。
        </p>

        {/* SEO关键词标签 */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full mobile-touch-target">
            无需注册
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full mobile-touch-target">
            免费信息图制作
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full mobile-touch-target">
            即时访问
          </span>
          <span className="bg-blue-100 text-blue-600 font-medium text-sm px-4 py-1.5 rounded-full mobile-touch-target">
            无需账户
          </span>
        </div>

        {/* 无需登录特性详情 */}
        <div className="space-y-12 mb-16">
          <div className="glass-card p-6 md:p-8 card-shadow">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2 mobile-heading">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              无障碍即时访问
            </h2>
            <p className="text-muted-foreground mb-4 mobile-text">
              与许多需要创建账户的设计工具不同，我们的平台让您可以立即开始创建。无需填写表格，无需记住密码，也无需等待验证邮件。
            </p>
            <div className="bg-primary/5 p-4 rounded-lg mobile-spacing">
              <h3 className="font-medium mb-2">优势：</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mobile-text">
                <li>立即访问所有功能，节省时间</li>
                <li>非常适合一次性或偶尔使用的用户</li>
                <li>适合课堂环境和工作坊</li>
                <li>尝试工具无需任何承诺</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 card-shadow">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2 mobile-heading">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              注重隐私的方法
            </h2>
            <p className="text-muted-foreground mb-4 mobile-text">
              我们尊重您的隐私，使用我们的工具不需要个人信息。您的内容会被安全处理，未经您的同意，我们不会永久存储您的文本或信息图。
            </p>
            <div className="bg-secondary/5 p-4 rounded-lg mobile-spacing">
              <h3 className="font-medium mb-2">我们的隐私原则：</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mobile-text">
                <li>无需收集个人数据</li>
                <li>安全处理您的内容</li>
                <li>不跟踪个人使用模式</li>
                <li>仅在处理期间临时存储</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 card-shadow">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2 mobile-heading">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              完全免费使用
            </h2>
            <p className="text-muted-foreground mb-4 mobile-text">
              我们的工具100%免费，没有隐藏费用或付费墙后的高级功能。每个人都可以在没有任何财务承诺的情况下访问全部功能。
            </p>
            <div className="bg-purple-50 p-4 rounded-lg mobile-spacing">
              <h3 className="font-medium mb-2">免费包含的内容：</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mobile-text">
                <li>完全访问所有设计功能</li>
                <li>多种导出格式（PNG、JPG、PDF）</li>
                <li>适用于不同用例的各种尺寸选项</li>
                <li>AI驱动的文本分析和设计</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 card-shadow">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2 mobile-heading">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              可选账户优势（即将推出）
            </h2>
            <p className="text-muted-foreground mb-4 mobile-text">
              虽然使用我们的工具不需要登录，但我们正在为希望获得额外功能的用户开发可选账户功能，如保存设计、创建收藏等。
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mobile-spacing">
              <h3 className="font-medium mb-2">未来账户功能：</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mobile-text">
                <li>保存和整理您的信息图</li>
                <li>创建模板以便重复使用</li>
                <li>直接分享到社交媒体</li>
                <li>与团队成员协作</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 行动号召 */}
        <div className="text-center">
          <Link
            href="/create"
            className="btn-gradient text-base md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-lg inline-block mobile-touch-target"
          >
            立即开始创建 - 无需登录
          </Link>
        </div>
      </div>
    </main>
  );
}
