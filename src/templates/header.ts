import { html } from 'ube'
import { icon } from '../helpers/icon'

export const header = () => {
  return html`
    <header class="app-header">
      <a href="/"><h1>Forms</h1></a>
      <a href="/settings">${icon('settings')}</a>
    </header>
  `
}