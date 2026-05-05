/* ============================================================
   AFFETTO — main.js  (v9 / production port of synthesis HTML)
   ============================================================
   Behavior layer. Pulls data from window.AFFETTO (defined in
   content.js, loaded first) and binds to the DOM.

   Sections, in order:
     1. shared helpers (offsetTime, pad, reduceMotion)
     2. reveal-on-scroll (IntersectionObserver)
     3. hero-stream  — two-column live feed
     4. trace        — 5-trace cycle, 6 stations each
     5. agents       — featured panel + tile grid + interconnect
     6. architecture fade (system §03 layer stagger)
     7. schema rewrite (entity name cycle, once on entry)
     8. source selector (PMS chips + custom input)
     9. access form  (submit → received state)
   ============================================================ */

(function() {
  const A = window.AFFETTO || {};
  const PMS_LIST       = A.pmsList       || [];
  const AGENTS         = A.agents        || [];
  const HERO_FLOOR     = A.heroFloor     || [];
  const HERO_AGENTS    = A.heroAgents    || [];
  const SCHEMA_VARIANTS= A.schemaVariants|| {};
  const TRACES         = A.traces        || [];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function pad(n) { return String(n).padStart(2, '0'); }
  function offsetTime(secAgo) {
    const d = new Date(Date.now() - secAgo * 1000);
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  /* REVEAL */
  (function() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('seen'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('seen');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
  })();

  /* HERO STREAM — two columns, fresh-glow on new rows, drift up & out */
  function initStream(rowsContainerId, dataPool, isFloor, intervalMs) {
    const rows = document.getElementById(rowsContainerId);
    if (!rows) return;
    const MAX_VISIBLE = 8;
    let dataIdx = 0;
    let renderedRows = [];
    function pickNext() {
      const item = dataPool[dataIdx];
      dataIdx = (dataIdx + 1) % dataPool.length;
      return item;
    }
    function buildRow(item, secAgo) {
      const row = document.createElement('div');
      row.className = 'stream-row';
      if (isFloor) {
        row.innerHTML = `<span class="time">${offsetTime(secAgo)}</span><span class="text">${item}</span>`;
      } else {
        row.innerHTML = `<span class="time">${offsetTime(secAgo)}</span><span class="agent">${item.agent}</span><span class="text">${item.text}</span>`;
      }
      return row;
    }
    // Seed initial rows so the column fills from page load
    for (let i = MAX_VISIBLE - 1; i >= 0; i--) {
      const item = pickNext();
      const row = buildRow(item, (i + 1) * (intervalMs / 1000));
      row.classList.add('in');
      rows.appendChild(row);
      renderedRows.push(row);
    }
    if (reduceMotion) return;
    function tick() {
      const item = pickNext();
      const row = buildRow(item, 0);
      rows.appendChild(row);
      renderedRows.push(row);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          row.classList.add('in', 'fresh');
          setTimeout(() => row.classList.remove('fresh'), 1400);
        });
      });
      if (renderedRows.length > MAX_VISIBLE) {
        const old = renderedRows.shift();
        old.style.opacity = '0';
        old.style.transform = 'translateY(-8px)';
        setTimeout(() => old.remove(), 800);
      }
    }
    setInterval(tick, intervalMs);
  }
  initStream('hero-floor-rows', HERO_FLOOR,  true,  2600);
  initStream('hero-agent-rows', HERO_AGENTS, false, 3400);

  /* TRACE */
  (function() {
    const stationsEl = document.getElementById('trace-stations');
    const progressEl = document.getElementById('trace-progress');
    const entityEl   = document.getElementById('trace-entity-name');
    const numEl      = document.getElementById('trace-num');
    const indicators = document.querySelectorAll('#trace-indicators .indicator');
    if (!stationsEl) return;
    let traceIdx = 0, stepIdx = 0, traceTimer = null;

    function renderTrace() {
      const trace = TRACES[traceIdx];
      if (!trace) return;
      entityEl.classList.add('fading');
      setTimeout(() => {
        entityEl.innerHTML = `<span class="label">${trace.label}</span>${trace.title}`;
        entityEl.classList.remove('fading');
      }, 600);
      numEl.textContent = pad(traceIdx + 1);
      indicators.forEach((ind, i) => {
        ind.classList.remove('active', 'complete');
        if (i === traceIdx) ind.classList.add('active');
        else if (i < traceIdx) ind.classList.add('complete');
      });
      stationsEl.innerHTML = trace.steps.map((s, i) => `
        <div class="station" data-idx="${i}">
          <div class="station-node">${s.agent}</div>
          <div class="station-label">${s.label}</div>
          <div class="station-action">${s.action}</div>
        </div>
      `).join('');
      progressEl.style.width = '0%';
      stepIdx = 0;
      if (reduceMotion) {
        stationsEl.querySelectorAll('.station').forEach(s => s.classList.add('complete'));
        progressEl.style.width = '100%';
        return;
      }
      advanceStep();
    }

    function advanceStep() {
      if (traceTimer) clearTimeout(traceTimer);
      const trace = TRACES[traceIdx];
      if (!trace) return;
      const stations = stationsEl.querySelectorAll('.station');
      stations.forEach((s, i) => {
        s.classList.remove('active', 'complete');
        if (i < stepIdx) s.classList.add('complete');
        else if (i === stepIdx) s.classList.add('active');
      });
      const total = trace.steps.length - 1;
      progressEl.style.width = (total > 0 ? (stepIdx / total) * 100 : 0) + '%';
      stepIdx++;
      if (stepIdx <= trace.steps.length) {
        traceTimer = setTimeout(advanceStep, 900);
      } else {
        traceTimer = setTimeout(() => {
          traceIdx = (traceIdx + 1) % TRACES.length;
          renderTrace();
        }, 1800);
      }
    }
    indicators.forEach((ind, i) => {
      ind.addEventListener('click', () => { traceIdx = i; renderTrace(); });
    });
    renderTrace();
  })();

  /* AGENTS — featured panel + 9-tile grid + interconnect pulses */
  (function() {
    const tileGrid     = document.getElementById('tile-grid');
    const codeEl       = document.getElementById('featured-code');
    const nameEl       = document.getElementById('featured-name');
    const descEl       = document.getElementById('featured-desc');
    const ixEl         = document.getElementById('featured-ix');
    const taglineEl    = document.getElementById('featured-tagline');
    const totalEl      = document.getElementById('featured-total');
    const inText       = document.getElementById('bridge-in-text');
    const outText      = document.getElementById('bridge-out-text');
    const inLine       = document.getElementById('bridge-in');
    const outLine      = document.getElementById('bridge-out');
    const progressEl   = document.getElementById('featured-progress');
    const activityRows = document.getElementById('activity-rows');
    if (!tileGrid || !codeEl) return;

    tileGrid.innerHTML = AGENTS.map(a => `
      <button type="button" class="tile" data-code="${a.code}">
        <span class="tile-code"><span class="pip"></span>${a.code}</span>
        <span class="tile-name">${a.name}</span>
      </button>
    `).join('');
    totalEl.textContent = pad(AGENTS.length);

    let featuredIdx = 0, activityIdx = 0, renderedActivities = [];
    let rotateTimer = null, activityTimer = null, progressTimer = null;
    let userPaused = false, userPauseTimer = null, progressStart = 0;
    const FEATURED_DURATION = 9000;
    const ACTIVITY_INTERVAL = 1500;
    const MAX_ACTIVITY_ROWS = 5;

    function getFeatured() { return AGENTS[featuredIdx]; }
    function clearTimers() {
      if (rotateTimer) clearTimeout(rotateTimer);
      if (activityTimer) clearInterval(activityTimer);
      if (progressTimer) cancelAnimationFrame(progressTimer);
    }

    function setFeatured(idx, fromUser) {
      featuredIdx = ((idx % AGENTS.length) + AGENTS.length) % AGENTS.length;
      const agent = getFeatured();
      activityIdx = 0;
      tileGrid.querySelectorAll('.tile').forEach(t => {
        t.classList.toggle('featured', t.dataset.code === agent.code);
      });
      codeEl.classList.add('swapping');
      nameEl.classList.add('fading');
      descEl.classList.add('fading');
      inLine.classList.add('fading');
      outLine.classList.add('fading');
      setTimeout(() => {
        codeEl.textContent = agent.code;
        nameEl.textContent = agent.name;
        descEl.textContent = agent.desc;
        ixEl.textContent = agent.ix;
        taglineEl.textContent = agent.tagline;
        inText.innerHTML = agent.bridgeIn;
        outText.innerHTML = agent.bridgeOut;
        codeEl.classList.remove('swapping');
        nameEl.classList.remove('fading');
        descEl.classList.remove('fading');
        inLine.classList.remove('fading');
        outLine.classList.remove('fading');
      }, 400);

      activityRows.innerHTML = '';
      renderedActivities = [];
      for (let i = MAX_ACTIVITY_ROWS - 1; i >= 0; i--) addActivityRow(true, i + 1);

      if (fromUser) {
        userPaused = true;
        if (userPauseTimer) clearTimeout(userPauseTimer);
        userPauseTimer = setTimeout(() => { userPaused = false; }, 30000);
      }
      clearTimers();
      if (!reduceMotion) {
        activityTimer = setInterval(stepActivity, ACTIVITY_INTERVAL);
        animateProgress();
        rotateTimer = setTimeout(() => {
          if (!userPaused) setFeatured(featuredIdx + 1, false);
          else rotateTimer = setTimeout(() => setFeatured(featuredIdx + 1, false), FEATURED_DURATION);
        }, FEATURED_DURATION);
      }
    }

    function addActivityRow(seeded, secAgo) {
      const agent = getFeatured();
      const item = agent.activities[activityIdx % agent.activities.length];
      activityIdx++;
      const row = document.createElement('div');
      row.className = 'activity-row';
      row.innerHTML = `
        <span class="time">${offsetTime(seeded ? (secAgo * (ACTIVITY_INTERVAL / 1000)) : 0)}</span>
        <span class="text">${item}</span>
      `;
      activityRows.appendChild(row);
      renderedActivities.push(row);
      if (seeded) {
        row.classList.add('in');
      } else {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            row.classList.add('in', 'fresh');
            setTimeout(() => row.classList.remove('fresh'), 1400);
          });
        });
        pulseTriggers(agent.triggers);
      }
      if (renderedActivities.length > MAX_ACTIVITY_ROWS) {
        const old = renderedActivities.shift();
        old.style.opacity = '0';
        old.style.transform = 'translateY(-8px)';
        setTimeout(() => old.remove(), 800);
      }
    }
    function stepActivity() { addActivityRow(false); }

    function pulseTriggers(triggers) {
      if (!triggers || !triggers.length) return;
      triggers.forEach((code, i) => {
        const tile = tileGrid.querySelector(`.tile[data-code="${code}"]`);
        if (!tile || tile.classList.contains('featured')) return;
        setTimeout(() => {
          tile.classList.remove('pulse');
          void tile.offsetWidth;
          tile.classList.add('pulse');
          setTimeout(() => tile.classList.remove('pulse'), 1700);
        }, 200 + i * 240);
      });
    }

    function animateProgress() {
      progressStart = performance.now();
      function frame(t) {
        const elapsed = t - progressStart;
        const pct = Math.min(elapsed / FEATURED_DURATION, 1) * 100;
        progressEl.style.width = pct + '%';
        if (pct < 100) progressTimer = requestAnimationFrame(frame);
      }
      progressTimer = requestAnimationFrame(frame);
    }

    tileGrid.querySelectorAll('.tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const code = tile.dataset.code;
        const idx = AGENTS.findIndex(a => a.code === code);
        if (idx >= 0 && idx !== featuredIdx) setFeatured(idx, true);
      });
    });
    setFeatured(0, false);
  })();

  /* ARCHITECTURE FADE — §03 layer stagger on viewport entry */
  (function() {
    const diagram = document.getElementById('arch-diagram');
    if (!diagram) return;
    const layers = diagram.querySelectorAll('.layer');
    if (reduceMotion) {
      layers.forEach(l => l.classList.add('illuminated'));
      return;
    }
    let triggered = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !triggered) {
          triggered = true;
          layers.forEach((layer, i) =>
            setTimeout(() => layer.classList.add('illuminated'), 300 + i * 700)
          );
        }
      });
    }, { threshold: 0.25 });
    io.observe(diagram);
  })();

  /* SCHEMA REWRITE — entity name cycles once on viewport entry */
  (function() {
    const schema = document.getElementById('schema-entities');
    if (!schema || reduceMotion) return;
    const items = schema.querySelectorAll('.name[data-key]');
    let triggered = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !triggered) {
          triggered = true;
          items.forEach((item, i) => {
            const key = item.dataset.key;
            const variants = SCHEMA_VARIANTS[key];
            if (!variants || variants.length < 2) return;
            let idx = 0;
            const cycle = () => {
              if (idx >= variants.length - 1) return;
              item.classList.add('fading');
              setTimeout(() => {
                idx++;
                item.textContent = variants[idx];
                item.classList.remove('fading');
                setTimeout(cycle, 1400);
              }, 600);
            };
            setTimeout(cycle, 1200 + i * 250);
          });
        }
      });
    }, { threshold: 0.4 });
    io.observe(schema);
  })();

  /* SOURCE SELECTOR — PMS chips + custom input */
  (function() {
    const tagsEl       = document.getElementById('source-tags');
    const customWrap   = document.getElementById('source-custom');
    const customVal    = document.getElementById('source-custom-value');
    const customSubmit = document.getElementById('source-custom-submit');
    const nameEl       = document.getElementById('active-source-name');
    const statusEl     = document.getElementById('source-status');
    const statusText   = document.getElementById('source-status-text');
    if (!tagsEl) return;
    let active = 'Dentrix';

    function render() {
      tagsEl.innerHTML = '';
      PMS_LIST.forEach(name => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'source-tag' + (name === active ? ' active' : '');
        b.dataset.source = name;
        b.textContent = name;
        b.addEventListener('click', () => switchSource(name));
        tagsEl.appendChild(b);
      });
      const c = document.createElement('button');
      c.type = 'button';
      c.className = 'source-tag custom';
      c.textContent = '+ ADD YOURS';
      c.addEventListener('click', () => {
        customWrap.classList.toggle('show');
        if (customWrap.classList.contains('show')) customVal.focus();
      });
      tagsEl.appendChild(c);
    }

    function switchSource(name) {
      active = name;
      statusEl.classList.remove('live');
      statusText.textContent = 'SWITCHING…';
      tagsEl.querySelectorAll('.source-tag').forEach(t => {
        t.classList.toggle('active', t.dataset.source === name);
      });
      nameEl.textContent = name;
      document.querySelectorAll('#l0-tags .tag').forEach(t => {
        if (t.classList.contains('muted')) return;
        t.classList.toggle('active', t.dataset.source === name);
      });
      document.querySelectorAll('#l1-tags .tag').forEach(t => {
        if (t.classList.contains('muted')) return;
        t.classList.toggle('active', t.dataset.adapter === name);
      });
      const visible = Array.from(document.querySelectorAll('#l0-tags .tag[data-source]'))
        .some(t => t.dataset.source === name);
      if (!visible) {
        const first = document.querySelector('#l0-tags .tag[data-source]');
        if (first) first.classList.add('active');
      }
      setTimeout(() => {
        statusEl.classList.add('live');
        statusText.textContent = 'STABLE';
      }, 900);
    }

    customSubmit.addEventListener('click', () => {
      const v = customVal.value.trim();
      if (!v) return;
      nameEl.textContent = v;
      statusEl.classList.remove('live');
      statusText.textContent = 'SWITCHING…';
      tagsEl.querySelectorAll('.source-tag').forEach(t => t.classList.remove('active'));
      setTimeout(() => {
        statusEl.classList.add('live');
        statusText.textContent = 'STABLE';
      }, 900);
      active = v;
      customWrap.classList.remove('show');
      customVal.value = '';
    });
    customVal.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); customSubmit.click(); }
    });
    render();
  })();

  /* ACCESS FORM — Turnstile-protected submission to /api/access
     Flow:
       1. On page load, fetch /api/config for the public Turnstile site key
       2. Render the Turnstile widget in invisible / explicit-execute mode
       3. On form submit, validate email, call turnstile.execute(), wait for
          the token via the registered callback, then POST to /api/access
       4. On 200, show RECEIVED. On error, show message + re-enable submit. */
  (function() {
    const form = document.getElementById('access-form');
    if (!form) return;

    const submitBtn = form.querySelector('.field-submit');
    const emailInput = form.querySelector('#email-input');
    const audienceInput = form.querySelector('#audience-select');
    const widgetEl = document.getElementById('turnstile-widget');
    const errorEl = document.getElementById('access-error');
    if (!submitBtn || !emailInput || !widgetEl) return;

    let turnstileWidgetId = null;
    let turnstileSiteKey = null;
    let pendingSubmit = false;
    let submitting = false;

    function showError(msg) {
      if (!errorEl) return;
      errorEl.textContent = msg;
      errorEl.hidden = false;
    }
    function clearError() {
      if (!errorEl) return;
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
    function setSubmitting(on) {
      submitting = on;
      submitBtn.disabled = on;
    }
    function isValidEmail(v) {
      return typeof v === 'string' && v.length > 0 && v.length <= 254 &&
             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    /* Turnstile script onload — defined on window so the global
       <script ... onload=onTurnstileScriptLoad> callback finds it. */
    window.onTurnstileScriptLoad = function() {
      fetch('/api/config', { headers: { 'Accept': 'application/json' } })
        .then(r => r.ok ? r.json() : Promise.reject(new Error('config fetch failed')))
        .then(cfg => {
          turnstileSiteKey = cfg.turnstileSiteKey || '';
          if (!turnstileSiteKey || !window.turnstile) return;
          turnstileWidgetId = window.turnstile.render(widgetEl, {
            sitekey: turnstileSiteKey,
            size: 'invisible',
            execution: 'execute',
            callback: onTurnstileVerified,
            'error-callback': onTurnstileError,
            'expired-callback': onTurnstileExpired,
          });
        })
        .catch(err => {
          console.error('Turnstile init failed', err);
        });
    };

    function onTurnstileVerified(token) {
      if (!pendingSubmit) return;
      pendingSubmit = false;
      submitToApi(token);
    }
    function onTurnstileError() {
      pendingSubmit = false;
      setSubmitting(false);
      showError('VERIFICATION FAILED. PLEASE RETRY.');
    }
    function onTurnstileExpired() {
      // Token expired before submit — refresh quietly. The next submit will
      // execute() again to get a fresh token.
      if (turnstileWidgetId !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
    }

    function submitToApi(turnstileToken) {
      const payload = {
        email: emailInput.value.trim(),
        audience: audienceInput ? audienceInput.value : '',
        turnstileToken,
      };
      fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(r => r.json().then(body => ({ status: r.status, body })))
        .then(({ status, body }) => {
          if (status === 200 && body && body.ok) {
            submitBtn.innerHTML = 'RECEIVED ✓';
            submitBtn.disabled = true;
            clearError();
          } else {
            const msg = (body && body.error) ? body.error : 'Something went wrong. Please try again.';
            showError(msg.toUpperCase());
            setSubmitting(false);
            if (turnstileWidgetId !== null && window.turnstile) {
              window.turnstile.reset(turnstileWidgetId);
            }
          }
        })
        .catch(err => {
          console.error('access submit error', err);
          showError('NETWORK ERROR. PLEASE TRY AGAIN.');
          setSubmitting(false);
          if (turnstileWidgetId !== null && window.turnstile) {
            window.turnstile.reset(turnstileWidgetId);
          }
        });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (submitting) return;
      clearError();

      const email = emailInput.value.trim();
      if (!isValidEmail(email)) {
        showError('PLEASE ENTER A VALID EMAIL ADDRESS.');
        return;
      }

      if (turnstileWidgetId === null || !window.turnstile) {
        showError('VERIFICATION NOT READY. PLEASE TRY AGAIN IN A MOMENT.');
        return;
      }

      setSubmitting(true);
      pendingSubmit = true;
      window.turnstile.execute(turnstileWidgetId);
    });
  })();

})();
