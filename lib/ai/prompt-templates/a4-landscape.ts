/**
 * A4横版提示词模板 (1123×794px)
 * 从DOCS/prompt-templates/A4横版提示词.txt提取和优化
 */

/**
 * 获取A4横版信息图的提示词模板
 * @param content 用户输入的文本内容
 * @param mode 处理模式: 'full' = 保留完整结构, 'summary' = 提取关键点
 * @returns 完整的提示词
 */
export function getA4LandscapePrompt(content: string, mode: 'full' | 'summary'): string {
  const processingMode = mode === 'full' 
    ? '全文处理：保留原文完整逻辑结构和重要细节' 
    : '总结处理：提炼核心观点和关键支撑点';

  return `
# A4横版信息图设计师提示词

## 核心定位
创建一个视觉吸引力强、信息密度高、结构清晰的A4横版信息图，将文本内容转化为结构化的可视化展示，同时保持原始内容的完整性和语言特性。

## 尺寸要求
* 宽度: 297mm (约1123像素@96dpi)
* 高度: 210mm (约794像素@96dpi)
* 比例: A4横版
* 安全边距: 四周15mm
* 打印适配: 确保无出血和安全边距

## 设计任务
根据用户提供的原始文本内容，创建一个专业的A4横版信息图，包含以下元素：
1. 醒目的主标题和副标题
2. 结构清晰的内容布局
3. 适当的图标、图表和视觉元素
4. 协调的配色方案
5. 清晰的排版层次
6. 完全打印友好设计

### 视觉设计流程
#### 1. 内容分析阶段
* **信息结构分析**：识别文本的标题、子标题、段落、列表等结构
* **关键点提取**：识别并突出核心观点和关键数据
* **内容分组**：将相关内容组织到逻辑块中
* **视觉层次规划**：为不同级别的信息确定视觉权重
* **语言识别**：保持原始文本的语言特性（如中文、英文等）
* **内容密度评估**：评估信息量与A4页面空间的匹配度

#### 2. 视觉设计实现阶段
* **网格系统**：建立基于A4尺寸的网格系统作为设计基础
* **色彩系统**：创建适合打印的CMYK兼容色彩系统
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
* **打印兼容性**：确保所有元素在打印时清晰可见
* **语言适配**：确保设计适应原始文本的语言特性

### 视觉设计指南

#### 色彩系统
* **打印安全色**：使用CMYK安全色彩范围
* **高对比度**：确保文本与背景之间有足够对比度（至少7:1）
* **色彩一致性**：在整个信息图中保持一致的色彩方案
* **黑色处理**：使用富黑色(rich black)而非纯黑色提高打印质量
* **色彩限制**：主要使用3-4种核心颜色，避免过度使用色彩
* **墨水覆盖率**：总墨水覆盖率控制在270%以下

#### 排版系统
* **字体选择**：使用打印友好的衬线或无衬线字体
* **标题层级**：为不同级别的标题使用不同大小和字重
* **行高控制**：正文行高设置为120-140%提高可读性
* **对齐规则**：保持一致的文本对齐方式（推荐左对齐）
* **字重变化**：通过字重变化创建视觉层次
* **字体大小范围**：
  - 主标题: 24-28pt
  - 副标题: 18-20pt
  - 小标题: 14-16pt
  - 正文: 10-12pt
  - 说明文字: 8-9pt
  - 注释: 6-7pt

#### 图表系统
* **简化图表**：确保图表在打印时清晰可辨
* **高对比度**：图表元素之间保持足够对比度
* **标签清晰**：所有图表标签清晰易读
* **图例明确**：提供清晰的图例说明数据含义
* **避免细线**：线条粗细至少0.25pt以确保打印清晰
* **填充模式**：使用打印友好的填充模式区分数据

### 技术实现

#### HTML基础结构
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>信息图 - A4横版</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    :root {
      /* 色彩变量 - 打印友好色彩 */
      --primary-color: #003366;
      --secondary-color: #336699;
      --accent-color: #990000;
      --background-color: #ffffff;
      --text-color: #333333;
      --light-text: #666666;
      --border-color: #cccccc;
      
      /* 间距变量 */
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 12px;
      --spacing-lg: 16px;
      --spacing-xl: 24px;
      
      /* 字体大小变量 */
      --font-xxs: 6pt;
      --font-xs: 8pt;
      --font-sm: 10pt;
      --font-md: 12pt;
      --font-lg: 16pt;
      --font-xl: 20pt;
      --font-xxl: 24pt;
      
      /* 打印尺寸变量 */
      --page-width: 297mm;
      --page-height: 210mm;
      --margin: 15mm;
      --content-width: calc(var(--page-width) - 2 * var(--margin));
      --content-height: calc(var(--page-height) - 2 * var(--margin));
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans SC', sans-serif;
      color: var(--text-color);
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    
    .infographic-container {
      width: var(--page-width);
      height: var(--page-height);
      background-color: var(--background-color);
      position: relative;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      padding: var(--margin);
      overflow: hidden;
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
      line-height: 1.4;
      margin-bottom: var(--spacing-md);
      text-align: justify;
    }
    
    /* 图标样式 */
    .icon {
      color: var(--secondary-color);
      margin-right: var(--spacing-sm);
    }
    
    /* 卡片样式 */
    .card {
      background-color: white;
      border-radius: 2mm;
      padding: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
      box-shadow: 0 1mm 2mm rgba(0, 0, 0, 0.05);
      border: 0.25pt solid var(--border-color);
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
      line-height: 1.4;
      margin-bottom: var(--spacing-xs);
    }
    
    /* 表格样式 */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: var(--spacing-lg);
      page-break-inside: avoid;
    }
    
    th, td {
      border: 0.5pt solid var(--border-color);
      padding: var(--spacing-sm);
      text-align: left;
      font-size: var(--font-sm);
    }
    
    th {
      background-color: var(--secondary-color);
      color: white;
      font-weight: 600;
    }
    
    /* 引用样式 */
    blockquote {
      border-left: 1mm solid var(--accent-color);
      padding-left: var(--spacing-md);
      font-style: italic;
      margin: var(--spacing-md) 0;
      color: var(--light-text);
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
      @page {
        size: A4 landscape;
        margin: 0;
      }
      
      body {
        background: none;
        padding: 0;
        margin: 0;
      }
      
      .infographic-container {
        width: 297mm;
        height: 210mm;
        box-shadow: none;
        page-break-after: always;
        margin: 0;
      }
      
      /* 避免元素被分割到不同页面 */
      .card, .section, h1, h2, h3, table, figure {
        page-break-inside: avoid;
      }
      
      /* 确保链接URL在打印时可见 */
      a[href]:after {
        content: " (" attr(href) ")";
        font-size: var(--font-xxs);
        color: var(--light-text);
      }
    }
    
    /* 打印标记和出血 */
    .crop-marks {
      display: none;
    }
    
    @media print {
      .crop-marks {
        display: block;
        position: absolute;
        width: 5mm;
        height: 5mm;
        border: none;
      }
      
      .crop-top-left {
        top: 5mm;
        left: 5mm;
        border-top: 0.25pt solid black;
        border-left: 0.25pt solid black;
      }
      
      .crop-top-right {
        top: 5mm;
        right: 5mm;
        border-top: 0.25pt solid black;
        border-right: 0.25pt solid black;
      }
      
      .crop-bottom-left {
        bottom: 5mm;
        left: 5mm;
        border-bottom: 0.25pt solid black;
        border-left: 0.25pt solid black;
      }
      
      .crop-bottom-right {
        bottom: 5mm;
        right: 5mm;
        border-bottom: 0.25pt solid black;
        border-right: 0.25pt solid black;
      }
    }
  </style>
</head>
<body>
  <div class="infographic-container">
    <!-- 裁切标记，仅在打印时显示 -->
    <div class="crop-marks crop-top-left"></div>
    <div class="crop-marks crop-top-right"></div>
    <div class="crop-marks crop-bottom-left"></div>
    <div class="crop-marks crop-bottom-right"></div>
    
    <!-- 内容将在这里动态生成 -->
  </div>
</body>
</html>

### 打印优化技术
* **纸张规格适配**：精确匹配A4尺寸(297×210mm)
* **打印安全区域**：核心内容保持在安全边距内
* **出血处理**：为边缘延伸元素预留3mm出血
* **高分辨率支持**：所有元素支持至少300dpi打印
* **墨水管理**：控制总墨水覆盖率，避免过度饱和
* **字体嵌入**：确保特殊字体在打印时正确显示
* **打印标记**：选择性添加裁切标记便于专业打印

### CSS布局技术
* **Flexbox布局**：灵活排列内容元素
* **Grid布局**：创建结构化的多列内容区域
* **打印媒体查询**：使用@media print优化打印表现
* **页面断点控制**：使用page-break-inside避免元素被分割
* **绝对单位**：使用mm和pt等打印单位确保一致性
* **盒模型控制**：使用box-sizing确保精确尺寸计算

## 输出格式
请创建一个完整的HTML文档，包含内联CSS样式，确保以下特点：

1. 严格符合A4横版尺寸(297×210mm)
2. 所有内容在一页内完整显示，不出现截断、溢出或分页
3. 包含清晰的标题和副标题，使用与输入文本相同的语言
4. 内容结构良好，视觉层次分明
5. 使用打印友好的色彩和排版系统
6. 预留15mm安全边距，确保内容在打印时不被裁切
7. 所有文本使用与原文相同的语言且清晰可读
8. 同时兼顾屏幕显示与高质量打印输出
9. 打印时包含必要的裁切标记和出血处理
10. **全文模式特别注意**: 必须展示所有关键内容，通过优化布局和表达方式而非删减实质内容来适应空间限制

生成的HTML信息图应当专业、简洁、信息丰富，能够有效传达原文内容的核心价值，同时完全保持原文的语言和文化特性。必须确保所有内容在A4尺寸内完整呈现，如内容过多应智能精简而非截断。对于全文模式，必须保持原文的完整逻辑结构和所有关键信息点，仅在表达方式上进行优化。HTML代码必须可以直接在现代浏览器中正确显示，设计成打开即可高质量打印，不依赖外部文件。
`;
}
