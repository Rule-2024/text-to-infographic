/**
 * Prompt Builder
 * Build appropriate prompts based on user input and selections
 */

import { TextInputForm } from '@/lib/types/infographic';
import { getPromptBySize } from './prompt-templates';

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
 * Clean, validate, and prepare HTML results for display
 *
 * @param html Generated HTML content
 * @returns Processed HTML
 */
export function processGeneratedHtml(html: string): string {
  // 1. 移除AI生成的说明文字
  // 这些文字通常出现在HTML内容之前，以"Here's"或类似的介绍性文字开头
  let processedHtml = html;

  // 尝试提取纯HTML部分
  const htmlStartIndex = html.indexOf('<html');
  const htmlEndIndex = html.lastIndexOf('</html>');

  if (htmlStartIndex !== -1 && htmlEndIndex !== -1 && htmlEndIndex > htmlStartIndex) {
    // 找到完整的HTML文档
    processedHtml = html.substring(htmlStartIndex, htmlEndIndex + 7); // 7是</html>的长度
  } else {
    // 如果没有完整的HTML标签，尝试提取body内容
    const bodyStartIndex = html.indexOf('<body');
    const bodyEndIndex = html.lastIndexOf('</body>');

    if (bodyStartIndex !== -1 && bodyEndIndex !== -1 && bodyEndIndex > bodyStartIndex) {
      processedHtml = html.substring(bodyStartIndex, bodyEndIndex + 7); // 7是</body>的长度
    } else {
      // 如果没有body标签，尝试查找第一个HTML元素
      const firstElementMatch = html.match(/<([a-z]+)[^>]*>/i);
      if (firstElementMatch && firstElementMatch.index) {
        // 从第一个HTML元素开始截取
        processedHtml = html.substring(firstElementMatch.index);

        // 移除前面的说明文字
        const introTextMatch = processedHtml.match(
          /^(Here's|I've created|This is|Below is|I have generated)[^<]*/i
        );
        if (introTextMatch) {
          processedHtml = processedHtml.substring(introTextMatch[0].length).trim();
        }
      }
    }
  }

  // 2. 确保HTML内容是完整的
  if (!processedHtml.includes('<html') && !processedHtml.includes('<body')) {
    // 如果没有完整的HTML结构，添加基本HTML结构
    processedHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  ${processedHtml}
</body>
</html>
    `.trim();
  }

  // 3. 移除可能的代码块标记
  processedHtml = processedHtml.replace(/```html/g, '');
  processedHtml = processedHtml.replace(/```/g, '');

  return processedHtml;
}
