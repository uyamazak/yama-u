---
title: 焚き火
published: 2025-05-31
lastUpdated: 2025-05-31
---

<ul>
  <li v-for="post of childs">
    <a :href="post.url">    
      {{ post.frontmatter.title }}
      <span class="post-date">{{ formatDate(post.frontmatter.published) }}</span>
    </a>
  </li>
</ul>

<script setup>
import { data as posts } from './index.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { formatDate } from '../utils.mjs'

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
<style>
.post-date {
  font-size: 0.8em;
}
</style>
