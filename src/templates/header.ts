import { html } from 'ube'
import { tabs } from './tabs'

export const header = (params = {}, newTabTitle = '') => {
  return html`
    <header class="app-header">
      ${tabs(params, newTabTitle)}
    </header>
  `
}