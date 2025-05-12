import { adminSupabase } from '@/lib/supabase';
import { TextInputForm, GenerationStatus } from '@/lib/types/infographic';

// 跟踪Supabase连接状态
let supabaseInitialized = false;
let initializationAttempts = 0;
const MAX_INIT_ATTEMPTS = 3;

/**
 * 验证Supabase连接状态
 *
 * @returns 连接是否有效
 */
async function validateSupabaseConnection(): Promise<boolean> {
  try {
    // 如果已经初始化过，直接返回true
    if (supabaseInitialized) {
      return true;
    }

    // 增加尝试次数
    initializationAttempts++;

    // 尝试执行一个简单的查询来验证连接
    const { error } = await adminSupabase
      .from('generations')
      .select('id')
      .limit(1);

    // 如果没有错误，标记为已初始化
    if (!error) {
      console.log('Supabase connection validated successfully');
      supabaseInitialized = true;
      return true;
    }

    // 如果有错误但尚未达到最大尝试次数，等待后重试
    if (initializationAttempts < MAX_INIT_ATTEMPTS) {
      console.warn(`Supabase connection validation failed, attempt ${initializationAttempts}/${MAX_INIT_ATTEMPTS}. Retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒
      return await validateSupabaseConnection();
    }

    // 达到最大尝试次数，记录错误并返回失败
    console.error('Supabase connection validation failed after maximum attempts:', error);
    return false;
  } catch (error) {
    console.error('Error validating Supabase connection:', error);
    return false;
  }
}

/**
 * 创建新的生成任务记录
 *
 * @param id 生成任务ID
 * @param input 用户输入表单数据
 * @returns 创建是否成功
 */
export async function createGenerationRecord(id: string, input: TextInputForm): Promise<boolean> {
  try {
    // 验证Supabase连接
    const isConnected = await validateSupabaseConnection();
    if (!isConnected) {
      console.error('Cannot create generation record: Supabase connection is not valid');
      return false;
    }

    // 尝试创建记录，使用重试逻辑
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
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

        if (error) {
          // 如果是连接错误或超时，尝试重试
          if (error.message?.includes('connection') ||
              error.message?.includes('timeout') ||
              error.message?.includes('network')) {
            attempts++;
            console.warn(`Database connection issue, attempt ${attempts}/${maxAttempts}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // 指数退避
            continue;
          }

          // 其他错误直接抛出
          throw error;
        }

        // 成功创建记录
        console.log(`Successfully created generation record: ${id}`);
        return true;
      } catch (innerError) {
        attempts++;
        if (attempts >= maxAttempts) {
          throw innerError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    return false; // 不应该到达这里，但为了类型安全
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
    // 验证Supabase连接
    const isConnected = await validateSupabaseConnection();
    if (!isConnected) {
      console.error('Cannot update generation status: Supabase connection is not valid');
      return false;
    }

    // 尝试更新记录，使用重试逻辑
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
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

        if (updateError) {
          // 如果是连接错误或超时，尝试重试
          if (updateError.message?.includes('connection') ||
              updateError.message?.includes('timeout') ||
              updateError.message?.includes('network')) {
            attempts++;
            console.warn(`Database connection issue during status update, attempt ${attempts}/${maxAttempts}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // 指数退避
            continue;
          }

          // 其他错误直接抛出
          throw updateError;
        }

        // 成功更新记录
        return true;
      } catch (innerError) {
        attempts++;
        if (attempts >= maxAttempts) {
          throw innerError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    return false; // 不应该到达这里，但为了类型安全
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
    // 验证Supabase连接
    const isConnected = await validateSupabaseConnection();
    if (!isConnected) {
      console.error('Cannot save generation result: Supabase connection is not valid');
      return false;
    }

    // 尝试保存结果，使用重试逻辑
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
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

        if (error) {
          // 如果是连接错误或超时，尝试重试
          if (error.message?.includes('connection') ||
              error.message?.includes('timeout') ||
              error.message?.includes('network')) {
            attempts++;
            console.warn(`Database connection issue during result save, attempt ${attempts}/${maxAttempts}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // 指数退避
            continue;
          }

          // 其他错误直接抛出
          throw error;
        }

        // 成功保存结果
        console.log(`Successfully saved generation result for: ${id}`);
        return true;
      } catch (innerError) {
        attempts++;
        if (attempts >= maxAttempts) {
          throw innerError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    return false; // 不应该到达这里，但为了类型安全
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
export async function getGenerationStatus(id: string): Promise<GenerationStatus> {
  try {
    // 验证Supabase连接
    const isConnected = await validateSupabaseConnection();
    if (!isConnected) {
      console.error('Cannot get generation status: Supabase connection is not valid');
      return {
        status: 'failed',
        progress: 0,
        error: 'Database connection issue, please try again'
      };
    }

    // 尝试获取状态，使用重试逻辑
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const { data, error } = await adminSupabase
          .from('generations')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          // 如果是连接错误或超时，尝试重试
          if (error.message?.includes('connection') ||
              error.message?.includes('timeout') ||
              error.message?.includes('network')) {
            attempts++;
            console.warn(`Database connection issue during status check, attempt ${attempts}/${maxAttempts}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // 指数退避
            continue;
          }

          // 如果是记录不存在的错误，返回特定错误
          if (error.code === 'PGRST116') {
            return {
              status: 'failed',
              progress: 0,
              error: 'Generation task not found'
            };
          }

          // 其他错误直接抛出
          throw error;
        }

        // 成功获取状态
        return {
          status: data.status,
          progress: data.progress,
          result: data.result,
          error: data.error
        };
      } catch (innerError) {
        attempts++;
        if (attempts >= maxAttempts) {
          throw innerError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    // 达到最大尝试次数仍然失败
    return {
      status: 'failed',
      progress: 0,
      error: 'Failed to retrieve generation status after multiple attempts'
    };
  } catch (error) {
    console.error('Failed to get generation status:', error);
    return {
      status: 'failed',
      progress: 0,
      error: 'Generation task not found or database error'
    };
  }
}
