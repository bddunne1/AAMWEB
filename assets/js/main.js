// Shared layout, rope icons, catalog, finder and product detail rendering.

const COMPANY = {
  name: 'Aamstrand Ropes & Twines, Inc.',
  street: '711 N Grove St',
  city: 'Manteno, IL 60950',
  phone: '(815) 468-2100',
  tollFree: '(800) 338-0557',
  email: 'sales@aamstrand.com', // TODO: confirm sales inbox
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Rope cross-section icons ---------- */

function ring(n, r, dot, cls = 'f') {
  let out = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    out += `<circle class="${cls}" cx="${(32 + r * Math.cos(a)).toFixed(2)}" cy="${(32 + r * Math.sin(a)).toFixed(2)}" r="${dot}"/>`;
  }
  return out;
}

function ropeIcon(construction) {
  const shapes = {
    twisted: ring(3, 11, 12.5),
    solid: ring(14, 21, 4.2) + ring(8, 12, 4.2) + '<circle class="f" cx="32" cy="32" r="4.2"/>',
    diamond: ring(16, 22, 4.4) + '<circle class="c" cx="32" cy="32" r="14"/>',
    single: ring(12, 20, 6.2),
    hollow: ring(12, 21, 5),
    double: ring(18, 24, 3.8) + ring(10, 13, 4.2, 'f2') + '<circle class="f2" cx="32" cy="32" r="4"/>',
    kernmantle: ring(24, 25, 3.2) + '<circle class="f2" cx="32" cy="32" r="5.5"/>' + ring(6, 11, 5.5, 'f2'),
    twine: '<circle class="f" cx="24" cy="32" r="10"/><circle class="f" cx="40" cy="32" r="10"/>',
  };
  return `<svg class="rope-icon" viewBox="0 0 64 64" aria-hidden="true">
    <circle class="o" cx="32" cy="32" r="30"/>${shapes[construction] || shapes.solid}</svg>`;
}

/* ---------- Header & footer ---------- */

const NAV = [
  ['products.html', 'Products', 'products'],
  ['index.html#industries', 'Industries', 'industries'],
  ['index.html#custom', 'Custom & Private Label', 'custom'],
  ['about.html', 'About', 'about'],
  ['contact.html', 'Contact', 'contact'],
];

const LOGO = `<a class="logo" href="index.html" aria-label="Aamstrand home">
  <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
  <path d="M8 26c6-12 18-12 24 0M8 14c6 12 18 12 24 0" fill="none" stroke="var(--hemp)" stroke-width="3" stroke-linecap="round"/></svg>
  <span><strong>AAMSTRAND</strong><small>Ropes &amp; Twines</small></span></a>`;

