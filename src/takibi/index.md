---
title: 焚き火
short_slug: index
published: 2025-05-31 00:00:00
lastUpdated: 2025-11-26 19:00:00
description: 枝を拾い、薪を作ることから始める焚火。薪修行。薪は拾った枝がいい。
---
::: info
枝を拾い、薪を作ることから始める焚火。薪修行。薪は拾った枝がいい。
:::
<PostsList :posts="childs" />

<script setup>
import { data as posts } from './index.data'
import { useData } from 'vitepress'
import { computed } from 'vue'
import PostsList from '../../.vitepress/posts-list.vue'
import { sortPosts } from '../../utils'
const { frontmatter } = useData()
const childs = computed(() => {
  return sortPosts(posts, frontmatter)
})
</script>

