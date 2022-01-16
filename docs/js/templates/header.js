import {html} from "../../_snowpack/pkg/ube.js";
import {tabs} from "./tabs.js";
export const header = () => {
  return html`
    <header class="app-header">
      ${tabs()}
    </header>
  `;
};
