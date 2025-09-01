<template>
  <div v-if="tagPosts.length">
    <h2 class="tags-title">他の「{{ tags.join(', ') }}」</h2>
    <PostsList :posts="tagPosts" />
  </div>
</template>
<script setup>
import { data as posts } from '../index.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'
import PostsList from '../.vitepress/posts-list.vue'
import { sortPosts } from '../utils.mts'
const { frontmatter, page } = useData()
const isIndex = computed(() => page.value.filePath.endsWith('index.md'))
const tags = frontmatter.value.tags
const tagPosts = computed(() => {
  if (!tags || !tags.length) return []
  if (isIndex.value) return []
  const allposts = sortPosts(posts, frontmatter)
  return allposts.filter(post => {
    const postTags = post.frontmatter.tags
    if (!postTags ||!postTags.length) return false
    return tags.some(tag => postTags.includes(tag))
  })
})
</script>

<style scoped>
.tags-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 2em 0 0.5em;
}
</style>
