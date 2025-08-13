
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

const isDevServer = () => {
  return import.meta.url?.includes('127.0.0') || import.meta.url?.includes('localhost')
}
const publishedPosts = (posts: any[]): any[] => {
  if (!posts.length) {
    return []
  }
  
  // publishedが現在日時より前のものだけを返す
  const now = new Date()
  return posts.filter(post => {
    if (!post.frontmatter?.published) {
      return true
    }
    if (isDevServer()) {
      return true // 開発サーバーでは全ての投稿を表示
    }
    const publishedDate = toISOStringWithTimezone(new Date(post.frontmatter.published))
    return new Date(publishedDate) <= now
  })
}
export const sortPosts = (posts, frontmatter) => {
  const filtered = posts.filter(post => {
    return post.frontmatter.title !== frontmatter.value.title
  })
  const published = publishedPosts(filtered)
  return published.sort((a, b) => {
    if (a.frontmatter.published === b.frontmatter.published) {
      return b.frontmatter.title < a.frontmatter.title ? -1 : 1
    }
    return b.frontmatter.published > a.frontmatter.published ? 1 : -1
  })

}


