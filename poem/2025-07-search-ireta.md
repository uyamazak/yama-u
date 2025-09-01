---
title: サイト内検索をvitepress-plugin-pagefindで入れた
lastUpdated: 2025-07-19 16:00:00
published: 2025-07-19 16:00:00
tags:
  - ホームページ開発
---

VitePressのローカルでのサイト内検索はMiniSeachが入っていたが、英文ベースのスペース区切りでの単語検索で、日本語の検索には向いていなかった。

探してみたらプラグインがあり、`vitepress-plugin-pagefind`が更新も新しく良さそうだった。

vitepress-plugin-pagefind  
http://npmjs.com/package/vitepress-plugin-pagefind

ビルド時にindexも生成してるっぽく、日本語の単語も問題なく検索できた。

外部のAlgolia等を使うのもあるが、費用も運用も面倒なので、ローカルでここまで完結するのはありがたい。

開発サーバーでは動かないのでローカルでの挙動確認はbuildとpreviewが必要だけど、最初や設定変えたときぐらいなのでデメリットというほどでもない。

デフォルトの検索窓だけでなく、検索結果ページとURLのクエリでの検索ができれば、簡易タグページとしても使えそうだがどうだろう。

例えば`/?q=UNIFLAME`でUNIFLAMEに関する記事が一覧ページが出てくるような。
