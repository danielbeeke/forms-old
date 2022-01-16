import UniversalRouter from "../../_snowpack/pkg/universal-router.js";
import {Home} from "../routes/Home.js";
import {File} from "../routes/File.js";
import {Settings} from "../routes/Settings.js";
import {Sparql} from "../routes/Sparql.js";
const routes = [
  {path: "/", action: Home},
  {path: "/file/:file", action: File},
  {path: "/settings", action: Settings},
  {path: "/sparql", action: Sparql},
  {path: "(.*)", action: Home}
];
export const Router = new UniversalRouter(routes);
