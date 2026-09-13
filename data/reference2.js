window.HL = window.HL || {}; HL.data = HL.data || {}; HL.data.reference = HL.data.reference || [];

/* ================================================================
   Справочник — Правила чтения
   ================================================================ */
HL.data.reference.push({
  id: "reading-rules",
  icon: "🔡",
  order: 1,
  title: "Правила чтения: какая буква как читается",
  summary: "Полный разбор чтения ивритских букв: дагеш и БеГеД-КеФеТ, тройные роли ו и י, немая ה, буквы-омофоны и как не путать их на письме, апострофы, конечные формы, огласовки, шва и ударение.",
  body: `<h3>Зачем нужны отдельные «правила чтения»</h3>
<p>В иврите одна и та же буква может звучать по-разному, а один и тот же звук записываться разными буквами. Пока вы читаете тексты с огласовками (никудом), почти всё однозначно; но даже там есть узлы, о которые спотыкаются именно русскоязычные: дагеш, тройная роль <span class="he">ו</span> и <span class="he">י</span>, немая <span class="he">ה</span>, буквы-двойники. Разберём их по порядку, с таблицами. Если вы ещё не знаете сами буквы и значки огласовок — сначала пройдите раздел «Алфавит», а сюда возвращайтесь за системой.</p>

<h3>1. Буквы с двойным чтением: дагеш меняет звук</h3>
<p>Три буквы читаются двояко в зависимости от точки внутри них (это «лёгкий дагеш», <span class="he">דָּגֵשׁ קַל</span> <span class="tr">даге́ш каль</span>):</p>
<table class="tbl">
<thead><tr><th>С дагешем</th><th>Звук</th><th>Без дагеша</th><th>Звук</th></tr></thead>
<tbody>
<tr><td><span class="he">בּ</span></td><td>[б]</td><td><span class="he">ב</span></td><td>[в]</td></tr>
<tr><td><span class="he">כּ</span></td><td>[к]</td><td><span class="he">כ</span> (кон. <span class="he">ך</span>)</td><td>[х]</td></tr>
<tr><td><span class="he">פּ</span></td><td>[п]</td><td><span class="he">פ</span> (кон. <span class="he">ף</span>)</td><td>[ф]</td></tr>
</tbody></table>
<div class="example">
<span class="he">בַּיִת</span> <span class="tr">ба́йит</span> — дом; <span class="he">אָב</span> <span class="tr">ав</span> — отец<br>
<span class="he">כֶּלֶב</span> <span class="tr">кэ́лев</span> — собака; <span class="he">מֶלֶךְ</span> <span class="tr">мэ́лех</span> — король<br>
<span class="he">פֶּה</span> <span class="tr">пэ</span> — рот; <span class="he">יָפֶה</span> <span class="tr">йафэ́</span> — красивый
</div>

<h4>Правило БеГеД-КеФеТ</h4>
<p>Исторически дагеш мог стоять в шести буквах — <span class="he">בּ גּ דּ כּ פּ תּ</span>, их запоминают как слово-считалку <strong>БеГеД-КеФеТ</strong> (<span class="he">בֶּגֶ״ד כֶּפֶ״ת</span>). Правило простое: дагеш ставится, когда звук в начале слога и перед ним нет гласного:</p>
<table class="tbl">
<thead><tr><th>Дагеш ЕСТЬ (взрывной: б, к, п)</th><th>Дагеша НЕТ (фрикативный: в, х, ф)</th></tr></thead>
<tbody>
<tr><td>в начале слова: <span class="he">בַּיִת</span> <span class="tr">ба́йит</span></td><td>после гласного в середине: <span class="he">אָבִיב</span> <span class="tr">ави́в</span> — весна</td></tr>
<tr><td>после закрытого слога (после немого шва): <span class="he">מִדְבָּר</span> <span class="tr">мидба́р</span> — пустыня</td><td>в конце слова после гласного: <span class="he">כּוֹאֵב</span> <span class="tr">коэ́в</span> — болит</td></tr>
<tr><td>после согласного: <span class="he">מַלְכָּה</span> <span class="tr">малка́</span> — королева</td><td>после открытого слога: <span class="he">שׁוֹפֵט</span> <span class="tr">шофэ́т</span> — судья</td></tr>
</tbody></table>
<div class="tip">Практический ориентир: <strong>первая буква слова</strong> из БеГеД-КеФеТ почти всегда взрывная (б, к, п). Поэтому предлог-приставка <span class="he">בְּ־</span> — это «бэ», а не «вэ»: <span class="he">בְּבַיִת</span> <span class="tr">бэва́йит</span> — «в доме».</div>
<p>Историческая тройка <span class="he">גּ / דּ / תּ</span> тоже меняла звук (был мягкий, «придыхательный» вариант), но <strong>в современном иврите разница исчезла</strong>: <span class="he">ג</span> всегда [г], <span class="he">ד</span> всегда [д], <span class="he">ת</span> всегда [т], с дагешем или без. Дагеш в них на чтение не влияет.</p>

<h3>2. Буква ו — согласный или гласный</h3>
<p>У <span class="he">ו</span> (вав) три роли:</p>
<table class="tbl">
<thead><tr><th>Вид</th><th>Роль</th><th>Звук</th><th>Пример</th></tr></thead>
<tbody>
<tr><td><span class="he">ו</span> (с огласовкой или как согласная)</td><td>согласный</td><td>[в]</td><td><span class="he">וֶרֶד</span> <span class="tr">вэ́рэд</span> — роза</td></tr>
<tr><td><span class="he">וֹ</span> (точка сверху)</td><td>гласный холам</td><td>[о]</td><td><span class="he">שָׁלוֹם</span> <span class="tr">шало́м</span> — мир</td></tr>
<tr><td><span class="he">וּ</span> (точка в середине)</td><td>гласный шурук</td><td>[у]</td><td><span class="he">הוּא</span> <span class="tr">hу</span> — он</td></tr>
</tbody></table>
<p>В неогласованном тексте согласный [в] в середине слова часто удваивают: <span class="he">תִּקְוָה</span> пишут <span class="he">תקווה</span>. Двойной <span class="he">וו</span> без огласовок читается как согласный [в], а не «уу».</p>

<h3>3. Буква י — согласный или гласный</h3>
<p><span class="he">י</span> (йод) — либо согласный [й], либо часть долгого гласного:</p>
<table class="tbl">
<thead><tr><th>Роль</th><th>Звук</th><th>Пример</th></tr></thead>
<tbody>
<tr><td>согласный</td><td>[й]</td><td><span class="he">יֶלֶד</span> <span class="tr">йэ́лед</span> — мальчик</td></tr>
<tr><td>после хирика (<span class="he">ִי</span>)</td><td>[и]</td><td><span class="he">עִיר</span> <span class="tr">ир</span> — город</td></tr>
<tr><td>после цере (<span class="he">ֵי</span>)</td><td>[эй] / [э]</td><td><span class="he">בֵּית</span> <span class="tr">бэйт</span> — дом (в сопряжении)</td></tr>
</tbody></table>

<h3>4. Буква ה</h3>
<p><span class="he">ה</span> (hей) — лёгкий выдох [h] (как в английском <em>home</em>):</p>
<ul>
<li><strong>В начале слова</strong> — читается: <span class="he">הַר</span> <span class="tr">hар</span> — гора, <span class="he">הוּא</span> <span class="tr">hу</span> — он.</li>
<li><strong>Артикль <span class="he">הַ־</span></strong> («тот самый», англ. <em>the</em>) — всегда в начале слова и читается [hа]: <span class="he">הַבַּיִת</span> <span class="tr">hа-ба́йит</span> — этот дом.</li>
<li><strong>В конце слова</strong> — обычно немая, показатель женского рода <span class="he">־ָה</span>: <span class="he">תּוֹרָה</span> <span class="tr">тора́</span>, <span class="he">יַלְדָּה</span> <span class="tr">йалда́</span> — девочка.</li>
</ul>

<h3>5. Буквы-двойники: разный знак — один звук</h3>
<p>Главная сложность на письме: несколько букв дают один и тот же звук. Понимая на слух, вы не всегда знаете, какой буквой писать — это надо запоминать вместе со словом. Вот пары и тройки-омофоны:</p>
<table class="tbl">
<thead><tr><th>Буквы</th><th>Звук</th><th>Как различать / запоминать</th></tr></thead>
<tbody>
<tr><td><span class="he">א</span> / <span class="he">ע</span></td><td>«немые» (носители гласного)</td><td><span class="he">א</span> (алеф) — в заимствованиях и служебных словах; <span class="he">ע</span> (айин) — исконно семитский, исторически гортанный</td></tr>
<tr><td><span class="he">כ</span> (<span class="he">ך</span>) / <span class="he">ח</span></td><td>[х]</td><td><span class="he">כ</span> — «мягкий» вариант БеГеД-КеФеТ (бывает и [к]); <span class="he">ח</span> — всегда [х], глубже</td></tr>
<tr><td><span class="he">כּ</span> (<span class="he">ך</span>=[х]) / <span class="he">ק</span></td><td>[к]</td><td><span class="he">כּ</span> — с дагешем; <span class="he">ק</span> (коф) — всегда [к], опускается под строку</td></tr>
<tr><td><span class="he">ט</span> / <span class="he">ת</span></td><td>[т]</td><td>оба [т]; <span class="he">ט</span> часто в заимствованиях (<span class="he">טֶלֶפוֹן</span>), <span class="he">ת</span> — в исконных окончаниях</td></tr>
<tr><td><span class="he">ס</span> / <span class="he">שׂ</span></td><td>[с]</td><td><span class="he">ס</span> (самех) — круглая; <span class="he">שׂ</span> (син) — точка слева над шин</td></tr>
<tr><td><span class="he">ב</span> / <span class="he">ו</span></td><td>[в]</td><td><span class="he">ב</span> (вет, без дагеша) и <span class="he">ו</span> (вав-согласный) — оба [в]</td></tr>
<tr><td><span class="he">צ</span> (<span class="he">ץ</span>)</td><td>[ц]</td><td>единственная буква для [ц]; апостроф <span class="he">צ׳</span> даёт [ч]</td></tr>
</tbody></table>
<p>А теперь обратная таблица — «звук → какими буквами он записывается»:</p>
<table class="tbl">
<thead><tr><th>Звук</th><th>Буквы</th></tr></thead>
<tbody>
<tr><td>[в]</td><td><span class="he">ב</span> (без дагеша), <span class="he">ו</span></td></tr>
<tr><td>[к]</td><td><span class="he">כּ</span>, <span class="he">ק</span></td></tr>
<tr><td>[х]</td><td><span class="he">כ</span> (<span class="he">ך</span>), <span class="he">ח</span></td></tr>
<tr><td>[т]</td><td><span class="he">ט</span>, <span class="he">ת</span></td></tr>
<tr><td>[с]</td><td><span class="he">ס</span>, <span class="he">שׂ</span></td></tr>
<tr><td>«немой» носитель гласного</td><td><span class="he">א</span>, <span class="he">ע</span></td></tr>
</tbody></table>

<h3>6. Апострофы (гереш): звуки, которых нет в алфавите</h3>
<p>Чтобы записать звуки заимствований, к букве добавляют апостроф <span class="he">׳</span> (гереш):</p>
<table class="tbl">
<thead><tr><th>Знак</th><th>Звук</th><th>Пример</th></tr></thead>
<tbody>
<tr><td><span class="he">ג׳</span></td><td>[дж]</td><td><span class="he">ג׳ִינְס</span> <span class="tr">джинс</span> — джинсы</td></tr>
<tr><td><span class="he">ז׳</span></td><td>[ж]</td><td><span class="he">ז׳ָקֶט</span> <span class="tr">жакэ́т</span> — жакет</td></tr>
<tr><td><span class="he">צ׳</span></td><td>[ч]</td><td><span class="he">צ׳יפְּס</span> <span class="tr">чипс</span> — чипсы</td></tr>
<tr><td><span class="he">ת׳</span></td><td>[th] (арабское)</td><td>в передаче арабских имён и слов</td></tr>
</tbody></table>

<h3>7. Конечные формы (софиты)</h3>
<p>Пять букв в конце слова пишутся иначе, но читаются так же:</p>
<table class="tbl">
<thead><tr><th>Обычная</th><th>Конечная</th><th>Звук</th><th>Пример</th></tr></thead>
<tbody>
<tr><td><span class="he">כ</span></td><td><span class="he">ך</span></td><td>[х]</td><td><span class="he">מֶלֶךְ</span> <span class="tr">мэ́лех</span> — король</td></tr>
<tr><td><span class="he">מ</span></td><td><span class="he">ם</span></td><td>[м]</td><td><span class="he">שָׁלוֹם</span> <span class="tr">шало́м</span></td></tr>
<tr><td><span class="he">נ</span></td><td><span class="he">ן</span></td><td>[н]</td><td><span class="he">בֵּן</span> <span class="tr">бэн</span> — сын</td></tr>
<tr><td><span class="he">פ</span></td><td><span class="he">ף</span></td><td>[ф]</td><td><span class="he">כֶּסֶף</span> <span class="tr">кэ́сэф</span> — деньги</td></tr>
<tr><td><span class="he">צ</span></td><td><span class="he">ץ</span></td><td>[ц]</td><td><span class="he">אֶרֶץ</span> <span class="tr">э́рэц</span> — страна</td></tr>
</tbody></table>
<div class="tip">Конечная <span class="he">ך</span> — всегда [х] (взрывного [к] в конце не бывает): <span class="he">שֶׁלְּךָ</span> <span class="tr">шельха́</span> — твой.</div>

<h3>8. Гласные (огласовки): пять звуков</h3>
<p>Как бы много ни было значков никуда, гласных звуков в иврите всего <strong>пять</strong>: а, э, и, о, у. Разные знаки исторически различали долготу, сегодня дают один звук:</p>
<table class="tbl">
<thead><tr><th>Звук</th><th>Знаки</th><th>Пример</th></tr></thead>
<tbody>
<tr><td>[а]</td><td>патах <span class="he">ַ</span>, камац <span class="he">ָ</span></td><td><span class="he">בַּיִת</span> <span class="tr">ба́йит</span></td></tr>
<tr><td>[э]</td><td>сеголь <span class="he">ֶ</span>, цере <span class="he">ֵ</span></td><td><span class="he">סֵפֶר</span> <span class="tr">сэ́фэр</span> — книга</td></tr>
<tr><td>[и]</td><td>хирик <span class="he">ִ</span> (часто с <span class="he">י</span>)</td><td><span class="he">עִיר</span> <span class="tr">ир</span></td></tr>
<tr><td>[о]</td><td>холам <span class="he">ֹ</span> / <span class="he">וֹ</span>, камац-катан</td><td><span class="he">שָׁלוֹם</span> <span class="tr">шало́м</span></td></tr>
<tr><td>[у]</td><td>кубуц <span class="he">ֻ</span>, шурук <span class="he">וּ</span></td><td><span class="he">הוּא</span> <span class="tr">hу</span></td></tr>
</tbody></table>
<p>Подробные названия и начертания значков — в разделе «Алфавит». Важно понять: гласный «висит» на согласной букве, а буквы <span class="he">א ה ו י</span> (запоминают как <span class="he">אֵהֵוִי</span>) могут сами обозначать гласный — это «матери чтения», <span class="he">אִמּוֹת הַקְּרִיאָה</span> <span class="tr">имо́т hа-криа́</span> (лат. matres lectionis). Именно поэтому в тексте без огласовок вы всё же различаете <span class="he">שלום</span> (шало́м) — <span class="he">ו</span> подсказывает [о].</p>

<h3>9. Шва и хатафы</h3>
<p>Знак шва <span class="he">ְ</span> (две точки вертикально) имеет два чтения:</p>
<table class="tbl">
<thead><tr><th>Вид шва</th><th>Где</th><th>Чтение</th><th>Пример</th></tr></thead>
<tbody>
<tr><td>подвижное (<span class="he">נָע</span>)</td><td>в начале слога/слова</td><td>краткое [э]</td><td><span class="he">שְׁמִי</span> <span class="tr">шми</span> / <span class="he">בְּבַקָּשָׁה</span> <span class="tr">бэвакаша́</span></td></tr>
<tr><td>немое (<span class="he">נָח</span>)</td><td>в конце закрытого слога</td><td>не читается</td><td><span class="he">מִדְבָּר</span> <span class="tr">мидба́р</span> (МИД-бар)</td></tr>
</tbody></table>
<p>Под гортанными <span class="he">א ה ח ע</span> вместо шва ставят <strong>хатафы</strong> — сверхкраткие гласные: <span class="he">ֲ</span> (хатаф-патах, «а»), <span class="he">ֱ</span> (хатаф-сеголь, «э»), <span class="he">ֳ</span> (хатаф-камац, «о»): <span class="he">אֲנִי</span> <span class="tr">ани́</span> — я, <span class="he">חֲלוֹם</span> <span class="tr">хало́м</span> — сон.</p>

<h3>10. Ударение</h3>
<p>По умолчанию ударение в иврите — на <strong>последнем слоге</strong> (<span class="he">מִלְרַע</span> <span class="tr">миль-ра́</span>): <span class="he">שָׁלוֹם</span> шало́м, <span class="he">תּוֹדָה</span> тода́, <span class="he">לִכְתֹּב</span> лихто́в. Но есть регулярные исключения с ударением на предпоследнем слоге (<span class="he">מִלְעֵיל</span> <span class="tr">миль-э́йль</span>):</p>
<table class="tbl">
<thead><tr><th>Тип</th><th>Пример</th><th>Ударение</th></tr></thead>
<tbody>
<tr><td>сеголаты (слова с двумя «э»)</td><td><span class="he">סֵפֶר</span> <span class="tr">сэ́фэр</span>, <span class="he">יֶלֶד</span> <span class="tr">йэ́лед</span>, <span class="he">בֹּקֶר</span> <span class="tr">бо́кер</span></td><td>на первый слог</td></tr>
<tr><td>двойственное число <span class="he">־ַיִם</span></td><td><span class="he">מַיִם</span> <span class="tr">ма́йим</span> — вода, <span class="he">יַלְדַּיִם</span></td><td>на слог перед <span class="he">־ַיִם</span></td></tr>
<tr><td>многие имена и разговорные слова</td><td><span class="he">אֹכֶל</span> <span class="tr">о́хель</span> — еда</td><td>на предпоследний</td></tr>
</tbody></table>

<h3>Типичные ошибки русскоязычных</h3>
<div class="warn"><strong>Читать <span class="he">ח</span> как [к].</strong> <span class="he">ח</span> — это всегда [х] (глухой, из горла), никогда [к]. [к] дают только <span class="he">כּ</span> и <span class="he">ק</span>. Сравните: <span class="he">חַג</span> <span class="tr">хаг</span> — праздник, а не «каг».</div>
<div class="warn"><strong>Путать <span class="he">ה</span> [h] и <span class="he">ח</span> [х].</strong> <span class="he">ה</span> — лёгкий выдох (как в англ. <em>home</em>), <span class="he">ח</span> — жёсткое горловое [х]. <span class="he">הַר</span> <span class="tr">hар</span> — гора, но <span class="he">חַר</span> звучало бы с русским «х».</div>
<div class="warn"><strong>Не различать <span class="he">ב</span> и <span class="he">ו</span> на письме.</strong> Оба дают [в], но пишутся по-разному, и слово надо запомнить: <span class="he">אָב</span> (отец) — через <span class="he">ב</span>, а <span class="he">וֶרֶד</span> (роза) — через <span class="he">ו</span>.</div>
<div class="warn"><strong>Забывать про дагеш в начале слова.</strong> Русскоязычные по инерции читают <span class="he">בְּ־</span> как «вэ». Но в начале слога буква БеГеД-КеФеТ взрывная: <span class="he">בְּתֵל אָבִיב</span> <span class="tr">бэтэ́ль-ави́в</span>, а не «вэтэль».</div>
<div class="warn"><strong>Читать конечную <span class="he">ך</span> как [к].</strong> Она всегда [х]: <span class="he">שֶׁלָּךְ</span> <span class="tr">шела́х</span> — твоя.</div>`,
  exercises: [
    { type: "choice", q: "Как читается בּ (с дагешем) в начале слова בַּיִת?",
      options: ["[б]", "[в]", "[п]"], answer: 0,
      explain: "В начале слова буква БеГеД-КеФеТ взрывная: בּ = [б]. Без дагеша ב = [в]." },
    { type: "choice", q: "Какой звук даёт буква ח?",
      options: ["всегда [х]", "[к] или [х]", "[h]"], answer: 0,
      explain: "ח — всегда глухое горловое [х], никогда [к]. [h] даёт ה, [к] дают כּ и ק." },
    { type: "choice", q: "Что обозначает וֹ (вав с точкой сверху)?",
      options: ["гласный [о]", "гласный [у]", "согласный [в]"], answer: 0,
      explain: "וֹ (холам) = [о]: שָׁלוֹם. Точка в середине וּ = [у], без точек и с огласовкой — согласный [в]." },
    { type: "choice", q: "Какими буквами записывается звук [к]?",
      options: ["כּ и ק", "כ и ח", "ק и ח"], answer: 0,
      explain: "[к] дают כּ (каф с дагешем) и ק (коф). А כ без дагеша и ח дают [х]." },
    { type: "fill", q: "Поставьте подходящий апостроф, чтобы получить звук [ч] (буква цади с герешем):",
      answer: ["צ׳", "צ'"], hint: "буква для [ц] + апостроф",
      explain: "צ = [ц], а צ׳ (с герешем) = [ч]: צ׳יפְּס — чипсы." },
    { type: "choice", q: "На какой слог падает ударение в слове סֵפֶר (книга)?",
      options: ["на первый (сэ́-фэр)", "на последний (сэ-фэ́р)", "ударения нет"], answer: 0,
      explain: "Это сеголат — слово с двумя «э», ударение на первом слоге: сэ́фэр. Исключение из правила «ударение на последнем слоге»." },
    { type: "choice", q: "Как прочитать конечную букву ך в слове שֶׁלְּךָ?",
      options: ["[х] — шельха́", "[к] — шелька́", "не читается"], answer: 0,
      explain: "Конечная ך всегда [х], взрывного [к] в конце слова не бывает: שֶׁלְּךָ — шельха́ (твой)." }
  ]
});

