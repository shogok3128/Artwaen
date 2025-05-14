import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// 環境変数のデフォルト値を設定
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = "http://localhost:3005";
}

// PrismaClientはサーバーサイドでのみ初期化
let prisma;
try {
  prisma = new PrismaClient();
} catch (error) {
  console.error("Prisma初期化エラー:", error);
  // ビルド時にはPrismaClientを初期化せず、実行時のみ初期化する
  prisma = null;
}

// セッション戦略の設定（データベース接続に問題があればJWTを使用）
const sessionStrategy = prisma ? "database" : "jwt";

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
  ...(prisma ? { adapter: PrismaAdapter(prisma) } : {}),
  
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