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
    try {
      // 更细粒度的进度更新
      // 初始状态 - 任务开始
      await updateGenerationStatus(generationId, 'processing', 5);

      // 构建提示词
      console.log(`Building prompt for generation ${generationId}`);
      const prompt = buildPrompt(input);
      await updateGenerationStatus(generationId, 'processing', 15);

      // 准备调用AI服务
      console.log(`Preparing to call AI service for generation ${generationId}`);
      await updateGenerationStatus(generationId, 'processing', 25);

      // 调用AI服务生成HTML - 这是最耗时的步骤
      console.log(`Calling AI service for generation ${generationId}`);

      // 设置一个进度更新器，在等待AI响应期间提供进度更新
      let progressValue = 30;
      const progressInterval = setInterval(async () => {
        if (progressValue < 75) {
          progressValue += 5;
          await updateGenerationStatus(generationId, 'processing', progressValue);
        }
      }, 5000); // 每5秒更新一次进度

      try {
        // 使用优化的重试策略调用AI服务
        const html = await withRetry(
          () => generateInfographicHtml(prompt),
          2, // 减少重试次数以加快失败反馈
          1500, // 减少初始延迟以加快重试
          90000 // 添加90秒总超时，确保不会无限等待
        );

        // 清除进度更新器
        clearInterval(progressInterval);

        // AI响应成功，更新进度
        await updateGenerationStatus(generationId, 'processing', 80);

        // 处理生成的HTML
        console.log(`Processing HTML for generation ${generationId}`);
        const processedHtml = processGeneratedHtml(html);
        await updateGenerationStatus(generationId, 'processing', 90);

        // 保存结果到数据库
        console.log(`Saving result for generation ${generationId}`);
        await saveGenerationResult(generationId, processedHtml);
      } catch (error) {
        // 确保清除进度更新器
        clearInterval(progressInterval);
        throw error;
      }

    } catch (error) {
      console.error('Infographic generation failed:', error);

      // Update status to failed
      await updateGenerationStatus(
        generationId,
        'failed',
        0,
        error instanceof Error ? error.message : 'Unknown error'
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