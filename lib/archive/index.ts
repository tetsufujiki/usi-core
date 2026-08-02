/**
 * Archive data layer — Works Memory
 *
 * ArchiveはCMSへ接続せず、`archiveItems` に確認済みの実績を追加して運用する。
 * 詳しい追加ルールと入力フォーマットは `lib/archive/README.md` を参照。
 */

// -------------------------------------------------------------------------
// Categories
// -------------------------------------------------------------------------

export type ArchiveCategory =
  | "songwriting"
  | "composition-arrangement"
  | "arrangement-mix-mastering"
  | "mix-mastering"
  | "label"
  | "sound-design"

export const archiveCategoryLabels: Record<ArchiveCategory, string> = {
  songwriting: "楽曲提供",
  "composition-arrangement": "作編曲",
  "arrangement-mix-mastering": "編曲・ミックス・マスタリング",
  "mix-mastering": "ミックス・マスタリング",
  label: "自社レーベル",
  "sound-design": "サウンド開発（企業案件）",
}

export const archiveCategories = Object.keys(
  archiveCategoryLabels,
) as ArchiveCategory[]

export type ArchiveWorkType =
  | "artist-work"
  | "regional-project"
  | "corporate-project"
  | "audiobook"
  | "licensing"
  | "label-work"

export const archiveWorkTypeLabels: Record<ArchiveWorkType, string> = {
  "artist-work": "Artist Work",
  "regional-project": "Regional Project",
  "corporate-project": "Corporate Project",
  audiobook: "Audiobook",
  licensing: "Licensing",
  "label-work": "Label Work",
}

// -------------------------------------------------------------------------
// Type
// -------------------------------------------------------------------------

export type ArchivePlatform =
  | "spotify"
  | "apple-music"
  | "youtube"
  | "official"
  | "other"

export type ArchivePlatformLink = {
  platform: ArchivePlatform
  label: string
  href: string
}

export type ArchiveArtwork = {
  src: string
  alt: string
  label?: string
  href?: string
  /** Preserve the entire source image inside the card media frame. */
  fit?: "cover" | "contain"
}

export type ArchiveItem = {
  id: string
  title: string
  year?: number
  date?: string
  workType: ArchiveWorkType
  category: ArchiveCategory
  summary?: string
  roles: string[]
  client?: string
  artist?: string
  label?: string
  format?: "Album" | "Single" | "Playlist" | "CDbook" | "Corporate"
  collectionTitle?: string
  genre?: string
  links?: ArchivePlatformLink[]
  artwork?: string
  artworks?: ArchiveArtwork[]
  /** @deprecated Use links for one or more destinations. */
  externalUrl?: string
  featured?: boolean
}

/**
 * @deprecated Use ArchiveItem. Kept for backward compatibility.
 */
export type ArchiveWork = ArchiveItem

// -------------------------------------------------------------------------
// Static archive data
// -------------------------------------------------------------------------

/*
ArchiveItem 追加テンプレート

{
  id: "kebab-case-id",
  title: "作品名 / 制作内容",
  artist: "アーティスト名", // 企業・自治体案件では省略
  client: "企業・自治体名", // アーティスト作品では省略
  year: 2026,
  date: "2026-01-01",
  workType: "artist-work",
  category: "composition-arrangement",
  roles: ["作曲", "編曲", "ミックス"],
  summary: "表示用の短い説明。",
  links: [
    { platform: "youtube", label: "YouTube", href: "https://..." },
  ],
  featured: false,
}

作品名・名義・URLは公開情報で確認できたものだけを記録する。
新規リンクは `externalUrl` ではなく `links` を使う。
*/

