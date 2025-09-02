---
title: ポエム
published: 2025-07-02
lastUpdated: 2025-07-02
description: 何かを思いついたときに書くどうでもいいポエム、このサイトのWEB技術的なことも書いてます。
---
::: info
何かを思いついたときに書くどうでもいいポエム、このサイトのWEB技術的なことも書いてます。
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

