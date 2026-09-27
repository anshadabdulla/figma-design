/*!
 * Restaurant AI Ordering Agent — Grill House WhatsApp ordering prototype
 * Built by Ads n' Codes · adsncodes.com · hello@adsncodes.com · +971 565440310
 * © 2026 Ads n' Codes. All rights reserved. Unauthorized copying, redistribution
 * or resale of this design and code, in whole or in part, is prohibited.
 */
(() => {
  'use strict';

  /* ================= ICONS ================= */
  const I = {
    back:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H4.5M10.5 5.5 4 12l6.5 6.5"/></svg>',
    video:'<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="2.5" y="6" width="13.5" height="12" rx="2.5"/><path d="m16 10.2 5.5-3.2v10l-5.5-3.2z"/></svg>',
    phone:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5.3 3.2h3.3l1.6 4.4-2.2 1.5a11.5 11.5 0 0 0 6.9 6.9l1.5-2.2 4.4 1.6v3.3c0 1-.8 1.8-1.8 1.8C10.6 20.5 3.5 13.4 3.5 5c0-1 .8-1.8 1.8-1.8z"/></svg>',
    kebab:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="12" cy="19" r="1.9"/></svg>',
    verified:'<svg width="17" height="17" viewBox="0 0 24 24"><path fill="#25D366" d="m12 1.5 2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3-1-3 2.6-1.9 1-3 3.2.1z"/><path d="m7.8 12.2 2.9 2.9 5.6-5.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    emoji:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.3"/><circle cx="9" cy="10" r=".6" fill="currentColor"/><circle cx="15" cy="10" r=".6" fill="currentColor"/><path d="M8 14.2c1 1.5 2.3 2.2 4 2.2s3-.7 4-2.2" stroke-linecap="round"/></svg>',
    clip:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m20 11.4-8.2 8.2a5.3 5.3 0 0 1-7.5-7.5l8.6-8.6a3.5 3.5 0 0 1 5 5l-8.6 8.6a1.8 1.8 0 0 1-2.5-2.5l7.9-7.9"/></svg>',
    camera:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 8.2c0-1.1.9-2 2-2h2.2L8.9 4h6.2l1.7 2.2H19c1.1 0 2 .9 2 2V18c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2z"/><circle cx="12" cy="13" r="3.8"/></svg>',
    mic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><rect x="8.6" y="2.5" width="6.8" height="12" rx="3.4"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/><path d="M12 18v3.2" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/></svg>',
    sendArrow:'<svg width="23" height="23" viewBox="0 0 24 24" fill="#fff"><path d="M3.4 20.4 21 12 3.4 3.6l.1 6.5L15 12 3.5 13.9z"/></svg>',
    reply:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 6 4 11.5 9.5 17"/><path d="M4 11.5h9.5a6.5 6.5 0 0 1 6.5 6.5v.5"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5" stroke-width="1.8"/><path d="m7.8 12.3 2.8 2.8 5.6-5.8"/></svg>',
    list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12"/><circle cx="4" cy="6.5" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="17.5" r="1" fill="currentColor"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4.5c0 .8-.7 1.5-1.5 1.5h-11C4.7 20 4 19.3 4 18.5v-11C4 6.7 4.7 6 5.5 6H10"/></svg>',
    pencil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19.5 8.5a2.8 2.8 0 0 0-4-4L4 16z"/></svg>',
    close:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    ticks:'<svg width="17" height="11" viewBox="0 0 17 11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5.8 4.3 9 11 1.8"/><path d="M7.4 8.3 8.2 9 14.9 1.8"/></svg>',
    bigCheck:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    speakerOn:'<svg viewBox="0 0 24 24"><path d="M3.5 9.2h3.8L12 5v14l-4.7-4.2H3.5z" fill="#B7BDC6"/><path d="M15 9.2a4 4 0 0 1 0 5.6M17.6 6.8a7.3 7.3 0 0 1 0 10.4" fill="none" stroke="#3B9CF0" stroke-width="1.9" stroke-linecap="round"/></svg>',
    speakerOff:'<svg viewBox="0 0 24 24"><path d="M3.5 9.2h3.8L12 5v14l-4.7-4.2H3.5z" fill="#B7BDC6"/><path d="m15.5 9.5 5 5M20.5 9.5l-5 5" stroke="#E5484D" stroke-width="1.9" stroke-linecap="round"/></svg>',
    signal:'<svg width="18" height="12" viewBox="0 0 18 12" fill="#000"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg>',
    wifi:'<svg width="16" height="12" viewBox="0 0 16 12" fill="#000"><path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.2-1.2A9.8 9.8 0 0 0 8 .9 9.8 9.8 0 0 0 1.1 3.6l1.2 1.2A8.1 8.1 0 0 1 8 2.6zm0 3.4c1.3 0 2.5.5 3.4 1.3l1.2-1.2A6.6 6.6 0 0 0 8 4.3a6.6 6.6 0 0 0-4.6 1.8l1.2 1.2C5.5 6.5 6.7 6 8 6zm0 3.3c.5 0 1 .2 1.3.5L8 11.5 6.7 9.8c.3-.3.8-.5 1.3-.5z"/></svg>',
    battery:'<svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="#000" stroke-opacity=".38"/><rect x="2" y="2" width="20" height="9" rx="2.2" fill="#000"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="#000" fill-opacity=".4"/></svg>',
  };

  /* ================= MENU ================= */
  const MODS = {
    biryani: [['Less spicy',['less spic','mild','not spicy','no spice','not too spicy']],['Extra raita',['raita']],['Extra spicy',['extra spic','more spic','very spic']]],
    grill:   [['Less spicy',['less spic','mild','not spicy']],['Extra garlic sauce',['garlic','sauce','toum']],['No fries',['no fries','without fries']]],
    shawarma:[['Extra garlic',['garlic','sauce','toum']],['No pickles',['pickle']],['Spicy',['spic']]],
    burger:  [['No cheese',['cheese']],['Extra sauce',['sauce']],['No onions',['onion']]],
    sandwich:[['No mayo',['mayo']],['Extra fries',['fries']],['Toasted well',['toast']]],
    combo:   [['Less spicy',['less spic','mild','not spicy']],['Extra naan',['naan','bread']],['Extra spicy',['extra spic','more spic']]],
    hot:     [['Less sugar',['less sugar','low sugar','half sugar']],['No sugar',['no sugar','without sugar','sugar free','sugarless']],['Extra strong',['strong']]],
    cold:    [['No ice',['no ice','without ice','less ice']],['Less sugar',['less sugar','low sugar','no sugar']]],
    can:     [['Extra chilled',['chill','cold','ice']]],
  };

  const MENU = [
    // mains
    {id:'chicken-biryani', name:'Chicken Biryani', desc:'Basmati rice, tender chicken, house spices', price:16, group:'mains', mod:'biryani', emoji:'🍚', alias:['chicken biryani','chicken biriyani','chicken briyani','biryani','biriyani','briyani']},
    {id:'mutton-biryani', name:'Mutton Biryani', desc:'Basmati rice, slow-cooked mutton, whole spices', price:23, group:'mains', mod:'biryani', emoji:'🍚', alias:['mutton biryani','mutton biriyani','mutton briyani','mutton']},
    {id:'grilled-chicken', name:'Grilled Chicken (Half)', short:'Grilled Chicken', desc:'Smoky flame-grilled, garlic sauce', price:20, group:'mains', mod:'grill', emoji:'🔥', alias:['grilled chicken','grill chicken','grilled']},
    {id:'charcoal-chicken', name:'Charcoal Grilled Chicken (Half)', short:'Charcoal Chicken', desc:'Charcoal-kissed, garlic sauce', price:23, group:'mains', mod:'grill', emoji:'🔥', alias:['charcoal grilled chicken','charcoal chicken','charcoal']},
    {id:'chicken-shawarma', name:'Chicken Shawarma', desc:'Garlic sauce, pickles, fresh bread', price:8, group:'mains', mod:'shawarma', emoji:'🌯', alias:['chicken shawarma','shawarma','shawerma','shawarama']},
    {id:'chicken-burger', name:'Chicken Burger', desc:'Grilled patty, cheese, caramelized onions', price:10, group:'mains', mod:'burger', emoji:'🍔', alias:['chicken burger','burger']},
    {id:'club-sandwich', name:'Club Sandwich', desc:'Triple-stack, fries side', price:15, group:'mains', mod:'sandwich', emoji:'🥪', alias:['club sandwich','sandwich']},
    {id:'naan-butter-chicken', name:'Naan & Butter Chicken Combo', desc:'Creamy butter chicken, buttered naan', price:22, group:'mains', mod:'combo', emoji:'🍛', alias:['naan and butter chicken combo','naan & butter chicken combo','naan butter chicken combo','naan and butter chicken','naan & butter chicken','butter chicken combo','butter chicken','naan combo','naan']},
    // tea, coffee & more
    {id:'karak-tea', name:'Karak Tea', desc:'Spiced, strong, brewed fresh', price:1, group:'drinks', mod:'hot', emoji:'☕', alias:['karak tea','karak chai','karak','chai','tea']},
    {id:'milk-tea', name:'Fresh Milk Tea', desc:'Light and creamy', price:2, group:'drinks', mod:'hot', emoji:'🥛', alias:['fresh milk tea','milk tea']},
    {id:'milk-coffee', name:'Fresh Milk Coffee', desc:'Smooth, milky, fresh brewed', price:3, group:'drinks', mod:'hot', emoji:'☕', alias:['fresh milk coffee','milk coffee','coffee']},
    {id:'mango-lassi', name:'Mango Lassi', desc:'Thick, chilled, real mango', price:9, group:'drinks', mod:'cold', emoji:'🥭', alias:['mango lassi','lassi','mango']},
    {id:'lime-mint', name:'Fresh Lime Mint', desc:'Sparkling, mint muddled', price:7, group:'drinks', mod:'cold', emoji:'🍋', alias:['fresh lime mint','lime mint','mint lime','lemon mint','lime','lemonade']},
    // soft drinks
    {id:'pepsi', name:'Pepsi', desc:'Chilled can, 330ml', price:3, group:'soft', mod:'can', emoji:'🥤', alias:['pepsi']},
    {id:'coca-cola', name:'Coca-Cola', desc:'Chilled can, 330ml', price:3, group:'soft', mod:'can', emoji:'🥤', alias:['coca cola','coca-cola','cocacola','coke','cola']},
    {id:'7up', name:'7 Up', desc:'Chilled can, 330ml', price:3, group:'soft', mod:'can', emoji:'🥤', alias:['7 up','7up','seven up','sevenup']},
    // juices
    {id:'apple-juice', name:'Apple Juice', desc:'Freshly pressed, no added sugar', price:16, group:'juices', mod:'cold', emoji:'🍏', alias:['apple juice','apple']},
    {id:'avocado-juice', name:'Avocado Juice', desc:'Thick, creamy, blended fresh', price:14, group:'juices', mod:'cold', emoji:'🥑', alias:['avocado juice','avocado','avacado','avocado shake']},
    {id:'orange-juice', name:'Orange Juice', desc:'Freshly squeezed, served chilled', price:12, group:'juices', mod:'cold', emoji:'🍊', alias:['orange juice','orange']},
  ];
  const BY_ID = Object.fromEntries(MENU.map(m => [m.id, m]));
  const GROUP = g => MENU.filter(m => m.group === g);
  const img = m => `assets/menu/${m.id}.jpg`;
  const isDrink = m => m.group !== 'mains';

  const DELIVERY_FEE = 5;
  const PROFILE = { name:'Ahmed', address:'Office · Al Nahda, Building 4', phone:'+971 58 xxx xxxx' };
  const STORE = 'Grill House · Al Nahda (counter)';

  /* ================= STATE ================= */
  let S, token = 0, busy = false, sound = true;
  function freshState() {
    return {
      cart: [],            // {id, qty, notes:[]}
      pending: null,       // item awaiting a quantity
      awaiting: null,      // 'qty' | 'qtyNum' | 'customize' | 'edit' | null
      checkout: false,     // customization done, order in review
      mode: 'delivery',
      payment: 'Cash on delivery',
      profile: { ...PROFILE },
      orderNo: 4521,
    };
  }

  /* ================= DOM ================= */
  const $ = s => document.querySelector(s);
  const screen = $('#screen'), waView = $('#waView'), chat = $('#chat'), thread = $('#thread');
  const input = $('#msgInput'), sendBtn = $('#sendBtn'), waStatus = $('#waStatus');

  document.querySelectorAll('[data-ic]').forEach(el => { if (I[el.dataset.ic]) el.insertAdjacentHTML('afterbegin', I[el.dataset.ic]); });
  $('#sbIcons').innerHTML = I.signal + I.wifi + I.battery;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const now = () => new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
  const scrollDown = () => requestAnimationFrame(() => chat.scrollTo({ top: chat.scrollHeight, behavior:'smooth' }));

  /* ================= SOUND (WhatsApp-style, synthesized) ================= */
  let actx = null;
  function ac() {
    if (!actx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; actx = new C(); }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  function blip(f0, f1, start, dur, vol) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + start, o = c.createOscillator(), g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur * .6);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t); o.stop(t + dur + .02);
  }
  const sfx = {
    sent() { if (sound) blip(520, 980, 0, .12, .16); },
    recv() { if (sound) { blip(1050, 1180, 0, .11, .12); blip(1420, 1560, .085, .16, .1); } },
    tap()  { if (sound) blip(700, 760, 0, .05, .05); },
  };

  function renderSound() {
    $('#soundIco').innerHTML = sound ? I.speakerOn : I.speakerOff;
    $('#soundLbl').textContent = sound ? 'Sound on' : 'Sound off';
    $('#soundBtn').setAttribute('aria-pressed', String(sound));
    $('#soundBtn').setAttribute('aria-label', sound ? 'Sound on' : 'Sound off');
  }
  try { sound = localStorage.getItem('gh-sound') !== 'off'; } catch (e) {}
  renderSound();
  $('#soundBtn').addEventListener('click', () => {
    sound = !sound; renderSound(); ac();
    try { localStorage.setItem('gh-sound', sound ? 'on' : 'off'); } catch (e) {}
    if (sound) sfx.recv();
  });

  /* ================= PHONE SCALING ================= */
  // Must match the phone media query in styles.css
  const PHONE = matchMedia('(max-width:560px), (max-height:520px) and (pointer:coarse)');

  // On phones the app fills the *visible* viewport: this tracks browser toolbars
  // showing/hiding and the on-screen keyboard (iOS Safari, Chrome, Samsung Internet…).
  function setAppHeight() {
    const vv = window.visualViewport;
    const h = Math.round(vv ? vv.height : innerHeight);
    document.documentElement.style.setProperty('--app-h', h + 'px');
    if (PHONE.matches && (scrollX || scrollY)) scrollTo(0, 0);
    if (document.activeElement === input) scrollDown();
  }
  if (window.visualViewport) {
    visualViewport.addEventListener('resize', setAppHeight);
    visualViewport.addEventListener('scroll', setAppHeight);
  }
  addEventListener('resize', setAppHeight);
  addEventListener('orientationchange', () => setTimeout(() => { setAppHeight(); fit(); }, 250));
  input.addEventListener('focus', () => setTimeout(scrollDown, 300));

  function fit() {
    const wrap = $('#phoneWrap'), phone = $('#phone');
    if (PHONE.matches) { wrap.style.cssText = ''; phone.style.transform = ''; return; }
    const top = $('.stage').getBoundingClientRect().top;
    const s = Math.min(1, Math.max(.5, (innerHeight - top - 20) / 876));
    wrap.style.width = 417 * s + 'px'; wrap.style.height = 876 * s + 'px';
    phone.style.transform = `scale(${s})`;
  }
  addEventListener('resize', fit);

  /* ================= RENDER HELPERS ================= */
  let lastSide = null;
  function row(side, el) {
    const r = document.createElement('div');
    r.className = `row ${side}` + (lastSide && lastSide !== side ? ' gap' : '');
    if (lastSide !== side) el.classList.add('tail');
    lastSide = side;
    r.appendChild(el); thread.appendChild(r); scrollDown();
    return r;
  }
  const meta = (out) => `<span class="meta">${now()}${out ? `<span class="ticks">${I.ticks}</span>` : ''}</span><span class="clear"></span>`;

  function lockOldOptions() {
    thread.querySelectorAll('.opts:not(.used)').forEach(o => { o.classList.add('used'); o.querySelectorAll('button').forEach(b => b.disabled = true); });
  }
  // only the latest order card keeps tap-to-edit boxes
  const freezeSaved = () => thread.querySelectorAll('.saved.editable').forEach(s => s.classList.remove('editable'));

  function userSay(text) {
    lockOldOptions();
    const b = document.createElement('div');
    b.className = 'bubble out';
    b.innerHTML = `<p>${esc(text)}</p>` + meta(true);
    row('out', b); sfx.sent();
    const t = b.querySelector('.ticks');
    setTimeout(() => t && t.classList.add('read'), 700);
  }

  /* bot message spec:
     { text, buttons:[{label, run, icon}], carousel:[items], label, list:{button,title,sections}, cta:{label, run}, hero, extraClass } */
  function renderBot(m) {
    if (m.carousel) return renderCarousel(m.carousel, m.label);
    const b = document.createElement('div');
    b.className = 'bubble in' + (m.wide ? ' wide' : '');
    b.innerHTML = (m.hero ? `<img class="receipt-hero" src="${m.hero}" alt="">` : '') + (m.text || '') + meta(false);
    if (m.buttons || m.list || m.cta) {
      const box = document.createElement('div'); box.className = 'opts';
      const add = (label, icon, fn, cls = '') => {
        const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'opt ' + cls;
        btn.innerHTML = `<span class="oi">${icon}</span><span>${esc(label)}</span>`;
        btn.addEventListener('click', () => fn(btn, box));
        box.appendChild(btn);
      };
      (m.buttons || []).forEach(o => add(o.label, I.reply, (btn, box) => {
        if (busy || box.classList.contains('used')) return;
        btn.classList.add('chosen'); btn.querySelector('.oi').innerHTML = I.check;
        userSay(o.label); o.run();
      }));
      if (m.list) add(m.list.button, I.list, () => { if (!busy) openSheet(m.list); }, 'cta');
      if (m.cta) add(m.cta.label, I.link, () => { if (!busy) m.cta.run(); }, 'cta');
      b.appendChild(box);
    }
    if (m.after) m.after(b);
    return row('in', b);
  }

  function renderCarousel(items, label) {
    lastSide = 'in';
    const wrap = document.createElement('div'); wrap.className = 'carousel-row';
    wrap.innerHTML = (label ? `<p class="carousel-label">${label}</p>` : '') + '<div class="carousel"></div>';
    const car = wrap.querySelector('.carousel');
    items.forEach(m => {
      const c = document.createElement('div'); c.className = 'card';
      c.innerHTML = `<div class="card-img"><img src="${img(m)}" alt="${esc(m.name)}" loading="lazy"></div>
        <div class="card-body"><p class="card-title">${esc(m.name)}</p><p class="card-desc">${esc(m.desc)}</p><p class="card-price">AED ${m.price}</p></div>
        <button class="card-btn" type="button">${I.reply}<span>Add to order</span></button>`;
      c.querySelector('.card-btn').addEventListener('click', () => {
        if (busy || car.dataset.dragged === '1') return;
        userSay(m.name); askQty(m);
      });
      car.appendChild(c);
    });
    dragScroll(car);
    thread.appendChild(wrap); scrollDown();
    return wrap;
  }

  function dragScroll(el) {
    let down = false, x0 = 0, s0 = 0, moved = 0;
    el.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; x0 = e.clientX; s0 = el.scrollLeft; el.dataset.dragged = '0'; });
    addEventListener('pointermove', e => {
      if (!down) return; const dx = e.clientX - x0; moved = Math.max(moved, Math.abs(dx));
      if (moved > 5) { el.classList.add('dragging'); el.scrollLeft = s0 - dx; el.dataset.dragged = '1'; }
    });
    addEventListener('pointerup', () => {
      if (!down) return; down = false; el.classList.remove('dragging');
      setTimeout(() => { el.dataset.dragged = '0'; }, 30);
    });
  }

  function showTyping(on) {
    let t = thread.querySelector('.typing-row');
    waStatus.textContent = on ? 'typing…' : 'Online';
    waStatus.classList.toggle('typing', on);
    if (on && !t) {
      const b = document.createElement('div'); b.className = 'bubble in typing-bubble'; b.innerHTML = '<i></i><i></i><i></i>';
      row('in', b).classList.add('typing-row');
    } else if (!on && t) t.remove();
  }

  /* Sends a sequence of bot messages with WhatsApp-like typing pauses.
     Aborts silently if the demo was restarted meanwhile. */
  async function bot(...msgs) {
    const t = token; busy = true;
    try {
      for (const m of msgs) {
        const len = (m.text || '').replace(/<[^>]+>/g, '').length;
        const typeMs = m.carousel ? 650 : Math.min(1500, 420 + len * 9);
        await wait(260);
        if (t !== token) return false;
        const prevSide = lastSide;   // the typing row must not change bubble grouping
        showTyping(true);
        await wait(typeMs);
        if (t !== token) return false;
        showTyping(false);
        lastSide = prevSide;
        renderBot(m); sfx.recv();
      }
      waStatus.textContent = 'Online';
      return true;
    } finally { if (t === token) busy = false; }
  }

  /* ================= CART ================= */
  const line = id => S.cart.find(l => l.id === id);
  function addToCart(id, qty, set = false) {
    const l = line(id);
    if (l) l.qty = set ? qty : l.qty + qty;
    else S.cart.push({ id, qty, notes: [] });
  }
  const subtotal = () => S.cart.reduce((s, l) => s + BY_ID[l.id].price * l.qty, 0);
  const fee = () => (S.mode === 'delivery' ? DELIVERY_FEE : 0);
  const itemsHtml = (notes = true) => S.cart.map(l => {
    const m = BY_ID[l.id];
    return `<b>${esc(m.name)} ×${l.qty}</b>${notes && l.notes.length ? ' · ' + esc(l.notes.join(', ')) : ''}`;
  }).join('<br>');
  const totalsHtml = () => `<p class="totals">Subtotal: AED ${subtotal()}<br>${S.mode === 'delivery' ? `Delivery: AED ${DELIVERY_FEE}` : 'Pickup: free'}<br><b>Total: AED ${subtotal() + fee()}</b></p>`;
  const hasDrink = () => S.cart.some(l => isDrink(BY_ID[l.id]));

  /* ================= FLOWS ================= */
  const menuButtons = () => [
    { label:'View juices', run: juices },
    { label:'View full menu', run: fullMenu },
    { label:'View cart', run: viewCart },
  ];

  async function welcome(back = false) {
    await bot(
      { text: back
          ? `<p>Here's the menu again 👇</p><p>Pick something below, or just tell me what you're craving.</p>`
          : `<p>Hey 👋 <b>Welcome to Grill House!</b><br>What are you having today?</p><p>Pick something below, or just tell me what you're craving.</p>` },
      { carousel: GROUP('mains') },
      { carousel: GROUP('drinks'), label:'Tea, coffee &amp; more ☕' },
      { text: `<p>Tap <b>Add to order</b> on any dish, or explore more 👇</p>`, buttons: menuButtons() },
    );
  }

  function askQty(m) {
    S.pending = m; S.awaiting = 'qty';
    const lead = m.group === 'mains' ? 'Great choice 👍' : `Good pick ${m.emoji}`;
    bot({ text: `<p>${lead} <b>${esc(m.name)} · AED ${m.price}</b> each. How many?</p>`,
      buttons: [1, 2].map(n => ({ label: String(n), run: () => setQty(n) })).concat({ label:'3 or more', run: moreQty }) });
  }
  function moreQty() {
    S.awaiting = 'qtyNum';
    bot({ text: `<p>No problem 🙌 How many <b>${esc(S.pending.name)}</b> would you like? Just type the number.</p>` });
  }
  function setQty(n) {
    const m = S.pending; S.pending = null; S.awaiting = null;
    addToCart(m.id, n);
    if (S.checkout) return review(`Added 👍 <b>${esc(m.name)} ×${n}</b>`);
    cartSummary();
  }

  function cartButtons() {
    return [
      { label:'Order this', run: orderThis },
      hasDrink() ? { label:'Edit order', run: editOrder } : { label:'Tea, coffee or juice?', run: drinks },
      { label:'View menu', run: () => welcome(true) },
    ];
  }
  function cartSummary(lead) {
    if (!S.cart.length) return viewCart();
    const single = S.cart.length === 1;
    const l = S.cart[0], m = BY_ID[l.id];
    const text = single && !lead
      ? `<p><b>${esc(m.name)} ×${l.qty}</b> — AED ${m.price * l.qty}</p>`
      : `<p>${lead || "Got it. Here's your order 🧾"}</p><p>${itemsHtml()}</p><p><b>AED ${subtotal()}</b></p>`;
    return bot({ text, buttons: cartButtons() });
  }

  function viewCart() {
    if (!S.cart.length) return bot({ text:`<p>Your cart is empty 🛒 Pick something from the menu to get started.</p>`, buttons:[{ label:'View menu', run: () => welcome(true) }, { label:'View full menu', run: fullMenu }] });
    if (S.checkout) return review();
    cartSummary("Here's your cart 🛒");
  }

  function drinks() {
    bot(
      { text:`<p>Here's what we're pouring today ☕🥤</p>` },
      { carousel: GROUP('drinks') },
      { carousel: GROUP('soft'), label:'Soft drinks 🥤' },
      { text:`<p>Want something fresher? Try our juices 🧃</p>`, buttons:[{ label:'View juices', run: juices }, { label:'View menu', run: () => welcome(true) }, { label:'Skip to order', run: orderThis }] },
    );
  }

  function juices() {
    bot(
      { text:`<p>Fresh juices, pressed to order 🧃</p>` },
      { carousel: GROUP('juices') },
      { text:`<p>Anything else?</p>`, buttons:[{ label:'Tea, coffee & soft drinks', run: drinks }, { label:'View menu', run: () => welcome(true) }, { label:'View cart', run: viewCart }] },
    );
  }

  const SECTIONS = [['Mains 🍛','mains'],['Tea, coffee & more ☕','drinks'],['Fresh juices 🧃','juices'],['Soft drinks 🥤','soft']];
  function fullMenu() {
    bot({ text:`<p>Here's our full menu 📋</p><p>Tap below to browse every category and pick your item.</p>`,
      list:{ button:'View full menu', title:'Full menu',
        sections: SECTIONS.map(([t, g]) => ({ title:t, rows: GROUP(g).map(m => ({ title:m.name, desc:`AED ${m.price} · ${m.desc}`, img:img(m), run: () => askQty(m) })) })) } });
  }
  function addMore() {
    bot({ text:`<p>Sure! What would you like to add? 😋</p>`,
      list:{ button:'Browse categories', title:'Categories',
        sections:[{ title:'Menu', rows:[
          { title:'Mains', desc:'Biryani, grills, shawarma, burgers & more', run: () => bot({ carousel: GROUP('mains') }) },
          { title:'Tea, coffee & soft drinks', desc:'Karak, milk tea, lassi, sodas', run: drinks },
          { title:'Fresh juices', desc:'Apple, avocado, orange', run: juices },
          { title:'Full menu', desc:'Everything in one list', run: fullMenu },
        ] }] } });
  }

  function orderThis() {
    if (!S.cart.length) return viewCart();
    if (S.checkout) return review();
    S.awaiting = 'customize';
    const labels = [];
    S.cart.forEach(l => MODS[BY_ID[l.id].mod].forEach(([lab]) => { if (!labels.includes(lab)) labels.push(lab); }));
    const opts = labels.slice(0, 2).map(lab => ({ label: lab, run: () => applyMods([lab]) }));
    opts.push({ label:'No changes', run: () => applyMods([]) });
    bot({ text:`<p>Want to customize anything? Tap an option, or type something else.</p>`, buttons: opts });
  }

  function applyMods(labels) {
    labels.forEach(lab => S.cart.forEach(l => {
      if (MODS[BY_ID[l.id].mod].some(([x]) => x === lab)) pushNote(l, lab.toLowerCase());
    }));
    proceedToReview(labels.length > 0);
  }
  function pushNote(l, note) { if (!l.notes.includes(note)) l.notes.push(note); }

  function parseMods(text) {
    let any = false;
    const clauses = text.toLowerCase().split(/,|;|\band\b|\balso\b|\bplus\b|&/).map(s => s.trim()).filter(Boolean);
    clauses.forEach(cl => {
      const named = findItems(cl).map(f => line(f.id)).filter(Boolean);
      const targets = named.length ? named : S.cart;
      let hit = false;
      targets.forEach(l => MODS[BY_ID[l.id].mod].forEach(([lab, keys]) => {
        if (keys.some(k => cl.includes(k))) { pushNote(l, lab.toLowerCase()); hit = true; }
      }));
      if (!hit && cl.replace(/[^a-z]/g, '').length > 2) {
        const note = cl.replace(/^(please|pls|can you|make it|make the|i want|with)\s+/g, '').replace(/[.!]+$/, '');
        pushNote(targets[0], note); hit = true;
      }
      any = any || hit;
    });
    proceedToReview(any);
  }

  async function proceedToReview(changed) {
    S.awaiting = null; S.checkout = true;
    const msgs = [];
    if (changed) msgs.push({ text:`<p>Noted 👍 ${itemsHtml()}</p>` });
    msgs.push({ text: S.mode === 'delivery'
      ? `<p>Setting this up for delivery — say <b>pickup</b> if you'd rather collect it.</p>`
      : `<p>Setting this up for <b>pickup</b> — say <b>delivery</b> if you'd like it brought to you.</p>` });
    const ok = await bot(...msgs);
    if (ok) review();
  }

  function savedBox(label, key, value, editable) {
    const pin = key === 'address' ? '📍 ' : '';
    return `<div class="saved ${editable ? 'editable' : ''}" data-key="${key}">
      <div class="saved-label"><span>${label}</span>${editable ? `<span class="edit-hint">${I.pencil}<span>Tap to edit</span></span>` : ''}</div>
      <div class="saved-val">${pin}<span class="v">${esc(value)}</span></div></div>`;
  }

  function review(lead) {
    freezeSaved();
    const p = S.profile, delivery = S.mode === 'delivery';
    const text = `<p>${lead ? lead + '<br>' : ''}Here's your order 👇</p>
      ${delivery ? savedBox('Address', 'address', p.address, true) : savedBox('Pickup from', 'store', STORE, false)}
      ${savedBox('Contact number', 'phone', p.phone, true)}
      <p>${itemsHtml()}</p>
      ${totalsHtml()}
      <p>Payment: ${S.payment.toLowerCase()}</p>`;
    return bot({ text, wide:true, after: wireEditable,
      buttons:[{ label:'Confirm order', run: confirmOrder }, { label:'Edit order', run: editOrder }, { label:'Pay online instead', run: payOnline }] });
  }

  /* Tap-to-edit saved address / phone, right inside the chat card */
  function wireEditable(bubble) {
    bubble.querySelectorAll('.saved.editable').forEach(box => {
      const v = box.querySelector('.v'), key = box.dataset.key, hint = box.querySelector('.edit-hint span');
      box.addEventListener('click', () => {
        if (!box.classList.contains('editable') || box.classList.contains('editing')) return;
        box.classList.add('editing'); v.contentEditable = 'plaintext-only';
        if (v.contentEditable !== 'plaintext-only') v.contentEditable = 'true';
        hint.textContent = 'Editing · Enter to save';
        v.focus();
        const r = document.createRange(); r.selectNodeContents(v);
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      });
      v.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); v.blur(); }
        if (e.key === 'Escape') { v.textContent = S.profile[key]; v.blur(); }
      });
      v.addEventListener('blur', () => {
        const val = v.textContent.replace(/\s+/g, ' ').trim();
        box.classList.remove('editing'); v.contentEditable = 'false';
        if (val && val !== S.profile[key]) { S.profile[key] = val; hint.textContent = 'Saved ✓'; box.classList.add('flash'); sfx.tap(); }
        else { v.textContent = S.profile[key]; hint.textContent = 'Tap to edit'; }
        setTimeout(() => { box.classList.remove('flash'); if (hint.textContent === 'Saved ✓') hint.textContent = 'Tap to edit'; }, 1600);
      });
    });
  }

  function editOrder() {
    S.awaiting = 'edit';
    bot({ text:`<p>Sure — what would you like to change? ✏️</p><p>Just type it, e.g. <i>“remove the tea”</i>, <i>“make it 3 biryani”</i> or <i>“add a pepsi”</i>.${S.checkout ? ' You can also tap the address or number in the order card to edit them.' : ''}</p>`,
      buttons:[{ label:'View menu', run: () => { S.awaiting = null; welcome(true); } }, { label:'Clear cart', run: clearCart }, { label:'Keep as is', run: () => { S.awaiting = null; S.checkout ? review() : cartSummary(); } }] });
  }
  async function clearCart() {
    S.cart = []; S.awaiting = null; S.checkout = false;
    const ok = await bot({ text:`<p>Cart cleared 🗑️ Let's start fresh — what are you craving?</p>` });
    if (ok) welcome(true);
  }

  function payOnline() {
    const total = subtotal() + fee();
    bot({ text:`<p>No problem 💳 Tap below to pay <b>AED ${total}</b> securely.</p><p>Your order goes to the kitchen as soon as the payment is done.</p>`,
      cta:{ label:`Pay AED ${total}`, run: () => openPay(total) } });
  }
  function openPay(total) {
    const pay = $('#pay'), st = $('#payState');
    $('#payAmt').textContent = `AED ${total}`;
    st.className = 'pay-state'; st.innerHTML = '';
    pay.classList.add('show');
  }
  $('#payBtn').addEventListener('click', async () => {
    const t = token, st = $('#payState');
    st.className = 'pay-state on'; st.innerHTML = '<div class="spinner"></div><span>Processing payment…</span>';
    await wait(1400); if (t !== token) return;
    st.innerHTML = `<div class="pay-ok">${I.bigCheck}</div><span>Payment successful</span>`; sfx.tap();
    await wait(1000); if (t !== token) return;
    S.payment = 'Paid online · Card';
    $('#pay').classList.remove('show');
    lockOldOptions();
    confirmOrder();
  });
  $('#pay').addEventListener('click', e => { if (e.target.id === 'pay') $('#pay').classList.remove('show'); });

  async function confirmOrder() {
    if (!S.cart.length) return viewCart();
    freezeSaved();
    const p = S.profile, delivery = S.mode === 'delivery';
    const hero = S.cart.find(l => !isDrink(BY_ID[l.id])) || S.cart[0];
    const hm = BY_ID[hero.id];
    const text = `<p class="receipt-cap">Your order is confirmed · ${esc(hm.name)} ×${hero.qty}</p>
      <p>Thanks, ${esc(p.name)} 🙏</p>
      <p>Order confirmed ✅ · <b>Order #${S.orderNo}</b></p>
      <p>${itemsHtml()}</p>
      ${totalsHtml()}
      ${delivery ? savedBox('Address', 'address', p.address, false) : savedBox('Pickup from', 'store', STORE, false)}
      ${savedBox('Contact number', 'phone', p.phone, false)}
      ${savedBox('Payment', 'pay', S.payment, false)}
      <p>We're getting it ready now 👨‍🍳${delivery ? '🛵' : ''}<br>⏱ ${delivery ? 'Estimated delivery: 25–40 minutes' : 'Ready for pickup in 15–20 minutes'}</p>`;
    const no = S.orderNo;
    const ok = await bot({ text, hero: img(hm), wide:true });
    // reset the basket for a possible next order
    S.cart = []; S.checkout = false; S.awaiting = null; S.payment = 'Cash on delivery'; S.orderNo++;
    if (!ok) return;
    const t = token; await wait(6500); if (t !== token || busy) return;
    bot({ text: delivery
        ? `<p>🛵 Good news, ${esc(p.name)}! Order <b>#${no}</b> is out for delivery.</p><p>Your rider Imran will call you on arrival.</p>`
        : `<p>✅ Order <b>#${no}</b> is ready! Collect it at the counter — just show this message.</p>`,
      buttons:[{ label:'Order again', run: () => welcome(true) }, { label:'Rate your order', run: rate }] });
  }
  function rate() {
    bot({ text:`<p>How was everything? ⭐</p>`, buttons:[{ label:'😍 Loved it', run: thanks }, { label:'🙂 It was good', run: thanks }, { label:'😕 Could be better', run: thanks }] });
  }
  function thanks() { bot({ text:`<p>Thank you for the feedback 💚 See you again soon at Grill House!</p>` }); }

  /* ================= FREE-TEXT UNDERSTANDING ================= */
  const NUMS = { a:1, an:1, one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10, single:1, couple:2, double:2 };
  const ALIASES = MENU.flatMap(m => m.alias.map(a => [a, m.id])).sort((x, y) => y[0].length - x[0].length);
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function findItems(text) {
    let t = ' ' + text.toLowerCase().replace(/[’']/g, '') + ' ';
    const found = [];
    for (const [a, id] of ALIASES) {
      const re = new RegExp(`(^|[^a-z0-9])(${reEsc(a)})(?:e?s)?(?=[^a-z0-9]|$)`, 'g');
      let m;
      while ((m = re.exec(t))) {
        const start = m.index + m[1].length, end = start + m[0].length - m[1].length;
        if (!found.some(f => f.id === id)) {
          const before = t.slice(0, start).trimEnd();
          const after = t.slice(end);
          let qty = null;
          const qb = before.match(/(\d+|\b(?:a|an|one|two|three|four|five|six|seven|eight|nine|ten|single|couple|double))\s*(?:x|×|pcs?|of)?$/);
          const qa = after.match(/^\s*(?:x|×)\s*(\d+)/);
          if (qb) qty = /^\d+$/.test(qb[1]) ? +qb[1] : NUMS[qb[1]];
          else if (qa) qty = +qa[1];
          found.push({ id, qty, pos: start });
        }
        t = t.slice(0, start) + ' '.repeat(end - start) + t.slice(end);
        re.lastIndex = 0;
      }
    }
    return found.sort((a, b) => a.pos - b.pos);
  }
  const parseNumber = s => {
    const m = s.trim().toLowerCase().match(/^(\d{1,2}|a|an|one|two|three|four|five|six|seven|eight|nine|ten)\b/);
    return m ? (/^\d+$/.test(m[1]) ? +m[1] : NUMS[m[1]]) : null;
  };

  /* ---------- AI understanding (Gemini via /api/understand) ----------
     Every typed message goes to the server function first; it returns a structured intent.
     If the function is missing, slow or fails, the keyword matcher below (localUnderstand) takes over. */
  let aiOff = location.protocol === 'file:';
  const ABORTED = {};
  function stageName() {
    if ((S.awaiting === 'qty' || S.awaiting === 'qtyNum') && S.pending) return 'qty';
    if (S.awaiting === 'customize') return 'customize';
    if (S.awaiting === 'edit') return 'editing order';
    if (S.checkout) return 'review';
    return S.cart.length ? 'cart' : 'browsing';
  }
  async function aiUnderstand(text) {
    if (aiOff) return null;
    const t = token, prev = lastSide;
    busy = true; showTyping(true);
    const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), 7000);
    try {
      const r = await fetch('api/understand', {
        method: 'POST', signal: ctrl.signal, headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, stage: stageName(), cart: S.cart.map(l => ({ id: l.id, qty: l.qty })), pending: S.pending ? S.pending.id : null }),
      });
      if (r.status === 404 || r.status === 405 || r.status === 503) aiOff = true; // no function / key on this host
      if (t !== token) return ABORTED;
      return r.ok ? await r.json() : null;
    } catch (e) {
      return t !== token ? ABORTED : null;
    } finally {
      clearTimeout(timer);
      if (t === token) { showTyping(false); lastSide = prev; busy = false; }
    }
  }

  function afterCartChange() {
    if (S.checkout) return review('Updated ✅');
    return bot({ text:`<p>Got it 🧾</p><p>${itemsHtml()}</p><p><b>AED ${subtotal()}</b></p>`,
      buttons:[{ label:'Order this', run: orderThis }, { label:'Add more', run: addMore }] });
  }

  // Maps the AI's intent onto the same flows the buttons use. Returns false to fall back.
  function handleAI(a) {
    const items = a.items || [], notes = a.notes || [];
    const applyNotes = () => notes.forEach(n => { const l = line(n.id) || S.cart[0]; if (l) pushNote(l, n.note); });
    switch (a.intent) {
      case 'quantity':
        if (!S.pending || !a.quantity) return false;
        setQty(a.quantity); return true;
      case 'add_items': case 'set_items':
        if (!items.length) return false;
        items.forEach(i => addToCart(i.id, i.qty, a.intent === 'set_items' && !!line(i.id)));
        applyNotes(); S.pending = null; S.awaiting = null;
        afterCartChange(); return true;
      case 'remove_items':
        if (!items.length) return false;
        items.forEach(i => { S.cart = S.cart.filter(l => l.id !== i.id); });
        S.awaiting = null;
        if (!S.cart.length) { S.checkout = false; bot({ text:`<p>Removed. Your cart is empty now 🛒</p>`, buttons: menuButtons() }); return true; }
        S.checkout ? review('Removed ✅') : cartSummary("Removed ✅ Here's your order now 🧾"); return true;
      case 'customize':
        if (!S.cart.length || !notes.length) return false;
        applyNotes();
        if (S.awaiting === 'customize') proceedToReview(true);
        else if (S.checkout) review('Noted 👍');
        else cartSummary("Noted 👍 Here's your order 🧾");
        return true;
      case 'no_changes':
        if (S.awaiting !== 'customize') return false;
        applyMods([]); return true;
      case 'order_this':
        if (!S.cart.length) return false;
        orderThis(); return true;
      case 'confirm':
        if (S.checkout) { confirmOrder(); return true; }
        if (S.cart.length) { orderThis(); return true; }
        return false;
      case 'pickup':
        S.mode = 'pickup';
        S.checkout ? review('Switched to pickup 🏃') : bot({ text:`<p>Pickup it is 🏃 — no delivery fee. What would you like?</p>`, buttons: menuButtons() });
        return true;
      case 'delivery':
        S.mode = 'delivery';
        S.checkout ? review('Switched to delivery 🛵') : bot({ text:`<p>Delivery it is 🛵</p>` });
        return true;
      case 'pay_online':
        if (S.checkout) { payOnline(); return true; }
        bot({ text:`<p>Sure 💳 You can pay online right before confirming your order.</p>` }); return true;
      case 'show_menu': welcome(true); return true;
      case 'show_full_menu': fullMenu(); return true;
      case 'show_drinks': drinks(); return true;
      case 'show_juices': juices(); return true;
      case 'show_cart': viewCart(); return true;
      case 'clear_cart': clearCart(); return true;
      case 'change_address':
        if (!a.address) return false;
        S.profile.address = a.address;
        S.checkout ? review('Address updated 📍') : bot({ text:`<p>Got it — delivering to <b>${esc(a.address)}</b> 📍</p>` });
        return true;
      case 'change_phone':
        if (!a.phone) return false;
        S.profile.phone = a.phone;
        S.checkout ? review('Contact number updated 📞') : bot({ text:`<p>Saved your number <b>${esc(a.phone)}</b> 📞</p>` });
        return true;
      case 'greeting': welcome(S.cart.length > 0); return true;
      case 'thanks': bot({ text:`<p>You're welcome 💚 Anything else I can get you?</p>` }); return true;
      case 'not_on_menu':
        bot({ text:`<p>Sorry, we don't have <b>${esc(a.unavailable || 'that')}</b> right now 🙏</p><p>Here's what we can make for you 👇</p>`, buttons: menuButtons() });
        return true;
      case 'question':
        if (!a.reply) return false;
        bot({ text:`<p>${esc(a.reply)}</p>` }); return true;
      default: return false;
    }
  }

  async function onText(raw) {
    const text = raw.trim(); if (!text) return;
    userSay(text);
    // a bare number answering "how many?" needs no round trip
    if ((S.awaiting === 'qty' || S.awaiting === 'qtyNum') && S.pending && /^\d{1,2}$/.test(text)) return setQty(Math.min(+text, 50));
    const ai = await aiUnderstand(text);
    if (ai === ABORTED) return;
    if (ai && handleAI(ai)) return;
    localUnderstand(text);
  }

  function localUnderstand(text) {
    const t = text.toLowerCase();

    // quantity replies
    if ((S.awaiting === 'qty' || S.awaiting === 'qtyNum') && S.pending) {
      const n = parseNumber(t);
      if (n && n > 0 && findItems(t).length === 0) return setQty(Math.min(n, 50));
    }
    if (S.awaiting === 'customize') {
      if (/^(no( changes?)?|nope|nothing|none|all good|no thanks|its fine|it'?s fine|fine|ok|okay)\b/.test(t)) return applyMods([]);
      if (!/\b(remove|delete|cancel)\b/.test(t) && !(findItems(t).length && /\d/.test(t))) return parseMods(text);
    }

    // saved-detail edits by text
    const addr = text.match(/(?:address|deliver(?:y)? to|send (?:it )?to)\s*(?:to|is|:|-)?\s*(.{4,})$/i);
    if (addr && !/pickup|pick up/.test(t)) { S.profile.address = addr[1].replace(/^to\s+/i, '').trim(); return S.checkout ? review('Address updated 📍') : bot({ text:`<p>Got it — delivering to <b>${esc(S.profile.address)}</b> 📍</p>` }); }
    const ph = text.match(/(?:number|phone|contact|mobile)\D{0,12}(\+?\d[\d\s-]{6,})/i);
    if (ph) { S.profile.phone = ph[1].trim(); return S.checkout ? review('Contact number updated 📞') : bot({ text:`<p>Saved your number <b>${esc(S.profile.phone)}</b> 📞</p>` }); }

    // fulfilment / payment overrides
    const items = findItems(t);
    if (/\b(pick ?up|collect|take ?away|takeaway)\b/.test(t)) {
      S.mode = 'pickup';
      if (!items.length) return S.checkout ? review('Switched to pickup 🏃') : bot({ text:`<p>Pickup it is 🏃 — no delivery fee. What would you like?</p>`, buttons: menuButtons() });
    }
    if (/\bdeliver(y)?\b/.test(t) && S.mode === 'pickup') { S.mode = 'delivery'; return S.checkout ? review('Switched to delivery 🛵') : bot({ text:`<p>Delivery it is 🛵</p>` }); }
    if (/\b(pay online|online|card|apple pay)\b/.test(t) && S.checkout) return payOnline();
    if (/\b(confirm|place (the )?order|go ahead|yes|yep|done)\b/.test(t) && S.checkout) return confirmOrder();
    if (/^(order (this|it|now)|checkout|check out|that'?s all|thats it)\b/.test(t) && S.cart.length) return orderThis();

    // removing items
    if (/\b(remove|delete|cancel|no more|drop|without)\b/.test(t) && items.length) {
      items.forEach(f => { S.cart = S.cart.filter(l => l.id !== f.id); });
      S.awaiting = null;
      if (!S.cart.length) { S.checkout = false; return bot({ text:`<p>Removed. Your cart is empty now 🛒</p>`, buttons: menuButtons() }); }
      return S.checkout ? review('Removed ✅') : cartSummary('Removed ✅ Here\'s your order now 🧾');
    }

    // adding / changing items
    if (items.length) {
      const setMode = S.awaiting === 'edit' || /\b(make it|change|instead|only|update)\b/.test(t);
      items.forEach(f => addToCart(f.id, f.qty || 1, setMode && !!line(f.id)));
      S.awaiting = null; S.pending = null;
      if (S.checkout) return review('Updated ✅');
      return bot({ text:`<p>Got it 🧾</p><p>${itemsHtml()}</p><p><b>AED ${subtotal()}</b></p>`,
        buttons:[{ label:'Order this', run: orderThis }, { label:'Add more', run: addMore }] });
    }

    if (/^(hi+|hello|hey|hai|salam|salaam|assalam|good (morning|afternoon|evening)|start|order)\b/.test(t)) return welcome(S.cart.length > 0);
    if (/\bjuice/.test(t)) return juices();
    if (/\b(drinks?|tea|coffee|soda|soft)\b/.test(t)) return drinks();
    if (/\bfull menu\b/.test(t)) return fullMenu();
    if (/\bmenu\b/.test(t)) return welcome(true);
    if (/\b(cart|basket|my order|total)\b/.test(t)) return viewCart();
    if (/\b(thank|thanks|shukran)\b/.test(t)) return bot({ text:`<p>You're welcome 💚 Anything else I can get you?</p>` });

    bot({ text:`<p>Sorry, I didn't quite catch that 🙏</p><p>Try typing a dish like <i>“2 chicken shawarma and a pepsi”</i>, or browse below.</p>`, buttons: menuButtons() });
  }

  /* ================= COMPOSER ================= */
  function syncSend() {
    const has = input.value.trim().length > 0;
    sendBtn.innerHTML = has ? I.sendArrow : I.mic;
  }
  input.addEventListener('input', syncSend);
  $('#composer').addEventListener('submit', e => {
    e.preventDefault();
    if (busy || !input.value.trim()) return;
    const v = input.value; input.value = ''; syncSend(); onText(v);
  });

  /* ================= LIST SHEET ================= */
  let sheetSel = null;
  function openSheet(list) {
    sheetSel = null;
    $('#sheetTitle').textContent = list.title;
    const body = $('#sheetBody'); body.innerHTML = '';
    list.sections.forEach(sec => {
      body.insertAdjacentHTML('beforeend', `<p class="sheet-sec">${esc(sec.title)}</p>`);
      sec.rows.forEach(r => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'sheet-row';
        b.innerHTML = `${r.img ? `<img src="${r.img}" alt="">` : ''}<span class="sr-text"><p class="sr-title">${esc(r.title)}</p><p class="sr-desc">${esc(r.desc)}</p></span><span class="radio"></span>`;
        b.addEventListener('click', () => {
          body.querySelectorAll('.sel').forEach(x => x.classList.remove('sel'));
          b.classList.add('sel'); sheetSel = r; $('#sheetSend').disabled = false; sfx.tap();
        });
        body.appendChild(b);
      });
    });
    body.scrollTop = 0;
    $('#sheetSend').disabled = true;
    waView.classList.add('sheet-open');
  }
  const closeSheet = () => waView.classList.remove('sheet-open');
  $('#sheetClose').addEventListener('click', closeSheet);
  $('#sheetScrim').addEventListener('click', closeSheet);
  $('#sheetSend').addEventListener('click', () => {
    if (!sheetSel || busy) return;
    const r = sheetSel; closeSheet(); userSay(r.title); r.run();
  });

  /* ================= START ================= */
  // The demo opens straight in the WhatsApp chat; the customer's "Hi" is typed and sent for them.
  async function start() {
    token++; busy = false; S = freshState(); lastSide = null;
    closeSheet(); $('#pay').classList.remove('show');
    thread.innerHTML = `<div class="chip">Today</div>
      <div class="notice">🔒 This business uses a secure service from Meta to manage this chat. Tap to learn more.</div>`;
    waStatus.textContent = 'Typically replies instantly'; waStatus.classList.remove('typing');
    input.value = ''; syncSend();
    const t = token;
    await wait(600); if (t !== token) return;
    input.value = 'Hi'; syncSend();
    await wait(650); if (t !== token) return;
    input.value = ''; syncSend();
    userSay('Hi');
    welcome();
  }
  $('#restartBtn').addEventListener('click', () => { ac(); start(); });
  $('#waBack').addEventListener('click', () => { ac(); start(); });

  const yr = document.getElementById('year'); if (yr) yr.textContent = Math.max(2026, new Date().getFullYear());
  console.info('%cRestaurant AI Ordering Agent — built by Ads n\x27 Codes · adsncodes.com', 'font:600 13px sans-serif;color:#1DAA61');

  // "Built by" opens the credits as a full-screen panel on phones; on desktop it scrolls to the footer
  const credits = $('#credits');
  $('.byline').addEventListener('click', e => { if (PHONE.matches) { e.preventDefault(); credits.classList.add('open'); } });
  $('#creditsClose').addEventListener('click', () => credits.classList.remove('open'));

  setAppHeight(); start(); fit();
  if (document.fonts) document.fonts.ready.then(fit);
})();
