/**
 * AI API Client
 * Handle communication with AI services
 */

/**
 * Call AI service to generate infographic HTML
 *
 * @param prompt Complete prompt
 * @param size Size identifier (optional): '16-9', 'a4-l', 'a4-p', '750'
 * @returns Generated HTML content
 */
export async function generateInfographicHtml(prompt: string, size?: string): Promise<string> {
  try {
    // Get DeepSeek API key and base URL
    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_API_URL || 'https://api.lkeap.cloud.tencent.com/v1/chat/completions';
    const model = process.env.AI_API_MODEL || 'deepseek-v3-0324';

    if (!apiKey) throw new Error('AI_API_KEY not configured');

    // 根据尺寸设置不同的max_tokens参数
    let maxTokens = 8192; // 默认值

    // 为16:9和A4格式提供更多的token限制
    if (size === '16-9') {
      maxTokens = 12000; // 16:9格式使用更多token
      console.log(`Using increased max_tokens (${maxTokens}) for 16:9 format`);
    } else if (size === 'a4-l' || size === 'a4-p') {
      maxTokens = 10000; // A4格式使用更多token
      console.log(`Using increased max_tokens (${maxTokens}) for A4 format`);
    }

    // 腾讯云DeepSeek API使用OpenAI兼容接口
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model, // 使用环境变量中配置的模型，默认为deepseek-v3-0324
        messages: [
          { role: 'system', content: 'You are a professional infographic generator.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        stream: false,
        max_tokens: maxTokens // 根据尺寸设置的token限制
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API request failed: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    // Extract HTML content
    const html = data.choices?.[0]?.message?.content;

    if (!html) throw new Error('DeepSeek did not return HTML');

    return html;
  } catch (error) {
    console.error('AI service call failed:', error);
    throw new Error(`Infographic generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Wrapper function for retry logic with improved error handling and timeout
 *
 * @param fn Async function to execute
 * @param retries Number of retries
 * @param delay Retry interval (milliseconds)
 * @param timeout Optional timeout in milliseconds
 * @returns Function execution result
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2, // 减少默认重试次数
  delay = 1500, // 减少默认初始延迟
  timeout?: number // 可选的超时参数
): Promise<T> {
  // 添加超时逻辑的包装函数
  const executeWithTimeout = async (): Promise<T> => {
    if (!timeout) return fn();

    // 创建一个超时Promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Operation timed out after ${timeout}ms`)), timeout);
    });

    // 竞争：函数执行 vs 超时
    return Promise.race([fn(), timeoutPromise]);
  };

  try {
    return await executeWithTimeout();
  } catch (error) {
    // 检查是否已达到最大重试次数
    if (retries <= 0) throw error;

    // 判断错误是否可重试
    if (!isRetryableError(error)) {
      console.log('Non-retryable error detected, aborting retry:', error);
      throw error;
    }

    // 计算下一次延迟，但设置上限为5000ms
    const nextDelay = Math.min(delay * 1.5, 5000);

    console.log(`Operation failed, retrying in ${delay}ms, remaining retries: ${retries-1}`);
    await new Promise(resolve => setTimeout(resolve, delay));

    return withRetry(fn, retries - 1, nextDelay, timeout);
  }
}

/**
 * Determine if an error is retryable
 *
 * @param error The error to check
 * @returns True if the error is retryable, false otherwise
 */
function isRetryableError(error: any): boolean {
  const errorMessage = error?.message || '';

  // 网络错误、超时、服务器繁忙等通常可以重试
  if (
    errorMessage.includes('network') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('429') ||  // Too Many Requests
    errorMessage.includes('503') ||  // Service Unavailable
    errorMessage.includes('504') ||  // Gateway Timeout
    errorMessage.includes('connection') ||
    errorMessage.includes('ECONNRESET') ||
    errorMessage.includes('ETIMEDOUT')
  ) {
    return true;
  }

  // API密钥错误、格式错误等通常不应重试
  if (
    errorMessage.includes('API key') ||
    errorMessage.includes('invalid format') ||
    errorMessage.includes('authentication') ||
    errorMessage.includes('401') ||  // Unauthorized
    errorMessage.includes('403')     // Forbidden
  ) {
    return false;
  }

  // 默认可重试
  return true;
}