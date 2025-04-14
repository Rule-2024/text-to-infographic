'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getGeneration } from '@/services/storage/session-storage';
import { Generation } from '@/lib/types/infographic';
import { EXPORT_FORMATS } from '@/lib/constants/infographic';
import fileDownload from 'js-file-download';

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [generation, setGeneration] = useState<Generation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) {
      router.push('/create');
      return;
    }
    
    // 获取生成结果
    const fetchGeneration = async () => {
      try {
        setLoading(true);
        
        // 从会话存储获取结果
        const data = getGeneration(id);
        
        if (!data || !data.result) {
          // 如果会话存储中没有，尝试从API获取
          const response = await fetch(`/api/infographic/${id}/status`);
          
          if (!response.ok) {
            throw new Error('获取结果失败');
          }
          
          const apiData = await response.json();
          
          if (apiData.status !== 'completed' || !apiData.result) {
            throw new Error('生成尚未完成或结果不可用');
          }
          
          setGeneration({
            id,
            content: '',
            mode: '',
            size: '',
            status: 'completed',
            result: apiData.result,
            createdAt: new Date()
          });
        } else {
          setGeneration(data);
        }
      } catch (err) {
        console.error('获取预览数据失败:', err);
        setError('无法加载生成结果，请返回重试');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGeneration();
  }, [id, router]);
  
  // 处理下载
  const handleDownload = (format: string) => {
    if (!generation?.result) return;
    
    try {
      // 对于MVP阶段，简单地下载数据URL
      // 在实际实现中，这里应该调用API获取特定格式
      const formatInfo = EXPORT_FORMATS.find(f => f.value === format);
      
      if (!formatInfo) return;
      
      // 从data URL提取base64内容并解码
      const base64Content = generation.result.split(',')[1];
      
      // 创建文件名
      const filename = `infographic-${id}.${format}`;
      
      // 下载文件
      fileDownload(generation.result, filename);
    } catch (err) {
      console.error('下载失败:', err);
      setError('下载失败，请重试');
    }
  };
  
  // 处理分享按钮点击
  const handleShare = () => {
    // 创建分享链接（在MVP阶段简单复制当前URL）
    const shareUrl = window.location.href;
    
    // 复制到剪贴板
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('链接已复制到剪贴板'))
      .catch(() => alert('复制链接失败，请手动复制浏览器地址'));
  };
  
  if (loading) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-8 text-center">
        <p>正在加载预览...</p>
      </main>
    );
  }
  
  if (error || !generation) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-8 text-center">
        <p className="text-destructive">{error || '无法加载预览'}</p>
        <div className="mt-4">
          <a 
            href="/create" 
            className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            返回创建
          </a>
        </div>
      </main>
    );
  }
  
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold md:text-3xl">
        信息图预览
      </h1>
      
      <div className="mb-8 rounded-lg border bg-card shadow-sm">
        <div className="flex justify-center overflow-auto p-4">
          {generation.result && (
            <img 
              src={generation.result} 
              alt="生成的信息图" 
              className="max-w-full object-contain"
            />
          )}
        </div>
      </div>
      
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {EXPORT_FORMATS.map(format => (
          <button 
            key={format.value}
            onClick={() => handleDownload(format.value)}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            下载 {format.label}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        <a 
          href="/create" 
          className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          重新生成
        </a>
        <button 
          onClick={handleShare}
          className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          分享链接
        </button>
      </div>
    </main>
  );
} 