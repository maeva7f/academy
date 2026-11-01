/* Запуск: обработчики нажатий, таймеры, заставка, старт приложения. */

/* подставляем картинки в разметку */
Array.prototype.forEach.call(document.querySelectorAll("[data-img]"),function(i){i.src=IMG[i.dataset.img]});
document.addEventListener("pointermove",mv,{passive:true});document.addEventListener("pointerdown",mv);
document.addEventListener("click",function(e){
 var b=e.target.closest("[data-a]");if(!b)return;var a=b.dataset.a,id=b.dataset.id;if(a!=="delmat")S.dc=null;
 if(a==="nav"){if(NV.some(function(x){return x[0]===id}))E[S.u].sec=id;if(id==="prog")S.scr="prog";else if(id==="tg"||id==="eng"){S.sec=id;S.scr="sec";toast(OPEN[id])}else{S.q="";S.scr=id}}
 else if(a==="troll"){S.tc=(S.tc||0)+1;if(S.tc%7===0){toast("Ты нашёл секрет. Секрета нет. Problem?");b.classList.remove("spin");void b.offsetWidth;b.classList.add("spin")}else toast(pick(TQ));return}
 else if(a==="tab"){S.scr=id==="learn"?"home":id}
 else if(a==="home")S.scr="home";
 else if(a==="sec"){S.sec=id;S.scr="sec"}
 else if(a==="les"){S.les=id;S.scr="les"}
 else if(a==="hwopen"){S.les=id;S.scr="hw"}
 else if(a==="done"){S.done[id]=S.done[id]?0:Date.now();if(S.done[id]){S.last=id;snd("boom");toast(pick(DONE))}else toast("Отметка снята")}
 else if(a==="play"){toast("Здесь будет твоё видео")}
 else if(a==="addsec"){S.scr="adm"}
 else if(a==="addlib"){var t=val("lt"),u=val("lu");if(!t||!/^https?:\/\//.test(u)){toast("Нужны название и ссылка с https://");return}LB[S.u].unshift({id:Date.now(),t:t,u:u,g:val("lg")});toast("Сохранено. +100 AURA")}
 else if(a==="dellib"){LB[S.u]=LB[S.u].filter(function(x){return String(x.id)!==id})}
 else if(a==="addnote"){var t=val("nt"),x=$("#nx").value.trim();if(!t&&!x){toast("Напиши хоть что-нибудь");return}NT[S.u].unshift({id:Date.now(),t:t||"Без названия",x:x});toast("Записано. +100 AURA")}
 else if(a==="trk"){S.te=0;S.scr="trk";S.tk=id||"";S.ts=id||"";S.tm=0;S.td=""}
 else if(a==="trkback"){if(S.tk==="read")S.scr="read";else{S.sec=S.tk;S.scr="sec"}}
 else if(a==="trkm"){S.tm=(S.tm||0)+Number(id)}
 else if(a==="trkd"){S.td=id;var di=$("#td");if(di){di.value=id;toast("Дата: "+id.slice(8)+"."+id.slice(5,7))}return}
 else if(a==="addtrk"){var d=$("#td").value,m=parseInt($("#tmin").value,10);if(!d){toast("Выбери дату");return}if(!(m>0&&m<=1440)){toast("Впиши минуты от 1 до 1440");return}var tb=$("#tb"),sct=S.tk||$("#ts").value;if(S.te){var ex=TR[S.u].filter(function(x){return x.id===S.te})[0];if(ex){ex.d=d;ex.m=m;ex.s=sct;ex.b=tb?tb.value:"";ex.n=val("tn")}S.te=0}else TR[S.u].unshift({id:Date.now(),d:d,m:m,s:sct,b:tb?tb.value:"",n:val("tn")});var nw=new Date();S.tm=(parseInt(d.slice(0,4),10)-nw.getFullYear())*12+parseInt(d.slice(5,7),10)-1-nw.getMonth();S.td="";if(!S.tk)S.ts=sct;toast("Записано: "+fm(m))}
 else if(a==="edtrk"){S.te=Number(id);setTimeout(function(){var f=$("#td");if(f)f.scrollIntoView({block:"center",behavior:"smooth"})},80)}
 else if(a==="trkcancel"){S.te=0}
 else if(a==="gtm"){GT[S.u]=Math.max(30,Math.min(2400,GT[S.u]+Number(id)))}
 else if(a==="bkmk"){save();var js=localStorage.getItem("akad1")||"{}",ta=$("#bk");ta.value=js;ta.select();try{navigator.clipboard.writeText(js).then(function(){toast("Копия скопирована")},function(){toast("Копия в поле. Скопируй её вручную")})}catch(e){toast("Копия в поле. Скопируй её вручную")}return}
 else if(a==="bkrs"){var tx=$("#bk").value.trim();try{var o=JSON.parse(tx);if(!o||typeof o!=="object")throw 0;localStorage.setItem("akad1",tx);load();toast("Данные восстановлены")}catch(e){toast("Не получилось: это не похоже на копию");return}}
 else if(a==="chmk"){var st=mystat();cpy("АКАД|R|"+S.u+"|"+wks()+"|"+st.m+"|"+st.d+"|"+st.s);return}
 else if(a==="chtk"){var c=chal();cpy("АКАД|T|"+wks()+"|"+c.g+"|"+c.t);return}
 else if(a==="chset"){var tt=$("#cht").value.trim(),gg=parseInt($("#chg").value,10);if(!(gg>=30&&gg<=5000)){toast("Цель от 30 до 5000 минут");return}CHD[S.u].g=gg;if(tt)CHD[S.u].t=tt.slice(0,60);toast("Задание сохранено")}
 else if(a==="chin"){var pr=$("#chc").value.trim().split("|");if(pr[0]!=="АКАД"){toast("Это не код из приложения");return}
  if(pr[1]==="R"){var u=pr[2],m=parseInt(pr[4],10),dd=parseInt(pr[5],10),sk=parseInt(pr[6],10);if(!USERS[u]||u===S.u||!(m>=0&&m<=100000)||!(dd>=0&&dd<=7)||!(sk>=0&&sk<=3650)){toast("Код не подходит");return}if(pr[3]!==wks()){toast("Этот код за другую неделю");return}CHD[S.u].p=CHD[S.u].p||{};CHD[S.u].p[u]={w:pr[3],m:m,d:dd,s:sk,u:ld()};toast("Результат добавлен: "+USERS[u].n)}
  else if(pr[1]==="T"){var g2=parseInt(pr[3],10),t2=pr.slice(4).join("|").trim();if(!(g2>=30&&g2<=5000)||!t2){toast("Код задания повреждён");return}CHD[S.u].g=g2;CHD[S.u].t=t2.slice(0,60);toast("Задание обновлено")}
  else{toast("Код не распознан");return}}
 else if(a==="deltrk"){TR[S.u]=TR[S.u].filter(function(x){return String(x.id)!==id})}
 else if(a==="delnote"){NT[S.u]=NT[S.u].filter(function(x){return String(x.id)!==id})}
 else if(a==="addbook"){var w=$("#bw").value,t=val("bt");if(!t){toast("Напиши название книги");return}BK[w].push({id:Date.now(),t:t,a:val("ba"),n:val("bn"),c:[],by:S.u});toast(w===S.u?"Книга добавлена":"Книга добавлена: "+USERS[w].n)}
 else if(a==="delbook"){Object.keys(BK).forEach(function(k){if(USERS[S.u].admin||k===S.u)BK[k]=BK[k].filter(function(x){return String(x.id)!==id})})}
 else if(a==="cmt"){var t=val("cm"+id);if(!t){toast("Пустой комментарий");return}Object.keys(BK).forEach(function(k){BK[k].forEach(function(b){if(String(b.id)===id)b.c.push({u:S.u,txt:t,ts:Date.now()})})});toast("+200 AURA")}
 else if(a==="addmat"){var t=val("mt"),u=val("mu");if(!t||!/^https?:\/\//.test(u)){toast("Нужны название и ссылка с https://");return}var m={id:"x"+Date.now(),s:"x",t:t,k:val("mk")||"материал",d:val("md"),u:u,sec:$("#ms").value};EX.push(m);SECS.filter(function(z){return z.id===m.sec})[0].ls.push(m);toast("Материал добавлен")}
 else if(a==="flip"){S.fl=!S.fl;$("#fc").innerHTML=fc();return}
 else if(a==="nxt"){S.ci=(S.ci||0)+1;S.fl=0;$("#fc").innerHTML=fc();return}
 else if(a==="addword"){var wa=val("wa"),wb=val("wb");if(!wa||!wb){toast("Нужны слово и перевод");return}E[S.u].w.push({id:Date.now(),a:wa,b:wb});toast("Слово добавлено. +50 AURA")}
 else if(a==="fstart"){if(S.fe)S.fe=0;else{var fs=$("#fsec");S.fsec=fs?fs.value:"other";S.fe=Date.now()+15e5}}
 else if(a==="snd"){S.snd=S.snd?0:1;snd("ach")}
 else if(a==="ovx"){$("#ov").classList.remove("on");return}
 else if(a==="cap"){if(id==="1"){$("#ov").classList.remove("on");snd("ach");toast(S.msg||"Человек подтверждён. Проходи");S.msg=""}else{toast("Бот обнаружен. Ещё раз");cap()}return}
 else if(a==="egg"){S.ec=(S.ec||0)+1;if(S.ec%5)return;S.scr="secret"}
 else if(a==="cert"){var sc=SECS.filter(function(z){return z.id===id})[0],c=document.createElement("canvas");c.width=900;c.height=640;var x=c.getContext("2d"),g=x.createLinearGradient(0,0,900,640);g.addColorStop(0,"#2a0510");g.addColorStop(1,"#050003");x.fillStyle=g;x.fillRect(0,0,900,640);x.strokeStyle="#ff2e63";x.lineWidth=4;x.strokeRect(24,24,852,592);x.textAlign="center";x.fillStyle="#ff8896";x.font="600 22px sans-serif";x.fillText("СЕРТИФИКАТ ТАЙНОЙ АКАДЕМИИ",450,100);x.fillStyle="#fff";x.font="bold 54px sans-serif";x.fillText(USERS[S.u].n.toUpperCase(),450,220);x.font="28px sans-serif";x.fillText("прошла раздел «"+sc.t+"»",450,285);x.fillStyle="#ffd23f";x.fillText("AURA: "+aura()+" · "+new Date().toLocaleDateString("ru-RU"),450,340);x.fillStyle="#b4929a";x.font="italic 24px sans-serif";x.fillText("Подпись: Таня, архитектор системы",450,580);var im=new Image();im.onload=function(){x.drawImage(im,385,375,130,130*im.height/im.width);ov('<img src="'+c.toDataURL()+'" style="width:100%;max-width:520px;border-radius:12px"><p style="margin:0">Зажми картинку, чтобы сохранить</p><button class="cta red" data-a="ovx">Закрыть</button>')};im.src=TROLL;return}
 else if(a==="delmat"){if(S.dc!==id){S.dc=id;toast("Нажми ещё раз, чтобы удалить")}else{S.dc=null;DEL.push(id);EX=EX.filter(function(x){return String(x.id)!==id});SECS.forEach(function(z){z.ls=z.ls.filter(function(l){return String(l.id)!==id})});toast("Материал удалён")}}
 else if(a==="goal"){GL[id]=Math.max(1,Math.min(14,GL[id]+Number(b.dataset.v)))}
 else if(a==="who"){setU(id);S.scr="me"}
 else if(a==="send"){var t=$("#ans").value.trim();if(!t){toast("Напиши ответ перед отправкой");return}
  S.hw.push({id:Date.now(),les:id,u:S.u,txt:t,st:"p",c:""});toast("Отправлено Тане")}
 else if(a==="rev"){var x=S.hw.filter(function(h){return String(h.id)===id})[0];x.st=b.dataset.v;x.c=$("#c"+id).value;toast(b.dataset.v==="ok"?"Принято":"Отправлено на доработку")}
 render();
});
document.addEventListener("click",function(e){var k=e.target.closest(".lk");if(!k)return;if(k.dataset.l)S.last=k.dataset.l;e.preventDefault();var w=null;try{w=window.open(k.href,"_blank")}catch(x){}if(w){try{w.opener=null}catch(x){}}else{location.href=k.href}});
(function(){var im=document.getElementById('dz'),k=0;FR.forEach(function(u){new Image().src=u});im.src=FR[0];if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;window.__fi=setInterval(function(){k=(k+1)%FR.length;im.src=FR[k]},83)})();
/* splash */
$("#enter").onclick=goPick;$("#skip").onclick=goPick;
Array.prototype.forEach.call(document.querySelectorAll(".pk"),function(b){b.onclick=function(){setU(b.dataset.u);visit();S.scr="home";render();cine.classList.add("gone");clearInterval(window.__fi);setTimeout(function(){cine.style.display="none"},1100)}});
load();SECS.forEach(function(z){z.ls=z.ls.filter(function(l){return DEL.indexOf(String(l.id))<0})});window.addEventListener("load",function(){try{var tw=window.Telegram&&Telegram.WebApp;if(tw){tw.ready();tw.expand();if(tw.setHeaderColor)tw.setHeaderColor("#050204");if(tw.setBackgroundColor)tw.setBackgroundColor("#050204")}}catch(e){}});
setU("tanya");document.body.insertAdjacentHTML("beforeend",'<div id="ov"></div>');setInterval(function(){if(!S.fe)return;var l=S.fe-Date.now(),t=$("#tm");if(t)t.textContent=fmt(l);if(l<=0){S.fe=0;E[S.u].f++;E[S.u].fd=day();TR[S.u].unshift({id:Date.now(),d:ld(),m:25,s:S.fsec||"other",b:"",n:"Фокус-таймер"});save();snd("ach");toast("Фокус завершён: +500 AURA, 25 мин в трекере");if(S.scr==="foc")render()}},500);setInterval(function(){var e=$("#cd");if(e)e.innerHTML=cdh()},1000);render();
document.addEventListener("input",function(e){if(e.target.id==="sq"){S.q=e.target.value;$("#ll").innerHTML=llist()}});
