'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 获取生成结果
  useEffect(() => {
    if (!id) {
      setError('缺少预览ID参数');
      setLoading(false);
      return;
    }
    
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/infographic/${id}/status`);
        
        if (!response.ok) {
          throw new Error('获取结果失败');
        }
        
        const data = await response.json();
        
        if (data.status === 'completed' && data.result) {
          setHtmlContent(data.result);
          setLoading(false);
        } else if (data.status === 'failed') {
          setError(data.error || '生成失败');
          setLoading(false);
        } else {
          // 如果还在处理中，重定向到处理页面
          window.location.href = `/processing?id=${id}`;
        }
      } catch (err) {
        setError('加载预览失败');
        setLoading(false);
      }
    };
    
    fetchResult();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">加载预览中...</h2>
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
          <h2 className="mb-4 text-2xl font-bold text-destructive">预览错误</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Link 
            href="/create" 
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            返回创建
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <main className="container mx-auto flex max-w-6xl flex-col px-4 py-8">
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">信息图预览</h1>
        <div className="space-x-4">
          <button 
            className="rounded-lg border bg-card px-4 py-2 font-medium shadow-sm hover:bg-accent"
            onClick={() => window.print()}
          >
            导出/打印
          </button>
          <Link 
            href="/create" 
            className="rounded-lg border bg-card px-4 py-2 font-medium shadow-sm hover:bg-accent"
          >
            重新创建
          </Link>
        </div>
      </div>
      
      <div className="relative mb-8 overflow-hidden rounded-lg border bg-white shadow-md">
        {htmlContent ? (
          <iframe
            srcDoc={htmlContent}
            className="h-[80vh] w-full"
            sandbox="allow-same-origin"
            title="信息图预览"
          />
        ) : (
          <div className="flex h-[80vh] w-full items-center justify-center">
            <p className="text-xl text-muted-foreground">无可预览内容</p>
          </div>
        )}
      </div>
    </main>
  );
} 