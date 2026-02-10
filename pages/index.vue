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
      <ul v-if="articles && articles.length > 0">
        <li v-for="article in articles" :key="article._path">
          <NuxtLink :to="article._path">{{ article.title || article._path }}</NuxtLink>
          <span v-if="article.published"> - {{ article.published }}</span>
        </li>
      </ul>
      <p v-else>記事が見つかりませんでした。</p>
    </main>
  </div>
</template>

<script setup>
const { data: articles } = await useAsyncData('articles', () => 
  queryContent('/')
    .sort({ published: -1 })
    .limit(20)
    .find()
)
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
