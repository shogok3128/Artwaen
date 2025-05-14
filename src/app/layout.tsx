import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Artwaen - アーティストのためのイベントプラットフォーム",
  description: "イベント主催者とアーティストをつなぐプラットフォーム。ライブ、展示、上映などのイベントを簡単に見つけ、参加できます。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-grow flex justify-center">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
