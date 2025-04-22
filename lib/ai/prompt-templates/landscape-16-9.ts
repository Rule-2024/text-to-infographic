/**
 * 横版16:9提示词模板 (1920×1080px)
 * 从DOCS/prompt-templates/横版提示词.txt提取和优化
 */

/**
 * 获取横版(16:9)信息图的提示词模板
 * @param content 用户输入的文本内容
 * @param mode 处理模式: 'full' = 保留完整结构, 'summary' = 提取关键点
 * @returns 完整的提示词
 */
export function getLandscape16x9Prompt(content: string, mode: 'full' | 'summary'): string {
  const processingMode = mode === 'full' 
    ? '全文处理：保留原文完整逻辑结构和重要细节' 
    : '总结处理：提炼核心观点和关键支撑点';

  return `
# 横版信息图设计师提示词

## 核心定位
创建一个视觉吸引力强、信息密度高、结构清晰的横版16:9信息图，将文本内容转化为结构化的可视化展示，同时保持原始内容的完整性和语言特性。

## 尺寸要求
* 宽度: 1920像素
* 高度: 1080像素
* 长宽比: 16:9
* 安全边距: 四周50像素

## 设计任务
根据用户提供的原始文本内容，创建一个专业的横版信息图，包含以下元素：
1. 醒目的主标题和副标题
2. 结构清晰的内容布局
3. 适当的图标、图表和视觉元素
4. 协调的配色方案
5. 清晰的排版层次
6. 响应式设计考虑

### 视觉设计流程
#### 1. 内容分析阶段
* **信息结构分析**：识别文本的标题、子标题、段落、列表等结构
* **关键点提取**：识别并突出核心观点和关键数据
* **内容分组**：将相关内容组织到逻辑块中
* **视觉层次规划**：为不同级别的信息确定视觉权重
* **语言识别**：保持原始文本的语言特性（如中文、英文等）

#### 2. 视觉设计实现阶段
* **网格系统**：建立16:9比例下的网格系统作为设计基础
* **色彩系统**：创建主色+辅助色+强调色的系统
* **排版系统**：为各级标题和正文建立一致的字体系统
* **图标系统**：根据内容选择或创建主题一致的图标
* **数据可视化**：将数字和统计数据转化为图表
* **空间分配**：确保内容分布均衡，避免过度拥挤
* **视觉重点**：创建明确的视觉焦点引导阅读路径

#### 3. 专业优化阶段
* **视觉平衡**：调整元素位置和大小确保整体平衡
* **一致性检查**：确保设计元素在整个信息图中保持一致
* **信息层次**：通过大小、颜色、位置强化信息层次
* **简洁性**：移除不必要的装饰，确保每个元素都有目的
* **阅读流畅性**：确保观众可以轻松理解阅读路径
* **可访问性**：确保足够的色彩对比度和易读性
* **语言适配**：确保设计适应原始文本的语言特性

### 视觉设计指南

#### 色彩系统
* **主色调**：使用与主题相关的专业色调
* **对比度**：确保文本与背景之间有足够对比度
* **色彩一致性**：在整个信息图中保持一致的色彩方案
* **情感联系**：使用能引起共鸣的色彩心理效应
* **强调色**：仅用于突出最重要的信息
* **色彩层次**：使用色彩区分不同信息层级

#### 排版系统
* **字体选择**：使用清晰易读的无衬线字体
* **标题层级**：为不同级别的标题使用不同大小
* **行高控制**：确保适当的行间距提高可读性
* **对齐规则**：保持一致的文本对齐方式
* **字重变化**：通过字重变化创建视觉层次
* **字体大小范围**：
  - 主标题: 32-40px
  - 副标题: 24-32px
  - 小标题: 18-24px
  - 正文: 16-18px
  - 说明文字: 14px
  - 注释: 12px

#### 图标系统
* **风格一致性**：所有图标保持一致的视觉风格
* **简洁明了**：图标设计简洁，易于识别
* **大小协调**：图标大小与周围元素协调
* **意义相关**：图标直观反映相关内容
* **密度适中**：避免过多图标导致视觉疲劳

### 技术实现

#### HTML基础结构
\`\`\`html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>信息图 - 横版16:9</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    :root {
      /* 色彩变量 */
      --primary-color: #2c3e50;
      --secondary-color: #3498db;
      --accent-color: #e74c3c;
      --background-color: #ecf0f1;
      --text-color: #333333;
      --light-text: #7f8c8d;
      --border-color: #bdc3c7;
      
      /* 间距变量 */
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      
      /* 字体大小变量 */
      --font-xxs: 12px;
      --font-xs: 14px;
      --font-sm: 16px;
      --font-md: 18px;
      --font-lg: 24px;
      --font-xl: 32px;
      --font-xxl: 40px;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans SC', sans-serif;
      color: var(--text-color);
      background-color: #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    
    .infographic-container {
      width: 1920px;
      height: 1080px;
      background-color: var(--background-color);
      overflow: hidden;
      position: relative;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      padding: 50px;
    }
    
    /* 主标题样式 */
    .main-title {
      font-size: var(--font-xxl);
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: var(--spacing-lg);
      text-align: center;
    }
    
    .subtitle {
      font-size: var(--font-xl);
      font-weight: 500;
      color: var(--secondary-color);
      margin-bottom: var(--spacing-xl);
      text-align: center;
    }
    
    /* 段落样式 */
    p {
      font-size: var(--font-sm);
      line-height: 1.6;
      margin-bottom: var(--spacing-md);
    }
    
    /* 图标样式 */
    .icon {
      color: var(--secondary-color);
      margin-right: var(--spacing-sm);
    }
    
    /* 卡片样式 */
    .card {
      background-color: white;
      border-radius: 8px;
      padding: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    .card-title {
      font-size: var(--font-lg);
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: var(--spacing-md);
      display: flex;
      align-items: center;
    }
    
    /* 列表样式 */
    ul, ol {
      margin-left: var(--spacing-xl);
      margin-bottom: var(--spacing-md);
    }
    
    li {
      font-size: var(--font-sm);
      line-height: 1.6;
      margin-bottom: var(--spacing-sm);
    }
    
    /* 表格样式 */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: var(--spacing-lg);
    }
    
    th, td {
      border: 1px solid var(--border-color);
      padding: var(--spacing-sm);
      text-align: left;
    }
    
    th {
      background-color: var(--secondary-color);
      color: white;
    }
    
    /* 引用样式 */
    blockquote {
      border-left: 4px solid var(--accent-color);
      padding-left: var(--spacing-md);
      font-style: italic;
      margin: var(--spacing-md) 0;
    }
    
    /* 布局辅助类 */
    .flex-container {
      display: flex;
    }
    
    .flex-column {
      flex-direction: column;
    }
    
    .flex-row {
      flex-direction: row;
    }
    
    .space-between {
      justify-content: space-between;
    }
    
    .align-center {
      align-items: center;
    }
    
    .grid-container {
      display: grid;
      grid-gap: var(--spacing-md);
    }
    
    .two-column {
      grid-template-columns: 1fr 1fr;
    }
    
    .three-column {
      grid-template-columns: 1fr 1fr 1fr;
    }
    
    .four-column {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    
    /* 打印优化类 */
    @media print {
      body {
        background: none;
      }
      
      .infographic-container {
        box-shadow: none;
        page-break-inside: avoid;
      }
    }
    
    /* 响应式类 */
    @media screen and (max-width: 1920px) {
      .infographic-container {
        transform-origin: top left;
        transform: scale(calc(100vw / 1920));
        height: calc(1080px * (100vw / 1920));
      }
    }
  </style>
</head>
<body>
  <div class="infographic-container">
    <!-- 内容将在这里动态生成 -->
  </div>
</body>
</html>
\`\`\`

### 响应式与打印渲染技术
* **等比例缩放**：使用CSS transform保持16:9比例
* **像素精确**：确保所有元素对齐到像素边界，避免显示模糊
* **打印媒体查询**：使用@media print确保打印时正确显示
* **视窗适配**：使用vw单位确保在预览时正确显示
* **边界保护**：保持安全边距确保内容不会被裁切
* **过载保护**：确保文本和图片不会溢出指定区域

### CSS布局技术
* **Flexbox布局**：灵活排列内容元素
* **Grid布局**：创建结构化的多列内容区域
* **盒模型控制**：使用box-sizing确保精确尺寸计算
* **定位技术**：使用相对和绝对定位实现复杂布局
* **溢出控制**：确保内容不会溢出设计区域

## 输出格式
请创建一个完整的HTML文档，包含内联CSS样式，确保以下特点：

1. 严格符合横版16:9尺寸(1920×1080px)
2. 所有内容在一页内完整显示，不出现截断或溢出
3. 包含清晰的标题和副标题，使用与输入文本相同的语言
4. 内容结构良好，视觉层次分明
5. 使用现代且协调的色彩和排版系统
6. 预留50px安全边距，确保内容不被意外裁切
7. 所有文本使用与原文相同的语言且清晰可读
8. 适合屏幕观看和静态图片导出的需求
9. 内容量必须严格控制在固定容器尺寸内，不需要滚动查看
10. **全文模式特别注意**: 必须展示所有关键内容，通过优化布局和表达方式而非删减实质内容来适应空间限制

生成的HTML信息图应当专业、简洁、信息丰富，能够有效传达原文内容的核心价值，同时完全保持原文的语言和文化特性。必须确保所有内容在16:9尺寸内完整呈现，如内容过多应智能精简而非截断。对于全文模式，必须保持原文的完整逻辑结构和所有关键信息点，仅在表达方式上进行优化。HTML代码必须可以直接在现代浏览器中正确显示，不依赖外部文件。
`;
} 