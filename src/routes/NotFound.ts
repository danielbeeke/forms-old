import { html } from 'ube'

export const NotFound = (context) => ({
  name: 'not-found',
  template () {
    return html`<h1>Oops</h1>`
  }
})