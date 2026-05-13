var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=e((()=>{})),r,i,a,o=e((()=>{r=[],i=[{id:`urban-solitude`,title:`Urban Solitude`,titleItalic:`Solitude`,tag:`Street · Documentary`,meta:`Los Angeles · 2023`,desc:`A study of stillness within chaos — early morning streets, long shadows, and the quiet architecture of a city before it wakes. Shot over six weeks on Kodak Portra 400.`,tags:[`35mm`,`Portra 400`,`Street`,`Golden hour`],camera:`Nikon FM2`,film:`Portra 400`,duration:`6 weeks`,shots:`24 images`,folder:`/photos/urban-solitude/`,images:[]},{id:`pacific-coast`,title:`Pacific Coast Dusk`,titleItalic:`Dusk`,tag:`Landscape · Natural`,meta:`California · 2024`,desc:`Golden hour along the Pacific coastline. Long exposures, wide skies, and the last light of the day.`,tags:[`Digital`,`Golden hour`,`Landscape`],camera:`Sony A7III`,film:`Digital`,duration:`3 months`,shots:`18 images`,folder:`/photos/pacific-coast/`,images:[]},{id:`quiet-faces`,title:`Quiet Faces`,titleItalic:`Faces`,tag:`Portrait · Fine-art`,meta:`Studio · 2024`,desc:`Candid and directed portraits — stillness, expression, and available light.`,tags:[`Studio`,`Portrait`,`Film`],camera:`Nikon FM2`,film:`Ilford HP5`,duration:`Ongoing`,shots:`30 images`,folder:`/photos/quiet-faces/`,images:[]},{id:`grid-lines`,title:`Grid Lines`,titleItalic:`Lines`,tag:`Architecture · Urban`,meta:`Downtown LA · 2023`,desc:`The geometry of the built environment — repeating patterns, shadows on concrete, the city as abstract form.`,tags:[`Architecture`,`Urban`,`35mm`],camera:`Nikon FM2`,film:`Kodak T-Max`,duration:`4 weeks`,shots:`20 images`,folder:`/photos/grid-lines/`,images:[]},{id:`desert-intervals`,title:`Desert Intervals`,titleItalic:`Intervals`,tag:`Landscape · Golden hour`,meta:`Joshua Tree · 2023`,desc:`Vast space, long light, and the silence of the high desert at dusk.`,tags:[`Desert`,`Landscape`,`Golden hour`,`35mm`],camera:`Nikon FM2`,film:`Portra 400`,duration:`2 weekends`,shots:`22 images`,folder:`/photos/desert-intervals/`,images:[]},{id:`film-experiments`,title:`Film Experiments`,titleItalic:`Experiments`,tag:`Abstract · Experimental`,meta:`35mm analogue · 2024`,desc:`Cross-processing, expired film, light leaks and happy accidents.`,tags:[`Experimental`,`35mm`,`Analogue`],camera:`Various`,film:`Mixed`,duration:`Ongoing`,shots:`40 images`,folder:`/photos/film-experiments/`,images:[]}],a={folder:`/photos/grad/`,images:[]}}));function s(e,t,n,r){if(e){if(e.innerHTML=``,!n||n.length===0){for(var i=r||6,a=0;a<i;a++){var o=document.createElement(`div`);o.className=`ag-cell portrait`,o.innerHTML=`<div class="ag-cell-placeholder"><i class="ti ti-camera" style="font-size:22px;color:#9a8878;"></i><span class="sl">Photo `+(a+1)+`</span></div>`,e.appendChild(o)}return}var s=0,c=[];n.forEach(function(n,r){var i=t+n,a=document.createElement(`div`);a.className=`ag-cell`,c.push(a),e.appendChild(a);var o=new Image;o.onload=function(){var e=o.naturalWidth>=o.naturalHeight;a.classList.add(e?`landscape`:`portrait`),a.innerHTML=``,a.appendChild(o);var t=document.createElement(`div`);t.className=`ag-caption`,t.textContent=n.replace(/\.[^.]+$/,``).replace(/[-_]/g,` `),a.appendChild(t),s++},o.onerror=function(){a.classList.add(`portrait`),a.innerHTML=`<div class="ag-cell-placeholder"><i class="ti ti-camera" style="font-size:22px;color:#9a8878;"></i><span class="sl">`+n+`</span></div>`,s++},o.src=i,o.alt=n,o.style.width=`100%`,o.style.height=`auto`,o.style.display=`block`})}}function c(){var e=document.getElementById(`slides-track`),t=document.getElementById(`dots`);document.getElementById(`sc`),e.innerHTML=``,t.innerHTML=``;var n=r;if(!n||n.length===0){for(var i=0;i<5;i++){var a=document.createElement(`div`);a.className=`c-slide`,a.innerHTML=`<div class="c-slide-placeholder"><i class="ti ti-camera" style="font-size:22px;color:#9a8878;"></i><span class="sl">Photo `+(i+1)+`</span></div>`,e.appendChild(a)}D=5}else n.forEach(function(t){var n=document.createElement(`div`);n.className=`c-slide`;var r=document.createElement(`img`);if(r.src=t.src,r.alt=t.caption||``,n.appendChild(r),t.caption){var i=document.createElement(`div`);i.className=`c-slide-caption`,i.textContent=t.caption,n.appendChild(i)}e.appendChild(n)}),D=n.length;for(var o=0;o<D;o++){var s=document.createElement(`div`);s.className=`dot`+(o===0?` active`:``),t.appendChild(s)}l()}function l(){var e=document.getElementById(`slides-track`),t=document.getElementById(`dots`),n=document.getElementById(`sc`);e.style.transform=`translateX(-`+E*100+`%)`,n&&(n.textContent=E+1+` / `+D),t.querySelectorAll(`.dot`).forEach(function(e,t){e.className=`dot`+(t===E?` active`:``)})}function u(e){E=(e+D)%D,l()}function d(){clearInterval(O),O=setInterval(function(){u(E+1)},5e3)}function f(){clearInterval(O),d()}function p(){var e=document.getElementById(`series-grid`),t=document.getElementById(`series-count`);e&&(e.innerHTML=``,t&&(t.textContent=String(i.length).padStart(2,`0`)+` series`),i.forEach(function(t,n){var r=document.createElement(`div`);r.className=`pho-card`,r.onclick=function(){m(t)},r.innerHTML=(t.images&&t.images.length>0?`<div class="pho-card-img"><img src="`+t.folder+t.images[0]+`" alt="`+t.title+`"></div>`:`<div class="pho-card-img" style="background:#ede8e0;">`+k[n%k.length]+`</div>`)+`<div class="pho-card-body"><div class="pho-cc">`+t.tag.split(`·`)[0].trim()+`</div><div class="pho-cn">`+t.title+`</div><div class="pho-cs">`+t.meta+`</div><div class="pho-clh"><i class="ti ti-arrow-up-right" style="font-size:9px;"></i>View</div></div>`,e.appendChild(r)}))}function m(e){var t=document.getElementById(`series-detail-content`),n=e.title.replace(e.titleItalic,`<em>`+e.titleItalic+`</em>`),r=e.tags.map(function(e){return`<span class="stag">`+e+`</span>`}).join(``);t.innerHTML=`<div class="series-hero"><div class="series-eyebrow">`+e.tag+`</div><h1 class="series-title-big">`+n+`</h1><div class="series-meta">`+e.meta+(e.shots?` · `+e.shots:``)+`</div><p class="series-desc">`+e.desc+`</p><div class="stags">`+r+`</div></div><div class="photo-grid-wrap"><div class="photo-grid-label">Series photos</div><div class="adaptive-grid" id="series-adaptive-grid"></div></div><div class="specs-grid"><div class="spec-card"><div class="spec-lbl">Camera</div><div class="spec-val">`+(e.camera||`—`)+`</div></div><div class="spec-card"><div class="spec-lbl">Film</div><div class="spec-val">`+(e.film||`—`)+`</div></div><div class="spec-card"><div class="spec-lbl">Duration</div><div class="spec-val">`+(e.duration||`—`)+`</div></div><div class="spec-card"><div class="spec-lbl">Total shots</div><div class="spec-val">`+(e.shots||`—`)+`</div></div></div>`,_(`page-series-detail`),requestAnimationFrame(function(){s(document.getElementById(`series-adaptive-grid`),e.folder,e.images,8)})}function h(){s(document.getElementById(`grad-gallery`),a.folder,a.images,6)}function g(){A=!A;var e=document.getElementById(`port`);e.className=A?`pho`:`eng`,document.getElementById(`tog`).setAttribute(`aria-checked`,A?`true`:`false`),document.getElementById(`le`).classList.toggle(`on`,!A),document.getElementById(`lp`).classList.toggle(`on`,A),document.getElementById(`pe`).classList.toggle(`active`,!A),document.getElementById(`pp`).classList.toggle(`active`,A),document.getElementById(`nav-li`).style.display=A?`none`:`flex`,document.getElementById(`nav-ig`).style.display=A?`flex`:`none`,A?d():clearInterval(O)}function _(e,t){document.querySelectorAll(`.page`).forEach(function(e){e.classList.remove(`active`)}),document.getElementById(e).classList.add(`active`),t?window.scrollTo({top:0,behavior:`smooth`}):window.scrollTo(0,0)}function v(){_(`page-home`,!0)}function y(e,t){var n=document.getElementById(e),r=!0;n.querySelectorAll(`input, textarea`).forEach(function(e){e.value.trim()||(r=!1)}),r&&(n.style.display=`none`,document.getElementById(t).style.display=`block`)}function b(e){var t=e.classList.contains(`open`);document.querySelectorAll(`.faq-item`).forEach(function(e){e.classList.remove(`open`)}),t||e.classList.add(`open`)}function x(){j||(j=document.createElement(`div`),j.id=`photo-lightbox`,j.className=`photo-lightbox`,j.setAttribute(`role`,`dialog`),j.setAttribute(`aria-modal`,`true`),j.setAttribute(`aria-hidden`,`true`),j.innerHTML=`<button type="button" class="photo-lightbox-close" aria-label="Close"><i class="ti ti-x"></i></button>`,M=document.createElement(`img`),M.alt=``,j.appendChild(M),j.querySelector(`.photo-lightbox-close`).addEventListener(`click`,function(e){e.stopPropagation(),C()}),j.addEventListener(`click`,function(e){e.target===j&&C()}),document.body.appendChild(j))}function S(e,t){e&&(x(),M.src=e,M.alt=t||``,j.classList.add(`open`),j.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`)}function C(){!j||!j.classList.contains(`open`)||(j.classList.remove(`open`),j.setAttribute(`aria-hidden`,`true`),document.body.style.overflow=``,M.removeAttribute(`src`),M.alt=``)}function ee(e){if(e.target.tagName===`IMG`){var t=e.target.closest(`.ag-cell`);!t||!t.closest(`.adaptive-grid`)||e.target.closest(`.photo-lightbox`)||t.querySelector(`:scope > img`)===e.target&&(e.preventDefault(),e.stopPropagation(),S(e.target.currentSrc||e.target.src,e.target.getAttribute(`alt`)||``))}}function w(e){e.key===`Escape`&&j&&j.classList.contains(`open`)&&C()}function T(){window.showPage=_,window.goHome=v,window.sw=g,window.submitForm=y,window.toggleFaq=b,c(),p(),h(),document.getElementById(`tog`).addEventListener(`keydown`,function(e){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),g())}),document.getElementById(`prev`).onclick=document.getElementById(`warr-l`).onclick=function(){u(E-1),f()},document.getElementById(`next`).onclick=document.getElementById(`warr-r`).onclick=function(){u(E+1),f()};var e=0,t=document.getElementById(`wheel`);t.addEventListener(`touchstart`,function(t){e=t.touches[0].clientX},{passive:!0}),t.addEventListener(`touchend`,function(t){var n=t.changedTouches[0].clientX-e;Math.abs(n)>40&&(u(n<0?E+1:E-1),f())},{passive:!0}),document.addEventListener(`click`,ee,!0),document.addEventListener(`keydown`,w)}var E,D,O,k,A,j,M,te=e((()=>{o(),E=0,D=0,O=null,k=[`<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="7" y="11" width="36" height="26" rx="2" fill="none" stroke="#c8a97e" stroke-width="1.1" opacity=".6"/><circle cx="25" cy="24" r="7" stroke="#c8a97e" stroke-width="1.1" opacity=".8"/><circle cx="25" cy="24" r="3" fill="#c8a97e" opacity=".7"/></svg>`,`<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M6 38 Q16 10 25 28 Q34 44 44 16" stroke="#c8a97e" stroke-width="1.4" fill="none" opacity=".7"/><circle cx="25" cy="11" r="5" fill="none" stroke="#c8a97e" stroke-width="1.1" opacity=".5"/></svg>`,`<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><circle cx="25" cy="21" r="10" fill="none" stroke="#c8a97e" stroke-width="1.1" opacity=".6"/><path d="M19 27 Q25 33 31 27" stroke="#c8a97e" stroke-width="1.1" fill="none" opacity=".8"/></svg>`,`<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="6" y="6" width="38" height="38" rx="2" fill="none" stroke="#c8a97e" stroke-width=".5" opacity=".3"/><rect x="11" y="11" width="8" height="6" rx="1" fill="#c8a97e" opacity=".4"/><rect x="27" y="16" width="10" height="13" rx="1" fill="#c8a97e" opacity=".5"/></svg>`,`<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M6 44 L15 25 L23 35 L33 13 L44 32" stroke="#c8a97e" stroke-width="1.4" fill="none" opacity=".5"/></svg>`,`<svg width="50" height="50" viewBox="0 0 50 50" fill="none"><ellipse cx="25" cy="32" rx="15" ry="8" stroke="#c8a97e" stroke-width="1.1" opacity=".4"/><path d="M12 28 Q25 8 38 28" stroke="#c8a97e" stroke-width="1.1" fill="none" opacity=".6"/><circle cx="25" cy="18" r="4" fill="#c8a97e" opacity=".5"/></svg>`],A=!1,j=null,M=null})),N,P=e((()=>{N=`<div class="page active" id="page-home">
<div id="port" class="eng">
  <nav>
    <div class="nav-left">
      <button class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
      <div class="logo">Ethan<em>R.</em></div>
    </div>
    <div class="nav-right">
      <a id="nav-li" class="nav-link" href="https://linkedin.com/in/yourprofile" target="_blank"><i class="ti ti-brand-linkedin"></i>LinkedIn</a>
      <a id="nav-ig" class="nav-link" href="https://instagram.com/yourhandle" target="_blank" style="display:none"><i class="ti ti-brand-instagram"></i>Instagram</a>
      <div class="tog-wrap">
        <span class="tog-lbl on" id="le">Eng</span>
        <div class="tog" id="tog" onclick="sw()" role="switch" aria-checked="false" tabindex="0"><div class="knob"></div></div>
        <span class="tog-lbl" id="lp">Photo</span>
      </div>
    </div>
  </nav>
`})),F,I=e((()=>{F=`</div>
</div>
`})),L,R=e((()=>{L=`  <!-- Engineering panel -->
  <div id="pe" class="panel active">
    <div class="stats">
      <div class="stat fade-in"><div class="stat-n">12<span>+</span></div><div class="stat-l">Projects</div></div>
      <div class="stat fade-in d1"><div class="stat-n">4<span>yr</span></div><div class="stat-l">Experience</div></div>
      <div class="stat fade-in d2"><div class="stat-n">6</div><div class="stat-l">Technologies</div></div>
      <div class="stat fade-in d3"><div class="stat-n">3</div><div class="stat-l">Open-source</div></div>
    </div>
    <div class="hero-bio-split fade-in">
      <div class="hero-side">
        <div class="mode-tag">Engineering Portfolio</div>
        <h1 class="hero-title">Building things<br>that <em>work.</em></h1>
        <p class="hero-desc">Software, hardware, and research engineering — clean architecture, real systems, meaningful results.</p>
      </div>
      <div class="split-div"></div>
      <div class="bio-side">
        <!--
          PROFILE PHOTO (engineering side):
          Replace the <i> tag below with:
          <img src="photos/profile-eng.jpg" alt="Ethan Reeves">
        -->
        <div class="avatar-circle"><i class="ti ti-user"></i></div>
        <div class="bio-name">Ethan Reeves</div>
        <div class="bio-role">Software &amp; Systems Engineer</div>
        <div class="bio-body">Based in Southern California. Building fast, reliable software — from embedded systems to full-stack platforms.</div>
      </div>
    </div>
    <div class="strip">
      <button class="res-btn" onclick="showPage('page-resume')"><i class="ti ti-file-cv"></i> View resume</button>
    </div>
    <div class="divider"></div>
    <div class="works">
      <div class="sec-hdr"><span class="sec-title">Selected work</span><span class="sec-count">06 projects</span></div>
      <div class="grid">
        <div class="card fade-in d1" onclick="showPage('page-sw')">
          <div class="cv" style="background:#0d0d1a">
            <!--
              PROJECT THUMBNAIL: replace SVG with:
              <img src="photos/projects/rest-api-thumb.jpg" style="width:100%;height:100%;object-fit:cover;">
            -->
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="6" y="17" width="38" height="6" rx="2" fill="#4f8ef7" opacity=".8"/><rect x="6" y="27" width="24" height="5" rx="2" fill="#4f8ef7" opacity=".4"/><rect x="6" y="9" width="14" height="4" rx="2" fill="#4f8ef7" opacity=".5"/></svg>
          </div>
          <div class="cb"><span class="cat-badge cat-sw">Software</span><div class="cn">REST API Platform</div><div class="cs">Node.js, PostgreSQL</div><div class="clh"><i class="ti ti-arrow-up-right" style="font-size:9px;"></i>View</div></div>
        </div>
        <div class="card fade-in d2" onclick="showPage('page-hw')">
          <div class="cv" style="background:#0d0d1a"><svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="12" y="12" width="26" height="26" rx="3" stroke="#5dcaa5" stroke-width="1.1" opacity=".5"/><circle cx="25" cy="25" r="5" fill="#5dcaa5" opacity=".7"/><line x1="12" y1="19" x2="6" y2="19" stroke="#5dcaa5" stroke-width="1" opacity=".5"/><line x1="38" y1="19" x2="44" y2="19" stroke="#5dcaa5" stroke-width="1" opacity=".5"/></svg></div>
          <div class="cb"><span class="cat-badge cat-hw">Hardware</span><div class="cn">Sensor Array</div><div class="cs">STM32, RTOS</div><div class="clh" style="color:#5dcaa5;"><i class="ti ti-arrow-up-right" style="font-size:9px;"></i>View</div></div>
        </div>
        <div class="card fade-in d1" onclick="showPage('page-re')">
          <div class="cv" style="background:#0d0d1a"><svg width="50" height="50" viewBox="0 0 50 50" fill="none"><circle cx="25" cy="18" r="8" stroke="#afa9ec" stroke-width="1.1" opacity=".5"/><line x1="25" y1="26" x2="25" y2="34" stroke="#afa9ec" stroke-width="1" opacity=".5"/><circle cx="25" cy="18" r="3" fill="#afa9ec" opacity=".6"/></svg></div>
          <div class="cb"><span class="cat-badge cat-re">Research</span><div class="cn">ML Latency Study</div><div class="cs">PyTorch, Analysis</div><div class="clh" style="color:#afa9ec;"><i class="ti ti-arrow-up-right" style="font-size:9px;"></i>View</div></div>
        </div>
        <div class="card fade-in d2" onclick="showPage('page-sw')">
          <div class="cv" style="background:#0d0d1a"><svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="8" y="8" width="13" height="13" rx="2" fill="#4f8ef7" opacity=".3" stroke="#4f8ef7" stroke-width="1"/><rect x="29" y="8" width="13" height="13" rx="2" fill="#4f8ef7" opacity=".3" stroke="#4f8ef7" stroke-width="1"/><rect x="8" y="29" width="13" height="13" rx="2" fill="#4f8ef7" opacity=".3" stroke="#4f8ef7" stroke-width="1"/><rect x="29" y="29" width="13" height="13" rx="2" fill="#4f8ef7" opacity=".5" stroke="#4f8ef7" stroke-width="1"/></svg></div>
          <div class="cb"><span class="cat-badge cat-sw">Software</span><div class="cn">Cache Layer</div><div class="cs">Redis, Go</div><div class="clh"><i class="ti ti-arrow-up-right" style="font-size:9px;"></i>View</div></div>
        </div>
        <div class="card fade-in d1" onclick="showPage('page-hw')">
          <div class="cv" style="background:#0d0d1a"><svg width="50" height="50" viewBox="0 0 50 50" fill="none"><rect x="8" y="14" width="34" height="22" rx="2" stroke="#5dcaa5" stroke-width="1.1" opacity=".4"/><rect x="14" y="20" width="8" height="10" rx="1" fill="#5dcaa5" opacity=".2"/><rect x="26" y="20" width="10" height="10" rx="1" fill="#5dcaa5" opacity=".35"/></svg></div>
          <div class="cb"><span class="cat-badge cat-hw">Hardware</span><div class="cn">Motor Driver PCB</div><div class="cs">KiCad, BLDC</div><div class="clh" style="color:#5dcaa5;"><i class="ti ti-arrow-up-right" style="font-size:9px;"></i>View</div></div>
        </div>
        <div class="card fade-in d2" onclick="showPage('page-re')">
          <div class="cv" style="background:#0d0d1a"><svg width="50" height="50" viewBox="0 0 50 50" fill="none"><polyline points="6,40 14,22 22,30 30,12 44,26" stroke="#afa9ec" stroke-width="1.4" fill="none" opacity=".7"/><circle cx="14" cy="22" r="2.5" fill="#afa9ec" opacity=".7"/><circle cx="22" cy="30" r="2.5" fill="#afa9ec" opacity=".7"/><circle cx="30" cy="12" r="2.5" fill="#afa9ec" opacity=".7"/></svg></div>
          <div class="cb"><span class="cat-badge cat-re">Research</span><div class="cn">Edge Inference Survey</div><div class="cs">TensorFlow, C++</div><div class="clh" style="color:#afa9ec;"><i class="ti ti-arrow-up-right" style="font-size:9px;"></i>View</div></div>
        </div>
      </div>
    </div>
  </div>
`})),z,B=e((()=>{z=`  <!-- Photography panel -->
  <div id="pp" class="panel">
    <div class="stats">
      <div class="stat fade-in"><div class="stat-n">200<span>+</span></div><div class="stat-l">Images</div></div>
      <div class="stat fade-in d1"><div class="stat-n">5<span>yr</span></div><div class="stat-l">Shooting</div></div>
      <div class="stat fade-in d2"><div class="stat-n">4</div><div class="stat-l">Genres</div></div>
      <div class="stat fade-in d3"><div class="stat-n">35<span>mm</span></div><div class="stat-l">Format</div></div>
    </div>
    <div class="hero-bio-split fade-in" style="border-bottom-color:#e0d8cd;">
      <div class="hero-side">
        <div class="mode-tag">Photography Portfolio</div>
        <h1 class="hero-title">Light, shadow<br>and <em>time.</em></h1>
        <p class="hero-desc">Documentary and fine-art photography — urban landscapes, portraiture, and natural environments.</p>
      </div>
      <div class="split-div" style="background:#e0d8cd;"></div>
      <div class="bio-side">
        <!--
          PROFILE PHOTO (photography side):
          Replace the <i> tag below with:
          <img src="photos/profile-photo.jpg" alt="Ethan Reeves">
        -->
        <div class="avatar-circle" style="background:#ede8e0;border-color:#c8a97e;">
          <i class="ti ti-user" style="color:#c8a97e;font-size:36px;"></i>
        </div>
        <div class="bio-name" style="color:#1c1410;">Ethan Reeves</div>
        <div class="bio-role" style="color:#c8a97e;">Photographer</div>
        <div class="bio-body" style="color:#9a8878;">Southern California based. Shooting street, landscape, and portrait on 35mm and digital.</div>
      </div>
    </div>

    <!-- Carousel — auto-built from CAROUSEL_PHOTOS -->
    <div class="wheel-wrap">
      <div class="sec-hdr">
        <span class="sec-title" style="color:#9a8878;">Featured shots</span>
        <span class="sec-count" id="sc" style="color:#c8a97e;"></span>
      </div>
      <div class="wheel-outer">
        <div class="wheel" id="wheel">
          <div class="slides-track" id="slides-track"></div>
        </div>
        <button class="wheel-arr wl" id="warr-l" aria-label="Previous"><i class="ti ti-arrow-left"></i></button>
        <button class="wheel-arr wr" id="warr-r" aria-label="Next"><i class="ti ti-arrow-right"></i></button>
      </div>
      <div class="wheel-nav">
        <button class="wbtn" id="prev" aria-label="Previous"><i class="ti ti-arrow-left"></i></button>
        <div class="wheel-dots" id="dots"></div>
        <button class="wbtn" id="next" aria-label="Next"><i class="ti ti-arrow-right"></i></button>
      </div>
    </div>

    <!-- Grad preview section -->
    <div style="padding: 4px 18px 6px;">
      <div class="sec-hdr" style="margin-bottom:14px;">
        <span class="sec-title" style="color:#9a8878;">Graduate photos</span>
        <span style="font-family:'DM Mono',monospace;font-size:9px;color:#c8a97e;cursor:pointer;" onclick="showPage('page-grad')">See all ›</span>
      </div>
    </div>
    <div class="grad-preview fade-in" onclick="showPage('page-grad')">
      <div class="grad-preview-img" id="grad-preview-img">
        <!--
          GRAD PREVIEW IMAGE:
          To use a real photo, replace this entire div content with:
          <img src="photos/grad/your-best-shot.jpg" alt="Graduate photos" style="width:100%;height:100%;object-fit:cover;">
        -->
        <div class="bokeh" style="width:90px;height:90px;background:#c8a97e;top:-20px;right:20px;"></div>
        <div class="bokeh" style="width:50px;height:50px;background:#c8a97e;bottom:10px;left:30px;"></div>
        <div class="grad-preview-img-placeholder">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="20" r="12" stroke="#c8a97e" stroke-width="1.4" opacity=".7"/>
            <circle cx="28" cy="20" r="5" fill="#c8a97e" opacity=".5"/>
            <path d="M10 48 Q28 34 46 48" stroke="#c8a97e" stroke-width="1.4" fill="none" opacity=".5"/>
            <polygon points="28,6 40,12 28,18 16,12" fill="#c8a97e" opacity=".55"/>
            <line x1="40" y1="12" x2="40" y2="22" stroke="#c8a97e" stroke-width="1.2" opacity=".6"/>
            <circle cx="40" cy="23" r="2" fill="#c8a97e" opacity=".6"/>
          </svg>
          <span style="font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:#9a8878;">Sample portrait — golden hour</span>
        </div>
      </div>
      <div class="grad-preview-body">
        <div class="grad-preview-eyebrow">Class of 2025 · Now booking</div>
        <div class="grad-preview-title">Graduate <em>Photos</em></div>
        <div class="grad-preview-desc">Looking for grad photos? Celebrate your milestone with portraits that feel as meaningful as the moment — natural light, real locations, no stiff poses. Sessions available across Southern California.</div>
        <button class="grad-preview-cta" onclick="event.stopPropagation();showPage('page-grad')">
          <i class="ti ti-school" style="font-size:13px;"></i> View packages &amp; book
        </button>
      </div>
    </div>

    <div class="divider" style="background:#e0d8cd;margin-top:20px;"></div>

    <!-- Series cards — auto-built from SERIES array -->
    <div class="works">
      <div class="sec-hdr">
        <span class="sec-title" style="color:#9a8878;">Selected series</span>
        <span class="sec-count" style="color:#c8a97e;" id="series-count"></span>
      </div>
      <div class="grid" id="series-grid"></div>
    </div>
  </div>
`})),V,H=e((()=>{V=`<div class="page pho-det" id="page-series-detail">
  <div class="det-nav">
    <div class="det-nav-actions">
      <button type="button" class="pho-back" onclick="showPage('page-home')"><i class="ti ti-arrow-left"></i> Back</button>
      <button type="button" class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
    </div>
    <div class="det-logo" style="color:#1c1410;">Ethan<em style="font-style:italic;color:#c8a97e;">R.</em></div>
  </div>
  <div id="series-detail-content"></div>
</div>
`})),U,W=e((()=>{U=`<div class="page pho-det" id="page-grad">
  <div class="det-nav">
    <div class="det-nav-actions">
      <button type="button" class="pho-back" onclick="showPage('page-home')"><i class="ti ti-arrow-left"></i> Back</button>
      <button type="button" class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
    </div>
    <div class="det-logo" style="color:#1c1410;">Ethan<em style="font-style:italic;color:#c8a97e;">R.</em></div>
  </div>
  <div class="grad-hero">
    <div class="grad-eyebrow">Class of 2025</div>
    <h1 class="grad-title-big">Graduate <em>Photos</em></h1>
    <p class="grad-tagline">Celebrate your milestone with photos that feel as meaningful as the moment. Natural light, real locations, no stiff poses.</p>
    <button class="grad-cta-big" onclick="showPage('page-contact-grad')"><i class="ti ti-calendar"></i> Book your session</button>
  </div>

  <!-- Grad gallery — auto-built from GRAD_PHOTOS -->
  <div class="grad-section">
    <div class="grad-sec-label">Sample gallery</div>
    <div class="adaptive-grid" id="grad-gallery"></div>
  </div>

  <div class="grad-section" style="padding-top:0;">
    <div class="grad-sec-label">Packages</div>
    <div class="package-grid">
      <div class="pkg-card"><div class="pkg-name">Essential</div><div class="pkg-price">$150<span> / session</span></div><ul class="pkg-features"><li>1 hour session</li><li>1 location</li><li>20 edited photos</li><li>Online gallery</li></ul></div>
      <div class="pkg-card featured"><div class="pkg-badge">Most popular</div><div class="pkg-name">Signature</div><div class="pkg-price">$275<span> / session</span></div><ul class="pkg-features"><li>2 hour session</li><li>2 locations</li><li>50 edited photos</li><li>Online gallery</li><li>Print release</li></ul></div>
    </div>
  </div>
  <div class="grad-section" style="padding-top:0;">
    <div class="grad-sec-label">What past clients say</div>
    <div class="testimonial-row">
      <div class="testi"><div class="testi-text">"Ethan made the whole session feel relaxed and fun. The photos came out better than I ever imagined — my family cried."</div><div class="testi-name">— Maya L., Class of 2024</div></div>
      <div class="testi"><div class="testi-text">"Booked the Signature package and it was worth every penny. Beautiful light, great locations, and fast turnaround."</div><div class="testi-name">— Jordan K., Class of 2024</div></div>
    </div>
  </div>
  <div class="grad-section" style="padding-top:0;">
    <div class="grad-sec-label">FAQ</div>
    <div class="faq-list">
      <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">When should I book?<i class="ti ti-plus"></i></div><div class="faq-a">Sessions book up fast around graduation season. I recommend reaching out 4–6 weeks in advance to lock in your date.</div></div>
      <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">Where do shoots take place?<i class="ti ti-plus"></i></div><div class="faq-a">Anywhere you'd like — your campus, a local park, the beach, downtown. I'm familiar with great spots across Southern California.</div></div>
      <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">How long until I get my photos?<i class="ti ti-plus"></i></div><div class="faq-a">Edited photos delivered via online gallery within 7–10 days. Rush delivery available on request.</div></div>
      <div class="faq-item" onclick="toggleFaq(this)"><div class="faq-q">What should I wear?<i class="ti ti-plus"></i></div><div class="faq-a">Wear what makes you feel like yourself. Solid colors tend to photograph well. Cap and gown shots are always a great addition.</div></div>
    </div>
  </div>
  <div class="grad-section" style="padding-top:0;padding-bottom:28px;">
    <button class="grad-cta-big" style="width:100%;justify-content:center;" onclick="showPage('page-contact-grad')"><i class="ti ti-calendar"></i> Book your session</button>
  </div>
</div>
`})),G,K=e((()=>{G=`<div class="page pho-det" id="page-contact-grad">
  <div class="det-nav">
    <div class="det-nav-actions">
      <button type="button" class="pho-back" onclick="showPage('page-grad')"><i class="ti ti-arrow-left"></i> Back</button>
      <button type="button" class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
    </div>
    <div class="det-logo" style="color:#1c1410;">Ethan<em style="font-style:italic;color:#c8a97e;">R.</em></div>
  </div>
  <div class="contact-wrap">
    <div class="contact-eyebrow">Grad photo booking</div>
    <h1 class="contact-heading">Book your <em>session</em></h1>
    <p class="contact-sub">Fill out the form below and I'll get back to you within 24 hours to confirm your date and details.</p>
    <div class="email-note"><i class="ti ti-mail"></i> Submissions go directly to your-email@placeholder.com</div>
    <div id="grad-form">
      <div class="cf"><label for="gf-name">Your name</label><input type="text" id="gf-name" placeholder="Full name"></div>
      <div class="cf"><label for="gf-email">Email address</label><input type="email" id="gf-email" placeholder="you@example.com"></div>
      <div class="cf"><label for="gf-msg">Message</label><textarea id="gf-msg" placeholder="Tell me your grad date, preferred location, or any questions..."></textarea></div>
      <button class="pho-submit" onclick="submitForm('grad-form','grad-succ')"><i class="ti ti-send"></i> Send booking request</button>
    </div>
    <div class="form-succ" id="grad-succ"><div class="big">Request sent.</div><p>I'll be in touch within 24 hours to confirm your session details.</p></div>
  </div>
</div>
`})),q,J=e((()=>{q=`<div class="page pho-det" id="page-contact-general">
  <div class="det-nav">
    <div class="det-nav-actions">
      <button type="button" class="pho-back" onclick="showPage('page-home')"><i class="ti ti-arrow-left"></i> Back</button>
      <button type="button" class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
    </div>
    <div class="det-logo" style="color:#1c1410;">Ethan<em style="font-style:italic;color:#c8a97e;">R.</em></div>
  </div>
  <div class="contact-wrap">
    <div class="contact-eyebrow">Photography enquiries</div>
    <h1 class="contact-heading">Get in <em>touch</em></h1>
    <p class="contact-sub">Whether it's a print inquiry, a collaboration, or just to say hello — I'd love to hear from you.</p>
    <div class="email-note"><i class="ti ti-mail"></i> Submissions go directly to your-email@placeholder.com</div>
    <div id="gen-form">
      <div class="cf"><label for="gn-name">Name</label><input type="text" id="gn-name" placeholder="Your name"></div>
      <div class="cf"><label for="gn-email">Email</label><input type="email" id="gn-email" placeholder="you@example.com"></div>
      <div class="cf"><label for="gn-msg">Message</label><textarea id="gn-msg" placeholder="What's on your mind?"></textarea></div>
      <button class="pho-submit" onclick="submitForm('gen-form','gen-succ')"><i class="ti ti-send"></i> Send message</button>
    </div>
    <div class="form-succ" id="gen-succ"><div class="big">Message sent.</div><p>Thanks for reaching out — I'll get back to you within a day or two.</p></div>
    <div class="socials-title">Find me elsewhere</div>
    <a href="https://instagram.com/yourhandle" class="soc-link" target="_blank"><i class="ti ti-brand-instagram"></i><div><div>Instagram</div><div class="soc-sub">@yourhandle</div></div></a>
    <a href="https://vsco.co/yourprofile" class="soc-link" target="_blank"><i class="ti ti-camera"></i><div><div>VSCO</div><div class="soc-sub">vsco.co/yourprofile</div></div></a>
  </div>
</div>
`})),Y,X=e((()=>{Y=`<div class="page eng-det" id="page-sw">
  <div class="det-nav">
    <div class="det-nav-actions">
      <button type="button" class="eng-back" onclick="showPage('page-home')" style="background:#4f8ef7;color:#0d0d1a;"><i class="ti ti-arrow-left"></i> Back</button>
      <button type="button" class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
    </div>
    <div class="det-logo" style="color:#e8eaf6;">Ethan<em style="font-style:italic;color:#4f8ef7;">R.</em></div>
  </div>
  <div class="proj-body">
    <span class="proj-cat-badge" style="background:#0d1a2e;color:#85b7eb;border:.5px solid #378add;">Software</span>
    <h1 class="proj-title">REST API <em style="color:#4f8ef7;">Platform</em></h1>
    <p class="proj-sub">High-throughput REST API platform for multi-tenant SaaS. Sub-50ms response times, distributed rate limiting, and real-time analytics at scale.</p>
    <div class="proj-btns"><button class="pbtn" style="background:#4f8ef7;color:#0d0d1a;border:none;"><i class="ti ti-external-link"></i> Live demo</button><button class="pbtn" style="border:.5px solid #2a2a40;color:#e8eaf6;"><i class="ti ti-brand-github"></i> GitHub</button></div>
    <div class="proj-divider"></div>
    <!-- Screenshot — replace SVG with <img src="..."> when you have one -->
    <div class="schematic"><svg width="260" height="110" viewBox="0 0 260 110" fill="none"><rect x="10" y="40" width="50" height="28" rx="4" fill="#0d1a2e" stroke="#378add" stroke-width=".8"/><text x="35" y="58" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">Client</text><rect x="105" y="8" width="50" height="28" rx="4" fill="#0d1a2e" stroke="#378add" stroke-width=".8"/><text x="130" y="26" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">Auth</text><rect x="105" y="40" width="50" height="28" rx="4" fill="#0d1a2e" stroke="#4f8ef7" stroke-width="1"/><text x="130" y="58" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">API Gateway</text><rect x="105" y="72" width="50" height="28" rx="4" fill="#0d1a2e" stroke="#378add" stroke-width=".8"/><text x="130" y="90" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">Rate Limit</text><rect x="200" y="24" width="50" height="28" rx="4" fill="#0d1a2e" stroke="#378add" stroke-width=".8"/><text x="225" y="42" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">Postgres</text><rect x="200" y="56" width="50" height="28" rx="4" fill="#0d1a2e" stroke="#378add" stroke-width=".8"/><text x="225" y="74" font-size="8" fill="#85b7eb" text-anchor="middle" font-family="monospace">Redis</text><line x1="60" y1="54" x2="105" y2="54" stroke="#4f8ef7" stroke-width=".8" opacity=".7"/><line x1="155" y1="22" x2="200" y2="38" stroke="#378add" stroke-width=".7" opacity=".5"/><line x1="155" y1="54" x2="200" y2="70" stroke="#378add" stroke-width=".7" opacity=".5"/></svg></div>
    <div class="proj-sec"><div class="proj-sec-title">Tech stack</div><div class="chips"><span class="chip" style="color:#85b7eb;">Node.js</span><span class="chip" style="color:#85b7eb;">PostgreSQL</span><span class="chip" style="color:#85b7eb;">Redis</span><span class="chip" style="color:#85b7eb;">Docker</span><span class="chip" style="color:#85b7eb;">AWS Lambda</span></div></div>
    <div class="proj-sec"><div class="proj-sec-title">Key metrics</div><div class="metrics-grid"><div class="metric"><div class="metric-val">&lt;50<span style="color:#4f8ef7;">ms</span></div><div class="metric-lbl">Avg response</div></div><div class="metric"><div class="metric-val">99.9<span style="color:#4f8ef7;">%</span></div><div class="metric-lbl">Uptime SLA</div></div><div class="metric"><div class="metric-val">12<span style="color:#4f8ef7;">k</span></div><div class="metric-lbl">Req/sec peak</div></div><div class="metric"><div class="metric-val">3<span style="color:#4f8ef7;">mo</span></div><div class="metric-lbl">Build time</div></div></div></div>
    <div class="proj-sec"><div class="proj-sec-title">Features</div><ul class="feat-list"><li><span style="color:#4f8ef7;position:absolute;left:0;">—</span>Multi-tenant JWT auth with role-based access and refresh token rotation</li><li><span style="color:#4f8ef7;position:absolute;left:0;">—</span>Distributed rate limiting via Redis with per-user and per-endpoint granularity</li><li><span style="color:#4f8ef7;position:absolute;left:0;">—</span>Real-time analytics dashboard with sub-second query latency</li></ul></div>
    <div class="proj-sec"><div class="proj-sec-title">Timeline</div><div class="tl"><div class="tl-item"><div class="tl-l"><div class="tl-dot" style="background:#4f8ef7;"></div><div class="tl-line"></div></div><div><div class="tl-date" style="color:#4f8ef7;">Jan 2024</div><div class="tl-text">Architecture &amp; design</div><div class="tl-sub">Data models, auth strategy, API contract</div></div></div><div class="tl-item"><div class="tl-l"><div class="tl-dot" style="background:#4f8ef7;"></div><div class="tl-line"></div></div><div><div class="tl-date" style="color:#4f8ef7;">Apr 2024</div><div class="tl-text">Deploy &amp; load test</div><div class="tl-sub">AWS Lambda, 12k req/sec stress test</div></div></div></div></div>
  </div>
</div>
`})),Z,ne=e((()=>{Z=`<div class="page eng-det" id="page-hw">
  <div class="det-nav">
    <div class="det-nav-actions">
      <button type="button" class="eng-back" onclick="showPage('page-home')" style="background:#5dcaa5;color:#04342c;"><i class="ti ti-arrow-left"></i> Back</button>
      <button type="button" class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
    </div>
    <div class="det-logo" style="color:#e8eaf6;">Ethan<em style="font-style:italic;color:#5dcaa5;">R.</em></div>
  </div>
  <div class="proj-body">
    <span class="proj-cat-badge" style="background:#1a2a1a;color:#5dcaa5;border:.5px solid #1d9e75;">Hardware</span>
    <h1 class="proj-title">Sensor Array <em style="color:#5dcaa5;">Controller</em></h1>
    <p class="proj-sub">STM32-based embedded controller managing 16 sensor nodes over I2C with real-time RTOS scheduling and fault detection.</p>
    <div class="proj-btns"><button class="pbtn" style="background:#5dcaa5;color:#04342c;border:none;"><i class="ti ti-brand-github"></i> GitHub</button><button class="pbtn" style="border:.5px solid #2a2a40;color:#e8eaf6;"><i class="ti ti-file-description"></i> Datasheet</button></div>
    <div class="proj-divider"></div>
    <div class="schematic"><svg width="260" height="110" viewBox="0 0 260 110" fill="none"><rect x="90" y="35" width="80" height="40" rx="4" fill="#0d1a14" stroke="#1d9e75" stroke-width="1.2"/><text x="130" y="53" font-size="8" fill="#5dcaa5" text-anchor="middle" font-family="monospace">STM32F4</text><text x="130" y="65" font-size="7" fill="#1d9e75" text-anchor="middle" font-family="monospace">MCU</text><rect x="10" y="15" width="44" height="18" rx="3" fill="#0d1a14" stroke="#1d9e75" stroke-width=".7" opacity=".7"/><text x="32" y="27" font-size="7" fill="#5dcaa5" text-anchor="middle" font-family="monospace">Sensor 1</text><rect x="10" y="46" width="44" height="18" rx="3" fill="#0d1a14" stroke="#1d9e75" stroke-width=".7" opacity=".7"/><text x="32" y="58" font-size="7" fill="#5dcaa5" text-anchor="middle" font-family="monospace">Sensor 2</text><rect x="10" y="77" width="44" height="18" rx="3" fill="#0d1a14" stroke="#1d9e75" stroke-width=".7" opacity=".7"/><text x="32" y="89" font-size="7" fill="#5dcaa5" text-anchor="middle" font-family="monospace">Sensor N</text><rect x="206" y="15" width="44" height="18" rx="3" fill="#0d1a14" stroke="#1d9e75" stroke-width=".7" opacity=".7"/><text x="228" y="27" font-size="7" fill="#5dcaa5" text-anchor="middle" font-family="monospace">UART</text><rect x="206" y="46" width="44" height="18" rx="3" fill="#0d1a14" stroke="#1d9e75" stroke-width=".7" opacity=".7"/><text x="228" y="58" font-size="7" fill="#5dcaa5" text-anchor="middle" font-family="monospace">Flash</text><rect x="206" y="77" width="44" height="18" rx="3" fill="#0d1a14" stroke="#1d9e75" stroke-width=".7" opacity=".7"/><text x="228" y="89" font-size="7" fill="#5dcaa5" text-anchor="middle" font-family="monospace">Power</text><line x1="54" y1="24" x2="90" y2="47" stroke="#1d9e75" stroke-width=".7" opacity=".6"/><line x1="54" y1="55" x2="90" y2="55" stroke="#1d9e75" stroke-width=".7" opacity=".6"/><line x1="54" y1="86" x2="90" y2="63" stroke="#1d9e75" stroke-width=".7" opacity=".6"/><line x1="170" y1="47" x2="206" y2="24" stroke="#1d9e75" stroke-width=".7" opacity=".6"/><line x1="170" y1="55" x2="206" y2="55" stroke="#1d9e75" stroke-width=".7" opacity=".6"/><line x1="170" y1="63" x2="206" y2="86" stroke="#1d9e75" stroke-width=".7" opacity=".6"/></svg></div>
    <div class="proj-sec"><div class="proj-sec-title">Hardware stack</div><div class="chips"><span class="chip" style="color:#5dcaa5;">STM32F4</span><span class="chip" style="color:#5dcaa5;">FreeRTOS</span><span class="chip" style="color:#5dcaa5;">I2C / SPI</span><span class="chip" style="color:#5dcaa5;">KiCad</span><span class="chip" style="color:#5dcaa5;">C++</span></div></div>
    <div class="proj-sec"><div class="proj-sec-title">Key specs</div><div class="metrics-grid"><div class="metric"><div class="metric-val">16</div><div class="metric-lbl">Sensor nodes</div></div><div class="metric"><div class="metric-val">1<span style="color:#5dcaa5;">ms</span></div><div class="metric-lbl">Sample interval</div></div><div class="metric"><div class="metric-val">72<span style="color:#5dcaa5;">MHz</span></div><div class="metric-lbl">Clock speed</div></div><div class="metric"><div class="metric-val">3.3<span style="color:#5dcaa5;">V</span></div><div class="metric-lbl">Operating voltage</div></div></div></div>
    <div class="proj-sec"><div class="proj-sec-title">Build log</div><div class="tl"><div class="tl-item"><div class="tl-l"><div class="tl-dot" style="background:#5dcaa5;"></div><div class="tl-line"></div></div><div><div class="tl-date" style="color:#5dcaa5;">Mar 2023</div><div class="tl-text">Schematic &amp; PCB layout</div><div class="tl-sub">4-layer board in KiCad, sent for fab</div></div></div><div class="tl-item"><div class="tl-l"><div class="tl-dot" style="background:#5dcaa5;"></div><div class="tl-line"></div></div><div><div class="tl-date" style="color:#5dcaa5;">Jun 2023</div><div class="tl-text">Deployed to production</div><div class="tl-sub">3 facilities, 0 failures in 6 months</div></div></div></div></div>
  </div>
</div>
`})),Q,re=e((()=>{Q=`<div class="page eng-det" id="page-re">
  <div class="det-nav">
    <div class="det-nav-actions">
      <button type="button" class="eng-back" onclick="showPage('page-home')" style="background:#7f77dd;color:#26215c;"><i class="ti ti-arrow-left"></i> Back</button>
      <button type="button" class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
    </div>
    <div class="det-logo" style="color:#e8eaf6;">Ethan<em style="font-style:italic;color:#afa9ec;">R.</em></div>
  </div>
  <div class="proj-body">
    <span class="proj-cat-badge" style="background:#2a1a2e;color:#afa9ec;border:.5px solid #7f77dd;">Research</span>
    <h1 class="proj-title">ML Inference <em style="color:#afa9ec;">Latency Study</em></h1>
    <p class="proj-sub">Systematic study of inference latency trade-offs for transformer models on edge hardware across four devices.</p>
    <div class="proj-btns"><button class="pbtn" style="background:#7f77dd;color:#26215c;border:none;"><i class="ti ti-file-text"></i> Full paper</button><button class="pbtn" style="border:.5px solid #2a2a40;color:#e8eaf6;"><i class="ti ti-brand-github"></i> Dataset</button></div>
    <div class="proj-divider"></div>
    <div class="proj-sec"><div class="proj-sec-title" style="color:#afa9ec;">Abstract</div><div class="abstract-block">Edge deployment of transformer models presents latency challenges poorly characterized across hardware profiles. This study finds a 4.2× latency reduction with INT8 quantization at under 1% accuracy loss across four target devices.</div></div>
    <div class="proj-sec"><div class="proj-sec-title">Key findings</div><div class="finding-card"><div class="finding-num">Finding 01</div><div class="finding-text">INT8 quantization reduced mean latency by 4.2× on Jetson Nano vs FP32 baseline</div><div class="finding-sub">0.8% accuracy loss on CIFAR-10</div></div><div class="finding-card"><div class="finding-num">Finding 02</div><div class="finding-text">FPGA target outperformed MCU by 11× at equivalent power draw</div><div class="finding-sub">Custom accelerator reduced off-chip memory access by 60%</div></div></div>
    <div class="proj-sec"><div class="proj-sec-title">Key metrics</div><div class="metrics-grid"><div class="metric"><div class="metric-val">4.2<span style="color:#afa9ec;">×</span></div><div class="metric-lbl">Latency reduction</div></div><div class="metric"><div class="metric-val">&lt;1<span style="color:#afa9ec;">%</span></div><div class="metric-lbl">Accuracy loss</div></div><div class="metric"><div class="metric-val">4</div><div class="metric-lbl">Target devices</div></div><div class="metric"><div class="metric-val">11<span style="color:#afa9ec;">×</span></div><div class="metric-lbl">FPGA vs MCU</div></div></div></div>
  </div>
</div>
`})),$,ie=e((()=>{$=`<div class="page" id="page-resume">
  <div class="det-nav" style="background:#0d0d1a;border-bottom:.5px solid #2a2a40;">
    <div class="det-nav-actions">
      <button type="button" class="eng-back" onclick="showPage('page-home')" style="background:#4f8ef7;color:#0d0d1a;"><i class="ti ti-arrow-left"></i> Back</button>
      <button type="button" class="home-btn" onclick="goHome()" aria-label="Home"><i class="ti ti-home"></i></button>
    </div>
    <div class="det-logo" style="color:#e8eaf6;">Ethan<em style="font-style:italic;color:#4f8ef7;">R.</em></div>
  </div>
  <div class="res-page"><div class="res-name">Ethan <em>Reeves</em></div><div class="res-tagline">Software &amp; Systems Engineer</div><div class="res-contact-row"><span class="res-ci"><i class="ti ti-mail"></i>ethan@placeholder.com</span><span class="res-ci"><i class="ti ti-map-pin"></i>Southern California</span><span class="res-ci"><i class="ti ti-brand-github"></i>github.com/ethanr</span></div><div class="res-sec"><div class="res-sec-title">Experience</div><div class="res-item"><div class="res-ih"><span class="res-it">Senior Software Engineer</span><span class="res-id">2022–Present</span></div><div class="res-is">Acme Corp · Full-time</div><div class="res-ib">Led architecture of a multi-tenant API platform serving 50k DAU. Reduced p95 latency by 60%.</div></div><div class="res-item"><div class="res-ih"><span class="res-it">Embedded Systems Engineer</span><span class="res-id">2020–2022</span></div><div class="res-is">TechStart Inc · Full-time</div><div class="res-ib">Designed firmware for STM32-based IoT sensor arrays in 3 manufacturing facilities.</div></div><div class="res-item"><div class="res-ih"><span class="res-it">Software Engineering Intern</span><span class="res-id">Summer 2019</span></div><div class="res-is">BuildCo · Internship</div><div class="res-ib">Built CI/CD tooling cutting deploy time from 18 to 4 minutes.</div></div></div><div class="res-sec"><div class="res-sec-title">Education</div><div class="res-item"><div class="res-ih"><span class="res-it">B.S. Computer Engineering</span><span class="res-id">2016–2020</span></div><div class="res-is">University of California · GPA 3.8</div></div></div><div class="res-sec"><div class="res-sec-title">Skills</div><div class="res-skills"><span class="res-skill">Node.js</span><span class="res-skill">Python</span><span class="res-skill">Go</span><span class="res-skill">C++</span><span class="res-skill">PostgreSQL</span><span class="res-skill">Redis</span><span class="res-skill">Docker</span><span class="res-skill">AWS</span><span class="res-skill">STM32</span><span class="res-skill">FreeRTOS</span></div></div><button class="res-dl"><i class="ti ti-download"></i> Download PDF</button></div>
</div>
`}));t((()=>{n(),te(),P(),I(),R(),B(),H(),W(),K(),J(),X(),ne(),re(),ie(),document.getElementById(`app`).innerHTML=[N,L,z,F,V,U,G,q,Y,Z,Q,$].join(``),T()}))();