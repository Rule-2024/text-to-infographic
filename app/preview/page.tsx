'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExportDialog } from '@/components/export/export-dialog';

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Get generation result
  useEffect(() => {
    if (!id) {
      setError('Missing preview ID parameter');
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/infographic/${id}/status`);

        if (!response.ok) {
          throw new Error('Failed to fetch result');
        }

        const data = await response.json();

        if (data.status === 'completed' && data.result) {
          setHtmlContent(data.result);
          setLoading(false);
        } else if (data.status === 'failed') {
          setError(data.error || 'Generation failed');
          setLoading(false);
        } else {
          // If still processing, redirect to processing page
          window.location.href = `/processing?id=${id}`;
        }
      } catch (err) {
        setError('Failed to load preview');
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gradient-to-b from-background to-muted">
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="glass-card p-8 card-shadow max-w-md text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-bold gradient-heading">Loading Preview</h2>
          <p className="mb-6 text-sm text-muted-foreground">Preparing your infographic for display...</p>
          <div className="h-2 w-64 mx-auto rounded-full bg-muted overflow-hidden">
            <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-primary to-secondary"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gradient-to-b from-background to-muted">
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="glass-card p-8 card-shadow max-w-md text-center relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mb-4 text-2xl font-bold text-destructive">Preview Error</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Link
            href="/create"
            className="btn-gradient inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to Create
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-16 pb-24 bg-gradient-to-b from-background to-muted">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">Your Infographic</h1>
            <p className="text-muted-foreground">Preview and export your AI-generated infographic</p>
          </div>
          <div className="flex gap-4">
            <button
              className="btn-gradient flex items-center gap-2"
              onClick={() => setShowExportDialog(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            <Link
              href="/create"
              className="gradient-border px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New
            </Link>
          </div>
        </div>

        <div className="glass-card card-shadow overflow-auto mb-8">
          {htmlContent ? (
            <div className="relative">
              <iframe
                ref={(iframe) => {
                  if (iframe) {
                    // 设置初始高度
                    iframe.style.height = '80vh';

                    // 创建计数器，防止无限循环
                    let resizeCount = 0;
                    const MAX_RESIZE_COUNT = 5; // 最大调整次数

                    // 检测信息图类型
                    const detectInfographicType = () => {
                      try {
                        if (iframe.contentDocument) {
                          // 检查是否是16:9尺寸信息图
                          const container = iframe.contentDocument.querySelector('.infographic-container');
                          if (container) {
                            const width = (container as HTMLElement).style.width || (container as HTMLElement).offsetWidth;
                            const height = (container as HTMLElement).style.height || (container as HTMLElement).offsetHeight;

                            // 检查是否是16:9尺寸
                            if (width === '1920px' || width === 1920 || height === '1080px' || height === 1080) {
                              return '16-9';
                            }

                            // 检查是否是A4横版
                            if (width === '1123px' || width === 1123 || height === '794px' || height === 794) {
                              return 'a4-l';
                            }

                            // 检查是否是A4竖版
                            if (width === '794px' || width === 794 || height === '1123px' || height === 1123) {
                              return 'a4-p';
                            }
                          }
                        }
                        return 'mobile'; // 默认为移动版
                      } catch (err) {
                        console.error('Failed to detect infographic type:', err);
                        return 'unknown';
                      }
                    };

                    // 防抖函数
                    const debounce = (func: Function, wait: number) => {
                      let timeout: NodeJS.Timeout | null = null;
                      return function(this: any, ...args: any[]) {
                        if (timeout) clearTimeout(timeout);
                        timeout = setTimeout(() => {
                          func.apply(this, args);
                        }, wait);
                      };
                    };

                    // 创建一个ResizeObserver来监视iframe内容变化
                    const resizeObserver = new ResizeObserver(
                      debounce(() => {
                        try {
                          // 如果已经达到最大调整次数，则停止调整
                          if (resizeCount >= MAX_RESIZE_COUNT) {
                            console.log(`Reached max resize count (${MAX_RESIZE_COUNT}), stopping adjustments`);
                            resizeObserver.disconnect();
                            return;
                          }

                          resizeCount++;
                          console.log(`Resize count: ${resizeCount}`);

                          if (iframe.contentWindow && iframe.contentDocument) {
                            const infographicType = detectInfographicType();
                            console.log(`Detected infographic type: ${infographicType}`);

                            // 对于16:9和A4格式，使用特殊处理
                            if (infographicType === '16-9' || infographicType === 'a4-l' || infographicType === 'a4-p') {
                              // 获取容器元素
                              const container = iframe.contentDocument.querySelector('.infographic-container') as HTMLElement;
                              if (container) {
                                // 获取容器的原始尺寸
                                const originalWidth = parseFloat(container.style.width) || container.offsetWidth;
                                const originalHeight = parseFloat(container.style.height) || container.offsetHeight;

                                // 获取iframe父容器的宽度
                                const parentWidth = iframe.parentElement?.offsetWidth || window.innerWidth * 0.8;

                                // 计算缩放比例
                                const scale = Math.min(1, parentWidth / originalWidth);

                                // 设置iframe的高度为缩放后的高度
                                const scaledHeight = originalHeight * scale;
                                iframe.style.height = `${scaledHeight}px`;

                                // 添加样式以确保内容正确缩放和居中
                                const style = document.createElement('style');
                                style.textContent = `
                                  body {
                                    margin: 0;
                                    padding: 0;
                                    display: flex;
                                    justify-content: center;
                                    align-items: flex-start;
                                    min-height: 100vh;
                                  }
                                  .infographic-container {
                                    transform: scale(${scale});
                                    transform-origin: top center;
                                    margin: 0 auto;
                                  }
                                `;

                                // 检查是否已经添加了样式
                                const existingStyle = iframe.contentDocument.querySelector('style[data-scale-style]');
                                if (existingStyle) {
                                  existingStyle.textContent = style.textContent;
                                } else {
                                  style.setAttribute('data-scale-style', 'true');
                                  iframe.contentDocument.head.appendChild(style);
                                }
                              } else {
                                console.warn('Infographic container not found');
                              }
                            } else {
                              // 对于移动版，使用原来的高度调整逻辑
                              const docHeight = Math.max(
                                iframe.contentDocument.body.scrollHeight,
                                iframe.contentDocument.documentElement.scrollHeight,
                                iframe.contentDocument.body.offsetHeight,
                                iframe.contentDocument.documentElement.offsetHeight
                              );

                              // 设置iframe高度，确保完整显示内容
                              if (docHeight > 0) {
                                iframe.style.height = `${docHeight + 20}px`; // 添加一点额外空间
                              }
                            }
                          }
                        } catch (err) {
                          console.error('Failed to adjust iframe height:', err);
                        }
                      }, 200) // 200ms防抖延迟
                    );

                    // 监视iframe加载完成事件
                    iframe.onload = () => {
                      try {
                        if (iframe.contentDocument && iframe.contentDocument.body) {
                          // 重置计数器
                          resizeCount = 0;

                          // 检测信息图类型
                          const infographicType = detectInfographicType();
                          console.log(`Infographic loaded, type: ${infographicType}`);

                          // 开始观察iframe内容变化
                          resizeObserver.observe(iframe.contentDocument.body);

                          // 对于16:9和A4格式，使用特殊处理
                          if (infographicType === '16-9' || infographicType === 'a4-l' || infographicType === 'a4-p') {
                            // 获取容器元素
                            const container = iframe.contentDocument.querySelector('.infographic-container') as HTMLElement;
                            if (container) {
                              // 获取容器的原始尺寸
                              const originalWidth = parseFloat(container.style.width) || container.offsetWidth;
                              const originalHeight = parseFloat(container.style.height) || container.offsetHeight;

                              // 获取iframe父容器的宽度
                              const parentWidth = iframe.parentElement?.offsetWidth || window.innerWidth * 0.8;

                              // 计算缩放比例
                              const scale = Math.min(1, parentWidth / originalWidth);

                              // 设置iframe的高度为缩放后的高度
                              const scaledHeight = originalHeight * scale;
                              iframe.style.height = `${scaledHeight}px`;

                              // 添加样式以确保内容正确缩放和居中
                              const style = document.createElement('style');
                              style.textContent = `
                                body {
                                  margin: 0;
                                  padding: 0;
                                  display: flex;
                                  justify-content: center;
                                  align-items: flex-start;
                                  min-height: 100vh;
                                }
                                .infographic-container {
                                  transform: scale(${scale});
                                  transform-origin: top center;
                                  margin: 0 auto;
                                }
                              `;

                              style.setAttribute('data-scale-style', 'true');
                              iframe.contentDocument.head.appendChild(style);
                            }
                          } else {
                            // 对于移动版，使用原来的高度调整逻辑
                            const docHeight = Math.max(
                              iframe.contentDocument.body.scrollHeight,
                              iframe.contentDocument.documentElement.scrollHeight,
                              iframe.contentDocument.body.offsetHeight,
                              iframe.contentDocument.documentElement.offsetHeight
                            );

                            if (docHeight > 0) {
                              iframe.style.height = `${docHeight + 20}px`;
                            }

                            // 添加样式以确保内容完全可见（仅对移动版）
                            const style = document.createElement('style');
                            style.textContent = `
                              body {
                                margin: 0;
                                padding: 0;
                                overflow: visible !important;
                              }
                              * {
                                max-width: 100% !important;
                              }
                            `;
                            iframe.contentDocument.head.appendChild(style);
                          }
                        }
                      } catch (err) {
                        console.error('Failed to setup iframe:', err);
                      }
                    };
                  }
                }}
                srcDoc={htmlContent}
                className="w-full"
                style={{ border: 'none' }}
                sandbox="allow-same-origin"
                title="Infographic Preview"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => {
                    // 创建全屏预览
                    const win = window.open('', '_blank');
                    if (win) {
                      // 检测信息图类型
                      const detectType = (html: string) => {
                        if (html.includes('width: 1920px') || html.includes('width:1920px') ||
                            html.includes('height: 1080px') || html.includes('height:1080px')) {
                          return '16-9';
                        }
                        if (html.includes('width: 1123px') || html.includes('width:1123px') ||
                            html.includes('height: 794px') || html.includes('height:794px')) {
                          return 'a4-l';
                        }
                        if (html.includes('width: 794px') || html.includes('width:794px') ||
                            html.includes('height: 1123px') || html.includes('height:1123px')) {
                          return 'a4-p';
                        }
                        return 'mobile';
                      };

                      const type = detectType(htmlContent);

                      // 对于16:9和A4格式，添加额外的样式
                      if (type === '16-9' || type === 'a4-l' || type === 'a4-p') {
                        // 添加居中和缩放样式
                        const styleTag = `
                          <style>
                            body {
                              margin: 0;
                              padding: 0;
                              display: flex;
                              justify-content: center;
                              align-items: flex-start;
                              min-height: 100vh;
                              background-color: #f5f5f5;
                            }
                            .infographic-container {
                              margin: 20px auto;
                              max-width: 100%;
                              height: auto;
                            }
                            @media (max-width: 1920px) {
                              .infographic-container {
                                transform: scale(calc(100vw / 1920));
                                transform-origin: top center;
                              }
                            }
                          </style>
                        `;

                        // 在</head>前插入样式
                        let modifiedContent = htmlContent;
                        if (htmlContent.includes('</head>')) {
                          modifiedContent = htmlContent.replace('</head>', `${styleTag}</head>`);
                        } else {
                          modifiedContent = `<html><head>${styleTag}</head><body>${htmlContent}</body></html>`;
                        }

                        win.document.write(modifiedContent);
                      } else {
                        win.document.write(htmlContent);
                      }

                      win.document.close();
                    }
                  }}
                  className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                  title="Open in new window"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-[80vh] w-full items-center justify-center">
              <p className="text-xl text-muted-foreground">No content to preview</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to share this infographic? <span className="text-primary font-medium hover:underline cursor-pointer">Sign in</span> to unlock sharing features (coming soon)
          </p>
        </div>
      </div>

      {/* 导出对话框 */}
      {showExportDialog && htmlContent && (
        <ExportDialog
          htmlContent={htmlContent}
          onClose={() => setShowExportDialog(false)}
        />
      )}
    </main>
  );
}