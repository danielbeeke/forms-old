import {html} from "../../_snowpack/pkg/ube.js";
import {header} from "../templates/header.js";
import {state} from "../services/State.js";
import {goTo} from "../helpers/goTo.js";
let webManifest = null;
export const Home = (context) => ({
  async template() {
    const forms = await state.getForms();
    if (!webManifest) {
      const reponse = await fetch("/manifest.json");
      webManifest = await reponse.json();
    }
    return html`
      ${header()}

      <div class="inner">
        <h2>Load existing file(s)</h2>
        <button onclick=${async () => {
      const fileHandles = await window.showOpenFilePicker({
        multiple: true,
        types: [{
          description: webManifest.file_handlers[0].name,
          accept: webManifest.file_handlers[0].accept
        }]
      });
      let iniatedTab;
      for (const fileHandle of fileHandles) {
        iniatedTab = await state.addTab({
          fileHandle,
          closable: true
        });
      }
      if (iniatedTab)
        goTo(iniatedTab.link);
    }}>Select</button>

        <h2>Create a new file</h2>
        ${forms.map((form) => html`
          <button onclick=${async () => {
      const iniatedTab = await state.addTab({
        title: `New ${form.label}`,
        jsonLd: {"@type": [form.binding]},
        closable: true
      });
      goTo(iniatedTab.link);
    }} class="create-item">
            ${form.label}
          </button>
        `)}
      </div>
    `;
  }
});
