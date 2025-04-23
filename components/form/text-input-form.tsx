'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MAX_TEXT_LENGTH, PROCESSING_MODES, SIZE_OPTIONS } from '@/lib/constants/infographic';
import { getRemainingCharCount } from '@/lib/utils/text-utils';
import type { TextInputForm as TextInputFormType } from '@/lib/types/infographic';

export function TextInputForm() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<TextInputFormType>({
    content: '',
    mode: 'full',
    size: '16-9'
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Character count
  const remainingChars = getRemainingCharCount(formData.content, MAX_TEXT_LENGTH);

  // Handle text change
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFormData(prev => ({ ...prev, content: text }));
    setError(null);
  };

  // Handle select change
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.content.trim()) {
      setError('Please enter text content');
      return;
    }

    if (formData.content.length > MAX_TEXT_LENGTH) {
      setError(`Text content exceeds ${MAX_TEXT_LENGTH} character limit`);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Call API
      const response = await fetch('/api/infographic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }

      const data = await response.json();

      // Redirect to processing or preview page
      if (data.status === 'completed') {
        router.push(`/preview?id=${data.id}`);
      } else {
        router.push(`/processing?id=${data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="content"
            className="block text-base font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Text Content
          </label>
          <span className={`text-xs px-2 py-1 rounded-full ${remainingChars <= 0 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
            {formData.content.length}/{MAX_TEXT_LENGTH} characters
          </span>
        </div>

        <div className="relative">
          <textarea
            id="content"
            name="content"
            rows={10}
            value={formData.content}
            onChange={handleTextChange}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-200 shadow-sm focus-visible:shadow-md"
            placeholder="Enter your text here to convert it into an infographic..."
          />
          {isSubmitting && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm font-medium">Processing your text...</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Enter your text content to convert into an infographic. You can paste articles, reports, essays, or any text up to 5000 characters.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label htmlFor="mode" className="block text-base font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Processing Mode
          </label>
          <select
            id="mode"
            name="mode"
            value={formData.mode}
            onChange={handleSelectChange}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-200 shadow-sm focus-visible:shadow-md"
          >
            {PROCESSING_MODES.map(mode => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            Choose how your text should be processed. Full processing preserves the original structure, while summary extracts key points.
          </p>
        </div>

        <div className="space-y-3">
          <label htmlFor="size" className="block text-base font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Size Selection
          </label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleSelectChange}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-200 shadow-sm focus-visible:shadow-md"
          >
            {Object.entries(SIZE_OPTIONS).map(([key, size]) => (
              <option key={key} value={key}>
                {size.name} ({size.description})
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            Select the size format for your infographic based on how you plan to use it (presentations, printing, or mobile).
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-medium disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Generate AI Infographic
            </>
          )}
        </button>
      </div>
    </form>
  );
}