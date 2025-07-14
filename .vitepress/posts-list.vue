<template>
<ul class="post-list">
  <li v-for="post of posts" :key="post.url" class="post-item">
    <a :href="post.url" class="post-link">
      <span class="post-date">{{ formatDate(post.frontmatter.published) }}</span>
      <span class="title">{{ post.frontmatter.title }}</span>
    </a>
  </li>
</ul>
</template>
<script setup>
import { formatDate } from '../utils.mjs'
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
  margin: 0.5em 0;
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
.post-date {
  flex-shrink: 0; /* 日付部分が縮まないようにする */
  font-size: 0.8em;
  margin-right: 1em;
  color: #888;
  /* 等幅フォント */
  font-family: 'Courier New', Courier, monospace;
}
.title {
  text-decoration: underline;
}
</style>
