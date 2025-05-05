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
      // Update status to processing with 10% progress
      await updateGenerationStatus(generationId, 'processing', 10);

      // Build prompt
      const prompt = buildPrompt(input);

      // Update progress to 30%
      await updateGenerationStatus(generationId, 'processing', 30);

      // Call AI service to generate HTML with increased retries and delay
      const html = await withRetry(
        () => generateInfographicHtml(prompt),
        4, // Increased from 2 to 4 retries
        3000 // Increased from 2000ms to 3000ms initial retry delay
      );

      // Update progress to 80%
      await updateGenerationStatus(generationId, 'processing', 80);

      // Process generated HTML
      const processedHtml = processGeneratedHtml(html);

      // Save result to database
      await saveGenerationResult(generationId, processedHtml);

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