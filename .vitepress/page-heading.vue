<template>
  <h1 v-if="frontmatter.title" class="doc-heading">{{ frontmatter.title }}</h1>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>
<style>
.doc-heading {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  margin-bottom: .5rem;
  position: relative;
  font-weight: 600;
  outline: none;
  overflow-wrap: break-word;
}
</style>
    
