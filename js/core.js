/* ===== Ядро: утилиты, хранилище, озвучка, роутер ===== */
window.HL = window.HL || {}; HL.data = HL.data || {};

// ---------- Утилиты ----------
HL.esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
};
HL.stripNikud = function (s) { return String(s || "").replace(/[֑-ֽֿ-ׇ]/g, ""); };
HL.normHe = function (s) { return HL.stripNikud(s).replace(/[״"'׳.,!?;:\-–—()]/g, "").replace(/\s+/g, " ").trim(); };
HL.shuffle = function (arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
HL.sample = function (arr, n) { return HL.shuffle(arr).slice(0, n); };
HL.pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
HL.uniqBy = function (arr, fn) { const seen = new Set(); return arr.filter(x => { const k = fn(x); if (seen.has(k)) return false; seen.add(k); return true; }); };
HL.today = function () { return new Date().toISOString().slice(0, 10); };
HL.plural = function (n, one, few, many) { const m10 = n % 10, m100 = n % 100; if (m10 === 1 && m100 !== 11) return one; if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few; return many; };
HL.levelName = function (k) { const l = (HL.data.levels || []).find(x => x.key === k); return l ? l.ru : k; };
HL.topicName = function (k) { const t = (HL.data.topics || []).find(x => x.key === k); return t ? t.ru : k; };
HL.topicIcon = function (k) { const t = (HL.data.topics || []).find(x => x.key === k); return t ? t.icon : "📁"; };
HL.badge = function (level) { return `<span class="badge ${HL.esc(level)}">${HL.esc(level)}</span>`; };
HL.speakBtn = function (text, cls) { return `<button class="speak ${cls || ""}" data-speak="${HL.esc(text)}" title="Озвучить" aria-label="Озвучить">🔊</button>`; };
HL.he = function (text, extra) { return `<span class="he ${extra || ""}">${HL.esc(text)}</span>`; };
HL.toast = function (msg) {
  let t = document.querySelector(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show"); clearTimeout(HL._toastT); HL._toastT = setTimeout(() => t.classList.remove("show"), 1800);
};

// ---------- Словарь: индексация ----------
HL.allWords = function () {
  if (HL._words) return HL._words;
  const out = []; const v = HL.data.vocab || {};
  ["A0", "A1", "A2", "B1", "B2"].forEach(level => {
    (v[level] || []).forEach((w, i) => { out.push(Object.assign({ id: level + ":" + i, level }, w)); });
  });
  HL._words = out; return out;
};
HL.wordById = function (id) { return HL.allWords().find(w => w.id === id); };
HL.grammarSorted = function () { return (HL.data.grammar || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0)); };

// ---------- Хранилище (localStorage) ----------
HL.store = (function () {
  const KEY = "hl_state_v1";
  const def = () => ({ srs: {}, lessons: {}, dialogues: {}, texts: {}, games: {}, streak: { last: null, count: 0, days: {} }, settings: { theme: "auto", showTr: true, nikud: true }, learning: {} });
  let state;
  try { state = Object.assign(def(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { state = def(); }
  state.settings = Object.assign(def().settings, state.settings || {});
  state.streak = Object.assign(def().streak, state.streak || {});
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* приватный режим */ } }
  function touchStreak() {
    const t = HL.today(); if (state.streak.last === t) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    state.streak.count = state.streak.last === y ? state.streak.count + 1 : 1;
    state.streak.last = t; state.streak.days[t] = true; save();
  }
  return {
    get: () => state, save, touchStreak,
    reset() { state = def(); save(); },
    setSetting(k, v) { state.settings[k] = v; save(); },
    markLesson(id, done) { if (done) state.lessons[id] = HL.today(); else delete state.lessons[id]; save(); touchStreak(); },
    markDialogue(id) { state.dialogues[id] = HL.today(); save(); touchStreak(); },
    markText(id) { state.texts[id] = HL.today(); save(); touchStreak(); },
    gameResult(name, score, meta) {
      const g = state.games[name] || { played: 0, best: 0, last: null };
      g.played++; g.best = Math.max(g.best || 0, score); g.last = HL.today(); if (meta) g.meta = meta;
      state.games[name] = g; save(); touchStreak();
    },
    // --- SRS (упрощённый SM-2) ---
    srsGet(id) { return state.srs[id]; },
    srsRate(id, grade) { // grade: 0 again, 1 hard, 2 good, 3 easy
      const now = Date.now(); const c = state.srs[id] || { ef: 2.5, iv: 0, reps: 0, due: now, lapses: 0 };
      if (grade === 0) { c.reps = 0; c.iv = 0; c.lapses++; c.due = now + 10 * 60e3; }
      else {
        const q = [0, 3, 4, 5][grade];
        c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
        if (c.reps === 0) c.iv = grade === 1 ? 1 : grade === 2 ? 1 : 3;
        else if (c.reps === 1) c.iv = grade === 1 ? 2 : grade === 2 ? 4 : 6;
        else c.iv = Math.round(c.iv * (grade === 1 ? 1.2 : c.ef) * (grade === 3 ? 1.3 : 1));
        c.reps++; c.due = now + c.iv * 864e5;
      }
      c.seen = (c.seen || 0) + 1; c.lastGrade = grade; state.srs[id] = c; save(); touchStreak(); return c;
    },
    srsDue(ids) { const now = Date.now(); return ids.filter(id => state.srs[id] && state.srs[id].due <= now); },
    srsNew(ids) { return ids.filter(id => !state.srs[id]); },
    srsStats() {
      const all = Object.values(state.srs); const now = Date.now();
      return { total: all.length, due: all.filter(c => c.due <= now).length, learned: all.filter(c => c.iv >= 21).length, learning: all.filter(c => c.iv < 21).length };
    }
  };
})();

// ---------- Озвучка (Web Speech API) ----------
HL.speech = (function () {
  let voice = null, ready = false;
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    const vs = speechSynthesis.getVoices(); if (!vs.length) return;
    voice = vs.find(v => /^he/i.test(v.lang) && /Carmit|Google|Natural|Enhanced|Premium/i.test(v.name)) || vs.find(v => /^he/i.test(v.lang) || /hebrew/i.test(v.name)) || null;
    ready = true;
  }
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  return {
    available: () => "speechSynthesis" in window,
    hasHebrew: () => !!voice,
    speak(text, rate) {
      if (!("speechSynthesis" in window)) { HL.toast("Озвучка недоступна в этом браузере"); return; }
      if (!ready) pickVoice();
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text)); u.lang = "he-IL"; u.rate = rate || 0.85;
      if (voice) u.voice = voice; else HL.toast("Ивритский голос не найден: установите его в настройках системы");
      speechSynthesis.speak(u);
    }
  };
});
HL.speech = HL.speech();

// ---------- Роутер ----------
HL.routes = [];
HL.route = function (pattern, handler) { HL.routes.push({ re: new RegExp("^" + pattern.replace(/:(\w+)/g, "([^/]+)") + "$"), handler }); };
HL.go = function (hash) { location.hash = hash; };
HL.render = function (html) { const el = document.getElementById("app"); el.innerHTML = html; window.scrollTo({ top: 0 }); HL.applySettings(); };
HL.dispatch = function () {
  const path = (location.hash.replace(/^#/, "") || "/").split("?")[0];
  for (const r of HL.routes) { const m = path.match(r.re); if (m) { try { r.handler.apply(null, m.slice(1).map(decodeURIComponent)); } catch (e) { console.error(e); HL.render(`<div class="empty">Ошибка отображения страницы.<br><small>${HL.esc(e.message)}</small></div>`); } HL.markNav(path); return; } }
  HL.render(`<div class="empty"><h2>Страница не найдена</h2><a href="#/">На главную</a></div>`);
};
HL.markNav = function (path) {
  document.querySelectorAll(".nav a").forEach(a => {
    const h = a.getAttribute("href").replace(/^#/, "");
    a.classList.toggle("active", h === "/" ? path === "/" : path.startsWith(h));
  });
  document.querySelector(".nav").classList.remove("open");
};
HL.applySettings = function () {
  const s = HL.store.get().settings;
  const dark = s.theme === "dark" || (s.theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  document.body.classList.toggle("hidden-tr", !s.showTr);
  document.body.classList.toggle("nonikud", !s.nikud);
  const bt = document.getElementById("btn-tr"); if (bt) bt.classList.toggle("on", s.showTr);
  const bn = document.getElementById("btn-nikud"); if (bn) bn.classList.toggle("on", s.nikud);
  // Никуд: заменяем текст в .he через data-атрибут
  document.querySelectorAll(".he").forEach(el => {
    if (!el.dataset.full) el.dataset.full = el.textContent;
    const want = s.nikud ? el.dataset.full : HL.stripNikud(el.dataset.full);
    if (el.textContent !== want && el.children.length === 0) el.textContent = want;
  });
};

// ---------- Глобальные обработчики ----------
document.addEventListener("click", e => {
  const sp = e.target.closest("[data-speak]"); if (sp) { e.preventDefault(); HL.speech.speak(sp.dataset.speak); return; }
  const nav = e.target.closest("[data-go]"); if (nav) { HL.go(nav.dataset.go); }
});
window.addEventListener("hashchange", HL.dispatch);
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-theme").onclick = () => { const s = HL.store.get().settings; const next = { auto: "dark", dark: "light", light: "auto" }[s.theme]; HL.store.setSetting("theme", next); HL.applySettings(); HL.toast("Тема: " + { auto: "как в системе", dark: "тёмная", light: "светлая" }[next]); };
  document.getElementById("btn-tr").onclick = () => { HL.store.setSetting("showTr", !HL.store.get().settings.showTr); HL.applySettings(); };
  document.getElementById("btn-nikud").onclick = () => { HL.store.setSetting("nikud", !HL.store.get().settings.nikud); HL.applySettings(); };
  document.getElementById("burger").onclick = () => document.querySelector(".nav").classList.toggle("open");
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", HL.applySettings);
  HL.dispatch();
});
