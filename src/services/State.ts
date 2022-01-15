import { app } from '../App'
import { bindingsToObjects } from '../helpers/bindingsToObjects'
import { hash } from '../helpers/hash'
import { Tab } from '../types'
import { importGlobalScript } from '../helpers/importGlobalScript'

class State {

  private forms: Array<{label: string, form: string, hash: string, binding: string }> = null
  #tabs: Array<Tab> = []
  public queryEngine: any

  async init () {
    const { newEngine } = await importGlobalScript('https://rdf.js.org/comunica-browser/versions/latest/packages/actor-init-sparql/comunica-browser.js', 'Comunica') as ComunicaExport
    this.queryEngine = newEngine()
  }

  get domains () {
    return this.settings?.['http://schema.org/url']?.map(item => item['@value']) ?? []
  }

  get settings () {
    return localStorage.settings ? JSON.parse(localStorage.settings) : {}
  }

  set settings (newValue) {
    localStorage.settings = JSON.stringify(newValue)
  }

  async getForms () {
    if (this.forms !== null) return this.forms

    const formsResponse = await this.queryEngine.query(`
      PREFIX forms: <http://localhost:8080/ttl/ontology.ttl#>
      SELECT ?o WHERE { ?s forms:availableForm ?o }
    `, {
      sources: this.domains
    })

    const formsUrls = await bindingsToObjects(formsResponse)

    const labelsResponse = await this.queryEngine.query(`
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

  async addTab (options: {}) {
    const newTab: Tab = Object.assign({
      title: '',
      link: '',
      closable: false,
      weight: 0
    }, options)

    if (newTab.fileHandle) {
      newTab.title = newTab.fileHandle.name
      const file = await newTab.fileHandle.getFile()
      const text = await file.text()

      try {
        newTab.jsonLd = JSON.parse(text)
      }
      catch (exception) {
        newTab.jsonLd = {}
      }
    }

    if (!newTab.link) {
      newTab.id = await hash((new Date()).getTime())
      newTab.link = `/file/${newTab.id}`
    }

    this.#tabs.push(newTab)

    return newTab
  }

  get tabs () {
    return this.#tabs
  }

  removeTab (tab: Tab) {
    this.#tabs = this.#tabs.filter(innerTab => innerTab !== tab)
  }
}

export const state = new State()
await state.init()