---
title: Cloudflare Workersで末尾.html除去リダイレクトをやめさせる
lastUpdated: 2025-08-18 
published: 2025-08-18
---

[ホスティングをFirebase HostingからCloudflare Workersに移転](/poem/2025-08-firebase-hosting-to-cloudflare-workers.html)してからGoogle Search Consoleから`代替ページ（適切な canonical タグあり）`の警告が出るようになった。

確認すると末尾の`.html`がないパスへ珍しい307でリダイレクトされていた。

VitePressのデフォルトも.html付きだし、sitemap.xmlもそのパスで出力しているし、古来のホームページも.htmlが付いていたので、なるべく維持したい。

Geminiに聞いたところWorkersと書いているのにPagesの説明が出てきて役に立たなかった。

設定はCloudflareのコンソールではなく、デプロイコマンドに使われる`wrangler`のオプションで行うようだ。

https://developers.cloudflare.com/workers/wrangler/configuration/#assets

末尾スラッシュの制御を行う`html_handling`が末尾拡張子の除去も行っているようで`none`でよさそう。

Gitレポジトリのルートに以下の`wrangler.jsonc`ファイルを設置してデプロイしたところ、リダイレクトは止まった。
コマンドに付けていた他の設定もこのファイルに移動した。


```jsonc
{
  "name": "yama-u",
  "compatibility_date": "2025-08-17",
  "assets": {
    "directory": ".vitepress/dist",
    "not_found_handling": "404-page",
    "html_handling": "none"
  }
}
```

Cloudflare WorkersとVitePressの情報は少なくAIもPagesの情報ばかりで役に立たない。手探りでまだいろいろ試す必要がありそうで楽しい。
