import {html} from "../../_snowpack/pkg/ube.js";
export const goTo = (path) => {
  if (location.pathname !== path)
    history.pushState({}, "", path);
  window.dispatchEvent(new CustomEvent("render"));
  return html``;
};
