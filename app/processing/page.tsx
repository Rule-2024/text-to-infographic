'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProcessingStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: string;
}

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [status, setStatus] = useState<ProcessingStatus>({
    status: 'processing',
    progress: 0
  });
  
  // 是否已取消
  const [isCanceled, setIsCanceled] = useState(false);
  
  useEffect(() => {
    if (!id) {
      router.push('/create');
      return;
    }
    
    if (isCanceled) return;
    
    // 定义轮询状态的函数
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/infographic/${id}/status`);
        
        if (!response.ok) {
          throw new Error('获取状态失败');
        }
        
        const data = await response.json();
        setStatus(data);
        
        // 如果处理已完成，重定向到预览页面
        if (data.status === 'completed') {
          router.push(`/preview?id=${id}`);
        } else if (data.status === 'failed') {
          router.push(`/create?error=生成失败，请重试`);
        }
      } catch (error) {
        console.error('获取处理状态失败:', error);
      }
    };
    
    // 立即检查一次
    checkStatus();
    
    // 设置定时轮询
    const intervalId = setInterval(checkStatus, 2000);
    
    // 清理函数
    return () => {
      clearInterval(intervalId);
    };
  }, [id, router, isCanceled]);
  
  // 处理取消按钮点击
  const handleCancel = () => {
    setIsCanceled(true);
    router.push('/create');
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl">
          正在生成您的信息图...
        </h1>
        
        <div className="mb-8 space-y-4">
          <div className="relative h-4 overflow-hidden rounded-full bg-secondary">
            <div 
              className="absolute left-0 top-0 h-4 rounded-full bg-primary transition-all duration-500"
              style={{ width: `${status.progress}%` }}
            />
          </div>
          <p className="text-lg font-medium">{status.progress}%</p>
        </div>
        
        <p className="mb-8 text-center text-muted-foreground">
          正在处理您的文本并设计信息图，这可能需要几秒钟...
        </p>
        
        <button
          onClick={handleCancel}
          className="w-full rounded-lg border border-destructive bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20"
        >
          取消生成
        </button>
      </div>
    </main>
  );
} 