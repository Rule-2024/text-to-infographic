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
          <h2 className="mb-4 text-2xl font-bold text-destructive">Generation Failed</h2>
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gradient-to-b from-background to-muted">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="glass-card p-8 card-shadow max-w-md text-center relative z-10">
        <div className="mb-6 relative">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold gradient-heading">Creating Your Infographic</h1>
          <p className="text-sm text-muted-foreground mt-2">Our AI is working on your design</p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>Progress</span>
            <span className="text-primary">{progress}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8 text-left bg-background/50 rounded-lg p-4 border border-border/50">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Current Status:
          </h3>
          <p className="text-sm text-muted-foreground">
            {progress < 30 && 'Analyzing your text content and identifying key points...'}
            {progress >= 30 && progress < 60 && 'Designing the optimal layout for your information...'}
            {progress >= 60 && progress < 90 && 'Creating visual elements and applying design styles...'}
            {progress >= 90 && 'Finalizing your infographic and preparing preview...'}
          </p>
        </div>

        <button
          onClick={handleCancel}
          className="gradient-border px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center gap-1.5 mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel Process
        </button>
      </div>
    </main>
  );
}