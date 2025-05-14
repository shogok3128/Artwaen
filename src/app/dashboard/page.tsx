'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { 
  FaCalendarAlt, 
  FaHeart, 
  FaUser, 
  FaPlus, 
  FaBell, 
  FaCog, 
  FaChartLine,
  FaEdit
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// ダッシュボードコンポーネント - 認証状態に基づいて表示内容を変更
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');
  
  // テスト用: 認証チェックをバイパス
  // if (status === 'loading') {
  //   return (
  //     <div className="flex justify-center items-center h-[60vh]">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  //     </div>
  //   );
  // }
  
  // // 認証されていない場合
  // if (status === 'unauthenticated') {
  //   return (
  //     <div className="max-w-4xl mx-auto px-4 py-12 text-center">
  //       <h1 className="text-3xl font-bold mb-6">ダッシュボードにアクセスするには、ログインが必要です</h1>
  //       <p className="text-gray-600 mb-8">アカウントをお持ちの方は、ログインしてください。アカウントをお持ちでない方は、新規登録をお願いします。</p>
  //       <button
  //         onClick={() => signIn('google')}
  //         className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
  //       >
  //         ログイン
  //       </button>
  //     </div>
  //   );
  // }
  
  // ダッシュボードのサンプルデータ
  const dashboardData = {
    upcoming_events: [
      { id: 'e1', title: '夏のイラストレーション展', date: '2024年7月20日', venue: '東京都美術館' },
      { id: 'e2', title: 'クリエイターズマーケット名古屋', date: '2024年8月5日', venue: 'ポートメッセなごや' }
    ],
    favorited_events: [
      { id: 'f1', title: 'アニメーションフェスティバル2024', date: '2024年9月15日', venue: 'パシフィコ横浜' },
      { id: 'f2', title: 'デザインカンファレンス', date: '2024年10月3日', venue: '京都国際会館' }
    ],
    recent_notifications: [
      { id: 'n1', content: 'あなたの作品が「注目の作品」に選ばれました', date: '2日前' },
      { id: 'n2', content: '新しいイベント開催のお知らせ', date: '1週間前' }
    ],
    statistics: {
      profile_views: 120,
      event_participations: 5,
      favorites_received: 36
    }
  };
  
  // サイドナビゲーションの項目
  const navigationItems = [
    { id: 'overview', label: '概要', icon: <FaChartLine /> },
    { id: 'events', label: 'イベント管理', icon: <FaCalendarAlt /> },
    { id: 'favorites', label: 'お気に入り', icon: <FaHeart /> },
    { id: 'profile', label: 'プロフィール', icon: <FaUser /> },
    { id: 'notifications', label: '通知', icon: <FaBell /> },
    { id: 'settings', label: '設定', icon: <FaCog /> }
  ];
  
  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">ダッシュボード</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* サイドナビゲーション */}
        <div className="w-full md:w-64 bg-white shadow rounded-lg p-4 h-fit">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeSection === item.id
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* メインコンテンツ */}
        <div className="flex-1 bg-white shadow rounded-lg p-6">
          {activeSection === 'overview' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-6">ダッシュボード概要</h2>
              </motion.div>
              
              {/* 統計情報 */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-lg text-white shadow">
                  <div className="text-4xl font-bold">{dashboardData.statistics.profile_views}</div>
                  <div className="text-sm opacity-80 mt-1">プロフィール閲覧数</div>
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-lg text-white shadow">
                  <div className="text-4xl font-bold">{dashboardData.statistics.event_participations}</div>
                  <div className="text-sm opacity-80 mt-1">イベント参加数</div>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4 rounded-lg text-white shadow">
                  <div className="text-4xl font-bold">{dashboardData.statistics.favorites_received}</div>
                  <div className="text-sm opacity-80 mt-1">お気に入り登録数</div>
                </div>
              </motion.div>
              
              {/* 参加予定イベント */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-lg font-medium mb-4">参加予定のイベント</h3>
                {dashboardData.upcoming_events.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.upcoming_events.map(event => (
                      <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="text-sm text-gray-500 mt-1">
                              <span>{event.date}</span> • <span>{event.venue}</span>
                            </div>
                          </div>
                          <Link href={`/events/${event.id}`} className="text-primary-600 text-sm">
                            詳細
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">参加予定のイベントはありません</p>
                )}
              </motion.div>
              
              {/* 通知 */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium mb-4">最近の通知</h3>
                {dashboardData.recent_notifications.length > 0 ? (
                  <div className="space-y-3">
                    {dashboardData.recent_notifications.map(notification => (
                      <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-800">{notification.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">新しい通知はありません</p>
                )}
              </motion.div>
            </motion.div>
          )}
          
          {activeSection === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">イベント管理</h2>
                <Link 
                  href="/events/create" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  <FaPlus className="mr-2" />
                  新規イベント作成
                </Link>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">参加予定のイベント</h3>
                {dashboardData.upcoming_events.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.upcoming_events.map(event => (
                      <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="text-sm text-gray-500 mt-1">
                              <span>{event.date}</span> • <span>{event.venue}</span>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Link href={`/events/${event.id}/edit`} className="text-blue-600 text-sm">
                              編集
                            </Link>
                            <Link href={`/events/${event.id}`} className="text-primary-600 text-sm">
                              詳細
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">参加予定のイベントはありません</p>
                )}
              </div>
            </div>
          )}
          
          {activeSection === 'favorites' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">お気に入りイベント</h2>
              
              {dashboardData.favorited_events.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.favorited_events.map(event => (
                    <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="text-sm text-gray-500 mt-1">
                            <span>{event.date}</span> • <span>{event.venue}</span>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button className="text-pink-600 text-sm">
                            お気に入り解除
                          </button>
                          <Link href={`/events/${event.id}`} className="text-primary-600 text-sm">
                            詳細
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">お気に入り登録したイベントはありません</p>
              )}
            </div>
          )}
          
          {activeSection === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">プロフィール</h2>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  {session?.user?.image ? (
                    <img src={session.user.image} alt="プロフィール画像" className="w-16 h-16 rounded-full" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <FaUser className="text-primary-600 text-2xl" />
                    </div>
                  )}
                  <div className="ml-4">
                    <h3 className="font-semibold">{session?.user?.name}</h3>
                    <p className="text-gray-500 text-sm">{session?.user?.email}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  プロフィールページを見る
                </Link>
              </div>
              
              <Link
                href="/profile/edit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <FaEdit className="mr-2" />
                プロフィールを編集
              </Link>
            </div>
          )}
          
          {/* 他のセクションは省略（通知、設定など） */}
          
          {(activeSection === 'notifications' || activeSection === 'settings') && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">{activeSection === 'notifications' ? '通知' : '設定'}</h2>
              <p className="text-gray-500">このセクションは開発中です。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 