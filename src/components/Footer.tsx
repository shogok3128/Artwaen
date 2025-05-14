'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ロゴと説明 */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary-600">Artwaen</span>
            </Link>
            <p className="mt-2 text-gray-600 text-sm">
              アーティストとイベントをつなぐプラットフォーム。あなたの創作活動をより多くの人に届けましょう。
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-sm text-gray-600 hover:text-primary-600">
                  イベント一覧
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-sm text-gray-600 hover:text-primary-600">
                  イベント作成
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  Artwaenについて
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-600">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* ソーシャルメディア */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">フォローする</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.instagram.com/artwaen.art/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-pink-600"
              >
                <FaInstagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-blue-500"
              >
                <FaTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-blue-600"
              >
                <FaFacebook className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © 2024 Artwaen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 