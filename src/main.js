import "./styles/main.css";
import { initApp } from "./app.js";
import { mountPhotographyFromConfig } from "./photography/render-from-config.js";
import { mountEngineeringFromConfig } from "./engineering/render-from-config.js";

import homeTop from "./shared/home-top.html?raw";
import homeClose from "./shared/home-close.html?raw";
import engHomePanel from "./engineering/home-panel.html?raw";
import phoHomePanel from "./photography/home-panel.html?raw";
import phoSeriesDetail from "./photography/page-series-detail.html?raw";
import phoGrad from "./photography/page-grad.html?raw";
import phoContactGrad from "./photography/page-contact-grad.html?raw";
import phoContactGeneral from "./photography/page-contact-general.html?raw";
import engPageSw from "./engineering/page-sw.html?raw";
import engPageHw from "./engineering/page-hw.html?raw";
import engPageRe from "./engineering/page-re.html?raw";
import engPageResume from "./engineering/page-resume.html?raw";

document.getElementById("app").innerHTML = [
  homeTop,
  engHomePanel,
  phoHomePanel,
  homeClose,
  phoSeriesDetail,
  phoGrad,
  phoContactGrad,
  phoContactGeneral,
  engPageSw,
  engPageHw,
  engPageRe,
  engPageResume,
].join("");

mountEngineeringFromConfig();
mountPhotographyFromConfig();
initApp();
