import { defineConfig } from 'vitepress'
import { createContentLoader } from 'vitepress'


// https://vitepress.dev/reference/site-config
const categories = [
  { text: '🔥焚き火', link: '/takibi/' },
  { text: '📺️アニメ', link: '/anime/' },
  { text: '📖ポエム', link: '/poem/' },
]
const baseUrl = 'https://yama-u.web.app/'
export default async () => {
      
  return defineConfig({
    title: "ヤマユー",
    titleTemplate: ":title - 令和最新版テキストサイト",
    description: "枝と焚火の令和最新版テキストサイト",
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      [
        'script',
        { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-1QB9QSHRS0' }
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-1QB9QSHRS0');`
      ]
    ],
    lang: 'ja',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: '🏡Home', link: '/' },
        { text: '🍉About', link: '/about' },
        ...categories
      ],

      sidebar: [
        {
          text: '🍉このサイトについて',
          link: '/about',
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
        copyright: 'Copyright © 2025-present やまゆう ( ﾟДﾟ)ﾊｧ?'
      },
      logo: {
        src: '/img/logo.webp',
        alt: 'ヤマユーロゴ',
        href: '/'
      },
    },
    sitemap: {
      hostname: baseUrl,
    },
    async transformPageData(pageData, context) {
      if (!pageData.relativePath.includes('/')) {
        return
      }
      
      if (pageData.relativePath.endsWith('index.md')) {
        return
      }
      const parent = pageData.relativePath.split('/')[0]
      const parentPath = `${parent}/index.md`
      pageData.frontmatter.parentPath = parentPath
      const loader = createContentLoader(parentPath)
      const parentData = await loader.load()
      if (parentData.length) {
        pageData.frontmatter.parent = {title: parentData[0].frontmatter.title, path: parentData[0].url}
      }
      

      const canonicalUrl = `${baseUrl}${pageData.relativePath}`
        .replace(/index\.md$/, '')
        .replace(/\.md$/, '.html')

      pageData.frontmatter.head ??= []
      pageData.frontmatter.head.push([
        'link',
        { rel: 'canonical', href: canonicalUrl }
      ])

    }
  })
}
