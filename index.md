---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: やまゆー
  text: 枝と焚火とキャンプ
  tagline: 枝拾いblog
  image:
    light: /img/photo-yakan.webp
    dark: /img/photo-yakan-ame.webp
    alt: 枝焚火と薬缶
  actions:
    - theme: brand
      text: YouTubeチャンネル
      link: https://www.youtube.com/@yama-u-eda

    - theme : alt
      text: 枝焚火オフメンバー募集
      link: /takibi/eda-nakama-bosyu.html
features:
  - title: 🔥焚火の書きもの
    details: 枝でつくった薪から始まった焚き火に関することを書いています。
    link: /takibi/
  

---
### 新着

<ul>
  <li v-for="post of posts">
    <a :href="post.url">
      {{ post.frontmatter.title }}
      <span class="post-date">{{ formatDate(post.frontmatter.published) }}</span>
    </a>
  </li>
</ul>

<script setup>
import { data } from './takibi/index.data.mjs'
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

<style>
.post-date {
  color: var(--vp-c-text-muted);
  font-size: 0.8em;
}
</style>
