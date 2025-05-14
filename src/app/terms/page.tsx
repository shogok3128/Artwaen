export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">利用規約</h1>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">第1条（適用）</h2>
          <p className="text-gray-700 text-center">
            本規約は、Artwaen（以下「当サービス」）の利用に関する条件を定めるものです。
            ユーザーは本規約に同意した上で当サービスを利用するものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">第2条（定義）</h2>
          <p className="text-gray-700 text-center">
            本規約において、以下の用語は以下の意味で使用します：
          </p>
          <ul className="list-disc max-w-lg mx-auto text-gray-700 mt-2">
            <li>「ユーザー」とは、当サービスを利用するすべての方を指します。</li>
            <li>「アーティスト」とは、当サービスに作品を出品するユーザーを指します。</li>
            <li>「作品」とは、アーティストが当サービスに出品するアート作品を指します。</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">第3条（禁止事項）</h2>
          <p className="text-gray-700 text-center">
            ユーザーは、以下の行為を行ってはなりません：
          </p>
          <ul className="list-disc max-w-lg mx-auto text-gray-700 mt-2">
            <li>法令または公序良俗に違反する行為</li>
            <li>当サービスの運営を妨害する行為</li>
            <li>他のユーザーに迷惑をかける行為</li>
            <li>著作権等の知的財産権を侵害する行為</li>
            <li>その他、当サービスが不適切と判断する行為</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">第4条（免責事項）</h2>
          <p className="text-gray-700 text-center">
            当サービスは、以下の事項について一切の責任を負いません：
          </p>
          <ul className="list-disc max-w-lg mx-auto text-gray-700 mt-2">
            <li>ユーザー間の取引に関するトラブル</li>
            <li>当サービスの利用により生じた損害</li>
            <li>当サービスの一時的な停止または終了</li>
            <li>その他、当サービスの利用に関連して生じた損害</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">第5条（規約の変更）</h2>
          <p className="text-gray-700 text-center">
            当サービスは、必要に応じて本規約を変更することがあります。
            変更後の規約は、当サービス上に掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">第6条（準拠法）</h2>
          <p className="text-gray-700 text-center">
            本規約の解釈にあたっては、日本法を準拠法とします。
          </p>
        </section>
      </div>
    </div>
  );
} 