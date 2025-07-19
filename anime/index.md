---
title: アニメ
published: 2025-06-24
lastUpdated: 2025-06-24
description: 主にAmazon Prime VideoやAbema等の配信で見たアニメの感想を考察を書いてます。感想なのでネタバレありです。
---
主にAmazon Prime VideoやAbema等の配信で見たアニメの感想を考察を書いてます。感想なのでネタバレありです。
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

