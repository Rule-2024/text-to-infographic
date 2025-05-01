/**
 * A4横版信息图HTML代码生成提示词模板
 * 来源：DOCS/prompt-templates/A4横版提示词.md
 */

/**
 * 获取A4横版信息图的提示词模板
 * @param content 用户输入的文本内容
 * @param mode 处理模式: 'full' = 提取70-80%精华内容保留结构, 'summary' = 提取20-30%核心精华
 * @returns 完整的提示词
 */
export function getA4LandscapePrompt(content: string, mode: 'full' | 'summary'): string {
  const processingMode = mode === 'full'
    ? '全文处理：提取文本70-80%的精华内容，保留原文逻辑结构和详细论述'
    : '总结处理：仅提取文本20-30%的核心精华，聚焦关键点和重要数据';

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A4横版信息图</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    /* 样式代码... */
  </style>
</head>
<body>
  <div class="infographic-container">
    <!-- 渐变背景 -->
    <div class="gradient-bg gradient-blue"></div>
    <!-- 推广链接 -->
    <div class="promo-link">
      <span class="promo-text">更多精美信息图请到：</span>
      <a href="https://texttoinfographic.online" target="_blank">texttoinfographic</a>
    </div>
    <div class="content-area">
      <!-- 信息图内容将在这里生成 -->
    </div>
  </div>
</body>
</html>`;

  return `# A4横版信息图HTML代码生成提示词

## 核心定位
你是一位专业的视觉信息图设计师，专注于创建高视觉冲击力、现代感强的A4横版信息图。你能将文章内容转化为令人震撼的视觉呈现，通过大胆的色彩、创意布局和精准的信息层次打造难忘的视觉体验。

## 【核心要求】
- **尺寸规格**：固定尺寸297mm×210mm（标准A4横版，约1123×794px）
- **安全区域**：四周15mm安全边距，所有内容（包括文本、图像和装饰元素）必须与画布边缘保持至少15mm的距离
- **内容区域**：267mm×180mm（297×210mm - 15mm×2）
- **内容完整性**：确保所有重要内容完整呈现，不截断关键信息
- **完全静态**：生成的信息图必须是完全静态的，禁止任何JavaScript交互、悬停效果、动画或其他动态效果
- **输出格式**：最终输出必须是完整的HTML代码，包含所有必要的HTML结构、CSS样式和内容

## 设计任务
创建一个符合标准A4横版尺寸(297mm×210mm)的高质量信息图，高效呈现以下内容并使用${processingMode}：

${content}

## 重要输出要求
- 必须生成完整的HTML和CSS代码，而不是图片或图片描述
- 输出应该是可以直接复制粘贴到HTML文件中并在浏览器中运行的代码
- 不要描述你会如何设计，而是直接提供完整的HTML代码实现
- 使用与输入文本相同的语言
- 内容结构清晰，视觉层次分明
- 根据文本内容特性，选择最合适的视觉风格，确保风格与内容高度匹配
- 为每个设计应用独特的视觉语言，避免千篇一律的模板化处理

## 基础HTML模板参考
\`\`\`html
${htmlTemplate}
\`\`\`

## 样式规范
1. 字体规范：
   - 主要字体：Noto Sans SC
   - 标题：20-32px
   - 正文：14-16px
   - 备注：12px

2. 颜色规范：
   - 主色系：根据内容特性选择
   - 文本：深色背景用白色（rgba(255,255,255,0.95)），浅色背景用深色（rgba(0,0,0,0.85)）
   - 强调色：用于重点内容和视觉引导

3. 布局规范：
   - 使用网格系统
   - 保持15mm安全边距
   - 确保视觉层次清晰

4. 视觉元素：
   - 使用简洁的图形
   - 保持风格统一
   - 确保可读性优先

请基于以上模板和规范，创建一个完整的HTML信息图，确保内容完整、布局合理、视觉效果优秀。`;
}
