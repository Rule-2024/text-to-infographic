/**
 * Prompt template index file
 * Export all prompt templates for unified reference
 */

import { getLandscape16x9Prompt } from './landscape-16-9';
import { getA4LandscapePrompt } from './a4-landscape';
import { getA4PortraitPrompt } from './a4-portrait';
import { getMobilePrompt } from './mobile';

export {
  getLandscape16x9Prompt,
  getA4LandscapePrompt,
  getA4PortraitPrompt,
  getMobilePrompt
};

/**
 * Get the prompt generation function based on size identifier
 * @param size Size identifier: 'mobile', '16:9'
 * @returns Corresponding prompt generation function
 */
export function getPromptBySize(size: string): (content: string, mode: 'full' | 'summary') => string {
  switch (size.toLowerCase()) {
    case 'mobile':
    case 'vertical':
    case '9:16 mobile':
    case 'portrait':
    case '9:16':
    case 'tiktok':
      return getMobilePrompt;
    case 'landscape':
    case '16:9':
    case 'horizontal':
      return getLandscape16x9Prompt;
    case 'a4':
    case 'a4-landscape':
    case 'a4-landscape-cn':
      return getA4LandscapePrompt;
    default:
      return getMobilePrompt; // Default to mobile prompt
  }
}