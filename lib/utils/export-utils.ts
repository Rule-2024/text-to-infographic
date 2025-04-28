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
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      // 不限制容器尺寸，让它适应内容
      container.style.overflow = 'visible';
      document.body.appendChild(container);

      // Set HTML content
      container.innerHTML = htmlContent;

      // 等待字体加载
      document.fonts.ready
        .then(() => {
          // Wait for images to load
          const images = container.querySelectorAll('img');
          const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>(resolve => {
              img.onload = () => resolve();
              img.onerror = () => resolve(); // Continue even if image fails
            });
          });

          return Promise.all(imagePromises);
        })
        .then(() => {
          // 给DOM元素一点时间完全渲染
          return new Promise(resolve => setTimeout(resolve, 500));
        })
        .then(() => {
          // 获取实际内容尺寸
          const contentWidth = container.scrollWidth;
          const contentHeight = container.scrollHeight;

          // Use html2canvas to capture the container
          return html2canvas(container, {
            allowTaint: true,
            useCORS: true,
            scale: 2, // Higher scale for better quality
            logging: false,
            backgroundColor: '#ffffff',
            width: contentWidth,
            height: contentHeight,
            windowWidth: contentWidth,
            windowHeight: contentHeight
          });
        })
        .then(canvas => {
          // Convert canvas to data URL
          const dataUrl = canvas.toDataURL(
            format === 'png' ? 'image/png' : 'image/jpeg',
            format === 'jpg' ? quality : undefined
          );

          // Clean up
          document.body.removeChild(container);

          resolve(dataUrl);
        })
        .catch(error => {
          // Clean up on error
          if (document.body.contains(container)) {
            document.body.removeChild(container);
          }
          reject(error);
        });
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
    // First convert to image
    const dataUrl = await htmlToDataUrl(htmlContent, 'png');

    // Create a temporary image to get dimensions
    const img = new Image();
    img.src = dataUrl;

    await new Promise<void>(resolve => {
      img.onload = () => resolve();
    });

    // Calculate PDF dimensions and orientation
    const width = img.width;
    const height = img.height;
    const orientation = width > height ? 'landscape' : 'portrait';

    // Create PDF with appropriate dimensions
    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: [width, height]
    });

    // Add image to PDF
    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);

    // Save PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('PDF generation failed:', error);
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
