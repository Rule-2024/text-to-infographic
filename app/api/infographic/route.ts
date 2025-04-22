import { NextResponse } from 'next/server';
import { generateInfographic } from '@/services/ai';
import { MAX_TEXT_LENGTH } from '@/lib/constants/infographic';
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
    
    // 调用信息图生成服务(根据环境变量自动选择真实服务或模拟服务)
    const generationId = await generateInfographic(input);
    
    // 返回结果
    return NextResponse.json({
      id: generationId,
      status: 'processing'
    });
  } catch (error) {
    console.error('信息图生成失败:', error);
    
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
} 