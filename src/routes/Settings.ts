import { html } from 'ube'
import { header } from '../templates/header'
import { state } from '../services/State'

/**
 * We are using rdf-form also to save our own settings.
 * @returns 
 */
export const Settings = () => ({
  name: 'settings',
  async save (event: CustomEvent) {
    state.settings = event.detail.expanded
  },
  template: function () {
    return html`
      ${header()}
      <rdf-form class="form" 
      data=${JSON.stringify(state.settings)} 
      onsubmit=${this.save.bind(this)} 
      form="http://localhost:8080/ttl/settings.form.ttl" />
    `
  }
})