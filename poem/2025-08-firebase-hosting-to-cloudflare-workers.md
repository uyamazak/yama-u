---
title: Firebase HostingからCloudflare Workersへ移行した
lastUpdated: 2025-08-14 19:15:00
published: 2025-08-14 19:15:00
tags:
  - ホームページ開発
---

このサイトのホスティングに昔の慣れからFirebase Hostingを利用していたけど、ドメイン取得からやアクセス解析、メール転送機能などCloudflareを使うことが増えてきたのでCloudflareに移行した。

見た目は変わらない。

以前からCloudflare PagesはNetlifyやVercelと同じように静的サイトのホスティングができるサービスとして知っていた。

しかし、現時点だとCloudflareだとPagesは古い機能のようで、新しいプロジェクトはWorkersを使えとお達しが出ていた。せっかくなのでWorkersを使うことにした。

どちらも無料枠での運用のためコスト的には差がない。

Firebase Hostingと比較してメリットは大きく以下の3点


- GitHubと連携しデプロイしてくれる
- Cloudflareで独自ドメインも取得していると設定が簡単
- 表示速度も早いかも（Lighthouseで数回確認しただけ）


また取得した独自ドメインでメールの受信だけを行えるメールルーティングや、アクセス解析も使用できて、個人ホームページには十分な機能が揃っている。

アクセス解析は、Google Analyticsの高機能さは必要ないし、そもそもアクセス少ないし、設置タグもGoogleのものより軽いので良さそう。

ハマった点としてはビルド設定。情報が少ないので手探り。

最終的に以下の設定でビルドに設定した。
`TZ (タイムゾーン)`は今まで自分のPCでビルドしており、公開日などにタイムゾーン情報を含めてなかったため指定している。

```
ビルド コマンド:TZ=Asia/Tokyo npx vitepress build
デプロイ コマンド:npx wrangler deploy --assets=./.vitepress/dist --compatibility-date 2025-08-13
バージョン コマンド:npx wrangler versions upload
ルート ディレクトリ:/
```

`compatibility-date`は、指定しないと以下のエラーが出るので追加した。設定ファイルでもできるようだけど勝手に追加してくれればいいのに。

```
✘ [ERROR] A compatibility_date is required when publishing. Add the following to your Wrangler configuration file:
```

Firebase Hostingはいつでも戻せるようにしばらく残しておく。
