import { html } from 'ube'
import { header } from '../templates/header'
import { state } from '../services/State'
import { goTo } from '../helpers/goTo'
import { app } from '../App'

/**
 * Given a file loaded via the operating system,
 * loads it into rdf-form.
 * 
 * @param context 
 * @returns 
 */
export const File = (context) => ({
  name: 'file',

  tab: null,

  save: async function (event: CustomEvent) {
    this.tab = state.tabs.find(tab => tab.id === context.params.file)
    if (!this.tab) return goTo('/')

    if (!this.tab.fileHandle) {
      this.tab.fileHandle = await window.showSaveFilePicker({
        types: [{
          description: 'Form file',
          accept: {'application/form': ['.form']},
        }]
      })

      this.tab.title = this.tab.fileHandle.name
    }

    const writableStream = await this.tab.fileHandle.createWritable()
    const json = JSON.stringify(event.detail.expanded)
    const blob = new Blob([json], { type: 'application/form' })
    await writableStream.write(blob)
    await writableStream.close()
    app.render()
  },

  template: async function () {
    const forms = await state.getForms()
    this.tab = state.tabs.find(tab => tab.id === context.params.file)
    if (!this.tab) return goTo('/')

    const types = this.tab?.jsonLd?.['@type'] ?? []

    let formMatch
    for (const type of types) {
      formMatch = forms.find(form => form.binding === type)
    }

    if (!formMatch) return goTo('/')
    
    return html.for(this.tab)`
      ${header()}
      <rdf-form class="form" 
      onsubmit=${this.save.bind(this)} 
      form=${formMatch.form} 
      data=${JSON.stringify(this.tab.jsonLd)} />
    `
  }
})