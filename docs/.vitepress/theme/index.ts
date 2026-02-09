import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import '@trendyol/baklava/dist/themes/default.css'

export default {
  extends: Theme,
  enhanceApp({ app }) {
    // App enhancement logic can go here if needed
  }
}
