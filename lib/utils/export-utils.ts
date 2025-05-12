/**
 * Export Utilities
 * Functions for exporting infographics to different formats
 */

/**
 * Convert HTML content to a data URL
 *
 * @param htmlContent HTML content to convert
 * @param format Output format (png or jpg)
 * @param quality Image quality (0-1, only for jpg)
 * @returns Promise resolving to a data URL
 */
export async function htmlToDataUrl(
  htmlContent: string,
  format: 'png' | 'jpg' = 'png',
  quality: number = 0.9
): Promise<string> {
  // We need to dynamically import html2canvas to avoid SSR issues
  const html2canvas = (await import('html2canvas')).default;

  return new Promise((resolve, reject) => {
    try {
      // 创建一个隐藏的iframe，这样可以确保与预览iframe使用相同的渲染环境
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.top = '0';
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.visibility = 'hidden';

      // 添加到文档中
      document.body.appendChild(iframe);

      // 监听iframe加载完成事件
      iframe.onload = async () => {
        try {
          if (!iframe.contentWindow || !iframe.contentDocument) {
            throw new Error('Cannot access iframe content');
          }

          // 等待字体加载
          await document.fonts.ready;

          // 给内容一些时间完全渲染
          await new Promise(resolve => setTimeout(resolve, 1000));

          // 获取iframe中的infographic-container元素（而不是整个body）
          const container = iframe.contentDocument.querySelector('.infographic-container');
          if (!container) {
            // 如果找不到容器，回退到使用body
            console.warn('Infographic container not found, falling back to body');
            const body = iframe.contentDocument.body;
            if (!body) {
              throw new Error('Iframe body not found');
            }

            // 确保所有图片都已加载
            const images = body.querySelectorAll('img');
            await Promise.all(Array.from(images).map(img => {
              if (img.complete) return Promise.resolve();
              return new Promise<void>(resolve => {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              });
            }));

            // 获取实际内容尺寸
            const contentWidth = body.scrollWidth;
            const contentHeight = body.scrollHeight;

            // 设置iframe尺寸以匹配内容
            iframe.style.width = `${contentWidth}px`;
            iframe.style.height = `${contentHeight}px`;

            // 添加样式确保内容完全可见
            const style = document.createElement('style');
            style.textContent = `
              body {
                margin: 0;
                padding: 0;
                overflow: visible !important;
                background: transparent !important;
              }
              ._html2canvas_pseudoelement_before,
              ._html2canvas_pseudoelement_after {
                display: none !important;
              }
            `;
            iframe.contentDocument.head.appendChild(style);

            // 再次等待以确保尺寸调整后的渲染完成
            await new Promise(resolve => setTimeout(resolve, 500));

            // 使用html2canvas捕获body内容
            const canvas = await html2canvas(body, {
              allowTaint: true,
              useCORS: true,
              scale: 2, // 更高的缩放比例以获得更好的质量
              logging: false,
              backgroundColor: '#ffffff',
              width: contentWidth,
              height: contentHeight,
              windowWidth: contentWidth,
              windowHeight: contentHeight,
              foreignObjectRendering: false, // 关闭foreignObject渲染以避免某些渲染问题
              onclone: (clonedDoc) => {
                // 可以在这里对克隆的文档进行额外处理
                const clonedBody = clonedDoc.body;
                if (clonedBody) {
                  // 确保所有元素都是可见的
                  const allElements = clonedBody.querySelectorAll('*');
                  allElements.forEach(el => {
                    const style = window.getComputedStyle(el);
                    if (style.display === 'none') {
                      (el as HTMLElement).style.display = 'block';
                    }
                    if (style.visibility === 'hidden') {
                      (el as HTMLElement).style.visibility = 'visible';
                    }
                  });

                  // 移除可能导致问题的伪元素
                  const styleEl = clonedDoc.createElement('style');
                  styleEl.textContent = `
                    ._html2canvas_pseudoelement_before,
                    ._html2canvas_pseudoelement_after {
                      display: none !important;
                    }
                  `;
                  clonedDoc.head.appendChild(styleEl);
                }
              }
            });

            // 转换为数据URL
            const dataUrl = canvas.toDataURL(
              format === 'png' ? 'image/png' : 'image/jpeg',
              format === 'jpg' ? quality : undefined
            );

            // 清理
            document.body.removeChild(iframe);

            resolve(dataUrl);
            return;
          }

          // 确保所有图片都已加载
          const images = container.querySelectorAll('img');
          await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>(resolve => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            });
          }));

          // 获取容器尺寸
          const containerWidth = (container as HTMLElement).offsetWidth;
          const containerHeight = (container as HTMLElement).offsetHeight;

          // 设置iframe尺寸以匹配容器
          iframe.style.width = `${containerWidth}px`;
          iframe.style.height = `${containerHeight}px`;

          // 添加样式确保内容完全可见
          const style = document.createElement('style');
          style.textContent = `
            body {
              margin: 0;
              padding: 0;
              overflow: visible !important;
              background: transparent !important;
            }
            ._html2canvas_pseudoelement_before,
            ._html2canvas_pseudoelement_after {
              display: none !important;
            }
            .infographic-container {
              overflow: visible !important;
              position: relative !important;
              display: block !important;
            }
          `;
          iframe.contentDocument.head.appendChild(style);

          // 再次等待以确保样式应用完成
          await new Promise(resolve => setTimeout(resolve, 500));

          // 检测信息图类型
          const detectType = () => {
            try {
              // 检查是否是16:9尺寸信息图
              const width = (container as HTMLElement).style.width || (container as HTMLElement).offsetWidth;
              const height = (container as HTMLElement).style.height || (container as HTMLElement).offsetHeight;

              console.log(`Container dimensions: width=${width}, height=${height}`);

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

              // 检查是否是移动版 - 使用更宽松的检测
              if (
                width === '750px' ||
                width === 750 ||
                (typeof width === 'number' && width > 700 && width < 800)
              ) {
                return 'mobile';
              }

              // 如果无法确定，检查HTML内容
              const htmlContent = iframe.contentDocument?.documentElement.outerHTML || '';
              if (htmlContent.includes('width: 750px') || htmlContent.includes('width:750px')) {
                return 'mobile';
              }

              return 'mobile'; // 默认为移动版
            } catch (err) {
              console.error('Failed to detect infographic type:', err);
              return 'mobile'; // 出错时也默认为移动版
            }
          };

          const infographicType = detectType();
          console.log(`Capturing infographic type: ${infographicType}`);

          // 根据信息图类型设置适当的缩放比例
          let scale = 2; // 默认使用2倍缩放

          // 对于16:9和A4格式，使用1倍缩放，因为它们已经足够大
          if (infographicType === '16-9' || infographicType === 'a4-l' || infographicType === 'a4-p') {
            scale = 1;
          }

          // 使用html2canvas捕获infographic-container内容
          const canvas = await html2canvas(container as HTMLElement, {
            allowTaint: true,
            useCORS: true,
            scale: scale, // 使用统一的缩放比例
            logging: false,
            backgroundColor: null, // 使用透明背景，让容器自己的背景显示
            width: containerWidth,
            height: containerHeight,
            windowWidth: containerWidth,
            windowHeight: containerHeight,
            foreignObjectRendering: false, // 关闭foreignObject渲染以避免某些渲染问题
            onclone: (clonedDoc) => {
              // 可以在这里对克隆的文档进行额外处理
              const clonedContainer = clonedDoc.querySelector('.infographic-container');
              if (clonedContainer) {
                // 确保所有元素都是可见的
                const allElements = clonedContainer.querySelectorAll('*');
                allElements.forEach(el => {
                  const style = window.getComputedStyle(el);
                  if (style.display === 'none') {
                    (el as HTMLElement).style.display = 'block';
                  }
                  if (style.visibility === 'hidden') {
                    (el as HTMLElement).style.visibility = 'visible';
                  }
                });

                // 移除可能导致问题的伪元素
                const styleEl = clonedDoc.createElement('style');
                styleEl.textContent = `
                  ._html2canvas_pseudoelement_before,
                  ._html2canvas_pseudoelement_after {
                    display: none !important;
                  }
                `;
                clonedDoc.head.appendChild(styleEl);

                // 为移动版添加特定处理
                if (infographicType === 'mobile') {
                  try {
                    // 确保移动版信息图的宽度固定为750px
                    (clonedContainer as HTMLElement).style.width = '750px';
                    // 确保高度自适应
                    (clonedContainer as HTMLElement).style.height = 'auto';
                    // 确保所有内容都可见
                    (clonedContainer as HTMLElement).style.overflow = 'visible';
                    console.log('Applied mobile-specific styles to cloned container');
                  } catch (err) {
                    console.error('Failed to apply mobile-specific styles:', err);
                  }
                }
              }
            }
          });

          // 转换为数据URL
          const dataUrl = canvas.toDataURL(
            format === 'png' ? 'image/png' : 'image/jpeg',
            format === 'jpg' ? quality : undefined
          );

          // 清理
          document.body.removeChild(iframe);

          resolve(dataUrl);
        } catch (error) {
          // 清理
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          reject(error);
        }
      };

      // 检测信息图类型
      const detectInfographicType = (html: string) => {
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
        // 检测移动版信息图 - 简化检测逻辑
        if (html.includes('width: 750px') || html.includes('width:750px')) {
          return 'mobile';
        }
        return 'mobile';
      };

      const infographicType = detectInfographicType(htmlContent);
      console.log(`Exporting infographic type: ${infographicType}`);

      // 为所有格式添加适当的样式，包括移动版
      let modifiedContent = htmlContent;

      // 添加基本样式，适用于所有类型
      let styleContent = `
        body {
          margin: 0;
          padding: 0;
          overflow: visible !important;
          background: transparent !important;
        }
        .infographic-container {
          transform-origin: top left;
          position: relative !important;
          display: block !important;
          overflow: visible !important;
        }
      `;

      // 为移动版添加特定样式
      if (infographicType === 'mobile') {
        styleContent += `
          /* 移动版特定样式 */
          .infographic-container {
            width: 750px !important;
            height: auto !important;
          }
        `;
      }

      const styleTag = `
        <style>
          ${styleContent}
        </style>
      `;

      // 在</head>前插入样式
      if (htmlContent.includes('</head>')) {
        modifiedContent = htmlContent.replace('</head>', `${styleTag}</head>`);
      } else {
        modifiedContent = `<html><head>${styleTag}</head><body>${htmlContent}</body></html>`;
      }

      // 设置iframe内容
      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(modifiedContent);
        iframeDoc.close();
      } else {
        throw new Error('Cannot access iframe document');
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Convert HTML content to PDF
 *
 * @param htmlContent HTML content to convert
 * @param filename Output filename (without extension)
 * @returns Promise resolving when PDF is generated and downloaded
 */
export async function htmlToPdf(htmlContent: string, filename: string = 'infographic'): Promise<void> {
  // We need to dynamically import jspdf to avoid SSR issues
  const { jsPDF } = await import('jspdf');

  try {
    // 显示导出进度指示器
    const progressIndicator = document.createElement('div');
    progressIndicator.style.position = 'fixed';
    progressIndicator.style.top = '50%';
    progressIndicator.style.left = '50%';
    progressIndicator.style.transform = 'translate(-50%, -50%)';
    progressIndicator.style.padding = '20px';
    progressIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    progressIndicator.style.color = 'white';
    progressIndicator.style.borderRadius = '8px';
    progressIndicator.style.zIndex = '9999';
    progressIndicator.style.textAlign = 'center';
    progressIndicator.innerHTML = `
      <div>Preparing PDF...</div>
      <div style="margin-top: 10px; width: 100%; height: 4px; background: rgba(255,255,255,0.2);">
        <div id="pdf-progress-bar" style="width: 10%; height: 100%; background: linear-gradient(to right, #7B2FF7, #00CFFF);"></div>
      </div>
    `;
    document.body.appendChild(progressIndicator);

    const updateProgress = (percent: number) => {
      const progressBar = document.getElementById('pdf-progress-bar');
      if (progressBar) {
        progressBar.style.width = `${percent}%`;
      }
    };

    // 更新进度
    updateProgress(20);

    // 首先转换为图像
    const dataUrl = await htmlToDataUrl(htmlContent, 'png');
    updateProgress(70);

    // 创建临时图像以获取尺寸
    const img = new Image();
    img.src = dataUrl;

    await new Promise<void>(resolve => {
      img.onload = () => resolve();
    });

    // 计算PDF尺寸和方向
    const width = img.width;
    const height = img.height;
    const orientation = width > height ? 'landscape' : 'portrait';

    updateProgress(80);

    // 创建具有适当尺寸的PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: [width, height]
    });

    // 添加图像到PDF
    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);

    updateProgress(90);

    // 保存PDF
    pdf.save(`${filename}.pdf`);

    updateProgress(100);

    // 移除进度指示器
    setTimeout(() => {
      if (document.body.contains(progressIndicator)) {
        document.body.removeChild(progressIndicator);
      }
    }, 500);
  } catch (error) {
    console.error('PDF generation failed:', error);

    // 移除进度指示器（如果存在）
    const progressIndicator = document.querySelector('div[style*="position: fixed"][style*="top: 50%"]');
    if (progressIndicator && progressIndicator.parentNode) {
      progressIndicator.parentNode.removeChild(progressIndicator);
    }

    // 显示错误消息
    const errorMessage = document.createElement('div');
    errorMessage.style.position = 'fixed';
    errorMessage.style.top = '50%';
    errorMessage.style.left = '50%';
    errorMessage.style.transform = 'translate(-50%, -50%)';
    errorMessage.style.padding = '20px';
    errorMessage.style.backgroundColor = 'rgba(220, 38, 38, 0.9)';
    errorMessage.style.color = 'white';
    errorMessage.style.borderRadius = '8px';
    errorMessage.style.zIndex = '9999';
    errorMessage.style.textAlign = 'center';
    errorMessage.innerHTML = `
      <div>PDF generation failed</div>
      <div style="margin-top: 10px; font-size: 14px;">${error instanceof Error ? error.message : 'Unknown error'}</div>
      <button style="margin-top: 15px; padding: 5px 15px; background: rgba(255,255,255,0.2); border: none; border-radius: 4px; color: white; cursor: pointer;">Close</button>
    `;
    document.body.appendChild(errorMessage);

    // 添加关闭按钮事件
    const closeButton = errorMessage.querySelector('button');
    if (closeButton) {
      closeButton.onclick = () => {
        document.body.removeChild(errorMessage);
      };
    }

    throw error;
  }
}

/**
 * Download data URL as file
 *
 * @param dataUrl Data URL to download
 * @param filename Filename with extension
 */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export HTML content to specified format
 *
 * @param htmlContent HTML content to export
 * @param format Export format (png, jpg, pdf)
 * @param filename Base filename without extension
 * @returns Promise resolving when export is complete
 */
export async function exportInfographic(
  htmlContent: string,
  format: 'png' | 'jpg' | 'pdf',
  filename: string = 'infographic'
): Promise<void> {
  try {
    if (format === 'pdf') {
      await htmlToPdf(htmlContent, filename);
    } else {
      const dataUrl = await htmlToDataUrl(htmlContent, format);
      downloadDataUrl(dataUrl, `${filename}.${format}`);
    }
  } catch (error) {
    console.error(`Export to ${format} failed:`, error);
    throw error;
  }
}
