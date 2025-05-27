// 从文本工具导出所有函数
export * from './text-utils';

// 生成唯一ID (使用内置的crypto API，无需额外依赖)
export function generateId(): string {
  // 简单的UUID v4生成
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 格式化日期为本地字符串
export function formatDate(date: Date): string {
  return date.toLocaleString();
}
