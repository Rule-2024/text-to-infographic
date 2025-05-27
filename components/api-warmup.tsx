'use client';

import { useEffect } from 'react';

// 这个组件用于在页面加载时预热API连接
export function ApiWarmup() {
  useEffect(() => {
    // 使用一个小延迟，确保不会阻塞页面加载
    const timer = setTimeout(async () => {
      try {
        // 调用API预热端点
        await fetch('/api/warmup', {
          method: 'POST',
          cache: 'no-store',
        });
        console.log('API warmup request sent');
      } catch (error) {
        // 预热失败不影响用户体验，只记录日志
        console.log('API warmup request failed:', error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 这个组件不渲染任何内容
  return null;
}
