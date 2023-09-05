import { html } from 'ube'
import { header } from '../templates/header'
import { state } from '../services/State'

/**
 * We are using rdf-form also to save our own settings.
 * @returns 
 */
export const Settings = () => ({
  async save (event: CustomEvent) {
    state.settings = event.detail.turtle
  },
  template: function () {
    const blob = new Blob([state.settings], {
      type: 'text/turtle'
    })

    const iri = URL.createObjectURL(blob)

    return html`
      ${header()}
      <div class="inner">
        <h2>Settings</h2>
        <shacl-form class="form" 
        data-url=${iri} 
        data-iri="http://forms/settings"
        onsave=${this.save.bind(this)} 

        shacl-url="/ttl/settings.shacl.ttl"></shacl-form>
      </div>
    `
  }
})