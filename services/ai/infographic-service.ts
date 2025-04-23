/**
 * Infographic Generation Service
 * Used to replace mock service, implementing real AI calls
 */
import { TextInputForm } from "@/lib/types/infographic";
import { buildPrompt, processGeneratedHtml } from "@/lib/ai/prompt-builder";
import { generateInfographicHtml, withRetry } from "@/lib/ai/api-client";

interface GenerationResult {
  html: string;
  timestamp: number;
}

// In-memory cache for storing generation results
// Note: In a production environment, a database or caching service should be used
const generationCache = new Map<string, GenerationResult>();
const generationStatus = new Map<string, {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}>();

/**
 * Generate infographic
 *
 * @param input User input form data
 * @returns Generation task ID
 */
export async function generateInfographic(input: TextInputForm): Promise<string> {
  // Generate unique ID (using uuid or nanoId)
  const generationId = crypto.randomUUID();

  // Set initial status
  generationStatus.set(generationId, {
    status: 'pending',
    progress: 0
  });

  // Execute generation process asynchronously
  (async () => {
    try {
      generationStatus.set(generationId, {
        status: 'processing',
        progress: 10
      });

      // Build prompt
      const prompt = buildPrompt(input);

      // Update progress
      generationStatus.set(generationId, {
        status: 'processing',
        progress: 30
      });

      // Call AI service to generate HTML
      const html = await withRetry(
        () => generateInfographicHtml(prompt),
        2, // Maximum 2 retries
        2000 // Initial retry delay 2 seconds
      );

      // Update progress
      generationStatus.set(generationId, {
        status: 'processing',
        progress: 80
      });

      // Process generated HTML
      const processedHtml = processGeneratedHtml(html);

      // Cache result
      generationCache.set(generationId, {
        html: processedHtml,
        timestamp: Date.now()
      });

      // Update status to completed
      generationStatus.set(generationId, {
        status: 'completed',
        progress: 100
      });

    } catch (error) {
      console.error('Infographic generation failed:', error);
      generationStatus.set(generationId, {
        status: 'failed',
        progress: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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
export async function checkGenerationStatus(id: string): Promise<{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: string;
  error?: string;
}> {
  // Get status
  const status = generationStatus.get(id);

  if (!status) {
    return {
      status: 'failed',
      progress: 0,
      error: 'Generation task not found'
    };
  }

  // If completed, return result
  if (status.status === 'completed') {
    const cached = generationCache.get(id);

    if (!cached) {
      return {
        status: 'failed',
        progress: 0,
        error: 'Result expired or lost'
      };
    }

    return {
      status: 'completed',
      progress: 100,
      result: cached.html
    };
  }

  // Return in-progress status
  return {
    status: status.status,
    progress: status.progress,
    error: status.error
  };
}