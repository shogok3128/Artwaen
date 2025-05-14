'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { FaFilter, FaMapMarkerAlt, FaCalendarAlt, FaHeart, FaShare, FaBookmark } from 'react-icons/fa';

// モックイベントデータ
const events = [
  {
    id: '1',
    title: '都市と自然 - 現代アート展',
    description: '現代アートを通じて都市と自然の関係性を探る展示会です。様々なアーティストの視点から、都市生活と自然環境の共存についての作品をご覧いただけます。',
    date: '2023-05-20T13:00:00',
    formattedDate: '2023年5月20日(土) 13:00〜18:00',
    location: '東京都渋谷区神宮前X-X-X',
    organizer: '山田アートギャラリー',
    image: '/placeholder-event1.jpg',
    tags: ['展示会', '現代アート', '都市'],
    isFree: false,
    price: '1,500円〜',
    likes: 24,
    isNeedPerformers: false,
    isNeedExhibitors: true,
    isNeedAttendees: true
  },
  {
    id: '2',
    title: 'サマーミュージックフェスティバル2023',
    description: '今年の夏を彩る音楽フェスティバル。様々なジャンルのアーティストが集結し、2日間にわたって楽しめるイベントです。',
    date: '2023-07-15T10:00:00',
    formattedDate: '2023年7月15-16日',
    location: '千葉県〇〇市音楽の森公園',
    organizer: '音楽フェスティバル実行委員会',
    image: '/placeholder-event2.jpg',
    tags: ['音楽', 'フェスティバル', '夏'],
    isFree: false,
    price: '5,000円〜',
    likes: 156,
    isNeedPerformers: true,
    isNeedExhibitors: false,
    isNeedAttendees: true
  },
  {
    id: '3',
    title: 'ストリートダンスワークショップ',
    description: '初心者から経験者まで楽しめるストリートダンスのワークショップ。プロのダンサーが基本から丁寧に指導します。',
    date: '2023-06-10T15:30:00',
    formattedDate: '2023年6月10日(土) 15:30〜17:30',
    location: '新宿区文化センター',
    organizer: 'ダンスクルーBEAT',
    image: '/placeholder-event3.jpg',
    tags: ['ダンス', 'ワークショップ', '初心者歓迎'],
    isFree: true,
    price: '無料',
    likes: 48,
    isNeedPerformers: false,
    isNeedExhibitors: false,
    isNeedAttendees: true
  },
  {
    id: '4',
    title: '写真展「光と影」',
    description: 'プロ写真家による光と影をテーマにした写真展。日常の中に隠れた美しい瞬間を捉えた作品をご覧いただけます。',
    date: '2023-05-25T11:00:00',
    formattedDate: '2023年5月25日(木)〜6月5日(月)',
    location: '銀座XYZギャラリー',
    organizer: '日本現代写真協会',
    image: '/placeholder-event4.jpg',
    tags: ['写真', '展示会', '現代アート'],
    isFree: false,
    price: '1,000円',
    likes: 35,
    isNeedPerformers: false,
    isNeedExhibitors: false,
    isNeedAttendees: true
  }
];

// フィルターカテゴリ
const categories = [
  { id: 'all', name: 'すべて' },
  { id: 'music', name: '音楽' },
  { id: 'art', name: 'アート' },
  { id: 'dance', name: 'ダンス' },
  { id: 'photo', name: '写真' },
  { id: 'workshop', name: 'ワークショップ' }
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="bg-gray-50 pb-16">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-xl font-bold text-gray-900">イベント</h1>
            <motion.button
              className="p-2 text-gray-600 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
            </motion.button>
          </div>
          
          {/* カテゴリフィルター - スクロール問題を修正 */}
          <div className="overflow-x-hidden pb-3 w-full">
            <div className="flex w-full snap-x snap-mandatory overflow-x-auto hide-scrollbar px-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 mx-1 snap-start ${
                    activeCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 拡張フィルター */}
      {showFilters && (
        <motion.div
          className="bg-white border-b border-gray-200"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">日付</p>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>今日</option>
                  <option>今週</option>
                  <option>今月</option>
                  <option>すべての期間</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">場所</p>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>すべての場所</option>
                  <option>東京</option>
                  <option>大阪</option>
                  <option>オンライン</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">料金</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">無料</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">有料</button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">募集</p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">出演者</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">出展者</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* イベントリスト */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={fadeIn}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {/* イベント画像（プレースホルダー） */}
              <div className="bg-gray-200 h-48 relative">
                {/* 実際のプロジェクトでは適切な画像を表示 */}
                <div className="absolute bottom-2 left-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${event.isFree ? 'bg-green-500 text-white' : 'bg-primary-500 text-white'}`}>
                    {event.isFree ? '無料' : event.price}
                  </span>
                </div>
              </div>
              
              {/* イベント詳細 */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FaCalendarAlt className="mr-1" />
                  <span>{event.formattedDate}</span>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{event.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{event.description}</p>
                
                {/* タグ */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {event.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* 募集タグ */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {event.isNeedPerformers && (
                    <span className="text-xs px-2 py-0.5 rounded bg-secondary-100 text-secondary-800">
                      出演者募集中
                    </span>
                  )}
                  {event.isNeedExhibitors && (
                    <span className="text-xs px-2 py-0.5 rounded bg-primary-100 text-primary-800">
                      出展者募集中
                    </span>
                  )}
                  {event.isNeedAttendees && (
                    <span className="text-xs px-2 py-0.5 rounded bg-accent-100 text-accent-800">
                      来場予約受付中
                    </span>
                  )}
                </div>
                
                {/* アクションボタン */}
                <div className="flex justify-between border-t border-gray-100 pt-3 mt-3 text-gray-600">
                  <motion.button
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.1, color: '#f43f5e' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaHeart />
                    <span className="text-sm">{event.likes}</span>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaShare />
                    <span className="text-sm">共有</span>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaBookmark />
                    <span className="text-sm">保存</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 