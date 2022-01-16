import {html} from "../../_snowpack/pkg/ube.js";
import {header} from "../templates/header.js";
import {state} from "../services/State.js";
export const Settings = () => ({
  async save(event) {
    state.settings = event.detail.expanded;
  },
  template: function() {
    return html`
      ${header()}
      <div class="inner">
        <h2>Settings</h2>
        <rdf-form class="form" 
        data=${JSON.stringify(state.settings)} 
        onsubmit=${this.save.bind(this)} 
        form="/ttl/settings.form.ttl" />
      </div>
    `;
  }
});
