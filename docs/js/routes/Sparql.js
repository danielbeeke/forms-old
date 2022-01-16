import {html} from "../../_snowpack/pkg/ube.js";
import {header} from "../templates/header.js";
import Yasqe from "../../_snowpack/pkg/@triply/yasqe.js";
import Yasr from "../../_snowpack/pkg/@triply/yasr.js";
import "../../_snowpack/pkg/@triply/yasgui/build/yasgui.min.css.proxy.js";
import {state} from "../services/State.js";
export const Sparql = (context) => ({
  async template() {
    let yasqe;
    let yasr;
    return html`
      ${header()}

      <div class='inner'>
        <h2>Sparql</h2>

        <div ref=${(element) => {
      yasqe = new Yasqe(element, {
        autofocus: true
      });
      yasqe.refresh();
      yasqe.on("query", async (instance, request) => {
        const response = await state.queryEngine.query(request._data.query, {sources: [state.store]});
        const {data: result} = await state.queryEngine.resultToString(response, "application/sparql-results+json");
        let output = "";
        result.on("data", (part) => output += part);
        result.on("end", () => yasr.setResponse(output));
      });
    }}></div>

        <div ref=${(element) => {
      yasr = new Yasr(element, {}, null);
    }}

      </div>
    `;
  }
});
