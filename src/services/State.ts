import { app } from '../App'
import { bindingsToObjects } from '../helpers/bindingsToObjects'

class State {
  constructor () {

  }

  get domains () {
    return localStorage.domains ? localStorage.domains.split(',') : []
  }

  set domains (newValue) {
    localStorage.domains = newValue.join(',')
  }

  async getForms () {
    const formsResponse = await app.queryEngine.query(`
      PREFIX forms: <http://localhost:8080/ttl/ontology.ttl#>
      SELECT ?o WHERE { ?s forms:availableForm ?o }
    `, {
      sources: this.domains
    })

    const formsUrls = await bindingsToObjects(formsResponse)

    const labelsResponse = await app.queryEngine.query(`
      PREFIX form: <http://rdf.danielbeeke.nl/form/form-dev.ttl#>
      SELECT ?label ?form WHERE { 
        ?form a form:Form .
        ?form form:label ?label . 
      }
    `, {
      sources: formsUrls
    })

    return await bindingsToObjects(labelsResponse)
  }
}

export const state = new State()