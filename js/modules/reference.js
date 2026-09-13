/* ===== Справочник: род, число, «падежи», предлоги, времена, чтение ===== */
(function () {
  const E = HL.esc;
  HL.refSorted = function () { return (HL.data.reference || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0)); };

  HL.route("/reference", function () {
    const R = HL.refSorted();
    HL.render(`<h1>📚 Справочник</h1>
      <p class="muted">Систематические разборы ключевых тем грамматики: как устроены род и число, чем иврит заменяет падежи, как работают предлоги и времена глаголов, и подробные правила чтения букв. Это «карта» языка — возвращайтесь сюда, когда нужно увидеть всю систему целиком.</p>
      <div class="grid">${R.map(a => `<a class="card link" href="#/reference/${E(a.id)}"><div class="icon">${a.icon || "📄"}</div><h3>${E(a.title)}</h3><p class="meta">${E(a.summary || "")}</p></a>`).join("") || '<div class="empty">Статьи загружаются…</div>'}</div>
      <div class="card mt"><h3>Рядом полезно</h3><div class="row"><a class="btn" href="#/grammar">📖 Уроки грамматики</a><a class="btn" href="#/grammar/verbs">🔁 Таблицы спряжения</a><a class="btn" href="#/expressions">💬 Устойчивые выражения</a><a class="btn" href="#/alphabet">🔤 Алфавит</a></div></div>`);
  });

  HL.route("/reference/:id", function (id) {
    const R = HL.refSorted(); const idx = R.findIndex(a => a.id === id); const a = R[idx];
    if (!a) { HL.render(`<div class="empty">Статья не найдена. <a href="#/reference">К справочнику</a></div>`); return; }
    const prev = R[idx - 1], next = R[idx + 1];
    HL.render(`<div class="lesson">
      <a class="back" href="#/reference">← Справочник</a>
      <h1>${a.icon || "📄"} ${E(a.title)}</h1>
      <p class="muted">${E(a.summary || "")}</p>
      <div class="body">${a.body}</div>
      ${a.exercises && a.exercises.length ? `<h2>✏️ Проверьте себя</h2><div id="ex-list">${a.exercises.map((x, i) => HL.renderExercise(x, i)).join("")}</div><div class="card center" id="ex-summary"></div>` : ""}
      <div class="row between mt">
        <span>${prev ? `<a class="btn" href="#/reference/${E(prev.id)}">← ${E(prev.title)}</a>` : ""}</span>
        <span>${next ? `<a class="btn" href="#/reference/${E(next.id)}">${E(next.title)} →</a>` : ""}</span>
      </div></div>`);
    document.querySelectorAll(".lesson .body .he").forEach(el => { const b = document.createElement("button"); b.className = "speak"; b.dataset.speak = el.textContent; b.textContent = "🔊"; b.title = "Озвучить"; b.style.fontSize = ".8rem"; el.after(b); });
    if (a.exercises) HL.bindExercises(a.exercises);
    HL.applySettings();
  });
})();
