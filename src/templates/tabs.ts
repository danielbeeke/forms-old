import { html } from 'ube'
import { app } from '../App'

export const tabs = () => {
  return html`
    <nav class="tabs">
      ${app.openFiles.map((file: File, index: number) => html`
        <a class="tab" href=${`/file/${index}`}>${file.name}</a>
      `)}
    </nav>
  `
}