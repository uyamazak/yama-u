<template>
  <div class="post-date">
   <span v-if="frontmatter.published" class="published">公開 <span class="date">{{ formatDate(frontmatter.published) }}</span></span>
   <span v-if="frontmatter.lastUpdated && frontmatter.published !== frontmatter.lastUpdated" class="last-updated">更新 <span class="date">{{ formatDate(frontmatter.lastUpdated) }}</span></span>
  </div>
</template>

<script setup>
import { formatDate } from '../utils.mjs'
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<style scoped>
.post-date {
  font-size: 0.75em;
  margin-top: 0.5em;
  text-align: right ;
}
.published {
  margin-right: 1em;
}
</style>
