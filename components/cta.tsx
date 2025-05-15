'use client';

import Link from 'next/link';

export function Cta() {
  return (
    <div className="mt-0 mb-24 max-w-4xl w-full">
      <div className="glass-card p-6 md:p-10 card-shadow text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 gradient-heading mobile-heading">
          准备创建您的信息图了吗？
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="bg-primary/20 text-primary font-medium text-sm px-4 py-1.5 rounded-full mobile-touch-target">
            免费使用
          </span>
          <span className="bg-secondary/20 text-secondary font-medium text-sm px-4 py-1.5 rounded-full mobile-touch-target">
            无需登录
          </span>
          <span className="bg-purple-100 text-purple-600 font-medium text-sm px-4 py-1.5 rounded-full mobile-touch-target">
            无需经验
          </span>
        </div>

        <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto mobile-text">
          在几秒钟内将您的文本转换为精美的信息图。我们的AI为您处理所有设计工作。
        </p>

        <Link
          href="/create"
          className="btn-gradient text-base md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-lg inline-block mobile-touch-target"
        >
          立即开始创建
        </Link>
      </div>
    </div>
  );
}
