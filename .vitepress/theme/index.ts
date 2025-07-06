import type { Theme as ThemeConfig } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

import Breadcrumbs  from '../breadcrumbs.vue'
import PageHeading from '../page-heading.vue'
//import sidebarItems from '../sidebar-items.vue'

export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Add breadcrumb above document
      'doc-top': () => h(Breadcrumbs), 
      'doc-before': () => h(PageHeading),
      //'sidebar-nav-after': () => h(sidebarItems)
    })
  }
}

export default Theme
