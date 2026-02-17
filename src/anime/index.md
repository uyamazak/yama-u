---
title: アニメ
short_slug: index
published: 2025-06-24
lastUpdated: 2025-06-24
description: 主に配信で見たアニメの感想や考察を書いてます。ネタバレありです。
---
::: info
主に配信で見たアニメの感想や考察を書いてます。ネタバレありです。
:::

<PostsList :posts="childs" />

<script setup lang="ts">
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

