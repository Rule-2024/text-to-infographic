'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProcessingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      router.push('/create');
      return;
    }

    // Set polling interval
    const pollInterval = 2000; // 2 seconds
    let timeoutId: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/infographic/${id}/status`);

        if (!response.ok) {
          throw new Error('Failed to fetch status');
        }

        const data = await response.json();

        if (data.status === 'completed') {
          // Generation complete, redirect to preview page
          router.push(`/preview?id=${id}`);
          return;
        } else if (data.status === 'failed') {
          // Generation failed, show error
          setError(data.error || 'Generation failed, please try again');
          return;
        }

        // Update progress
        setProgress(data.progress || 0);

        // Continue polling
        timeoutId = setTimeout(checkStatus, pollInterval);
      } catch (err) {
        setError('Failed to check status, please refresh the page and try again');
      }
    };

    // Start polling
    checkStatus();

    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [id, router]);

  // Cancel generation
  const handleCancel = async () => {
    router.push('/create');
  };

  // Display when error occurs
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-md rounded-lg border bg-card p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-destructive">Generation Failed</h2>
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
    <main className="flex h-screen items-center justify-center">
      <div className="max-w-md rounded-lg border bg-card p-8 text-center shadow-sm">
        <h1 className="mb-4 text-2xl font-bold">Generating Infographic...</h1>

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          {progress < 30 && 'Analyzing text content...'}
          {progress >= 30 && progress < 60 && 'Designing infographic layout...'}
          {progress >= 60 && progress < 90 && 'Generating infographic...'}
          {progress >= 90 && 'Almost done, preparing preview...'}
        </p>

        <button
          onClick={handleCancel}
          className="rounded-lg border bg-card px-4 py-2 font-medium shadow-sm hover:bg-accent"
        >
          Cancel
        </button>
      </div>
    </main>
  );
}