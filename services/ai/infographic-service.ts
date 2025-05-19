/**
 * Infographic Generation Service
 * Used to replace mock service, implementing real AI calls with persistent storage
 */
import { TextInputForm, GenerationStatus } from "@/lib/types/infographic";
import { buildPrompt, processGeneratedHtml } from "@/lib/ai/prompt-builder";
import { generateInfographicHtml, withRetry } from "@/lib/ai/api-client";
import {
  createGenerationRecord,
  updateGenerationStatus,
  saveGenerationResult,
  getGenerationStatus
} from "@/services/storage/supabase-service";

/**
 * Generate infographic
 *
 * @param input User input form data
 * @returns Generation task ID
 */
export async function generateInfographic(input: TextInputForm): Promise<string> {
  // Generate unique ID
  const generationId = crypto.randomUUID();

  // Create initial record in database
  await createGenerationRecord(generationId, input);

  // Execute generation process asynchronously
  (async () => {
    // 设置一个进度更新器，在等待AI响应期间提供进度更新
    let progressValue = 5;
    let progressInterval: NodeJS.Timeout | null = null;

    // 初始化重试计数
    let retryCount = 0;
    const maxRetries = 3; // 增加最大重试次数，提高成功率

    // 创建进度更新函数
    const startProgressUpdates = () => {
      // 清除之前的进度更新器（如果存在）
      if (progressInterval) {
        clearInterval(progressInterval);
      }

      // 创建新的进度更新器
      progressInterval = setInterval(async () => {
        if (progressValue < 75) {
          progressValue += 3;
          await updateGenerationStatus(generationId, 'processing', progressValue);
        }
      }, 3000); // 每3秒更新一次进度
    };

    // 停止进度更新
    const stopProgressUpdates = () => {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    };

    try {
      // 初始状态 - 任务开始
      await updateGenerationStatus(generationId, 'processing', progressValue);
      startProgressUpdates();

      // 构建提示词
      console.log(`Building prompt for generation ${generationId}`);
      const prompt = buildPrompt(input);
      progressValue = 15;
      await updateGenerationStatus(generationId, 'processing', progressValue);

      // 准备调用AI服务
      console.log(`Preparing to call AI service for generation ${generationId}`);
      progressValue = 25;
      await updateGenerationStatus(generationId, 'processing', progressValue);

      // 调用AI服务生成HTML - 这是最耗时的步骤
      console.log(`Calling AI service for generation ${generationId}`);
      progressValue = 30;
      await updateGenerationStatus(generationId, 'processing', progressValue);

      // 根据尺寸设置不同的超时时间 - 增加所有超时时间
      let timeout = 120000; // 默认120秒超时（增加30秒）

      // 为16:9、A4横版和A4竖版设置更长的超时时间
      if (input.size === '16-9') {
        timeout = 240000; // 16:9格式使用240秒超时（增加60秒）
        console.log(`Using extended timeout (${timeout}ms) for 16:9 format`);
      } else if (input.size === 'a4-l' || input.size === 'a4-p') {
        timeout = 210000; // A4格式使用210秒超时（增加60秒）
        console.log(`Using extended timeout (${timeout}ms) for A4 format`);
      }

      // 定义生成函数，包含内部重试逻辑
      const generateWithRetries = async (): Promise<string> => {
        try {
          // 使用优化的重试策略调用AI服务
          return await withRetry(
            () => generateInfographicHtml(prompt, input.size),
            3, // 增加内部重试次数，提高成功率
            2000, // 增加初始延迟，给API更多恢复时间
            timeout // 根据尺寸设置的超时时间
          );
        } catch (error) {
          // 如果内部重试失败，检查是否还有外部重试次数
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Generation attempt ${retryCount} failed, retrying...`);

            // 短暂延迟后重试
            await new Promise(resolve => setTimeout(resolve, 2000));
            return generateWithRetries(); // 递归重试
          }

          // 如果已达到最大重试次数，抛出错误
          throw error;
        }
      };

      // 执行生成（包含重试逻辑）
      const html = await generateWithRetries();

      // 停止进度更新
      stopProgressUpdates();

      // AI响应成功，更新进度
      progressValue = 80;
      await updateGenerationStatus(generationId, 'processing', progressValue);

      // 处理生成的HTML
      console.log(`Processing HTML for generation ${generationId}`);
      const processedHtml = processGeneratedHtml(html);
      progressValue = 90;
      await updateGenerationStatus(generationId, 'processing', progressValue);

      // 保存结果到数据库
      console.log(`Saving result for generation ${generationId}`);
      await saveGenerationResult(generationId, processedHtml);

    } catch (error) {
      // 停止进度更新
      stopProgressUpdates();

      console.error('Infographic generation failed:', error);

      // 记录详细错误信息，包括重试次数
      const errorMessage = error instanceof Error
        ? `${error.message} (after ${retryCount} retries)`
        : `Unknown error (after ${retryCount} retries)`;

      console.error(`Generation ${generationId} failed: ${errorMessage}`);

      // Update status to failed
      await updateGenerationStatus(
        generationId,
        'failed',
        0,
        errorMessage
      );
    }
  })();

  // Return ID immediately
  return generationId;
}

/**
 * Check generation status
 *
 * @param id Generation task ID
 * @returns Task status and result
 */
export async function checkGenerationStatus(id: string): Promise<GenerationStatus> {
  // Get status from database
  return await getGenerationStatus(id);
}