function renderChrome() {
  const page = document.body.dataset.page;
  const header = $('#site-header');
  if (header) {
    header.innerHTML = `
      <div class="topbar"><div class="wrap">
        <span>Serving customers since 1965 · Manteno, Illinois</span>
        <span><a href="tel:18003380557">Toll-free ${COMPANY.tollFree}</a><a href="catalogs.html" class="hide-sm">Download catalog</a></span>
      </div></div>
      <div class="wrap nav-row">
        ${LOGO}
        <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Menu"><span></span><span></span><span></span></button>
        <nav id="primary-nav" class="primary-nav">
          ${NAV.map(([href, label, key]) => `<a href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
          <a class="btn btn-accent" href="contact.html#quote">Request a Quote</a>
        </nav>
      </div>`;
    const toggle = $('.nav-toggle', header);
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
    });
    $('#primary-nav', header).addEventListener('click', (e) => {
      if (!e.target.closest('a')) return;
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  const footer = $('#site-footer');
  if (footer) {
    const cats = Object.entries(CATEGORIES).map(([k, c]) => `<li><a href="products.html?cat=${k}">${c.label}</a></li>`).join('');
    const inds = Object.entries(INDUSTRIES).slice(0, 6).map(([k, v]) => `<li><a href="products.html?use=${k}">${v}</a></li>`).join('');
    footer.innerHTML = `
      <div class="wrap footer-grid">
        <div>${LOGO}
          <p class="muted">Rope, cord and twine for commercial, industrial, marine and agricultural customers since 1965.</p>
        </div>
        <div><h4>Products</h4><ul>${cats}<li><a href="catalogs.html">Catalogs &amp; spec sheets</a></li></ul></div>
        <div><h4>Industries</h4><ul>${inds}</ul></div>
        <div><h4>Contact</h4>
          <address>${COMPANY.street}<br>${COMPANY.city}</address>
          <p><a href="tel:18154682100">${COMPANY.phone}</a><br><a href="tel:18003380557">${COMPANY.tollFree} toll-free</a></p>
          <a class="btn btn-accent btn-sm" href="contact.html#quote">Request a Quote</a>
        </div>
      </div>
      <div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} ${COMPANY.name}</span><span>Draft redesign — not for publication</span></div>`;
  }
}

/* ---------- Cards ---------- */

function productCard(p) {
  return `<a class="product-card" href="product.html?id=${p.id}">
    <div class="product-card__img">${ropeIcon(p.construction)}</div>
    <div class="product-card__body">
      <span class="eyebrow">${CATEGORIES[p.category].label} · ${MATERIALS[p.material].label}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
      <span class="link-arrow">View specs</span>
    </div></a>`;
}

/* ---------- Catalog page ---------- */

function initCatalog() {
  const grid = $('#catalog-grid');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const state = {
    cat: params.get('cat') || 'all',
    mat: params.get('mat') || 'all',
    use: params.get('use') || 'all',
    q: '',
  };

  $('#cat-tabs').innerHTML = [['all', 'All products'], ...Object.entries(CATEGORIES).map(([k, c]) => [k, c.label])]
    .map(([k, l]) => `<button role="tab" data-cat="${k}">${l}</button>`).join('');
  $('#mat-filter').innerHTML = `<option value="all">All materials</option>` +
    Object.entries(MATERIALS).map(([k, m]) => `<option value="${k}">${m.label}</option>`).join('');
  $('#use-filter').innerHTML = `<option value="all">All industries</option>` +
    Object.entries(INDUSTRIES).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
  $('#mat-filter').value = state.mat;
  $('#use-filter').value = state.use;

  function render() {
    $$('#cat-tabs button').forEach((b) => b.setAttribute('aria-selected', b.dataset.cat === state.cat));
    const q = state.q.toLowerCase();
    const list = PRODUCTS.filter((p) =>
      (state.cat === 'all' || p.category === state.cat) &&
      (state.mat === 'all' || p.material === state.mat) &&
      (state.use === 'all' || p.uses.includes(state.use)) &&
      (!q || (p.name + ' ' + p.desc).toLowerCase().includes(q)));
    const blurb = state.cat === 'all'
      ? 'Braided and twisted rope, twine, cord and specialty lines, put up in any format you need.'
      : CATEGORIES[state.cat].blurb;
    $('#cat-blurb').textContent = blurb;
    $('#result-count').textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
    grid.innerHTML = list.length ? list.map(productCard).join('')
      : `<div class="empty">No products match those filters. <button class="text-btn" id="reset">Clear filters</button> or <a href="contact.html#quote">ask us about a custom build</a>.</div>`;
    const reset = $('#reset');
    if (reset) reset.onclick = () => { Object.assign(state, { cat: 'all', mat: 'all', use: 'all', q: '' }); $('#mat-filter').value = 'all'; $('#use-filter').value = 'all'; $('#search').value = ''; render(); };
    const url = new URLSearchParams();
    if (state.cat !== 'all') url.set('cat', state.cat);
    if (state.mat !== 'all') url.set('mat', state.mat);
    if (state.use !== 'all') url.set('use', state.use);
    history.replaceState(null, '', url.toString() ? `?${url}` : location.pathname);
  }

  // After a tab or filter change, if the visitor had scrolled down into the old
  // results, bring the top of the new results back into view under the sticky bars.
  function showResults() {
    const blurb = $('#cat-blurb');
    const bar = $('.catalog-bar');
    const barH = getComputedStyle(bar).position === 'sticky' ? bar.offsetHeight : 0;
    const offset = headerHeight() + barH;
    if (blurb.getBoundingClientRect().top < offset) {
      blurb.style.scrollMarginTop = `${offset}px`;
      blurb.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }

  $('#cat-tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { state.cat = b.dataset.cat; render(); showResults(); } });
  $('#mat-filter').addEventListener('change', (e) => { state.mat = e.target.value; render(); showResults(); });
  $('#use-filter').addEventListener('change', (e) => { state.use = e.target.value; render(); showResults(); });
  $('#search').addEventListener('input', (e) => { state.q = e.target.value; render(); });
  render();
}

/* ---------- Home: category tiles & rope finder ---------- */

function initHome() {
  const tiles = $('#category-tiles');
  if (tiles) {
    const iconFor = { braided: 'double', twisted: 'twisted', twine: 'twine', specialty: 'kernmantle' };
    tiles.innerHTML = Object.entries(CATEGORIES).map(([k, c]) => {
      const n = PRODUCTS.filter((p) => p.category === k).length;
      return `<a class="cat-tile" href="products.html?cat=${k}">
        ${ropeIcon(iconFor[k])}
        <h3>${c.label}</h3><p>${c.blurb}</p>
        <span class="link-arrow">${n} products</span></a>`;
    }).join('');
  }

  const finder = $('#finder');
  if (!finder) return;
  const priorityMaterials = {
    shock: ['nylon'],
    lowstretch: ['polyester'],
    floats: ['polypropylene'],
    natural: ['natural'],
    budget: ['polypropylene', 'blend'],
  };
  $('#finder-use').innerHTML = Object.entries(INDUSTRIES).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');

  function run() {
    const use = $('#finder-use').value;
    const pri = $('input[name="priority"]:checked', finder).value;
    const mats = priorityMaterials[pri];
    let list = PRODUCTS.filter((p) => p.uses.includes(use) && mats.includes(p.material));
    if (!list.length) list = PRODUCTS.filter((p) => p.uses.includes(use)).slice(0, 3);
    $('#finder-results').innerHTML = list.slice(0, 4).map((p) => `
      <a class="finder-hit" href="product.html?id=${p.id}">${ropeIcon(p.construction)}
        <span><strong>${esc(p.name)}</strong><small>${MATERIALS[p.material].label} · ${CATEGORIES[p.category].label}</small></span></a>`).join('') +
      `<a class="link-arrow finder-more" href="products.html?use=${use}">See everything for ${INDUSTRIES[use]}</a>`;
  }
  finder.addEventListener('change', run);
  run();
}

/* ---------- Product detail page ---------- */

function meter(label, value, hint) {
  return `<div class="meter"><div class="meter__label"><span>${label}</span><small>${hint}</small></div>
    <div class="meter__bar" role="meter" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${value}" aria-label="${label}">
    ${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= value ? 'on' : ''}"></i>`).join('')}</div></div>`;
}

