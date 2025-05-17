'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// 静的生成を無効化（SSRのみ）
export const dynamic = 'force-dynamic';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // OAuthのコールバック処理
    const handleAuthCallback = async () => {
      try {
        // URLからcodeパラメータを取得
        const url = window.location.href;
        console.log('コールバックURL:', url);
        
        const code = new URL(url).searchParams.get('code');
        
        if (code) {
          console.log('認証コード取得成功');
          await supabase.auth.exchangeCodeForSession(code);
          console.log('セッション交換成功');
        } else {
          console.log('認証コードが見つかりません');
        }
        
        // ログイン成功後、ホームページにリダイレクト
        router.push('/');
      } catch (error) {
        console.error('認証エラー:', error);
        // エラー時はログインページに戻す
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">認証処理中...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        <p className="text-center text-gray-600">
          ログイン処理を完了しています。しばらくお待ちください。
        </p>
      </div>
    </div>
  );
} 