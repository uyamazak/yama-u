# Decap CMS セットアップガイド

このプロジェクトには Decap CMS (旧 Netlify CMS) がインストールされており、`/admin` から記事の追加・編集ができます。

## 管理画面へのアクセス

- 開発環境: `http://localhost:4173/admin`
- 本番環境: `https://yama-u.com/admin`

## 認証設定

### 方法1: Netlify Identity を使用する場合（推奨）

Netlify でホスティングしている場合、Netlify Identity を使用するのが最も簡単です。

1. Netlify のダッシュボードで、サイトの設定 > Identity を開く
2. "Enable Identity" をクリック
3. "Registration preferences" で "Invite only" を選択（推奨）
4. "Services" > "Git Gateway" を有効化
5. ユーザーを招待する

### 方法2: GitHub OAuth を使用する場合

`src/public/admin/config.yml` を編集:

```yaml
backend:
  name: github
  repo: uyamazak/yama-u
  branch: main
```

その後、GitHub OAuth アプリケーションを作成:

1. GitHub Settings > Developer settings > OAuth Apps > New OAuth App
2. Application name: `yama-u CMS`
3. Homepage URL: `https://yama-u.com`
4. Authorization callback URL: `https://api.netlify.com/auth/done`
5. Client ID と Client Secret を Netlify の設定に追加

## コンテンツ構造

Decap CMS では以下の3つのカテゴリーで記事を管理できます:

- **📖ポエム** (`src/poem/`)
- **🔥焚き火** (`src/takibi/`)
- **📺️アニメ** (`src/anime/`)

### 記事のフィールド

- **タイトル**: 必須
- **公開日**: 必須（YYYY-MM-DD HH:mm:ss 形式）
- **更新日**: オプション（YYYY-MM-DD HH:mm:ss 形式）
- **説明**: オプション（SEO用の説明文）
- **タグ**: オプション（複数指定可能）
- **本文**: 必須（Markdown形式）

### ファイル名の規則

記事は `YYYY-MM-slug.md` の形式で保存されます（例: `2025-07-my-article.md`）

## 画像のアップロード

画像は `src/public/img/` にアップロードされ、記事内では `/img/filename.jpg` として参照できます。

## ローカルでのテスト

ローカル環境でテストする場合は、Decap CMS Proxy Server を使用できます:

```bash
npx decap-server
```

別のターミナルで:

```bash
npm run docs:dev
```

その後、`http://localhost:5173/admin` にアクセス

## 参考リンク

- [Decap CMS 公式ドキュメント](https://decapcms.org/docs/)
- [VitePress 公式ドキュメント](https://vitepress.dev/)
