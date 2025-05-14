import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Prismaクライアントの初期化
const prisma = new PrismaClient();

// 環境変数のデフォルト値を設定
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = "http://localhost:3005";
}

// NextAuth設定オプション
const authOptions: NextAuthOptions = {
  // Prismaアダプタの設定（サーバー側でのみ実行）
  adapter: PrismaAdapter(prisma),
  
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
  
  // カスタムページの設定
  pages: {
    signIn: "/auth/signin",
  },
  
  // デバッグモード（開発環境のみ）
  debug: process.env.NODE_ENV === "development",
  
  // セッション設定
  session: {
    strategy: "jwt",
  },
  
  // 秘密鍵の設定
  secret: process.env.NEXTAUTH_SECRET,
  
  // コールバック関数
  callbacks: {
    async session({ session }) {
      if (session.user) {
        // @ts-ignore - セッションにカスタムフィールドを追加
        session.user.id = "test-user-id";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

// ハンドラー作成
const handler = NextAuth(authOptions);

// GET/POSTリクエスト用のハンドラーをエクスポート
export { handler as GET, handler as POST }; 