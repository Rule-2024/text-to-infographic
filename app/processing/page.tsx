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
    
    // 设置轮询间隔
    const pollInterval = 2000; // 2秒
    let timeoutId: NodeJS.Timeout;
    
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/infographic/${id}/status`);
        
        if (!response.ok) {
          throw new Error('获取状态失败');
        }
        
        const data = await response.json();
        
        if (data.status === 'completed') {
          // 生成完成，跳转到预览页面
          router.push(`/preview?id=${id}`);
          return;
        } else if (data.status === 'failed') {
          // 生成失败，显示错误
          setError(data.error || '生成失败，请重试');
          return;
        }
        
        // 更新进度
        setProgress(data.progress || 0);
        
        // 继续轮询
        timeoutId = setTimeout(checkStatus, pollInterval);
      } catch (err) {
        setError('检查状态失败，请刷新页面重试');
      }
    };
    
    // 开始轮询
    checkStatus();
    
    // 清理函数
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [id, router]);
  
  // 取消生成
  const handleCancel = async () => {
    router.push('/create');
  };
  
  // 发生错误时的显示
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-md rounded-lg border bg-card p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-destructive">生成失败</h2>
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
    <main className="flex h-screen items-center justify-center">
      <div className="max-w-md rounded-lg border bg-card p-8 text-center shadow-sm">
        <h1 className="mb-4 text-2xl font-bold">生成信息图中...</h1>
        
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm">
            <span>进度</span>
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
          {progress < 30 && '正在分析文本内容...'}
          {progress >= 30 && progress < 60 && '正在设计信息图布局...'}
          {progress >= 60 && progress < 90 && '正在生成信息图...'}
          {progress >= 90 && '即将完成，准备预览...'}
        </p>
        
        <button
          onClick={handleCancel}
          className="rounded-lg border bg-card px-4 py-2 font-medium shadow-sm hover:bg-accent"
        >
          取消
        </button>
      </div>
    </main>
  );
} 