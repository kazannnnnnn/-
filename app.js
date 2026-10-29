'use strict';
// Small, original sample set for reviewing the interaction; not a complete N1 list.
const words = [
  {id:'unagasu',word:'促す',reading:'うながす',meaning:'促使；催促；敦促',example:'先生は学生に発言を促した。',translation:'老师鼓励学生发言。',collocation:'注意を促す · 提醒注意'},
  {id:'oginau',word:'補う',reading:'おぎなう',meaning:'补充；弥补',example:'不足している栄養を補う。',translation:'补充不足的营养。',collocation:'欠点を補う · 弥补缺点'},
  {id:'tomo',word:'伴う',reading:'ともなう',meaning:'伴随；伴有',example:'計画の変更にはリスクが伴う。',translation:'计划变更伴随着风险。',collocation:'責任を伴う · 伴随责任'},
  {id:'sokunau',word:'損なう',reading:'そこなう',meaning:'损害；伤害',example:'無理をすると健康を損なう。',translation:'过度勉强会损害健康。',collocation:'信頼を損なう · 损害信任'},
  {id:'iyamu',word:'営む',reading:'いとなむ',meaning:'经营；从事；过生活',example:'彼は小さな店を営んでいる。',translation:'他经营着一家小店。',collocation:'生活を営む · 过生活'},
  {id:'kiwameru',word:'極める',reading:'きわめる',meaning:'穷尽；钻研到极致',example:'彼女は料理の道を極めた。',translation:'她在料理一道上钻研到了极致。',collocation:'技を極める · 将技艺磨炼到极致'},
  {id:'okeru',word:'怠る',reading:'おこたる',meaning:'怠慢；疏忽',example:'安全確認を怠ってはいけない。',translation:'不能疏忽安全检查。',collocation:'努力を怠る · 怠于努力'},
  {id:'owasoru',word:'恐れる',reading:'おそれる',meaning:'害怕；担心',example:'失敗を恐れずに挑戦する。',translation:'不惧失败地挑战。',collocation:'失敗を恐れる · 害怕失败'},
  {id:'yashinau',word:'養う',reading:'やしなう',meaning:'培养；养育',example:'読書を通して想像力を養う。',translation:'通过阅读培养想象力。',collocation:'能力を養う · 培养能力'},
  {id:'hagemu',word:'励む',reading:'はげむ',meaning:'努力；勤奋从事',example:'目標に向かって練習に励む。',translation:'朝着目标努力练习。',collocation:'勉強に励む · 努力学习'}
];
words.unshift(...additionalWords);
// Keep previous IDs so existing learning records and favorites remain valid.
const legacyWords = words.splice(0);
const legacyByPair = new Map(legacyWords.map(w=>[`${w.word}\u0000${w.reading}`,w]));
const matchedLegacy = new Set();
for (const item of importedN1Words) { const old=legacyByPair.get(`${item.word}\u0000${item.reading}`); if(old && !matchedLegacy.has(old.id)){words.push(old);matchedLegacy.add(old.id);} else {words.push(item);} }
words.push(...legacyWords.filter(w=>!matchedLegacy.has(w.id)));
const key = 'kotoba-nikka-v1';
let state = { goal: 5, order: 'source', progress: {}, favorites: [], records: {}, day: '', learnedToday: 0, reviewedToday: 0, manualToday: 0 };
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved && typeof saved === 'object') state = { ...state, ...saved };
} catch (_) {}
if (!state.records || typeof state.records !== 'object' || Array.isArray(state.records)) state.records = {};
if (!state.progress || typeof state.progress !== 'object') state.progress = {};
if (!Array.isArray(state.favorites)) state.favorites = [];
state.goal = Math.min(200, Math.max(1, Number(state.goal) || 5));
if (!['source', 'kana', 'random'].includes(state.order)) state.order = 'source';
// Earlier versions stored only the current day's totals, so preserve what is available.
if (state.day && !state.records[state.day] && (state.learnedToday || state.reviewedToday)) {
  state.records[state.day] = { learned: state.learnedToday || 0, reviewed: state.reviewedToday || 0, manual: 0 };
}
const main = document.getElementById('main');
const wordById = new Map(words.map(w => [w.id, w]));
let page = 'home', queue = [], current = null, showing = false, completed = 0, total = 0;
let filter = '', libraryLimit = 60, libraryFilter = 'all', sessionMode = 'daily';
const collator = new Intl.Collator('ja', { sensitivity: 'base' });
function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c])); }
function dateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
function save() { try { localStorage.setItem(key, JSON.stringify(state)); return true; } catch (_) { toast('无法保存进度，请检查浏览器设置'); return false; } }
function toast(message) { const el=document.getElementById('toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2500); }
function refreshDay() {
  if (state.day !== dateKey()) { state.day=dateKey(); state.learnedToday=0; state.reviewedToday=0; state.manualToday=0; save(); }
  state.manualToday ||= 0;
}
function recordAnswer(kind) {
  const date = dateKey();
  state.records[date] ||= { learned: 0, reviewed: 0, manual: 0 };
  state.records[date][kind] = (state.records[date][kind] || 0) + 1;
}
function stableHash(value) { let h=2166136261; for (let i=0;i<value.length;i++) h=Math.imul(h ^ value.charCodeAt(i),16777619); return h>>>0; }
function wordOrder(a,b) {
  if (state.order === 'kana') return collator.compare(a.reading,b.reading) || collator.compare(a.word,b.word) || a.id.localeCompare(b.id);
  if (state.order === 'random') { const day=dateKey(); return stableHash(day+a.id)-stableHash(day+b.id) || a.id.localeCompare(b.id); }
  return 0;
}
function sortedNewWords() { return words.filter(w=>!state.progress[w.id]).sort(wordOrder); }
function counts() {
  refreshDay();
  const due=words.filter(w=>state.progress[w.id] && state.progress[w.id].due<=dateKey()).sort((a,b)=>state.progress[a.id].due.localeCompare(state.progress[b.id].due) || wordOrder(a,b));
  const fresh=sortedNewWords().slice(0,Math.max(0,state.goal-state.learnedToday));
  return {due,fresh};
}
function nextDate(days) { const d=new Date(); d.setDate(d.getDate()+days); return dateKey(d); }
function nav() { const active=page==='history'?'settings':page==='review'?'home':page; document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===active)); }
function render() {
  const app=document.querySelector('.app');
  app.classList.toggle('studying',page==='study'); app.classList.toggle('home-view',page==='home'); nav();
  if(page==='home') home(); else if(page==='library') library(); else if(page==='settings') settings(); else if(page==='history') history(); else if(page==='review') review(); else study();
  window.scrollTo(0,0);
}
function home() {
  const {due,fresh}=counts(); const remaining=due.length+fresh.length;
  const done=state.learnedToday+state.reviewedToday+state.manualToday;
  const date=new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'long'}).format(new Date());
  main.innerHTML=`<div class="home-screen"><section class="home-header"><div class="home-date">${date}</div><h1>今日学习</h1></section><section class="daily-card"><div class="plan-head"><span>今日任务</span><span class="plan-meta">已练习 ${done} 次</span></div><div class="plan-content"><div class="plan-count"><span>新词</span><strong>${fresh.length.toString().padStart(2,'0')}<small>词</small></strong></div><div class="plan-count"><span>待复习</span><strong>${due.length.toString().padStart(2,'0')}<small>词</small></strong></div></div><button class="primary" id="start" ${!remaining?'disabled':''}>${remaining?'开始学习':'今日学习已完成'} <span aria-hidden="true">→</span></button><button class="review-link" id="review">主动复习 <span aria-hidden="true">↗</span></button></section></div>`;
  document.getElementById('start').onclick=()=>start('daily');
  document.getElementById('review').onclick=()=>{page='review';render();};
}
function reviewPool(favoritesOnly=false) {
  const today=dateKey();
  return words.filter(w=>state.progress[w.id] && (!favoritesOnly || state.favorites.includes(w.id)))
    .sort((a,b)=>{ const x=state.progress[a.id],y=state.progress[b.id]; return Number(y.due<=today)-Number(x.due<=today) || (x.lastReviewed||'').localeCompare(y.lastReviewed||'') || x.due.localeCompare(y.due); }).slice(0,20);
}
function review() {
  const learned=Object.keys(state.progress).filter(id=>wordById.has(id)).length;
  const favorites=state.favorites.filter(id=>state.progress[id] && wordById.has(id)).length;
  main.innerHTML=`<h1 class="page-title">主动复习</h1><p class="page-intro">每次最多 20 词，优先复习已到期和较久未复习的词。</p><div class="settings-card"><div class="setting-row"><div><strong>已学词</strong><small>共 ${learned} 个词</small></div><button class="small-action" id="review-all" ${!learned?'disabled':''}>开始</button></div></div><div class="settings-card"><div class="setting-row"><div><strong>已学的收藏词</strong><small>共 ${favorites} 个词</small></div><button class="small-action" id="review-favorites" ${!favorites?'disabled':''}>开始</button></div></div><p class="fineprint">提前复习记住的词不会推迟原定复习时间；忘记的词会加入今天的待复习。</p>`;
  document.getElementById('review-all').onclick=()=>start('manual'); document.getElementById('review-favorites').onclick=()=>start('favorites');
}
function start(mode='daily') {
  sessionMode=mode;
  const selection=mode==='daily'?(()=>{const {due,fresh}=counts();return [...due,...fresh];})():reviewPool(mode==='favorites');
  if (!selection.length) return;
  queue=selection.map(w=>w.id);total=queue.length;completed=0;current=queue.shift();showing=false;page='study';render();
}
function study() {
  if(!current){main.innerHTML=`<div class="empty"><div class="symbol">✓</div><h2>练习完成</h2><p>本次学习已完成。</p><button class="primary" id="home">回到首页</button></div>`;document.getElementById('home').onclick=()=>{page='home';render();};return;}
  const w=wordById.get(current); const progress=total?Math.min(100,completed/total*100):0;
  main.innerHTML=`<div class="study-top"><button class="back" id="back" aria-label="返回首页">‹</button><div class="bar"><i style="width:${progress}%"></i></div><span class="study-count">${Math.min(completed+1,total)} / ${total}</span></div><article class="flashcard ${showing?'answer':''}"><button class="star study-star ${state.favorites.includes(w.id)?'on':''}" id="study-star" aria-label="${state.favorites.includes(w.id)?'取消收藏':'收藏'} ${escapeHtml(w.word)}">${state.favorites.includes(w.id)?'★':'☆'}</button><div class="word-label">${sessionMode!=='daily'?'主动复习':state.progress[w.id]?'复习':'新词'}</div><h1 class="word" lang="ja">${escapeHtml(w.word)}</h1><div class="reading" lang="ja">${showing?escapeHtml(w.reading):'　'}</div><button class="sound" id="sound" aria-label="播放日语读音"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4.5 9.2h3.3l4.3-3.5v12.6l-4.3-3.5H4.5zM15.3 9a4.4 4.4 0 0 1 0 6m2.5-8.5a8 8 0 0 1 0 11"/></svg></button>${showing?`<div class="meaning">${escapeHtml(w.meaning)}</div>${w.example?`<div class="example" lang="ja">${escapeHtml(w.example)}</div><div class="translation">${escapeHtml(w.translation)}</div>`:''}${w.collocation?`<div class="collocation">${escapeHtml(w.collocation)}</div>`:''}<div class="ratings"><button data-rating="again">忘记了</button><button data-rating="hard">模糊</button><button data-rating="good">记住了</button></div>`:`<div class="prompt">想一想，它的读音和意思是什么？</div><button class="primary reveal" id="reveal">查看释义</button>`}</article>`;
  document.getElementById('back').onclick=()=>{page='home';render();};document.getElementById('sound').onclick=()=>speak(w.reading);document.getElementById('study-star').onclick=()=>{state.favorites=state.favorites.includes(w.id)?state.favorites.filter(id=>id!==w.id):[...state.favorites,w.id];save();study();};
  if(!showing)document.getElementById('reveal').onclick=()=>{showing=true;study();};else main.querySelectorAll('[data-rating]').forEach(b=>b.onclick=()=>rate(b.dataset.rating));
}
const voicePreferenceKey='kotoba-japanese-voice';
function japaneseVoices(){return 'speechSynthesis' in window?window.speechSynthesis.getVoices().filter(voice=>/^ja(?:[-_]|$)/i.test(voice.lang)):[];}
function preferredVoice(){try{return localStorage.getItem(voicePreferenceKey)||'';}catch(_){return '';}}
function speak(text){
  if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){toast('当前浏览器不支持语音播放');return;}
  const synth=window.speechSynthesis,voices=japaneseVoices(),preferred=preferredVoice();
  // Prefer an explicitly labelled enhanced voice when available; otherwise let the device choose.
  const voice=voices.find(item=>item.voiceURI===preferred)||(!preferred&&voices.find(item=>/enhanced|premium|高品质|增强/i.test(item.name)));
  synth.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='ja-JP';utterance.rate=1;
  if(voice)utterance.voice=voice;
  utterance.onerror=event=>{if(!['canceled','interrupted'].includes(event.error))toast('语音播放不可用，请检查设备语音设置');};
  synth.speak(utterance);
}
function updateVoiceOptions(){
  const select=document.getElementById('voice');if(!select)return;
  const voices=japaneseVoices(),preferred=preferredVoice();
  select.replaceChildren(new Option('自动选择', ''));
  for(const voice of voices)select.add(new Option(voice.name,voice.voiceURI));
  if(preferred&&!voices.some(voice=>voice.voiceURI===preferred))select.add(new Option('已选声音暂不可用',preferred));
  select.value=preferred;
  const hint=document.getElementById('voice-hint');
  hint.textContent=!('speechSynthesis' in window)?'当前浏览器不支持语音播放':voices.length?'选择并试听设备提供的日语声音':'使用设备默认日语声音';
}
if('speechSynthesis' in window)window.speechSynthesis.addEventListener('voiceschanged',updateVoiceOptions);
function rate(rating) {
  refreshDay(); const old=state.progress[current]; const isNew=!old; const earlyManual=sessionMode!=='daily' && old && old.due>dateKey();
  const previousStage=old?.stage || 0; const intervals=[1,1,3,7,14,30,60];
  let stage=rating==='good'?Math.min(previousStage+1,intervals.length-1):rating==='hard'?Math.max(0,previousStage-1):0;
  let due=nextDate(rating==='again'?0:rating==='hard'?1:intervals[stage]);
  if(earlyManual && rating==='good'){ stage=previousStage; due=old.due; }
  if(earlyManual && rating==='hard' && old.due<due) due=old.due;
  state.progress[current]={...old,stage,due,lastReviewed:new Date().toISOString()};
  if(sessionMode!=='daily'){state.manualToday++;recordAnswer('manual');}
  else if(isNew){state.learnedToday++;recordAnswer('learned');}
  else{state.reviewedToday++;recordAnswer('reviewed');}
  save(); if(rating==='again'){queue.push(current);total++;}completed++;current=queue.shift()||null;showing=false;render();
}
function library() {
  const term=filter.trim().toLowerCase();const matches=words.filter(w=>(libraryFilter==='all'||state.favorites.includes(w.id)) && `${w.word} ${w.reading} ${w.meaning}`.toLowerCase().includes(term));const visible=matches.slice(0,libraryLimit);
  main.innerHTML=`<h1 class="page-title">词库</h1><p class="page-intro">${words.length} 个备考词条</p><div class="filter-tabs" role="group" aria-label="词库筛选"><button data-filter="all" class="${libraryFilter==='all'?'selected':''}" aria-pressed="${libraryFilter==='all'}">全部</button><button data-filter="favorites" class="${libraryFilter==='favorites'?'selected':''}" aria-pressed="${libraryFilter==='favorites'}">收藏 ${state.favorites.length}</button></div><input class="search" id="search" type="search" placeholder="搜索单词、读音或释义" aria-label="搜索词库"><div class="list">${visible.length?visible.map(w=>`<div class="list-item"><div><span class="list-word" lang="ja">${escapeHtml(w.word)}</span><span class="list-reading">${escapeHtml(w.reading)}</span><div class="list-meaning">${escapeHtml(w.meaning)}</div></div><button class="star ${state.favorites.includes(w.id)?'on':''}" data-star="${escapeHtml(w.id)}" aria-label="${state.favorites.includes(w.id)?'取消收藏':'收藏'} ${escapeHtml(w.word)}">${state.favorites.includes(w.id)?'★':'☆'}</button></div>`).join(''):`<div class="list-item list-meaning">${libraryFilter==='favorites'&&!term?'还没有收藏的单词。':'没有找到匹配的单词。'}</div>`}</div>${matches.length>visible.length?`<button class="load-more" id="load-more">显示更多（${visible.length} / ${matches.length}）</button>`:''}`;
  const input=document.getElementById('search');input.value=filter;input.oninput=e=>{filter=e.target.value;libraryLimit=60;const position=e.target.selectionStart;library();const replacement=document.getElementById('search');replacement.focus();replacement.setSelectionRange(position,position);};
  main.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{libraryFilter=b.dataset.filter;libraryLimit=60;library();});const more=document.getElementById('load-more');if(more)more.onclick=()=>{libraryLimit+=60;library();};
  main.querySelectorAll('[data-star]').forEach(b=>b.onclick=()=>{const id=b.dataset.star;state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];save();library();});
}
function settings() {
  main.innerHTML=`<h1 class="page-title">设置</h1><div class="settings-card"><div class="setting-row"><div><strong>每日新词目标</strong><small>每天 1–200 个，可直接输入</small></div><div class="stepper"><button id="minus" aria-label="减少新词目标">−</button><input id="goal" type="number" inputmode="numeric" min="1" max="200" step="1" value="${state.goal}" aria-label="每日新词目标"><button id="plus" aria-label="增加新词目标">＋</button></div></div></div><div class="settings-card"><div class="setting-row"><div><strong>单词顺序</strong><small>复习优先到期词；随机顺序每天更新</small></div><select id="order" aria-label="单词顺序"><option value="source">词库顺序</option><option value="kana">五十音序</option><option value="random">随机</option></select></div></div><div class="settings-card voice-card"><div class="setting-row"><div><strong>日语发音</strong><small id="voice-hint">选择并试听设备提供的日语声音</small></div><button class="small-action" id="voice-preview" type="button">试听</button></div><select id="voice" aria-label="日语发音声音"><option value="">自动选择</option></select></div><button class="settings-card settings-link" id="history"><span><strong>学习记录</strong><small>已学 ${Object.keys(state.progress).filter(id=>wordById.has(id)).length} 词 · 收藏 ${state.favorites.length} 词</small></span><span aria-hidden="true">›</span></button><div class="settings-card backup-card"><strong>学习数据</strong><small>将记录保存到文件，或从文件恢复。</small><div class="backup-actions"><button class="small-action" id="export-data">导出记录</button><button class="small-action" id="import-data">导入记录</button><input id="backup-file" type="file" accept="application/json,.json" hidden></div></div><div class="install"><strong>像 App 一样使用</strong><br>在 iPhone 的 Safari 中点按分享按钮，选择“添加到主屏幕”，再从主屏幕打开即可隐藏浏览器工具栏。Safari 和主屏幕的学习记录可能不互通；如需迁移，请先导出记录，再到主屏幕应用中导入。清除数据可能导致丢失。</div><p class="fineprint">词形和读音参考 <a href="https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project">JMdict / EDRDG</a>（2021 年数据），采用 <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> 授权。N1 词条来自 <a href="https://github.com/5mdld/anki-jlpt-decks">egg rolls JLPT 10k 卡组</a>，采用 <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans">CC BY-NC 4.0</a>，仅限非商业用途。词条经筛选、整理和部分修改，尚未全部校对，并非官方 N1 词表。发音使用设备自带的日语语音。</p>`;
  function setGoal(value){const n=Number(value);state.goal=Number.isFinite(n)&&n>0?Math.min(200,Math.max(1,Math.floor(n))):state.goal;save();settings();}
  document.getElementById('goal').onchange=e=>setGoal(e.target.value);document.getElementById('minus').onclick=()=>setGoal(state.goal-1);document.getElementById('plus').onclick=()=>setGoal(state.goal+1);
  updateVoiceOptions();document.getElementById('voice').onchange=e=>{try{if(e.target.value)localStorage.setItem(voicePreferenceKey,e.target.value);else localStorage.removeItem(voicePreferenceKey);}catch(_){toast('无法保存声音设置');}};document.getElementById('voice-preview').onclick=()=>speak('うながす');
  const order=document.getElementById('order');order.value=state.order;order.onchange=e=>{state.order=e.target.value;save();};document.getElementById('history').onclick=()=>{page='history';render();};document.getElementById('export-data').onclick=exportData;document.getElementById('import-data').onclick=()=>document.getElementById('backup-file').click();document.getElementById('backup-file').onchange=importData;
}
function exportData() {
  refreshDay(); const blob=new Blob([JSON.stringify({format:'kotoba-backup',version:1,state},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`日语单词记录-${dateKey()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function importData(event) {
  const file=event.target.files?.[0];if(!file)return;
  try {
    if(file.size>5*1024*1024)throw new Error('文件过大');
    const data=JSON.parse(await file.text()), incoming=data?.state;
    const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
    if(data?.format!=='kotoba-backup'||data.version!==1||!obj(incoming)||!obj(incoming.progress)||!Array.isArray(incoming.favorites)||!incoming.favorites.every(x=>typeof x==='string')||!obj(incoming.records)||!Object.values(incoming.progress).every(x=>obj(x)&&typeof x.due==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x.due)&&Number.isFinite(x.stage))||!Object.values(incoming.records).every(obj))throw new Error('文件格式不正确');
    if(!window.confirm('导入会替换当前设备上的学习记录和设置。确定继续吗？'))return;
    const previous=state;state={goal:5,order:'source',progress:{},favorites:[],records:{},day:'',learnedToday:0,reviewedToday:0,manualToday:0,...incoming};
    state.goal=Math.min(200,Math.max(1,Number(state.goal)||5));if(!['source','kana','random'].includes(state.order))state.order='source';
    if(!save()){state=previous;return;}refreshDay();settings();toast('学习记录已导入');
  } catch(_){toast('无法导入，请选择有效的学习记录文件');}
  finally{event.target.value='';}
}
function history() {
  refreshDay(); const days=Object.keys(state.records).sort().reverse();
  main.innerHTML=`<div class="subpage-head"><button class="back" id="settings-back" aria-label="返回设置">‹</button><h1>学习记录</h1></div><p class="page-intro">记录每一天的学习和复习次数。</p><div class="list">${days.length?days.map(day=>{const r=state.records[day];return `<div class="history-row"><strong>${escapeHtml(day)}</strong><span>新词 ${Number(r.learned)||0} · 复习 ${Number(r.reviewed)||0} · 主动复习 ${Number(r.manual)||0}</span></div>`;}).join(''):'<div class="list-item list-meaning">还没有学习记录，完成一次练习后会显示在这里。</div>'}</div><p class="fineprint">旧版本只保留了最近一天的数量；升级后会逐日记录。数据保存在当前浏览器中。</p>`;
  document.getElementById('settings-back').onclick=()=>{page='settings';render();};
}
document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>{page=b.dataset.page;filter='';libraryFilter='all';libraryLimit=60;render();});
refreshDay();render();
