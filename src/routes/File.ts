import { html } from 'ube'
import { app } from '../App'
import { goTo } from '../helpers/goTo'
import { tabs } from '../templates/tabs'

export const File = (context) => ({
  name: 'file',
  template () {
    const fileIndex = parseInt(context.params.file)
    const file = app.openFiles[fileIndex]

    if (!file) goTo('/not-found')
    
    return html`
      ${tabs()}
      <h1>${file.name}</h1>
    `
  }
})