/* ===== Грамматика: список уроков, урок, упражнения ===== */
(function () {
  const E = HL.esc;

  HL.route("/grammar", function () {
    const st = HL.store.get(); const lessons = HL.grammarSorted();
    const byLevel = ["A0", "A1", "A2", "B1", "B2"].map(lv => {
      const ls = lessons.filter(l => l.level === lv); if (!ls.length) return "";
      const done = ls.filter(l => st.lessons[l.id]).length;
      return `<section class="card mb"><h2 style="margin-top:0">${HL.badge(lv)} ${E(HL.levelName(lv))} <span class="badge">${done}/${ls.length}</span></h2>
        <div class="toc">${ls.map(l => `<a href="#/grammar/${E(l.id)}"><span class="num">${l.order}</span><span><strong>${E(l.title)}</strong><br><span class="muted small">${E(l.summary || "")}</span></span>${st.lessons[l.id] ? '<span class="badge done" style="margin-left:auto">✓</span>' : ""}</a>`).join("")}</div></section>`;
    }).join("");
    HL.render(`<h1>📖 Грамматика</h1>
      <p class="muted">${lessons.length} уроков в логической последовательности: от алфавита до идиом и регистров речи. Каждый урок — объяснение «от преподавателя», таблицы, раздел «Типичные ошибки русскоязычных» и упражнения с проверкой. Отмечайте пройденные уроки — они появятся в прогрессе.</p>
      ${byLevel || '<div class="empty">Уроки не загружены</div>'}
      <div class="card"><h3>🔤 Справочник</h3><div class="row"><a class="btn" href="#/alphabet">Алфавит и никуд</a><a class="btn" href="#/grammar/verbs">Таблицы спряжения глаголов</a><a class="btn" href="#/grammar/numbers">Числительные: генератор</a></div></div>`);
  });

  // ---- Справочник спряжений ----
  HL.route("/grammar/verbs", function () {
    const V = HL.data.verbs || []; const BIN = { paal: "פָּעַל", piel: "פִּיעֵל", hifil: "הִפְעִיל", hitpael: "הִתְפַּעֵל", nifal: "נִפְעַל", pual: "פּוּעַל", hufal: "הוּפְעַל" };
    let bin = "all", q = "";
    HL.render(`<a class="back" href="#/grammar">← Грамматика</a><h1>🔁 Спряжение глаголов</h1>
      <p class="muted">${V.length} самых частотных глаголов во всех временах. Нажмите на глагол, чтобы раскрыть парадигму. Озвучка — по каждой форме.</p>
      <div class="filters"><div class="chips" id="vb-bin"><span class="chip on" data-b="all">Все биньяны</span>${Object.entries(BIN).map(([k, v]) => `<span class="chip" data-b="${k}"><span class="he" style="font-size:1em">${v}</span></span>`).join("")}</div><input type="search" id="vb-q" class="search-box" placeholder="Поиск: писать, לכתוב…"></div>
      <div id="vb-list" class="stack"></div>`);
    const list = document.getElementById("vb-list");
    const P = [["1s", "я"], ["2ms", "ты (м)"], ["2fs", "ты (ж)"], ["3ms", "он"], ["3fs", "она"], ["1p", "мы"], ["2mp", "вы (м)"], ["2fp", "вы (ж)"], ["3p", "они"]];
    HL.verbTable = function (v) {
      const f = (o, k) => o && o[k] ? `<span class="he">${E(o[k])}</span> ${HL.speakBtn(o[k])}` : "—";
      return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Лицо</th><th>Прошедшее</th><th>Будущее</th></tr></thead><tbody>
        ${P.map(([k, ru]) => `<tr><td>${ru}</td><td>${f(v.past, k)}</td><td>${f(v.fut, k === "2fp" ? "2mp" : k)}${k === "2fp" ? ' <span class="muted small">(= вы м)</span>' : ""}</td></tr>`).join("")}</tbody></table></div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th colspan="4">Настоящее</th><th colspan="3">Императив</th></tr></thead><tbody><tr>
        ${v.pres ? ["ms", "fs", "mp", "fp"].map(k => `<td><div class="muted small">${{ ms: "он/я(м)", fs: "она/я(ж)", mp: "они(м)/мы", fp: "они(ж)" }[k]}</div>${f(v.pres, k)}</td>`).join("") : '<td colspan="4" class="muted">нет форм настоящего времени</td>'}
        ${["ms", "fs", "p"].map(k => `<td><div class="muted small">${{ ms: "ты (м)!", fs: "ты (ж)!", p: "вы!" }[k]}</div>${f(v.imp, k)}</td>`).join("")}</tr></tbody></table></div>
        ${v.note ? `<div class="tip">${E(v.note)}</div>` : ""}`;
    };
    function draw() {
      const items = V.filter(v => (bin === "all" || v.binyan === bin) && (!q || v.ru.toLowerCase().includes(q) || HL.stripNikud(v.inf).includes(HL.stripNikud(q))));
      list.innerHTML = items.map((v, i) => `<details><summary><span class="he big">${E(v.inf)}</span> <span class="tr">${E(v.tr)}</span> — ${E(v.ru)} <span class="badge">${BIN[v.binyan] ? `<span class="he" style="font-size:1em">${BIN[v.binyan]}</span>` : v.binyan}</span> <span class="badge">${E(v.root)}</span> ${HL.badge(v.level)}</summary>${HL.verbTable(v)}</details>`).join("") || '<div class="empty">Не найдено</div>';
      HL.applySettings();
    }
    document.getElementById("vb-bin").onclick = e => { const c = e.target.closest(".chip"); if (!c) return; bin = c.dataset.b; document.querySelectorAll("#vb-bin .chip").forEach(x => x.classList.toggle("on", x === c)); draw(); };
    document.getElementById("vb-q").oninput = e => { q = e.target.value.trim().toLowerCase(); draw(); };
    draw();
  });

  // ---- Числительные ----
  HL.route("/grammar/numbers", function () {
    HL.render(`<a class="back" href="#/grammar">← Грамматика</a><h1>🔢 Числительные</h1>
      <p class="muted">В иврите числительные согласуются в роде с существительным, причём «по умолчанию» (счёт, номера телефонов, цены в разговоре) используется <strong>женская</strong> форма: אַחַת, שְׁתַּיִם, שָׁלוֹשׁ. Мужская форма — при мужских существительных: שְׁלוֹשָׁה יְלָדִים. Введите число и посмотрите обе формы.</p>
      <div class="card"><div class="row"><input type="number" id="n-in" min="0" max="9999" value="247" style="width:140px;font-size:1.2rem"><button class="btn primary" id="n-go">Показать</button><button class="btn" id="n-rnd">🎲 Случайное</button></div><div id="n-out" class="mt"></div></div>
      <h2>Таблица 1–20</h2>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Число</th><th>Женский род (счёт, «по умолчанию»)</th><th>Мужской род</th></tr></thead><tbody>
      ${Array.from({ length: 20 }, (_, i) => i + 1).map(n => { const f = HL.numbers.toWords(n, true), m = HL.numbers.toWords(n, false); return `<tr><td>${n}</td><td><span class="he">${f.he}</span> <span class="tr">${f.tr}</span> ${HL.speakBtn(f.he)}</td><td><span class="he">${m.he}</span> <span class="tr">${m.tr}</span> ${HL.speakBtn(m.he)}</td></tr>`; }).join("")}
      </tbody></table></div>
      <div class="tip">Десятки (20, 30 … 90) и сотни одинаковы для обоих родов. Единица «и»: 21 = עֶשְׂרִים וְאַחַת (двадцать и одна). После числительного 2 и выше существительное — во множественном: שְׁתֵּי בָּנוֹת, но в смихуте: שְׁנֵי יְלָדִים (два мальчика), שְׁתֵּי יְלָדוֹת (две девочки).</div>
      <p><a class="btn primary" href="#/games/numbers">🎮 Тренировать числа в игре</a></p>`);
    const out = document.getElementById("n-out");
    function show() { const n = Math.max(0, Math.min(9999, +document.getElementById("n-in").value || 0)); const f = HL.numbers.toWords(n, true), m = HL.numbers.toWords(n, false); out.innerHTML = `<div class="two-col"><div><div class="muted small">женский род</div><div class="he big">${f.he}</div><div class="tr">${f.tr}</div>${HL.speakBtn(f.he)}</div><div><div class="muted small">мужской род</div><div class="he big">${m.he}</div><div class="tr">${m.tr}</div>${HL.speakBtn(m.he)}</div></div>`; HL.applySettings(); }
    document.getElementById("n-go").onclick = show; document.getElementById("n-in").onkeydown = e => { if (e.key === "Enter") show(); };
    document.getElementById("n-rnd").onclick = () => { document.getElementById("n-in").value = Math.floor(Math.random() * 1000); show(); };
    show();
  });

  // ---- Урок ----
  HL.route("/grammar/:id", function (id) {
    const lessons = HL.grammarSorted(); const idx = lessons.findIndex(l => l.id === id); const l = lessons[idx];
    if (!l) { HL.render(`<div class="empty">Урок не найден. <a href="#/grammar">К списку</a></div>`); return; }
    const st = HL.store.get(); const prev = lessons[idx - 1], next = lessons[idx + 1];
    HL.render(`<div class="lesson">
      <a class="back" href="#/grammar">← Все уроки</a>
      <h1>${HL.badge(l.level)} Урок ${l.order}. ${E(l.title)}</h1>
      <p class="muted">${E(l.summary || "")}</p>
      <div class="body">${l.body}</div>
      ${l.exercises && l.exercises.length ? `<h2>✏️ Упражнения</h2><div id="ex-list">${l.exercises.map((x, i) => HL.renderExercise(x, i)).join("")}</div><div class="card center" id="ex-summary"></div>` : ""}
      <div class="row between mt">
        <span>${prev ? `<a class="btn" href="#/grammar/${E(prev.id)}">← ${prev.order}. ${E(prev.title)}</a>` : ""}</span>
        <button class="btn ${st.lessons[l.id] ? "ok" : "primary"}" id="lesson-done">${st.lessons[l.id] ? "✓ Урок пройден" : "Отметить пройденным"}</button>
        <span>${next ? `<a class="btn" href="#/grammar/${E(next.id)}">${next.order}. ${E(next.title)} →</a>` : ""}</span>
      </div></div>`);
    // озвучка для всех .he в теле урока
    document.querySelectorAll(".lesson .body .he").forEach(el => { if (!el.closest("table") || true) { const b = document.createElement("button"); b.className = "speak"; b.dataset.speak = el.textContent; b.textContent = "🔊"; b.title = "Озвучить"; b.style.fontSize = ".8rem"; el.after(b); } });
    document.getElementById("lesson-done").onclick = e => { const d = !st.lessons[l.id]; HL.store.markLesson(l.id, d); e.target.textContent = d ? "✓ Урок пройден" : "Отметить пройденным"; e.target.className = "btn " + (d ? "ok" : "primary"); if (d) HL.toast("Отлично! Урок отмечен."); };
    HL.bindExercises(l.exercises || []);
    HL.applySettings();
  });

  // ---------- Упражнения ----------
  HL.renderExercise = function (x, i) {
    const head = `<div class="q">${i + 1}. ${x.q}</div>`;
    if (x.type === "choice") return `<div class="exercise" data-i="${i}" data-type="choice">${head}<div class="options">${x.options.map((o, j) => `<button class="opt" data-j="${j}">${E(o)}</button>`).join("")}</div><div class="feedback"></div></div>`;
    if (x.type === "fill") return `<div class="exercise" data-i="${i}" data-type="fill">${head}<div class="row"><input class="he-input" data-i="${i}" placeholder="${x.hint ? E(x.hint) : "введите на иврите"}" autocomplete="off"><button class="btn sm" data-check="${i}">Проверить</button><button class="btn sm" data-show="${i}">Показать ответ</button></div><div class="feedback"></div></div>`;
    if (x.type === "order") return `<div class="exercise" data-i="${i}" data-type="order">${head}<div class="order-area" data-i="${i}"></div><div class="order-bank" data-i="${i}">${HL.shuffle(x.words).map((w, j) => `<span class="word-tile" data-w="${E(w)}" data-j="${j}">${E(w)}</span>`).join("")}</div><div class="row mt"><button class="btn sm" data-ocheck="${i}">Проверить</button><button class="btn sm" data-oreset="${i}">Сбросить</button></div><div class="feedback"></div></div>`;
    return "";
  };
  HL.bindExercises = function (exs, onResult) {
    const root = document.getElementById("ex-list"); if (!root) return; const results = {};
    function fb(el, ok, msg) { const f = el.querySelector(".feedback"); f.className = "feedback " + (ok ? "ok" : "bad"); f.innerHTML = msg; results[el.dataset.i] = ok; summary(); if (onResult) onResult(el.dataset.i, ok); }
    function summary() { const s = document.getElementById("ex-summary"); if (!s) return; const n = Object.keys(results).length, ok = Object.values(results).filter(Boolean).length; s.innerHTML = n ? `Выполнено ${n} из ${exs.length} · верно: <strong style="color:var(--ok)">${ok}</strong>${n === exs.length ? (ok === n ? " · 🏆 Безошибочно!" : " · Повторите те, где ошиблись, и перечитайте объяснение.") : ""}` : ""; }
    root.addEventListener("click", e => {
      const el = e.target.closest(".exercise"); if (!el) return; const x = exs[+el.dataset.i];
      const opt = e.target.closest(".opt"); if (opt && !el.dataset.done) { const j = +opt.dataset.j; const ok = j === x.answer; el.querySelectorAll(".opt").forEach((o, k) => { o.classList.toggle("right", k === x.answer); o.classList.toggle("wrong", k === j && !ok); }); el.dataset.done = 1; fb(el, ok, (ok ? "✅ Верно! " : "❌ Не совсем. ") + E(x.explain || "")); if (ok) HL.speech.speak(x.options[x.answer]); return; }
      const ch = e.target.closest("[data-check]"); if (ch) { const inp = el.querySelector("input"); const val = HL.normHe(inp.value); const answers = (Array.isArray(x.answer) ? x.answer : [x.answer]).map(HL.normHe); const ok = answers.includes(val); fb(el, ok, (ok ? `✅ Верно! <span class="he">${E(x.answer[0] || x.answer)}</span> ` : `❌ Правильно: <span class="he">${E(Array.isArray(x.answer) ? x.answer[0] : x.answer)}</span> `) + E(x.explain || "")); HL.applySettings(); return; }
      const sh = e.target.closest("[data-show]"); if (sh) { const a = Array.isArray(x.answer) ? x.answer[0] : x.answer; el.querySelector("input").value = a; fb(el, false, `Ответ: <span class="he">${E(a)}</span> ${HL.speakBtn(a)} ${E(x.explain || "")}`); HL.applySettings(); return; }
      const tile = e.target.closest(".word-tile"); if (tile) { const area = el.querySelector(".order-area"); if (tile.parentElement.classList.contains("order-bank")) { const c = tile.cloneNode(true); c.dataset.src = tile.dataset.j; area.appendChild(c); tile.classList.add("used"); } else { const src = el.querySelector(`.order-bank .word-tile[data-j="${tile.dataset.src}"]`); if (src) src.classList.remove("used"); tile.remove(); } return; }
      const oc = e.target.closest("[data-ocheck]"); if (oc) { const got = [...el.querySelectorAll(".order-area .word-tile")].map(t => t.dataset.w).join(" "); const ok = HL.normHe(got) === HL.normHe(x.answer); fb(el, ok, ok ? `✅ Верно! <span class="he">${E(x.answer)}</span> ${HL.speakBtn(x.answer)}` : `❌ Правильный порядок: <span class="he">${E(x.answer)}</span> ${HL.speakBtn(x.answer)} ${E(x.explain || "")}`); HL.applySettings(); return; }
      const or = e.target.closest("[data-oreset]"); if (or) { el.querySelector(".order-area").innerHTML = ""; el.querySelectorAll(".order-bank .word-tile").forEach(t => t.classList.remove("used")); el.querySelector(".feedback").innerHTML = ""; return; }
    });
    root.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.tagName === "INPUT") { const el = e.target.closest(".exercise"); el.querySelector("[data-check]").click(); } });
  };
})();
