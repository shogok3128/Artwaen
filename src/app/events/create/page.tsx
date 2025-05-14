'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaImage, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // フォームの状態
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    endDate: '',
    location: '',
    locationDetails: '',
    description: '',
    longDescription: '',
    tags: '',
    price: '',
    capacity: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    isNeedPerformers: false,
    isNeedExhibitors: false,
  });
  
  // 読み込み状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 未認証の場合はログインページにリダイレクト
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">イベントを投稿するには、ログインが必要です</h1>
        <p className="text-gray-600 mb-8">アカウントをお持ちの方は、ログインしてください。アカウントをお持ちでない方は、新規登録をお願いします。</p>
        <Link
          href="/api/auth/signin"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          ログイン
        </Link>
      </div>
    );
  }
  
  // フォーム入力の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // ここでAPIにデータを送信する処理を実装
      // 実際のプロジェクトではバックエンドへのAPI呼び出しを行う
      console.log('送信されたデータ:', formData);
      
      // 成功した場合はイベント一覧ページなどにリダイレクト
      // 実際のアプリでは作成されたイベントの詳細ページなどに遷移
      alert('イベントが作成されました');
      router.push('/events');
    } catch (error) {
      console.error('イベント作成エラー:', error);
      alert('エラーが発生しました。再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link 
        href="/events" 
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        イベント一覧に戻る
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">新しいイベントを作成</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* 基本情報セクション */}
          <div>
            <h2 className="text-xl font-semibold mb-4">基本情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  イベントタイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：東京アートフェスティバル2024"
                />
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  開始日時 <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  終了日時 <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  開催場所 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：東京都渋谷区神宮前X-X-X"
                />
              </div>
              
              <div>
                <label htmlFor="locationDetails" className="block text-sm font-medium text-gray-700 mb-1">
                  会場詳細
                </label>
                <input
                  type="text"
                  id="locationDetails"
                  name="locationDetails"
                  value={formData.locationDetails}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：○○ホール 2階展示室"
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  イベント概要 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="イベントの簡単な説明を書いてください（100〜200文字程度）"
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  詳細説明
                </label>
                <textarea
                  id="longDescription"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="イベントの詳細説明を書いてください。Markdown形式に対応しています。"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Markdown形式で記述できます。見出しは ## で始めてください。
                </p>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  タグ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：音楽,アート,ワークショップ（カンマ区切り）"
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  参加費
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：1,000円（無料の場合は「無料」と入力）"
                />
              </div>
              
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  定員
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="定員なしの場合は空欄"
                />
              </div>
            </div>
          </div>
          
          {/* 連絡先情報セクション */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">連絡先情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  連絡先メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：contact@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  連絡先電話番号
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：03-1234-5678"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  ウェブサイト
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：https://www.example.com"
                />
              </div>
            </div>
          </div>
          
          {/* 追加オプションセクション */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">追加オプション</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isNeedPerformers"
                  name="isNeedPerformers"
                  checked={formData.isNeedPerformers}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isNeedPerformers" className="ml-2 block text-sm text-gray-700">
                  出演者を募集する
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isNeedExhibitors"
                  name="isNeedExhibitors"
                  checked={formData.isNeedExhibitors}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isNeedExhibitors" className="ml-2 block text-sm text-gray-700">
                  出展者を募集する
                </label>
              </div>
            </div>
          </div>
          
          {/* 送信ボタン */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <Link
                href="/events"
                className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-4"
              >
                キャンセル
              </Link>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? '送信中...' : 'イベントを作成'}
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 