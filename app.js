/* REVITALIS – náhľad webu s e-shopom (WebHunter 2026) */
(() => {
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const eur = n => n.toLocaleString('sk-SK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
const ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>';
const ICON_ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* ---------- produkty (z revitalis.sk/produkty a /navleky-do-vody) ---------- */
const CATS = { navleky: 'Návleky do vody', sedenie: 'Sedenie a chrbát', balans: 'Balančné pomôcky', lit: 'Literatúra a DVD' };
const P = [
  { id: 'drypro-ruka', cat: 'navleky', name: 'DryPro™ návlek – horná končatina', price: 53, tag: 'Najžiadanejšie',
    img: ['img/p-drypro-predlaktie.jpg', 'img/p-drypro-ruka.png', 'img/velkosti-horna.jpg'],
    desc: 'S vodeodolným návlekom DryPro™ sa môžete sprchovať, kúpať, plávať aj potápať bez obáv z namočenia sadry či poranenia. Vhodný po operáciách, pri zlomeninách a zraneniach, pri ktorých je zakázaný kontakt s vodou. Nasadíte ho za pár sekúnd, vodotesnosť je 100 %.',
    variants: [
      { k: 'HA-13', l: 'Predlaktie S', o: '20–25', d: 44, part: 'predlaktie' },
      { k: 'HA-15', l: 'Predlaktie L', o: '25+', d: 50, part: 'predlaktie' },
      { k: 'FA-12', l: 'Celá paža XS', o: '15–17', d: 40, part: 'paza' },
      { k: 'FA-14', l: 'Celá paža S', o: '17–22', d: 58, part: 'paza' },
      { k: 'FA-16', l: 'Celá paža M', o: '22–25', d: 71, part: 'paza' },
      { k: 'FA-18', l: 'Celá paža L', o: '25+', d: 80, part: 'paza' } ] },
  { id: 'drypro-noha', cat: 'navleky', name: 'DryPro™ návlek – dolná končatina', price: 53,
    img: ['img/p-drypro-noha.jpg', 'img/velkosti-dolna.jpg', 'img/navlek-bazen.jpg'],
    desc: 'Návlek z kvalitného medicínskeho latexu s protišmykovou úpravou podrážky Non-Skid Grid™. Vďaka odsávaniu vzduchu vytvorí nepriedušné vákuum, takže s ním môžete aj plávať. Ihneď po zákroku tak môžete začať vodoliečbu a urýchliť rekonvalescenciu.',
    variants: [
      { k: 'HL-13', l: 'Lýtko S', o: '25–33', d: 53, part: 'lytko' },
      { k: 'HL-15', l: 'Lýtko L', o: '33+', d: 60, part: 'lytko' },
      { k: 'FL-12', l: 'Celá noha XS', o: '19–28', d: 48, part: 'noha' },
      { k: 'FL-14', l: 'Celá noha S', o: '35–41', d: 74, part: 'noha' },
      { k: 'FL-16', l: 'Celá noha M', o: '41–53', d: 83, part: 'noha' },
      { k: 'FL-18', l: 'Celá noha L', o: '53+', d: 94, part: 'noha' } ] },
  { id: 'dvd', cat: 'lit', name: 'DVD „Škola chrbta“', price: 11.9, tier: { from: 10, price: 9 }, tag: 'Od Lucie Mercekovej', tagL: true,
    img: ['img/p-dvd.jpg'],
    desc: 'Manuál pre používateľov chrbtice, výsledok 25-ročnej praxe fyzioterapeutky Lucie Mercekovej. Rýchla pomoc v akútnom bolestivom stave, ergonómia sedu v práci, výber vhodnej pomôcky a vybrané cvičenia pre krčnú a krížovú chrbticu. Pri 10 a viac kusoch 9 € za kus.' },
  { id: 'opierka', cat: 'sedenie', name: 'Drieková opierka', price: 22,
    img: ['img/p-opierka.jpg'],
    desc: 'Nastaví operadlo v aute či na kancelárskej stoličke do optimálneho tvaru. Podoprie driekovú chrbticu v správnom prehnutí, odľahčí medzistavcové platničky a napriami celú chrbticu. Upína sa popruhom okolo operadla.' },
  { id: 'klin', cat: 'sedenie', name: 'Sedací klin', price: 20,
    img: ['img/p-klin.jpg'],
    desc: 'Dorovná chýbajúci ergonomický sklon sedacej plochy. Panva sa fyziologicky naklopí dopredu a chrbtica sa vzpriami bez vedomého úsilia. Pôsobí preventívne proti bolesti krížov a aktivuje chrbtové aj brušné svalstvo.' },
  { id: 'dynasit', cat: 'sedenie', name: 'Dynasit®', price: 20,
    img: ['img/p-dynasit.jpg'],
    desc: 'Rehabilitačná a preventívna pomôcka, ktorá pri sedení nahrádza veľkú loptu. Mení statický sed na dynamický, aktivuje stabilizátory chrbtice a posilňuje svalstvo panvového dna.' },
  { id: 'propriofoot', cat: 'balans', name: 'Propriofoot®', price: 75,
    img: ['img/p-propriofoot.jpg'],
    desc: 'Nestabilné plošky pri poruchách priečnej a pozdĺžnej klenby nohy. Zvyšujú kĺbovú mobilitu chodidla, posilňujú svaly nohy a pôsobia aj na stabilizátory bedrového kĺbu a trupu. Skladné a nenáročné na priestor.' },
  { id: 'balancefit', cat: 'balans', name: 'Balancefit®', price: 29,
    img: ['img/p-balancefit.jpg'],
    desc: 'Okrúhla podložka pre náročnejšie balančné a stabilizačné cvičenia. Zapojí všetky stabilizátory kĺbov a chrbtice, dobre sa kombinuje so silovým náradím.' },
  { id: 'balancepad', cat: 'balans', name: 'Balancefit pad®', price: 40,
    img: ['img/p-balancepad.jpg'],
    desc: 'Obdĺžniková podložka s ľahšou formou nestability. Obľúbená u starších ľudí a detí, buduje koordináciu a pomáha predchádzať pádom pri pošmyknutí.' },
  { id: 'kniha-driek', cat: 'lit', name: 'Léčime si záda sami', sub: 'Robin McKenzie', price: 9.5,
    img: ['img/p-kniha-driek.jpg'],
    desc: 'Pre všetkých, ktorým sa bolesti krížov vracajú. Možnosti prevencie aj autoterapeutické postupy metódy McKenzie.' },
  { id: 'kniha-krk', cat: 'lit', name: 'Léčime si bolesti krční páteře sami', sub: 'Robin McKenzie', price: 8.5,
    img: ['img/p-kniha-krk.jpg'],
    desc: 'O príčinách bolesti krčnej chrbtice a hlavne o možnostiach autoterapie a prevencie.' },
  { id: 'kniha-rameno', cat: 'lit', name: 'Léčime si rameno sami', sub: 'Robin McKenzie', price: 8.5,
    img: ['img/p-kniha-rameno.jpg'],
    desc: 'Ako vlastnou aktivitou liečiť bolesť ramena, predchádzať recidívam a rozoznať, či bolesť nepochádza z krčnej chrbtice.' },
  { id: 'kniha-koleno', cat: 'lit', name: 'Léčime si koleno sami', sub: 'Robin McKenzie', price: 8.5,
    img: ['img/p-kniha-koleno.jpg'],
    desc: 'Štvrtá príručka metódy McKenzie: ako rýchlo a účinne liečiť bolesť kolena a ako predísť jej návratu.' }
];
const byId = id => P.find(p => p.id === id);
const unitPrice = (p, q) => (p.tier && q >= p.tier.from ? p.tier.price : p.price);

/* ---------- košík (localStorage) ---------- */
const KEY = 'revitalis-kosik';
let cart = [];
try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} renderCart(); };
const cartCount = () => cart.reduce((a, i) => a + i.q, 0);
const cartTotal = () => cart.reduce((a, i) => { const p = byId(i.id); return p ? a + unitPrice(p, i.q) * i.q : a; }, 0);
function addToCart(id, v, q = 1) {
  const ex = cart.find(i => i.id === id && i.v === v);
  if (ex) ex.q += q; else cart.push({ id, v, q });
  save();
  const b = $('.cart-btn'); if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  const p = byId(id);
  toast(`<span>Pridané do košíka: <b>${p.name}${v ? ' · ' + v : ''}</b></span><button data-open-cart>Zobraziť</button>`);
}

/* ---------- spoločné prvky (modál, košík, toast) ---------- */
document.body.insertAdjacentHTML('beforeend', `
<div class="modal" id="pmodal" aria-hidden="true"><div class="modal__bg" data-close></div>
  <div class="modal__box" role="dialog" aria-modal="true" aria-label="Detail produktu"><button class="modal__x" data-close aria-label="Zavrieť">×</button>
  <div class="modal__gal"><div class="modal__main"><img alt=""></div><div class="modal__thumbs"></div></div>
  <div class="modal__b"></div></div></div>
<div class="drawer" id="drawer" aria-hidden="true"><div class="drawer__bg" data-close-cart></div>
  <aside class="drawer__p" role="dialog" aria-label="Košík"><div class="drawer__h"><h3>Košík</h3><button data-close-cart aria-label="Zavrieť">×</button></div>
  <div class="steps"><span class="is-on">1. Košík</span><span>2. Doručenie a platba</span><span>3. Hotovo</span></div>
  <div class="drawer__body"></div><div class="drawer__f"></div></aside></div>
<div class="toast" role="status"></div>`);

let tTimer;
function toast(html) {
  const t = $('.toast'); t.innerHTML = html; t.classList.add('is-on');
  clearTimeout(tTimer); tTimer = setTimeout(() => t.classList.remove('is-on'), 3200);
}

/* karta produktu */
function cardHTML(p, i = 0) {
  const pr = p.variants ? `<small>od </small>${eur(p.price)}` : eur(p.price);
  return `<article class="pcard" style="animation-delay:${i * 50}ms">
    <div class="pcard__img" data-open="${p.id}"><img src="${p.img[0]}" alt="${p.name}" loading="lazy">${p.tag ? `<span class="pcard__tag${p.tagL ? ' pcard__tag--l' : ''}">${p.tag}</span>` : ''}</div>
    <div class="pcard__b"><span class="pcard__cat">${CATS[p.cat]}${p.variants ? ' · ' + p.variants.length + ' veľkostí' : ''}</span>
    <h3 data-open="${p.id}">${p.name}</h3>${p.sub ? `<small style="color:var(--muted);font-size:.82rem">${p.sub}</small>` : ''}
    <div class="pcard__f"><span class="pcard__p">${pr}</span><button class="pcard__add" data-${p.variants ? 'open' : 'add'}="${p.id}" aria-label="Pridať do košíka">${ICON_PLUS}</button></div></div></article>`;
}

/* detail produktu */
let cur = null, curV = null;
function openProduct(id) {
  const p = byId(id); if (!p) return;
  cur = p; curV = p.variants ? null : '';
  const m = $('#pmodal');
  $('.modal__main img', m).src = p.img[0]; $('.modal__main img', m).alt = p.name;
  $('.modal__thumbs', m).innerHTML = p.img.length > 1 ? p.img.map((s, i) => `<button class="${i ? '' : 'is-on'}" data-thumb="${s}"><img src="${s}" alt=""></button>`).join('') : '';
  let opts = '';
  if (p.variants) {
    const lim = p.cat === 'navleky' && p.id === 'drypro-ruka' ? [['predlaktie', 'Predlaktie'], ['paza', 'Celá paža']] : [['lytko', 'Lýtko'], ['noha', 'Celá noha']];
    opts = `<div class="opt"><h4>Veľkosť</h4><div class="opt__grp">${p.variants.map(v => `<button data-var="${v.k}">${v.l}</button>`).join('')}</div><div class="opt__meta">Vyberte veľkosť alebo si ju nechajte odporučiť nižšie.</div></div>
    <div class="finder"><b>Neviete, akú veľkosť? Odmerajte obvod.</b>
      <div class="finder__row"><select data-f-part>${lim.map(l => `<option value="${l[0]}">${l[1]}</option>`).join('')}</select>
      <input type="number" min="10" max="80" step="0.5" placeholder="obvod" data-f-cm aria-label="Obvod v cm"><span>cm</span></div>
      <div class="finder__out" data-f-out></div></div>
    <details class="more-info"><summary>Tabuľka veľkostí</summary><table class="sizes"><thead><tr><th>Veľkosť</th><th>Ozn.</th><th>Obvod (cm)</th><th>Dĺžka (cm)</th></tr></thead><tbody>${p.variants.map(v => `<tr data-row="${v.k}"><td>${v.l}</td><td>${v.k}</td><td>${v.o}</td><td>${v.d}</td></tr>`).join('')}</tbody></table></details>`;
  }
  $('.modal__b', m).innerHTML = `<span class="eyebrow">${CATS[p.cat]}</span><h2>${p.name}</h2>${p.sub ? `<p class="modal__small" style="margin:-.5rem 0 0">${p.sub}</p>` : ''}
    <div class="modal__price" data-mprice>${eur(p.price)}${p.tier ? `<small>od ${p.tier.from} ks ${eur(p.tier.price)}/ks</small>` : ''}</div>
    <p class="modal__desc">${p.desc}</p>${opts}
    <div class="modal__buy"><div class="qty"><button data-q="-1" aria-label="Menej">−</button><input type="number" value="1" min="1" data-qty aria-label="Počet"><button data-q="1" aria-label="Viac">+</button></div>
    <button class="btn btn--blue" data-buy>Pridať do košíka ${ICON_ARR}</button></div>
    <p class="modal__small">Osobný odber v REVITALIS-e na Rínku Rača alebo doručenie na adresu. Na pomôcku Vám radi poradíme aj osobne.</p>`;
  m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
}
function closeProduct() { const m = $('#pmodal'); m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = ''; }
function pickVariant(k) {
  if (!cur || !cur.variants) return;
  curV = k; const v = cur.variants.find(x => x.k === k);
  $$('#pmodal [data-var]').forEach(b => b.classList.toggle('is-on', b.dataset.var === k));
  $$('#pmodal [data-row]').forEach(r => r.classList.toggle('is-on', r.dataset.row === k));
  $('#pmodal .opt__meta').textContent = `${v.k} · obvod ${v.o} cm · dĺžka ${v.d} cm`;
}
function findSize() {
  const part = $('#pmodal [data-f-part]').value, cm = parseFloat($('#pmodal [data-f-cm]').value), out = $('#pmodal [data-f-out]');
  if (!cm) { out.textContent = ''; return; }
  const fit = cur.variants.filter(v => v.part === part).find(v => {
    const [a, b] = v.o.replace('+', '–999').split('–').map(Number); return cm >= a && cm <= b;
  });
  if (fit) { pickVariant(fit.k); out.textContent = `Odporúčame: ${fit.l} (${fit.k})`; }
  else out.textContent = 'Na tento obvod Vám veľkosť radi poradíme e-mailom.';
}

/* vykreslenie košíka */
let step = 1;
function renderCart() {
  $$('.cart-btn__n').forEach(n => { const c = cartCount(); n.textContent = c; n.classList.toggle('is-on', c > 0); });
  const body = $('#drawer .drawer__body'), foot = $('#drawer .drawer__f');
  $$('#drawer .steps span').forEach((s, i) => s.classList.toggle('is-on', i < step));
  if (step === 3) return;
  if (!cart.length) {
    body.innerHTML = `<div class="empty"><b>Košík je zatiaľ prázdny</b>Vyberte si z pomôcok, ktoré sme overili v praxi.</div>`;
    foot.innerHTML = `<a class="btn btn--blue" href="obchod.html">Prejsť do e-shopu ${ICON_ARR}</a>`; return;
  }
  const total = cartTotal();
  if (step === 1) {
    body.innerHTML = cart.map((i, n) => { const p = byId(i.id); if (!p) return ''; const up = unitPrice(p, i.q);
      return `<div class="citem"><img src="${p.img[0]}" alt=""><div><h4>${p.name}</h4><small>${i.v ? i.v + ' · ' : ''}${eur(up)}/ks</small>
      <div class="qty" style="margin-top:.4rem"><button data-cq="${n}" data-d="-1">−</button><input value="${i.q}" readonly><button data-cq="${n}" data-d="1">+</button></div></div>
      <div class="citem__r"><b>${eur(up * i.q)}</b><button data-rm="${n}">odstrániť</button></div></div>`; }).join('');
    foot.innerHTML = `<div class="sum"><span>Medzisúčet</span><span>${eur(total)}</span></div><div class="sum"><span>Doprava</span><span>v ďalšom kroku</span></div>
      <div class="sum sum--t"><span>Spolu</span><span>${eur(total)}</span></div><button class="btn btn--blue" data-step="2">Pokračovať k doručeniu ${ICON_ARR}</button>`;
  } else {
    body.innerHTML = `<form class="form" style="padding:0;box-shadow:none" id="checkout">
      <div class="field"><label>Doručenie</label><div class="radio">
        <label><input type="radio" name="dor" value="odber" checked><span>Osobný odber v REVITALIS-e<small>Rínok Rača, Rudroffova 3, Bratislava · zdarma</small></span></label>
        <label><input type="radio" name="dor" value="adresa"><span>Doručenie na adresu<small>kuriérom, cenu dopravy nastavíme podľa Vás</small></span></label></div></div>
      <div class="field"><label>Platba</label><div class="radio">
        <label><input type="radio" name="pl" value="prevod" checked><span>Bankovým prevodom<small>údaje k platbe prídu e-mailom</small></span></label>
        <label><input type="radio" name="pl" value="odber"><span>Pri osobnom odbere</span></label></div></div>
      <div class="row2"><div class="field"><label for="c-m">Meno a priezvisko</label><input id="c-m" required autocomplete="name"></div>
      <div class="field"><label for="c-e">E-mail</label><input id="c-e" type="email" required autocomplete="email"></div></div>
      <div class="field" data-adr hidden><label for="c-a">Adresa doručenia</label><input id="c-a" autocomplete="street-address"></div>
      <div class="field"><label for="c-p">Poznámka</label><textarea id="c-p" rows="2" style="min-height:70px"></textarea></div>
      <label class="check"><input type="checkbox" required> Súhlasím s obchodnými podmienkami a spracovaním osobných údajov.</label></form>`;
    foot.innerHTML = `<div class="sum"><span>${cartCount()} ks</span><span>${eur(total)}</span></div><div class="sum sum--t"><span>Spolu</span><span>${eur(total)}</span></div>
      <button class="btn" data-order>Odoslať objednávku ${ICON_ARR}</button><button class="modal__small" data-step="1" style="justify-self:center;text-decoration:underline">späť do košíka</button>`;
  }
}
function openCart() { step = 1; renderCart(); const d = $('#drawer'); d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false'); document.documentElement.style.overflow = 'hidden'; }
function closeCart() { const d = $('#drawer'); d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = ''; if (step === 3) { step = 1; renderCart(); } }

/* udalosti */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open],[data-add],[data-close],[data-thumb],[data-var],[data-q],[data-buy],[data-open-cart],[data-close-cart],[data-cq],[data-rm],[data-step],[data-order],.cart-btn');
  if (!t) return;
  if (t.matches('.cart-btn,[data-open-cart]')) { e.preventDefault(); closeProduct(); openCart(); }
  else if (t.dataset.open) { e.preventDefault(); openProduct(t.dataset.open); }
  else if (t.dataset.add) addToCart(t.dataset.add, '');
  else if (t.hasAttribute('data-close')) closeProduct();
  else if (t.dataset.thumb) { $('#pmodal .modal__main img').src = t.dataset.thumb; $$('#pmodal [data-thumb]').forEach(b => b.classList.toggle('is-on', b === t)); }
  else if (t.dataset.var) pickVariant(t.dataset.var);
  else if (t.dataset.q) { const i = $('#pmodal [data-qty]'); i.value = Math.max(1, (+i.value || 1) + +t.dataset.q);
    if (cur.tier) $('#pmodal [data-mprice]').firstChild.textContent = eur(unitPrice(cur, +i.value)); }
  else if (t.hasAttribute('data-buy')) {
    if (cur.variants && !curV) { const m = $('#pmodal .opt__meta'); m.textContent = 'Vyberte, prosím, veľkosť.'; m.style.color = 'var(--lilac-d)'; return; }
    const v = cur.variants ? cur.variants.find(x => x.k === curV).l + ' (' + curV + ')' : '';
    addToCart(cur.id, v, Math.max(1, +$('#pmodal [data-qty]').value || 1)); closeProduct();
  }
  else if (t.hasAttribute('data-close-cart')) closeCart();
  else if (t.dataset.cq) { const it = cart[+t.dataset.cq]; it.q = Math.max(1, it.q + +t.dataset.d); save(); }
  else if (t.dataset.rm) { cart.splice(+t.dataset.rm, 1); save(); }
  else if (t.dataset.step) { step = +t.dataset.step; renderCart(); }
  else if (t.hasAttribute('data-order')) {
    const f = $('#checkout'); if (!f.reportValidity()) return;
    const no = 'R-2026-' + String(Math.floor(1000 + Math.random() * 9000));
    step = 3; renderCart();
    $('#drawer .drawer__body').innerHTML = `<div class="done"><div class="done__ic"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
      <h4>Ďakujeme za objednávku</h4><p>Objednávka <b>${no}</b> je prijatá. Potvrdenie a ďalšie informácie Vám pošleme e-mailom.</p>
      <p class="modal__small">Toto je náhľad e-shopu, objednávka sa nikam neodoslala.</p></div>`;
    $('#drawer .drawer__f').innerHTML = `<button class="btn btn--ghost" data-close-cart style="justify-content:center">Zavrieť</button>`;
    cart = []; save();
  }
});
document.addEventListener('change', e => {
  if (e.target.name === 'dor') { const a = $('[data-adr]'); if (a) { a.hidden = e.target.value !== 'adresa'; $('#c-a').required = !a.hidden; } }
  if (e.target.matches('[data-f-part]')) findSize();
});
document.addEventListener('input', e => {
  if (e.target.matches('[data-f-cm]')) findSize();
  if (e.target.matches('#pmodal [data-qty]') && cur && cur.tier) $('#pmodal [data-mprice]').firstChild.textContent = eur(unitPrice(cur, +e.target.value || 1));
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeProduct(); closeCart(); } });

