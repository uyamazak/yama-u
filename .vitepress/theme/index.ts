import type { Theme as ThemeConfig } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

import Breadcrumbs  from '../breadcrumbs.vue'
import PageHeading from '../page-heading.vue'
import PostDate from '../post-date.vue'
import YouTube from '../youtube.vue'

export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Add breadcrumb above document
      'doc-top': () => h(Breadcrumbs), 
      'doc-before': () => [h(PageHeading), h(PostDate)],

    })
  },
  enhanceApp({ app }) {
    // 'YouTube' という名前でグローバルコンポーネントとして登録
    app.component('YouTube', YouTube)
  },
}

export default Theme
