<template>
  <ul class="breadcrumbs">
    <li><a href="/">🏚️</a></li>
    <li v-if="frontmatter.parent && frontmatter.parent.title !== frontmatter.title">
      <a :href="frontmatter.parent.path">{{ frontmatter.parent.title }}</a>
    </li>
    <li v-if="frontmatter.title">{{ frontmatter.title }}</li> 
  </ul>
</template>
<style scoped>
.breadcrumbs {
  list-style: none;
  font-size: small;
  padding: 0;
  margin: 0 0 1rem 0;
  display: flex;
  flex-wrap: wrap;
}
.breadcrumbs li {
  margin-right: 0.5rem;
}
.breadcrumbs li:not(:last-child)::after {
  content: ' / ';
  margin-left: 0.5rem;
}
.breadcrumbs a {
  text-decoration: none;
}
.breadcrumbs a:hover {
  text-decoration: underline;
}
.breadcrumbs span {
  color: #6c757d;
}
</style>

<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>
