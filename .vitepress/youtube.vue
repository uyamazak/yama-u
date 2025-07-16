<template>
  <div class="youtube-embed" :class="aspectClass">
    <iframe
      :src="`https://www.youtube.com/embed/${id}`"
      :title="title || `YouTube video ${id}`"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{id: string; title?: string, aspect?: '16:9'|'9:16'}>()
const { id, aspect = '16:9', title } = props
// アスペクト比に応じたCSSクラスを動的に生成
const aspectClass = computed(() => `aspect-${aspect.replace(':', '-')}`)
</script>

<style scoped>


.youtube-embed iframe {
  width: 100%;
  height: 100%;
}

/* 横長動画 (16:9) */
.youtube-embed.aspect-16-9 {
  aspect-ratio: 16 / 9;
}

/* 縦長動画 (9:16) */
.youtube-embed.aspect-9-16 {
  aspect-ratio: 9 / 16;
  max-width: 320px;
}
</style>
