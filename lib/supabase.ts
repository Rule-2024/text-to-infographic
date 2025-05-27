import { createClient } from '@supabase/supabase-js';

/**
 * 前端客户端：使用匿名 public key，符合 RLS 策略。
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * 管理客户端：使用 Service Role Key，绕过 RLS，用于后端管理写入操作。
 */
export const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
