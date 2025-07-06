<template>
<ul class="sidebar-items">
  <li v-for="post of childs">
    <a :href="post.url">    
      {{ post.frontmatter.title }}
      <span class="post-date">{{ formatDate(post.frontmatter.published) }}</span>
    </a>
  </li>
</ul>
</template>

<script setup>
import { data as posts } from '../takibi/index.data.mjs'
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
  }).slice(0, 5)
})
</script>
<style>
.sidebar-items {
  font-size: 0.8rem;
  margin: 0;
}
.post-date {
  font-size: 0.7rem;
}
</style>
