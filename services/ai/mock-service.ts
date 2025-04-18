import { TextInputForm } from "@/lib/types/infographic";

// MVP阶段使用模拟服务，避免实际API调用
export async function generateInfographic(input: TextInputForm): Promise<string> {
  console.log('模拟AI服务生成信息图:', input);
  
  // 模拟处理延迟
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // 返回一个模拟的数据URL作为结果
  // 在实际实现中，这将是通过AI服务生成的图像
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiPk1vY2sgSW5mb2dyYXBoaWM6IFt0ZXh0IHRvIGluZm9ncmFwaGljXTwvdGV4dD48L3N2Zz4=';
}

// 处理状态检查函数
export async function checkGenerationStatus(id: string): Promise<{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: string;
}> {
  // 模拟处理进度
  const progress = Math.random() * 100;
  
  // 随机决定状态
  let status: 'pending' | 'processing' | 'completed' | 'failed';
  
  if (progress < 30) {
    status = 'pending';
  } else if (progress < 90) {
    status = 'processing';
  } else {
    status = 'completed';
  }
  
  return {
    status,
    progress: Math.min(100, Math.round(progress)),
    ...(status === 'completed' ? {
      result: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiPk1vY2sgSW5mb2dyYXBoaWM6IENvbXBsZXRlZDwvdGV4dD48L3N2Zz4='
    } : {})
  };
} 