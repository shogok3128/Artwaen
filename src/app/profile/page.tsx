'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaMusic, FaEdit } from 'react-icons/fa';

// サンプルユーザーデータ
const sampleUser = {
  id: '1',
  name: '山田太郎',
  email: 'yamada@example.com',
  profileType: '個人',
  bio: 'フリーランスのイラストレーター。主に商業イラストや広告デザインを手がけています。アニメやファンタジーの世界観が好きで、独自の世界観を作り出すことを目指しています。',
  location: '東京都渋谷区',
  genre: ['イラスト', 'デジタルアート', 'グラフィックデザイン'],
  projects: [
    {
      id: 'p1',
      name: 'イラストレーター',
      description: '商業イラストや広告デザインを中心に活動',
    },
    {
      id: 'p2',
      name: 'コンセプトアーティスト',
      description: 'ゲームやアニメのためのコンセプトアートを制作',
    },
  ],
  participatedEvents: [
    {
      id: 'e1',
      title: '東京デザインフェア2024',
      date: '2024年5月15日',
      role: '出展者',
    },
    {
      id: 'e2',
      title: 'クリエイターズマーケット大阪',
      date: '2024年3月10日',
      role: '出展者',
    },
    {
      id: 'e3',
      title: 'デジタルアートワークショップ',
      date: '2024年2月5日',
      role: '講師',
    },
  ],
  upcomingEvents: [
    {
      id: 'ue1',
      title: '夏のイラストレーション展',
      date: '2024年7月20日',
      role: '出展者',
    },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* プロフィールヘッダー */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-400 px-6 py-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-primary-600 text-6xl overflow-hidden">
              <FaUser />
            </div>
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold">{sampleUser.name}</h1>
              <p className="text-lg mt-1">{sampleUser.profileType}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{sampleUser.location}</span>
                </div>
                <div className="flex items-center">
                  <FaMusic className="mr-2" />
                  <span>{sampleUser.genre.join(', ')}</span>
                </div>
              </div>
            </div>
            <div className="ml-auto mt-6 md:mt-0">
              <Link 
                href="/profile/edit" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-gray-100"
              >
                <FaEdit className="mr-2" />
                プロフィール編集
              </Link>
            </div>
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              プロフィール
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'projects'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              プロジェクト
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'events'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              参加イベント
            </button>
          </nav>
        </div>
        
        {/* タブコンテンツ */}
        <div className="p-6">
          {/* プロフィールタブ */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">自己紹介</h2>
              <p className="text-gray-700 mb-6">{sampleUser.bio}</p>
              
              <h2 className="text-xl font-semibold mb-4">ジャンル</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {sampleUser.genre.map((genre) => (
                  <span key={genre} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* プロジェクトタブ */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">プロジェクト</h2>
                <Link
                  href="/profile/projects/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
                >
                  新規プロジェクト
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleUser.projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <Link
                      href={`/profile/projects/${project.id}/edit`}
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      編集
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* イベントタブ */}
          {activeTab === 'events' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">参加予定のイベント</h2>
              {sampleUser.upcomingEvents.length > 0 ? (
                <div className="mb-8 space-y-4">
                  {sampleUser.upcomingEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FaCalendarAlt className="mr-1" />
                            <span>{event.date}</span>
                            <span className="mx-2">•</span>
                            <span>{event.role}</span>
                          </div>
                        </div>
                        <Link
                          href={`/events/${event.id}`}
                          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                        >
                          詳細
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-8">参加予定のイベントはありません</p>
              )}
              
              <h2 className="text-xl font-semibold mb-6">過去の参加イベント</h2>
              <div className="space-y-4">
                {sampleUser.participatedEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FaCalendarAlt className="mr-1" />
                          <span>{event.date}</span>
                          <span className="mx-2">•</span>
                          <span>{event.role}</span>
                        </div>
                      </div>
                      <Link
                        href={`/events/${event.id}`}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        詳細
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 