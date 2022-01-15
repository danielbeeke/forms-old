import { html } from 'ube'
import { tabs } from './tabs'

export const header = () => {
  return html`
    <header class="app-header">
      ${tabs()}
    </header>
  `
}