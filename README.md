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

## GitHubでNEWSを作成する

新しい記事はCodexに原稿と画像を渡し、`lib/news/authored.ts` に追加します。
既存のCMS記事と合わせて、トップページの新着、NEWS一覧、個別記事、サイトマップに反映されます。

- `slug` は、英小文字・数字・ハイフンで作る記事固有のURL名です。公開後は維持します。
- `date` は `YYYY-MM-DD`、`body` は段落ごとの文字列の配列です。
- アイキャッチがある場合は画像を `public/news-media/` に置き、`featuredImage` に `src`、`alt`、画像の幅と高さを指定します。
- PRのプレビューでトップ、新着一覧、個別ページを確認してから公開します。

既存のWordPress記事・リダイレクトの同期手順は以下を参照してください。

## CMS News更新手順

News記事は `cms.united-studio.com` のWordPressから取得し、`lib/news/generated/posts.json` と `lib/news/generated/redirects.json` に静的データとして保存しています。

そのため、CMS側でNews記事を追加・修正しただけでは、`united-studio.com` へ即時反映されません。

### 通常運用：GitHub Actionsで反映する

CMSでNews記事を追加・修正した後は、GitHub Actionsから手動同期を実行します。

1. GitHubでこのリポジトリを開く
2. `Actions` を開く
3. `CMS News Sync` を選択
4. `Run workflow` を押す
5. 対象ブランチが `main` であることを確認して実行する

Workflowでは以下が実行されます。

```bash
pnpm cms:update
pnpm build
```

CMS側に変更がある場合は、以下のgeneratedファイルが更新され、自動で `main` にcommit / pushされます。

```text
lib/news/generated/posts.json
lib/news/generated/redirects.json
```

commitメッセージは以下です。

```text
chore: refresh wordpress news data
```

`main` にpushされると、Vercelが自動で本番デプロイします。

CMS側に変更がない場合は、commitせずに正常終了します。

```text
No CMS news changes to commit.
```

### ローカルで手動同期する場合

必要に応じて、ローカルでも以下で同期できます。

```bash
pnpm cms:update
pnpm build
```

差分がある場合は内容を確認してcommitしてください。

```bash
git diff
git add lib/news/generated/posts.json lib/news/generated/redirects.json
git commit -m "chore: refresh wordpress news data"
git push origin main
```

### 注意

- 既存記事の修正も新記事追加も、どちらも同期対象です。
- CMS側の変更をすぐに本番へ反映する場合は、GitHub Actionsで `CMS News Sync` を実行するか、ローカルで `pnpm cms:update` を実行してください。
- `posts.json` と `redirects.json` は直接手編集しないでください。
