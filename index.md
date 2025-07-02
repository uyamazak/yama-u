---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: やまゆー
  text: 枝と焚火とテキスト
  tagline: 拾った枝で足るを知る
  image:
    light: /img/photo-yakan.webp
    dark: /img/photo-yakan-ame.webp
    alt: 枝焚火と薬缶
  actions:
    - theme: brand
      text: YouTubeチャンネル
      link: https://www.youtube.com/@yama-u-eda

features:
  - title: 🔥枝と焚火
    details: 枝を拾って焚き火のこと
    link: /takibi/

  - title: 📺️アニメ
    details: アニメのこと
    link: /anime/

  - title: 📖ポエム
    details: いわゆるポエム
    link: /poem/

  - title: 🍉季節 
    details: 季節のこと
    link: /kisetsu/

---
### 新着

<PostsList :posts="posts" />

<script setup>
import { data } from './index.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'
import PostsList from './.vitepress/posts-list.vue'

const { frontmatter } = useData()
const posts = computed(() => {
  const filterd = data.filter(post => {
    return post.url.endsWith('.html')
  })
  const sorted = filterd.sort((a, b) => {
    return new Date(b.frontmatter.published) - new Date(a.frontmatter.published)
  })

  const sliced = sorted.slice(0, 12)
  return sliced
})
</script>
