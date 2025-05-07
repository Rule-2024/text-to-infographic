import { TextInputForm } from '@/components/form/text-input-form';

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-16 pb-24 bg-gradient-to-b from-background to-muted">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-heading">
            AI Text to Infographic Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your text into stunning visual infographics in seconds with our AI-powered tool
          </p>
        </div>

        {/* 特点标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            10000 characters limit
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Multiple output formats
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            AI-powered design
          </span>
        </div>

        {/* 安全和速度信息 */}
        <div className="flex justify-center space-x-8 text-sm mb-6">
          <div className="flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="font-medium">Secure Processing</span>
          </div>
          <div className="flex items-center bg-secondary/10 text-secondary px-4 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Results in Seconds</span>
          </div>
        </div>

        {/* 表单卡片 */}
        <div className="glass-card p-8 card-shadow mb-12 animate-fadeIn">
          <TextInputForm />
        </div>

        {/* 底部信息 */}
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground">
            No login required. <span className="text-primary font-medium hover:underline cursor-pointer">Sign in</span> to unlock more features (coming soon)
          </p>
        </div>
      </div>
    </main>
  )
}