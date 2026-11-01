/* Экраны и компоненты: функции, которые возвращают HTML. Рисует render() из app.js. */
function mask(m,c){if(m==="troll")return '<img class="m '+(c||"")+'" alt="" src="'+TROLL+'">';return '<svg class="m '+(c||"")+'" viewBox="0 0 100 '+(m==="anon"?124:100)+'"><use href="#'+m+'"/></svg>'}
function tag(st){return st==="p"?'<span class="tag p">ждёт проверки</span>':st==="ok"?'<span class="tag ok">принято</span>':'<span class="tag no">на доработку</span>'}
function hd(t){return '<div class="top"><button class="back" data-a="home">←</button><h2 class="disp">'+t+'</h2>'+mask("troll","th")+'</div>'}
function inp(id,ph){return '<input class="c" id="'+id+'" placeholder="'+ph+'">'}
function usel(id){return '<select class="c" id="'+id+'">'+Object.keys(USERS).map(function(k){return '<option value="'+k+'">'+USERS[k].n+'</option>'}).join("")+'</select>'}
function llist(){var q=(S.q||"").toLowerCase(),a=LB[S.u].filter(function(x){return(x.t+" "+x.g).toLowerCase().indexOf(q)>-1});
 return a.length?a.map(function(x){return '<div class="les"><a class="lk" href="'+esc(x.u)+'" target="_blank" rel="noopener"><b>'+esc(x.t)+'</b><small>'+esc(x.g||"без тега")+'</small></a><button class="chk" data-a="dellib" data-id="'+x.id+'">×</button></div>'}).join(""):'<div class="empty">'+(q?"Ничего не найдено.":"Пока пусто. Добавь первую ссылку.")+'</div>'}
function libS(){return hd("Моя библиотека")+'<div class="box"><b>Сохранить ссылку</b>'+inp("lt","Название")+inp("lu","Ссылка https://...")+inp("lg","Тег (необязательно)")+'<button class="cta red" data-a="addlib">Сохранить</button></div><input class="c" id="sq" placeholder="Поиск по библиотеке" value="'+esc(S.q||"")+'"><div id="ll">'+llist()+'</div>'}
function notesS(){var h=hd("Заметки")+'<div class="box">'+inp("nt","Заголовок")+'<textarea id="nx" placeholder="Мысль, идея, конспект"></textarea><button class="cta red" data-a="addnote">Записать</button></div>';
 NT[S.u].forEach(function(n){h+='<div class="box"><b>'+esc(n.t)+'</b><p style="white-space:pre-wrap;margin:6px 0">'+esc(n.x)+'</p><button class="cta ghost" data-a="delnote" data-id="'+n.id+'">Удалить</button></div>'});
 return NT[S.u].length?h:h+'<div class="empty">Заметок пока нет.</div>'}
function ADDB(){var ad=USERS[S.u].admin;return '<div class="box"><b>Добавить книгу</b>'+(ad?usel("bw"):'<input type="hidden" id="bw" value="'+S.u+'">')+inp("bt","Название")+inp("ba","Автор")+inp("bn","Почему эта книга?")+'<button class="cta red" data-a="addbook">Добавить</button></div>'}
function readS(){var h=hd("Чтение")+TRBTN("read")+ADDB(),ad=USERS[S.u].admin,n=0;
 Object.keys(USERS).forEach(function(k){if(!ad&&k!==S.u)return;
  h+='<h3 style="margin:16px 0 8px">'+(ad?'Подборка: '+USERS[k].n:'Мои книги')+'</h3>';
  BK[k].forEach(function(b){n++;h+='<div class="box"><b>'+esc(b.t)+'</b><small style="display:block;color:var(--mute)">'+esc(b.a)+(b.by&&b.by!==k?' · добавила: '+USERS[b.by].n:'')+'</small>'+(b.n?'<p style="margin:6px 0">'+esc(b.n)+'</p>':'');
   b.c.forEach(function(c){h+='<div class="cmt"><small>'+USERS[c.u].n+'</small>'+esc(c.txt)+'</div>'});
   h+=inp("cm"+b.id,"Комментарий")+'<div class="row"><button class="cta" data-a="cmt" data-id="'+b.id+'">Отправить</button>'+((ad||k===S.u)?'<button class="cta ghost" data-a="delbook" data-id="'+b.id+'">Убрать книгу</button>':'')+'</div></div>'})});
 if(!n)h+='<div class="empty">'+(ad?"Подборок пока нет.":"Пока пусто. Добавь свою первую книгу выше.")+'</div>';
 return h}
