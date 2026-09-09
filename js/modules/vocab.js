/* ===== Словарь и карточки (SRS) ===== */
(function () {
  const E = HL.esc;
  HL.query = function () { return Object.fromEntries(new URLSearchParams(location.hash.split("?")[1] || "")); };
  const POS = { n: "сущ.", v: "гл.", adj: "прил.", adv: "нареч.", prep: "предл.", pron: "мест.", num: "числ.", conj: "союз", phrase: "фраза", q: "вопр.", part: "част." };
  HL.wordRow = function (w, opts) {
    opts = opts || {}; const st = HL.store.get(); const star = st.learning[w.id];
    return `<div class="word-row" data-id="${E(w.id)}">
      <div><span class="he">${E(w.he)}</span> ${HL.speakBtn(w.he)}<br><span class="tr">${E(w.tr)}</span></div>
      <div class="ru-cell">${E(w.ru)} <span class="muted small">${POS[w.pos] || ""}</span>${w.g ? `<span class="gender ${w.g}">${w.g === "m" ? "м" : "ж"}</span>` : ""}${w.pl ? ` <span class="small muted">мн.: <span class="he" style="font-size:1em">${E(w.pl)}</span></span>` : ""}</div>
      <div class="row" style="gap:4px"><span class="badge ${w.level}">${w.level}</span><button class="icon-btn star ${star ? "on" : ""}" title="В избранное для карточек">${star ? "★" : "☆"}</button></div>
      ${w.ex && opts.ex !== false ? `<div class="ex-line"><span class="he">${E(w.ex)}</span> ${HL.speakBtn(w.ex)} <span class="tr">${E(w.exTr || "")}</span> — ${E(w.exRu || "")}</div>` : ""}
      ${(w.note || w.root) && opts.note !== false ? `<div class="note">${w.root ? `<span class="badge">корень <span class="he" style="font-size:1em">${E(w.root)}</span></span> ` : ""}${E(w.note || "")}</div>` : ""}
    </div>`;
  };
  document.addEventListener("click", e => {
    const b = e.target.closest(".star"); if (!b) return; const row = b.closest("[data-id]"); if (!row) return;
    const st = HL.store.get(); const id = row.dataset.id; if (st.learning[id]) delete st.learning[id]; else st.learning[id] = 1; HL.store.save();
    b.classList.toggle("on", !!st.learning[id]); b.textContent = st.learning[id] ? "★" : "☆"; HL.toast(st.learning[id] ? "Добавлено в избранное" : "Убрано из избранного");
  });

  // ---------- Словарь ----------
  HL.route("/vocab", function () {
    const q0 = HL.query(); let level = q0.level || "all", topic = q0.topic || "all", q = "", showEx = true, page = 0; const PER = 60;
    const words = HL.allWords();
    HL.render(`
      <h1>📚 Словарь</h1>
      <p class="muted">${words.length} слов с огласовками, транслитерацией, примером и заметками. Отмечайте ★ слова, которые хотите учить отдельно — они попадут в набор «Избранное» в карточках.</p>
      <div class="filters">
        <select id="v-level"><option value="all">Все уровни</option>${["A0", "A1", "A2", "B1", "B2"].map(l => `<option ${l === level ? "selected" : ""}>${l}</option>`).join("")}</select>
        <select id="v-topic"><option value="all">Все темы</option>${HL.data.topics.map(t => `<option value="${t.key}" ${t.key === topic ? "selected" : ""}>${t.icon} ${E(t.ru)}</option>`).join("")}</select>
        <input type="search" id="v-q" class="search-box" placeholder="Поиск: иврит, транслит, русский…">
        <label class="chip"><input type="checkbox" id="v-ex" checked> примеры</label>
        <a class="btn sm primary" id="v-cards" href="#/cards">🃏 Учить эти слова</a>
      </div>
      <div class="muted small mb" id="v-count"></div>
      <div class="word-list" id="v-list"></div>
      <div class="center mt" id="v-more"></div>
    `);
    const list = document.getElementById("v-list"), more = document.getElementById("v-more"), cnt = document.getElementById("v-count");
    function filtered() {
      const qq = q.toLowerCase(), qh = HL.stripNikud(q);
      return words.filter(w => (level === "all" || w.level === level) && (topic === "all" || w.topic === topic) && (!q || w.ru.toLowerCase().includes(qq) || w.tr.toLowerCase().includes(qq) || HL.stripNikud(w.he).includes(qh)));
    }
    function draw(reset) {
      if (reset) page = 0; const f = filtered();
      cnt.textContent = `${f.length} ${HL.plural(f.length, "слово", "слова", "слов")}`;
      list.innerHTML = f.slice(0, (page + 1) * PER).map(w => HL.wordRow(w, { ex: showEx })).join("") || `<div class="empty">Ничего не найдено</div>`;
      more.innerHTML = f.length > (page + 1) * PER ? `<button class="btn" id="v-next">Показать ещё (${f.length - (page + 1) * PER})</button>` : "";
      const nb = document.getElementById("v-next"); if (nb) nb.onclick = () => { page++; draw(false); };
      document.getElementById("v-cards").href = `#/cards?level=${level}&topic=${topic}`;
      HL.applySettings();
    }
    document.getElementById("v-level").onchange = e => { level = e.target.value; draw(true); };
    document.getElementById("v-topic").onchange = e => { topic = e.target.value; draw(true); };
    document.getElementById("v-q").oninput = e => { q = e.target.value.trim(); draw(true); };
    document.getElementById("v-ex").onchange = e => { showEx = e.target.checked; draw(false); };
    draw(true);
  });

  // ---------- Карточки ----------
  HL.route("/cards", function () {
    const q0 = HL.query(); const st = HL.store.get();
    let level = q0.level || "A0", topic = q0.topic || "all", mode = st.settings.cardMode || "he-ru", newCount = st.settings.cardNew || 10, useStar = q0.set === "star";
    function pool() { const w = HL.allWords(); if (useStar) return w.filter(x => st.learning[x.id]); return w.filter(x => (level === "all" || x.level === level) && (topic === "all" || x.topic === topic)); }
    function setup() {
      const p = pool(); const ids = p.map(w => w.id); const due = HL.store.srsDue(ids).length, fresh = HL.store.srsNew(ids).length; const s = HL.store.srsStats();
      HL.render(`
        <div class="flash-wrap">
          <h1>🃏 Карточки</h1>
          <p class="muted">Интервальное повторение (SM-2): оценивайте, насколько легко вспомнили слово. «Снова» — через 10 минут, «Легко» — через несколько дней, а затем недель. На каждой карточке есть озвучка и пример.</p>
          <div class="card">
            <div class="row mb"><span class="chip ${!useStar ? "on" : ""}" id="c-set-all">По уровню и теме</span><span class="chip ${useStar ? "on" : ""}" id="c-set-star">★ Избранное (${Object.keys(st.learning).length})</span></div>
            <div class="row mb" ${useStar ? 'style="display:none"' : ""}>
              <select id="c-level"><option value="all" ${level === "all" ? "selected" : ""}>Все уровни</option>${["A0", "A1", "A2", "B1", "B2"].map(l => `<option ${l === level ? "selected" : ""}>${l}</option>`).join("")}</select>
              <select id="c-topic"><option value="all">Все темы</option>${HL.data.topics.map(t => `<option value="${t.key}" ${t.key === topic ? "selected" : ""}>${t.icon} ${E(t.ru)}</option>`).join("")}</select>
            </div>
            <div class="row mb">
              <label>Режим: <select id="c-mode"><option value="he-ru" ${mode === "he-ru" ? "selected" : ""}>Иврит → русский</option><option value="ru-he" ${mode === "ru-he" ? "selected" : ""}>Русский → иврит</option><option value="type" ${mode === "type" ? "selected" : ""}>Печатать на иврите</option></select></label>
              <label>Новых за сессию: <select id="c-new">${[5, 10, 15, 20, 30].map(n => `<option ${n === newCount ? "selected" : ""}>${n}</option>`).join("")}</select></label>
            </div>
            <div class="grid tight">
              <div class="stat"><div class="n">${p.length}</div><div class="l">слов в наборе</div></div>
              <div class="stat"><div class="n" style="color:var(--bad)">${due}</div><div class="l">к повторению</div></div>
              <div class="stat"><div class="n" style="color:var(--ok)">${fresh}</div><div class="l">ещё не начаты</div></div>
              <div class="stat"><div class="n">${s.due}</div><div class="l">всего на сегодня</div></div>
            </div>
            <div class="row mt">
              <button class="btn primary lg" id="c-start" ${!p.length ? "disabled" : ""}>▶ Начать (${Math.min(due, 60) + Math.min(fresh, newCount)} карточек)</button>
              <button class="btn lg" id="c-browse">👀 Просмотреть набор</button>
            </div>
            ${!p.length && useStar ? `<p class="muted small mt">Избранное пусто. Отмечайте слова звёздочкой ★ в <a href="#/vocab">словаре</a>.</p>` : ""}
          </div>
          <div class="tip mt">Печатать на иврите можно без огласовок — проверка их игнорирует. Раскладка иврита включается в настройках системы; на телефоне — добавьте клавиатуру «Иврит».</div>
        </div>`);
      document.getElementById("c-set-all").onclick = () => { useStar = false; setup(); };
      document.getElementById("c-set-star").onclick = () => { useStar = true; setup(); };
      const lv = document.getElementById("c-level"); if (lv) lv.onchange = e => { level = e.target.value; setup(); };
      const tp = document.getElementById("c-topic"); if (tp) tp.onchange = e => { topic = e.target.value; setup(); };
      document.getElementById("c-mode").onchange = e => { mode = e.target.value; HL.store.setSetting("cardMode", mode); };
      document.getElementById("c-new").onchange = e => { newCount = +e.target.value; HL.store.setSetting("cardNew", newCount); };
      document.getElementById("c-start").onclick = () => session(p);
      document.getElementById("c-browse").onclick = () => { HL.render(`<div class="flash-wrap"><a class="back" href="#/cards">← Назад к карточкам</a><h2>Набор (${p.length})</h2><div class="word-list">${p.map(w => HL.wordRow(w)).join("")}</div></div>`); };
    }
    function session(p) {
      const ids = p.map(w => w.id); const due = HL.shuffle(HL.store.srsDue(ids)).slice(0, 60), fresh = HL.shuffle(HL.store.srsNew(ids)).slice(0, newCount);
      let queue = HL.shuffle(due.concat(fresh)).map(id => HL.wordById(id)); const total = queue.length; let done = 0, again = 0, good = 0, flipped = false, cur;
      if (!total) { HL.toast("На сегодня всё повторено! Увеличьте число новых слов."); return; }
      function next() {
        if (!queue.length) return finish();
        cur = queue.shift(); flipped = false; draw();
      }
      function draw() {
        const front = mode === "ru-he" ? `<div style="font-size:1.6rem;font-weight:500">${E(cur.ru)}</div><div class="muted small">${POS[cur.pos] || ""}${cur.g ? ", " + (cur.g === "m" ? "м.р." : "ж.р.") : ""}</div>` : `<div class="he huge">${E(cur.he)}</div>${mode === "type" ? "" : `<div>${HL.speakBtn(cur.he)}</div>`}`;
        const back = `<div class="he big">${E(cur.he)}</div><div class="tr">${E(cur.tr)}</div><div style="font-size:1.3rem;font-weight:500">${E(cur.ru)}</div>${cur.g ? `<span class="gender ${cur.g}">${cur.g === "m" ? "м.р." : "ж.р."}</span>` : ""}<div>${HL.speakBtn(cur.he)}</div>${cur.ex ? `<div class="ex"><span class="he" style="font-size:1.1em">${E(cur.ex)}</span><br><span class="tr">${E(cur.exTr || "")}</span> — ${E(cur.exRu || "")}</div>` : ""}`;
        const c = HL.store.srsGet(cur.id);
        HL.render(`<div class="flash-wrap">
          <div class="row between"><a class="back" href="#/cards" id="c-quit">← Завершить</a><span class="muted small">${done}/${total} · ${c ? `интервал ${c.iv} дн.` : "новое слово"}</span></div>
          <div class="progress-bar"><div style="width:${done / total * 100}%"></div></div>
          ${mode === "type" ? `<div class="card mt center"><div style="font-size:1.5rem;font-weight:500">${E(cur.ru)}</div><div class="muted small">${POS[cur.pos] || ""}${cur.g ? ", " + (cur.g === "m" ? "м.р." : "ж.р.") : ""}</div>
              <input class="he-input mt" id="c-type" placeholder="הקלידו כאן" autocomplete="off" style="width:100%;max-width:360px"><div class="mt"><button class="btn primary" id="c-check">Проверить</button></div><div id="c-type-res" class="mt"></div></div>`
            : `<div class="flash ${flipped ? "flipped" : ""}" id="c-card"><div class="flash-inner"><div class="flash-face">${front}<span class="hint">нажмите или пробел, чтобы перевернуть</span></div><div class="flash-face back">${back}</div></div></div>`}
          <div class="rate" id="c-rate" style="${flipped ? "" : "visibility:hidden"}">
            <button class="btn again" data-g="0">Снова<small>10 мин · 1</small></button><button class="btn hard" data-g="1">Трудно<small>1–2 дня · 2</small></button><button class="btn good" data-g="2">Хорошо<small>${c && c.reps ? Math.round(c.iv * c.ef) : 1}–4 дня · 3</small></button><button class="btn easy" data-g="3">Легко<small>${c && c.reps ? Math.round(c.iv * c.ef * 1.3) : 3}+ дней · 4</small></button>
          </div>
        </div>`);
        const card = document.getElementById("c-card"); if (card) card.onclick = flip;
        document.getElementById("c-rate").onclick = e => { const b = e.target.closest("[data-g]"); if (b) rate(+b.dataset.g); };
        const inp = document.getElementById("c-type");
        if (inp) { inp.focus(); const check = () => { const ok = HL.normHe(inp.value) === HL.normHe(cur.he); const res = document.getElementById("c-type-res"); res.innerHTML = `<div class="${ok ? "feedback ok" : "feedback bad"}" style="font-size:1.1rem">${ok ? "✅ Верно!" : "❌ Правильно:"} <span class="he big">${E(cur.he)}</span> <span class="tr">${E(cur.tr)}</span> ${HL.speakBtn(cur.he)}</div>${cur.ex ? `<div class="small muted mt"><span class="he">${E(cur.ex)}</span> — ${E(cur.exRu || "")}</div>` : ""}`; flipped = true; document.getElementById("c-rate").style.visibility = ""; inp.disabled = true; HL.applySettings(); if (ok) HL.speech.speak(cur.he); }; document.getElementById("c-check").onclick = check; inp.onkeydown = e => { if (e.key === "Enter") check(); }; }
        if (mode === "ru-he" || mode === "he-ru") { /* автоозвучка при показе иврита */ if (mode === "he-ru") setTimeout(() => HL.speech.speak(cur.he), 200); }
      }
      function flip() { if (flipped) return; flipped = true; const card = document.getElementById("c-card"); card.classList.add("flipped"); document.getElementById("c-rate").style.visibility = ""; if (mode === "ru-he") HL.speech.speak(cur.he); }
      function rate(g) { if (!flipped) return; HL.store.srsRate(cur.id, g); done++; if (g === 0) { again++; queue.push(cur); total === done ? null : 0; } else good++; next(); }
      function finish() {
        document.onkeydown = null;
        HL.render(`<div class="flash-wrap"><div class="result-box"><div class="big">🎉</div><h2>Сессия завершена</h2><p>Карточек: <strong>${done}</strong> · Хорошо/легко: <strong style="color:var(--ok)">${good}</strong> · Снова: <strong style="color:var(--bad)">${again}</strong></p>
          <p class="muted small">Слова с оценкой «Снова» вернулись в очередь и были повторены. Следующее повторение — по расписанию SRS.</p>
          <div class="row" style="justify-content:center"><a class="btn primary" href="#/cards">Ещё сессия</a><a class="btn" href="#/games">🎮 Закрепить в игре</a></div></div></div>`);
      }
      document.onkeydown = e => { if (e.target.tagName === "INPUT") return; if (e.code === "Space") { e.preventDefault(); flip(); } else if (["1", "2", "3", "4"].includes(e.key)) rate(+e.key - 1); };
      const origDispatch = HL.dispatch; window.addEventListener("hashchange", function off() { document.onkeydown = null; window.removeEventListener("hashchange", off); });
      next();
    }
    setup();
  });
})();
