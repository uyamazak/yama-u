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

export const sortPosts = (posts, frontmatter) => {
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
