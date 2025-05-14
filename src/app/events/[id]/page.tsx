'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaHeart, FaShare, FaArrowLeft, FaTag } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import FavoriteButton from '@/components/FavoriteButton';

// モックイベントデータ（実際のアプリでは、APIからデータを取得）
const eventsData = [
  {
    id: '1',
    title: '都市と自然 - 現代アート展',
    description: '現代アートを通じて都市と自然の関係性を探る展示会です。様々なアーティストの視点から、都市生活と自然環境の共存についての作品をご覧いただけます。\n\n10名以上の現代アーティストが参加し、絵画、写真、インスタレーション作品など多様な表現方法で「都市と自然」というテーマに挑みます。来場者の皆様にはアンケートにご協力いただき、最も印象に残った作品に投票していただくこともできます。',
    longDescription: `## 展示会概要

現代社会において都市の発展と自然環境の保全は、しばしば対立する課題です。この展示会では、その関係性を様々な視点から捉え直し、共存の可能性を探ります。

## 参加アーティスト

- 高橋誠（絵画）
- 山本佳代（写真）
- 鈴木健太（インスタレーション）
- ほか7名

## 特別イベント

オープニングレセプション: 5月20日 18:00〜20:00
アーティストトーク: 5月27日 14:00〜15:30

## ワークショップ

「自然素材を使ったアート制作」
日時: 5月28日 13:00〜15:00
参加費: 500円（材料費込み）
定員: 15名（要予約）
    `,
    date: '2023-05-20T13:00:00',
    endDate: '2023-05-30T18:00:00', 
    formattedDate: '2023年5月20日(土) 13:00〜18:00',
    location: '東京都渋谷区神宮前X-X-X',
    locationDetails: 'アートスペースSHIBUYA 2階展示室',
    organizer: '山田アートギャラリー',
    organizerId: 'org1',
    contactEmail: 'info@yamada-gallery.com',
    contactPhone: '03-XXXX-XXXX',
    website: 'https://www.yamada-gallery.com',
    image: '/placeholder-event1.jpg',
    additionalImages: [
      '/placeholder-event1-2.jpg',
      '/placeholder-event1-3.jpg',
    ],
    tags: ['展示会', '現代アート', '都市'],
    isFree: false,
    price: '1,500円（学生800円）',
    capacity: 100,
    currentAttendees: 24,
    likes: 24,
    isLikedByUser: false,
    isNeedPerformers: false,
    isNeedExhibitors: true,
    isNeedAttendees: true
  },
  {
    id: '2',
    title: 'サマーミュージックフェスティバル2023',
    description: '今年の夏を彩る音楽フェスティバル。様々なジャンルのアーティストが集結し、2日間にわたって楽しめるイベントです。',
    longDescription: `## フェスティバル概要

2日間にわたる野外音楽フェスティバルです。ロック、ポップス、ジャズ、エレクトロニカなど多様なジャンルのアーティストが出演します。

## タイムテーブル

### 1日目 (7月15日)
- 10:00 開場
- 11:00-12:00 オープニングアクト
- 12:30-13:30 バンドA
- 14:00-15:00 シンガーB
- 15:30-16:30 バンドC
- 17:00-18:30 ヘッドライナーD
- 19:00-20:30 ヘッドライナーE

### 2日目 (7月16日)
- 10:00 開場
- 11:00-12:00 バンドF
- 12:30-13:30 シンガーG
- 14:00-15:00 バンドH
- 15:30-16:30 バンドI
- 17:00-18:30 ヘッドライナーJ
- 19:00-20:30 ヘッドライナーK

## 出演者募集

ステージパフォーマンスを披露したいアーティストを募集中です。詳細はお問い合わせください。
    `,
    date: '2023-07-15T10:00:00',
    endDate: '2023-07-16T21:00:00',
    formattedDate: '2023年7月15-16日',
    location: '千葉県〇〇市音楽の森公園',
    locationDetails: '野外特設ステージ（雨天決行・荒天中止）',
    organizer: '音楽フェスティバル実行委員会',
    organizerId: 'org2',
    contactEmail: 'info@summer-music-fest.com',
    contactPhone: '03-XXXX-XXXX',
    website: 'https://www.summer-music-fest.com',
    image: '/placeholder-event2.jpg',
    additionalImages: [
      '/placeholder-event2-2.jpg',
      '/placeholder-event2-3.jpg',
    ],
    tags: ['音楽', 'フェスティバル', '夏'],
    isFree: false,
    price: '5,000円〜',
    capacity: 5000,
    currentAttendees: 1560,
    likes: 156,
    isLikedByUser: false,
    isNeedPerformers: true,
    isNeedExhibitors: false,
    isNeedAttendees: true
  }
];

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // 実際のアプリでは、APIからデータを取得する
    const fetchEventData = () => {
      setIsLoading(true);
      // モックデータから該当するイベントを検索
      const foundEvent = eventsData.find(e => e.id === params.id);
      
      if (foundEvent) {
        setEvent(foundEvent);
        setIsLiked(foundEvent.isLikedByUser);
      }
      
      setIsLoading(false);
    };
    
    if (params.id) {
      fetchEventData();
    }
  }, [params.id]);

  const handleLikeEvent = (newLikedState: boolean) => {
    // 実際のアプリではAPI呼び出しを行う
    console.log('いいね状態:', newLikedState);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      })
      .catch((error) => console.log('シェアに失敗しました', error));
    } else {
      // シェア機能がサポートされていない場合はURLをクリップボードにコピー
      navigator.clipboard.writeText(window.location.href);
      alert('URLがクリップボードにコピーされました');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">イベントが見つかりませんでした</h1>
        <p className="text-gray-600 mb-8">お探しのイベントは存在しないか、削除された可能性があります。</p>
        <Link 
          href="/events" 
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <FaArrowLeft className="mr-2" />
          イベント一覧に戻る
        </Link>
      </div>
    );
  }

  // Markdownをシンプルなパラグラフに変換（実際のアプリではMarkdownパーサーを使用）
  const formatDescription = (text: string) => {
    return text.split('\n\n').map((paragraph: string, index: number) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
            {paragraph.replace('## ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('- ')) {
        return (
          <ul key={index} className="list-disc pl-5 mb-4">
            {paragraph.split('\n').map((item: string, i: number) => (
              <li key={i} className="mb-1">{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };

  return (
    <div className="bg-gray-50 pb-16">
      {/* ヘッダー画像 */}
      <div className="bg-gray-300 h-64 md:h-96 relative">
        {/* 実際のプロジェクトでは適切な画像を表示 */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent h-1/2"></div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white">
          <h1 className="text-2xl md:text-4xl font-bold text-shadow">{event.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {event.tags.map((tag: string) => (
              <span key={tag} className="bg-primary-500/80 text-white px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button 
          onClick={() => router.back()} 
          className="absolute top-4 left-4 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
        >
          <FaArrowLeft />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* メインコンテンツ */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span>{event.formattedDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUserAlt className="mr-2" />
                    <span>主催: {event.organizer}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <FavoriteButton 
                    itemId={event.id}
                    itemType="event"
                    initialState={isLiked}
                    count={event.likes}
                    onToggle={handleLikeEvent}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-300"
                  >
                    <FaShare className="text-gray-400" />
                    <span>シェア</span>
                  </motion.button>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h2 className="text-xl font-semibold mb-4">イベント詳細</h2>
                <div className="text-gray-700 space-y-2">
                  {formatDescription(event.longDescription || event.description)}
                </div>
              </div>
            </div>
            
            {/* 参加者情報 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">参加情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-gray-900">{event.price}</div>
                  <div className="text-sm text-gray-500">参加費</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-gray-900">{event.capacity || '無制限'}</div>
                  <div className="text-sm text-gray-500">定員</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-semibold text-gray-900">{event.currentAttendees || 0}</div>
                  <div className="text-sm text-gray-500">参加予定</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-sm hover:bg-primary-700 text-center"
                >
                  参加を申し込む
                </motion.button>
                {event.isNeedPerformers && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 text-center"
                  >
                    出演者として応募
                  </motion.button>
                )}
                {event.isNeedExhibitors && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 text-center"
                  >
                    出展者として応募
                  </motion.button>
                )}
              </div>
            </div>
          </div>
          
          {/* サイドバー */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">主催者情報</h2>
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                <h3 className="text-center font-medium">{event.organizer}</h3>
              </div>
              
              <div className="border-t border-gray-100 pt-4 space-y-3">
                {event.contactEmail && (
                  <div>
                    <div className="text-sm text-gray-500">メール</div>
                    <div className="text-gray-800">{event.contactEmail}</div>
                  </div>
                )}
                {event.contactPhone && (
                  <div>
                    <div className="text-sm text-gray-500">電話</div>
                    <div className="text-gray-800">{event.contactPhone}</div>
                  </div>
                )}
                {event.website && (
                  <div>
                    <div className="text-sm text-gray-500">ウェブサイト</div>
                    <a 
                      href={event.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      {event.website}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-3">場所</h3>
                <div className="bg-gray-100 h-40 rounded-lg mb-2">
                  {/* 地図を表示（実際のアプリではGoogle Mapsなどを活用） */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    地図
                  </div>
                </div>
                <p className="text-sm text-gray-600">{event.locationDetails || event.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 