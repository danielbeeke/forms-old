import 'rdf-form'
import { Router } from './core/Router'
import UniversalRouter from 'universal-router'
import { render } from 'ube'
import { goTo } from './helpers/goTo'
import { importGlobalScript } from './helpers/importGlobalScript'
import '/css/styles.css'

class App {

  private router: UniversalRouter
  public openFiles: Array<File> = []
  public path: string = '/'
  public queryEngine: any

  constructor () {
    this.init()
  }

  async init () {
    this.router = Router
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
    if ('launchQueue' in window) window.launchQueue.setConsumer(launchParams => this.openFiles = launchParams.files)

    const { newEngine } = await importGlobalScript('https://rdf.js.org/comunica-browser/versions/latest/packages/actor-init-sparql/comunica-browser.js', 'Comunica') as ComunicaExport
    this.queryEngine = newEngine()

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
    try {
      const route = await Router.resolve({ pathname: this.path })
      render(document.body, await route.template())
    }
    catch (exception) {
      console.error(exception)
    }
  }
}

export const app = new App()
