This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## NEWS投稿・同期手順

NEWSの原本は `cms.united-studio.com` のWordPressで管理し、公開記事をREST APIから静的データへ同期します。記事本文をこのリポジトリへ手作業で追加しないでください。

1. `cms.united-studio.com` にログインする
2. 「投稿」からタイトル・本文・カテゴリを設定する
3. アイキャッチ画像を設定し、必要な画像を本文へ挿入する
4. 記事を公開する
5. GitHub Actionsの定期同期とVercelデプロイ後、`/news` と `/news/[slug]` を確認する

画像はWordPressへ通常どおりアップロードします。アイキャッチはNext.js Image Optimizationを通り、対応ブラウザへAVIF、WebP、元形式の順で配信されます。本文画像は`wp-image-{id}`からWordPress Media REST API上の原本を解決し、クロップされていない原本からNext.js Image Optimization用のレスポンシブ`srcset`を生成します。NEWS本文の共通CSSでもPC・モバイルとも画像全体を本文幅内へ収めます。投稿者が画像形式や複数サイズを手作業で用意する必要はありません。

`.github/workflows/sync-news.yml` が1時間ごとに `pnpm news:sync` を実行し、変更がある場合だけ生成済みの `posts.json` / `redirects.json` を検証してmainへ反映します。Vercelはそのpushを受けて再デプロイするため、通常の反映時間は公開後最大約1時間＋デプロイ時間です。急ぎの場合はGitHub Actionsの「Sync WordPress News」を手動実行できます。

ローカルで確認する場合は、以下を実行します。

```bash
pnpm news:sync
pnpm typecheck
pnpm build
```
