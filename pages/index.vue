<template>
  <div class="container">
    <header>
      <h1>やまユー - Nuxt Studio Editor</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/poem">Poem</NuxtLink>
        <NuxtLink to="/anime">Anime</NuxtLink>
        <NuxtLink to="/takibi">Takibi</NuxtLink>
      </nav>
    </header>
    
    <main>
      <h2>Welcome to Nuxt Studio</h2>
      <p>このサイトではNuxt Studioを使用して、ブラウザ上でMarkdownファイルを編集できます。</p>
      
      <h3>カテゴリ</h3>
      <ul>
        <li><NuxtLink to="/poem">📖 ポエム</NuxtLink></li>
        <li><NuxtLink to="/anime">📺️ アニメ</NuxtLink></li>
        <li><NuxtLink to="/takibi">🔥 焚き火</NuxtLink></li>
      </ul>

      <h3>最近の記事</h3>
      <p>Nuxt Studioを使用して、ブラウザ上でMarkdownファイルを編集できます。</p>
      <p>記事一覧の表示機能は、Nuxt Content v3のAPIドキュメントに従って実装できます。</p>
    </main>
  </div>
</template>

<script setup>
// Simple approach - just show a welcome message for now
// Content display can be implemented separately with proper Nuxt Content v3 API
const articles = ref([])
const error = ref(null)
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
}

header h1 {
  color: #2c3e50;
}

nav {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

nav a {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

nav a:hover {
  background: #339966;
}

main {
  line-height: 1.6;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 0.5rem 0;
}

main a {
  color: #42b983;
  text-decoration: none;
}

main a:hover {
  text-decoration: underline;
}
</style>
