# Nuxt Studio Setup

このプロジェクトにNuxt Studioが追加されました。ブラウザ上でMarkdownファイルを編集できる環境が整いました。

## インストール済みパッケージ

- `nuxt@^4.3.1` - Nuxt 3フレームワーク
- `@nuxt/content@^3.11.2` - Nuxt Content モジュール  
- `@nuxthq/studio@^2.2.1` - Nuxt Studio エディター
- `better-sqlite3` - Nuxt Contentが必要とするデータベース

## ディレクトリ構造

プロジェクトのMarkdownファイルは `src/` ディレクトリに保存されており、Nuxt Contentからは `content` という名前のシンボリックリンクを通じてアクセスされます。

```
yama-u/
├── src/                    # Markdownコンテンツ (VitePress用)
│   ├── poem/              # ポエムカテゴリ
│   ├── anime/             # アニメカテゴリ
│   └── takibi/            # 焚き火カテゴリ
├── content -> src         # srcへのシンボリックリンク (Nuxt Content用)
├── pages/                 # Nuxt ページ
│   ├── index.vue         # トップページ
│   └── [...slug].vue     # 動的ルート（記事ページ）
├── nuxt.config.ts        # Nuxt 設定
├── content.config.ts     # Nuxt Content 設定
└── app.vue               # Nuxt アプリのルート
```

## 使い方

### Nuxt Studio の起動

```bash
npm run studio:dev
```

このコマンドを実行すると、Nuxt Studioの開発サーバーが起動します。通常は http://localhost:3000 で起動しますが、ポートが使用中の場合は自動的に次に利用可能なポート（例: http://localhost:3001）を使用します。

起動時のログで実際のURLを確認してください:
```
➜ Local:    http://localhost:3001/
```

### ビルドとプレビュー

```bash
# Nuxt Studioをビルド
npm run studio:build

# ビルドしたものをプレビュー
npm run studio:preview
```

### VitePress の起動（既存）

```bash
npm run dev
# または
npm run docs:dev
```

既存のVitePressサイトは引き続き同じコマンドで起動できます。

## 設定ファイル

### nuxt.config.ts

Nuxt 3の設定ファイル。以下が含まれます：
- Nuxt ContentとNuxt Studioモジュールの有効化
- コンテンツのハイライト設定
- Markdown機能の設定
- Studio機能の有効化

### content.config.ts

Nuxt Contentのコレクション設定：
- `content` コレクション: すべてのMarkdownファイル（`**/*.md`）を含む
- `parts` ディレクトリを除外

### .gitignore

以下のNuxt関連ディレクトリが除外されています：
- `.nuxt` - Nuxt のビルドキャッシュ
- `.output` - Nuxt のビルド出力
- `dist` - 配布用ビルド

## 現在の状態

✅ **動作している機能:**
- Nuxt Studio開発サーバーの起動
- 129個のMarkdownファイルの検出
- シンボリックリンクによる`src/`ディレクトリへのアクセス
- 基本的なNuxtアプリケーション構造

⚠️ **進行中の作業:**
- Nuxt Content v3のクエリAPI統合
- 記事一覧の表示機能
- 個別記事ページの表示機能

## 技術メモ

### Nuxt Content v3の変更点

Nuxt Content v3では以下の変更があります：
- `queryContent` → `queryCollection` にAPI変更
- コレクションベースのコンテンツ管理
- SQLite を使用したコンテンツインデックス

### シンボリックリンクについて

`content` → `src` のシンボリックリンクにより、既存のVitePressコンテンツをそのまま利用できます。これにより：
- VitePressは従来通り`src/`を使用
- Nuxt Contentは`content/`（実際は`src/`）を使用
- 両方のシステムが同じファイルを参照

## 注意事項

1. **2つの独立したシステム**
   - VitePress: 既存のサイト生成システム（本番環境用）
   - Nuxt Studio: 新しく追加されたMarkdownエディター（開発環境用）

2. **ポート競合**
   - VitePressとNuxt Studioを同時に起動する場合、異なるポートを使用します
   - Nuxt Studioは自動的に利用可能なポートを見つけます

3. **本番環境**
   - 本番環境では引き続きVitePressを使用してビルドします
   - Nuxt Studioはローカル開発環境でのMarkdown編集用です

## トラブルシューティング

### ポートが使用中

Nuxt Studioが起動時にポート3000が使用中の場合、自動的に次に利用可能なポート（3001など）を使用します。ターミナルに表示されるURLを確認してください。

### コンテンツが表示されない

Nuxt Contentが正しくファイルを読み込んでいることを確認してください。ログに以下のようなメッセージが表示されているか確認：

```
[@nuxt/content] Processed 2 collections and 129 files
```

### シンボリックリンクの確認

```bash
ls -la | grep content
# 表示例: lrwxrwxrwx 1 runner runner 3 Feb 10 06:20 content -> src
```

## 今後の改善予定

- [ ] Nuxt Content v3 クエリAPIの完全な統合
- [ ] 記事一覧ページの実装
- [ ] 個別記事ページの完全な表示機能
- [ ] Studio UIでのMarkdown編集機能のテストと最適化
- [ ] カテゴリページの実装
- [ ] 検索機能の追加

## 参考リンク

- [Nuxt 3 Documentation](https://nuxt.com/)
- [Nuxt Content Documentation](https://content.nuxt.com/)
- [Nuxt Studio Documentation](https://nuxt.studio/)
- [VitePress Documentation](https://vitepress.dev/)
