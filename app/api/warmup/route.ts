import { NextResponse } from 'next/server';
import { warmupApiConnection } from '@/lib/ai/api-client';

// POST /api/warmup - 预热API连接
export async function POST() {
  try {
    // 调用API预热函数
    await warmupApiConnection();
    
    // 返回成功响应
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API warmup failed:', error);
    
    // 即使预热失败也返回成功，不影响用户体验
    return NextResponse.json({ success: true });
  }
}
