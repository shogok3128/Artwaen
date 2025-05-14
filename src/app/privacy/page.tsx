export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">プライバシーポリシー</h1>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">1. 個人情報の収集について</h2>
          <p className="text-gray-700 text-center">
            当サービスは、以下の情報を収集する場合があります：
          </p>
          <ul className="list-disc max-w-lg mx-auto text-gray-700 mt-2">
            <li>氏名</li>
            <li>メールアドレス</li>
            <li>プロフィール情報</li>
            <li>その他、サービス利用に必要な情報</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">2. 個人情報の利用目的</h2>
          <p className="text-gray-700 text-center">
            収集した個人情報は、以下の目的で利用します：
          </p>
          <ul className="list-disc max-w-lg mx-auto text-gray-700 mt-2">
            <li>サービスの提供・運営</li>
            <li>ユーザーサポート</li>
            <li>サービスの改善</li>
            <li>お知らせの送信</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">3. 個人情報の管理</h2>
          <p className="text-gray-700 text-center">
            当サービスは、個人情報の管理について以下の対策を実施しています：
          </p>
          <ul className="list-disc max-w-lg mx-auto text-gray-700 mt-2">
            <li>アクセス制限の実施</li>
            <li>データの暗号化</li>
            <li>セキュリティ対策の実施</li>
            <li>従業員への教育</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">4. 個人情報の第三者提供</h2>
          <p className="text-gray-700 text-center">
            当サービスは、以下の場合を除き、個人情報を第三者に提供することはありません：
          </p>
          <ul className="list-disc max-w-lg mx-auto text-gray-700 mt-2">
            <li>ユーザーの同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>サービスの提供に必要な場合</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">5. 個人情報の開示・訂正・削除</h2>
          <p className="text-gray-700 text-center">
            ユーザーは、当サービスが保有する個人情報について、開示・訂正・削除を
            請求することができます。請求方法については、お問い合わせフォームから
            ご連絡ください。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">6. プライバシーポリシーの変更</h2>
          <p className="text-gray-700 text-center">
            当サービスは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のプライバシーポリシーは、当サービス上に掲載した時点で
            効力を生じるものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">7. お問い合わせ</h2>
          <p className="text-gray-700 text-center">
            本プライバシーポリシーに関するお問い合わせは、
            お問い合わせフォームからご連絡ください。
          </p>
        </section>
      </div>
    </div>
  );
} 