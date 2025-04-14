import { NextResponse } from 'next/server';
import { generateInfographic } from '@/services/ai/mock-service';
import { MAX_TEXT_LENGTH } from '@/lib/constants/infographic';
import { generateId } from '@/lib/utils';
import { TextInputForm } from '@/lib/types/infographic';

// POST /api/infographic - 创建新的信息图生成任务
export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json();
    
    // 验证必要字段
    if (!body.content) {
      return NextResponse.json(
        { error: '缺少文本内容' },
        { status: 400 }
      );
    }
    
    // 验证文本长度
    if (body.content.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `文本内容超过${MAX_TEXT_LENGTH}字限制` },
        { status: 400 }
      );
    }
    
    // 准备输入数据
    const input: TextInputForm = {
      content: body.content,
      mode: body.mode || 'full',
      size: body.size || '16-9'
    };
    
    // 生成唯一ID
    const generationId = generateId();
    
    // 调用AI服务（在MVP阶段，这是一个模拟服务）
    const result = await generateInfographic(input);
    
    // 返回结果
    return NextResponse.json({
      id: generationId,
      result,
      status: 'completed'
    });
  } catch (error) {
    console.error('信息图生成失败:', error);
    
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
} 