/* ===== Страницы: главная, курс, алфавит, мнемоники, прогресс ===== */
(function () {
  const E = HL.esc;

  // ---------- Главная ----------
  HL.route("/", function () {
    const st = HL.store.get(); const s = HL.store.srsStats();
    const words = HL.allWords().length, lessons = (HL.data.grammar || []).length, dlg = (HL.data.dialogues || []).length, txt = (HL.data.texts || []).length;
    const doneLessons = Object.keys(st.lessons).length;
    const nextLesson = HL.grammarSorted().find(l => !st.lessons[l.id]);
    HL.render(`
      <section class="hero">
        <div>
          <h1>Иврит с нуля до B2 — системно, по-русски</h1>
          <p>Алфавит → слова → грамматика → живая речь. Карточки с интервальным повторением, разбор грамматики «от преподавателя», диалоги из реальной жизни в Израиле, мнемоники и игры. Всё бесплатно, работает в браузере, прогресс сохраняется.</p>
          <div class="row mt">
            <a class="btn primary lg" href="#/course">🗺️ Начать с плана курса</a>
            <a class="btn lg" href="#/cards">🃏 Карточки${s.due ? ` <span class="badge">${s.due} на сегодня</span>` : ""}</a>
            ${nextLesson ? `<a class="btn lg" href="#/grammar/${E(nextLesson.id)}">📖 Урок ${nextLesson.order}</a>` : ""}
          </div>
        </div>
        <div class="he huge">עִבְרִית<br><span style="font-size:.45em;color:var(--fg2)">מֵאָלֶף עַד תָּו</span></div>
      </section>

      <div class="grid tight mb">
        <div class="card stat"><div class="n">${words}</div><div class="l">слов с примерами</div></div>
        <div class="card stat"><div class="n">${lessons}</div><div class="l">уроков грамматики</div></div>
        <div class="card stat"><div class="n">${dlg}</div><div class="l">диалогов из жизни</div></div>
        <div class="card stat"><div class="n">${txt}</div><div class="l">текстов-образцов</div></div>
        <div class="card stat"><div class="n">${(HL.data.mnemonics || []).length}</div><div class="l">мнемоник</div></div>
        <div class="card stat"><div class="n">${st.streak.count || 0}</div><div class="l">${HL.plural(st.streak.count || 0, "день", "дня", "дней")} подряд 🔥</div></div>
      </div>

      <h2>Разделы</h2>
      <div class="grid">
        <a class="card link" href="#/alphabet"><div class="icon">🔤</div><h3>Алфавит и чтение</h3><p class="meta">22 буквы, конечные формы, огласовки, буквы-ловушки, озвучка каждой буквы и слова.</p></a>
        <a class="card link" href="#/vocab"><div class="icon">📚</div><h3>Словарь по темам</h3><p class="meta">${words} слов A0–B2 по 27 темам с примерами, родом, корнем и заметками преподавателя.</p></a>
        <a class="card link" href="#/cards"><div class="icon">🃏</div><h3>Карточки (SRS)</h3><p class="meta">Интервальное повторение: слова всплывают ровно тогда, когда вы готовы их забыть.</p></a>
        <a class="card link" href="#/grammar"><div class="icon">📖</div><h3>Грамматика</h3><p class="meta">${lessons} уроков от алфавита до идиом: таблицы, типичные ошибки русскоязычных, упражнения. Пройдено: ${doneLessons}.</p></a>
        <a class="card link" href="#/dialogues"><div class="icon">💬</div><h3>Диалоги из жизни</h3><p class="meta">Магазин, поликлиника, банк, налоговая, аренда, ремонт компьютера и телефона, собеседование…</p></a>
        <a class="card link" href="#/texts"><div class="icon">✍️</div><h3>Тексты-образцы</h3><p class="meta">Биография, семья, квартира, работа, путешествия, еда. Шаблоны для собственного рассказа.</p></a>
        <a class="card link" href="#/mnemonics"><div class="icon">🧠</div><h3>Мнемоники</h3><p class="meta">Звуковые ассоциации, образы, истории и корни — чтобы слова запоминались с первого раза.</p></a>
        <a class="card link" href="#/games"><div class="icon">🎮</div><h3>Игры</h3><p class="meta">Буквы, пары, «он или она», собери фразу, спряжение, числа, спринт, корни.</p></a>
      </div>

      <h2>Как устроен курс</h2>
      <div class="grid">
        ${HL.data.course.method.pillars.map(p => `<div class="card"><div class="icon">${p.icon}</div><h3>${E(p.title)}</h3><p class="small">${E(p.text)}</p></div>`).join("")}
      </div>
      <div class="card mt">
        <h3>Ежедневный план на 40 минут</h3>
        <table class="tbl"><tbody>${HL.data.course.method.daily.map(d => `<tr><th style="white-space:nowrap">${E(d.time)}</th><td>${E(d.what)}</td></tr>`).join("")}</tbody></table>
        <p class="small muted">Озвучка использует голос иврита вашей системы (на Mac/iPhone — «Carmit», в Windows — «Asaf», в Chrome — Google he-IL). Если голоса нет, установите его в настройках речи.</p>
      </div>
    `);
  });

  // ---------- Курс (дорожная карта) ----------
  HL.route("/course", function () {
    const st = HL.store.get(); const c = HL.data.course; const grammar = HL.grammarSorted();
    const html = c.stages.map(s => {
      const lessons = grammar.filter(l => l.order >= s.grammar[0] && l.order <= s.grammar[1]);
      const done = lessons.filter(l => st.lessons[l.id]).length;
      const dlgs = s.dialogues.map(id => (HL.data.dialogues || []).find(d => d.id === id)).filter(Boolean);
      const txts = s.texts.map(id => (HL.data.texts || []).find(d => d.id === id)).filter(Boolean);
      return `<section class="stage">
        <h2>${HL.badge(s.level)} ${E(s.title)} <span class="muted small">· ${E(s.hours)}</span></h2>
        <p><strong>Цель:</strong> ${E(s.goal)}</p>
        <div class="two-col">
          <div class="card">
            <h3>📖 Грамматика <span class="badge">${done}/${lessons.length}</span></h3>
            <div class="toc">${lessons.map(l => `<a href="#/grammar/${E(l.id)}"><span class="num">${l.order}</span> ${E(l.title)} ${st.lessons[l.id] ? '<span class="badge done">✓</span>' : ""}</a>`).join("") || '<p class="muted small">Уроки загружаются…</p>'}</div>
          </div>
          <div class="stack">
            <div class="card">
              <h3>📚 Лексика</h3>
              <div class="chips">${s.topics.map(t => `<a class="chip" href="#/vocab?level=${s.level}&topic=${t}">${HL.topicIcon(t)} ${E(HL.topicName(t))}</a>`).join("")}</div>
              <p class="small mt"><a class="btn sm primary" href="#/cards?level=${s.level}">🃏 Учить карточки ${s.level}</a></p>
            </div>
            ${dlgs.length ? `<div class="card"><h3>💬 Диалоги</h3><div class="chips">${dlgs.map(d => `<a class="chip ${st.dialogues[d.id] ? "on" : ""}" href="#/dialogues/${E(d.id)}">${d.icon || "💬"} ${E(d.title)}</a>`).join("")}</div></div>` : ""}
            ${txts.length ? `<div class="card"><h3>✍️ Тексты-образцы</h3><div class="chips">${txts.map(d => `<a class="chip ${st.texts[d.id] ? "on" : ""}" href="#/texts/${E(d.id)}">${d.icon || "✍️"} ${E(d.title)}</a>`).join("")}</div></div>` : ""}
            <div class="card"><h3>🎮 Игры уровня</h3><div class="chips">${s.games.map(g => `<a class="chip" href="#/games/${g}">${E((HL.gameMeta && HL.gameMeta[g]) ? HL.gameMeta[g].icon + " " + HL.gameMeta[g].title : g)}</a>`).join("")}</div></div>
          </div>
        </div>
        <details class="mt"><summary>✅ Что вы сможете к концу уровня ${s.level}</summary><ul class="checklist">${s.cando.map(x => `<li>${E(x)}</li>`).join("")}</ul></details>
      </section>`;
    }).join("");
    HL.render(`
      <h1>🗺️ План курса A0 → B2</h1>
      <p class="muted">Пять уровней, каждый — со своей грамматикой, лексикой, диалогами и текстами. Двигайтесь сверху вниз, но не бойтесь заглядывать вперёд: диалог «У врача» нужен уже на A1, если вы заболели.</p>
      <div class="card mb">
        <h3>${E(HL.data.course.method.title)}</h3>
        <ul>${HL.data.course.method.principles.map(p => `<li>${E(p)}</li>`).join("")}</ul>
      </div>
      <div class="roadmap">${html}</div>
    `);
  });

  // ---------- Алфавит ----------
  HL.route("/alphabet", function () {
    const A = HL.data.alphabet, N = HL.data.nikud;
    const letters = A.map((x, i) => `<div class="letter-card" data-i="${i}"><div class="glyph">${E(x.l)}${x.final ? `<span class="final">${E(x.final)}</span>` : ""}</div><div class="name">${E(x.name)}</div><div class="snd">${E(x.tr)}</div></div>`).join("");
    HL.render(`
      <h1>🔤 Алфавит</h1>
      <p class="muted">22 буквы, пишутся справа налево. Пять букв имеют особую форму в конце слова (софит). Гласные обозначаются огласовками (никуд) — точками и чёрточками под и над буквами; в обычных текстах их не пишут. Нажмите на букву, чтобы увидеть детали и услышать примеры.</p>
      <div class="two-col" style="grid-template-columns: 1.6fr 1fr">
        <div><div class="letters" id="letters">${letters}</div></div>
        <div><div class="card letter-detail" id="letter-detail"><p class="muted center">Выберите букву</p></div></div>
      </div>
      <h2>Огласовки (никуд)</h2>
      <p class="muted">Показаны на букве <span class="he">א</span>. Практическое правило: в современном иврите есть всего 5 гласных звуков — а, э, и, о, у. Долгота не различается.</p>
      <div class="nikud-grid">${N.map(n => `<div class="nikud-card"><div class="glyph">${n.sign === "וּ" ? "וּ" : "א" + E(n.sign)}</div><div><strong>${E(n.name)}</strong> — <span class="muted">${E(n.sound)}</span></div><div class="small">${HL.he(n.ex)} <span class="tr">${E(n.exTr)}</span> ${HL.speakBtn(n.ex)}</div><div class="small muted">${E(n.note)}</div></div>`).join("")}</div>
      <h2>Как читать быстро</h2>
      <div class="grid">
        <div class="card"><h3>1. Согласная + гласная под ней</h3><p class="small">Слог читается «буква → огласовка под ней»: <span class="he">שָׁ</span> = ш+а = «ша». Холам (точка сверху) читается после буквы: <span class="he">שֹׁ</span> = «шо».</p></div>
        <div class="card"><h3>2. Шва — пауза или «э»</h3><p class="small">В начале слова шва читается коротким «э» (<span class="he">שְׁמִי</span> шми / шэми́), в конце слога — не читается (<span class="he">יִשְׂרָאֵל</span> йис-ра-э́ль).</p></div>
        <div class="card"><h3>3. Ударение</h3><p class="small">Обычно на последнем слоге (<span class="he">שָׁלוֹם</span> шало́м). Исключения — двусложные с сеголями (<span class="he">סֵפֶר</span> сэ́фэр, <span class="he">יֶלֶד</span> йэ́лед) и слова с ־ַיִם (<span class="he">מַיִם</span> ма́йим).</p></div>
        <div class="card"><h3>4. Без огласовок</h3><p class="small">Гласные подсказывают «матери чтения»: <span class="he">ו</span> — о/у, <span class="he">י</span> — и/э, <span class="he">ה</span> в конце — а/э. Остальное — знание слова. Поэтому учите слова только с озвучкой.</p></div>
      </div>
      <p class="mt"><a class="btn primary" href="#/games/letters">🎮 Тренировать буквы в игре</a> <a class="btn" href="#/grammar">📖 Уроки 1–3: алфавит, никуд, буквы-ловушки</a></p>
    `);
    const detail = document.getElementById("letter-detail");
    function show(i) {
      const x = A[i]; document.querySelectorAll(".letter-card").forEach(c => c.classList.toggle("sel", +c.dataset.i === i));
      detail.innerHTML = `
        <div class="center"><div class="he huge">${E(x.l)}${x.final ? ` <span style="color:var(--fg2);font-size:.6em">${E(x.final)}</span>` : ""}</div>
        <h3>${E(x.name)} <span class="muted small">· числовое значение ${x.val}</span></h3></div>
        <p><strong>Звук:</strong> ${E(x.sound)}</p>
        <p class="small muted">${E(x.ru)}</p>
        ${x.final ? `<p class="small"><strong>Конечная форма:</strong> <span class="he">${E(x.final)}</span> — пишется только в конце слова.</p>` : ""}
        <div class="tip">${E(x.note)}</div>
        <h4>Примеры</h4>
        ${x.ex.map(e => `<div class="row small" style="justify-content:space-between"><span>${HL.he(e[0])} <span class="tr">${E(e[1])}</span></span><span>${E(e[2])} ${HL.speakBtn(e[0])}</span></div>`).join("")}
      `;
      HL.applySettings();
    }
    document.getElementById("letters").addEventListener("click", e => { const c = e.target.closest(".letter-card"); if (c) show(+c.dataset.i); });
    show(0);
  });

  // ---------- Мнемоники ----------
  HL.route("/mnemonics", function () {
    const M = HL.data.mnemonics || []; const types = { sound: "🔊 Звук", image: "🖼️ Образ", story: "📜 История", cognate: "🔗 Родственник", root: "🌳 Корень" };
    let type = "all", q = "";
    HL.render(`
      <h1>🧠 Мнемоники</h1>
      <p class="muted">Слово запоминается, когда к нему «прицепляется» что-то яркое: похожее русское слово, картинка, история или знакомый корень. Ниже — ${M.length} проверенных приёмов. Читайте вслух, представляйте образ и через минуту проверьте себя в режиме «Спрятать перевод».</p>
      <div class="filters">
        <div class="chips" id="mn-types"><span class="chip on" data-t="all">Все</span>${Object.entries(types).map(([k, v]) => `<span class="chip" data-t="${k}">${v}</span>`).join("")}</div>
        <input type="search" class="search-box" id="mn-q" placeholder="Поиск по слову или переводу…">
        <button class="btn sm" id="mn-hide">🙈 Спрятать перевод</button>
      </div>
      <div class="grid" id="mn-list"></div>
    `);
    const list = document.getElementById("mn-list");
    function draw() {
      const items = M.filter(m => (type === "all" || m.type === type) && (!q || (m.ru + m.tr + m.he + m.mnemo).toLowerCase().includes(q)));
      list.innerHTML = items.map(m => `<div class="card"><div class="row between"><span class="he big">${E(m.he)}</span><span style="font-size:2rem">${E(m.emoji)}</span></div>
        <div><span class="tr">${E(m.tr)}</span> ${HL.speakBtn(m.he)} — <strong class="dlg-ru">${E(m.ru)}</strong></div>
        <p class="small dlg-ru">${E(m.mnemo)}</p><span class="badge">${types[m.type] || m.type}</span></div>`).join("") || `<div class="empty">Ничего не найдено</div>`;
      HL.applySettings();
    }
    document.getElementById("mn-types").onclick = e => { const c = e.target.closest(".chip"); if (!c) return; type = c.dataset.t; document.querySelectorAll("#mn-types .chip").forEach(x => x.classList.toggle("on", x === c)); draw(); };
    document.getElementById("mn-q").oninput = e => { q = e.target.value.trim().toLowerCase(); draw(); };
    document.getElementById("mn-hide").onclick = e => { document.getElementById("app").classList.toggle("hidden-ru"); e.target.textContent = document.getElementById("app").classList.contains("hidden-ru") ? "👁️ Показать перевод" : "🙈 Спрятать перевод"; };
    draw();
  });

  // ---------- Прогресс ----------
  HL.route("/progress", function () {
    const st = HL.store.get(); const s = HL.store.srsStats(); const grammar = HL.grammarSorted();
    const byLevel = ["A0", "A1", "A2", "B1", "B2"].map(lv => {
      const ls = grammar.filter(l => l.level === lv); const done = ls.filter(l => st.lessons[l.id]).length;
      const words = HL.allWords().filter(w => w.level === lv); const known = words.filter(w => st.srs[w.id] && st.srs[w.id].iv >= 21).length;
      const seen = words.filter(w => st.srs[w.id]).length;
      return `<tr><td>${HL.badge(lv)} ${E(HL.levelName(lv))}</td><td>${done}/${ls.length}<div class="progress-bar"><div style="width:${ls.length ? done / ls.length * 100 : 0}%"></div></div></td><td>${seen}/${words.length} <span class="muted small">(выучено ${known})</span><div class="progress-bar"><div style="width:${words.length ? seen / words.length * 100 : 0}%"></div></div></td></tr>`;
    }).join("");
    const games = Object.entries(st.games).map(([k, g]) => `<tr><td>${E((HL.gameMeta && HL.gameMeta[k]) ? HL.gameMeta[k].icon + " " + HL.gameMeta[k].title : k)}</td><td>${g.played}</td><td>${g.best}</td><td>${E(g.last || "")}</td></tr>`).join("");
    const days = Object.keys(st.streak.days || {}).length;
    HL.render(`
      <h1>📈 Прогресс</h1>
      <div class="grid tight mb">
        <div class="card stat"><div class="n">${st.streak.count || 0}</div><div class="l">${HL.plural(st.streak.count || 0, "день", "дня", "дней")} подряд 🔥</div></div>
        <div class="card stat"><div class="n">${days}</div><div class="l">всего дней занятий</div></div>
        <div class="card stat"><div class="n">${s.total}</div><div class="l">слов в изучении</div></div>
        <div class="card stat"><div class="n">${s.learned}</div><div class="l">слов выучено (интервал ≥ 21 дня)</div></div>
        <div class="card stat"><div class="n">${s.due}</div><div class="l">карточек на сегодня</div></div>
        <div class="card stat"><div class="n">${Object.keys(st.lessons).length}</div><div class="l">уроков пройдено</div></div>
        <div class="card stat"><div class="n">${Object.keys(st.dialogues).length}</div><div class="l">диалогов отработано</div></div>
        <div class="card stat"><div class="n">${Object.keys(st.texts).length}</div><div class="l">текстов прочитано</div></div>
      </div>
      <h2>По уровням</h2>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Уровень</th><th>Грамматика</th><th>Слова (начато / всего)</th></tr></thead><tbody>${byLevel}</tbody></table></div>
      <h2>Игры</h2>
      ${games ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Игра</th><th>Сыграно</th><th>Лучший результат</th><th>Последний раз</th></tr></thead><tbody>${games}</tbody></table></div>` : `<p class="muted">Вы ещё не играли. <a href="#/games">Попробуйте!</a></p>`}
      <h2>Данные</h2>
      <p class="small muted">Прогресс хранится только в этом браузере (localStorage). Можно выгрузить его в файл и перенести на другое устройство.</p>
      <div class="row">
        <button class="btn" id="pg-export">⬇️ Экспорт прогресса (JSON)</button>
        <label class="btn">⬆️ Импорт <input type="file" id="pg-import" accept="application/json" hidden></label>
        <button class="btn bad" id="pg-reset">🗑️ Сбросить весь прогресс</button>
      </div>
      <textarea id="pg-json" class="mt" style="width:100%;height:120px;display:none"></textarea>
    `);
    document.getElementById("pg-export").onclick = () => { const ta = document.getElementById("pg-json"); ta.style.display = "block"; ta.value = JSON.stringify(st); ta.select(); try { navigator.clipboard.writeText(ta.value); HL.toast("Скопировано в буфер обмена"); } catch (e) { HL.toast("Скопируйте текст из поля ниже"); } };
    document.getElementById("pg-import").onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const obj = JSON.parse(r.result); Object.assign(HL.store.get(), obj); HL.store.save(); HL.toast("Прогресс импортирован"); HL.dispatch(); } catch (err) { HL.toast("Не удалось прочитать файл"); } }; r.readAsText(f); };
    document.getElementById("pg-reset").onclick = () => { if (confirm("Удалить весь прогресс? Это действие нельзя отменить.")) { HL.store.reset(); HL.dispatch(); } };
  });
})();
