import { html } from 'ube'
import { app } from '../App'
import { icon } from '../helpers/icon'
import { header } from '../templates/header'
import { state } from '../services/State'

export const Settings = (context) => ({
  domain: '',

  name: 'settings',

  domainsForm: function () {
    return html`
      <form onsubmit=${(event) => {
        event.preventDefault()
        if (this.domain && !state.domains.includes(this.domain)) {
          state.domains = [...state.domains, this.domain]
        }
        this.domain = ''
        app.render()
      }}>
        <label>Domain:</label>
        <input type="url" .value=${this.domain} onkeyup=${(event) => this.domain = event.target.value}>
        <button>Save</button>
      </form>
    `
  },

  domainsList: function () {
    return html`
      <ul>
        ${state.domains.map(domain => html`<li>${domain} <button onclick=${() => this.deleteDomain(domain)}>${icon('close')}</button></li>`)}
      </ul>
    `
  },

  deleteDomain: function (domain) {
    state.domains = state.domains.filter(innerDomain => innerDomain !== domain)
    app.render()
  },

  template: function () {
    return html`
      ${header()}
      <h2>Settings</h2>
      ${this.domainsForm()}
      ${this.domainsList()}
    `
  }
})