/* ---------- e-shop stránka ---------- */
const grid = $('#pgrid');
if (grid) {
  let cat = new URLSearchParams(location.search).get('k') || 'vse', sort = 'odp';
  const draw = () => {
    let list = P.filter(p => cat === 'vse' || p.cat === cat);
    if (sort === 'lac') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'dra') list = [...list].sort((a, b) => b.price - a.price);
    grid.innerHTML = list.map(cardHTML).join('');
    $$('.cats .chip').forEach(c => c.classList.toggle('is-on', c.dataset.cat === cat));
    const n = $('[data-count]'); if (n) n.textContent = list.length;
  };
  $('.cats').innerHTML = `<button class="chip" data-cat="vse">Všetko</button>` + Object.entries(CATS).map(([k, v]) => `<button class="chip" data-cat="${k}">${v}</button>`).join('');
  $('.cats').addEventListener('click', e => { const c = e.target.closest('[data-cat]'); if (c) { cat = c.dataset.cat; draw(); } });
  $('#sort').addEventListener('change', e => { sort = e.target.value; draw(); });
  draw();
}
const teaser = $('#teaser');
if (teaser) teaser.innerHTML = ['drypro-ruka', 'dvd', 'opierka', 'propriofoot'].map((id, i) => cardHTML(byId(id), i)).join('');

