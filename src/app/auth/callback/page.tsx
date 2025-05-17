'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // OAuthのコールバック処理
    const handleAuthCallback = async () => {
      try {
        // URLからcodeパラメータを取得
        const code = new URL(window.location.href).searchParams.get('code');
        
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
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