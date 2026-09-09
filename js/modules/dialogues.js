/* ===== Диалоги и тексты-образцы ===== */
(function () {
  const E = HL.esc;
  function groupList(items, base, st, doneMap) {
    const groups = {}; items.forEach(d => { (groups[d.group || "Разное"] = groups[d.group || "Разное"] || []).push(d); });
    return Object.entries(groups).map(([g, arr]) => `<h2>${E(g)}</h2><div class="grid">${arr.map(d => `<a class="card link" href="#${base}/${E(d.id)}"><div class="row between"><span class="icon">${d.icon || "💬"}</span>${HL.badge(d.level)}</div><h3>${E(d.title)}</h3><p class="meta">${E(d.intro || "")}</p>${doneMap[d.id] ? '<span class="badge done">✓ отработано</span>' : ""}</a>`).join("")}</div>`).join("");
  }
  const levelOrder = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4 };

  // ---------- Диалоги: список ----------
  HL.route("/dialogues", function () {
    const D = (HL.data.dialogues || []).slice().sort((a, b) => levelOrder[a.level] - levelOrder[b.level]); const st = HL.store.get(); let level = "all";
    HL.render(`<h1>💬 Диалоги из реальной жизни</h1>
      <p class="muted">${D.length} ситуаций, с которыми сталкивается каждый в Израиле: от знакомства и супермаркета до налоговой, договора аренды и ремонта телефона. В каждом — живой разговорный иврит, словарь, готовые фразы, культурная заметка и задания. Режимы: скрыть перевод, скрыть транслитерацию, ролевая игра (скрыть свои реплики).</p>
      <div class="filters"><div class="chips" id="d-lv"><span class="chip on" data-l="all">Все</span>${["A0", "A1", "A2", "B1", "B2"].map(l => `<span class="chip" data-l="${l}">${l}</span>`).join("")}</div></div>
      <div id="d-list"></div>`);
    const draw = () => { document.getElementById("d-list").innerHTML = groupList(D.filter(d => level === "all" || d.level === level), "/dialogues", st, st.dialogues) || '<div class="empty">Нет диалогов</div>'; };
    document.getElementById("d-lv").onclick = e => { const c = e.target.closest(".chip"); if (!c) return; level = c.dataset.l; document.querySelectorAll("#d-lv .chip").forEach(x => x.classList.toggle("on", x === c)); draw(); };
    draw();
  });

  // ---------- Диалог ----------
  HL.route("/dialogues/:id", function (id) {
    const D = HL.data.dialogues || []; const d = D.find(x => x.id === id); if (!d) { HL.render(`<div class="empty">Диалог не найден. <a href="#/dialogues">К списку</a></div>`); return; }
    const st = HL.store.get(); const others = D.filter(x => x.group === d.group && x.id !== d.id);
    HL.render(`<a class="back" href="#/dialogues">← Все диалоги</a>
      <h1>${d.icon || "💬"} ${E(d.title)} ${HL.badge(d.level)}</h1>
      <p class="muted">${E(d.intro || "")}</p>
      <div class="toolbar">
        <button class="btn sm" data-t="ru">🙈 Скрыть перевод</button>
        <button class="btn sm" data-t="tr">Скрыть транслит</button>
        <button class="btn sm" data-t="a">🎭 Я — ${E(d.lines[0] && d.lines[0].nameRu || "A")}</button>
        <button class="btn sm" data-t="b">🎭 Я — ${E((d.lines.find(l => l.who === "B") || {}).nameRu || "B")}</button>
        <button class="btn sm primary" id="d-play">▶ Прослушать всё</button>
        <button class="btn sm" id="d-stop">■</button>
      </div>
      <div id="d-lines">${d.lines.map((l, i) => `<div class="dlg-line ${l.who === "B" ? "b" : "a"}" data-i="${i}"><div class="who">${E(l.nameRu || l.who)}<span class="he">${E(l.name || "")}</span></div><div><span class="he">${E(l.he)}</span> ${HL.speakBtn(l.he)}<div class="tr">${E(l.tr || "")}</div><div class="dlg-ru small">${E(l.ru)}</div></div></div>`).join("")}</div>
      <div class="two-col mt">
        <div class="card"><h3>📚 Слова диалога</h3><div class="phrase-list stack">${(d.vocab || []).map(v => `<div class="row between"><span><span class="he">${E(v.he)}</span> ${HL.speakBtn(v.he)} <span class="tr">${E(v.tr)}</span></span><span class="dlg-ru">${E(v.ru)}</span></div>`).join("")}</div></div>
        <div class="card"><h3>🗣️ Полезные фразы</h3><div class="phrase-list stack">${(d.phrases || []).map(v => `<div><span class="he">${E(v.he)}</span> ${HL.speakBtn(v.he)}<br><span class="tr">${E(v.tr)}</span> — <span class="dlg-ru">${E(v.ru)}</span></div>`).join("")}</div></div>
      </div>
      ${d.culture ? `<div class="culture-note mt"><strong>🇮🇱 Как это устроено в Израиле.</strong> ${E(d.culture)}</div>` : ""}
      ${d.tasks && d.tasks.length ? `<div class="card mt"><h3>✏️ Задания</h3><ol>${d.tasks.map(t => `<li>${E(t)}</li>`).join("")}</ol><p class="small muted">Ролевая игра: нажмите «Я — …» в панели сверху — ваши реплики размоются, говорите их вслух, а затем наведите курсор, чтобы проверить себя.</p></div>` : ""}
      <div class="row between mt"><button class="btn ${st.dialogues[d.id] ? "ok" : "primary"}" id="d-done">${st.dialogues[d.id] ? "✓ Отработано" : "Отметить отработанным"}</button><a class="btn" href="#/games/builder">🎮 Собери фразу из диалогов</a></div>
      ${others.length ? `<h3 class="mt">Ещё в группе «${E(d.group)}»</h3><div class="chips">${others.map(o => `<a class="chip" href="#/dialogues/${E(o.id)}">${o.icon || ""} ${E(o.title)}</a>`).join("")}</div>` : ""}`);
    const root = document.getElementById("app");
    root.querySelector(".toolbar").addEventListener("click", e => {
      const b = e.target.closest("[data-t]"); if (!b) return; const t = b.dataset.t; b.classList.toggle("on");
      if (t === "ru") root.classList.toggle("hidden-ru"); if (t === "tr") root.classList.toggle("hidden-tr");
      if (t === "a" || t === "b") document.querySelectorAll(".dlg-line").forEach(l => l.classList.toggle("hide-" + t));
    });
    let playing = false;
    document.getElementById("d-play").onclick = () => { if (!HL.speech.available()) return HL.toast("Озвучка недоступна"); playing = true; let i = 0; const lines = d.lines; (function step() { if (!playing || i >= lines.length) { playing = false; return; } document.querySelectorAll(".dlg-line").forEach(l => l.style.outline = ""); const el = document.querySelector(`.dlg-line[data-i="${i}"]`); if (el) { el.style.outline = "2px solid var(--accent)"; el.scrollIntoView({ block: "center", behavior: "smooth" }); } speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(lines[i].he); u.lang = "he-IL"; u.rate = 0.85; const vs = speechSynthesis.getVoices().filter(v => /^he/i.test(v.lang)); if (vs.length) u.voice = vs[0]; u.onend = () => { i++; setTimeout(step, 500); }; u.onerror = () => { i++; setTimeout(step, 300); }; speechSynthesis.speak(u); })(); };
    document.getElementById("d-stop").onclick = () => { playing = false; speechSynthesis.cancel(); document.querySelectorAll(".dlg-line").forEach(l => l.style.outline = ""); };
    window.addEventListener("hashchange", function off() { playing = false; if (HL.speech.available()) speechSynthesis.cancel(); window.removeEventListener("hashchange", off); });
    document.getElementById("d-done").onclick = e => { HL.store.markDialogue(d.id); e.target.textContent = "✓ Отработано"; e.target.className = "btn ok"; HL.toast("Отмечено!"); };
  });

  // ---------- Тексты: список ----------
  HL.route("/texts", function () {
    const T = (HL.data.texts || []).slice().sort((a, b) => levelOrder[a.level] - levelOrder[b.level]); const st = HL.store.get();
    HL.render(`<h1>✍️ Тексты-образцы</h1>
      <p class="muted">Как рассказать о себе, семье, квартире, работе, путешествии или еде — ${T.length} готовых образцов с планом, разбором по предложениям, шаблоном для собственного рассказа и вопросами для самопроверки. Прочитайте с озвучкой, закройте перевод, перескажите, затем соберите свой текст в конструкторе.</p>
      ${groupList(T, "/texts", st, st.texts) || '<div class="empty">Нет текстов</div>'}`);
  });

  // ---------- Текст ----------
  HL.route("/texts/:id", function (id) {
    const T = HL.data.texts || []; const t = T.find(x => x.id === id); if (!t) { HL.render(`<div class="empty">Текст не найден. <a href="#/texts">К списку</a></div>`); return; }
    const st = HL.store.get(); const others = T.filter(x => x.group === t.group && x.id !== t.id);
    HL.render(`<a class="back" href="#/texts">← Все тексты</a>
      <h1>${t.icon || "✍️"} ${E(t.title)} ${HL.badge(t.level)}</h1>
      <p class="muted">${E(t.intro || "")}</p>
      ${t.plan && t.plan.length ? `<div class="card mb"><h3>🗂️ План рассказа</h3><ol>${t.plan.map(p => `<li>${E(p)}</li>`).join("")}</ol></div>` : ""}
      <div class="toolbar"><button class="btn sm" data-t="ru">🙈 Скрыть перевод</button><button class="btn sm" data-t="tr">Скрыть транслит</button><button class="btn sm primary" id="t-play">▶ Прослушать текст</button><button class="btn sm" id="t-stop">■</button></div>
      <div class="card" style="padding:0 16px">${(t.paragraphs || []).map((p, i) => `<div class="sent" data-i="${i}"><div><span class="he">${E(p.he)}</span> ${HL.speakBtn(p.he)}<div class="tr">${E(p.tr || "")}</div></div><div class="txt-ru">${E(p.ru)}</div></div>`).join("")}</div>
      <div class="two-col mt">
        <div class="card"><h3>📚 Ключевые слова</h3><div class="phrase-list stack">${(t.vocab || []).map(v => `<div class="row between"><span><span class="he">${E(v.he)}</span> ${HL.speakBtn(v.he)} <span class="tr">${E(v.tr)}</span></span><span class="txt-ru">${E(v.ru)}</span></div>`).join("")}</div></div>
        <div class="card"><h3>❓ Вопросы для самопроверки</h3><p class="small muted">Ответьте вслух полными предложениями.</p><div class="stack">${(t.questions || []).map(q => `<div><span class="he">${E(q)}</span> ${HL.speakBtn(q)}</div>`).join("")}</div></div>
      </div>
      ${t.template && t.template.length ? `<h2>🧱 Конструктор своего рассказа</h2><p class="muted small">Заполните пропуски (на иврите — раскладка иврита, или пока по-русски, чтобы понять структуру). Справа собирается ваш текст — его можно озвучить и скопировать.</p>
        <div class="two-col"><div class="card">${t.template.map((tp, i) => `<div class="builder-field"><div><span class="he">${E(tp.he)}</span><div class="small muted">${E(tp.ru)}</div></div><input class="he-input" data-i="${i}" placeholder="…"></div>`).join("")}</div>
        <div><div class="output-he" id="t-out"></div><div class="row mt"><button class="btn" id="t-speak">🔊 Озвучить мой текст</button><button class="btn" id="t-copy">📋 Копировать</button></div></div></div>` : ""}
      ${t.tips && t.tips.length ? `<div class="tip mt"><ul style="margin:0;padding-left:18px">${t.tips.map(x => `<li>${E(x)}</li>`).join("")}</ul></div>` : ""}
      <div class="row between mt"><button class="btn ${st.texts[t.id] ? "ok" : "primary"}" id="t-done">${st.texts[t.id] ? "✓ Прочитано" : "Отметить прочитанным"}</button></div>
      ${others.length ? `<h3 class="mt">Ещё в группе «${E(t.group)}»</h3><div class="chips">${others.map(o => `<a class="chip" href="#/texts/${E(o.id)}">${o.icon || ""} ${E(o.title)}</a>`).join("")}</div>` : ""}`);
    const root = document.getElementById("app");
    root.querySelector(".toolbar").addEventListener("click", e => { const b = e.target.closest("[data-t]"); if (!b) return; b.classList.toggle("on"); if (b.dataset.t === "ru") root.classList.toggle("hidden-ru"); else root.classList.toggle("hidden-tr"); });
    let playing = false;
    document.getElementById("t-play").onclick = () => { if (!HL.speech.available()) return HL.toast("Озвучка недоступна"); playing = true; let i = 0; const ps = t.paragraphs; (function step() { if (!playing || i >= ps.length) { playing = false; return; } document.querySelectorAll(".sent").forEach(l => l.style.background = ""); const el = document.querySelector(`.sent[data-i="${i}"]`); if (el) el.style.background = "var(--accent2)"; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(ps[i].he); u.lang = "he-IL"; u.rate = 0.85; const vs = speechSynthesis.getVoices().filter(v => /^he/i.test(v.lang)); if (vs.length) u.voice = vs[0]; u.onend = () => { i++; setTimeout(step, 400); }; u.onerror = () => { i++; setTimeout(step, 300); }; speechSynthesis.speak(u); })(); };
    document.getElementById("t-stop").onclick = () => { playing = false; speechSynthesis.cancel(); document.querySelectorAll(".sent").forEach(l => l.style.background = ""); };
    window.addEventListener("hashchange", function off() { playing = false; if (HL.speech.available()) speechSynthesis.cancel(); window.removeEventListener("hashchange", off); });
    const out = document.getElementById("t-out");
    if (out) {
      const compose = () => { const parts = t.template.map((tp, i) => { const v = (root.querySelector(`input[data-i="${i}"]`).value || "").trim(); return v ? tp.he.replace(/_{2,}/g, v) : null; }).filter(Boolean); out.textContent = parts.join(" ") || "…"; };
      root.querySelectorAll(".builder-field input").forEach(inp => inp.oninput = compose); compose();
      document.getElementById("t-speak").onclick = () => HL.speech.speak(out.textContent);
      document.getElementById("t-copy").onclick = () => { try { navigator.clipboard.writeText(out.textContent); HL.toast("Скопировано"); } catch (e) { HL.toast("Выделите и скопируйте текст"); } };
    }
    document.getElementById("t-done").onclick = e => { HL.store.markText(t.id); e.target.textContent = "✓ Прочитано"; e.target.className = "btn ok"; HL.toast("Отмечено!"); };
  });
})();
