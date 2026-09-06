import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent } from 'vue'
import AppStoreBadge from './components/AppStoreBadge.vue'
import MrsGuidance from './components/MrsGuidance.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AppStoreBadge', AppStoreBadge)
    app.component('MrsGuidance', MrsGuidance)
    app.component(
      'ConfigFieldMatrix',
      defineAsyncComponent(() => import('./components/ConfigFieldMatrix.vue'))
    )
  }
}
