/**
 * AI API客户端
 * 处理与AI服务的通信
 */

/**
 * 调用AI服务生成信息图HTML
 * 
 * @param prompt 完整的提示词
 * @returns 生成的HTML内容
 */
export async function generateInfographicHtml(prompt: string): Promise<string> {
  try {
    // 获取 DeepSeek API 密钥和基础 URL
    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_API_URL || 'https://api.deepseek.com';

    if (!apiKey) throw new Error('AI_API_KEY 未配置');

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a professional infographic generator.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API请求失败: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    // 提取 HTML 内容
    const html = data.choices?.[0]?.message?.content;
    
    if (!html) throw new Error('DeepSeek 未返回 HTML');
    
    return html;
  } catch (error) {
    console.error('调用AI服务失败:', error);
    throw new Error(`生成信息图失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 重试逻辑的包装函数
 * 
 * @param fn 要执行的异步函数
 * @param retries 重试次数
 * @param delay 重试间隔(毫秒)
 * @returns 函数执行结果
 */
export async function withRetry<T>(
  fn: () => Promise<T>, 
  retries = 3, 
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    
    console.log(`操作失败，${delay}ms后重试，剩余重试次数: ${retries-1}`);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return withRetry(fn, retries - 1, delay * 1.5); // 指数退避
  }
} 