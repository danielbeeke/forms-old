import { bindingsToObjects } from '../helpers/bindingsToObjects'
import { hash } from '../helpers/hash'
import { Tab, ComunicaExport } from '../types'
import { importGlobalScript } from '../helpers/importGlobalScript'
import { Store, Parser } from 'n3'
import { toRDF, expand } from 'jsonld';
import ttl2jsonld from '@frogcat/ttl2jsonld'
import { formOntology, formsAppOntology, schemaUrl, comunicaUrl } from '../core/Constants'

class State {

  private forms: Array<{label: string, form: string, hash: string, binding: string }> = null
  #tabs: Array<Tab> = []
  #store: Store
  public queryEngine: any

  async init () {
    const { newEngine } = await importGlobalScript(comunicaUrl, 'Comunica') as ComunicaExport
    this.queryEngine = newEngine()
    this.#store = new Store()
    const parser = new Parser({ format: "application/n-quads" });
    window.addEventListener('tab-added', async (event: CustomEvent) => {
      if (event.detail.jsonLd) {
        console.log(event.detail.jsonLd)
        const nquads = await toRDF(event.detail.jsonLd, {format: 'application/n-quads'})
        await parser.parse(nquads, (error, quad, prefixes) => {
          if (error) console.log(`PARSE ERROR: ${error}`)
          if (quad) this.#store.addQuad(quad)
        })
      }
    })
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
      const file = await newTab.fileHandle.getFile()
      const text = await file.text()
      
      if (file.name.includes('.ttl')) {
        newTab.jsonLd = await ttl2jsonld.parse(text)
      }
      else {
        try {
          const originalJsonLd = JSON.parse(text)
          newTab.jsonLd = (await expand(originalJsonLd))[0]
        }
        catch (exception) {
          newTab.jsonLd = {}
        }  
      }
    }

    if (!newTab.link) {
      newTab.id = await hash(newTab.jsonLd + Math.random() + (new Date()).getTime())
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