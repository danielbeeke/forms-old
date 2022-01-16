import { html } from 'ube'
import { icon } from '../helpers/icon'
import { Tab } from '../types'
import { state } from '../services/State'
import { goTo } from '../helpers/goTo'

export const tabs = () => {
  return html`
    <nav class="tabs">
      ${state.tabs.sort((a, b) => a.weight - b.weight).map((tab: Tab) => html`
        <span class=${`tab ${tab.jsonLd && !tab.fileHandle ? 'unsaved' : ''} ${tab.link.substr(1)} ${tab.link === location.pathname ? 'active' : ''}`}>
          <a class="tab-link" href=${tab.link}>
            ${tab.title}
            ${tab.jsonLd && !tab.fileHandle ? html`<span class="unsaved">*</span>` : ''}
          </a>
          ${tab.closable ? html`
            <button class="close-file" onclick=${() => {
              state.removeTab(tab)
              goTo('/')
            }}>${icon('close')}</button>
          `: null}
        </span>
      `)}
    </nav>
  `
}