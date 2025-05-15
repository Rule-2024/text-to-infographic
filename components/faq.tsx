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
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-heading">Frequently Asked Questions</h2>

      <div className="space-y-8">
        <div className="glass-card p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(0)}
          >
            <h3 className="text-lg font-semibold">How does the text to infographic AI tool work?</h3>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 0 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 0 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground">Our AI-powered tool analyzes your text, identifies key points and relationships, and automatically generates a visually appealing infographic that represents your content. The entire process takes just seconds.</p>
            </div>
          )}
        </div>

        <div className="glass-card p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(1)}
          >
            <h3 className="text-lg font-semibold">Is this text to infographic converter really free?</h3>
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 1 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 1 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground">Yes, our text to infographic generator is completely free to use. There are no hidden fees, no credit card required, and no login needed to create and download your infographics.</p>
            </div>
          )}
        </div>

        <div className="glass-card p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(2)}
          >
            <h3 className="text-lg font-semibold">What types of text can I convert to infographics?</h3>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 2 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 2 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground">You can convert virtually any text up to 5000 characters, including articles, reports, essays, blog posts, research papers, and more. Our AI adapts to different content types to create appropriate infographic styles.</p>
            </div>
          )}
        </div>

        <div className="glass-card p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(3)}
          >
            <h3 className="text-lg font-semibold">Can I customize the infographics generated from my text?</h3>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 3 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 3 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground">While the current version focuses on automatic generation, you can choose different output sizes including 16:9 (for presentations), A4 landscape, A4 portrait, and mobile-friendly vertical formats. More customization options will be available in future updates.</p>
            </div>
          )}
        </div>

        <div className="glass-card p-7 card-shadow overflow-hidden">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleFaq(4)}
          >
            <h3 className="text-lg font-semibold">How do I download my text-to-infographic conversion?</h3>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300" style={{ transform: expandedFaq === 4 ? 'rotate(180deg)' : 'rotate(0)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {expandedFaq === 4 && (
            <div className="mt-4 animate-fadeIn">
              <p className="text-muted-foreground">After your infographic is generated, you'll see download options on the preview page. You can save your infographic in PNG, JPG, or PDF formats with just one click.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
