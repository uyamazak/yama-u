---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: ヤマゆー
  text: 令和最新版テキストサイト
  tagline: 拾った枝で足るを知る
  image:
    light: /img/photo-yakan.webp
    dark: /img/photo-yakan-ame.webp
    alt: 枝焚火と薬缶
  actions:
    - theme: alt
      text:  このサイトについて
      link: /about.html
    - theme: brand
      text: YouTubeチャンネル
      link: https://www.youtube.com/@yama-u-eda

features:
  - title: 🔥枝と焚火
    details: 枝拾って焚き火のこと
    link: /takibi/

  - title: 📺️アニメ
    details: アニメのこと
    link: /anime/

  - title: 📖ポエム
    details: いわゆるポエム
    link: /poem/

---
### 新着

<PostsList :posts="posts" />

<script setup>
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
