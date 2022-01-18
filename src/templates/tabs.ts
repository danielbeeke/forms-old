import { html } from 'ube'
import { icon } from '../helpers/icon'
import { Tab } from '../types'
import { state } from '../services/State'
import { goTo } from '../helpers/goTo'

export const tabs = () => {
  return html`
    <nav class="tabs">
      ${state.tabs.sort((a, b) => a.weight - b.weight).map((tab: Tab) => {
        const classes = ['tab', tab.link.substr(1)]

        if (!tab.closable) classes.push('sticky')
        if (tab.jsonLd && !tab.fileHandle) classes.push('unsaved')
        if (tab.link === location.pathname) classes.push('active')

        return html`
          <span class=${classes.join(' ')}>
            <a class="tab-link" href=${tab.link} onclick=${event => {
              event.target.scrollIntoView()
            }}>
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
        `
      })}
    </nav>
  `
}