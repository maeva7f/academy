/* Синхронизация через Supabase (таблица kv). Адрес и публичный ключ ниже можно безопасно хранить в коде.
   Как это работает: данные каждой из трёх подруг лежат в базе отдельной записью («state»),
   общие материалы и задание челленджа лежат в записи «shared». Телефон сначала забирает данные,
   потом отправляет свои изменения. Если связи нет, всё сохраняется на телефоне и уйдёт позже. */
var SB={url:"https://hqqkfiqpwtsglwpepswv.supabase.co",key:"sb_publishable_nzjzno3t_utRvBfU-Gb6MA_1uA6Rbs-"};
var SH={},SY={on:!!(SB.url&&SB.key),ok:null,err:"",last:0,hash:{},ts:{},got:{},upd:{},pulled:0,busy:0,pushing:0,tm:0,stale:0};
function syH(){return{apikey:SB.key,"Content-Type":"application/json"}}
function syGet(u){return{D:D[u],LB:LB[u],NT:NT[u],BK:BK[u],GL:GL[u],TR:TR[u],GT:GT[u],E:E[u]}}
function syPut(u,s){if(s.D)D[u]=s.D;if(s.LB)LB[u]=s.LB;if(s.NT)NT[u]=s.NT;if(s.BK)BK[u]=s.BK;if(s.GL!=null)GL[u]=s.GL;if(s.TR)TR[u]=s.TR;if(s.GT!=null)GT[u]=s.GT;if(s.E)E[u]=Object.assign({d:"",s:0,f:0,p:0,m:{},w:[]},s.E);if(u===S.u)S.done=D[u]}
function syShared(){return{EX:EX,DEL:DEL,ch:SH.ch||null}}
function syEmpty(u){var e=E[u]||{};return!(TR[u].length||NT[u].length||LB[u].length||BK[u].length||Object.keys(D[u]).length||e.f||(e.w||[]).length||Object.keys(e.m||{}).length)}
function syApplyEX(ex){EX.forEach(function(x){var s=SECS.filter(function(z){return z.id===x.sec})[0];if(s)s.ls=s.ls.filter(function(l){return l.id!==x.id})});EX=ex||[];EX.forEach(function(x){var s=SECS.filter(function(z){return z.id===x.sec})[0];if(s)s.ls.push(x)})}
function syLoadH(){try{var j=JSON.parse(localStorage.getItem("akad_sy")||"{}");SH=j.SH||SH;return j.hash||{}}catch(e){return{}}}
function syStore(){try{localStorage.setItem("akad_sy",JSON.stringify({hash:SY.hash,SH:SH}))}catch(e){}}
function syTyping(){var a=document.activeElement;return!!(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))}
function mst(u){var s=wks(),m=0,ds={},all={};(TR[u]||[]).forEach(function(e){all[e.d]=1;if(e.d>=s){m+=e.m;ds[e.d]=1}});var d=new Date(),n=0;if(!all[ld(d)])d.setDate(d.getDate()-1);while(all[ld(d)]){n++;d.setDate(d.getDate()-1)}return{m:m,d:Object.keys(ds).length,s:n,u:SY.upd[u]?SY.upd[u].slice(0,10):undefined}}
function syIcon(){return SY.ok===true?" · ☁":SY.ok===false?" · ⚠":""}
function syUI(){var st=document.querySelector(".stat");if(st&&S.scr==="home")st.innerHTML=st.innerHTML.replace(/ · [☁⚠]/,"")+syIcon();var b=$("#syst");if(b)b.textContent=sySt()}
function sySt(){if(!SY.on)return"Синхронизация выключена";if(SY.ok===true){var d=new Date(SY.last);return"Онлайн. Синхронизировано в "+("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)}if(SY.ok===false)return"Нет связи с базой ("+SY.err+"). Данные сохранены на телефоне и отправятся позже";return"Подключаюсь к базе…"}
function SYNCB(){return'<div class="box"><b>Синхронизация</b><p class="hint" id="syst" style="margin:0">'+esc(sySt())+'</p><p class="hint" style="margin:0">Книги, трекер, AURA и челлендж у всех троих общие. Данные обновляются сами раз в полминуты.</p><button class="cta" data-a="sync">Синхронизировать сейчас</button></div>'}
function syPull(){
 if(!SY.on||SY.busy)return;SY.busy=1;
 fetch(SB.url+"/rest/v1/kv?select=profile,key,value,updated_at",{headers:syH()}).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json()}).then(function(rows){
  var saved=syLoadH(),changed=0,have={};
  rows.forEach(function(r){var v=r.value||{};have[r.profile+"/"+r.key]=1;
   if(r.key==="state"&&USERS[r.profile]){var u=r.profile,j=JSON.stringify(syGet(u));SY.got[u]=1;SY.upd[u]=r.updated_at;
    var dirty=saved[u]!==undefined?saved[u]!==j:!syEmpty(u);
    if(dirty){SY.hash[u]=saved[u];}
    else if(SY.ts[u]!==v.ts||saved[u]===undefined){syPut(u,v.data||{});SY.hash[u]=JSON.stringify(syGet(u));SY.ts[u]=v.ts;changed=1}
    else SY.hash[u]=j}
   if(r.key==="shared"&&r.profile==="tanya"){var sj=JSON.stringify(syShared()),sd=saved.shared!==undefined&&saved.shared!==sj&&USERS[S.u].admin;
    if(!sd&&SY.ts.shared!==v.ts){var dd=v.data||{};syApplyEX(dd.EX||[]);DEL=dd.DEL||[];if(dd.ch)SH.ch=dd.ch;SY.hash.shared=JSON.stringify(syShared());SY.ts.shared=v.ts;changed=1}else if(sd)SY.hash.shared=saved.shared}});
  Object.keys(USERS).forEach(function(u){if(!have[u+"/state"]){SY.hash[u]=saved[u]!==undefined?saved[u]:(syEmpty(u)?JSON.stringify(syGet(u)):undefined)}});
  if(!have["tanya/shared"]&&SY.hash.shared===undefined)SY.hash.shared=(EX.length||DEL.length||SH.ch)?undefined:JSON.stringify(syShared());
  SY.ok=true;SY.err="";SY.last=Date.now();SY.pulled=1;syStore();
  if(changed){save();if(syTyping())SY.stale=1;else render()}
  syPush();
 }).catch(function(e){SY.ok=false;SY.err=String(e&&e.message||e).slice(0,40)}).then(function(){SY.busy=0;syUI()})}
function syPush(){
 if(!SY.on||!SY.pulled||SY.pushing)return;var rows=[],now=Date.now(),pend={};
 Object.keys(USERS).forEach(function(u){var j=JSON.stringify(syGet(u));if(SY.hash[u]!==j){rows.push({profile:u,key:"state",value:{ts:now,data:syGet(u)},updated_at:new Date().toISOString()});pend[u]=j}});
 if(USERS[S.u].admin){var sj=JSON.stringify(syShared());if(SY.hash.shared!==sj){rows.push({profile:"tanya",key:"shared",value:{ts:now,data:syShared()},updated_at:new Date().toISOString()});pend.shared=sj}}
 if(!rows.length)return;SY.pushing=1;
 var h=syH();h.Prefer="resolution=merge-duplicates,return=minimal";
 fetch(SB.url+"/rest/v1/kv?on_conflict=profile,key",{method:"POST",headers:h,body:JSON.stringify(rows)}).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);
  Object.keys(pend).forEach(function(k){SY.hash[k]=pend[k];SY.ts[k]=now});SY.ok=true;SY.err="";SY.last=Date.now();syStore()}).catch(function(e){SY.ok=false;SY.err=String(e&&e.message||e).slice(0,40)}).then(function(){SY.pushing=0;syUI()})}
function syKick(){if(!SY.on||!SY.pulled)return;clearTimeout(SY.tm);SY.tm=setTimeout(syPush,1500)}
function syInit(){if(!SY.on)return;syLoadH();syPull();setInterval(function(){if(!document.hidden)syPull()},30000);document.addEventListener("visibilitychange",function(){if(!document.hidden)syPull()});document.addEventListener("focusout",function(){setTimeout(function(){if(SY.stale&&!syTyping()){SY.stale=0;render()}},200)})}
