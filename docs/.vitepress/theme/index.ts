import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent } from 'vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component(
      'ConfigFieldMatrix',
      defineAsyncComponent(() => import('./components/ConfigFieldMatrix.vue'))
    )
  }
}
