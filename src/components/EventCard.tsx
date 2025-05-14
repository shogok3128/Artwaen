import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

type EventCardProps = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  location: string | null;
  isOnline: boolean;
  needsPerformers: boolean;
  needsExhibitors: boolean;
  needsAttendees: boolean;
  creatorName: string;
};

export default function EventCard({
  id,
  title,
  description,
  startDate,
  location,
  isOnline,
  needsPerformers,
  needsExhibitors,
  needsAttendees,
  creatorName,
}: EventCardProps) {
  // 日付をフォーマット
  const formattedDate = new Date(startDate).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <motion.div 
          className="flex items-center text-gray-500 mb-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <FaCalendarAlt className="mr-2" />
          <span>{formattedDate}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center text-gray-500 mb-4"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaMapMarkerAlt className="mr-2" />
          <span>{isOnline ? 'オンライン' : location || '未定'}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center text-gray-500 mb-4"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FaUserAlt className="mr-2" />
          <span>主催: {creatorName}</span>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {needsPerformers && (
            <motion.span 
              className="bg-secondary-100 text-secondary-800 text-xs font-medium px-2.5 py-0.5 rounded"
              whileHover={{ scale: 1.05 }}
            >
              出演者募集中
            </motion.span>
          )}
          {needsExhibitors && (
            <motion.span 
              className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded"
              whileHover={{ scale: 1.05 }}
            >
              出展者募集中
            </motion.span>
          )}
          {needsAttendees && (
            <motion.span 
              className="bg-accent-100 text-accent-800 text-xs font-medium px-2.5 py-0.5 rounded"
              whileHover={{ scale: 1.05 }}
            >
              来場予約受付中
            </motion.span>
          )}
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link href={`/events/${id}`} className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full text-center">
            詳細を見る
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
} 