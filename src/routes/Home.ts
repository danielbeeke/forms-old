import { html } from 'ube'
import { header } from '../templates/header'
import { state } from '../services/State'
import { goTo } from '../helpers/goTo'

/**
 * Shows a list of forms to create.
 * 
 * @param context 
 * @returns 
 */
export const Home = (context) => ({
  async template () {
    const forms = await state.getForms()

    return html`
      ${header()}

      <div class="inner">
        <h2>Load existing file(s)</h2>
        <button onclick=${async () => {
          const fileHandles = await window.showOpenFilePicker({
            multiple: true,
            types: [{
              description: 'Form file',
              accept: {'application/form': ['.form']},
            }]
          })

          let iniatedTab
          for (const fileHandle of fileHandles) {
            iniatedTab = await state.addTab({
              fileHandle,
              closable: true,
            })  
          }

          if (iniatedTab) goTo(iniatedTab.link)

        }}>Select</button>

        <h2>Create a new file</h2>
        ${forms.map((form) => html`
          <button onclick=${async () => {
            const iniatedTab = await state.addTab({
              title: `New ${form.label}`,
              jsonLd: {'@type': [form.binding]},
              closable: true,
            })

            goTo(iniatedTab.link)
          }} class="create-item">
            ${form.label}
          </button>
        `)}
      </div>
    `
  }
})