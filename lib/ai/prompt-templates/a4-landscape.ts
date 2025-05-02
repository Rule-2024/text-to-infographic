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
    body {
      margin: 0;
      padding: 0;
      font-family: 'Noto Sans SC', sans-serif;
      background-color: #f5f5f5;
    }

    /* 信息图容器 - 固定A4横版尺寸 */
    .infographic-container {
      width: 1123px; /* 297mm */
      height: 794px; /* 210mm */
      position: relative;
      overflow: hidden;
      background-color: var(--background-color, #3B82F6);
    }

    /* 推广链接样式 - 确保始终位于最上层且不会与标题重叠 */
    .promo-link {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 1000; /* 确保始终位于最上层 */
      padding: 10px 15px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.95);
      text-decoration: none;
      font-weight: 500;
      letter-spacing: 0.3px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 0 0 8px 0;
      max-width: fit-content;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影增强可见性 */
    }

    .promo-link a {
      color: rgba(255, 255, 255, 1);
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px dotted rgba(255, 255, 255, 0.7);
    }

    /* 内容区域 - 确保与推广链接保持足够距离 */
    .content-area {
      position: absolute;
      top: 80px; /* 从推广链接下方开始，保持至少30px的垂直间距 */
      right: 57px; /* 15mm安全边距 */
      bottom: 57px; /* 15mm安全边距 */
      left: 57px; /* 15mm安全边距 */
      width: 1009px; /* 267mm */
      height: 680px; /* 180mm */
    }

    /* 确保标题与推广链接不重叠 */
    .content-area h1:first-child,
    .content-area h2:first-child,
    .content-area h3:first-child {
      margin-top: 20px; /* 为顶部标题添加额外边距 */
    }

    /* 其他样式代码... */
  </style>
</head>
<body>
  <div class="infographic-container">
    <!-- 渐变背景 -->
    <div class="gradient-bg gradient-blue"></div>
    <!-- 推广链接 -->
    <div class="promo-link">
      <span class="promo-text">更多精美信息图请到：</span>
      <a href="https://texttoinfographic.online" target="_blank">texttoinfographic.online</a>
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
- **推广链接**：必须在左上角添加"更多精美信息图请到：texttoinfographic.online"的推广链接，使用与信息图相同的语言

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

## 推广链接实现
* **位置要求**：必须在信息图左上角添加推广链接，与画布边缘保持20px的距离，确保与标题和其他内容有足够的间距，不会重叠
* **样式要求**：使用半透明背景，确保文本清晰可见，与整体设计协调，设置较高的z-index（如1000）确保始终位于最上层
* **内容要求**：显示"更多精美信息图请到：texttoinfographic.online"
* **语言适配**：推广文本必须使用与信息图相同的语言，根据输入文本自动调整
* **链接目标**：链接必须指向https://texttoinfographic.online网站
* **内容区域调整**：内容区域（包括标题）必须从推广链接下方开始，与推广链接保持至少30px的垂直间距，确保不会重叠

## 防止重叠的CSS样式示例

/* 推广链接样式 - 确保始终位于最上层且不会与标题重叠 */
.promo-link {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000; /* 确保始终位于最上层 */
  padding: 10px 15px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 0 0 8px 0;
  max-width: fit-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影增强可见性 */
}

/* 内容区域 - 确保与推广链接保持足够距离 */
.content-area {
  position: absolute;
  top: 80px; /* 从推广链接下方开始，保持至少30px的垂直间距 */
  right: 57px; /* 15mm安全边距 */
  bottom: 57px; /* 15mm安全边距 */
  left: 57px; /* 15mm安全边距 */
}

/* 确保标题与推广链接不重叠 */
.content-area h1:first-child,
.content-area h2:first-child,
.content-area h3:first-child {
  margin-top: 20px; /* 为顶部标题添加额外边距 */
}

请基于以上模板和规范，创建一个完整的HTML信息图，确保内容完整、布局合理、视觉效果优秀，并且推广链接与标题不会重叠。`;
}
