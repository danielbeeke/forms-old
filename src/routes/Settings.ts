import { html } from 'ube'
import { app } from '../App'
import { icon } from '../helpers/icon'
import { header } from '../templates/header'
import { state } from '../services/State'

export const Settings = (context) => ({
  domain: '',

  name: 'settings',

  async save (event: CustomEvent) {
    state.settings = event.detail.expanded
  },

  template: function () {
    return html`
      ${header()}

      <rdf-form class="form" data=${JSON.stringify(state.settings)} onsubmit=${this.save.bind(this)} form="http://localhost:8080/ttl/settings.form.ttl" />

    `
  }
})