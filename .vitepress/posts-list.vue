<template>
<ul class="post-list">
  <li v-for="post of posts" :key="post.url" class="post-item">
    <a :href="post.url" class="post-link">
      <span v-if="post.frontmatter.categoryLabel" class="category">{{ post.frontmatter.categoryLabel }}</span>
      <span class="title">{{ post.frontmatter.title }}</span>
      <span class="post-date">{{ formatDate(post.frontmatter.published) }}</span>
    </a>
  </li>
</ul>
</template>
<script setup>
import { formatDate } from '../utils'
const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>
<style scoped>
ul.post-list {
  padding: 0;
  margin: 0;
}
.post-item {
  list-style: none;
  margin: 0.75em 0;
}
.post-link {
  display: flex;
  align-items: baseline;
  text-decoration: none;
  margin-bottom: 0.5em;
}
.post-link:hover {
  background-color: #eee;
}
.dark .post-link:hover {
  background-color: #333;
}
.post-date {
  font-size: .75rem;
  padding-left: .5rem;
  color: #777;
  font-family: 'Space Mono', 'Roboto Mono', 'Noto Sans Mono', monospace;
  font-variant-numeric: tabular-nums;
  font-weight: lighter;
}
.dark .post-date {
  color: #ccc;
}

</style>
