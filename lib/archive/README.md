# Archive static data guide

ArchiveはCMS化せず、`lib/archive/index.ts` の `archiveItems` を静的データとして更新します。

## 追加時の入力

新しい実績を追加するときは、分かる範囲で次の情報を用意します。

```text
作品名：
アーティスト名 / クライアント名：
年：
日付：
種別：
担当：
概要：
リンク：
掲載優先度：
```

## 運用ルール

- 新規実績は `ArchiveItem` として `archiveItems` に追加する。
- 実在しない作品名、アーティスト名、クライアント名、URLを作らない。
- Spotify、Apple Music、YouTubeなどのURLは、公開情報で確認できたものだけを `links` に入れる。
- 新規データでは後方互換用の `externalUrl` を使わず、複数登録できる `links` を使う。
- `workType` は案件の性質、`categories` は作業内容単位の業務分類、`roles` はUnited Studioの担当範囲を表す。
- 複数の作業に該当する実績は、`categories` に各カテゴリを個別に追加する。カード上で従来の複合表記を維持する場合のみ `categoryLabel` を使う。
- 表示の主語は `artist` / `client` と `title`。業務分類を作品より目立たせない。
- `date` は分かる場合に `YYYY-MM-DD` 形式で記録し、同じ年を `year` にも入れる。
- `featured` はArchiveとHOMEの注目作品に限って使用する。

## オーディオブック実績

- オーディオブック実績は個別タイトルを大量に `ArchiveItem` 化せず、代表カードに集約する。
- 関連するWordPressタグページやaudiobook.jpのブックリストなど、確認済みの外部リンクを代表カードの `links` に追加する。
- 「販売中」など、状態が変わる可能性のある文言は避ける。

## workTypeの選び方

- `artist-work`: アーティスト作品、楽曲提供、作編曲、ミックスなど
- `regional-project`: 自治体、地域、公共性のある音楽制作
- `corporate-project`: 企業案件、サウンド開発、音源制作
- `audiobook`: オーディオブック、朗読、音声コンテンツ、監修
- `licensing`: 作品提供、音楽ライブラリ掲載
- `label-work`: 自社レーベル、United Studio名義作品

コピーして使えるオブジェクト形式の追加テンプレートは、`lib/archive/index.ts` の `archiveItems` 直前にあります。
