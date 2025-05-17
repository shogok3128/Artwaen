import { supabase } from './supabase';

// ユーザー関連の関数
export async function getUser(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

// イベント関連の関数
export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getEvent(eventId: string) {
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      creator:users(*),
      participants:participations(
        *,
        user:users(*)
      )
    `)
    .eq('id', eventId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createEvent(eventData: any) {
  const { data, error } = await supabase
    .from('events')
    .insert(eventData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// プロジェクト関連の関数
export async function getUserProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
}

// チーム関連の関数
export async function getUserTeams(userId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      *,
      team:teams(*)
    `)
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
} 