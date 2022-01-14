import { html } from 'ube'
import { header } from '../templates/header'
import { state } from '../services/State'

export const Home = (context) => ({
  name: 'home',
  async template () {
    const forms = await state.getForms()

    return html`
      ${header()}

      <div class="create-list">
        ${forms.map(({ hash, label }: { hash: string, label: string }) => html`
          <a class="create-item" href=${`/new/${hash}`}>${label}</a>
        `)}
      </div>
    `
  }
})