function initProduct() {
  const root = $('#product');
  if (!root) return;
  const id = new URLSearchParams(location.search).get('id');
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS.find((x) => x.id === 'double-braid-nylon');
  const m = MATERIALS[p.material];
  const cat = CATEGORIES[p.category];
  document.title = `${p.name} | Aamstrand Ropes & Twines`;

  const related = PRODUCTS.filter((x) => x.id !== p.id && (x.category === p.category || x.material === p.material)).slice(0, 3);
  const diameters = p.category === 'twine' ? ['#12', '#18', '#24', '#36'] : ['3/16"', '1/4"', '3/8"', '1/2"', '5/8"', '3/4"'];

  root.innerHTML = `
    <nav class="crumbs wrap" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="products.html">Products</a><span>/</span><a href="products.html?cat=${p.category}">${cat.label}</a><span>/</span><span aria-current="page">${esc(p.name)}</span></nav>
    <section class="wrap product-hero">
      <div class="product-hero__media">${ropeIcon(p.construction)}<span class="photo-note">Product photo placeholder</span></div>
      <div>
        <span class="eyebrow">${cat.label} · ${m.label}</span>
        <h1>${esc(p.name)}</h1>
        <p class="lead">${esc(p.desc)}</p>
        <div class="tags">${p.uses.map((u) => `<a class="tag" href="products.html?use=${u}">${INDUSTRIES[u]}</a>`).join('')}</div>
        <div class="meters">
          ${meter('Strength', m.traits.strength, 'relative to other fibers')}
          ${meter('Stretch', m.traits.stretch, 'higher = more shock absorption')}
          ${meter('UV resistance', m.traits.uv, 'for outdoor use')}
        </div>
        <p class="muted small">${m.traits.floats ? 'Floats in water.' : 'Does not float.'} ${esc(m.summary)}</p>
        <div class="btn-row">
          <a class="btn btn-accent" href="contact.html?product=${p.id}#quote">Request a quote</a>
          <a class="btn btn-ghost" href="catalogs.html">Download spec sheet</a>
        </div>
      </div>
    </section>

    <section class="wrap section-sm">
      <div class="section-head"><h2>Specifications</h2>
        <p class="muted">Sample values shown until the published catalog figures are added. Other sizes and colors are available on request.</p></div>
      <div class="table-scroll"><table class="spec-table">
        <thead><tr><th>${p.category === 'twine' ? 'Size' : 'Diameter'}</th><th>Avg. breaking strength (lbs)</th><th>Weight (lbs / 100 ft)</th><th>Standard put-ups</th></tr></thead>
        <tbody>${diameters.map((d) => `<tr><td>${d}</td><td class="tbd">TBD</td><td class="tbd">TBD</td><td>Coil · Reel · Hank</td></tr>`).join('')}</tbody>
      </table></div>
      <p class="small muted">Working load limits are typically a fraction of breaking strength. Always check the rated working load for your application.</p>
    </section>

    <section class="wrap section-sm">
      <div class="section-head"><h2>Packaging options</h2></div>
      <ul class="putups">
        ${['Bulk reels', 'Coils', 'Hanks', 'Mini coils', 'Spools & tubes', 'Center-pull', 'Cones & balls', 'Shrink wrap / poly bag', 'Private label'].map((x) => `<li>${x}</li>`).join('')}
      </ul>
    </section>

    <section class="wrap section-sm">
      <div class="section-head"><h2>Related products</h2></div>
      <div class="product-grid">${related.map(productCard).join('')}</div>
    </section>`;
}

