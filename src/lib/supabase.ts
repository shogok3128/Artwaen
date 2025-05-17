import { createClient } from '@supabase/supabase-js';

// 環境変数からSupabaseのURLとAPIキーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 環境変数チェック
if (!supabaseUrl || !supabaseAnonKey) {
  // 開発環境ではコンソールエラーを表示
  if (process.env.NODE_ENV !== 'production') {
    console.error('Supabase環境変数が設定されていません。.env.localファイルを確認してください。');
    console.error('NEXT_PUBLIC_SUPABASE_URLとNEXT_PUBLIC_SUPABASE_ANON_KEYが必要です。');
  }
}

// Supabaseクライアントの初期化
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
); 