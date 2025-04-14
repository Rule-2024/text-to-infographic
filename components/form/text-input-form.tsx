'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MAX_TEXT_LENGTH, PROCESSING_MODES, SIZE_OPTIONS } from '@/lib/constants/infographic';
import { getRemainingCharCount } from '@/lib/utils/text-utils';
import type { TextInputForm as TextInputFormType } from '@/lib/types/infographic';

export function TextInputForm() {
  const router = useRouter();
  
  // 表单状态
  const [formData, setFormData] = useState<TextInputFormType>({
    content: '',
    mode: 'full',
    size: '16-9'
  });
  
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 字数计数
  const remainingChars = getRemainingCharCount(formData.content, MAX_TEXT_LENGTH);
  
  // 处理文本变化
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFormData(prev => ({ ...prev, content: text }));
    setError(null);
  };
  
  // 处理选择项变化
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 处理表单提交
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!formData.content.trim()) {
      setError('请输入文本内容');
      return;
    }
    
    if (formData.content.length > MAX_TEXT_LENGTH) {
      setError(`文本内容超过${MAX_TEXT_LENGTH}字限制`);
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // 调用API
      const response = await fetch('/api/infographic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '提交失败');
      }
      
      const data = await response.json();
      
      // 重定向到处理页面或预览页面
      if (data.status === 'completed') {
        router.push(`/preview?id=${data.id}`);
      } else {
        router.push(`/processing?id=${data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请重试');
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
          文本内容 (最多{MAX_TEXT_LENGTH}字)
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          value={formData.content}
          onChange={handleTextChange}
          disabled={isSubmitting}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="在此输入文本，或上传文件..."
        />
        <p className={`text-xs ${remainingChars <= 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
          当前 {formData.content.length}/{MAX_TEXT_LENGTH} 字
        </p>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="mode" className="block text-sm font-medium">
            处理模式
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
            尺寸选择
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
          {isSubmitting ? '处理中...' : '生成信息图'}
        </button>
      </div>
    </form>
  );
} 