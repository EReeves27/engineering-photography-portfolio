import "./styles/main.css";
import { initApp } from "./app.js";
import { mountPhotographyFromConfig } from "./photography/render-from-config.js";
import { mountEngineeringFromConfig } from "./engineering/render-from-config.js";
import { initSpotifyVinyl } from "./engineering/spotify-vinyl.js";

import homeTop from "./shared/home-top.html?raw";
import homeClose from "./shared/home-close.html?raw";
import engHomePanel from "./engineering/home-panel.html?raw";
import phoHomePanel from "./photography/home-panel.html?raw";
import phoGrad from "./photography/page-grad.html?raw";
import phoContactGrad from "./photography/page-contact-grad.html?raw";
import phoContactGeneral from "./photography/page-contact-general.html?raw";
import phoBio from "./photography/page-bio.html?raw";
import engPageSw from "./engineering/page-sw.html?raw";
import engPageHw from "./engineering/page-hw.html?raw";
import engPageRe from "./engineering/page-re.html?raw";
import engPageResume from "./engineering/page-resume.html?raw";
import engPageBiography from "./engineering/page-biography.html?raw";

document.getElementById("app").innerHTML = [
  homeTop,
  engHomePanel,
  phoHomePanel,
  homeClose,
  phoGrad,
  phoContactGrad,
  phoContactGeneral,
  phoBio,
  engPageSw,
  engPageHw,
  engPageRe,
  engPageResume,
  engPageBiography,
].join("");

mountEngineeringFromConfig();
mountPhotographyFromConfig();
initSpotifyVinyl();
initApp();
