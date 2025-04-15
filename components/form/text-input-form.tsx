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
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label 
          htmlFor="content" 
          className="block text-sm font-medium"
        >
          Text Content (max {MAX_TEXT_LENGTH} characters)
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          value={formData.content}
          onChange={handleTextChange}
          disabled={isSubmitting}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Enter text here or upload a file..."
        />
        <p className={`text-xs ${remainingChars <= 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
          Current {formData.content.length}/{MAX_TEXT_LENGTH} characters
        </p>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="mode" className="block text-sm font-medium">
            Processing Mode
          </label>
          <select 
            id="mode"
            name="mode"
            value={formData.mode}
            onChange={handleSelectChange}
            disabled={isSubmitting}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {PROCESSING_MODES.map(mode => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="size" className="block text-sm font-medium">
            Size Selection
          </label>
          <select 
            id="size"
            name="size"
            value={formData.size}
            onChange={handleSelectChange}
            disabled={isSubmitting}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {Object.entries(SIZE_OPTIONS).map(([key, size]) => (
              <option key={key} value={key}>
                {size.name} ({size.description})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Generate Infographic'}
        </button>
      </div>
    </form>
  );
} 