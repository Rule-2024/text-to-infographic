'use client';

import { useState } from 'react';

export function Faq() {
  // 状态管理：跟踪哪个FAQ项目是展开的
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // 切换FAQ项目的展开/折叠状态
  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null); // 如果已经展开，则折叠
    } else {
      setExpandedFaq(index); // 否则展开
    }
  };

  return (
    <div className="mt-0 mb-24 max-w-4xl w-full">
      {/* 添加一个顶部锚点，用于从其他页面跳转时定位 */}
      <div id="faq-section-top" className="h-0"></div>
      <div id="faq-section" className="scroll-mt-16">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-center gradient-heading mobile-heading">常见问题</h2>

      <div className="space-y-8">
        <div className="glass-card p-5 md:p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(0)}
          >
            <h3 className="text-base md:text-lg font-semibold mobile-heading">文本转信息图AI工具是如何工作的？</h3>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 0 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 0 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground mobile-text">我们的AI工具分析您的文本，识别关键点和关系，并自动生成代表您内容的视觉吸引力信息图。整个过程只需几秒钟。</p>
            </div>
          )}
        </div>

        <div className="glass-card p-5 md:p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(1)}
          >
            <h3 className="text-base md:text-lg font-semibold mobile-heading">这个文本转信息图转换器真的免费吗？</h3>
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 1 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 1 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground mobile-text">是的，我们的文本转信息图生成器完全免费使用。没有隐藏费用，不需要信用卡，也不需要登录即可创建和下载您的信息图。</p>
            </div>
          )}
        </div>

        <div className="glass-card p-5 md:p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(2)}
          >
            <h3 className="text-base md:text-lg font-semibold mobile-heading">我可以将哪些类型的文本转换为信息图？</h3>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 2 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 2 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground mobile-text">您可以转换几乎任何不超过10000字符的文本，包括文章、报告、论文、博客文章、研究论文等。我们的AI会适应不同的内容类型，创建适当的信息图风格。</p>
            </div>
          )}
        </div>

        <div className="glass-card p-5 md:p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(3)}
          >
            <h3 className="text-base md:text-lg font-semibold mobile-heading">我可以自定义从文本生成的信息图吗？</h3>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 3 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 3 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground mobile-text">虽然当前版本专注于自动生成，但您可以选择不同的输出尺寸，包括16:9（用于演示文稿）、A4横向、A4纵向和移动友好的垂直格式。未来的更新中将提供更多自定义选项。</p>
            </div>
          )}
        </div>

        <div className="glass-card p-5 md:p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(4)}
          >
            <h3 className="text-base md:text-lg font-semibold mobile-heading">如何下载我的文本转信息图转换结果？</h3>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 4 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 4 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground mobile-text">生成信息图后，您将在预览页面上看到下载选项。只需一键即可将信息图保存为PNG、JPG或PDF格式。</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
