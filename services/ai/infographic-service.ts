/**
 * 信息图生成服务
 * 用于替代mock服务，实现真实AI调用
 */
import { TextInputForm } from "@/lib/types/infographic";
import { buildPrompt, processGeneratedHtml } from "@/lib/ai/prompt-builder";
import { generateInfographicHtml, withRetry } from "@/lib/ai/api-client";

interface GenerationResult {
  html: string;
  timestamp: number;
}

// 内存缓存，存储生成结果
// 注意：实际生产环境应使用数据库或缓存服务
const generationCache = new Map<string, GenerationResult>();
const generationStatus = new Map<string, {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}>();

/**
 * 生成信息图
 * 
 * @param input 用户输入表单数据
 * @returns 生成任务ID
 */
export async function generateInfographic(input: TextInputForm): Promise<string> {
  // 生成唯一ID (使用uuid或nanoId)
  const generationId = crypto.randomUUID();
  
  // 设置初始状态
  generationStatus.set(generationId, { 
    status: 'pending', 
    progress: 0 
  });
  
  // 异步执行生成过程
  (async () => {
    try {
      generationStatus.set(generationId, { 
        status: 'processing', 
        progress: 10 
      });
      
      // 构建提示词
      const prompt = buildPrompt(input);
      
      // 更新进度
      generationStatus.set(generationId, { 
        status: 'processing', 
        progress: 30 
      });
      
      // 调用AI服务生成HTML
      const html = await withRetry(
        () => generateInfographicHtml(prompt),
        2, // 最多重试2次
        2000 // 初始重试延迟2秒
      );
      
      // 更新进度
      generationStatus.set(generationId, { 
        status: 'processing', 
        progress: 80 
      });
      
      // 处理生成的HTML
      const processedHtml = processGeneratedHtml(html);
      
      // 缓存结果
      generationCache.set(generationId, {
        html: processedHtml,
        timestamp: Date.now()
      });
      
      // 更新状态为完成
      generationStatus.set(generationId, { 
        status: 'completed', 
        progress: 100 
      });
      
    } catch (error) {
      console.error('信息图生成失败:', error);
      generationStatus.set(generationId, { 
        status: 'failed', 
        progress: 0,
        error: error instanceof Error ? error.message : '未知错误'
      });
    }
  })();
  
  // 立即返回ID
  return generationId;
}

/**
 * 检查生成状态
 * 
 * @param id 生成任务ID
 * @returns 任务状态和结果
 */
export async function checkGenerationStatus(id: string): Promise<{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: string;
  error?: string;
}> {
  // 获取状态
  const status = generationStatus.get(id);
  
  if (!status) {
    return {
      status: 'failed',
      progress: 0,
      error: '找不到生成任务'
    };
  }
  
  // 如果已完成，返回结果
  if (status.status === 'completed') {
    const cached = generationCache.get(id);
    
    if (!cached) {
      return {
        status: 'failed',
        progress: 0,
        error: '结果已过期或丢失'
      };
    }
    
    return {
      status: 'completed',
      progress: 100,
      result: cached.html
    };
  }
  
  // 返回进行中的状态
  return {
    status: status.status,
    progress: status.progress,
    error: status.error
  };
} 