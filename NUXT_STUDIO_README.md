# Nuxt Studio Setup

このプロジェクトにNuxt Studioが追加されました。ブラウザ上でMarkdownファイルを編集できるようになります。

## インストール済みパッケージ

- `nuxt@latest` - Nuxt 3フレームワーク
- `@nuxt/content@latest` - Nuxt Content モジュール  
- `@nuxthq/studio@latest` - Nuxt Studio エディター
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
├── nuxt.config.ts        # Nuxt 設定
└── content.config.ts     # Nuxt Content 設定
```

## 使い方

### Nuxt Studio の起動

```bash
npm run studio:dev
```

このコマンドを実行すると、Nuxt Studioの開発サーバーが起動します（通常は http://localhost:3000 または http://localhost:3001）。

### VitePress の起動（既存）

```bash
npm run dev
# または
npm run docs:dev
```

既存のVitePressサイトは引き続き同じコマンドで起動できます。

## 注意事項

1. **2つの独立したシステム**
   - VitePress: 既存のサイト生成システム
   - Nuxt Studio: 新しく追加されたMarkdownエディター

2. **コンテンツの共有**
   - 両方のシステムが同じ `src/` ディレクトリのMarkdownファイルを使用
   - Nuxt Contentは `content` シンボリックリンクを通じて `src/` にアクセス

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

## 今後の作業

現在、基本的なNuxt StudioとNuxt Contentの統合が完了しています。以下の機能を追加で実装する可能性があります:

- [ ] Nuxt Content APIの完全な動作確認
- [ ] Studio UIでのMarkdown編集機能の有効化
- [ ] カテゴリページの実装
- [ ] 記事一覧の表示改善
