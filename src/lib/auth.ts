import { supabase } from './supabase';

// サインアップ（メール・パスワード）
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// サインイン（メール・パスワード）
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Googleでサインイン
export async function signInWithGoogle() {
  // リダイレクトURLの設定 - 環境に基づいて適切なURLを使用
  let redirectUrl;
  if (typeof window !== 'undefined') {
    // クライアントサイドの場合は現在のオリジンを使用
    const origin = window.location.origin;
    redirectUrl = `${origin}/auth/callback`;
    
    // 開発環境の場合、コンソールに情報を表示
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Google認証リダイレクトURL: ${redirectUrl}`);
    }
  } else {
    // サーバーサイドの場合はデフォルトURLを使用
    redirectUrl = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL || '/auth/callback';
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    },
  });
  
  if (error) throw error;
  return data;
}

// サインアウト
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// 現在のセッション取得
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// ユーザー情報取得
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

// パスワードリセット
export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) throw error;
  return data;
}

// パスワード更新
export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  
  if (error) throw error;
  return data;
}

// ユーザープロフィール更新
export async function updateUserProfile(profile: any) {
  // 認証ユーザーの基本情報更新
  const { data: authData, error: authError } = await supabase.auth.updateUser({
    data: profile,
  });
  
  if (authError) throw authError;
  
  // カスタムプロフィール情報の更新
  const { data: userData, error: userError } = await supabase
    .from('users')
    .update(profile)
    .eq('id', authData.user.id)
    .select()
    .single();
  
  if (userError) throw userError;
  
  return { auth: authData.user, profile: userData };
} 