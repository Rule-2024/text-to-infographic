// 基础类型定义

// 文本输入表单类型
export interface TextInputForm {
  content: string;
  mode: 'full' | 'summary';
  size: '16-9' | 'a4-l' | 'a4-p' | '750';
}

// 生成记录类型
export interface Generation {
  id: string;
  content: string;
  mode: string;
  size: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: string;
  createdAt: Date;
}

// 尺寸配置类型
export interface SizeConfig {
  name: string;
  width: number;
  height: number;
  aspectRatio: number;
  description: string;
} 