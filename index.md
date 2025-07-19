---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: やまユー
  text: 焚火・アニメ・ポエム
  tagline: 自分で作ろう、テキストサイト
  image:
    light: /img/photo-yakan-640.webp
    dark: /img/photo-yakan-ame-640.webp
    alt: 枝焚火と薬缶
  actions:
    - theme: alt
      text: このサイトについて
      link: /about.html
    - theme: brand
      text: YouTubeチャンネル
      link: https://www.youtube.com/@yama-u-eda

features:
  - title: 🔥枝と焚火
    details: 枝拾いと焚き火のこと
    link: /takibi/

  - title: 📺️アニメ
    details: アニメのこと
    link: /anime/

  - title: 📖ポエム
    details: いわゆるポエム
    link: /poem/

---
## 新着テキスト

<PostsList :posts="posts" />

<script setup lang="ts">
import { data } from './index.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'
import PostsList from './.vitepress/posts-list.vue'
import { sortPosts } from './utils.mjs'
const { frontmatter } = useData()
const MAX_POSTS = 20
const posts = computed(() => {
  const all = sortPosts(data, frontmatter)
  return all.filter(post => {
    return !post.url.endsWith('/') 
  }).slice(0, MAX_POSTS)
})

</script>
