// 计算文本字符数（考虑中文等双字节字符）
export function countTextLength(text: string): number {
  // 简单版本：每个字符算一个，这适用于MVP阶段
  return text.length;
}

// 检查文本是否超过最大长度
export function isTextTooLong(text: string, maxLength: number = 5000): boolean {
  return countTextLength(text) > maxLength;
}

// 获取剩余可输入字符数
export function getRemainingCharCount(text: string, maxLength: number = 5000): number {
  return Math.max(0, maxLength - countTextLength(text));
}

// 截断文本到指定长度
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength);
} 