/* ================================================================
   Справочник — Времена глаголов
   ================================================================ */
HL.data.reference.push({
  id: "verb-tenses",
  icon: "⏳",
  order: 6,
  title: "Времена глаголов: наглядный разбор",
  summary: "Все формы ивритского глагола на одном сквозном примере לִכְתֹּב (писать): настоящее, прошедшее, будущее, повелительное и инфинитив. Как иврит передаёт то, чего в нём нет отдельным временем.",
  body: `<h3>Сколько «времён» в иврите</h3>
<p>Хорошая новость для начинающих: у ивритского глагола всего <strong>три времени</strong> — настоящее, прошедшее и будущее, плюс две неспрягаемые по времени формы: повелительное наклонение и инфинитив. Ни продолженного («I am writing»), ни совершенного («I have written»), ни отдельного «был/будет» здесь нет — их роль берут на себя те же три времени и вспомогательные конструкции. Разберём всё на одном сквозном глаголе — <span class="he">לִכְתֹּב</span> <span class="tr">лихто́в</span> «писать» (биньян пааль, корень <span class="he">כ.ת.ב</span>) — а для сравнения добавим по одному глаголу из пиэля и hифъиля.</p>

<h3>1. Настоящее время (הוֹוֶה)</h3>
<p>Настоящее время в иврите исторически — причастие («пишущий»), поэтому форм всего <strong>четыре</strong>, и зависят они не от лица, а от рода и числа: «я пишу», «ты пишешь», «он пишет» для мужчины — одно и то же <span class="he">כּוֹתֵב</span>. Лицо показывает местоимение.</p>
<table class="tbl">
<thead><tr><th></th><th>Мужской род</th><th>Женский род</th></tr></thead>
<tbody>
<tr><td>ед. ч.</td><td><span class="he">אֲנִי / אַתָּה / הוּא כּוֹתֵב</span> <span class="tr">котэ́в</span></td><td><span class="he">אֲנִי / אַתְּ / הִיא כּוֹתֶבֶת</span> <span class="tr">котэ́вэт</span></td></tr>
<tr><td>мн. ч.</td><td><span class="he">אֲנַחְנוּ / אַתֶּם / הֵם כּוֹתְבִים</span> <span class="tr">котви́м</span></td><td><span class="he">אֲנַחְנוּ / אַתֶּן / הֵן כּוֹתְבוֹת</span> <span class="tr">котво́т</span></td></tr>
</tbody></table>
<div class="example">
<span class="he">אֲנִי כּוֹתֵב מִכְתָּב.</span> <span class="tr">ани́ котэ́в михта́в</span> — Я пишу письмо. (муж.)<br>
<span class="he">הִיא כּוֹתֶבֶת כָּל יוֹם.</span> <span class="tr">hи котэ́вэт коль йом</span> — Она пишет каждый день.<br>
<span class="he">הֵם כּוֹתְבִים בְּעִבְרִית.</span> <span class="tr">hэм котви́м бэ-иври́т</span> — Они пишут на иврите.
</div>
<p>Одна форма покрывает и «я пишу (сейчас)», и «я пишу (регулярно)», и значение «пишущий». Настоящее время употребляют для действия в момент речи, для привычного/регулярного действия и для общих истин.</p>
<p>Для сравнения — настоящее в других биньянах: пиэль <span class="he">מְדַבֵּר / מְדַבֶּרֶת</span> <span class="tr">мэдабэ́р / мэдабэ́рэт</span> — говорит; hифъиль <span class="he">מַרְגִּישׁ / מַרְגִּישָׁה</span> <span class="tr">марги́ш / маргиша́</span> — чувствует. Обратите внимание на приставку <span class="he">מ־</span> — маркер настоящего времени в этих биньянах.</p>

<h3>2. Прошедшее время (עָבָר)</h3>
<p>Прошедшее образуется от основы прошедшего (<span class="he">כָּתַב</span> — «он написал») присоединением <strong>личных суффиксов</strong>. Здесь форма зависит уже от лица, рода и числа — как в русском, но окончания другие:</p>
<table class="tbl">
<thead><tr><th>Местоимение</th><th>Форма</th><th>Транслит.</th><th>Перевод</th></tr></thead>
<tbody>
<tr><td><span class="he">אֲנִי</span></td><td><span class="he">כָּתַבְתִּי</span></td><td><span class="tr">ката́вти</span></td><td>я (на)писал(а)</td></tr>
<tr><td><span class="he">אַתָּה</span></td><td><span class="he">כָּתַבְתָּ</span></td><td><span class="tr">ката́вта</span></td><td>ты (м.) писал</td></tr>
<tr><td><span class="he">אַתְּ</span></td><td><span class="he">כָּתַבְתְּ</span></td><td><span class="tr">ката́вт</span></td><td>ты (ж.) писала</td></tr>
<tr><td><span class="he">הוּא</span></td><td><span class="he">כָּתַב</span></td><td><span class="tr">ката́в</span></td><td>он писал</td></tr>
<tr><td><span class="he">הִיא</span></td><td><span class="he">כָּתְבָה</span></td><td><span class="tr">катва́</span></td><td>она писала</td></tr>
<tr><td><span class="he">אֲנַחְנוּ</span></td><td><span class="he">כָּתַבְנוּ</span></td><td><span class="tr">ката́вну</span></td><td>мы писали</td></tr>
<tr><td><span class="he">אַתֶּם/אַתֶּן</span></td><td><span class="he">כְּתַבְתֶּם / כְּתַבְתֶּן</span></td><td><span class="tr">ктавтэ́м / ктавтэ́н</span></td><td>вы писали</td></tr>
<tr><td><span class="he">הֵם/הֵן</span></td><td><span class="he">כָּתְבוּ</span></td><td><span class="tr">катву́</span></td><td>они писали</td></tr>
</tbody></table>
<div class="tip">Суффиксы прошедшего — универсальны для всех биньянов: <span class="he">־תִּי</span> (я), <span class="he">־תָּ</span> (ты м.), <span class="he">־תְּ</span> (ты ж.), <span class="he">־נוּ</span> (мы), <span class="he">־תֶּם/־תֶּן</span> (вы), <span class="he">־ָה</span> (она), <span class="he">־וּ</span> (они). Выучив их один раз, вы спрягаете в прошедшем любой глагол.</div>
<p>Про ударение: в формах «я/ты/мы» оно на основе (ка-ТА́В-ти), а в формах «вы» (<span class="he">כְּתַבְתֶּם</span>) переходит на суффикс — ктав-ТЭ́М.</p>
<div class="example">
<span class="he">אֶתְמוֹל כָּתַבְתִּי מִכְתָּב.</span> <span class="tr">этмо́ль ката́вти михта́в</span> — Вчера я написал письмо.<br>
<span class="he">הֵם דִּבְּרוּ עִבְרִית.</span> <span class="tr">hэм дибру́ иври́т</span> — Они говорили на иврите. (пиэль)<br>
<span class="he">הִיא הִרְגִּישָׁה טוֹב.</span> <span class="tr">hи hиргиша́ тов</span> — Она чувствовала себя хорошо. (hифъиль)
</div>

<h3>3. Будущее время (עָתִיד)</h3>
<p>Будущее — самое «непривычное»: оно образуется <strong>приставками</strong> (а иногда ещё и суффиксами) от основы будущего. Приставки: <span class="he">א</span> (я), <span class="he">ת</span> (ты/она), <span class="he">י</span> (он/они), <span class="he">נ</span> (мы) — запоминают как <span class="he">אִיתָ״ן</span> <span class="tr">эйта́н</span>.</p>
<table class="tbl">
<thead><tr><th>Местоимение</th><th>Форма</th><th>Транслит.</th><th>Перевод</th></tr></thead>
<tbody>
<tr><td><span class="he">אֲנִי</span></td><td><span class="he">אֶכְתֹּב</span></td><td><span class="tr">эхто́в</span></td><td>я напишу</td></tr>
<tr><td><span class="he">אַתָּה</span></td><td><span class="he">תִּכְתֹּב</span></td><td><span class="tr">тихто́в</span></td><td>ты (м.) напишешь</td></tr>
<tr><td><span class="he">אַתְּ</span></td><td><span class="he">תִּכְתְּבִי</span></td><td><span class="tr">тихтэви́</span></td><td>ты (ж.) напишешь</td></tr>
<tr><td><span class="he">הוּא</span></td><td><span class="he">יִכְתֹּב</span></td><td><span class="tr">йихто́в</span></td><td>он напишет</td></tr>
<tr><td><span class="he">הִיא</span></td><td><span class="he">תִּכְתֹּב</span></td><td><span class="tr">тихто́в</span></td><td>она напишет</td></tr>
<tr><td><span class="he">אֲנַחְנוּ</span></td><td><span class="he">נִכְתֹּב</span></td><td><span class="tr">нихто́в</span></td><td>мы напишем</td></tr>
<tr><td><span class="he">אַתֶּם/אַתֶּן</span></td><td><span class="he">תִּכְתְּבוּ</span></td><td><span class="tr">тихтэву́</span></td><td>вы напишете</td></tr>
<tr><td><span class="he">הֵם/הֵן</span></td><td><span class="he">יִכְתְּבוּ</span></td><td><span class="tr">йихтэву́</span></td><td>они напишут</td></tr>
</tbody></table>
<p>Одно и то же будущее выражает и план на будущее, и вежливую просьбу — как русское «Не напишешь ли...?»:</p>
<div class="example">
<span class="he">מָחָר אֶכְתֹּב לְךָ.</span> <span class="tr">маха́р эхто́в леха́</span> — Завтра я тебе напишу. (план)<br>
<span class="he">תִּכְתֹּב לִי אֶת הַכְּתֹבֶת?</span> <span class="tr">тихто́в ли эт hа-ктовэ́т?</span> — Не напишешь мне адрес? (вежливая просьба)
</div>

<h3>4. Повелительное наклонение (צִיווּי)</h3>
<p>Формальное повелительное образуется от будущего без приставки:</p>
<table class="tbl">
<thead><tr><th>Кому</th><th>Форма</th><th>Транслит.</th><th>Перевод</th></tr></thead>
<tbody>
<tr><td>ты (м.)</td><td><span class="he">כְּתֹב!</span></td><td><span class="tr">кто́в</span></td><td>пиши!</td></tr>
<tr><td>ты (ж.)</td><td><span class="he">כִּתְבִי!</span></td><td><span class="tr">китви́</span></td><td>пиши!</td></tr>
<tr><td>вы</td><td><span class="he">כִּתְבוּ!</span></td><td><span class="tr">китву́</span></td><td>пишите!</td></tr>
</tbody></table>
<div class="tip">В живой речи формальный императив часто заменяют <strong>будущим временем</strong>: вместо <span class="he">בּוֹא!</span> говорят <span class="he">תָּבוֹא!</span> <span class="tr">таво́</span> — «приходи / заходи», вместо <span class="he">תֵּן</span> — <span class="he">תִּתֵּן לִי</span> «дай мне». Это звучит мягче и естественнее.</div>
<p>Отрицательный приказ («не делай!») образуется <strong>только</strong> через <span class="he">אַל</span> + будущее, никогда через императив:</p>
<div class="example">
<span class="he">אַל תִּכְתֹּב פֹּה!</span> <span class="tr">аль тихто́в по!</span> — Не пиши здесь!<br>
<span class="he">אַל תִּדְאַג.</span> <span class="tr">аль тид'а́г</span> — Не волнуйся.
</div>

<h3>5. Инфинитив (שֵׁם הַפֹּעַל)</h3>
<p>Инфинитив («писать, читать») начинается с приставки <span class="he">לְ־</span> или <span class="he">לִ־</span>: <span class="he">לִכְתֹּב</span> <span class="tr">лихто́в</span> — писать, <span class="he">לְדַבֵּר</span> <span class="tr">лэдабэ́р</span> — говорить (пиэль), <span class="he">לְהַרְגִּישׁ</span> <span class="tr">лэhарги́ш</span> — чувствовать (hифъиль). Он неизменяем и употребляется после модальных слов:</p>
<div class="example">
<span class="he">אֲנִי רוֹצֶה לִכְתֹּב.</span> <span class="tr">ани́ роцэ́ лихто́в</span> — Я хочу писать.<br>
<span class="he">אַתָּה צָרִיךְ לִכְתֹּב.</span> <span class="tr">ата́ цари́х лихто́в</span> — Тебе нужно написать.<br>
<span class="he">אֶפְשָׁר לִכְתֹּב פֹּה?</span> <span class="tr">эфша́р лихто́в по?</span> — Можно здесь писать?
</div>

<h3>Чего в иврите нет — и как это сказать</h3>
<p>Иврит обходится тремя временами, комбинируя их с глаголом <span class="he">הָיָה</span> (был) / <span class="he">יִהְיֶה</span> (будет) и настоящим временем:</p>
<table class="tbl">
<thead><tr><th>Русское значение</th><th>Как сказать на иврите</th></tr></thead>
<tbody>
<tr><td>Я был писателем / был занят</td><td><span class="he">הָיִיתִי</span> <span class="tr">hаи́ти</span> + сущ./прил.: <span class="he">הָיִיתִי עָסוּק</span> — я был занят</td></tr>
<tr><td>Я писал (регулярно, бывало)</td><td><span class="he">הָיִיתִי כּוֹתֵב</span> <span class="tr">hаи́ти котэ́в</span> — hайа + настоящее</td></tr>
<tr><td>Я пишу прямо сейчас (Continuous)</td><td>обычное настоящее: <span class="he">אֲנִי כּוֹתֵב</span> — отдельного продолженного времени нет</td></tr>
<tr><td>Я буду занят / буду там</td><td><span class="he">אֶהְיֶה</span> <span class="tr">эhйэ́</span> + прил.: <span class="he">אֶהְיֶה בַּבַּיִת</span> — я буду дома</td></tr>
<tr><td>Настоящее «есть/являюсь»</td><td>связка опускается: <span class="he">אֲנִי מוֹרֶה</span> — я (есть) учитель</td></tr>
</tbody></table>
<p>Конструкция <span class="he">הָיָה</span> + настоящее (<span class="he">הָיִיתִי כּוֹתֵב</span>) — это «бывало, писал», привычное действие в прошлом. Аналогично <span class="he">יִהְיֶה</span> + настоящее передаёт длящееся будущее.</p>

<h3>Типичные ошибки русскоязычных</h3>
<div class="warn"><strong>Спрягать настоящее по лицам.</strong> В настоящем времени нет отдельной формы для «я», «ты», «он» — только по роду и числу. Мужчина в любом лице говорит <span class="he">כּוֹתֵב</span>, а лицо задаёт местоимение.</div>
<div class="warn"><strong>Искать продолженное время.</strong> Нет «I am writing» отдельной формой — <span class="he">אֲנִי כּוֹתֵב</span> значит и «пишу вообще», и «пишу сейчас». Не пытайтесь добавить вспомогательный глагол «быть».</div>
<div class="warn"><strong>Строить отрицательный приказ через императив.</strong> Нельзя сказать «אַל כְּתֹב». Только <span class="he">אַל</span> + будущее: <span class="he">אַל תִּכְתֹּב</span>.</div>
<div class="warn"><strong>Путать приставки будущего.</strong> <span class="he">ת</span> — это и «ты (м.)», и «она»: <span class="he">תִּכְתֹּב</span> без местоимения двусмысленно. Всегда ставьте местоимение, если контекст не ясен.</div>
<div class="warn"><strong>Забывать связку в прошедшем/будущем.</strong> В настоящем «я учитель» связки нет, но в прошедшем она обязательна: не «אֲנִי מוֹרֶה אֶתְמוֹל», а <span class="he">הָיִיתִי מוֹרֶה</span> — «я был учителем».</div>`,
  exercises: [
    { type: "choice", q: "Сколько форм у глагола в настоящем времени?",
      options: ["четыре (по роду и числу)", "шесть (по лицам)", "три"], answer: 0,
      explain: "Настоящее время = причастие, поэтому форм четыре: м.р. ед., ж.р. ед., м.р. мн., ж.р. мн. Лицо показывает местоимение." },
    { type: "fill", q: "Прошедшее время, 1 лицо ед.ч.: אֲנִי ___ (писать). Впишите форму:",
      answer: ["כָּתַבְתִּי", "כתבתי"], hint: "основа כָּתַב + суффикс ־תִּי",
      explain: "Суффикс 1 л. ед.ч. в прошедшем — ־תִּי: כָּתַבְתִּי (ката́вти) — я (на)писал(а)." },
    { type: "choice", q: "Какая приставка образует будущее время 1 лица ед.ч. («я»)?",
      options: ["א (אֶכְתֹּב)", "ת (תִּכְתֹּב)", "נ (נִכְתֹּב)"], answer: 0,
      explain: "Приставки будущего — אִיתָ״ן: א (я), ת (ты/она), י (он/они), נ (мы). «Я напишу» — אֶכְתֹּב." },
    { type: "fill", q: "Как сказать «Не пиши здесь!» (отрицательный приказ, м.р.)?",
      answer: ["אַל תִּכְתֹּב פֹּה", "אל תכתוב פה"], hint: "אַל + будущее время",
      explain: "Отрицательный приказ — только אַל + будущее: אַל תִּכְתֹּב פֹּה. Императив здесь не используется." },
    { type: "choice", q: "Как правильно продолжить: אֲנִי רוֹצֶה ___ ?",
      options: ["לִכְתֹּב (инфинитив)", "כּוֹתֵב (настоящее)", "כָּתַבְתִּי (прошедшее)"], answer: 0,
      explain: "После модального רוֹצֶה (хочу) идёт инфинитив: אֲנִי רוֹצֶה לִכְתֹּב — я хочу писать." },
    { type: "choice", q: "Как передать «Я, бывало, писал (регулярно в прошлом)»?",
      options: ["הָיִיתִי כּוֹתֵב", "אֲנִי כּוֹתֵב", "אֶכְתֹּב"], answer: 0,
      explain: "Привычное действие в прошлом = הָיָה + настоящее время: הָיִיתִי כּוֹתֵב." },
    { type: "order", q: "Соберите вежливую просьбу: «Не напишешь мне адрес?»",
      words: ["תִּכְתֹּב", "לִי", "אֶת הַכְּתֹבֶת"], answer: "תִּכְתֹּב לִי אֶת הַכְּתֹבֶת" }
  ]
});
