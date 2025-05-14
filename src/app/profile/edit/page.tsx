'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaUser, FaArrowLeft, FaUpload } from 'react-icons/fa';
import Link from 'next/link';

// フォームデータの型定義
interface FormData {
  displayName: string;
  bio: string;
  website: string;
  location: string;
  social: {
    twitter: string;
    instagram: string;
    facebook: string;
    [key: string]: string; // インデックスシグネチャを追加
  };
  artType: string[]; // 型を修正
  showEmail: boolean;
}

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // フォームの状態
  const [formData, setFormData] = useState<FormData>({
    displayName: '',
    bio: '',
    website: '',
    location: '',
    social: {
      twitter: '',
      instagram: '',
      facebook: '',
    },
    artType: [], // 空の配列で初期化
    showEmail: false,
  });
  
  // 画像アップロード状態
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // 読み込み状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // セッションからユーザー情報を取得
  useEffect(() => {
    if (session?.user) {
      setFormData(prevData => ({
        ...prevData,
        displayName: session.user?.name || '',
      }));
      
      if (session.user?.image) {
        setImagePreview(session.user.image);
      }
    }
  }, [session]);
  
  // 未認証の場合はログインページにリダイレクト
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    router.push('/api/auth/signin');
    return null;
  }
  
  // フォーム入力の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      // ネストされたプロパティの処理（social.twitter など）
      const [parent, child] = name.split('.');
      
      if (parent === 'social') {
        setFormData(prev => ({
          ...prev,
          social: {
            ...prev.social,
            [child]: value
          }
        }));
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (name === 'artType') {
      // 複数選択の処理
      const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions, option => option.value);
      setFormData(prev => ({
        ...prev,
        artType: selectedOptions
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // 画像アップロードの処理
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 実際のアプリではAPI呼び出しを行い、画像をアップロード
      setIsUploading(true);
      
      // ファイルをプレビューとして表示
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // ここでAPIにデータを送信する処理を実装
      // 実際のプロジェクトではバックエンドへのAPI呼び出しを行う
      console.log('送信されたデータ:', formData);
      console.log('プロフィール画像:', imagePreview);
      
      // 成功した場合はプロフィールページにリダイレクト
      alert('プロフィールが更新されました');
      router.push('/profile');
    } catch (error) {
      console.error('プロフィール更新エラー:', error);
      alert('エラーが発生しました。再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const artTypes = [
    '絵画', '彫刻', '写真', 'イラスト', 'デザイン', 'グラフィック', '映像', '音楽', 
    'パフォーマンス', 'インスタレーション', 'デジタルアート', 'NFT', '伝統工芸', 'その他'
  ];
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/profile"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        プロフィールに戻る
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">プロフィール編集</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* プロフィール画像 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="プロフィール画像"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            
            <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              <FaUpload className="mr-2" />
              画像をアップロード
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          </div>
          
          {/* 基本情報 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">基本情報</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  表示名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  自己紹介
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="あなたの活動や作品について教えてください"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  活動拠点
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="例：東京都渋谷区"
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
                  placeholder="例：https://www.yourwebsite.com"
                />
              </div>
              
              <div>
                <label htmlFor="artType" className="block text-sm font-medium text-gray-700 mb-1">
                  アート形態（複数選択可）
                </label>
                <select
                  id="artType"
                  name="artType"
                  multiple
                  value={formData.artType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 h-32"
                >
                  {artTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Ctrlキーを押しながらクリックで複数選択できます
                </p>
              </div>
            </div>
          </div>
          
          {/* SNSリンク */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">SNSリンク</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="social.instagram" className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="social.instagram"
                    name="social.instagram"
                    value={formData.social.instagram}
                    onChange={handleChange}
                    className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="social.twitter" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="social.twitter"
                    name="social.twitter"
                    value={formData.social.twitter}
                    onChange={handleChange}
                    className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="username"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="social.facebook" className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="text"
                  id="social.facebook"
                  name="social.facebook"
                  value={formData.social.facebook}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://www.facebook.com/username"
                />
              </div>
            </div>
          </div>
          
          {/* プライバシー設定 */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">プライバシー設定</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showEmail"
                  name="showEmail"
                  checked={formData.showEmail}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="showEmail" className="ml-2 block text-sm text-gray-700">
                  メールアドレスを公開する
                </label>
              </div>
            </div>
          </div>
          
          {/* 送信ボタン */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <Link
                href="/profile"
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
                {isSubmitting ? '保存中...' : '変更を保存'}
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 