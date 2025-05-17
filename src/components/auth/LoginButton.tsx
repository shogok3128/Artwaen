'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {session.user?.name || session.user?.email}
        </span>
        <Button
          variant="outline"
          onClick={() => signOut()}
        >
          ログアウト
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
          ログイン
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="bg-primary-600 text-white hover:bg-primary-700">
          新規登録
        </Button>
      </Link>
    </div>
  );
} 