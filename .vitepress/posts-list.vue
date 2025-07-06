<template>
<ul>
  <li v-for="post of posts">
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
.post-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 0.5em;
}
.post-link:hover {
  background-color: #eee;
}
.post-date {
  font-size: 0.8em;
  margin-right: 0.5em;
  color: #888;
}
.title {
  text-decoration: underline;
}


</style>
