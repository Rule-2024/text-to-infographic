/**
 * Prompt template index file
 * Export all prompt templates for unified reference
 */

import { getLandscape16x9Prompt } from './landscape-16-9';
import { getA4LandscapePrompt } from './a4-landscape';
import { getA4PortraitPrompt } from './a4-portrait';
import { getMobilePrompt } from './mobile';

export { getLandscape16x9Prompt, getA4LandscapePrompt, getA4PortraitPrompt, getMobilePrompt };

/**
 * Get the prompt generation function based on size identifier
 * @param size Size identifier: 'mobile', '16:9', '16-9', 'a4-l', 'a4-p', '750'
 * @returns Corresponding prompt generation function
 */
export function getPromptBySize(
  size: string
): (content: string, mode: 'full' | 'summary') => string {
  switch (size.toLowerCase()) {
    // 移动设备竖版 (750px宽)
    case 'mobile':
    case 'vertical':
    case '9:16 mobile':
    case 'portrait':
    case '9:16':
    case 'tiktok':
    case '750': // 添加SIZE_OPTIONS中的标识符
      return getMobilePrompt;

    // 横版16:9 (1920×1080px)
    case 'landscape':
    case '16:9':
    case '16-9': // 添加SIZE_OPTIONS中的标识符
    case 'horizontal':
      return getLandscape16x9Prompt;

    // A4横版
    case 'a4':
    case 'a4-landscape':
    case 'a4-l': // 添加SIZE_OPTIONS中的标识符
    case 'a4-landscape-cn':
      return getA4LandscapePrompt;

    // A4竖版
    case 'a4-p': // 添加SIZE_OPTIONS中的标识符
    case 'a4-portrait':
      return getA4PortraitPrompt;

    default:
      return getMobilePrompt; // Default to mobile prompt
  }
}
