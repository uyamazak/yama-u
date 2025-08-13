<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

// VitePressの`useData`ヘルパーを使って、現在のページの情報を取得
const { page } = useData()

// Xの共有URLを生成
// テキストとURLをエンコードして、URLパラメータとして安全に渡せるようにします
const twitterShareUrl = computed(() => {
  const text = encodeURIComponent(page.value.title)
  const url = encodeURIComponent(window?.location?.href ?? '')
  return `https://x.com/intent/post?text=${text}&url=${url}`
})
</script>

<template>

<div class="share-button">
  <ClientOnly>
  <a
    v-if="twitterShareUrl"
    :href="twitterShareUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="share-button-x"
    aria-label="Xで共有"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
    </svg>
    <span>シェア</span>
  </a>
</ClientOnly>
</div>
</template>

<style scoped>
.share-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
  font-size: .8rem;
  min-height: 32px;
}
.share-button-x {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 9999px;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s;
}

.share-button-x:hover {
  background-color: #333;
}

.share-button-x svg {
  width: 18px;
  height: 18px;
}
</style>