renderCart();

/* ---------- hlavička, menu ---------- */
const hdr = $('.hdr');
const onScroll = () => hdr && hdr.classList.toggle('is-scrolled', scrollY > 10);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const mnav = $('.mnav');
$$('[data-burger]').forEach(b => b.addEventListener('click', () => mnav.classList.toggle('is-open')));
if (mnav) $$('a', mnav).forEach(a => a.addEventListener('click', () => mnav.classList.remove('is-open')));

/* ---------- hero: slová ---------- */
const h1 = $('.hero h1');
if (h1) {
  let i = 0;
  const wrap = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(w => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.append(' '); return; }
          const o = document.createElement('span'); o.className = 'w';
          const s = document.createElement('span'); s.textContent = w; s.style.transitionDelay = (0.15 + i++ * 0.06) + 's';
          o.append(s); frag.append(o);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') wrap(n);
    });
  };
  wrap(h1);
  requestAnimationFrame(() => requestAnimationFrame(() => $('.hero').classList.add('is-in')));
}

/* ---------- reveal + počítadlá ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add('is-in'); io.unobserve(en.target);
  if (en.target.dataset.to) count(en.target);
}), { rootMargin: '0px 0px -10% 0px' });
$$('.rv,.clip,[data-to]').forEach(el => io.observe(el));
function count(el) {
  const to = +el.dataset.to, t0 = performance.now(), d = 1600;
  const f = t => { const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 4); el.firstChild.textContent = Math.round(to * e); if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}

/* ---------- sprievodca „S čím Vám môžeme pomôcť?“ ---------- */
const G = {
  chrbat: { img: 'img/mckenzie.jpg', ey: 'Bolesť chrbta, krku, platničky', h: 'Najprv zistíme, <em>odkiaľ</em> bolesť ide.',
    p: 'Na hodinovom vstupnom vyšetrení máte čas povedať všetko podstatné. Pri mechanických poruchách chrbtice a platničiek pracujeme certifikovanou metódou McKenzie, takže zvyčajne odchádzate s presne stanoveným cvičením, ktoré zvládnete aj doma či v práci.',
    li: ['Diagnostika fyzioterapeutom, kineziologický rozbor', 'McKenzie terapia, Neurac® v systéme Redcord®', 'Mäkké a mobilizačné techniky, Pilates'], c: 'Diagnostika fyzioterapeutom · 50 min', pr: '60 €' },
  deti: { img: 'img/deti.jpg', ey: 'Deti, dorast a skolióza', h: 'Cvičenie, ktoré deti <em>baví</em>.',
    p: 'Chybné držanie tela, plochá noha či skolióza podchytené včas sú najlepšou prevenciou neskorších ťažkostí. Cvičenia vedieme formou hry, s rodičmi preberieme aj výber obuvi a korekčné vložky.',
    li: ['Preventívna prehliadka dorastu', 'Fyzioterapia skoliózy', 'Korekčné vložky na plochonožie'], c: 'Preventívna prehliadka dorastu · 50 min', pr: '55 €' },
  sport: { img: 'img/beh.jpg', ey: 'Šport a návrat po zranení', h: 'Späť k športu, <em>bez</em> recidívy.',
    p: 'Zameriavame sa na poúrazové a pooperačné stavy kĺbov a chrbtice. Po fyzioterapii nasleduje funkčný tréning pre Váš konkrétny šport, s priebežným testovaním a analýzou behu.',
    li: ['Terapia športovcov, funkčný tréning', 'Analýza behu', 'Stabilizačný a balančný tréning'], c: 'Individuálna fyzioterapia · 50 min', pr: '45 €' },
  operacia: { img: 'img/terapia.jpg', ey: 'Pred operáciou a po nej', h: 'Pripravení na operáciu, <em>rýchlejšie</em> späť.',
    p: 'Dobrá príprava pred operáciou výrazne uľahčí rekonvalescenciu. Po zákroku pracujeme s jazvou od vybratia stehov, s kondíciou, silou aj koordináciou. A kým nosíte sadru, s návlekom DryPro™ sa môžete aj sprchovať či plávať.',
    li: ['Predoperačná príprava a pooperačná rehabilitácia', 'Manuálna lymfodrenáž', 'Návleky do vody DryPro™ v e-shope'], c: 'Manuálna lymfodrenáž · 60–90 min', pr: '50 €', shop: 'navleky' },
  chodidlo: { img: 'img/stielky.jpg', ey: 'Chodidlo, klenba, stielky', h: 'Stielka na mieru <em>za 1,5 hodiny</em>.',
    p: 'Takmer 20 rokov skúseností s diagnostikou chodidla. Na podoskopickej platni zachytíme obraz aj pohyb chodidla a termoplastickú vložku Vám upravíme hneď na mieste. Z vyšetrenia odchádzate s hotovou stielkou.',
    li: ['Diagnostika chodidla (podologické vyšetrenie)', 'Korekčné termoplastické vložky na mieru', 'Pre deti, dospelých, športovcov aj seniorov'], c: 'Diagnostika chodidla · 50–90 min', pr: '55 €' },
  firmy: { img: 'img/firmy.jpg', ey: 'Pre firmy a organizácie', h: 'Škola chrbta <em>priamo</em> vo Vašej firme.',
    p: 'Ergonomické dni a dni zdravia: krátka prezentácia o príčinách bolesti chrbtice, potom fyzioterapeuti každému zamestnancovi upravia pracovné miesto a pripravia kompenzačné cvičenia podľa jeho záťaže.',
    li: ['Ergonomické dni, dni zdravia', 'Nastavenie pracovného miesta', 'Kompenzačné cvičenia na mieru'], c: 'Rozsah a cena', pr: 'individuálne' }
};
const ans = $('.answer');
if (ans) {
  const show = k => {
    const g = G[k]; if (!g) return;
    $$('.guide .chip').forEach(c => c.classList.toggle('is-on', c.dataset.g === k));
    ans.classList.add('is-swap');
    const box = $('.answer__img', ans), old = $('img', box), nw = new Image();
    nw.src = g.img; nw.alt = ''; nw.className = 'is-out'; box.append(nw);
    const go = () => requestAnimationFrame(() => { nw.classList.remove('is-out'); old.classList.add('is-out'); setTimeout(() => old.remove(), 700); });
    nw.decode ? nw.decode().then(go, go) : (nw.onload = go);
    setTimeout(() => {
      $('.answer__body', ans).innerHTML = `<span class="eyebrow">${g.ey}</span><h3>${g.h}</h3><p>${g.p}</p><ul class="answer__list">${g.li.map(l => `<li>${l}</li>`).join('')}</ul>
      <div class="answer__foot"><span class="answer__price">${g.c}<b>${g.pr}</b></span><span style="display:flex;gap:.6rem;flex-wrap:wrap">${g.shop ? `<a class="btn btn--ghost" href="obchod.html?k=${g.shop}">Návleky v e-shope</a>` : ''}<a class="btn" href="#objednat">Objednať sa ${ICON_ARR}</a></span></div>`;
      ans.classList.remove('is-swap');
    }, 280);
  };
  $('.guide .chips').addEventListener('click', e => { const c = e.target.closest('[data-g]'); if (c) show(c.dataset.g); });
  show('chrbat');
}

