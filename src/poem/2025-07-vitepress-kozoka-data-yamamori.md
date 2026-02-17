---
title: VitePressで構造化データを山盛りにした
short_slug: 2025-07-vitepress-kozoka-data-yamamori
lastUpdated: 2025-07-18 
published: 2025-07-18
description: VitePressで構築したサイトに構造化データをてんこ盛りにした
tags:
  - ホームページ開発
---

SEO対策で重要になっているが、サイト上には表示されないし一般的には知られてもなさそうな[構造化データ](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=ja)。

検索エンジンに向けたデータで、SEOが重要なWEBサイト開発業務では必須です。

このサイトはVitePressで作っていますが、デフォルトでは対応してないので自分で実装する必要があります。

ぶっちゃけこの個人テキストサイトには必要性はほとんどないと思いますが、せっかくなので可能な限りぶち込んでみました。

HTMLの中身よりもJSON-LDの方が多い気が。むしろ転送量増えてわずかに表示遅くなるデメリットもあるかもしれない。

処理はconfigでtransformPageDataでheadに追加するものをモリモリ書いてます。見せれるほど整理できてないので今回は割愛。

NuxtやAstroに比べるとカスタマイズにはいろいろ不便ではあるものの、やろうとすればできる感じ。

現時点（2025/7/18）での出力はこんな感じ。

## サイト全体
ソースを見てもらうとわかりますが、全ページに**WebSite**と**Person**を追加。
```html
<script type="application/ld+json">[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "やまユー",
            "url": "https://yama-u.com"
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "やまゆう",
            "url": "https://yama-u.com/author.html",
            "sameAs": [
                "https://www.youtube.com/@yama-u-eda"
            ]
          }
        ]</script>
```

## カテゴリページ

パンくず **BreadcrumbList** と 記事一覧の**BlogPosting**

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "やまユー ホーム",
      "item": "https://yama-u.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "焚き火",
      "item": "https://yama-u.com/takibi/"
    }
  ]
}</script>
```

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "numberOfItems": 22,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://yama-u.com/takibi/2025-07-uniframe-2024haiban-uf-gear-bag50.html"
        },
        "headline": "2024年廃盤 UFギアバック50＆ステンレスワイヤー網 150×400を買った",
        "url": "https://yama-u.com/takibi/2025-07-uniframe-2024haiban-uf-gear-bag50.html",
        "image": "https://yama-u.com/img/article-default.webp",
        "datePublished": "2025-07-16T00:00:00+09:00",
        "dateModified": "2025-07-16T00:00:00+09:00",
        "author": {
          "@type": "Person",
          "name": "やまゆう",
          "url": "https://yama-u.com/author.html"
        },
        "publisher": {
          "@type": "Organization",
          "name": "やまユー",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yama-u.com/img/logo.webp"
          }
        }
      }
      //省略
```
## 記事ページ
記事ページには、パンくず（省略）と記事の**BlogPosting**を追加。

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://yama-u.com/takibi/2025-07-uniframe-2024haiban-uf-gear-bag50.html"
  },
  "headline": "2024年廃盤 UFギアバック50＆ステンレスワイヤー網 150×400を買った",
  "image": "https://yama-u.com/img/article-default.webp",
  "url": "https://yama-u.com/takibi/2025-07-uniframe-2024haiban-uf-gear-bag50.html",
  "datePublished": "2025-07-16T00:00:00+09:00",
  "author": {
    "@type": "Person",
    "name": "やまゆう",
    "url": "https://yama-u.com/author.html"
  },
  "publisher": {
    "@type": "Organization",
    "name": "やまユー",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yama-u.com/img/logo.webp"
    }
  },
}</script>
```
Search Consoleの対応やGemini先生に聞いたところ、今のところ一番重要なのはパンくずっぽい。

そもそも現時点ではほぼ検索エンジンにも出てこないサイトなので、役に立つ日は来るのだろうか。

でも、そこらへんのブログ、VitePressのサイトでここまで入れてるところはまだ見たこと無いので自己満足です。
