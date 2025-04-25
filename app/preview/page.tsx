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
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Loading Preview...</h2>
          <div className="h-2 w-64 rounded-full bg-gray-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-md rounded-lg border bg-card p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-destructive">Preview Error</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Link
            href="/create"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Back to Create
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto flex max-w-6xl flex-col px-4 py-8">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Infographic Preview</h1>
        <div className="space-x-4">
          <button
            className="rounded-lg border bg-card px-4 py-2 font-medium shadow-sm hover:bg-accent"
            onClick={() => setShowExportDialog(true)}
          >
            Export
          </button>
          <Link
            href="/create"
            className="rounded-lg border bg-card px-4 py-2 font-medium shadow-sm hover:bg-accent"
          >
            Create New
          </Link>
        </div>
      </div>

      <div className="relative mb-8 overflow-hidden rounded-lg border bg-white shadow-md">
        {htmlContent ? (
          <iframe
            srcDoc={htmlContent}
            className="h-[80vh] w-full"
            sandbox="allow-same-origin"
            title="Infographic Preview"
          />
        ) : (
          <div className="flex h-[80vh] w-full items-center justify-center">
            <p className="text-xl text-muted-foreground">No content to preview</p>
          </div>
        )}
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