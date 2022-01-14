import { app } from '../App'
import { bindingsToObjects } from '../helpers/bindingsToObjects'
import { hash } from '../helpers/hash'

class State {

  private forms: Array<{label: string, form: string, hash: string, binding: string }> = null

  constructor () {

  }

  get domains () {
    return this.settings['http://schema.org/url'].map(item => item['@value'])
  }

  get settings () {
    return localStorage.settings ? JSON.parse(localStorage.settings) : {}
  }

  set settings (newValue) {
    localStorage.settings = JSON.stringify(newValue)
  }

  async getForms () {
    if (this.forms !== null) return this.forms

    const formsResponse = await app.queryEngine.query(`
      PREFIX forms: <http://localhost:8080/ttl/ontology.ttl#>
      SELECT ?o WHERE { ?s forms:availableForm ?o }
    `, {
      sources: this.domains
    })

    const formsUrls = await bindingsToObjects(formsResponse)

    const labelsResponse = await app.queryEngine.query(`
      PREFIX form: <http://rdf.danielbeeke.nl/form/form-dev.ttl#>
      SELECT ?label ?form ?binding WHERE { 
        ?form a form:Form .
        ?form form:label ?label . 
        ?form form:binding ?binding .
      }
    `, {
      sources: formsUrls
    })

    this.forms = await bindingsToObjects(labelsResponse)

    for (const item of this.forms) {
      item.hash = await hash(item.form)
    }

    return this.forms
  }
}

export const state = new State()