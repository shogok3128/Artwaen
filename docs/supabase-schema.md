# Supabaseデータベース設計

Artwaenプロジェクトで使用するSupabaseのテーブル構造は以下の通りです。このスキーマはPrismaから移行するために設計されています。

## テーブル構造

### users テーブル
```sql
create table users (
  id uuid references auth.users primary key,
  name text,
  email text unique not null,
  image_url text,
  email_verified timestamp with time zone,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  profile_type text default '個人' not null,
  bio text,
  location text,
  genre text[]
);

-- RLSポリシー
alter table users enable row level security;
create policy "ユーザーは自分のプロフィールを更新できる" on users
  for update using (auth.uid() = id);
create policy "ユーザープロフィールは公開" on users
  for select using (true);
```

### events テーブル
```sql
create table events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  location text,
  is_online boolean default false not null,
  online_link text,
  genres text[],
  needs_performers boolean default false not null,
  needs_exhibitors boolean default false not null,
  needs_attendees boolean default false not null,
  creator_id uuid references users(id) not null
);

-- RLSポリシー
alter table events enable row level security;
create policy "イベントは作成者が更新可能" on events
  for update using (auth.uid() = creator_id);
create policy "イベントは誰でも閲覧可能" on events
  for select using (true);
create policy "認証済みユーザーはイベントを作成可能" on events
  for insert with check (auth.uid() = creator_id);
```

### participations テーブル
```sql
create table participations (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  type text not null,
  status text default 'pending' not null,
  user_id uuid references users(id) not null,
  event_id uuid references events(id) not null,
  unique (user_id, event_id, type)
);

-- RLSポリシー
alter table participations enable row level security;
create policy "参加者は自分の参加情報を閲覧可能" on participations
  for select using (auth.uid() = user_id);
create policy "イベント作成者は参加情報を閲覧可能" on participations
  for select using (
    auth.uid() in (
      select creator_id from events where id = event_id
    )
  );
create policy "ユーザーは参加登録可能" on participations
  for insert with check (auth.uid() = user_id);
```

### projects テーブル
```sql
create table projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  genre text[],
  user_id uuid references users(id) not null
);

-- RLSポリシー
alter table projects enable row level security;
create policy "プロジェクトは作成者のみ更新可能" on projects
  for all using (auth.uid() = user_id);
create policy "プロジェクトは公開" on projects
  for select using (true);
```

### teams テーブル
```sql
create table teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- RLSポリシー
alter table teams enable row level security;
create policy "チームは公開" on teams
  for select using (true);
```

### team_members テーブル
```sql
create table team_members (
  id uuid primary key default uuid_generate_v4(),
  role text,
  joined_at timestamp with time zone default now() not null,
  user_id uuid references users(id) not null,
  team_id uuid references teams(id) not null,
  unique (user_id, team_id)
);

-- RLSポリシー
alter table team_members enable row level security;
create policy "チームメンバーは公開" on team_members
  for select using (true);
create policy "チームメンバーは自分の情報を更新可能" on team_members
  for update using (auth.uid() = user_id);
```

## 外部キー関係

1. `users.id` <- `events.creator_id`
2. `users.id` <- `participations.user_id`
3. `events.id` <- `participations.event_id`
4. `users.id` <- `projects.user_id`
5. `users.id` <- `team_members.user_id`
6. `teams.id` <- `team_members.team_id`

## 認証

Supabaseの認証機能を使用して、NextAuthからの移行を行います。GoogleログインなどのOAuthプロバイダーの設定も必要です。

## 移行手順

1. Supabaseプロジェクトを作成する
2. 上記のSQLを実行してテーブルを作成する
3. RLSポリシーを設定する
4. 認証プロバイダーを設定する
5. アプリケーションコードをPrismaからSupabaseクライアントに更新する 