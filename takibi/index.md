---
title: 焚き火

---

# {{ $frontmatter.title }}

<ul>
  <li v-for="post of childs">
    <a :href="post.url">
      {{ post.frontmatter.title }}
      {{ formatDate(post.frontmatter.lastUpdated) }}
    </a>
  </li>
</ul>

<script setup>
import { data as posts} from '../takibi.data.mjs'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { formatDate } from '../utils.mjs'

const { frontmatter } = useData()
const childs = computed(() => {
  const filterd = posts.filter(post => {
    return post.frontmatter.title !== frontmatter.value.title
  })
    return filterd.sort((a, b) => {
        return new Date(b.frontmatter.lastUpdated) - new Date(a.frontmatter.lastUpdated)
    })
})
</script>
