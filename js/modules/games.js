/* ===== Игры ===== */
(function () {
  const E = HL.esc;
  HL.gameMeta = {
    letters: { icon: "🔤", title: "Буквы", desc: "Узнавайте буквы по названию и звуку, различайте похожие. Три режима.", levels: ["A0"] },
    memory: { icon: "🧩", title: "Пары", desc: "Классическая «мемори»: найдите пары иврит ↔ русский. Тренирует зрительную память.", levels: ["A0", "A1", "A2", "B1", "B2"] },
    gender: { icon: "♀♂", title: "Он или она?", desc: "Род существительных на скорость. После игры — подсказки, как угадывать род.", levels: ["A0", "A1", "A2", "B1", "B2"] },
    builder: { icon: "🧱", title: "Собери фразу", desc: "Расставьте слова из живых диалогов в правильном порядке.", levels: ["A0", "A1", "A2", "B1"] },
    verbs: { icon: "🔁", title: "Спряжение", desc: "Глагол + лицо + время → правильная форма. Все биньяны.", levels: ["A1", "A2", "B1"] },
    numbers: { icon: "🔢", title: "Числа", desc: "Услышьте или прочитайте число на иврите и введите цифрами — и наоборот.", levels: ["A0", "A1", "A2"] },
    speller: { icon: "✍️", title: "Собери слово", desc: "Соберите слово из перемешанных букв по переводу и звучанию. Учит писать.", levels: ["A0", "A1", "A2", "B1", "B2"] },
    sprint: { icon: "⚡", title: "Спринт", desc: "60 секунд: верный перевод или нет? Быстрое узнавание слов.", levels: ["A0", "A1", "A2", "B1", "B2"] },
    roots: { icon: "🌳", title: "Корни", desc: "Найдите слово с нужным корнем. Учит видеть систему иврита.", levels: ["A1", "A2", "B1", "B2"] }
  };
  const LV = ["A0", "A1", "A2", "B1", "B2"];
  function lvlWords(level) { const w = HL.allWords(); return level === "all" ? w : w.filter(x => LV.indexOf(x.level) <= LV.indexOf(level)); }
  function getLevel() { return HL.store.get().settings.gameLevel || "A1"; }
  function levelChips(cur, allowed) { return `<div class="chips" id="g-lv">${(allowed || LV).map(l => `<span class="chip ${l === cur ? "on" : ""}" data-l="${l}">${l}</span>`).join("")}</div>`; }
  function bindLevel(restart) { const c = document.getElementById("g-lv"); if (!c) return; c.onclick = e => { const x = e.target.closest(".chip"); if (!x) return; HL.store.setSetting("gameLevel", x.dataset.l); restart(); }; }
  function head(name, extra) { const m = HL.gameMeta[name]; return `<div class="game-head"><div><a class="back" href="#/games">← Все игры</a><h1 style="margin:0">${m.icon} ${E(m.title)}</h1></div>${extra || ""}</div>`; }
  function result(name, score, total, extraHtml) {
    HL.store.gameResult(name, score); const best = HL.store.get().games[name].best;
    return `<div class="result-box pop"><div class="big">${total ? Math.round(score / total * 100) + "%" : score}</div><h2>${score === total && total ? "Идеально! 🏆" : score >= (total || score) * 0.7 ? "Отлично! 🎉" : "Хорошая тренировка 💪"}</h2><p>Результат: <strong>${score}</strong>${total ? ` из ${total}` : " очков"} · Лучший: <strong>${best}</strong></p>${extraHtml || ""}<div class="row mt" style="justify-content:center"><button class="btn primary" id="g-again">🔄 Ещё раз</button><a class="btn" href="#/games">Другие игры</a></div></div>`;
  }
  function wrap(name, inner, extra) { HL.render(`<div class="game-wrap">${head(name, extra)}${inner}</div>`); }
  function fourOptions(correct, pool, key) { const others = HL.shuffle(pool.filter(x => key(x) !== key(correct))).slice(0, 3); return HL.shuffle([correct].concat(others)); }

  // ---------- Хаб ----------
  HL.route("/games", function () {
    const st = HL.store.get();
    HL.render(`<h1>🎮 Игры</h1><p class="muted">Игра — это повторение, которое не надоедает. Каждая игра тренирует свой навык: узнавание букв, зрительную память, чувство рода, порядок слов, спряжение, числа, орфографию и понимание корней. Уровень сложности выбирается внутри игры.</p>
      <div class="grid">${Object.entries(HL.gameMeta).map(([k, m]) => `<a class="card link" href="#/games/${k}"><div class="icon">${m.icon}</div><h3>${E(m.title)}</h3><p class="meta">${E(m.desc)}</p><div class="row small muted">${m.levels.map(l => HL.badge(l)).join(" ")}${st.games[k] ? `<span style="margin-left:auto">🏅 ${st.games[k].best}</span>` : ""}</div></a>`).join("")}</div>`);
  });

  // ---------- 1. Буквы ----------
  HL.route("/games/letters", function () {
    const A = HL.data.alphabet; let mode = "name", q = 0, score = 0; const N = 15; let order = [];
    function start() { order = HL.shuffle(A.concat(HL.sample(A, N - A.length > 0 ? N - A.length : 0))).slice(0, N); q = 0; score = 0; ask(); }
    function ask() {
      if (q >= N) { wrap("letters", result("letters", score, N)); document.getElementById("g-again").onclick = start; return; }
      const cur = order[q]; let prompt, opts, key, show;
      if (mode === "name") { prompt = `<div class="he huge">${E(cur.l)}</div><p class="muted">Как называется эта буква?</p>`; opts = fourOptions(cur, A, x => x.name); show = x => E(x.name); key = x => x.name; }
      else if (mode === "glyph") { prompt = `<div style="font-size:2rem;font-weight:600">${E(cur.name)}</div><p class="muted">Какая это буква?</p>`; opts = fourOptions(cur, A, x => x.l); show = x => `<span class="he">${E(x.l)}</span>`; key = x => x.l; }
      else { const w = HL.pick(cur.ex); prompt = `<div class="he huge">${E(w[0])}</div><p class="muted">Как читается это слово? ${HL.speakBtn(w[0])}</p>`; const pool = A.flatMap(a => a.ex.map(e => ({ tr: e[1], l: a.l }))); opts = fourOptions({ tr: w[1], l: cur.l }, pool, x => x.tr); show = x => E(x.tr); key = x => x.tr; cur._ans = w[1]; }
      wrap("letters", `<div class="row mb"><span class="chip ${mode === "name" ? "on" : ""}" data-m="name">Буква → название</span><span class="chip ${mode === "glyph" ? "on" : ""}" data-m="glyph">Название → буква</span><span class="chip ${mode === "read" ? "on" : ""}" data-m="read">Прочитай слово</span></div>
        <div class="progress-bar mb"><div style="width:${q / N * 100}%"></div></div>
        <div class="big-q">${prompt}</div><div class="answers">${opts.map((o, i) => `<button class="btn ${mode === "glyph" ? "he" : ""}" data-k="${E(key(o))}">${show(o)}</button>`).join("")}</div>`, `<div class="score">${q + 1}/${N} · <span class="ok">${score}</span></div>`);
      document.querySelectorAll("[data-m]").forEach(c => c.onclick = () => { mode = c.dataset.m; start(); });
      const ans = mode === "read" ? cur._ans : key(cur);
      document.querySelector(".answers").onclick = e => { const b = e.target.closest("[data-k]"); if (!b || b.disabled) return; const ok = b.dataset.k === ans; document.querySelectorAll(".answers .btn").forEach(x => { x.disabled = true; if (x.dataset.k === ans) x.classList.add("ok"); }); if (!ok) { b.classList.add("bad", "shake"); } else score++; if (mode !== "read") HL.speech.speak(HL.pick(cur.ex)[0]); setTimeout(() => { q++; ask(); }, ok ? 600 : 1300); };
    }
    start();
  });

  // ---------- 2. Пары ----------
  HL.route("/games/memory", function () {
    let level = getLevel(), moves = 0, open = [], matched = 0, cards = [], startT;
    function start() {
      level = getLevel(); const words = HL.sample(lvlWords(level).filter(w => w.ru.length < 26), 8); moves = 0; matched = 0; open = []; startT = Date.now();
      cards = HL.shuffle(words.flatMap(w => [{ id: w.id, side: "he", text: w.he }, { id: w.id, side: "ru", text: w.ru.split(";")[0] }]));
      wrap("memory", levelChips(level) + `<div class="memory-grid mt" id="mem">${cards.map((c, i) => `<div class="mem-card" data-i="${i}"><span class="q">?</span></div>`).join("")}</div>`, `<div class="score">Ходов: <span id="mv">0</span></div>`);
      bindLevel(start);
      document.getElementById("mem").onclick = e => { const el = e.target.closest(".mem-card"); if (!el || el.classList.contains("open") || open.length === 2) return; const i = +el.dataset.i; const c = cards[i]; el.classList.add("open"); el.innerHTML = c.side === "he" ? `<span class="he">${E(c.text)}</span>` : E(c.text); if (c.side === "he") HL.speech.speak(c.text); open.push(i); if (open.length === 2) { moves++; document.getElementById("mv").textContent = moves; const [a, b] = open.map(k => cards[k]); if (a.id === b.id && a.side !== b.side) { open.forEach(k => document.querySelector(`[data-i="${k}"]`).classList.add("matched")); open = []; matched++; if (matched === 8) setTimeout(finish, 500); } else setTimeout(() => { open.forEach(k => { const x = document.querySelector(`[data-i="${k}"]`); x.classList.remove("open"); x.innerHTML = '<span class="q">?</span>'; }); open = []; }, 900); } };
    }
    function finish() { const sec = Math.round((Date.now() - startT) / 1000); const score = Math.max(0, 100 - (moves - 8) * 5 - Math.floor(sec / 10)); wrap("memory", result("memory", score, 0, `<p class="muted">${moves} ходов · ${sec} сек. Очки: 100 − 5 за каждый лишний ход − 1 за каждые 10 секунд.</p>`)); document.getElementById("g-again").onclick = start; }
    start();
  });

  // ---------- 3. Род ----------
  HL.route("/games/gender", function () {
    let level, words, q, score, streak, best = 0; const N = 20;
    function start() { level = getLevel(); words = HL.sample(lvlWords(level).filter(w => w.pos === "n" && w.g), N); q = 0; score = 0; streak = 0; ask(); }
    function ask() {
      if (q >= words.length) { wrap("gender", result("gender", score, words.length, `<div class="tip" style="text-align:left"><strong>Как угадывать род:</strong> слова на ־ָה и ־ת (־ֶת, ־וּת, ־ִית) почти всегда женские; парные части тела (יָד, עַיִן, רֶגֶל) — женские; названия городов и стран — женские; остальное — чаще мужское. Исключения учите отдельно: לַיְלָה (м.), אַבָּא (м.), כּוֹס, עִיר, דֶּרֶךְ, אֶרֶץ (ж.).</div>`)); document.getElementById("g-again").onclick = start; return; }
      const w = words[q];
      wrap("gender", levelChips(level) + `<div class="progress-bar mt mb"><div style="width:${q / words.length * 100}%"></div></div><div class="big-q"><div class="he huge">${E(w.he)}</div><div class="tr">${E(w.tr)}</div><div class="muted dlg-ru">${E(w.ru)}</div>${HL.speakBtn(w.he)}</div>
        <div class="answers"><button class="btn he" data-g="m">זָכָר <small style="font-family:var(--font);font-size:.8rem">(он) · ←</small></button><button class="btn he" data-g="f">נְקֵבָה <small style="font-family:var(--font);font-size:.8rem">(она) · →</small></button></div><p class="center streak">Серия: ${streak} 🔥</p>`, `<div class="score">${q + 1}/${words.length} · <span class="ok">${score}</span></div>`);
      bindLevel(start);
      const answer = g => { const ok = g === w.g; if (ok) { score++; streak++; } else streak = 0; const btn = document.querySelector(`[data-g="${w.g}"]`); btn.classList.add("ok"); if (!ok) document.querySelector(`[data-g="${g}"]`).classList.add("bad", "shake"); document.querySelectorAll(".answers .btn").forEach(b => b.disabled = true); document.onkeydown = null; setTimeout(() => { q++; ask(); }, ok ? 450 : 1200); };
      document.querySelector(".answers").onclick = e => { const b = e.target.closest("[data-g]"); if (b && !b.disabled) answer(b.dataset.g); };
      document.onkeydown = e => { if (e.key === "ArrowLeft") answer("m"); if (e.key === "ArrowRight") answer("f"); };
    }
    window.addEventListener("hashchange", function off() { document.onkeydown = null; window.removeEventListener("hashchange", off); });
    start();
  });

  // ---------- 4. Собери фразу ----------
  HL.route("/games/builder", function () {
    let level, items, q, score; const N = 10;
    function pool() { const lv = LV.indexOf(level); const out = []; (HL.data.dialogues || []).forEach(d => { if (LV.indexOf(d.level) <= lv) d.lines.forEach(l => { const w = l.he.split(/\s+/); if (w.length >= 3 && w.length <= 9) out.push({ he: l.he, ru: l.ru, words: w }); }); }); (HL.data.texts || []).forEach(t => { if (LV.indexOf(t.level) <= lv) (t.paragraphs || []).forEach(p => { const w = p.he.split(/\s+/); if (w.length >= 3 && w.length <= 9) out.push({ he: p.he, ru: p.ru, words: w }); }); }); return out; }
    function start() { level = getLevel(); items = HL.sample(pool(), N); q = 0; score = 0; ask(); }
    function ask() {
      if (q >= items.length) { wrap("builder", result("builder", score, items.length)); document.getElementById("g-again").onclick = start; return; }
      const it = items[q];
      wrap("builder", levelChips(level, ["A0", "A1", "A2", "B1"]) + `<div class="progress-bar mt mb"><div style="width:${q / items.length * 100}%"></div></div><div class="big-q"><div style="font-size:1.2rem">${E(it.ru)}</div><p class="muted small">Нажимайте на слова в правильном порядке (справа налево). Нажмите на слово в верхней области, чтобы вернуть его.</p></div>
        <div class="order-area" id="b-area"></div><div class="order-bank" id="b-bank">${HL.shuffle(it.words.map((w, i) => ({ w, i }))).map(o => `<span class="word-tile" data-j="${o.i}" data-w="${E(o.w)}">${E(o.w)}</span>`).join("")}</div>
        <div class="row mt"><button class="btn primary" id="b-check">Проверить</button><button class="btn" id="b-hint">💡 Подсказка</button><button class="btn" id="b-skip">Пропустить</button></div><div class="feedback mt" id="b-fb"></div>`, `<div class="score">${q + 1}/${items.length} · <span class="ok">${score}</span></div>`);
      bindLevel(start); const area = document.getElementById("b-area"), bank = document.getElementById("b-bank");
      bank.onclick = e => { const t = e.target.closest(".word-tile"); if (!t || t.classList.contains("used")) return; const c = t.cloneNode(true); c.dataset.src = t.dataset.j; area.appendChild(c); t.classList.add("used"); if (area.children.length === it.words.length) check(); };
      area.onclick = e => { const t = e.target.closest(".word-tile"); if (!t) return; bank.querySelector(`[data-j="${t.dataset.src}"]`).classList.remove("used"); t.remove(); };
      function check() { const got = [...area.children].map(t => t.dataset.w).join(" "); const ok = HL.normHe(got) === HL.normHe(it.he); const fb = document.getElementById("b-fb"); fb.className = "feedback mt " + (ok ? "ok" : "bad"); fb.innerHTML = ok ? `✅ Верно! <span class="he">${E(it.he)}</span>` : `❌ Правильно: <span class="he">${E(it.he)}</span>`; HL.speech.speak(it.he); HL.applySettings(); if (ok) score++; document.getElementById("b-check").disabled = true; setTimeout(() => { q++; ask(); }, ok ? 1200 : 2500); }
      document.getElementById("b-check").onclick = check;
      document.getElementById("b-hint").onclick = () => { const n = area.children.length; if (n >= it.words.length) return; const nextW = it.words[n]; const t = [...bank.querySelectorAll(".word-tile:not(.used)")].find(x => x.dataset.w === nextW); if (t) t.click(); };
      document.getElementById("b-skip").onclick = () => { q++; ask(); };
    }
    start();
  });

  // ---------- 5. Спряжение ----------
  HL.route("/games/verbs", function () {
    const V = HL.data.verbs || []; let level, q, score, items; const N = 12;
    const PERS = { "1s": "я", "2ms": "ты (м)", "2fs": "ты (ж)", "3ms": "он", "3fs": "она", "1p": "мы", "2mp": "вы", "2fp": "вы (ж)", "3p": "они", ms: "он / я (м)", fs: "она / я (ж)", mp: "они / мы (м)", fp: "они / мы (ж)" };
    const TENSE = { pres: "настоящее", past: "прошедшее", fut: "будущее" };
    function start() {
      level = getLevel(); const verbs = V.filter(v => LV.indexOf(v.level) <= LV.indexOf(level)); if (!verbs.length) { wrap("verbs", levelChips(level, ["A1", "A2", "B1"]) + '<div class="empty">Нет глаголов для этого уровня</div>'); bindLevel(start); return; }
      const tenses = level === "A1" ? ["pres"] : level === "A2" ? ["pres", "past"] : ["pres", "past", "fut"];
      items = []; for (let i = 0; i < N; i++) { const v = HL.pick(verbs); let t = HL.pick(tenses); if (t === "pres" && !v.pres) t = "past"; const keys = Object.keys(v[t] || {}); const p = HL.pick(keys); items.push({ v, t, p, ans: v[t][p] }); }
      q = 0; score = 0; ask();
    }
    function ask() {
      if (q >= items.length) { wrap("verbs", result("verbs", score, items.length, `<p class="muted small">Полные таблицы — в <a href="#/grammar/verbs">справочнике спряжений</a>.</p>`)); document.getElementById("g-again").onclick = start; return; }
      const it = items[q]; const forms = Object.values(it.v[it.t]).filter(f => f !== it.ans); const otherVerbs = V.filter(v => v !== it.v && v[it.t]).flatMap(v => Object.values(v[it.t]));
      const opts = HL.shuffle([it.ans].concat(HL.sample(HL.uniqBy(forms.concat(HL.sample(otherVerbs, 4)), x => x), 3)));
      wrap("verbs", levelChips(level, ["A1", "A2", "B1"]) + `<div class="progress-bar mt mb"><div style="width:${q / items.length * 100}%"></div></div>
        <div class="big-q"><div class="he big">${E(it.v.inf)}</div><div class="muted">${E(it.v.ru)} · <span class="badge">${E(it.v.binyan)}</span></div><div class="mt" style="font-size:1.3rem"><strong>${PERS[it.p]}</strong>, ${TENSE[it.t]} время</div></div>
        <div class="answers">${opts.map(o => `<button class="btn he" data-k="${E(o)}">${E(o)}</button>`).join("")}</div>`, `<div class="score">${q + 1}/${items.length} · <span class="ok">${score}</span></div>`);
      bindLevel(start);
      document.querySelector(".answers").onclick = e => { const b = e.target.closest("[data-k]"); if (!b || b.disabled) return; const ok = b.dataset.k === it.ans; document.querySelectorAll(".answers .btn").forEach(x => { x.disabled = true; if (x.dataset.k === it.ans) x.classList.add("ok"); }); if (ok) score++; else b.classList.add("bad", "shake"); HL.speech.speak(it.ans); setTimeout(() => { q++; ask(); }, ok ? 700 : 1600); };
    }
    start();
  });

  // ---------- 6. Числа ----------
  HL.route("/games/numbers", function () {
    let range = HL.store.get().settings.numRange || 20, mode = "read", q, score, items; const N = 10;
    function start() { items = Array.from({ length: N }, () => ({ n: Math.floor(Math.random() * range) + 1, fem: Math.random() < 0.7 })); q = 0; score = 0; ask(); }
    function ask() {
      if (q >= N) { wrap("numbers", result("numbers", score, N)); document.getElementById("g-again").onclick = start; return; }
      const it = items[q]; const w = HL.numbers.toWords(it.n, it.fem);
      const ranges = `<div class="chips" id="n-rng">${[20, 100, 1000].map(r => `<span class="chip ${r === range ? "on" : ""}" data-r="${r}">до ${r}</span>`).join("")}</div><div class="chips mt"><span class="chip ${mode === "read" ? "on" : ""}" data-m="read">Прочитай → цифры</span><span class="chip ${mode === "listen" ? "on" : ""}" data-m="listen">Услышь → цифры</span><span class="chip ${mode === "pick" ? "on" : ""}" data-m="pick">Цифры → иврит</span></div>`;
      let body;
      if (mode === "pick") { const opts = HL.shuffle([it.n].concat(HL.sample([...Array(range).keys()].map(x => x + 1).filter(x => x !== it.n), 3))); body = `<div class="big-q"><div style="font-size:3rem;font-weight:700">${it.n}</div><div class="muted small">${it.fem ? "женский род (счёт)" : "мужской род"}</div></div><div class="answers">${opts.map(o => { const ww = HL.numbers.toWords(o, it.fem); return `<button class="btn he" data-k="${o}">${E(ww.he)}</button>`; }).join("")}</div>`; }
      else body = `<div class="big-q">${mode === "read" ? `<div class="he big">${E(w.he)}</div><div class="tr">${E(w.tr)}</div>` : `<button class="btn lg" id="n-play">🔊 Прослушать</button>`}<div class="mt"><input type="number" id="n-ans" placeholder="число" style="font-size:1.5rem;width:160px;text-align:center" autocomplete="off"> <button class="btn primary" id="n-ok">OK</button></div><div class="feedback mt" id="n-fb"></div></div>`;
      wrap("numbers", ranges + `<div class="progress-bar mt mb"><div style="width:${q / N * 100}%"></div></div>` + body, `<div class="score">${q + 1}/${N} · <span class="ok">${score}</span></div>`);
      document.getElementById("n-rng").onclick = e => { const c = e.target.closest(".chip"); if (!c) return; range = +c.dataset.r; HL.store.setSetting("numRange", range); start(); };
      document.querySelectorAll("[data-m]").forEach(c => c.onclick = () => { mode = c.dataset.m; start(); });
      const done = ok => { if (ok) score++; setTimeout(() => { q++; ask(); }, ok ? 700 : 1800); };
      if (mode === "pick") { document.querySelector(".answers").onclick = e => { const b = e.target.closest("[data-k]"); if (!b || b.disabled) return; const ok = +b.dataset.k === it.n; document.querySelectorAll(".answers .btn").forEach(x => { x.disabled = true; if (+x.dataset.k === it.n) x.classList.add("ok"); }); if (!ok) b.classList.add("bad", "shake"); HL.speech.speak(w.he); done(ok); }; }
      else { const inp = document.getElementById("n-ans"); inp.focus(); const pl = document.getElementById("n-play"); if (pl) { pl.onclick = () => HL.speech.speak(w.he); setTimeout(() => HL.speech.speak(w.he), 300); } const check = () => { const ok = +inp.value === it.n; const fb = document.getElementById("n-fb"); fb.className = "feedback mt " + (ok ? "ok" : "bad"); fb.innerHTML = ok ? "✅ Верно!" : `❌ Это ${it.n}: <span class="he">${E(w.he)}</span> <span class="tr">${E(w.tr)}</span>`; inp.disabled = true; HL.applySettings(); done(ok); }; document.getElementById("n-ok").onclick = check; inp.onkeydown = e => { if (e.key === "Enter" && !inp.disabled) check(); }; }
    }
    start();
  });

  // ---------- 7. Собери слово ----------
  HL.route("/games/speller", function () {
    let level, items, q, score; const N = 10;
    function start() { level = getLevel(); items = HL.sample(lvlWords(level).filter(w => { const s = HL.stripNikud(w.he); return s.length >= 3 && s.length <= 7 && !/\s/.test(s); }), N); q = 0; score = 0; ask(); }
    function ask() {
      if (q >= items.length) { wrap("speller", result("speller", score, items.length)); document.getElementById("g-again").onclick = start; return; }
      const w = items[q]; const letters = HL.stripNikud(w.he).split(""); const bank = HL.shuffle(letters.map((l, i) => ({ l, i })));
      wrap("speller", levelChips(level) + `<div class="progress-bar mt mb"><div style="width:${q / items.length * 100}%"></div></div><div class="big-q"><div style="font-size:1.5rem;font-weight:500">${E(w.ru)}</div><div class="tr">${E(w.tr)}</div>${HL.speakBtn(w.he)}<p class="muted small">Соберите слово из букв (без огласовок). Конечные формы букв уже учтены.</p></div>
        <div class="order-area" id="s-area" style="justify-content:center;font-size:1.3rem"></div><div class="order-bank" id="s-bank" style="justify-content:center">${bank.map(o => `<span class="word-tile" data-j="${o.i}" data-w="${E(o.l)}" style="font-size:1.7rem;min-width:46px;text-align:center">${E(o.l)}</span>`).join("")}</div>
        <div class="row mt" style="justify-content:center"><button class="btn" id="s-clear">Сбросить</button><button class="btn" id="s-skip">Показать</button></div><div class="feedback mt center" id="s-fb"></div>`, `<div class="score">${q + 1}/${items.length} · <span class="ok">${score}</span></div>`);
      bindLevel(start); const area = document.getElementById("s-area"), bk = document.getElementById("s-bank"); let locked = false;
      bk.onclick = e => { const t = e.target.closest(".word-tile"); if (!t || t.classList.contains("used") || locked) return; const c = t.cloneNode(true); c.dataset.src = t.dataset.j; area.appendChild(c); t.classList.add("used"); if (area.children.length === letters.length) check(); };
      area.onclick = e => { const t = e.target.closest(".word-tile"); if (!t || locked) return; bk.querySelector(`[data-j="${t.dataset.src}"]`).classList.remove("used"); t.remove(); };
      function check() { locked = true; const got = [...area.children].map(t => t.dataset.w).join(""); const ok = got === letters.join(""); const fb = document.getElementById("s-fb"); fb.className = "feedback mt center " + (ok ? "ok" : "bad"); fb.innerHTML = ok ? `✅ <span class="he big">${E(w.he)}</span>` : `❌ Правильно: <span class="he big">${E(w.he)}</span>`; HL.speech.speak(w.he); HL.applySettings(); if (ok) score++; setTimeout(() => { q++; ask(); }, ok ? 1000 : 2200); }
      document.getElementById("s-clear").onclick = () => { if (locked) return; area.innerHTML = ""; bk.querySelectorAll(".used").forEach(t => t.classList.remove("used")); };
      document.getElementById("s-skip").onclick = () => { if (locked) return; locked = true; document.getElementById("s-fb").innerHTML = `<span class="he big">${E(w.he)}</span>`; HL.speech.speak(w.he); HL.applySettings(); setTimeout(() => { q++; ask(); }, 1800); };
    }
    start();
  });

  // ---------- 8. Спринт ----------
  HL.route("/games/sprint", function () {
    let level, words, timer, left, score, wrong, cur, streak; const T = 60;
    function start() { level = getLevel(); words = lvlWords(level); left = T; score = 0; wrong = 0; streak = 0; clearInterval(timer); timer = setInterval(() => { left--; const t = document.getElementById("sp-t"); if (t) t.textContent = left; if (left <= 0) finish(); }, 1000); ask(); }
    function ask() {
      const w = HL.pick(words); const isTrue = Math.random() < 0.5; const shown = isTrue ? w : HL.pick(words.filter(x => x.id !== w.id && x.pos === w.pos) || words); cur = { w, isTrue: isTrue || shown.ru === w.ru, shownRu: shown.ru };
      wrap("sprint", levelChips(level) + `<div class="big-q mt"><div class="he huge">${E(w.he)}</div><div style="font-size:1.4rem;margin-top:8px">${E(cur.shownRu)}</div><p class="muted small">Верный перевод? <kbd>←</kbd> нет · <kbd>→</kbd> да</p></div>
        <div class="answers"><button class="btn bad" data-a="0" style="font-size:1.3rem">✗ Нет</button><button class="btn ok" data-a="1" style="font-size:1.3rem">✓ Да</button></div><p class="center streak">Серия: ${streak} 🔥</p>`, `<div class="score"><span class="timer" id="sp-t">${left}</span> с · <span class="ok">${score}</span> / <span class="bad">${wrong}</span></div>`);
      bindLevel(start);
      const answer = a => { const ok = a === cur.isTrue; if (ok) { score++; streak++; } else { wrong++; streak = 0; const bq = document.querySelector(".big-q"); bq.classList.add("shake"); } if (!ok) { const bq = document.querySelector(".big-q"); bq.insertAdjacentHTML("beforeend", `<div class="feedback bad">${E(cur.w.he)} = ${E(cur.w.ru)}</div>`); setTimeout(ask, 900); } else ask(); };
      document.querySelector(".answers").onclick = e => { const b = e.target.closest("[data-a]"); if (b) answer(b.dataset.a === "1"); };
      document.onkeydown = e => { if (e.key === "ArrowRight") answer(true); if (e.key === "ArrowLeft") answer(false); };
    }
    function finish() { clearInterval(timer); document.onkeydown = null; const pts = Math.max(0, score - wrong); wrap("sprint", result("sprint", pts, 0, `<p class="muted">Верно: ${score} · Ошибок: ${wrong} · Очки = верно − ошибки</p>`)); document.getElementById("g-again").onclick = start; }
    window.addEventListener("hashchange", function off() { clearInterval(timer); document.onkeydown = null; window.removeEventListener("hashchange", off); });
    start();
  });

  // ---------- 9. Корни ----------
  HL.route("/games/roots", function () {
    let level, items, q, score; const N = 10;
    function families() { const w = lvlWords(level).filter(x => x.root); const by = {}; w.forEach(x => { const r = HL.stripNikud(x.root).replace(/[.\-\s]/g, ""); (by[r] = by[r] || []).push(x); }); return Object.entries(by).filter(([, arr]) => arr.length >= 2).map(([r, arr]) => ({ root: arr[0].root, key: r, words: arr })); }
    function start() { level = getLevel(); const fam = families(); if (fam.length < 4) { wrap("roots", levelChips(level, ["A1", "A2", "B1", "B2"]) + '<div class="empty">Для этого уровня мало слов с общим корнем — выберите уровень выше.</div>'); bindLevel(start); return; } items = HL.sample(fam, N).map(f => { const target = HL.pick(f.words); const others = HL.sample(lvlWords(level).filter(x => x.root && HL.stripNikud(x.root).replace(/[.\-\s]/g, "") !== f.key), 3); return { f, target, opts: HL.shuffle([target].concat(others)) }; }); q = 0; score = 0; ask(); }
    function ask() {
      if (q >= items.length) { wrap("roots", result("roots", score, items.length)); document.getElementById("g-again").onclick = start; return; }
      const it = items[q]; const family = it.f.words.filter(x => x !== it.target);
      wrap("roots", levelChips(level, ["A1", "A2", "B1", "B2"]) + `<div class="progress-bar mt mb"><div style="width:${q / items.length * 100}%"></div></div><div class="big-q"><div class="muted small">Корень</div><div class="he huge">${E(it.f.root)}</div><div class="mt small">Однокоренные: ${family.map(x => `<span class="he">${E(x.he)}</span> (${E(x.ru.split(";")[0])})`).join(", ")}</div><p class="muted">Какое слово тоже от этого корня?</p></div>
        <div class="answers">${it.opts.map(o => `<button class="btn he" data-k="${E(o.id)}">${E(o.he)}</button>`).join("")}</div><div class="feedback mt" id="r-fb"></div>`, `<div class="score">${q + 1}/${items.length} · <span class="ok">${score}</span></div>`);
      bindLevel(start);
      document.querySelector(".answers").onclick = e => { const b = e.target.closest("[data-k]"); if (!b || b.disabled) return; const ok = b.dataset.k === it.target.id; document.querySelectorAll(".answers .btn").forEach(x => { x.disabled = true; if (x.dataset.k === it.target.id) x.classList.add("ok"); }); if (ok) score++; else b.classList.add("bad", "shake"); document.getElementById("r-fb").innerHTML = `<span class="he">${E(it.target.he)}</span> <span class="tr">${E(it.target.tr)}</span> — ${E(it.target.ru)}`; HL.speech.speak(it.target.he); HL.applySettings(); setTimeout(() => { q++; ask(); }, ok ? 1200 : 2200); };
    }
    start();
  });
})();