function adm(){var h=hd("Админка")+'<div class="box"><b>Новый материал</b><select class="c" id="ms"><option value="tg">Таргетинг</option><option value="eng">Английский</option></select>'+inp("mt","Название")+inp("mu","Ссылка https://...")+inp("mk","Тип: видео, статья")+inp("md","Описание")+'<button class="cta red" data-a="addmat">Добавить</button></div><div class="box"><b>Цель недели (уроков)</b>';
 Object.keys(USERS).forEach(function(k){h+='<div class="row" style="align-items:center;margin-top:8px"><span style="flex:1">'+USERS[k].n+'</span><button class="chk" data-a="goal" data-id="'+k+'" data-v="-1">−</button><b>'+GL[k]+'</b><button class="chk" data-a="goal" data-id="'+k+'" data-v="1">+</button></div>'});
 return h+'</div><p style="color:var(--mute);font-size:14px">Пока всё хранится на этом устройстве. Чтобы остальные видели твои материалы и цели, нужен общий сервер.</p>'}
function cap(){var a=[0,0,0,0,0,1].sort(function(){return Math.random()-.5});
 ov('<h3 class="disp">ПОДТВЕРДИ, ЧТО ТЫ НЕ БОТ</h3><p style="margin:0;color:var(--mute)">Найди Trollface</p><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:min(90vw,360px)">'+a.map(function(v){return '<button class="chk" style="width:100%;height:auto;border-radius:14px;padding:8px" data-a="cap" data-id="'+v+'">'+(v?mask("troll"):mask("anon"))+'</button>'}).join("")+'</div><button class="cta ghost" data-a="ovx">Пропустить</button>')}
function cdh(){var l=Date.UTC(2026,11,19,20)-Date.now();if(l<=0)return '<b class="disp" style="grid-column:span 4;font-size:18px">КОНЦЕРТ УЖЕ НАЧАЛСЯ. ТЫ ТАМ?</b>';
 var d=Math.floor(l/864e5),h=Math.floor(l%864e5/36e5),m=Math.floor(l%36e5/6e4),c=Math.floor(l%6e4/1e3);
 return[[d,"дней"],[h,"часов"],[m,"минут"],[c,"секунд"]].map(function(x){return '<div><b class="disp">'+("0"+x[0]).slice(-2)+'</b><small>'+x[1]+'</small></div>'}).join("")}
function cdw(){return '<div class="cd rv" style="--d:.7s"><small>ДО КОНЦЕРТА МОРГЕНШТЕРНА · ЕРЕВАН · 20 ДЕКАБРЯ</small><div id="cd">'+cdh()+'</div><small style="letter-spacing:.1em">будет жарко, готовься</small></div>'}
function msn(){var u=S.u,i=Math.floor(Date.now()/864e5)%MS.length,ok=MS[i][1](u),e=E[u];if(ok&&!e.m[day()]){e.m[day()]=1;snd("ach");toast("Миссия выполнена. +300 AURA")}
 return '<div class="ms rv" style="--d:.55s"><div><small>МИССИЯ ДНЯ · +300 AURA</small><b>'+(ok?"✓ ":"")+MS[i][0]+'</b></div><button class="cta ghost" data-a="nav" data-id="foc">Фокус</button></div>'}
