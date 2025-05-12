/**
 * AI API Client
 * Handle communication with AI services
 */

// 跟踪API调用状态
let apiCallCount = 0;
let lastApiCallTime = 0;

/**
 * Call AI service to generate infographic HTML
 *
 * @param prompt Complete prompt
 * @param size Size identifier (optional): '16-9', 'a4-l', 'a4-p', '750'
 * @returns Generated HTML content
 */
export async function generateInfographicHtml(prompt: string, size?: string): Promise<string> {
  try {
    // 记录API调用信息
    apiCallCount++;
    const currentTime = Date.now();
    const timeSinceLastCall = currentTime - lastApiCallTime;
    lastApiCallTime = currentTime;

    console.log(`API call #${apiCallCount}, time since last call: ${timeSinceLastCall}ms, size: ${size || 'unknown'}`);

    // 如果是首次调用或距离上次调用时间较长，添加短暂延迟以确保API服务准备就绪
    if (apiCallCount === 1 || timeSinceLastCall > 300000) { // 首次调用或距离上次调用超过5分钟
      console.log('First call or long time since last call, adding warm-up delay');
      await new Promise(resolve => setTimeout(resolve, 1000)); // 添加1秒预热延迟
    }

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

    // 设置请求超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒请求超时

    try {
      // 腾讯云DeepSeek API使用OpenAI兼容接口
      console.log(`Sending request to ${baseUrl} with model ${model}`);
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
        signal: controller.signal
      });

      // 清除超时
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${response.status} ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();

      // Extract HTML content
      const html = data.choices?.[0]?.message?.content;

      if (!html) throw new Error('DeepSeek did not return HTML');

      console.log(`API call #${apiCallCount} completed successfully`);
      return html;
    } catch (error) {
      // 清除超时
      clearTimeout(timeoutId);
      throw error;
    }
  } catch (error) {
    // 提供更具体的错误信息
    let errorMessage = 'AI service call failed';

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'API request timed out after 60 seconds';
      } else if (error.message.includes('network') || error.message.includes('connection')) {
        errorMessage = 'Network connection issue when calling AI service';
      } else if (error.message.includes('API key') || error.message.includes('authentication')) {
        errorMessage = 'AI service authentication failed, please check API key configuration';
      } else {
        errorMessage = error.message;
      }
    }

    console.error(`AI service call #${apiCallCount} failed:`, errorMessage);
    throw new Error(`Infographic generation failed: ${errorMessage}`);
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
  // 记录重试信息
  const startTime = Date.now();
  const maxRetries = retries; // 保存初始重试次数，用于日志

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

  // 内部重试函数，使用尾递归优化
  const attemptWithRetry = async (
    remainingRetries: number,
    currentDelay: number
  ): Promise<T> => {
    try {
      // 记录当前尝试信息
      const attemptNumber = maxRetries - remainingRetries + 1;
      const elapsedTime = Date.now() - startTime;
      console.log(`Attempt ${attemptNumber}/${maxRetries + 1}, elapsed time: ${elapsedTime}ms`);

      // 执行函数
      return await executeWithTimeout();
    } catch (error) {
      // 记录错误信息
      const elapsedTime = Date.now() - startTime;
      console.error(`Attempt failed after ${elapsedTime}ms:`, error);

      // 检查是否已达到最大重试次数
      if (remainingRetries <= 0) {
        console.log(`All ${maxRetries + 1} attempts failed after ${elapsedTime}ms`);
        throw error;
      }

      // 判断错误是否可重试
      if (!isRetryableError(error)) {
        console.log('Non-retryable error detected, aborting retry:', error);
        throw error;
      }

      // 计算下一次延迟，但设置上限为5000ms
      const nextDelay = Math.min(currentDelay * 1.5, 5000);

      console.log(`Retrying in ${currentDelay}ms, remaining retries: ${remainingRetries}`);
      await new Promise(resolve => setTimeout(resolve, currentDelay));

      // 递归调用下一次尝试
      return attemptWithRetry(remainingRetries - 1, nextDelay);
    }
  };

  // 开始第一次尝试
  return attemptWithRetry(retries, delay);
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