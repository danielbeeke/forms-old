import { render } from 'ube'
import { goTo } from './helpers/goTo'
import '/scss/styles.scss'
import { icon } from './helpers/icon'
import { state } from './services/State'
import { init, defaultOptions } from '@om-mediaworks/shacl-form'
import '@om-mediaworks/shacl-form/dist/style.css'

init(defaultOptions)

class App {

  constructor () {
    this.init()
  }

  async init () {
    window.addEventListener('render', () => this.render())
    window.addEventListener('popstate', () => this.render())

    state.addTab({
      title: icon('add'),
      link: '/',
      closable: false,
      weight: 1000
    })
    state.addTab({
      title: icon('insights'),
      link: '/sparql',
      closable: false,
      weight: 99998,
    })

    state.addTab({
      title: icon('settings'),
      link: '/settings',
      closable: false,
      weight: 99999,
    })

    if (!location.search.includes('source') && 'serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
    if ('launchQueue' in window) window.launchQueue.setConsumer(launchParams => {
      const promises = launchParams.files.map(fileHandle => state.addTab({
        fileHandle,
        closable: true
      }))

      Promise.all(promises).then(tabs => goTo(tabs.at(-1)?.link))
    })

    document.body.addEventListener('click', (event: Event & { target: HTMLElement }) => {
      const link = event.target.nodeName !== 'A' ? event.target.closest('a') : event.target
      if (link) {
          const href = link.getAttribute('href')
          if (href && (href[0] === '/' || !href.startsWith('http'))) {
              event.preventDefault()
              goTo(href)
          }
        }
    })

    await this.render()
  }

  async render () {
    const Router = (await import('./core/Router')).Router
    const route = await Router.resolve({ pathname: location.pathname })
    const template = await route.template()
    render(document.body, template)
  }
}

export const app = new App()