import { html } from 'ube'
import { app } from '../App'
import { icon } from '../helpers/icon'

export const tabs = (params: {[key: string]: string} = {}, newTabTitle: string = '') => {
  const activeFile = params.file

  return html`
    <nav class="tabs">
      ${app.openFiles.map((file: FileSystemFileHandle, index: number) => html`
        <span class=${`tab ${activeFile === index.toString() ? 'active' : ''}`}>
          <a class="tab-link" href=${`/file/${index}`}>${file.name.replace('.form', '')}</a>
          <button class="close-file">${icon('close')}</button>
        </span>
      `)}

      ${location.pathname.startsWith('/new') ? html`
      <span class="tab active">
        <span class="tab-link">${newTabTitle}</a>
      </span>
      ` : null}

      <span class=${`tab ${location.pathname === '/' ? 'active' : ''}`}>
        <a href="/" class="goto-home">${icon('add')}</a>
      </span>

      <span class=${`tab end ${location.pathname === '/settings' ? 'active' : ''}`}>
        <a class="goto-settings" href="/settings">${icon('settings')}</a>
      </span>
      
    </nav>
  `
}