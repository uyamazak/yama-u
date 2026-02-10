// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/content',
    '@nuxthq/studio'
  ],

  content: {
    // Watch for changes
    watch: {
      ws: {
        port: 4000,
        showURL: false
      }
    },
    // Enable highlighting
    highlight: {
      theme: 'github-dark'
    },
    // Enable markdown features
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // Configure Nuxt Studio
  studio: {
    enabled: true
  }
})
