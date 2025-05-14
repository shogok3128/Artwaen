'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

type FavoriteButtonProps = {
  itemId: string;
  itemType: 'event' | 'artist';
  initialState?: boolean;
  count?: number;
  onToggle?: (isLiked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
};

export default function FavoriteButton({
  itemId,
  itemType,
  initialState = false,
  count = 0,
  onToggle,
  size = 'md'
}: FavoriteButtonProps) {
  const [isLiked, setIsLiked] = useState(initialState);
  const [likeCount, setLikeCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);
  const { data: session } = useSession();
  
  // 初期状態の更新
  useEffect(() => {
    setIsLiked(initialState);
    setLikeCount(count);
  }, [initialState, count]);
  
  // サイズに応じたクラス名
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-base px-4 py-2';
      default:
        return 'text-sm px-3 py-1.5';
    }
  };
  
  // アニメーション処理
  const handleLike = async () => {
    if (!session) {
      // 未ログイン時の処理
      alert('この機能を使用するにはログインが必要です');
      return;
    }
    
    setIsAnimating(true);
    
    try {
      // ここで実際のAPIにリクエストを送信する（実装時に追加）
      // 仮の実装：
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
      
      // コールバック関数が提供されている場合は呼び出す
      if (onToggle) {
        onToggle(newLikedState);
      }
      
      // 実際のアプリでは非同期処理をここに実装
      // await addToFavorites(itemId, itemType);
    } catch (error) {
      console.error('お気に入り処理エラー:', error);
      // エラー発生時は状態を元に戻す
      setIsLiked(isLiked);
      setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
      alert('エラーが発生しました。再度お試しください。');
    } finally {
      // アニメーション状態をリセット
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLike}
      className={`inline-flex items-center space-x-1 rounded-full border ${
        isLiked 
          ? 'bg-pink-100 text-pink-600 border-pink-300' 
          : 'bg-gray-100 text-gray-600 border-gray-300'
      } ${getSizeClasses()}`}
      disabled={isAnimating}
    >
      <motion.span
        animate={
          isAnimating 
            ? { scale: [1, 1.5, 1] } 
            : { scale: 1 }
        }
        transition={{ duration: 0.3 }}
      >
        <FaHeart className={isLiked ? 'text-pink-600' : 'text-gray-400'} />
      </motion.span>
      {count !== undefined && <span>{likeCount}</span>}
    </motion.button>
  );
} 