import { html } from 'ube'
import { header } from '../templates/header'
import { state } from '../services/State'

export const NewFile = (context) => ({
  name: 'new-file',

  async save (event: CustomEvent) {
    const handle = await window.showSaveFilePicker({
      types: [{
        description: 'Form file',
        accept: {'application/form': ['.form']},
      }]
    })
    const writableStream = await handle.createWritable()
    const blob = new Blob([JSON.stringify(event.detail.expanded)], { type: 'application/form' })
    await writableStream.write(blob)
    await writableStream.close()
  },

  async template () {
    const form = (await state.getForms()).find(form => form.hash === context.params.formHash)
    const title = `New ${form.label}`

    return html`
      ${header({}, title)}

      <h1 class="page-title">${title}</h1>

      <rdf-form class="form" onsubmit=${this.save.bind(this)} form=${form.form} />
    `
  }
})