import { ContentData, PageData } from 'vitepress'

type MyConfig = {
  siteTitle: string;
  authorName: string;
  baseUrl: string;
  defaultImg: string;
  categories: { text: string, link: string }[];
}

export type PostMetaWithIndex = {
  title: string;
  url: string;
  published: string;
  lastUpdated?: string;
  order: number;
  isIndex: boolean;
  description?: string;
  image?: string;
}
export const getOrderdPosts = (contents: ContentData[]): PostMetaWithIndex[] => {
  const formatted = contents.map((content) => {
    return {
      title: content.frontmatter.title,
      url: content.url,
      published: content.frontmatter.published,
      lastUpdated: content.frontmatter.lastUpdated,
      description: content.frontmatter.description || content.excerpt,
      image: content.frontmatter.image
    }
  })
  const sorted = formatted.sort((a, b) => {
    if (b.published === a.published) {
      return b.url > a.url ? 1 : -1
    }
    return b.published > a.published ? -1 : 1
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

export const getNextAndPrevPost = (url: string, posts: PostMetaWithIndex[]): { prev: { text: string, link: string } | false, next: { text: string, link: string } | false } => {
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

export const breadCrumbsJsonLd = (pageData: PageData, canonicalUrl: string, config: MyConfig) => {
  const { siteTitle, baseUrl } = config
  const { frontmatter } = pageData
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: `${siteTitle} ホーム`,
      item: baseUrl
    },
  ]
  if (frontmatter.parent) {
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

export const toISOStringWithTimezone = (date: Date): string => {
  const isoString = date.toISOString()
  const year = isoString.slice(0, 4)
  const month = isoString.slice(5, 7)
  const day = isoString.slice(8, 10)
  const hour = isoString.slice(11, 13)
  const min = isoString.slice(14, 16)
  const sec = isoString.slice(17, 19)
  const tz = -date.getTimezoneOffset()
  const sign = tz >= 0 ? '+' : '-'
  const tzHour = `${tz / 60}`.padStart(2, '0')
  const tzMin = `${tz % 60}`.padStart(2, '0')

  return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`
}
export const articleJsonLd = (pageData: PageData, canonicalUrl: string, config: MyConfig) => {
  const { authorName, baseUrl, defaultImg } = config
  const { frontmatter } = pageData
  const datePublished = frontmatter.published ? toISOStringWithTimezone(frontmatter.published) : undefined
  const dateModified = frontmatter.updated ? toISOStringWithTimezone(frontmatter.updated) : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    headline: frontmatter.title,
    image: frontmatter.image || defaultImg,
    url: canonicalUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
      url: `${baseUrl}/author.html`
    },
    publisher: {
      '@type': 'Organization',
      name: config.siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${config.baseUrl}/img/logo.webp`
      }
    },
    description: frontmatter.description || pageData.description || undefined
  }
}

export const itemListJsonLd = (posts: PostMetaWithIndex[], config: MyConfig) => {
  if (posts.length === 0) {
    return null
  }
  const sortedPosts = posts
    .filter(
      post => !post.isIndex && post.published
    ).reverse() // 最新の投稿が先頭に来るように逆順にする
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: sortedPosts.length,
    itemListElement: sortedPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${config.baseUrl}${post.url}`
        },
        headline: post.title,
        url: `${config.baseUrl}${post.url}`,
        image: config.defaultImg,
        datePublished: toISOStringWithTimezone(new Date(post.published)),
        dateModified: post.lastUpdated ? toISOStringWithTimezone(new Date(post.lastUpdated)) : undefined,
        author: {
          '@type': 'Person',
          name: config.authorName,
          url: `${config.baseUrl}/author.html`
        },
        publisher: {
          '@type': 'Organization',
          name: config.siteTitle,
          logo: {
            '@type': 'ImageObject',
            url: `${config.baseUrl}/img/logo.webp`
          }
        },
        description: post.description || undefined,
      },
    }))
  }
}
