import { defineConfig, createContentLoader } from 'vitepress'
import { getOrderdPosts, getNextAndPrevPost, breadCrumbsJsonLd, articleJsonLd, itemListJsonLd } from './utils.mts'
// https://vitepress.dev/reference/site-config
const categories = [
  { text: '🔥焚き火', link: '/takibi/' },
  { text: '📺️アニメ', link: '/anime/' },
  { text: '📖ポエム', link: '/poem/' },
]
const baseUrl = 'https://yama-u.com'
const siteTitle = 'やまユー'
const authorName = 'やまゆう'
const gaId = 'G-1QB9QSHRS0'
const defaultImg = `${baseUrl}/img/article-default.webp`

const myConfig = {
  siteTitle,
  authorName,
  baseUrl,
  defaultImg,
  categories,
}

export default async () => {
  return defineConfig({
    title: siteTitle,
    titleTemplate: `枝と焚火とアニメ`,
    description: "枝と焚火とアニメの令和最新版テキストサイト",
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      [
        'script',
        { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${gaId}` }
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');`
      ],
      [
        'script',
        { type: 'application/ld+json' },
        `[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "${siteTitle}",
            "url": "${baseUrl}"
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "${authorName}",
            "url": "https://yama-u.com/author.html",
            "sameAs": [
                "https://www.youtube.com/@yama-u-eda"
            ]
          }
        ]`
      ],
    ],
    lang: 'ja',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: '🏡Home', link: '/' },
        { text: '🍉About', link: '/about.html' },
        ...categories
      ],
      sidebar: [
        {
          text: '🍉このサイトについて',
          link: '/about.html',
        },
        {
          text: 'カテゴリ',
          items: categories
        },

      ],
      socialLinks: [
        { icon: 'youtube', link: 'https://www.youtube.com/@yama-u-eda' }
      ],
      footer: {
        message: 'powered by VitePress',
        copyright: `Copyright © 2025-present ${authorName} ( ﾟДﾟ)ﾊｧ?`
      },
      logo: {
        src: '/img/logo.webp',
        alt: `${siteTitle}ロゴ`,
      },
      search: {
        provider: 'local',
        options: {
        miniSearch: {
          options: {
            tokenize: (term) => {
              if (typeof term === 'string') term = term.toLowerCase();
              const segmenter = Intl.Segmenter && new Intl.Segmenter('ja-JP', { granularity: 'word' });
              if (!segmenter) return [term];
              const tokens = [];
              for (const seg of segmenter.segment(term)) {
                // @ts-ignore
                // ignore spaces
                if (seg.segment.trim() !== '') tokens.push(seg.segment);
              }
              return tokens;
            },
          },
        },
      },
      }
    },
    sitemap: {
      hostname: baseUrl,
    },
    async transformPageData(pageData, context) {
      const currentPageLoader = createContentLoader(pageData.relativePath)
      const currentPageData = await currentPageLoader.load()
      const canonicalUrl = `${baseUrl}/${pageData.relativePath}`
        .replace(/index\.md$/, '')
        .replace(/\.md$/, '.html')

      pageData.frontmatter.head ??= []
      pageData.frontmatter.head.push([
        'link',
        { rel: 'canonical', href: canonicalUrl }
      ])
      const isCategoryPage = pageData.relativePath.endsWith('index.md')
      const category = pageData.relativePath.split('/')[0]
      const categoryPath = `/${category}/*.md`
      const sameCategoryLoader = createContentLoader(categoryPath)
      const categoryData = await sameCategoryLoader.load()
      const sortedCategoryPosts = getOrderdPosts(categoryData)
      if (isCategoryPage) {
        const latestPost = sortedCategoryPosts[sortedCategoryPosts.length - 1]
        if (latestPost?.lastUpdated) {
          pageData.frontmatter.lastUpdated = latestPost.lastUpdated
        }
        const itemList = itemListJsonLd(sortedCategoryPosts, myConfig)
        if (itemList) {
          pageData.frontmatter.head.push([
            'script',
            { type: 'application/ld+json' },
            JSON.stringify(itemList, null, 2)
          ])
        }

      } else {
        const nextAndPrev = getNextAndPrevPost(currentPageData[0].url, sortedCategoryPosts)
        pageData.frontmatter.prev = nextAndPrev.prev
        pageData.frontmatter.next = nextAndPrev.next

        const categoryIndexPath = `${category}/index.md`
        pageData.frontmatter.parentPath = categoryIndexPath
        const categoryIndexloader = createContentLoader(categoryIndexPath)
        const categoryIndexData = await categoryIndexloader.load()
        if (categoryIndexData.length) {
          const categoryIndex = categoryIndexData[0]
          pageData.frontmatter.parent = { title: categoryIndex.frontmatter.title, path: categoryIndex.url }
        }

        const articleSchema = articleJsonLd(pageData, canonicalUrl, myConfig)
        pageData.frontmatter.head.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify(articleSchema, null, 2)
        ])
      }
      const breadCrumbs = breadCrumbsJsonLd(pageData, canonicalUrl, myConfig)
      if (breadCrumbs.itemListElement.length > 1) {
        pageData.frontmatter.head.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify(breadCrumbs, null, 2)
        ])
      }
    },
    lastUpdated: false,
  })
}
