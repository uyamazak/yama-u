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
  return `${year}年${month}月${day}日`
}
