---
title: 焚き火
published: 2025-05-31
lastUpdated: 2025-05-31
description: 枝を拾って作った薪を燃やす焚火のこと、キャンプのこと、道具のことを書いてます。
---
::: info
公園の枝拾いを起源とする焚火のこと、キャンプのこと、道具のことを書いてます。
:::
<PostsList :posts="childs" />

<script setup>
import { data as posts } from './index.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'
import PostsList from '../.vitepress/posts-list.vue'
import { sortPosts } from '../utils.mjs'
const { frontmatter } = useData()
const childs = computed(() => {
  return sortPosts(posts, frontmatter)
})
</script>

