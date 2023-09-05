import { bindingsToObjects } from '../helpers/bindingsToObjects'
import { hash } from '../helpers/hash'
import { Tab, ComunicaExport } from '../types'
import { importGlobalScript } from '../helpers/importGlobalScript'
import { Store, Parser } from 'n3'
import { formOntology, formsAppOntology, schemaUrl, comunicaUrl, rdf, sh } from '../core/Constants'

class State {

  private forms: Array<{label: string, form: string, hash: string, binding: string }> = null
  #tabs: Array<Tab> = []
  #store: Store
  public queryEngine: any

  async init () {
    const { newEngine } = await importGlobalScript(comunicaUrl, 'Comunica') as ComunicaExport
    this.queryEngine = newEngine()
    this.#store = new Store()
  }

  get domains () {
    return this.settings?.[schemaUrl]?.map(item => item['@value']) ?? []
  }

  get settings () {
    return localStorage.settings ? localStorage.settings : ''
  }

  set settings (newValue) {
    localStorage.settings = newValue
  }

  get store () {
    return this.#store
  }

  async getForms () {
    if (this.forms !== null) return this.forms

    if (!this.domains.length) return []

    const formsResponse = await this.queryEngine.query(`
      PREFIX forms: <${formsAppOntology}>
      SELECT ?o WHERE { ?s forms:availableForm ?o }
    `, {
      sources: this.domains
    })

    const formsUrls = await bindingsToObjects(formsResponse)

    const labelsResponse = await this.queryEngine.query(`
      PREFIX form: <${formOntology}>
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

      const file = newTab.fileHandle
      const text = await file.text()
      newTab.text = text

      if (file.name.includes('.ttl')) {
        const parser = new Parser()
        const quads = await parser.parse(text)
        newTab.store = new Store(quads)

        const hasShaclShapes = await newTab.store.match(null, rdf('type'), sh('NodeShape')).toArray()

        if (hasShaclShapes?.length) {
          console.log(newTab)

          return
        }
      }
      else {
        throw new Error('Unknown file type')
      }
    }

    if (!newTab.link) {
      newTab.id = await hash(newTab.title + Math.random() + (new Date()).getTime())
      newTab.link = `/file/${newTab.id}`
    }

    this.#tabs.push(newTab)

    window.dispatchEvent(new CustomEvent('tab-added', {
      detail: newTab
    }))

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