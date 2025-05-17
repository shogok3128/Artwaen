'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn, signInWithGoogle } from '@/lib/auth';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/');
    } catch (err: any) {
      console.error('ログインエラー:', err);
      setError(err.message || 'ログインに失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // リダイレクトはコールバックページで処理されます
    } catch (err: any) {
      console.error('Googleログインエラー:', err);
      setError(err.message || 'Googleログインに失敗しました。');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">ログイン</h1>
          <p className="mt-2 text-sm text-gray-600">
            アカウントをお持ちでない場合は{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              サインアップ
            </Link>
          </p>
        </div>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                ログイン情報を保存
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                パスワードを忘れた場合
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">または</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full px-4 py-2 space-x-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2 10.2273C19.2 9.55709 19.1455 8.90255 19.0364 8.27273H10V12.0455H15.1909C14.9818 13.2682 14.3182 14.3018 13.3091 14.9818V17.4545H16.4727C18.3273 15.7364 19.2 13.2 19.2 10.2273Z" fill="#4285F4"/>
                <path d="M10 20C12.6727 20 14.9636 19.1045 16.4727 17.4545L13.3091 14.9818C12.4591 15.5455 11.3591 15.8636 10 15.8636C7.49091 15.8636 5.38182 14.1364 4.60909 11.8H1.35455V14.3636C2.87273 17.6818 6.20909 20 10 20Z" fill="#34A853"/>
                <path d="M4.60909 11.8C4.42727 11.2364 4.32727 10.6273 4.32727 10C4.32727 9.37273 4.42727 8.76364 4.60909 8.2H1.35455V10.7636C1.35455 10.7636 1.35455 10.7636 1.35455 10.7636L4.60909 11.8Z" fill="#FBBC05"/>
                <path d="M10 4.13636C11.4182 4.13636 12.6818 4.63636 13.6636 5.57273L16.4909 2.74545C14.9591 1.29091 12.6727 0.318182 10 0.318182C6.20909 0.318182 2.87273 2.63636 1.35455 5.95455L4.60909 8.2C5.38182 5.86364 7.49091 4.13636 10 4.13636Z" fill="#EA4335"/>
              </svg>
              <span>Googleアカウントでログイン</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 