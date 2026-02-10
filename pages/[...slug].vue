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
    <div v-else>
      <p>記事が見つかりませんでした。</p>
      <NuxtLink to="/">← ホームに戻る</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const doc = ref(null)

try {
  const results = await queryCollection('content')
    .where('_path', '=', route.path)
    .limit(1)
  if (results && results.length > 0) {
    doc.value = results[0]
  }
} catch (error) {
  console.error('Failed to load content:', error)
}
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
