/**
 * 提示词模板索引文件
 * 统一导出所有提示词模板，方便统一引用
 */

import { getLandscape16x9Prompt } from './landscape-16-9';
import { getA4LandscapePrompt } from './a4-landscape';
import { getA4PortraitPrompt } from './a4-portrait';
import { getMobilePrompt } from './mobile';
import { getPortrait9x16Prompt } from './portrait-9-16';

export {
  getLandscape16x9Prompt,
  getA4LandscapePrompt,
  getA4PortraitPrompt,
  getMobilePrompt,
  getPortrait9x16Prompt
};

/**
 * 根据尺寸标识符获取对应的提示词生成函数
 * @param size 尺寸标识: 'mobile', '16:9'
 * @returns 对应的提示词生成函数
 */
export function getPromptBySize(size: string): (content: string, mode: 'full' | 'summary') => string {
  switch (size.toLowerCase()) {
    case 'mobile':
    case 'vertical':
    case '9:16 mobile':
      return getMobilePrompt;
    case 'landscape':
    case '16:9':
    case 'horizontal':
      return getLandscape16x9Prompt;
    case 'a4':
    case 'a4-landscape':
    case 'a4横版':
      return getA4LandscapePrompt;
    case 'portrait':
    case '9:16':
    case 'tiktok':
      return getPortrait9x16Prompt;
    default:
      return getMobilePrompt; // 默认使用移动端提示词
  }
} 