/* ---------- služby: náhľad fotky pri kurzore ---------- */
const prev = $('.svc__prev');
if (prev && matchMedia('(hover:hover)').matches) {
  const im = $('img', prev);
  let x = 0, y = 0, raf = 0;
  $$('.svc__row').forEach(r => {
    r.addEventListener('mouseenter', () => { im.src = r.dataset.img; prev.classList.add('is-on'); });
    r.addEventListener('mouseleave', () => prev.classList.remove('is-on'));
  });
  $('.svc__list').addEventListener('mousemove', e => { x = e.clientX + 170; y = e.clientY; if (!raf) raf = requestAnimationFrame(() => { prev.style.left = x + 'px'; prev.style.top = y + 'px'; raf = 0; }); });
}

/* ---------- referencie ---------- */
const R = [
  { q: 'Chcem vyzdvihnúť nielen ich odborný, ale aj ľudský prístup a skutočný záujem o klienta, ochotu a ústretovosť, aká je v našich pomeroch úplnou raritou.', a: 'Andrea B.' },
  { q: 'V Revitalise hneď cítiť, že vám v prvom rade chcú pomôcť a nie len na vás zarobiť. Vysvetlia vám, v čom je problém, prečo to tak je a čo sa s tým dá robiť.', a: 'Michal' },
  { q: 'Ďakujem za „záchranu“ pred operáciou chrbtice v 30-tke. Do týždňa prišla úľava od rok trvajúcej bolesti krížov a po pár týždňoch cvičenia som nový človek.', a: 'X. F.' },
  { q: 'Môžem len odporúčať milý a ľudský prístup, na konci ktorého môžem plnohodnotne a aktívne fungovať bez operácie aj napriek poničeným platničkám.', a: 'Karol K.' }
];
const rq = $('.refs__q');
if (rq) {
  let ri = 0;
  const set = i => { ri = (i + R.length) % R.length; rq.style.opacity = 0; setTimeout(() => { rq.textContent = R[ri].q; $('.refs__by b').textContent = R[ri].a; $('.refs__by small').textContent = `${ri + 1} / ${R.length}`; rq.style.opacity = 1; }, 300); };
  $('[data-rp]').addEventListener('click', () => set(ri - 1));
  $('[data-rn]').addEventListener('click', () => set(ri + 1));
  set(0);
}

/* ---------- cenník: celý ---------- */
const pt = $('[data-ptoggle]');
if (pt) pt.addEventListener('click', () => { const t = $('.ptable'); t.classList.toggle('is-all'); pt.firstChild.textContent = t.classList.contains('is-all') ? 'Skryť ' : 'Celý cenník '; });

/* ---------- objednávací formulár (náhľad) ---------- */
const bf = $('#bookform');
if (bf) bf.addEventListener('submit', e => { e.preventDefault(); bf.classList.add('is-sent'); bf.reset(); });
})();
