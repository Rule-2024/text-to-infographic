import { SizeConfig } from "../types/infographic";

// 最大文本长度限制
export const MAX_TEXT_LENGTH = 5000;

// 处理模式选项
export const PROCESSING_MODES = [
  { value: 'full', label: '全文处理 - 保留原文逻辑结构' },
  { value: 'summary', label: '总结处理 - 提取关键点和数据' }
];

// 尺寸配置选项
export const SIZE_OPTIONS: Record<string, SizeConfig> = {
  '16-9': {
    name: '横版 16:9',
    width: 1920,
    height: 1080,
    aspectRatio: 16/9,
    description: '适合演示'
  },
  'a4-l': {
    name: 'A4纸 横版',
    width: 297,
    height: 210,
    aspectRatio: 297/210,
    description: '适合打印'
  },
  'a4-p': {
    name: 'A4纸 竖版',
    width: 210,
    height: 297,
    aspectRatio: 210/297,
    description: '适合打印'
  },
  '750': {
    name: '竖版 750px宽',
    width: 750,
    height: 1334,
    aspectRatio: 750/1334,
    description: '适合移动设备'
  }
};

// 导出格式选项
export const EXPORT_FORMATS = [
  { value: 'png', label: 'PNG', mimeType: 'image/png' },
  { value: 'jpg', label: 'JPG', mimeType: 'image/jpeg' },
  { value: 'pdf', label: 'PDF', mimeType: 'application/pdf' }
]; 