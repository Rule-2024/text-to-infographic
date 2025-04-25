/**
 * AI API Client
 * Handle communication with AI services
 */

/**
 * Call AI service to generate infographic HTML
 *
 * @param prompt Complete prompt
 * @returns Generated HTML content
 */
export async function generateInfographicHtml(prompt: string): Promise<string> {
  try {
    // Get DeepSeek API key and base URL
    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_API_URL || 'https://api.lkeap.cloud.tencent.com/v1/chat/completions';
    const model = process.env.AI_API_MODEL || 'deepseek-v3-0324';

    if (!apiKey) throw new Error('AI_API_KEY not configured');

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
        max_tokens: 8192 // 设置较大的输出长度以确保完整的信息图HTML
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
 * Wrapper function for retry logic
 *
 * @param fn Async function to execute
 * @param retries Number of retries
 * @param delay Retry interval (milliseconds)
 * @returns Function execution result
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

    console.log(`Operation failed, retrying in ${delay}ms, remaining retries: ${retries-1}`);
    await new Promise(resolve => setTimeout(resolve, delay));

    return withRetry(fn, retries - 1, delay * 1.5); // Exponential backoff
  }
}