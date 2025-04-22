import { NextResponse } from 'next/server';
import { checkGenerationStatus } from '@/services/ai';

// GET /api/infographic/:id/status - 获取生成任务的状态
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: '缺少生成任务ID' },
        { status: 400 }
      );
    }
    
    // 检查生成状态
    const status = await checkGenerationStatus(id);
    
    return NextResponse.json(status);
  } catch (error) {
    console.error('获取生成状态失败:', error);
    
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
} 