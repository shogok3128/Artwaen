'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { useScroll } from 'framer-motion';
import { useTransform } from 'framer-motion';
import { useMotionValue } from 'framer-motion';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';
import Image from 'next/image';

// アニメーション用の変数
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
      staggerChildren: 0.2
    }
  }
};

const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// モックデータ
const feedItems = [
  {
    id: '1',
    user: {
      name: '山田アートギャラリー',
      handle: '@yamada_gallery',
      avatar: '/placeholder-avatar.jpg'
    },
    content: '週末の展示イベント「都市と自然」の準備が整いました！多くの方のご来場をお待ちしています。',
    image: '/placeholder-event.jpg',
    postedAt: '2時間前',
    likes: 24,
    comments: 5,
    shares: 3,
    eventInfo: {
      title: '都市と自然 - 現代アート展',
      date: '2023年5月20日(土) 13:00〜18:00',
      location: '東京都渋谷区神宮前X-X-X',
      isFree: false
    }
  },
  {
    id: '2',
    user: {
      name: 'アートコレクティブNoA',
      handle: '@noa_art',
      avatar: '/placeholder-avatar2.jpg'
    },
    content: '新メンバー募集中！私たちと一緒に創作活動をしませんか？詳細はプロフィールのリンクから。',
    image: null,
    postedAt: '昨日',
    likes: 42,
    comments: 12,
    shares: 8,
    eventInfo: null
  },
  {
    id: '3',
    user: {
      name: '音楽フェスティバル実行委員会',
      handle: '@music_fest',
      avatar: '/placeholder-avatar3.jpg'
    },
    content: '今年の夏フェスのラインナップ発表！チケット販売は明日正午から開始します。お見逃しなく！',
    image: '/placeholder-event2.jpg',
    postedAt: '2日前',
    likes: 156,
    comments: 37,
    shares: 52,
    eventInfo: {
      title: 'サマーミュージックフェスティバル2023',
      date: '2023年7月15-16日',
      location: '千葉県〇〇市音楽の森公園',
      isFree: false
    }
  }
];

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* トレンドバナー */}
      <motion.section 
        className="gradient-primary text-white py-4 md:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-xl md:text-2xl font-bold mb-2"
              variants={fadeIn}
            >
              Artwaen
            </motion.h1>
            <motion.p 
              className="text-sm mb-4"
              variants={fadeIn}
            >
              今日のトレンド：#都市アート #サマーフェス #ライブペインティング
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* フィードセクション */}
      <section className="max-w-5xl mx-auto px-4 py-4 mb-16">
        {/* ストーリー行 - ここを修正 */}
        <motion.div 
          className="flex overflow-x-hidden w-full pb-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full flex px-1 snap-x snap-mandatory overflow-x-auto hide-scrollbar">
            <div className="flex-shrink-0 w-14 flex flex-col items-center snap-start mx-1">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 p-0.5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white text-primary-500 flex items-center justify-center">
                  <span className="text-xl font-bold">+</span>
                </div>
              </div>
              <span className="text-xs mt-1 text-gray-600 w-14 text-center truncate">マイストーリー</span>
            </div>
            
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-14 flex flex-col items-center snap-start mx-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-300"></div>
                </div>
                <span className="text-xs mt-1 text-gray-600 w-14 text-center truncate">{`ユーザー${i+1}`}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* フィードアイテム */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {feedItems.map((item) => (
            <motion.div 
              key={item.id}
              variants={fadeIn}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {/* ユーザー情報 */}
              <div className="p-4 border-b border-gray-100 flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="ml-3 flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.user.name}</p>
                      <p className="text-xs text-gray-500">{item.user.handle} • {item.postedAt}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* 投稿コンテンツ */}
              <div className="p-4">
                <p className="text-gray-800 mb-4">{item.content}</p>
                
                {/* イベント情報があれば表示 */}
                {item.eventInfo && (
                  <div className="border border-gray-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start">
                      <div className="w-2 h-full bg-primary-500 rounded-full mr-2"></div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.eventInfo.title}</p>
                        <p className="text-sm text-gray-700 mt-1 flex items-center">
                          <span className="mr-1">📅</span> {item.eventInfo.date}
                        </p>
                        <p className="text-sm text-gray-700 mt-1 flex items-center">
                          <span className="mr-1">📍</span> {item.eventInfo.location}
                        </p>
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${item.eventInfo.isFree ? 'bg-green-100 text-green-800' : 'bg-primary-100 text-primary-800'}`}>
                            {item.eventInfo.isFree ? '無料' : '有料'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 画像があれば表示 */}
                {item.image && (
                  <div className="bg-gray-200 h-48 md:h-64 rounded-lg mb-3 relative">
                    {/* 実際のプロジェクトでは適切な画像を表示 */}
                  </div>
                )}
                
                {/* アクションボタン */}
                <div className="flex justify-between mt-4 text-gray-500">
                  <motion.button 
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.1, color: '#f43f5e' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaHeart />
                    <span>{item.likes}</span>
                  </motion.button>
                  
                  <motion.button 
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.1, color: '#3b82f6' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaComment />
                    <span>{item.comments}</span>
                  </motion.button>
                  
                  <motion.button 
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.1, color: '#10b981' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaShare />
                    <span>{item.shares}</span>
                  </motion.button>
                  
                  <motion.button 
                    className="flex items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
        >
                    <FaBookmark />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA フローティングボタン（モバイル用） */}
      <motion.div
        className="fixed right-6 bottom-20 md:hidden"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Link href="/create" className="bg-primary-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
          <span className="text-xl font-bold">+</span>
        </Link>
      </motion.div>
    </div>
  );
}
