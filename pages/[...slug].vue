<template>
  <div class="content-page">
    <article v-if="doc">
      <header>
        <h1>{{ doc.title }}</h1>
        <div class="meta" v-if="doc.published || doc.lastUpdated">
          <span v-if="doc.published">Published: {{ doc.published }}</span>
          <span v-if="doc.lastUpdated">Last Updated: {{ doc.lastUpdated }}</span>
        </div>
      </header>
      
      <ContentRenderer :value="doc" />
      
      <footer>
        <NuxtLink to="/">← Back to Home</NuxtLink>
      </footer>
    </article>
    <div>
      <p>Nuxt Studio環境が正常に動作しています。</p>
      <p>記事ページは、Nuxt Content v3のAPIドキュメントに従って実装できます。</p>
      <NuxtLink to="/">← ホームに戻る</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const doc = ref(null)

// Content display will be implemented with proper Nuxt Content v3 API
// For now, show a placeholder message
</script>

<style scoped>
.content-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

article {
  line-height: 1.8;
}

header h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
}

footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

footer a {
  color: #42b983;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>
