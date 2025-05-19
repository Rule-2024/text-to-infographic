/**
 * AI API Client
 * Handle communication with AI services
 */

// 跟踪API预热状态
let apiWarmedUp = false;
let lastApiCallTime = 0;
const API_COOLDOWN_PERIOD = 5 * 60 * 1000; // 5分钟冷却期

/**
 * 预热API连接，减少第一次调用失败的概率
 * 发送一个轻量级请求来激活API服务
 */
export async function warmupApiConnection(): Promise<void> {
  // 如果API已经预热且在冷却期内，跳过
  const now = Date.now();
  if (apiWarmedUp && (now - lastApiCallTime < API_COOLDOWN_PERIOD)) {
    console.log('API already warmed up recently, skipping warmup');
    return;
  }

  try {
    console.log('Warming up API connection...');
    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_API_URL || 'https://api.lkeap.cloud.tencent.com/v1/chat/completions';
    const model = process.env.AI_API_MODEL || 'deepseek-v3-0324';

    if (!apiKey) {
      console.log('API key not configured, skipping warmup');
      return;
    }

    // 发送一个简单的请求来激活API连接
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Request-ID': `warmup-${Math.random().toString(36).substring(2, 10)}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello' }
        ],
        temperature: 0.7,
        max_tokens: 10, // 只需要很少的token
        stream: false
      }),
    });

    if (response.ok) {
      console.log('API connection successfully warmed up');
      apiWarmedUp = true;
      lastApiCallTime = now;
    } else {
      console.log(`API warmup failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('API warmup failed:', error);
    // 预热失败不阻止后续操作
  }
}

/**
 * Call AI service to generate infographic HTML
 *
 * @param prompt Complete prompt
 * @param size Size identifier (optional): '16-9', 'a4-l', 'a4-p', '750'
 * @returns Generated HTML content
 */
export async function generateInfographicHtml(prompt: string, size?: string): Promise<string> {
  try {
    // 记录API调用开始时间（用于性能监控）
    const startTime = Date.now();

    // 如果API未预热，先尝试预热
    if (!apiWarmedUp) {
      await warmupApiConnection().catch(err => {
        // 预热失败不阻止主请求
        console.log('API warmup failed, continuing with main request:', err);
      });
    }

    // Get DeepSeek API key and base URL
    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_API_URL || 'https://api.lkeap.cloud.tencent.com/v1/chat/completions';
    const model = process.env.AI_API_MODEL || 'deepseek-v3-0324';

    if (!apiKey) throw new Error('AI_API_KEY not configured');

    // 检查是否使用模拟服务
    const useMockService = process.env.USE_MOCK_SERVICE === 'true';
    if (useMockService) {
      console.log('Using mock service for AI generation');
    }

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
    // 添加请求ID用于跟踪
    const requestId = Math.random().toString(36).substring(2, 15);
    console.log(`Starting API request ${requestId} for size: ${size || 'default'}`);

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'X-Request-ID': requestId
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

      // 记录API响应时间
      const responseTime = Date.now() - startTime;
      console.log(`API request ${requestId} received response in ${responseTime}ms`);

      if (!response.ok) {
        let errorMessage = `API request ${requestId} failed: HTTP ${response.status}`;

        try {
          const errorData = await response.json();
          errorMessage += ` - ${JSON.stringify(errorData)}`;

          // 检查是否是API密钥错误
          if (response.status === 401 ||
              (errorData.error && errorData.error.includes('key'))) {
            throw new Error(`API authentication failed: Please check your API_API_KEY configuration (${response.status})`);
          }

          // 检查是否是配额或限流错误
          if (response.status === 429) {
            throw new Error(`API rate limit exceeded: The service is currently busy or you've exceeded your quota (${response.status})`);
          }
        } catch (parseError) {
          // 如果无法解析JSON，使用原始错误消息
          errorMessage += ` (Response could not be parsed)`;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Extract HTML content
      const html = data.choices?.[0]?.message?.content;

      if (!html) {
        throw new Error(`DeepSeek did not return HTML content for request ${requestId}`);
      }

      // 记录成功完成
      const totalTime = Date.now() - startTime;
      console.log(`API request ${requestId} completed successfully in ${totalTime}ms`);

      return html;
    } catch (fetchError) {
      // 记录详细的网络错误
      const errorTime = Date.now() - startTime;
      console.error(`API request ${requestId} failed after ${errorTime}ms:`, fetchError);

      // 重新抛出更具描述性的错误
      if (fetchError instanceof Error) {
        if (fetchError.message.includes('fetch')) {
          throw new Error(`Network error connecting to AI service: ${fetchError.message}`);
        }
        throw fetchError;
      }

      throw new Error(`Unknown error in API request ${requestId}`);
    }
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
  // 生成唯一的操作ID用于日志跟踪
  const operationId = Math.random().toString(36).substring(2, 10);
  const startTime = Date.now();

  // 添加超时逻辑的包装函数
  const executeWithTimeout = async (): Promise<T> => {
    if (!timeout) return fn();

    console.log(`Operation ${operationId} started with ${timeout}ms timeout`);

    // 创建一个超时Promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        const elapsed = Date.now() - startTime;
        reject(new Error(`Operation ${operationId} timed out after ${elapsed}ms (limit: ${timeout}ms)`));
      }, timeout);
    });

    // 竞争：函数执行 vs 超时
    return Promise.race([fn(), timeoutPromise]);
  };

  try {
    const result = await executeWithTimeout();
    const elapsed = Date.now() - startTime;
    console.log(`Operation ${operationId} completed successfully in ${elapsed}ms`);
    return result;
  } catch (error) {
    const elapsed = Date.now() - startTime;

    // 检查是否已达到最大重试次数
    if (retries <= 0) {
      console.error(`Operation ${operationId} failed after ${elapsed}ms with no retries left:`, error);
      throw error;
    }

    // 判断错误是否可重试
    if (!isRetryableError(error)) {
      console.log(`Operation ${operationId} failed with non-retryable error after ${elapsed}ms:`, error);
      throw error;
    }

    // 计算下一次延迟，但设置上限为5000ms
    const nextDelay = Math.min(delay * 1.5, 5000);

    console.log(`Operation ${operationId} failed after ${elapsed}ms, retrying in ${delay}ms, remaining retries: ${retries-1}`);
    await new Promise(resolve => setTimeout(resolve, delay));

    // 递归调用，但保持相同的操作ID以便跟踪
    return withRetry(fn, retries - 1, nextDelay, timeout ? Math.max(timeout - elapsed, 30000) : undefined);
  }
}

