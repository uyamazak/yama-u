import { categories } from './.vitepress/config.mts'

export const formatDate = (rawDate) => {
  if (!rawDate) {
    return ''
  }
  const date = new Date(rawDate)
  if (isNaN(date.getTime())) {
    return ''
  }
  const dateString = date.toISOString()
  const year = dateString.slice(0, 4)
  const month = dateString.slice(5, 7)
  const day = dateString.slice(8, 10)
  return `${year}/${month}/${day}`
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

export const isDevServer = () => {
  return import.meta.url?.includes('127.0.0') || import.meta.url?.includes('localhost')
}

export const sortPosts = (posts, frontmatter) => {
  posts.forEach(post => {
    if (post.url.startsWith('/takibi/')) {
      post.frontmatter.categoryLabel = '🔥'
    }
    if (post.url.startsWith('/anime/')) {
      post.frontmatter.categoryLabel = '📺️'
    }
    if (post.url.startsWith('/poem/')) {
      post.frontmatter.categoryLabel = '📖'
    }
  })
  const filtered = posts.filter(post => {
    return post.frontmatter.title !== frontmatter.value.title
  })
  return filtered.sort((a, b) => {
    if (a.frontmatter.published === b.frontmatter.published) {
      return b.frontmatter.title < a.frontmatter.title ? -1 : 1
    }
    return b.frontmatter.published > a.frontmatter.published ? 1 : -1
  })
}


