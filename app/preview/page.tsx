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
    <main className="flex min-h-screen flex-col items-center p-3 sm:p-6 md:p-16 pb-24 bg-gradient-to-b from-background to-muted">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-heading">Your Infographic</h1>
            <p className="text-sm md:text-base text-muted-foreground">Preview and export your AI-generated infographic</p>
          </div>
          <div className="flex gap-3 md:gap-4 mt-2 md:mt-0">
            <button
              className="btn-gradient flex items-center gap-1.5 md:gap-2 py-2 px-3 md:px-4 text-sm md:text-base"
              onClick={() => setShowExportDialog(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            <Link
              href="/create"
              className="gradient-border px-3 md:px-4 py-2 text-sm md:text-base font-medium transition-all duration-300 hover:shadow-md flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden xs:inline">Create</span> New
            </Link>
          </div>
        </div>

        <div className="glass-card card-shadow overflow-hidden mb-8 mobile-preview-container">
          {htmlContent ? (
            <div className="relative">
              <iframe
                className="mobile-preview-iframe w-full"
                ref={(iframe) => {
                  if (iframe) {
                    // 设置初始高度 - 移动端使用更小的初始高度以避免过长的空白
                    const isMobile = window.innerWidth < 768;
                    iframe.style.height = isMobile ? '50vh' : '80vh';

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

                            // 检查是否是移动版 (750px宽)
                            if (width === '750px' || width === 750) {
                              return 'mobile';
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

                            // 获取设备宽度和检查是否为移动设备
                            const deviceWidth = window.innerWidth;
                            const isMobile = deviceWidth < 768; // 移动设备断点

                            // 获取容器元素
                            const container = iframe.contentDocument.querySelector('.infographic-container') as HTMLElement;
                            if (!container) {
                              console.warn('Infographic container not found');
                              return;
                            }

                            // 获取容器的原始尺寸
                            const originalWidth = parseFloat(container.style.width) || container.offsetWidth;
                            const originalHeight = parseFloat(container.style.height) || container.offsetHeight;

                            // 获取iframe父容器的宽度
                            const parentWidth = iframe.parentElement?.offsetWidth || window.innerWidth * 0.9;

                            // 计算缩放比例 - 为移动设备留出边距
                            const scale = Math.min(1, (parentWidth - (isMobile ? 16 : 32)) / originalWidth);

                            // 设置iframe的高度为缩放后的高度
                            const scaledHeight = originalHeight * scale;
                            iframe.style.height = `${scaledHeight + (isMobile ? 40 : 20)}px`; // 移动端添加更多额外空间

                            // 添加样式以确保内容正确缩放和居中
                            const style = document.createElement('style');

                            if (infographicType === '16-9' || infographicType === 'a4-l' || infographicType === 'a4-p') {
                              // 对于16:9和A4格式，使用特殊处理
                              style.textContent = `
                                body {
                                  margin: 0;
                                  padding: 0;
                                  display: flex;
                                  justify-content: center;
                                  align-items: flex-start;
                                  min-height: 100vh;
                                  overflow-x: hidden;
                                }
                                .infographic-container {
                                  transform: scale(${scale});
                                  transform-origin: top center;
                                  margin: 0 auto;
                                }
                                ${isMobile ? `
                                /* 移动设备优化 */
                                .infographic-container * {
                                  font-size: 120% !important;
                                  line-height: 1.5 !important;
                                }
                                /* 确保推广链接可见 */
                                .promo-link, .promo-link * {
                                  font-size: 14px !important;
                                  padding: 5px !important;
                                  background: rgba(255,255,255,0.8) !important;
                                  z-index: 1000 !important;
                                }
                                ` : ''}
                              `;
                            } else {
                              // 对于移动版，使用优化的样式
                              style.textContent = `
                                body {
                                  margin: 0;
                                  padding: 0;
                                  overflow-x: hidden;
                                }
                                .infographic-container {
                                  width: 100% !important;
                                  max-width: ${parentWidth}px !important;
                                  margin: 0 auto;
                                }
                                * {
                                  max-width: 100% !important;
                                  box-sizing: border-box !important;
                                }
                                /* 确保推广链接可见 */
                                .promo-link, .promo-link * {
                                  font-size: 14px !important;
                                  padding: 5px !important;
                                  background: rgba(255,255,255,0.8) !important;
                                  z-index: 1000 !important;
                                }
                              `;

                              // 对于移动版，使用原来的高度调整逻辑
                              const docHeight = Math.max(
                                iframe.contentDocument.body.scrollHeight,
                                iframe.contentDocument.documentElement.scrollHeight,
                                iframe.contentDocument.body.offsetHeight,
                                iframe.contentDocument.documentElement.offsetHeight
                              );

                              // 设置iframe高度，确保完整显示内容
                              if (docHeight > 0) {
                                iframe.style.height = `${docHeight + 40}px`; // 添加更多额外空间
                              }
                            }

                            // 检查是否已经添加了样式
                            const existingStyle = iframe.contentDocument.querySelector('style[data-scale-style]');
                            if (existingStyle) {
                              existingStyle.textContent = style.textContent;
                            } else {
                              style.setAttribute('data-scale-style', 'true');
                              iframe.contentDocument.head.appendChild(style);
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

                          // 获取设备宽度和检查是否为移动设备
                          const deviceWidth = window.innerWidth;
                          const isMobile = deviceWidth < 768; // 移动设备断点

                          // 调用专门的函数来优化移动端显示
                          adjustIframeForMobile(iframe, infographicType, isMobile);

                          // 添加窗口大小变化监听，以便在旋转设备或调整窗口大小时重新调整
                          const handleResize = debounce(() => {
                            adjustIframeForMobile(iframe, infographicType, window.innerWidth < 768);
                          }, 250);

                          window.addEventListener('resize', handleResize);

                          // 在组件卸载时移除事件监听器
                          return () => {
                            window.removeEventListener('resize', handleResize);
                          };
                        }
                      } catch (err) {
                        console.error('Failed to setup iframe:', err);
                      }
                    };

                    // 专门的函数来优化移动端显示
                    const adjustIframeForMobile = (iframe: HTMLIFrameElement, infographicType: string, isMobile: boolean) => {
                      try {
                        if (!iframe.contentDocument) return;

                        // 获取容器元素
                        const container = iframe.contentDocument.querySelector('.infographic-container') as HTMLElement;
                        if (!container) {
                          console.warn('Infographic container not found');
                          return;
                        }

                        // 获取容器的原始尺寸
                        const originalWidth = parseFloat(container.style.width) || container.offsetWidth;
                        const originalHeight = parseFloat(container.style.height) || container.offsetHeight;

                        // 获取iframe父容器的宽度
                        const parentWidth = iframe.parentElement?.offsetWidth || window.innerWidth * 0.9;

                        // 计算缩放比例 - 为移动设备留出边距
                        // 增加移动设备的边距，确保内容不会太靠近屏幕边缘
                        const scale = Math.min(1, (parentWidth - (isMobile ? 24 : 32)) / originalWidth);

                        // 检测是否是横版信息图
                        const isLandscape = infographicType === '16-9' || infographicType === 'a4-l';

                        // 添加样式以确保内容正确缩放和居中
                        const style = document.createElement('style');

                        if (infographicType === '16-9' || infographicType === 'a4-l' || infographicType === 'a4-p') {
                          // 计算最佳缩放比例 - 横版信息图需要更多缩放
                          let optimalScale = scale;
                          if (isMobile) {
                            // 移动设备上，横版信息图需要更多缩放
                            if (isLandscape) {
                              optimalScale = Math.min(0.9, (parentWidth - 20) / originalWidth);
                            }
                          }

                          // 对于16:9和A4格式，使用特殊处理
                          style.textContent = `
                            body {
                              margin: 0;
                              padding: 0;
                              display: flex;
                              justify-content: center;
                              align-items: flex-start;
                              min-height: 100vh;
                              overflow-x: auto;
                              background-color: transparent !important;
                            }
                            .infographic-container {
                              transform: scale(${optimalScale});
                              transform-origin: top center;
                              margin: 0 auto;
                              width: ${originalWidth}px !important;
                              height: ${originalHeight}px !important;
                              overflow: visible !important;
                              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                            }
                            ${isMobile ? `
                            /* 移动设备优化 */
                            .infographic-container * {
                              line-height: 1.4 !important;
                            }
                            /* 确保推广链接可见 */
                            .promo-link, .promo-link * {
                              font-size: 14px !important;
                              padding: 5px !important;
                              background: rgba(255,255,255,0.8) !important;
                              z-index: 1000 !important;
                              position: relative !important;
                            }

                            /* 横版信息图提示 */
                            ${isLandscape ? `
                            .landscape-hint {
                              position: fixed;
                              bottom: 70px;
                              left: 50%;
                              transform: translateX(-50%);
                              background: rgba(0,0,0,0.7);
                              color: white;
                              padding: 8px 16px;
                              border-radius: 20px;
                              font-size: 12px;
                              z-index: 1000;
                              display: flex;
                              align-items: center;
                              gap: 8px;
                              box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                            }
                            ` : ''}
                            ` : ''}
                          `;

                          // 设置iframe的高度为缩放后的高度，加上额外空间
                          const scaledHeight = originalHeight * optimalScale;

                          // 为不同类型的信息图添加不同的额外空间
                          let extraSpace = 40;
                          if (isLandscape) {
                            // 横版信息图需要更多空间
                            extraSpace = isMobile ? 80 : 60;

                            // 添加横版提示元素
                            if (isMobile) {
                              // 检查是否已存在提示
                              if (!iframe.contentDocument.querySelector('.landscape-hint')) {
                                const hintDiv = document.createElement('div');
                                hintDiv.className = 'landscape-hint';
                                hintDiv.innerHTML = '提示：横向旋转设备可获得更好体验 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12H3M3 12L8 7M3 12L8 17"></path></svg>';
                                iframe.contentDocument.body.appendChild(hintDiv);
                              }
                            }
                          } else if (infographicType === 'a4-p') {
                            // A4竖版需要更多空间
                            extraSpace = isMobile ? 100 : 80;
                          }

                          iframe.style.height = `${scaledHeight + extraSpace}px`; // 添加额外空间
                        } else {
                          // 对于移动版，使用优化的样式
                          style.textContent = `
                            body {
                              margin: 0;
                              padding: 0;
                              overflow-x: hidden;
                              background-color: transparent !important;
                            }
                            .infographic-container {
                              width: 100% !important;
                              max-width: ${parentWidth}px !important;
                              margin: 0 auto;
                              padding: 0 !important;
                            }
                            * {
                              max-width: 100% !important;
                              box-sizing: border-box !important;
                            }
                            img, svg {
                              height: auto !important;
                              max-width: 100% !important;
                            }
                            /* 确保推广链接可见 */
                            .promo-link, .promo-link * {
                              font-size: 14px !important;
                              padding: 5px !important;
                              background: rgba(255,255,255,0.8) !important;
                              z-index: 1000 !important;
                              position: relative !important;
                            }
                          `;

                          // 对于移动版，使用改进的高度调整逻辑
                          // 等待一小段时间以确保内容完全渲染
                          setTimeout(() => {
                            try {
                              if (!iframe.contentDocument) return;

                              const docHeight = Math.max(
                                iframe.contentDocument.body.scrollHeight,
                                iframe.contentDocument.documentElement.scrollHeight,
                                iframe.contentDocument.body.offsetHeight,
                                iframe.contentDocument.documentElement.offsetHeight,
                                container.scrollHeight,
                                container.offsetHeight
                              );

                              // 设置iframe高度，确保完整显示内容，添加更多额外空间
                              if (docHeight > 0) {
                                iframe.style.height = `${docHeight + (isMobile ? 80 : 40)}px`;
                              }
                            } catch (err) {
                              console.error('Failed to adjust iframe height in timeout:', err);
                            }
                          }, 300);
                        }

                        // 检查是否已经添加了样式
                        const existingStyle = iframe.contentDocument.querySelector('style[data-scale-style]');
                        if (existingStyle) {
                          existingStyle.textContent = style.textContent;
                        } else {
                          style.setAttribute('data-scale-style', 'true');
                          iframe.contentDocument.head.appendChild(style);
                        }
                      } catch (err) {
                        console.error('Failed to adjust iframe for mobile:', err);
                      }
                    };
                  }
                }}
                srcDoc={htmlContent}
                style={{
                  border: 'none',
                  display: 'block',
                  margin: '0 auto',
                  backgroundColor: 'transparent'
                }}
                sandbox="allow-same-origin"
                title="Infographic Preview"
              />
              <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 md:gap-3">
                {/* 全屏/放大按钮 - 在移动端使用更大的按钮 */}
                <button
                  onClick={() => {
                    // 获取iframe元素
                    const iframe = document.querySelector('.mobile-preview-iframe') as HTMLIFrameElement;
                    if (!iframe) return;

                    // 检测信息图类型
                    const infographicType = iframe.contentDocument?.querySelector('.infographic-container') ?
                      (iframe.contentDocument?.querySelector('.infographic-container') as HTMLElement).style.width === '1920px' ? '16-9' :
                      (iframe.contentDocument?.querySelector('.infographic-container') as HTMLElement).style.width === '1123px' ? 'a4-l' :
                      (iframe.contentDocument?.querySelector('.infographic-container') as HTMLElement).style.width === '794px' ? 'a4-p' : 'mobile'
                      : 'unknown';

                    // 检测是否是横版信息图
                    const isLandscape = infographicType === '16-9' || infographicType === 'a4-l';

                    // 检测设备方向
                    const isDeviceLandscape = window.innerWidth > window.innerHeight;

                    // 如果是横版信息图且设备处于竖屏状态，提示用户旋转设备
                    if (isLandscape && !isDeviceLandscape && window.innerWidth < 768) {
                      alert('为了更好地查看横版信息图，请将设备旋转至横屏模式');
                    }

                    // 打开全屏预览
                    const win = window.open('', '_blank');
                    if (win && htmlContent) {
                      // 添加优化的全屏样式
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
                            overflow: auto;
                          }

                          .infographic-container {
                            margin: 20px auto;
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                            max-width: 100%;
                            max-height: 100%;
                            overflow: visible !important;
                          }

                          /* 横版信息图的特殊处理 */
                          ${isLandscape ? `
                          @media (orientation: landscape) {
                            body {
                              align-items: center;
                              padding: 0;
                            }
                            .infographic-container {
                              max-width: 98vw;
                              max-height: 98vh;
                              transform: scale(0.98);
                              transform-origin: center;
                              margin: 0 auto;
                            }
                          }
                          ` : ''}

                          /* 竖版信息图的特殊处理 */
                          ${!isLandscape ? `
                          .infographic-container {
                            max-width: 98vw;
                            transform-origin: top center;
                          }
                          ` : ''}

                          /* 确保推广链接可见 */
                          .promo-link, .promo-link * {
                            font-size: 14px !important;
                            padding: 5px !important;
                            background: rgba(255,255,255,0.8) !important;
                            z-index: 1000 !important;
                            position: relative !important;
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
                      win.document.close();
                    }
                  }}
                  className="bg-secondary text-white p-3 md:p-2 rounded-full md:rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center md:justify-start gap-1.5 w-12 h-12 md:w-auto md:h-auto"
                  aria-label="Fullscreen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                  <span className="hidden md:inline">全屏查看</span>
                </button>

                {/* 导出按钮 - 在移动端使用更大的按钮 */}
                <button
                  onClick={() => setShowExportDialog(true)}
                  className="bg-primary text-white p-3 md:p-2 rounded-full md:rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center md:justify-start gap-1.5 w-12 h-12 md:w-auto md:h-auto"
                  aria-label="Export"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden md:inline">导出</span>
                </button>

                {/* 新窗口打开按钮 - 在移动端使用更大的按钮 */}
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
                        if (html.includes('width: 750px') || html.includes('width:750px')) {
                          return 'mobile';
                        }
                        return 'mobile';
                      };

                      const type = detectType(htmlContent);
                      const isMobile = window.innerWidth < 768;

                      // 添加优化的样式
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
                            overflow-x: hidden;
                          }

                          ${type === '16-9' || type === 'a4-l' || type === 'a4-p' ? `
                          .infographic-container {
                            margin: ${isMobile ? '20px' : '30px'} auto;
                            width: ${type === '16-9' ? '1920px' : type === 'a4-l' ? '1123px' : '794px'} !important;
                            height: ${type === '16-9' ? '1080px' : type === 'a4-l' ? '794px' : '1123px'} !important;
                            overflow: visible !important;
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                          }

                          /* 横版信息图的特殊处理 */
                          ${(type === '16-9' || type === 'a4-l') ? `
                          @media (orientation: portrait) {
                            .infographic-container {
                              transform: scale(${Math.min(0.95, 95 / 100)});
                              transform-origin: top center;
                            }
                          }
                          @media (orientation: landscape) {
                            body {
                              align-items: center;
                            }
                            .infographic-container {
                              transform: scale(min(0.95, 95vw / ${type === '16-9' ? 1920 : 1123}));
                              transform-origin: center;
                            }
                          }
                          ` : `
                          /* 竖版信息图的特殊处理 */
                          .infographic-container {
                            transform: scale(min(0.95, 95vw / 794));
                            transform-origin: top center;
                          }
                          `}

                          ${isMobile ? `
                          /* 移动设备优化 */
                          .infographic-container * {
                            line-height: 1.4 !important;
                          }
                          ` : ''}
                          ` : `
                          .infographic-container {
                            width: 100% !important;
                            max-width: 100% !important;
                            margin: 0 auto;
                            padding: 0 !important;
                          }
                          * {
                            max-width: 100% !important;
                            box-sizing: border-box !important;
                          }
                          img, svg {
                            height: auto !important;
                            max-width: 100% !important;
                          }
                          `}

                          /* 确保推广链接可见 */
                          .promo-link, .promo-link * {
                            font-size: 14px !important;
                            padding: 5px !important;
                            background: rgba(255,255,255,0.8) !important;
                            z-index: 1000 !important;
                            position: relative !important;
                          }

                          /* 移动端额外优化 */
                          ${isMobile ? `
                          @media (max-width: 768px) {
                            body {
                              padding: 0;
                            }

                            .infographic-container {
                              margin: 20px auto !important;
                            }

                            /* 确保所有内容可见 */
                            .infographic-container > * {
                              overflow-wrap: break-word !important;
                              word-wrap: break-word !important;
                            }

                            /* 横版信息图提示 */
                            ${type === '16-9' || type === 'a4-l' ? `
                            .landscape-hint {
                              position: fixed;
                              bottom: 70px;
                              left: 50%;
                              transform: translateX(-50%);
                              background: rgba(0,0,0,0.7);
                              color: white;
                              padding: 8px 16px;
                              border-radius: 20px;
                              font-size: 12px;
                              z-index: 1000;
                              display: flex;
                              align-items: center;
                              gap: 8px;
                              box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                            }
                            ` : ''}
                          }
                          ` : ''}
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
                      win.document.close();
                    }
                  }}
                  className="bg-white/90 p-3 md:p-2 rounded-full md:rounded-lg shadow-md hover:bg-white transition-all duration-300 flex items-center justify-center md:justify-start gap-1.5 w-12 h-12 md:w-auto md:h-auto"
                  aria-label="Open in new window"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-5 md:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="hidden md:inline">Open</span>
                </button>

                {/* 返回创建页面按钮 - 在移动端使用更大的按钮 */}
                <Link
                  href="/create"
                  className="bg-white/90 p-3 md:p-2 rounded-full md:rounded-lg shadow-md hover:bg-white transition-all duration-300 flex items-center justify-center md:justify-start gap-1.5 w-12 h-12 md:w-auto md:h-auto"
                  aria-label="Create new"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-5 md:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden md:inline">New</span>
                </Link>
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