/**
 * Determine if an error is retryable
 *
 * @param error The error to check
 * @returns True if the error is retryable, false otherwise
 */
function isRetryableError(error: any): boolean {
  // 如果没有错误消息，默认可重试
  if (!error) return true;

  const errorMessage = error?.message || '';
  const errorStack = error?.stack || '';

  // 记录详细错误信息以便调试
  console.log(`Evaluating if error is retryable: ${errorMessage.substring(0, 100)}...`);

  // 网络错误、超时、服务器繁忙等通常可以重试
  const retryablePatterns = [
    'network', 'timeout', 'timed out', 'time out',
    '429', '500', '502', '503', '504',  // HTTP错误码
    'connection', 'connect',
    'ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'ENOTFOUND',
    'temporary', 'temporarily', 'overloaded', 'busy',
    'rate limit', 'too many requests',
    'try again', 'retry'
  ];

  for (const pattern of retryablePatterns) {
    if (errorMessage.toLowerCase().includes(pattern.toLowerCase()) ||
        errorStack.toLowerCase().includes(pattern.toLowerCase())) {
      console.log(`Error is retryable due to pattern: ${pattern}`);
      return true;
    }
  }

  // API密钥错误、格式错误等通常不应重试
  const nonRetryablePatterns = [
    'API key', 'apikey', 'api_key', 'key',
    'invalid format', 'invalid input', 'invalid parameter',
    'authentication', 'auth', 'unauthorized', 'not authorized',
    '401', '403', '400',  // HTTP错误码
    'permission', 'access denied',
    'not found', '404',
    'validation', 'invalid'
  ];

  for (const pattern of nonRetryablePatterns) {
    if (errorMessage.toLowerCase().includes(pattern.toLowerCase()) ||
        errorStack.toLowerCase().includes(pattern.toLowerCase())) {
      console.log(`Error is NOT retryable due to pattern: ${pattern}`);
      return false;
    }
  }

  // 默认可重试
  console.log('No specific pattern matched, defaulting to retryable');
  return true;
}