/* ---------- Contact / quote form ---------- */

function initQuote() {
  const form = $('#quote-form');
  if (!form) return;
  const sel = $('#q-product');
  sel.innerHTML = `<option value="">Select a product (optional)</option>` +
    Object.entries(CATEGORIES).map(([k, c]) => `<optgroup label="${c.label}">${PRODUCTS.filter((p) => p.category === k).map((p) => `<option value="${p.id}">${p.name}</option>`).join('')}</optgroup>`).join('') +
    `<option value="custom">Custom / not listed</option>`;
  const pre = new URLSearchParams(location.search).get('product');
  if (pre) sel.value = pre;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    // Draft: no backend yet. Hand off to the visitor's email client.
    const data = new FormData(form);
    const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join('\n');
    location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent('Quote request — ' + (data.get('company') || data.get('name')))}&body=${encodeURIComponent(body)}`;
    $('#quote-thanks').hidden = false;
  });
}

/* ---------- Scroll position on page load ---------- */

function headerHeight() {
  const header = $('#site-header');
  return header ? header.offsetHeight : 0;
}

function syncHeaderHeight() {
  document.documentElement.style.setProperty('--header-h', `${headerHeight()}px`);
}

// Back/forward and refresh keep the browser's normal behavior (return to where you were).
const navType = performance.getEntriesByType('navigation')[0]?.type;
const restoringScroll = navType === 'back_forward' || navType === 'reload';

// Stop re-applying the initial position once the visitor starts scrolling.
let userScrolled = false;
['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((type) =>
  window.addEventListener(type, () => { userScrolled = true; }, { once: true, passive: true }));

// Every page opens at the top, or at the section named in the URL (#industries,
// #custom, #quote). The header and page content are rendered by this script,
// so the browser's own jump happens before layout settles. Re-apply it once
// rendering is done and again after fonts load. scrollIntoView is used rather
// than window.scrollTo so it also works when the site is shown inside a frame.
function setInitialScroll() {
  if (restoringScroll || userScrolled) return;
  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  (target || document.body).scrollIntoView({ block: 'start', behavior: 'instant' });
}

document.addEventListener('DOMContentLoaded', () => {
  renderChrome();
  initHome();
  initCatalog();
  initProduct();
  initQuote();
  syncHeaderHeight();
  setInitialScroll();
});

window.addEventListener('load', () => { syncHeaderHeight(); setInitialScroll(); });
window.addEventListener('resize', syncHeaderHeight);
