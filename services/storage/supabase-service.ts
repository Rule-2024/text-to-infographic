import { adminSupabase } from '@/lib/supabase';
import { TextInputForm } from '@/lib/types/infographic';

/**
 * 创建新的生成任务记录
 *
 * @param id 生成任务ID
 * @param input 用户输入表单数据
 * @returns 创建是否成功
 */
export async function createGenerationRecord(id: string, input: TextInputForm): Promise<boolean> {
  try {
    const { error } = await adminSupabase
      .from('generations')
      .insert({
        id,
        status: 'pending',
        progress: 0,
        mode: input.mode,
        size: input.size,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to create generation record:', error);
    return false;
  }
}

/**
 * 更新生成任务状态
 *
 * @param id 生成任务ID
 * @param status 状态
 * @param progress 进度
 * @param error 错误信息（可选）
 * @returns 更新是否成功
 */
export async function updateGenerationStatus(
  id: string,
  status: 'pending' | 'processing' | 'completed' | 'failed',
  progress: number,
  error?: string
): Promise<boolean> {
  try {
    const { error: updateError } = await adminSupabase
      .from('generations')
      .update({
        status,
        progress,
        ...(error && { error }),
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (updateError) throw updateError;
    return true;
  } catch (error) {
    console.error('Failed to update generation status:', error);
    return false;
  }
}

/**
 * 保存生成结果
 *
 * @param id 生成任务ID
 * @param result HTML结果
 * @returns 保存是否成功
 */
export async function saveGenerationResult(id: string, result: string): Promise<boolean> {
  try {
    const { error } = await adminSupabase
      .from('generations')
      .update({
        status: 'completed',
        progress: 100,
        result,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to save generation result:', error);
    return false;
  }
}

/**
 * 获取生成任务状态
 *
 * @param id 生成任务ID
 * @returns 任务状态和结果
 */
export async function getGenerationStatus(id: string): Promise<{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: string;
  error?: string;
}> {
  try {
    const { data, error } = await adminSupabase
      .from('generations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      status: data.status,
      progress: data.progress,
      result: data.result,
      error: data.error
    };
  } catch (error) {
    console.error('Failed to get generation status:', error);
    return {
      status: 'failed',
      progress: 0,
      error: 'Generation task not found'
    };
  }
}