function foc(){return hd("Фокус")+'<div class="box" style="text-align:center"><div id="tm" class="disp" style="font-size:56px;text-shadow:0 0 20px #ff2a3d">'+fmt(S.fe?S.fe-Date.now():15e5)+'</div><p style="color:var(--mute)">25 минут без телефона. В конце +500 AURA и 25 минут в трекере.</p>'+(S.fe?'<p style="color:var(--mute);margin:0">Раздел: '+TS[S.fsec||"other"]+'</p>':FSEL())+'<button class="cta red" data-a="fstart">'+(S.fe?"Сбросить":"Старт")+'</button></div>'}
function fc(){var c=WORDS.concat(E[S.u].w),w=c[(S.ci||0)%c.length];return '<div class="box" data-a="flip" style="cursor:pointer;text-align:center;min-height:110px;display:grid;place-items:center"><div><small style="color:var(--mute)">'+(S.fl?"ПЕРЕВОД":"СЛОВО")+' · нажми, чтобы перевернуть</small><div class="disp" style="font-size:26px;margin-top:6px">'+esc(S.fl?w.b:w.a)+'</div></div></div>'}
function cards(){return '<h3 style="margin:6px 0">Карточки</h3><div id="fc">'+fc()+'</div><div class="row"><button class="cta" data-a="nxt">Дальше</button></div><div class="box" style="margin-top:12px"><b>Своё слово</b>'+inp("wa","Слово")+inp("wb","Перевод")+'<button class="cta red" data-a="addword">Добавить</button></div>'}
function secret(){return hd("Тайная комната")+'<div class="box" style="text-align:center"><div style="width:120px;margin:0 auto 10px">'+mask("troll")+'</div><b>Ты нашла секрет.</b><p style="color:var(--mute)">Таня: архитектор системы.<br>Ева: хранительница AURA.<br>Анжела: повелительница дедлайнов.<br><br>Никому не говори. Или говори, мне всё равно.</p></div>'}
function rank(){var r=Object.keys(USERS).map(function(k){return[k,ao(k)]}).sort(function(a,b){return b[1]-a[1]}),T=["Альфа академии","Бета-тестер","NPC"];
 return '<div class="box"><b>Рейтинг AURA</b>'+r.map(function(x,i){return '<div class="ach on"><span>'+["🥇","🥈","🥉"][i]+'</span><div><b>'+USERS[x[0]].n+' · '+x[1]+'</b><small>'+T[i]+'</small></div></div>'}).join("")+'</div>'}
