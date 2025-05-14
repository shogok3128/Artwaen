import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// 環境変数のデフォルト値を設定
if (!process.env.NEXTAUTH_URL) {
  // デフォルトURL - ローカル開発用
  process.env.NEXTAUTH_URL = "http://localhost:3005";
}

// PrismaClientはサーバーサイドでのみ初期化
let prisma: PrismaClient | null = null;
let isDbConnected = false;

try {
  // Vercelデプロイでも動作するように条件付きで初期化
  if (process.env.DATABASE_URL) {
    prisma = new PrismaClient();
    isDbConnected = true;
  }
} catch (error) {
  console.error("Prisma初期化エラー:", error);
  // Prisma初期化に失敗した場合はJWTモードを使用
  prisma = null;
  isDbConnected = false;
}

// 常にJWTモードを優先（Vercelデプロイのために）
// 環境変数でデータベースモードを切り替え可能にする
const useJwtMode = process.env.USE_JWT_MODE === "true" || !isDbConnected;
const sessionStrategy = useJwtMode ? "jwt" : "database";

// NextAuth設定オプション
const authOptions: NextAuthOptions = {
  // 認証プロバイダの設定
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  
  // Prismaアダプタの設定（データベース接続がある場合のみ）
  ...(isDbConnected && !useJwtMode ? { adapter: PrismaAdapter(prisma!) } : {}),
  
  // カスタムページの設定
  pages: {
    signIn: "/auth/signin",
  },
  
  // デバッグモード（開発環境のみ）
  debug: process.env.NODE_ENV === "development",
  
  // セッション設定
  session: {
    strategy: sessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  
  // 秘密鍵の設定
  secret: process.env.NEXTAUTH_SECRET,
  
  // コールバック関数
  callbacks: {
    async session({ session, token }) {
      // JWTモードの場合はtokenからユーザー情報を取得
      if (useJwtMode && token && session.user) {
        // tokenからユーザーIDを設定（JWTモード用）
        session.user.id = token.sub || "default-user-id";
      } else if (session.user) {
        // データベースモードの場合
        session.user.id = session.user.id || "default-user-id";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 常にベースURLにリダイレクト
      return baseUrl;
    },
  },
};

// ハンドラー作成
const handler = NextAuth(authOptions);

// GET/POSTリクエスト用のハンドラーをエクスポート
export { handler as GET, handler as POST }; 