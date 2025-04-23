/**
 * Prompt Builder
 * Build appropriate prompts based on user input and selections
 */

import { TextInputForm } from "@/lib/types/infographic";
import { getPromptBySize } from "./prompt-templates";

/**
 * Build prompt
 * Construct appropriate prompt based on user input and settings
 *
 * @param input User input form data
 * @returns Constructed prompt
 */
export function buildPrompt(input: TextInputForm): string {
  // Get the prompt generator function matching the size
  const promptGenerator = getPromptBySize(input.size);

  // Generate the prompt
  const prompt = promptGenerator(input.content, input.mode);

  // Return the constructed prompt
  return prompt;
}

/**
 * Analyze generated HTML result
 * Can be used to check, clean, or prepare HTML results
 *
 * @param html Generated HTML content
 * @returns Processed HTML
 */
export function processGeneratedHtml(html: string): string {
  // For MVP stage, simply return the original HTML
  // Later can add cleaning, validation, or enhancement logic
  return html;
}