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

// 跟踪首次生成状态
let isFirstGeneration = true;

/**
 * Generate infographic
 *
 * @param input User input form data
 * @returns Generation task ID
 */
export async function generateInfographic(input: TextInputForm): Promise<string> {
  // Generate unique ID
  const generationId = crypto.randomUUID();
  console.log(`Starting infographic generation: ${generationId}, size: ${input.size}, mode: ${input.mode}`);

  // 检查是否是首次生成
  const isFirst = isFirstGeneration;
  if (isFirstGeneration) {
    console.log('This is the first generation since server start');
    isFirstGeneration = false;
  }

  // 创建初始记录，使用重试逻辑
  let recordCreated = false;
  let createAttempts = 0;
  const maxCreateAttempts = 3;

  while (!recordCreated && createAttempts < maxCreateAttempts) {
    recordCreated = await createGenerationRecord(generationId, input);
    if (!recordCreated) {
      createAttempts++;
      if (createAttempts >= maxCreateAttempts) {
        console.error(`Failed to create generation record after ${maxCreateAttempts} attempts`);
        throw new Error('Failed to initialize generation task. Please try again.');
      }
      console.warn(`Retrying record creation, attempt ${createAttempts}/${maxCreateAttempts}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * createAttempts));
    }
  }

  // Execute generation process asynchronously
  (async () => {
    try {
      // 更细粒度的进度更新
      // 初始状态 - 任务开始
      let statusUpdateSuccess = await updateGenerationStatus(generationId, 'processing', 5);
      if (!statusUpdateSuccess) {
        console.warn(`Failed to update initial status for ${generationId}, but continuing...`);
      }

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
        // 根据尺寸和是否是首次生成设置不同的超时时间
        let timeout = 90000; // 默认90秒超时

        // 为首次生成增加额外的超时时间
        const firstGenerationBonus = isFirst ? 60000 : 0; // 首次生成额外增加60秒

        // 为16:9、A4横版和A4竖版设置更长的超时时间
        if (input.size === '16-9') {
          timeout = 180000 + firstGenerationBonus; // 16:9格式使用180秒超时
          console.log(`Using extended timeout (${timeout}ms) for 16:9 format${isFirst ? ' (first generation)' : ''}`);
        } else if (input.size === 'a4-l' || input.size === 'a4-p') {
          timeout = 150000 + firstGenerationBonus; // A4格式使用150秒超时
          console.log(`Using extended timeout (${timeout}ms) for A4 format${isFirst ? ' (first generation)' : ''}`);
        } else {
          timeout = 90000 + firstGenerationBonus; // 移动版使用90秒超时
          console.log(`Using timeout (${timeout}ms) for mobile format${isFirst ? ' (first generation)' : ''}`);
        }

        // 使用优化的重试策略调用AI服务
        const html = await withRetry(
          () => generateInfographicHtml(prompt, input.size),
          isFirst ? 3 : 2, // 首次生成增加重试次数
          1500, // 减少初始延迟以加快重试
          timeout // 根据尺寸和是否是首次生成设置的超时时间
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
        let saveAttempts = 0;
        const maxSaveAttempts = 3;
        let saveSuccess = false;

        while (!saveSuccess && saveAttempts < maxSaveAttempts) {
          saveSuccess = await saveGenerationResult(generationId, processedHtml);
          if (!saveSuccess) {
            saveAttempts++;
            if (saveAttempts >= maxSaveAttempts) {
              console.error(`Failed to save generation result after ${maxSaveAttempts} attempts`);
              throw new Error('Failed to save generation result');
            }
            console.warn(`Retrying result save, attempt ${saveAttempts}/${maxSaveAttempts}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * saveAttempts));
          }
        }

        console.log(`Successfully completed generation ${generationId}`);
      } catch (error) {
        // 确保清除进度更新器
        clearInterval(progressInterval);
        throw error;
      }

    } catch (error) {
      console.error(`Infographic generation ${generationId} failed:`, error);

      // 提供更具体的错误信息
      let errorMessage = 'Generation failed';
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('aborted')) {
          errorMessage = 'Generation timed out. Please try again with shorter text or different settings.';
        } else if (error.message.includes('network') || error.message.includes('connection')) {
          errorMessage = 'Network connection issue. Please try again.';
        } else if (error.message.includes('API') || error.message.includes('key')) {
          errorMessage = 'AI service configuration issue. Please contact support.';
        } else {
          errorMessage = error.message;
        }
      }

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