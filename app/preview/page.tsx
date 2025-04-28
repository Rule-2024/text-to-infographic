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
            <iframe
              srcDoc={htmlContent}
              className="w-full"
              style={{ minHeight: '80vh', height: 'auto' }}
              sandbox="allow-same-origin"
              title="Infographic Preview"
              onLoad={(e) => {
                // 动态调整iframe高度以适应内容
                const iframe = e.currentTarget;
                try {
                  const height = iframe.contentWindow?.document.body.scrollHeight;
                  if (height && height > 0) {
                    iframe.style.height = `${height}px`;
                  }
                } catch (err) {
                  console.error('Failed to adjust iframe height:', err);
                }
              }}
            />
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