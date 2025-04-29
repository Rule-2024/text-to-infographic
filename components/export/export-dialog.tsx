'use client';

import { useState } from 'react';
import { EXPORT_FORMATS } from '@/lib/constants/infographic';
import { exportInfographic } from '@/lib/utils/export-utils';

interface ExportDialogProps {
  htmlContent: string;
  onClose: () => void;
}

export function ExportDialog({ htmlContent, onClose }: ExportDialogProps) {
  const [format, setFormat] = useState<'png' | 'jpg' | 'pdf'>('png');
  const [filename, setFilename] = useState('infographic');
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setError(null);
      setProgress(10);

      // 创建真实的进度更新函数
      let progressTimeout: NodeJS.Timeout;

      const updateProgress = (value: number) => {
        setProgress(value);
        // 如果进度停滞，自动小幅增加以提供反馈
        if (value < 90) {
          progressTimeout = setTimeout(() => {
            setProgress(prev => Math.min(prev + 2, 90));
          }, 1000);
        }
      };

      // 初始进度
      updateProgress(10);

      // 导出前显示提示
      const exportStartTime = Date.now();

      // 根据格式导出信息图
      await exportInfographic(htmlContent, format, filename);

      // 计算实际导出时间
      const exportDuration = Date.now() - exportStartTime;

      // 清除超时
      if (progressTimeout) clearTimeout(progressTimeout);

      // 设置进度为100%
      setProgress(100);

      // 如果导出非常快，添加短暂延迟以显示完成状态
      const minDisplayTime = 800; // 最小显示时间（毫秒）
      if (exportDuration < minDisplayTime) {
        await new Promise(resolve => setTimeout(resolve, minDisplayTime - exportDuration));
      }

      // 关闭对话框
      onClose();
    } catch (err) {
      // 清除任何进行中的超时
      setProgress(0);

      // 显示详细错误信息
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Export failed: ${errorMessage}. Please try again.`);
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card card-shadow max-w-md w-full p-8 relative">
        {/* 背景装饰元素 */}
        <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute -z-10 bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gradient-heading">Export Infographic</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            disabled={isExporting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-background/50 rounded-lg p-4 border border-border/50">
            <label htmlFor="format" className="block text-sm font-medium mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Export Format
            </label>
            <select
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'png' | 'jpg' | 'pdf')}
              disabled={isExporting}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-shadow duration-200"
            >
              {EXPORT_FORMATS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-background/50 rounded-lg p-4 border border-border/50">
            <label htmlFor="filename" className="block text-sm font-medium mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Filename
            </label>
            <div className="flex items-center">
              <input
                id="filename"
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                disabled={isExporting}
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-shadow duration-200"
                placeholder="Enter filename"
              />
              <span className="ml-2 text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                .{format}
              </span>
            </div>
          </div>

          {isExporting && (
            <div className="bg-background/50 rounded-lg p-4 border border-border/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Exporting...
                </span>
                <span className="text-primary font-medium">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-sm flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="gradient-border px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center gap-1.5 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || !filename.trim()}
              className="btn-gradient text-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
