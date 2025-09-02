---
title: ホスティングをCloudflareからFirebaseに戻した
lastUpdated: 2025-09-02
published: 2025-09-02
tags:
  - ホームページ開発
---
サイト公開時はFirebase Hostingを使っていたが、[Cloudflare Workersに移行](/poem/2025-08-firebase-hosting-to-cloudflare-workers.html)していた。

しかし、カテゴリページでhydration mismatchエラーが発生し、表示がぶっ壊れているのに気付いた。

キャッシュ消したりしても変わらず、VitePressの問題かと思いきや、全く同じファイルでもFirebaseでは発生しない。

Cloudflare Pagesも試してみて、その問題は解決したものの、URLの末尾.html削除リダイレクトは無効にできないようだ。

結局、Firebase Hostingに戻すことにした。

若干速度は落ちそうだけど、シンプルで確実なのを優先した。

Cloudflareの末尾.html削除リダイレクトは、困っている人が多いようで、同じ様な議題が[Cloudflare Community](https://community.cloudflare.com/t/cloudflare-pages-get-rid-of-redundat-308-redirect/324582)にあった。

速度も早いし、いいサービスなのに、なぜ余計なリダイレクトを無効にするオプションを用意しないのか不思議。