function certs(){return '<div class="box"><b>Сертификаты</b>'+SECS.filter(function(z){return z.ls.length}).map(function(z){var d=z.ls.filter(function(l){return S.done[l.id]}).length;return d===z.ls.length?'<button class="cta red" data-a="cert" data-id="'+z.id+'" style="margin-top:8px;width:100%">Получить: '+z.t+'</button>':'<p style="color:var(--mute);margin:8px 0 0">'+z.t+': закрыто, '+d+' из '+z.ls.length+'</p>'}).join("")+'</div>'}
function home(){
 var t=tot(),k=0,d0=S.seen?0:.7;if(!S.seen)setTimeout(function(){S.seen2=1;$("#app").classList.add("seen")},2800);S.seen=1;
 function dl(c){return 'style="--d:'+(d0+.13*k++).toFixed(2)+'s'+(c?';--c:'+c:'')+'"'}
 var act=SECS.filter(function(s){return s.ls.length}).length,last=S.last&&findLes(S.last);
 var h='<div class="stat rv" data-a="egg" '+dl()+'><i></i>СИСТЕМА АКТИВИРОВАНА · AURA '+aura()+' · 🔥'+E[S.u].s+'</div>';
 h+='<div class="hi rv" '+dl()+'><button class="mini" data-a="troll" aria-label="Секрет">'+mask("troll")+'</button><small>ДОБРО ПОЖАЛОВАТЬ ОБРАТНО,</small><h1 class="disp">'+USERS[S.u].n.toUpperCase()+'</h1><span class="ln"></span></div>';
 h+='<div class="chips rv" '+dl()+'><div><small>УРОВЕНЬ</small><b>'+lvl(t[0])+'</b></div><div><small>КУРСОВ</small><b>'+act+' акт.</b></div><div><small>ПОСЛЕДНЕЕ</small><b>'+(last?esc(last.l.t):"пока нет")+'</b></div></div>'+msn()+cdw()+trkRow()+'<div class="nvg">';
 var fid=E[S.u].sec||"tg",ord=NV.filter(function(x){return x[0]===fid}).concat(NV.filter(function(x){return x[0]!==fid}));
 ord.forEach(function(n,i){
  var sc=SECS.filter(function(x){return x.id===n[0]})[0],d=sc?sc.ls.filter(function(l){return S.done[l.id]}).length:0,L=sc?sc.ls.length:0,meta,pc=null;
  if(n[0]==="prog"){pc=t[1]?t[0]/t[1]*100:0;meta=Math.round(pc)+"% пройдено"}
  else if(sc){pc=L?d/L*100:0;meta=L?d+" из "+L+" материалов":"скоро"}
  else meta=({lib:LB[S.u].length+" сохранено",notes:NT[S.u].length+" записей",read:BK[S.u].length+" книг"})[n[0]];
  h+='<button class="nv rv '+(i===0?"big":i===ord.length-1?"wide":"")+'" data-a="nav" data-id="'+n[0]+'" '+dl(n[4])+'><span class="n">0'+(NV.indexOf(n)+1)+'</span><i class="gl"></i><i class="sh"></i><span class="gy">'+GY[n[0]]+'</span>'+(i===0?mask("troll","pk2"):"")+'<h3 class="disp">'+n[1]+'</h3><p>'+n[2]+'</p><span class="q">'+n[3]+'</span><div class="m">'+meta+'</div>'+(pc===null?"":'<div class="br"><i style="width:'+pc+'%"></i></div>')+(i===0?'<span class="cont">▸ '+(E[S.u].sec?"ПРОДОЛЖИТЬ":"НАЧАТЬ")+'</span>':'<span class="ar">→</span>')+'</button>';
 });
 h+='</div>';
 if(USERS[S.u].admin)h+='<button class="cta ghost rv" style="margin-top:18px;width:100%" data-a="addsec" '+dl()+'>+ Админка: материалы и цели</button>';
 return h;
}
function TRBTN(sc,cls){var p=ld().slice(0,7),ds={},m=0;TR[S.u].forEach(function(e){if(e.d.slice(0,7)===p&&(!sc||e.s===sc)){ds[e.d]=1;m+=e.m}});return '<button class="trk big '+(cls||"")+'"'+(cls?' style="--d:.8s"':'')+' data-a="trk" data-id="'+sc+'"><div><small>'+TL[sc].toUpperCase()+'</small><span>'+Object.keys(ds).length+' дн · '+fm(m)+' за месяц</span></div><b>＋</b></button>'}
function trkS(){
 var sc=S.tk||"",n=new Date(),mo=new Date(n.getFullYear(),n.getMonth()+(S.tm||0),1),y=mo.getFullYear(),mi=mo.getMonth(),pref=y+"-"+("0"+(mi+1)).slice(-2);
 var a=TR[S.u].filter(function(e){return(!sc||e.s===sc)&&e.d.slice(0,7)===pref}).sort(function(p,q){return p.d<q.d?1:p.d>q.d?-1:q.id-p.id});
 var ed=S.te?TR[S.u].filter(function(x){return x.id===S.te})[0]:null;
 var by={},bs={},tm=0;a.forEach(function(e){by[e.d]=(by[e.d]||0)+e.m;var k=sc?(e.b||"без привязки"):e.s;bs[k]=(bs[k]||0)+e.m;tm+=e.m});
 var mx=Math.max.apply(null,[1].concat(Object.keys(bs).map(function(k){return bs[k]})));
 var tt={"":"Трекер",read:"Трекер книг",eng:"Трекер англ.",tg:"Трекер таргета"}[sc];
 var h='<div class="top"><button class="back" data-a="'+(sc?"trkback":"home")+'">←</button><h2 class="disp" style="font-size:18px">'+tt+'</h2>'+mask("troll","th")+'</div>';
 h+='<div class="tmn"><button class="back" data-a="trkm" data-id="-1">‹</button><b>'+MN[mi]+' '+y+'</b><button class="back" data-a="trkm" data-id="1">›</button></div>';
 h+='<div class="chips"><div><small>ДНЕЙ</small><b>'+Object.keys(by).length+'</b></div><div><small>ВСЕГО</small><b>'+fm(tm)+'</b></div><div><small>СЕРИЯ</small><b>'+streak(sc)+' дн</b></div></div>'+(sc?"":GOALB());
 h+='<div class="cal">'+["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map(function(w){return '<i>'+w+'</i>'}).join("");
 for(var i=0;i<(new Date(y,mi,1).getDay()+6)%7;i++)h+='<span></span>';
 for(var d=1;d<=new Date(y,mi+1,0).getDate();d++){var ds=pref+"-"+("0"+d).slice(-2),m=by[ds]||0,l=!m?0:m<30?1:m<60?2:m<120?3:4;h+='<button class="cdy l'+l+(ds===ld()?" today":"")+'" data-a="trkd" data-id="'+ds+'">'+d+'</button>'}
 h+='</div><p class="hint">Цвет дня зависит от времени: 1–29, 30–59, 60–119, 120+ минут. Нажми на день, чтобы записать занятие в эту дату.</p>';
 var it=TKITEMS(sc),lab=sc==="read"?"Книга":"Материал";
 h+='<div class="box"><b>'+(ed?"Изменить запись":"Записать занятие")+'</b><input class="c" type="date" id="td" value="'+(ed?ed.d:(S.td||ld()))+'">';
 if(sc){h+='<select class="c" id="tb"><option value="">'+lab+': без привязки</option>'+(ed&&ed.b&&it.indexOf(ed.b)<0?it.concat([ed.b]):it).map(function(t){return '<option value="'+esc(t)+'"'+(ed&&ed.b===t?" selected":"")+'>'+esc(t)+'</option>'}).join("")+'</select>';if(sc==="read"&&!it.length)h+='<p class="hint" style="margin:0 0 8px">Добавь книгу в разделе «Чтение», и она появится в списке.</p>'}
 else h+='<select class="c" id="ts">'+Object.keys(TS).map(function(k){return '<option value="'+k+'"'+((ed?ed.s:S.ts)===k?" selected":"")+'>'+TS[k]+'</option>'}).join("")+'</select>';
 h+='<input class="c" type="number" inputmode="numeric" min="1" max="1440" id="tmin" value="'+(ed?ed.m:"")+'" placeholder="Сколько минут"><input class="c" id="tn" value="'+esc(ed?ed.n:"")+'" placeholder="Что делала (необязательно)"><button class="cta red" data-a="addtrk">'+(ed?"Сохранить":"Записать")+'</button>'+(ed?'<button class="cta ghost" data-a="trkcancel">Отмена</button>':"")+'</div>';
 if(a.length){h+='<div class="box"><b>'+(sc==="read"?"По книгам":sc?"По материалам":"По разделам")+'</b>'+Object.keys(bs).map(function(k){return '<div class="trr"><span>'+esc(sc?k:TS[k])+'</span><div class="bar"><i style="width:'+bs[k]/mx*100+'%"></i></div><b>'+fm(bs[k])+'</b></div>'}).join("")+'</div>';
  h+='<h3 style="margin:16px 0 8px">Записи</h3>'+a.map(function(e){return '<div class="les"><div class="lk"><b>'+e.d.slice(8)+'.'+e.d.slice(5,7)+' · '+(sc?"":TS[e.s]+" · ")+fm(e.m)+'</b><small>'+esc((e.b?e.b+(e.n?" · ":""):"")+(e.n||(e.b?"":"без заметки")))+'</small></div><button class="chk" data-a="edtrk" data-id="'+e.id+'">✎</button><button class="chk" data-a="deltrk" data-id="'+e.id+'">×</button></div>'}).join("")}
 else h+='<div class="empty">В этом месяце записей нет.</div>';
 return h+'<p class="hint">Записи хранятся только в этом браузере на этом устройстве.</p>';
}
function FSEL(){return '<select class="c" id="fsec">'+Object.keys(TS).map(function(k){return '<option value="'+k+'"'+((S.fsec||"other")===k?" selected":"")+'>'+TS[k]+'</option>'}).join("")+'</select>'}
function GOALB(){var g=GT[S.u],w=wmin();return '<div class="box"><b>Цель недели по времени: '+fm(Math.min(w,g))+' из '+fm(g)+'</b><div class="bar"><i style="width:'+Math.min(100,w/g*100)+'%"></i></div><div class="row"><button class="cta ghost" data-a="gtm" data-id="-30">− 30 мин</button><button class="cta ghost" data-a="gtm" data-id="30">+ 30 мин</button></div></div>'}
function BACKUP(){return '<div class="box"><b>Резервная копия</b><p class="hint" style="margin:0">Записи хранятся только на этом телефоне. Нажми «Сделать копию», сохрани текст в заметки или отправь себе в Telegram. Чтобы вернуть данные, вставь копию в поле и нажми «Восстановить».</p><textarea class="c" id="bk" rows="4" placeholder="Здесь появится копия или вставь свою"></textarea><div class="row"><button class="cta ghost" data-a="bkmk">Сделать копию</button><button class="cta" data-a="bkrs">Восстановить</button></div></div>'}
function hwTab(){
 var c=chal(),st=mystat(),ws=wks(),left=6-((new Date().getDay()+6)%7),pe=CHD[S.u].p||{},ad=USERS[S.u].admin;
 var h='<div class="top"><h2 class="disp">Челлендж</h2>'+mask("troll","th")+'</div>';
 h+='<div class="box"><small style="color:var(--mute);letter-spacing:.16em">НЕДЕЛЬНЫЙ ЧЕЛЛЕНДЖ · '+(left?"ОСТАЛОСЬ "+left+" ДН":"ПОСЛЕДНИЙ ДЕНЬ")+'</small><h3 class="disp" style="margin:6px 0">'+esc(c.t)+'</h3><p style="margin:0;color:var(--mute)">Цель: '+fm(c.g)+' занятий за неделю. Время берётся из трекера само.</p></div>';
 var L=Object.keys(USERS).map(function(k){var r=null;if(k===S.u)r={m:st.m,d:st.d,s:st.s};else if(pe[k]&&pe[k].w===ws)r={m:pe[k].m,d:pe[k].d,s:pe[k].s,u:pe[k].u};return{k:k,r:r}});
 var best=Math.max.apply(null,[0].concat(L.map(function(x){return x.r?x.r.m:0})));
 h+='<div class="box"><b>Таблица недели</b>'+L.map(function(x){var r=x.r;if(!r)return '<div class="trr"><span>'+USERS[x.k].n+'</span><div class="bar"><i style="width:0"></i></div><b>нет данных</b></div><small class="hint" style="display:block;margin:2px 0 0">Попроси у неё код результата</small>';
  return '<div class="trr"><span>'+(r.m>0&&r.m===best?"👑 ":"")+USERS[x.k].n+(r.m>=c.g?" ✓":"")+'</span><div class="bar"><i style="width:'+Math.min(100,r.m/c.g*100)+'%"></i></div><b>'+fm(r.m)+'</b></div><small class="hint" style="display:block;margin:2px 0 0">'+r.d+' дн занималась · серия '+r.s+' дн'+(r.u?' · обновлено '+r.u.slice(8)+'.'+r.u.slice(5,7):'')+'</small>'}).join("")+'</div>';
 h+='<div class="box"><b>Обмен результатами</b><p class="hint" style="margin:0">Данные хранятся на телефонах, поэтому результаты передаются текстом. Нажми «Мой результат», отправь текст подругам в Telegram, а их коды вставляй сюда.</p><textarea class="c" id="chc" rows="2" placeholder="Вставь код результата подруги или задания"></textarea><div class="row"><button class="cta ghost" data-a="chmk">Мой результат</button><button class="cta" data-a="chin">Вставить код</button></div></div>';
 if(ad)h+='<div class="box"><b>Задание недели (для Тани)</b>'+inp("cht","Название челленджа")+'<input class="c" id="chg" type="number" inputmode="numeric" min="30" max="5000" placeholder="Цель, минут за неделю" value="'+c.g+'"><div class="row"><button class="cta" data-a="chset">Сохранить</button><button class="cta ghost" data-a="chtk">Код задания</button></div></div>';
 return h;
}
function prog(){
 var t=tot(),g=GL[S.u],h=hd("Мой прогресс")+TRBTN("")+'<div class="box"><small style="color:var(--mute);letter-spacing:.16em">УРОВЕНЬ · AURA '+aura()+'</small><h3 class="disp" style="margin:6px 0 10px">'+lvl(t[0])+'</h3><div class="bar"><i style="width:'+(t[1]?t[0]/t[1]*100:0)+'%"></i></div><p style="margin:8px 0 0;color:var(--mute)">'+t[0]+' из '+t[1]+' материалов</p></div><div class="box"><b>Цель недели: '+Math.min(wk(),g)+' из '+g+'</b><div class="bar"><i style="width:'+Math.min(100,wk()/g*100)+'%"></i></div></div>'+GOALB()+rank()+certs()+'<div class="box"><b>Достижения</b>';
 ach().forEach(function(x){h+='<div class="ach'+(x[3]?" on":"")+'"><span>'+x[0]+'</span><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></div>'});
 return h+'</div>';
}
function soon(){
 var n=NV.filter(function(x){return x[0]===S.sec})[0];
 return '<div class="top"><button class="back" data-a="home">←</button><h2 class="disp">'+n[1]+'</h2></div><div class="box" style="text-align:center"><div style="width:84px;margin:0 auto 10px">'+mask("troll")+'</div><b>Этот раздел ещё в разработке</b><p style="color:var(--mute)">Сейчас здесь ничего не сохраняется. Когда добавим, будет видно.</p></div>';
}
function section(){
 var s=SECS.filter(function(x){return x.id===S.sec})[0];
 var h='<div class="top"><button class="back" data-a="home">←</button><h2 class="disp">'+s.t+'</h2>'+mask("troll","th")+'</div>';
 if(s.id==="tg"||s.id==="eng")h+=TRBTN(s.id);
 if(!s.ls.length)h+='<div class="empty">Материалы скоро появятся.</div>';
 var cur=0;
 s.ls.forEach(function(l){
  if(l.s!==cur){cur=l.s;h+='<h3 style="margin:16px 0 8px">'+STEPS[cur]+'</h3>'}
  h+='<div class="les'+(S.done[l.id]?" done":"")+'"><a class="lk" data-l="'+l.id+'" href="'+l.u+'" target="_blank" rel="noopener"><b>'+esc(l.t)+'</b><small>'+esc(l.k)+'. '+esc(l.d)+'</small></a><button class="chk" data-a="done" data-id="'+l.id+'">'+(S.done[l.id]?"✓":"○")+'</button>'+(USERS[S.u].admin?'<button class="chk" style="border-color:var(--r)" data-a="delmat" data-id="'+l.id+'">'+(S.dc===String(l.id)?"?":"×")+'</button>':"")+'</div>';
 });
 return h;
}
function lesson(){
 var f=findLes(S.les),l=f.l;
 var h='<div class="top"><button class="back" data-a="sec" data-id="'+f.s.id+'">←</button><h2 class="disp" style="font-size:18px">'+l.t+'</h2></div>';
 if(l.k==="video")h+='<div class="video">'+mask("anon")+'<button class="play" data-a="play">▶</button></div>';
 h+='<div class="box">'+esc(l.b||"")+'</div><div class="row"><button class="cta" data-a="done" data-id="'+l.id+'">'+(S.done[l.id]?"Пройдено":"Отметить пройденным")+'</button><button class="cta ghost" data-a="hwopen" data-id="'+l.id+'">Домашка</button></div>';
 return h;
}
function hwScreen(){
 var f=findLes(S.les),l=f.l,mine=S.hw.filter(function(x){return x.les===l.id&&x.u===S.u});
 var h='<div class="top"><button class="back" data-a="les" data-id="'+l.id+'">←</button><h2 class="disp" style="font-size:18px">Домашка</h2></div><div class="box"><b>'+esc(l.t)+'</b><p style="margin:6px 0 0">'+esc(l.hw)+'</p></div>';
 if(!USERS[S.u].admin)h+='<textarea id="ans" placeholder="Твой ответ. Скоро можно будет прикладывать фото и файлы."></textarea><button class="cta red" data-a="send" data-id="'+l.id+'">Отправить Тане</button>';
 else h+='<div class="empty">Ты проверяешь работы. Они собраны во вкладке «Домашка».</div>';
 mine.forEach(function(x){h+='<div class="box" style="margin-top:14px">'+tag(x.st)+'<p>'+esc(x.txt)+'</p>'+(x.c?'<small style="color:var(--mute)">Комментарий Тани: '+esc(x.c)+'</small>':"")+'</div>'});
 return h;
}
function hwTabOld(){
 var h='<div class="top"><h2 class="disp">Домашка</h2>'+mask("troll","th")+'</div>';
 if(USERS[S.u].admin){
  if(!S.hw.length)return h+'<div class="empty">Пока никто ничего не сдал.</div>';
  S.hw.forEach(function(x){var f=findLes(x.les);
   h+='<div class="box"><b>'+USERS[x.u].n+'</b>, '+esc(f.l.t)+'<div style="margin:6px 0">'+tag(x.st)+'</div><p style="margin:6px 0">'+esc(x.txt)+'</p>';
   h+='<input class="c" id="c'+x.id+'" placeholder="Комментарий" value="'+esc(x.c)+'"><div class="row"><button class="cta" data-a="rev" data-id="'+x.id+'" data-v="ok">Принять</button><button class="cta ghost" data-a="rev" data-id="'+x.id+'" data-v="no">Доработать</button></div></div>';});
  return h;
 }
 var mine=S.hw.filter(function(x){return x.u===S.u});
 if(!mine.length)return h+'<div class="empty">Ты ещё ничего не сдавала. Открой урок и нажми «Домашка».</div>';
 mine.forEach(function(x){var f=findLes(x.les);h+='<div class="box"><b>'+esc(f.l.t)+'</b><div style="margin:6px 0">'+tag(x.st)+'</div><p style="margin:6px 0">'+esc(x.txt)+'</p>'+(x.c?'<small style="color:var(--mute)">Комментарий Тани: '+esc(x.c)+'</small>':"")+'</div>'});
 return h;
}
function me(){
 var h='<div class="top"><h2 class="disp">Профиль</h2>'+mask("troll","th")+'</div><div class="box" style="text-align:center"><div style="width:90px;margin:0 auto 8px">'+mask(S.u==="tanya"?"troll":"anon")+'</div><b style="font-size:20px">'+USERS[S.u].n+'</b><br><small style="color:var(--mute)">'+(USERS[S.u].admin?"Админ: добавляет материалы":"Участница")+'</small></div><b>Посмотреть глазами:</b><div class="who">';
 Object.keys(USERS).forEach(function(k){h+='<button class="'+(S.u===k?"on":"")+'" data-a="who" data-id="'+k+'">'+USERS[k].n+'</button>'});
 return h+'</div><button class="cta ghost" data-a="snd" style="width:100%;margin-bottom:12px">Звук: '+(S.snd?"вкл":"выкл")+'</button><p style="color:var(--mute);font-size:14px">Переключатель нужен только для демо. В настоящем приложении Telegram сам знает, кто открыл.</p>';
}
function render(){save();
 var h=S.scr==="home"?home():S.scr==="sec"?(S.sec==="eng"?section().replace(/(<button class="trk[^>]*>[\s\S]*?<\/button>)/,function(m){return m+cards()}):section()):S.scr==="les"?lesson():S.scr==="hw"?hwScreen():S.scr==="hwtab"?hwTab():S.scr==="prog"?prog():S.scr==="trk"?trkS():S.scr==="foc"?foc():S.scr==="secret"?secret():S.scr==="soon"?soon():S.scr==="lib"?libS():S.scr==="notes"?notesS():S.scr==="read"?readS():S.scr==="adm"?adm():me()+BACKUP();
 var ap=$("#app");ap.innerHTML=h;ap.classList.remove("pg");void ap.offsetWidth;ap.classList.add("pg");
 var pend=USERS[S.u].admin?S.hw.filter(function(x){return x.st==="p"}).length:0;
 var tabs=[["learn","⌂","Главная"],["hwtab","★","Челлендж"],["me","🎭","Профиль"]];
 $("#nav").innerHTML=tabs.map(function(t){var on=(t[0]==="learn"&&["home","sec","les","hw","prog","trk","soon","lib","notes","read","adm","foc","secret"].indexOf(S.scr)>-1)||S.scr===t[0];return '<button class="'+(on?"on":"")+'" data-a="tab" data-id="'+t[0]+'"><span class="nb">'+t[1]+'</span>'+t[2]+'</button>'}).join("");
 window.scrollTo(0,0);
}
