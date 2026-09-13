/* ===== Устойчивые выражения ===== */
(function () {
  const E = HL.esc;
  HL.route("/expressions", function () {
    const X = HL.data.expressions || [];
    const cats = ["all"].concat([...new Set(X.map(e => e.category))].filter(Boolean));
    let cat = "all", level = "all", q = "";
    HL.render(`<h1>💬 Устойчивые выражения</h1>
      <p class="muted">${X.length} живых оборотов, идиом и коллокаций, которые звучат в реальной речи израильтян. У каждого — дословный перевод, смысл, пример и пометка регистра. Именно они отличают «учебный» иврит от настоящего. Кнопкой «абв→abc» в шапке можно переключить транскрипцию на латиницу.</p>
      <div class="filters">
        <select id="x-cat"><option value="all">Все категории</option>${cats.filter(c => c !== "all").map(c => `<option value="${E(c)}">${E(c)}</option>`).join("")}</select>
        <select id="x-level"><option value="all">Все уровни</option>${["A1", "A2", "B1", "B2"].map(l => `<option>${l}</option>`).join("")}</select>
        <input type="search" id="x-q" class="search-box" placeholder="Поиск: иврит, перевод, смысл…">
        <button class="btn sm" id="x-hide">🙈 Спрятать перевод</button>
      </div>
      <div class="muted small mb" id="x-count"></div>
      <div class="stack" id="x-list"></div>`);
    const list = document.getElementById("x-list"), cnt = document.getElementById("x-count");
    function draw() {
      const items = X.filter(e => (cat === "all" || e.category === cat) && (level === "all" || e.level === level) && (!q || (e.he + e.tr + e.ru + (e.literal || "") + (e.usage || "")).toLowerCase().includes(q) || HL.stripNikud(e.he).includes(HL.stripNikud(q))));
      cnt.textContent = `${items.length} ${HL.plural(items.length, "выражение", "выражения", "выражений")}`;
      list.innerHTML = items.map(e => `<div class="card">
        <div class="row between"><span class="he big">${E(e.he)}</span><span>${e.level ? HL.badge(e.level) : ""} <span class="badge">${E(e.category || "")}</span></span></div>
        <div><span class="tr">${E(e.tr)}</span> ${HL.speakBtn(e.he)} — <strong class="dlg-ru">${E(e.ru)}</strong></div>
        ${e.literal ? `<div class="small muted dlg-ru">дословно: «${E(e.literal)}»</div>` : ""}
        ${e.usage ? `<div class="small dlg-ru">${E(e.usage)}</div>` : ""}
        ${e.ex ? `<div class="example" style="margin:8px 0 0"><span class="he">${E(e.ex)}</span> ${HL.speakBtn(e.ex)} <span class="tr">${E(e.exTr || "")}</span> <span class="dlg-ru">— ${E(e.exRu || "")}</span></div>` : ""}
      </div>`).join("") || `<div class="empty">Ничего не найдено</div>`;
      HL.applySettings();
    }
    document.getElementById("x-cat").onchange = e => { cat = e.target.value; draw(); };
    document.getElementById("x-level").onchange = e => { level = e.target.value; draw(); };
    document.getElementById("x-q").oninput = e => { q = e.target.value.trim().toLowerCase(); draw(); };
    document.getElementById("x-hide").onclick = e => { const app = document.getElementById("app"); app.classList.toggle("hidden-ru"); e.target.textContent = app.classList.contains("hidden-ru") ? "👁️ Показать перевод" : "🙈 Спрятать перевод"; };
    draw();
  });
})();
