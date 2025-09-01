import type { Theme as ThemeConfig } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

import Breadcrumbs  from '../breadcrumbs.vue'
import PageHeading from '../page-heading.vue'
import PostDate from '../post-date.vue'
import YouTube from '../youtube.vue'
import ShareButton from '../share-button.vue'
import AmazonAssociates from '../amazon-associates.vue'
import tagPosts from '../tag-posts.vue'
export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => [h(Breadcrumbs), h(PageHeading), h(PostDate), h(ShareButton)],
      'doc-after': () => [h(tagPosts), h(AmazonAssociates)],
    })
  },
  enhanceApp({ app }) {
    app.component('YouTube', YouTube)
  },
}

export default Theme
