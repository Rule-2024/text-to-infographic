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

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          return newProgress < 90 ? newProgress : prev;
        });
      }, 500);

      // Export the infographic
      await exportInfographic(htmlContent, format, filename);

      // Clear interval and set progress to 100%
      clearInterval(progressInterval);
      setProgress(100);

      // Close dialog after a short delay
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError('Export failed. Please try again.');
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Export Infographic</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            disabled={isExporting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="format" className="block text-sm font-medium mb-2">
              Export Format
            </label>
            <select
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'png' | 'jpg' | 'pdf')}
              disabled={isExporting}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {EXPORT_FORMATS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filename" className="block text-sm font-medium mb-2">
              Filename
            </label>
            <div className="flex items-center">
              <input
                id="filename"
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                disabled={isExporting}
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                placeholder="Enter filename"
              />
              <span className="ml-2 text-sm text-muted-foreground">
                .{format}
              </span>
            </div>
          </div>

          {isExporting && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Exporting...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || !filename.trim()}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
