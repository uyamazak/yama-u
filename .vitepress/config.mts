import { defineConfig, createContentLoader, ContentData, PageData } from 'vitepress'



// https://vitepress.dev/reference/site-config
const categories = [
  { text: '🔥焚き火', link: '/takibi/' },
  { text: '📺️アニメ', link: '/anime/' },
  { text: '📖ポエム', link: '/poem/' },
]
const baseUrl = 'https://yama-u.com'
const siteTitle = 'やまユー'
const gaId = 'G-1QB9QSHRS0'

type PostMetaWithIndex = {
  title: string;
  url: string;
  date: string;
  order: number;
  isIndex: boolean;
}
const getOrderdPosts = (contents: ContentData[]): PostMetaWithIndex[] => {
  const formatted = contents.map((content) => {
    return {
      title: content.frontmatter.title,
      url: content.url,
      date: content.frontmatter.published
    }
  })
  const sorted = formatted.sort((a, b) => {
    if (b.date === a.date) {
      return b.url > a.url ? 1 : -1
    }
    return b.date > a.date ? -1 : 1
  })

  const withOrder = sorted.map((content, index) => {
    return {
      ...content,
      order: index + 1,
      isIndex: content.url.endsWith('/'),
    }
  })
  return withOrder
}

const getNextAndPrevPost = (url: string, posts: PostMetaWithIndex[]): { prev: { text: string, link: string } | false, next: { text: string, link: string } | false } => {
  const withoutIndexPosts = posts.filter(post => !post.isIndex);
  const currentIndex = withoutIndexPosts.findIndex(post => post.url === url);
  if (currentIndex === -1) {
    return { prev: false, next: false };
  }
  const prevPost = currentIndex > 0 ? withoutIndexPosts[currentIndex - 1] : false;
  const nextPost = currentIndex < withoutIndexPosts.length - 1 ? withoutIndexPosts[currentIndex + 1] : false;
  return {
    prev: prevPost ? { text: prevPost.title, link: prevPost.url } : false,
    next: nextPost ? { text: nextPost.title, link: nextPost.url } : false
  }
}

const breadCrumbsJson = (pageData: PageData, canonicalUrl: string) => {
  const { frontmatter } = pageData
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: `${siteTitle} ホーム`,
      item: baseUrl
    },
  ]
  if (frontmatter.parentPath) {
    items.push({
        '@type': 'ListItem',
        position: 2,
        name: frontmatter.parent.title,
        item: `${baseUrl}${frontmatter.parent.path}`
      })
  }
  if (frontmatter.title && frontmatter.title !== frontmatter.parent?.title) {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: frontmatter.title,
      item: canonicalUrl
    })
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
}

export default async () => {
  return defineConfig({
    title: siteTitle,
    titleTemplate: `令和最新版テキストサイト`,
    description: "枝と焚火の令和最新版テキストサイト",
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
            "name": "${siteTitle}",
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
        { text: '🏡Home', link: baseUrl },
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
        copyright: `Copyright © 2025-present ${siteTitle} ( ﾟДﾟ)ﾊｧ?`
      },
      logo: {
        src: '/img/logo.webp',
        alt: `${siteTitle}ロゴ`,
        href: baseUrl
      },
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
      if (pageData.relativePath.includes('/')) {
        const category = pageData.relativePath.split('/')[0]
        const categoryPath = `/${category}/*.md`
        const sameCategoryLoader = createContentLoader(categoryPath)
        const categoryData = await sameCategoryLoader.load()
        const sortedCategoryPosts = getOrderdPosts(categoryData)
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
      }
      const breadCrumbs = breadCrumbsJson(pageData, canonicalUrl)
      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(breadCrumbs, null, 2)
      ])
    },
    lastUpdated: false
  })
}
