import { html } from 'ube'
import { app } from '../App'
import { header } from '../templates/header'
import { state } from '../services/State'
import { goTo } from '../helpers/goTo'

export const File = (context) => ({
  name: 'file',

  async save (event: CustomEvent) {
    const fileIndex = parseInt(context.params.file)
    const fileHandle = app.openFiles[fileIndex]
    const writableStream = await fileHandle.createWritable()
    const blob = new Blob([JSON.stringify(event.detail.expanded)], { type: 'application/form' })
    await writableStream.write(blob)
    await writableStream.close()
  },

  async template () {
    const forms = await state.getForms()
    const fileIndex = parseInt(context.params.file)
    const fileHandle = app.openFiles[fileIndex]

    if (!fileHandle) goTo('/')

    const file = await fileHandle.getFile()
    const text = await file.text()
    const jsonLd = JSON.parse(text)
    const types = jsonLd['@type']

    let formMatch
    for (const type of types) {
      formMatch = forms.find(form => form.binding === type)
    }

    if (!file || !formMatch) goTo('/not-found')
    
    return html.for(fileHandle)`
      ${header(context.params)}
      <rdf-form class="form" onsubmit=${this.save.bind(this)} form=${formMatch.form} data=${text} />
    `
  }
})