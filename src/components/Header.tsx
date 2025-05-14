'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaSearch, FaCalendarAlt, FaUserAlt, FaBell, FaInstagram, FaCog, FaSignOutAlt, FaChartLine } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import LoginButton from './auth/LoginButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // 画面サイズ変更時にレスポンシブ対応
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  // モバイル用ボトムナビゲーション
  if (isMobile) {
    return (
      <>
        {/* トップヘッダー - ロゴとアクション */}
        <motion.header
          className="bg-white shadow-sm sticky top-0 z-10 px-4 py-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-primary-600">Artwaen</span>
              </Link>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600"
                >
                  <FaSearch className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 relative"
                >
                  <FaBell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* モバイル用ボトムナビゲーション */}
        <motion.nav
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-around items-center h-16">
              <Link href="/" className={`flex flex-col items-center justify-center w-full h-full ${pathname === '/' ? 'text-primary-600' : 'text-gray-500'}`}>
                <FaHome className="w-6 h-6" />
                <span className="text-xs mt-1">ホーム</span>
              </Link>
              <Link href="/events" className={`flex flex-col items-center justify-center w-full h-full ${pathname === '/events' ? 'text-primary-600' : 'text-gray-500'}`}>
                <FaCalendarAlt className="w-6 h-6" />
                <span className="text-xs mt-1">イベント</span>
              </Link>
              <Link href="/about" className={`flex flex-col items-center justify-center w-full h-full ${pathname === '/about' ? 'text-primary-600' : 'text-gray-500'}`}>
                <span className="text-xs mt-1">概要</span>
              </Link>
              <Link href="/profile" className={`flex flex-col items-center justify-center w-full h-full ${pathname === '/profile' ? 'text-primary-600' : 'text-gray-500'}`}>
                <FaUserAlt className="w-6 h-6" />
                <span className="text-xs mt-1">プロフィール</span>
              </Link>
              <Link href="/dashboard" className={`flex flex-col items-center justify-center w-full h-full ${pathname === '/dashboard' ? 'text-primary-600' : 'text-gray-500'}`}>
                <FaChartLine className="w-6 h-6" />
                <span className="text-xs mt-1">ダッシュボード</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex flex-col items-center justify-center w-full h-full text-gray-500`}
              >
                <span className="text-xs mt-1">メニュー</span>
              </button>
            </div>
          </div>
        </motion.nav>
        
        {/* モバイルメニューモーダル */}
        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/terms" className="p-3 bg-gray-50 rounded-lg text-center">
                    利用規約
                  </Link>
                  <Link href="/privacy" className="p-3 bg-gray-50 rounded-lg text-center">
                    プライバシー
                  </Link>
                  <Link href="/contact" className="p-3 bg-gray-50 rounded-lg text-center">
                    お問い合わせ
                  </Link>
                  {session ? (
                    <button
                      onClick={() => signOut()}
                      className="p-3 bg-gray-50 rounded-lg text-center text-red-500"
                    >
                      ログアウト
                    </button>
                  ) : (
                    <Link href="/auth/signin" className="p-3 bg-gray-50 rounded-lg text-center">
                      ログイン
                    </Link>
                  )}
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full mt-4 p-3 bg-primary-100 text-primary-600 rounded-lg text-center"
                >
                  閉じる
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* モバイルでの余白調整 */}
        <div className="pb-16"></div>
      </>
    );
  }

  // デスクトップ版ヘッダー
  return (
    <motion.header 
      className="bg-white shadow-sm sticky top-0 z-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" className="text-2xl font-bold">
                <span className="text-primary-600">Artwaen</span>
              </Link>
            </motion.div>
            <motion.nav 
              className="ml-6 hidden md:flex space-x-8"
              initial="hidden"
              animate="visible"
              variants={navVariants}
            >
              <motion.div variants={itemVariants}>
                <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname === '/' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-500 hover:border-primary-300'}`}>
                  <FaHome className="mr-1" />
                  ホーム
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/events" className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname === '/events' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-500 hover:border-primary-300'}`}>
                  <FaCalendarAlt className="mr-1" />
                  イベント
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/about" className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname === '/about' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-500 hover:border-primary-300'}`}>
                  サービス概要
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href="/contact" className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname === '/contact' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-primary-500 hover:border-primary-300'}`}>
                  お問い合わせ
                </Link>
              </motion.div>
            </motion.nav>
          </div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <FaSearch className="w-5 h-5 text-gray-600" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <FaBell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </motion.div>
            <motion.a
              href="https://www.instagram.com/artwaen.art/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 hover:text-pink-600"
            >
              <FaInstagram className="w-5 h-5" />
            </motion.a>
            {session ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'ユーザー'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUserAlt className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <span className="text-sm text-gray-700">{session.user?.name}</span>
                </motion.button>
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={menuVariants}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaUserAlt className="inline-block mr-2" />
                        プロフィール
                      </Link>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaChartLine className="inline-block mr-2" />
                        ダッシュボード
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaCog className="inline-block mr-2" />
                        設定
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="inline-block mr-2" />
                        ログアウト
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <LoginButton />
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
} 