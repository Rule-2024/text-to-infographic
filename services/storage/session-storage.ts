'use client';

import { Generation } from '@/lib/types/infographic';

// 生成记录的存储键前缀
const GENERATION_KEY_PREFIX = 'infographic_generation_';

// 保存生成记录到会话存储
export function saveGeneration(generation: Generation): void {
  if (typeof window === 'undefined') return;

  try {
    const key = GENERATION_KEY_PREFIX + generation.id;
    sessionStorage.setItem(key, JSON.stringify(generation));
  } catch (error) {
    console.error('保存生成记录失败:', error);
  }
}

// 从会话存储获取生成记录
export function getGeneration(id: string): Generation | null {
  if (typeof window === 'undefined') return null;

  try {
    const key = GENERATION_KEY_PREFIX + id;
    const data = sessionStorage.getItem(key);

    if (!data) return null;

    return JSON.parse(data) as Generation;
  } catch (error) {
    console.error('获取生成记录失败:', error);
    return null;
  }
}

// 更新生成记录状态
export function updateGenerationStatus(
  id: string,
  status: Generation['status'],
  result?: string
): Generation | null {
  const generation = getGeneration(id);

  if (!generation) return null;

  const updatedGeneration = {
    ...generation,
    status,
    ...(result ? { result } : {}),
  };

  saveGeneration(updatedGeneration);
  return updatedGeneration;
}

// 获取所有生成记录
export function getAllGenerations(): Generation[] {
  if (typeof window === 'undefined') return [];

  try {
    const generations: Generation[] = [];

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);

      if (key?.startsWith(GENERATION_KEY_PREFIX)) {
        const data = sessionStorage.getItem(key);

        if (data) {
          generations.push(JSON.parse(data) as Generation);
        }
      }
    }

    return generations;
  } catch (error) {
    console.error('获取所有生成记录失败:', error);
    return [];
  }
}
