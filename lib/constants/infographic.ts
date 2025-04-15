import { SizeConfig } from "../types/infographic";

// 最大文本长度限制
export const MAX_TEXT_LENGTH = 5000;

// 处理模式选项
export const PROCESSING_MODES = [
  { value: 'full', label: 'Full Processing - Preserve Original Structure' },
  { value: 'summary', label: 'Summary Processing - Extract Key Points and Data' }
];

// 尺寸配置选项
export const SIZE_OPTIONS: Record<string, SizeConfig> = {
  '16-9': {
    name: 'Landscape 16:9',
    width: 1920,
    height: 1080,
    aspectRatio: 16/9,
    description: 'Suitable for presentations'
  },
  'a4-l': {
    name: 'A4 Landscape',
    width: 297,
    height: 210,
    aspectRatio: 297/210,
    description: 'Suitable for printing'
  },
  'a4-p': {
    name: 'A4 Portrait',
    width: 210,
    height: 297,
    aspectRatio: 210/297,
    description: 'Suitable for printing'
  },
  '750': {
    name: 'Portrait 750px wide',
    width: 750,
    height: 1334,
    aspectRatio: 750/1334,
    description: 'Suitable for mobile devices'
  }
};

// 导出格式选项
export const EXPORT_FORMATS = [
  { value: 'png', label: 'PNG', mimeType: 'image/png' },
  { value: 'jpg', label: 'JPG', mimeType: 'image/jpeg' },
  { value: 'pdf', label: 'PDF', mimeType: 'application/pdf' }
]; 