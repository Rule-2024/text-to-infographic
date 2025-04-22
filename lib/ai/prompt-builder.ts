/**
 * 提示词构建器
 * 根据用户输入和选择构建适合的提示词
 */

import { TextInputForm } from "@/lib/types/infographic";
import { getPromptBySize } from "./prompt-templates";

/**
 * 构建提示词
 * 根据用户输入和设置构建适合的提示词
 * 
 * @param input 用户输入表单数据
 * @returns 构建好的提示词
 */
export function buildPrompt(input: TextInputForm): string {
  // 获取匹配尺寸的提示词生成函数
  const promptGenerator = getPromptBySize(input.size);
  
  // 生成提示词
  const prompt = promptGenerator(input.content, input.mode);
  
  // 返回构建好的提示词
  return prompt;
}

/**
 * 分析生成的HTML结果
 * 可以用于检查、清理或准备HTML结果
 * 
 * @param html 生成的HTML内容
 * @returns 处理后的HTML
 */
export function processGeneratedHtml(html: string): string {
  // MVP阶段简单返回原始HTML
  // 后续可以添加清理、验证或增强逻辑
  return html;
} 