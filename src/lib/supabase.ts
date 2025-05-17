import { createClient } from '@supabase/supabase-js';

// 環境変数からSupabaseのURLとAPIキーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabaseクライアントの初期化
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 