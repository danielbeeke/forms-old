import { html } from 'ube'
import { header } from '../templates/header'
import Yasqe from '@triply/yasqe';
import Yasr from '@triply/yasr';
import '@triply/yasgui/build/yasgui.min.css'
import { state } from '../services/State';

/**
 * Allows the end user to do queries.
 * 
 * @param context 
 * @returns 
 */
export const Sparql = (context) => ({
  async template () {
    let yasqe
    let yasr

    return html`
      ${header()}

      <div class='inner'>
        <h2>Sparql</h2>

        <div ref=${element => {
          yasqe = new Yasqe(element, {
            autofocus: true,
          } as any)

          yasqe.refresh()

          yasqe.on('query', async (instance, request) => {
            const response = await state.queryEngine.query(request._data.query, { sources: [state.store] })
            const { data: result } = await state.queryEngine.resultToString(response, 'application/sparql-results+json');
            let output = ''
            result.on('data', (part) => output += part)
            result.on('end', () => yasr.setResponse(output))
          })

        }}></div>

        <div ref=${element => {
          yasr = new Yasr(element, {}, null)
        }}

      </div>
    `
  }
})