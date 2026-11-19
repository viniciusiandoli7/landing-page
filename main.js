(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const html = document.documentElement;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* TEMA */
  const setMeta = t => { const m = $('meta[name="theme-color"]'); if (m) m.content = t === 'dark' ? '#0d0d0f' : '#f2f2f7'; };
  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    try { localStorage.setItem('vi-theme', t); } catch (e) {}
    setMeta(t);
  }
  let saved = 'dark';
  try { saved = localStorage.getItem('vi-theme') || 'dark'; } catch (e) {}
  applyTheme(saved);
  $('#themeBtn').addEventListener('click', () => applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* NAV MOBILE */
  const ham = $('#ham'), navLinks = $('#navLinks');
  ham.addEventListener('click', () => { const o = navLinks.classList.toggle('open'); ham.setAttribute('aria-expanded', o); });
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => { navLinks.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }));

  /* TYPING */
  const roles = ['Full Stack Developer', 'Engenharia de Software'];
  let ri = 0, ci = 0, del = false;
  const el = $('#typedRole');
  (function type() {
    const w = roles[ri];
    if (!del) { el.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; setTimeout(type, 1800); return; } }
    else { el.textContent = w.slice(0, --ci); if (ci === 0) { del = false; ri = (ri + 1) % roles.length; } }
    setTimeout(type, del ? 55 : 85);
  })();

  /* REVEAL (base, funciona sem GSAP) */
  const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }), { threshold: .08 });
  $$('.reveal').forEach(x => obs.observe(x));

  /* PROGRESSO */
  const bar = $('#progress');
  function onScroll() { const m = html.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (m > 0 ? scrollY / m : 0) + ')'; }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* VÍDEOS: tocam só quando visíveis */
  const vids = $$('.proj-img video');
  const play = v => { if (!v.getAttribute('src')) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  const vio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && !modal.open ? play(e.target) : e.target.pause()), { threshold: .5 });
  vids.forEach(v => vio.observe(v));

  /* MODAL */
  const modal = $('#vmodal'), mv = $('#vmVideo'), mt = $('#vmTitle');
  function openModal(card) {
    const v = $('video', card);
    mt.textContent = card.dataset.title || '';
    mv.poster = v.getAttribute('poster') || '';
    mv.src = v.dataset.src;
    vids.forEach(x => x.pause());
    modal.showModal();
    const p = mv.play(); if (p && p.catch) p.catch(() => {});
  }
  $$('.proj-card').forEach(card => {
    const m = $('.proj-img', card);
    m.addEventListener('click', () => openModal(card));
    m.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); } });
  });
  $('#vmClose').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => { mv.pause(); mv.removeAttribute('src'); mv.load(); });

  /* INTERAÇÕES DE PONTEIRO */
  if (fine && !calm) {
    $$('[data-spot]').forEach(c => c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }));
    $$('.btn-grad,.btn-outline').forEach(b => {
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .18) + 'px,' + ((e.clientY - r.top - r.height / 2) * .28 - 2) + 'px)'; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
    const ph = $('.image-wrapper'), hero = $('.hero');
    if (ph) {
      hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; ph.style.transform = 'translate(' + (x * -14) + 'px,' + (y * -10) + 'px)'; });
      hero.addEventListener('pointerleave', () => { ph.style.transform = ''; });
    }
  }

  /* STACK: lista destaca as tecnologias na órbita */
  const stack = $('#stack');
  if (stack) {
    const nodes = $$('.node', stack), cats = $$('.stack-cat', stack);
    const setCat = cat => {
      cats.forEach(c => c.classList.toggle('on', c.dataset.cat === cat));
      nodes.forEach(n => n.classList.toggle('on', n.dataset.cat === cat));
      if (cat) { stack.dataset.active = cat; stack.classList.add('paused'); }
      else { delete stack.dataset.active; stack.classList.remove('paused'); }
    };
    cats.forEach(c => {
      c.addEventListener('pointerenter', () => setCat(c.dataset.cat));
      c.addEventListener('pointerleave', () => setCat(null));
      c.tabIndex = 0;
      c.addEventListener('focus', () => setCat(c.dataset.cat));
      c.addEventListener('blur', () => setCat(null));
    });
    // toque: alterna a categoria
    nodes.forEach(n => n.addEventListener('click', () => setCat(stack.dataset.active === n.dataset.cat ? null : n.dataset.cat)));
  }

  /* DIFERENCIAIS: linha de progresso e etapas acendendo conforme a rolagem */
  const flow = $('#flow');
  if (flow) {
    const steps = $$('.flow-step', flow);
    const upd = () => {
      const r = flow.getBoundingClientRect(), mid = innerHeight * .6;
      flow.style.setProperty('--p', Math.max(0, Math.min(1, (mid - r.top) / r.height)));
      steps.forEach(s => s.classList.toggle('on', s.getBoundingClientRect().top < mid));
    };
    if (calm) { steps.forEach(s => s.classList.add('on')); flow.style.setProperty('--p', 1); }
    else { addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd(); }
  }

  /* ───── GSAP: movimento de rolagem ───── */
  if (!window.gsap || !window.ScrollTrigger || calm) return;
  gsap.registerPlugin(ScrollTrigger);

  // títulos de seção: revelados palavra por palavra
  function split(elm) {
    elm.setAttribute('aria-label', elm.textContent.replace(/\s+/g, ' ').trim());
    const inners = [], frag = document.createDocumentFragment();
    (function walk(node, out) {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(tok => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { out.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
            const s = document.createElement('span'); s.className = 'wi'; s.textContent = tok; w.appendChild(s); out.appendChild(w); inners.push(s);
          });
        } else if (n.nodeType === 1) { const c = n.cloneNode(false); out.appendChild(c); walk(n, c); }
      });
    })(elm, frag);
    elm.textContent = ''; elm.appendChild(frag);
    return inners;
  }
  $$('.sec-title').forEach(t => {
    const ws = split(t);
    gsap.set(ws, { yPercent: 110 });
    ScrollTrigger.create({ trigger: t, start: 'top 88%', once: true, onEnter: () => gsap.to(ws, { yPercent: 0, duration: 1.1, stagger: .07, ease: 'power4.out' }) });
  });

  // hero sai com parallax
  gsap.to('.hero-text-col', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-photo', { yPercent: -5, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // órbita de tecnologias: entrada + gira mais rápido quando a página rola
  const orbit = $('.orbit');
  if (orbit) {
    gsap.from(orbit, { scale: .55, opacity: 0, rotate: -40, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: orbit, start: 'top 85%', once: true } });
    gsap.from($$('.chip', orbit), { scale: 0, duration: .8, stagger: .07, ease: 'back.out(2)', scrollTrigger: { trigger: orbit, start: 'top 80%', once: true }, delay: .35 });
    const anims = () => orbit.getAnimations({ subtree: true }).filter(a => a.animationName === 'spin');
    let boost = 0, last = 1;
    ScrollTrigger.create({ onUpdate: s => { boost = Math.min(Math.abs(s.getVelocity()) / 300, 14); } });
    gsap.ticker.add(() => {
      boost *= .93;
      const rate = 1 + boost;
      if (Math.abs(rate - last) < .02) return;
      last = rate;
      anims().forEach(a => a.updatePlaybackRate(rate));
    });
  }

  // vídeos dos projetos: parallax dentro do quadro + card entra com máscara
  $$('.proj-card').forEach(card => {
    const v = $('video', card);
    gsap.from($('.proj-img', card), { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
