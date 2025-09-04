---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: やまユー
  text: 焚火とアニメとポエムの<br>ホームページ
  tagline: やりたいことないから、アニメみて焚き火してなんか書く
  image:
    light: /img/photo-yakan-640.webp
    dark: /img/photo-yakan-ame-640.webp
    alt: 枝焚火と薬缶
  actions:
    - theme: alt
      text: このサイトについて
      link: /about.html
---

## 新着記事

<PostsList :posts="posts" />

<script setup lang="ts">
import { data } from './index.data'
import { useData } from 'vitepress'
import { computed } from 'vue'
import PostsList from '../.vitepress/posts-list.vue'
import { sortPosts } from '../utils'
const { frontmatter } = useData()
const MAX_POSTS = 20
const posts = computed(() => {
  const all = sortPosts(data, frontmatter)
  return all.filter(post => {
    if (post.url.includes('/parts/')) {
      return false
    }
    return !post.url.endsWith('/') 
  }).slice(0, MAX_POSTS)
})
</script>