export const archiveItems: ArchiveItem[] = [
  {
    id: "nishikawa-exercise",
    title: "西川エクササイズ",
    client: "山形県西川町",
    year: 2024,
    date: "2024-06-19",
    workType: "regional-project",
    category: "composition-arrangement",
    roles: ["楽曲提供", "作曲", "編曲", "ミックス", "マスタリング"],
    summary: "山形県西川町のエクササイズ企画向け楽曲制作。",
    links: [
      {
        platform: "official",
        label: "制作記事",
        href: "https://united-studio.com/2024/06/19/120534",
      },
      {
        platform: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/watch?v=hfHniDRqjl0",
      },
    ],
    featured: true,
  },
  {
    id: "mariko-terashita-pirates-of-the-caribbean",
    title: "PIRATES OF THE CARIBBEAN",
    artist: "寺下真理子",
    workType: "artist-work",
    category: "arrangement-mix-mastering",
    roles: ["編曲（一部）", "ミックス", "マスタリング"],
    summary: "寺下真理子による「PIRATES OF THE CARIBBEAN」関連作品。",
    links: [
      {
        platform: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/watch?v=2PQPVLkNiww",
      },
    ],
    featured: false,
  },
  {
    id: "nogizaka46-rewind-ano-hi",
    title: "Rewindあの日",
    artist: "乃木坂46",
    year: 2017,
    date: "2017-05-24",
    workType: "artist-work",
    category: "songwriting",
    roles: ["作曲", "楽曲提供"],
    summary: "乃木坂46のAlbum「生まれてから初めて見た夢」収録曲。歌唱は桜井玲香、西野七瀬、若月佑美。",
    label: "乃木坂46LLC",
    format: "Album",
    collectionTitle: "生まれてから初めて見た夢",
    genre: "J-Pop",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/d1/31/03/d13103dc-f10e-bb88-cf0c-9b4dd21dfc8d/jacket_SRXX02309B00Z_550.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/rewind%E3%81%82%E3%81%AE%E6%97%A5/1537746569?i=1537746975",
      },
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/track/1sccUqPT76aB0jlN154MBE",
      },
    ],
    featured: true,
  },
  {
    id: "lupinranger-patranger-ui",
    title: "ウィ！",
    artist: "元木聖也",
    year: 2018,
    date: "2018-12-26",
    workType: "artist-work",
    category: "songwriting",
    roles: ["作曲", "楽曲提供"],
    summary: "「快盗戦隊ルパンレンジャーVS警察戦隊パトレンジャー VSキャラクターソングアルバム」収録曲。",
    label: "TV ASAHI MUSIC CO.,LTD.",
    format: "Album",
    collectionTitle: "VSキャラクターソングアルバム",
    genre: "J-Pop",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/20/ce/a6/20cea64f-085a-11a8-4e33-a9952ff9f96b/COCX-40604.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E5%BF%AB%E7%9B%97%E6%88%A6%E9%9A%8A%E3%83%AB%E3%83%91%E3%83%B3%E3%83%AC%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%BCvs%E8%AD%A6%E5%AF%9F%E6%88%A6%E9%9A%8A%E3%83%91%E3%83%88%E3%83%AC%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%BC-vs%E3%82%AD%E3%83%A3%E3%82%AF%E3%82%BF%E3%83%BC%E3%82%BD%E3%83%B3%E3%82%B0%E3%82%A2%E3%83%AB%E3%83%90%E3%83%A0/1447197188",
      },
    ],
    featured: true,
  },
  {
    id: "kosuke-atari-nakusanai-mono",
    title: "失くさないもの",
    artist: "中孝介",
    year: 2019,
    date: "2019-04-10",
    workType: "artist-work",
    category: "songwriting",
    roles: ["作曲", "楽曲提供"],
    summary: "中孝介のAlbum「愛者～Kanasha～」収録曲。",
    label: "YOSHIMOTO MUSIC CO.,LTD.",
    format: "Album",
    collectionTitle: "愛者～Kanasha～",
    genre: "J-Pop",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/83/f9/2e/83f92ea5-b3ff-dd25-40b6-b5173fba6574/4571487579724.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/intl-ja/track/152OJtpsHj4QS1RzlxPZnU",
      },
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E6%84%9B%E8%80%85-kanasha/1458080882",
      },
    ],
  },
  {
    id: "manami-komori-kyun-kyun-no-power",
    title: "きゅんきゅんのパワー",
    artist: "小森 まなみ",
    year: 2004,
    date: "2004-07-22",
    workType: "artist-work",
    category: "composition-arrangement",
    roles: ["作曲", "編曲"],
    summary: "小森 まなみのAlbum「ユ・メ・ノ・チ・カ・ラ」収録曲。",
    label: "キングレコード",
    format: "Album",
    collectionTitle: "ユ・メ・ノ・チ・カ・ラ",
    genre: "J-Pop",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ff/6d/f8/ff6df86c-80bf-a3e5-8422-75729ed66ad6/NOPA-5675.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E3%81%8D%E3%82%85%E3%82%93%E3%81%8D%E3%82%85%E3%82%93%E3%81%AE%E3%83%91%E3%83%AF%E3%83%BC/1735676868?i=1735676878",
      },
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/intl-ja/track/3EiRD9xywJo5BumY9Jkied?si=bb89fdc2a4de4c88",
      },
    ],
  },
  {
    id: "manami-komori-sore-wa-itsuka",
    title: "それは いつか 咲く日のために",
    artist: "小森 まなみ",
    year: 2004,
    date: "2004-07-22",
    workType: "artist-work",
    category: "composition-arrangement",
    roles: ["作曲", "編曲"],
    summary: "小森 まなみのAlbum「ユ・メ・ノ・チ・カ・ラ」収録曲。",
    label: "キングレコード",
    format: "Album",
    collectionTitle: "ユ・メ・ノ・チ・カ・ラ",
    genre: "J-Pop",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ff/6d/f8/ff6df86c-80bf-a3e5-8422-75729ed66ad6/NOPA-5675.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E3%81%9D%E3%82%8C%E3%81%AF-%E3%81%84%E3%81%A4%E3%81%8B-%E5%92%B2%E3%81%8F%E6%97%A5%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AB/1735676868?i=1735676928",
      },
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/intl-ja/track/3vx1dpmX9pLjERkrLsvQf0?si=3d034779e0f5467a",
      },
    ],
  },
  {
    id: "manami-komori-aozora-no-passage",
    title: "青空のパッセージ",
    artist: "小森 まなみ",
    year: 2002,
    date: "2002-07-25",
    workType: "artist-work",
    category: "composition-arrangement",
    roles: ["編曲"],
    summary: "小森 まなみのSingle「Life~上を向いて歩こう~」収録曲。",
    label: "キングレコード",
    format: "Single",
    collectionTitle: "Life~上を向いて歩こう~",
    genre: "J-Pop",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c9/19/de/c919deca-54dc-4b27-943a-cee005600cf3/NOPA-5660.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E9%9D%92%E7%A9%BA%E3%81%AE%E3%83%91%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8/1735660386?i=1735660388",
      },
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/intl-ja/track/3EFS9RNay2kVlYJk6qkFBg?si=8b78b535d12b4677",
      },
    ],
  },
  {
    id: "kosai-hayashi-futaai",
    title: "二藍",
    artist: "林煌彩",
    year: 2025,
    date: "2025-11-01",
    workType: "artist-work",
    category: "arrangement-mix-mastering",
    roles: ["編曲", "ミックス", "マスタリング"],
    summary: "DISC1「Indigo」、DISC2「Crimson」からなるAlbum。全曲を担当。",
    label: "United Studio Inc",
    format: "Album",
    collectionTitle: "二藍",
    genre: "Traditional",
    artworks: [
      {
        src: "https://items-images-production.s3.us-west-2.amazonaws.com/files/d5046eb4eac91cb35ad4272b4481d901a1303590/original.jpeg",
        alt: "林煌彩『二藍』DISC1 Indigo ジャケット",
        label: "DISC1 Indigo",
        href: "https://square.link/u/ON2t6pwA?src=embed",
      },
      {
        src: "https://items-images-production.s3.us-west-2.amazonaws.com/files/fab66f7e3847a3042b2501f98ee6c03f1ae7f6b2/original.jpeg",
        alt: "林煌彩『二藍』DISC2 Crimson ジャケット",
        label: "DISC2 Crimson",
        href: "https://square.link/u/uDbUqeKF?src=embed",
      },
    ],
    links: [
      { platform: "official", label: "DISC1を購入", href: "https://square.link/u/ON2t6pwA?src=embed" },
      { platform: "official", label: "DISC2を購入", href: "https://square.link/u/uDbUqeKF?src=embed" },
    ],
    featured: true,
  },
  {
    id: "hitoki-nakamura-negai",
    title: "願い",
    artist: "中村仁樹",
    year: 2022,
    date: "2022-10-15",
    workType: "artist-work",
    category: "arrangement-mix-mastering",
    roles: ["編曲", "ミックス", "マスタリング"],
    summary: "中村仁樹のAlbum「願い」。全曲を担当。",
    label: "Ancient Blue Records",
    format: "Album",
    collectionTitle: "願い",
    genre: "Instrumental",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ab/ad/54/abad5485-e306-8279-9fde-68485ae96900/4517331074922.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E9%A1%98%E3%81%84/1648415151",
      },
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/intl-ja/album/03u6QOTqwdkHj4r63oU7Lf?si=CL_d9jlET-OgaW8St4IV3w",
      },
    ],
  },
  {
    id: "hitoki-nakamura-inori",
    title: "祈り",
    artist: "中村仁樹",
    year: 2016,
    date: "2016-12-21",
    workType: "artist-work",
    category: "arrangement-mix-mastering",
    roles: ["編曲", "ミックス", "マスタリング"],
    summary: "中村仁樹のAlbum「祈り」。全曲を担当。",
    label: "Ancient Blue Records",
    format: "Album",
    collectionTitle: "祈り",
    genre: "Instrumental",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/ac/0c/d7/ac0cd781-eba6-b313-343a-3de51cdcbfd9/4538182645116_cov.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E7%A5%88%E3%82%8A/1180449833",
      },
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/intl-ja/album/3YXGuzH3u49REbCYfkAGKd?si=i7Bhqx59RJWJXsyW1TcPnA",
      },
    ],
  },
  {
    id: "shin-in-solfeggio-frequency-cdbook",
    title: "聞くだけで心も体も痛みが消えるソルフェジオ周波数CＤブック",
    artist: "藤木テツ",
    year: 2018,
    date: "2018-04-20",
    workType: "artist-work",
    category: "sound-design",
    roles: ["サウンドプロデュース"],
    summary: "真印のCDbook。全曲を担当。",
    label: "YellowJam",
    format: "CDbook",
    collectionTitle: "聞くだけで心も体も痛みが消えるソルフェジオ周波数CＤブック",
    genre: "Easy Listening",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/ca/6d/cd/ca6dcd3e-e502-590f-ee3f-1eb830fddd0a/PCSP_02388.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E8%81%9E%E3%81%8F%E3%81%A0%E3%81%91%E3%81%A7%E5%BF%83%E3%82%82%E4%BD%93%E3%82%82%E7%97%9B%E3%81%BF%E3%81%8C%E6%B6%88%E3%81%88%E3%82%8B%E3%82%BD%E3%83%AB%E3%83%95%E3%82%A7%E3%82%B8%E3%82%AA%E5%91%A8%E6%B3%A2%E6%95%B0cd%E3%83%96%E3%83%83%E3%82%AF-ep/1372652337",
      },
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/album/4YYOCNUJeIH4l1vbQG5eud?si=CvAmfUt1TWeoQXLx9xJSKA",
      },
    ],
  },
  {
    id: "tsukiyoi-blue-moon",
    title: "Blue Moon",
    artist: "月宵",
    year: 2014,
    date: "2014-04-11",
    workType: "label-work",
    category: "label",
    roles: ["自社レーベル", "企画", "制作"],
    summary: "月宵のAlbum「Blue Moon」。全曲を担当。",
    label: "United Studio Inc",
    format: "Album",
    collectionTitle: "Blue Moon",
    genre: "World",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music6/v4/6e/50/73/6e50731c-7f17-fa18-3096-16715e7587cf/849926035624.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/blue-moon/847598175",
      },
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/intl-ja/album/4FdpJhQFRvco0ZyCvTUGSb?si=R1TIt6bYSQiyY-sxcTh8mA",
      },
    ],
  },
  {
    id: "tetsu-fujiki-sound-soothe",
    title: "Sound Soothe",
    artist: "藤木 テツ",
    year: 2020,
    date: "2020-06-30",
    workType: "label-work",
    category: "label",
    roles: ["自社レーベル", "企画", "制作"],
    summary: "藤木 テツのPlaylist「Sound Soothe」。全曲を担当。",
    label: "United Studio Inc",
    format: "Playlist",
    collectionTitle: "Sound Soothe",
    genre: "New Age",
    artwork: "https://mosaic.scdn.co/300/ab67616d00001e0239881e42aff504a9b170240bab67616d00001e023f400bcc6f99f6cf31aedbd8ab67616d00001e027ce6c2c31c669dedffaae164ab67616d00001e029ed858cf527bca5a14cdec91",
    links: [
      {
        platform: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/playlist/2jfQEa71XybHw3wlVSGkh3",
      },
      {
        platform: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/watch?v=lPseW5XCtVg",
      },
    ],
  },
  {
    id: "mayumi-nagayoshi-noto-no-uta",
    title: "能登の唄",
    artist: "永吉繭美",
    year: 2022,
    date: "2022-09-07",
    workType: "artist-work",
    category: "mix-mastering",
    roles: ["ミックス", "マスタリング"],
    summary: "永吉繭美のSingle「能登の唄」。全曲を担当。",
    label: "yashin record",
    format: "Single",
    collectionTitle: "能登の唄",
    genre: "歌謡曲",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/76/c3/70/76c3701d-07eb-8953-0329-61bf0ac70a56/859758641634_cover.jpg/600x600bf-60.jpg",
    links: [
      {
        platform: "apple-music",
        label: "Apple Music",
        href: "https://music.apple.com/jp/album/%E8%83%BD%E7%99%BB%E3%81%AE%E5%94%84-single/1642716822",
      },
    ],
  },
  {
    id: "olympia-sammy-pachislot-sound",
    title: "パチスロ音楽・効果音",
    client: "株式会社オリンピア様 / サミー株式会社様",
    workType: "corporate-project",
    category: "sound-design",
    roles: ["サウンド開発", "音楽制作", "効果音制作"],
    summary: "パチスロ向けの音楽・効果音制作。",
    format: "Corporate",
    artworks: [
      {
        src: "/archive/pachislot-lupin-machine.jpg",
        alt: "株式会社オリンピア様 / サミー株式会社様 パチスロ音楽・効果音：俺の名はルパン三世 筐体",
        label: "俺の名はルパン三世",
        fit: "contain",
      },
      {
        src: "/archive/pachislot-inoki-machine.jpg",
        alt: "株式会社オリンピア様 / サミー株式会社様 パチスロ音楽・効果音：アントニオ猪木も燃えるパチスロ機 筐体",
        label: "アントニオ猪木も燃えるパチスロ機",
        fit: "contain",
      },
    ],
  },
  {
    id: "tbs-audio-production",
    title: "音源制作",
    client: "株式会社TBSテレビ様",
    workType: "corporate-project",
    category: "sound-design",
    roles: ["サウンド開発", "音源制作"],
    summary: "企業向けの音源制作。",
    format: "Corporate",
  },
  {
    id: "casio-preset-data",
    title: "プリセットデータ制作",
    client: "カシオ計算機株式会社様",
    workType: "corporate-project",
    category: "sound-design",
    roles: ["サウンド開発", "プリセット制作"],
    summary: "製品向けのプリセットデータ制作。",
    format: "Corporate",
  },
  {
    id: "jlc-opening-ending-music",
    title: "OP, ED曲制作",
    client: "株式会社日本レジャーチャンネル様",
    workType: "corporate-project",
    category: "sound-design",
    roles: ["サウンド開発", "楽曲制作"],
    summary: "オープニング、エンディング曲の制作。",
    format: "Corporate",
  },
  {
    id: "otobank-audiobook-audio",
    title: "オーディオブック音源制作",
    client: "株式会社オトバンク様",
    workType: "audiobook",
    category: "sound-design",
    roles: ["サウンド開発", "音源制作"],
    summary: "オーディオブック向けの音源制作。",
    format: "Corporate",
    links: [
      {
        platform: "official",
        label: "audiobook.jp ブックリスト",
        href: "https://audiobook.jp/search?q=",
      },
    ],
  },
]

// -------------------------------------------------------------------------
// Accessors
// -------------------------------------------------------------------------

/**
 * All static items sorted newest-first.
 */
export function getArchiveItems(opts?: {
  category?: ArchiveCategory
  year?: number
}): ArchiveItem[] {
  let items = [...archiveItems]
  if (opts?.category) items = items.filter((i) => i.category === opts.category)
  if (opts?.year) items = items.filter((i) => i.year === opts.year)
  return items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
}

export function getFeaturedWorks(limit = 3): ArchiveItem[] {
  return archiveItems
    .filter((i) => i.featured)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, limit)
}

export function getArchiveYears(): number[] {
  return [
    ...new Set(archiveItems.map((i) => i.year).filter((y): y is number => y != null)),
  ].sort((a, b) => b - a)
}

// Back-compat alias so existing imports of `archiveWorks` still resolve.
export const archiveWorks = archiveItems
