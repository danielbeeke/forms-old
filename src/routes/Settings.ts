import { html } from 'ube'
import { header } from '../templates/header'
import { state } from '../services/State'

/**
 * We are using rdf-form also to save our own settings.
 * @returns 
 */
export const Settings = () => ({
  async save (event: CustomEvent) {
    state.settings = event.detail.expanded
  },
  template: function () {
    return html`
      ${header()}
      <div class="inner">
        <h2>Settings</h2>
        <rdf-form class="form" 
        data=${JSON.stringify(state.settings)} 
        onsubmit=${this.save.bind(this)} 
        form="/ttl/settings.form.ttl" />
      </div>
    `
  }
})