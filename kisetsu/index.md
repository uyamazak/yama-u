---
title: アニメ
published: 2025-06-24
lastUpdated: 2025-06-24
---

<PostsList :posts="childs" />

<script setup>
import { data as posts } from './index.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'
import PostsList from '../.vitepress/posts-list.vue'

const { frontmatter } = useData()
const childs = computed(() => {
  const filterd = posts.filter(post => {
    return post.frontmatter.title !== frontmatter.value.title
  })
  return filterd.sort((a, b) => {
    return new Date(b.frontmatter.published) - new Date(a.frontmatter.published)
  })
})
</script>

