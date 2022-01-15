import { html } from 'ube'

export const NotFound = () => ({
  name: 'not-found',
  template () {
    return html`<h1>Oops</h1>`
  }
})