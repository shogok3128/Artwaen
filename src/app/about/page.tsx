export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">サービス概要</h1>

      {/* サービス理念 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Artwaenの理念</h2>
        <p className="text-gray-700 mb-4 text-center">
          Artwaenは、アーティストとアート愛好家をつなぐプラットフォームです。
          私たちは、アートの持つ可能性を最大限に引き出し、より多くの人々に
          アートの魅力を伝えることを目指しています。
        </p>
      </section>

      {/* 主な機能 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">主な機能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">作品の展示</h3>
            <p className="text-gray-700">
              アーティストは自身の作品を自由に展示し、多くの人々に
              作品を紹介することができます。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">作品の販売</h3>
            <p className="text-gray-700">
              アーティストは作品を販売し、アート愛好家は
              お気に入りの作品を購入することができます。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">コミュニティ</h3>
            <p className="text-gray-700">
              アーティストとアート愛好家が交流し、
              新しい発見や刺激を得ることができます。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">ポートフォリオ</h3>
            <p className="text-gray-700">
              アーティストは自身の作品集を作成し、
              活動の軌跡を残すことができます。
            </p>
          </div>
        </div>
      </section>

      {/* 利用方法 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">利用方法</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-center">アーティストの方</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 max-w-md mx-auto">
              <li>アカウントを作成</li>
              <li>プロフィールを設定</li>
              <li>作品をアップロード</li>
              <li>作品の詳細を設定</li>
              <li>展示・販売開始</li>
            </ol>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-center">アート愛好家の方</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 max-w-md mx-auto">
              <li>アカウントを作成</li>
              <li>お気に入りの作品を探す</li>
              <li>作品の詳細を確認</li>
              <li>購入またはお問い合わせ</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
} 