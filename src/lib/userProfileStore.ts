// ユーザープロフィールの型定義
export interface UserProfile {
  id: string;
  displayName: string;
  bio: string;
  website: string;
  location: string;
  social: {
    twitter: string;
    instagram: string;
    facebook: string;
    [key: string]: string;
  };
  artType: string[];
  showEmail: boolean;
  image?: string;
}

// 初期プロフィールデータ
const initialProfile: UserProfile = {
  id: '',
  displayName: '',
  bio: '',
  website: '',
  location: '',
  social: {
    twitter: '',
    instagram: '',
    facebook: '',
  },
  artType: [],
  showEmail: false,
  image: undefined,
};

// ローカルストレージキー
const PROFILE_STORAGE_KEY = 'artwaen_user_profile';

/**
 * ユーザープロフィールをローカルストレージから取得
 */
export function getUserProfile(userId: string): UserProfile {
  if (typeof window === 'undefined') {
    return { ...initialProfile, id: userId };
  }

  try {
    const storedProfiles = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedProfiles) {
      const profiles = JSON.parse(storedProfiles) as Record<string, UserProfile>;
      return profiles[userId] || { ...initialProfile, id: userId };
    }
  } catch (error) {
    console.error('プロフィール取得エラー:', error);
  }

  return { ...initialProfile, id: userId };
}

/**
 * ユーザープロフィールをローカルストレージに保存
 */
export function saveUserProfile(profile: UserProfile): boolean {
  if (typeof window === 'undefined' || !profile.id) {
    return false;
  }

  try {
    // 既存のプロフィールを取得
    const storedProfiles = localStorage.getItem(PROFILE_STORAGE_KEY);
    const profiles = storedProfiles 
      ? JSON.parse(storedProfiles) as Record<string, UserProfile> 
      : {};
    
    // プロフィールを更新
    profiles[profile.id] = profile;
    
    // ストレージに保存
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
    return true;
  } catch (error) {
    console.error('プロフィール保存エラー:', error);
    return false;
  }
} 