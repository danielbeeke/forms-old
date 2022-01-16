import "../_snowpack/pkg/rdf-form.js";
import {Router} from "./core/Router.js";
import {render} from "../_snowpack/pkg/ube.js";
import {goTo} from "./helpers/goTo.js";
import "../css/styles.css.proxy.js";
import {icon} from "./helpers/icon.js";
import {state} from "./services/State.js";
class App {
  constructor() {
    this.init();
  }
  async init() {
    window.addEventListener("render", () => this.render());
    window.addEventListener("popstate", () => this.render());
    state.addTab({
      title: icon("add"),
      link: "/",
      closable: false,
      weight: 1e3
    });
    state.addTab({
      title: icon("insights"),
      link: "/sparql",
      closable: false,
      weight: 99998
    });
    state.addTab({
      title: icon("settings"),
      link: "/settings",
      closable: false,
      weight: 99999
    });
    if (!location.search.includes("source") && "serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js");
    if ("launchQueue" in window)
      window.launchQueue.setConsumer((launchParams) => {
        const promises = launchParams.files.map((fileHandle) => state.addTab({
          fileHandle,
          closable: true
        }));
        Promise.all(promises).then((tabs) => goTo(tabs.at(-1)?.link));
      });
    document.body.addEventListener("click", (event) => {
      const link = event.target.nodeName !== "A" ? event.target.closest("a") : event.target;
      if (link) {
        const href = link.getAttribute("href");
        if (href && (href[0] === "/" || !href.startsWith("http"))) {
          event.preventDefault();
          goTo(href);
        }
      }
    });
    await this.render();
  }
  async render() {
    const route = await Router.resolve({pathname: location.pathname});
    const template = await route.template();
    render(document.body, template);
  }
}
export const app = new App();
