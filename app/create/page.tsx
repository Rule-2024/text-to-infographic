import { TextInputForm } from '@/components/form/text-input-form';

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-16 pb-24 bg-gradient-to-b from-background to-muted overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-heading">
            AI Text to Infographic Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your text into stunning visual infographics in seconds with our AI-powered tool
          </p>
        </div>

        {/* 显眼的优势标语 - 移动端优化 */}
        <div className="grid grid-cols-2 md:flex md:flex-nowrap justify-center gap-2 mb-6 max-w-4xl mx-auto md:overflow-visible py-2 px-1">
          <div className="bg-gradient-to-r from-primary/90 to-primary text-white font-medium text-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              100% Free
            </span>
          </div>
          <div className="bg-gradient-to-r from-secondary/90 to-secondary text-white font-medium text-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No Login
            </span>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium text-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No Design Skills
            </span>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap">
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Unlimited
            </span>
          </div>
        </div>

        {/* 特点标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Results in Seconds</span>
          </div>
          <div className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Professional Design</span>
          </div>
          <div className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="font-medium">Multiple Formats</span>
          </div>
          <div className="bg-blue-100 text-blue-600 font-medium text-sm px-4 py-1.5 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">10000 characters limit</span>
          </div>
        </div>

        {/* 安全和速度信息 - 移动端优化 */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
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

        {/* 表单卡片 - 移动端优化 */}
        <div className="glass-card p-4 sm:p-6 md:p-8 card-shadow mb-8 md:mb-12 animate-fadeIn w-full">
          <TextInputForm />
        </div>

        {/* 底部信息 */}
        <div className="text-center mb-8 md:mb-16">
          <p className="text-sm text-muted-foreground">
            No login required. <span className="text-primary font-medium hover:underline cursor-pointer">Sign in</span> to unlock more features (coming soon)
          </p>
        </div>

        {/* 移动端特性说明 */}
        <div className="md:hidden w-full mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center gradient-text">Why Choose Our Tool?</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="glass-card p-4 card-shadow">
              <div className="flex items-start">
                <div className="w-10 h-10 mr-3 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium mb-1">Fast Conversion</h4>
                  <p className="text-sm text-muted-foreground">Generate professional infographics from text in seconds, not hours</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4 card-shadow">
              <div className="flex items-start">
                <div className="w-10 h-10 mr-3 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium mb-1">Multiple Formats</h4>
                  <p className="text-sm text-muted-foreground">Choose from various sizes and export formats for your needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}