---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: やまゆー
  text: 枝と焚火と作業服
  tagline: VitePressでつくる駄文サイト
  image:
    light: /img/photo-yakan.jpg
    dark: /img/photo-ame.jpg
    alt: 枝焚き火と薬缶
  actions:
    - theme: brand
      text: 枝仲間募集
      link: /takibi/eda-nakama-bosyu.html
    - theme: alt
      text: YouTube
      link: https://www.youtube.com/@uyamazak

features:
  - title: 🔥焚火の書きもの
    details: 薪自作焚火キャンプ
    link: /takibi/
  

---
### 新着

<ul>
  <li v-for="post of posts">
    <a :href="post.url">
      {{ post.frontmatter.title }}
      {{ formatDate(post.frontmatter.lastUpdated) }}
    </a>
  </li>
</ul>

<script setup>
import { data } from './takibi.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { formatDate } from './utils.mjs'

const { frontmatter } = useData()
const posts = computed(() => {
  const filterd = data.filter(post => {
    return post.url.endsWith('.html')
  })
  const sorted = filterd.sort((a, b) => {
    return new Date(b.frontmatter.published) - new Date(a.frontmatter.published)
  })

  const sliced = sorted.slice(0, 5)
  return sliced
})
</script>
