import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * セッションの型を拡張して、ユーザーIDを含める
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
} 