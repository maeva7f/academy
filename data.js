/* Данные и логика: состояние, справочники, сохранение, подсчёты. Не рисует экраны. */
var USERS={tanya:{n:"Таня",admin:true},eva:{n:"Ева"},angela:{n:"Анжела"}};
var STEPS={g:"С чего начать: каналы и подборки",vk:"VK Реклама",ya:"Яндекс Директ",1:"Telegram Ads: основы",2:"Telegram Ads: запуск",3:"Telegram Ads: углубление"};
var SECS=[
{id:"tg",t:"Таргетинг",m:"troll",ls:[
 {id:"c1",s:"g",t:"Козловский",k:"YouTube",d:"Короткие ролики про рекламу в соцсетях, подходят новичкам",u:"https://www.youtube.com/@vi_kozlovskiy"},
 {id:"c2",s:"g",t:"Кирилл Васильев",k:"YouTube",d:"Разборы инструментов и новых площадок",u:"https://www.youtube.com/@vasilievdigital"},
 {id:"c3",s:"g",t:"Владимир Полубояренко",k:"YouTube",d:"Ошибки новичков, таргет и контекст",u:"https://www.youtube.com/@poluboyarenko"},
 {id:"c4",s:"g",t:"Антон Петроченков о маркетинге",k:"YouTube",d:"Идеи для таргета, анализ конкурентов",u:"https://www.youtube.com/@petrochenkow"},
 {id:"c5",s:"g",t:"Что маркетологи смотрят на YouTube",k:"подборка",d:"Ещё 20 каналов (ppc.world)",u:"https://ppc.world/articles/chto-marketologi-smotryat-na-youtube-top-21-kanalov/"},
 {id:"c6",s:"g",t:"14 бесплатных ресурсов для новичка",k:"подборка",d:"Курсы, сайты и блоги",u:"https://www.sostav.ru/blogs/269868/43864"},
 {id:"v1",s:"vk",t:"Основы таргетированной рекламы",k:"курс",d:"Официальный курс VK Рекламы",u:"https://expert.vk.com/courses/osnovy-targetirovannoi-reklamy/"},
 {id:"v2",s:"vk",t:"Как продвигать сообщество",k:"курс",d:"Реклама группы, около 30 минут",u:"https://expert.vk.com/courses/kak-prodvigat-soobshchestvo/"},
 {id:"v3",s:"vk",t:"Как продвигать сайты",k:"курс",d:"Воронки, кампании, KPI",u:"https://expert.vk.com/courses/kak-prodvigat-saiti-v-vk-reklame/"},
 {id:"v4",s:"vk",t:"Настройка кампании и пикселя",k:"видео, 2023",d:"eLama, пошагово. Интерфейс мог измениться",u:"https://www.youtube.com/watch?v=9G9x8lgcC5c"},
 {id:"y1",s:"ya",t:"Яндекс про Директ: основы",k:"курс",d:"Официальный курс, около 4 часов",u:"https://yandex.ru/adv/edu/online/direct-bazovyy-kurs"},
 {id:"y2",s:"ya",t:"Бесплатный курс по Яндекс Директу",k:"курс",d:"13 модулей от ppc.world",u:"https://ppc.world/course/reklama-v-yandeks-direkte/"},
 {id:"y3",s:"ya",t:"Поисковая реклама в Директе",k:"видео, 2023",d:"eLama, вебинар",u:"https://www.youtube.com/watch?v=MNAcTtrLG1I"},
 {id:"y4",s:"ya",t:"РСЯ с нуля",k:"видео, 2023",d:"eLama, пошаговое руководство",u:"https://www.youtube.com/watch?v=Ngy5K8R-3aw"},
 {id:"y5",s:"ya",t:"Яндекс Реклама | Обучение",k:"YouTube",d:"Официальный канал Яндекса",u:"https://www.youtube.com/@YandexADV"},
 {id:"g1",s:1,t:"Почему Telegram Ads — не VK и не Директ",k:"статья",d:"Главные отличия платформы",u:"https://ppc.world/articles/pochemu-telegram-ads-eto-ne-vkontakte-i-ne-direkt-osobennosti-nastroyki/amp/"},
 {id:"g2",s:1,t:"Гайд для предпринимателей (Kokoc)",k:"статья",d:"Правила, форматы, оплата, запуск",u:"https://kokoc.com/blog/kak-zapuskat-reklamu-v-tg-ads-gayd-dlya-predprinimateley/"},
 {id:"g3",s:1,t:"Telegram Ads. Полное руководство",k:"курс",d:"Курс с нуля на Stepik",u:"https://stepik.org/course/220384"},
 {id:"g4",s:2,t:"Запуск рекламы с eLama: пошаговая инструкция",k:"статья",d:"Аккаунт, объявление, бюджет, пиксель",u:"https://ppc.world/articles/kak-zapustit-reklamu-v-telegram-ads-s-elama-poshagovaya-instrukciya-fishki-i-sovety-po-rabote-s-servisom/amp/"},
 {id:"g5",s:2,t:"Первое объявление через eLama",k:"видео, 2 мин",d:"Самый короткий старт",u:"https://ppc.world/course/kak-sozdat-pervoe-obyavlenie-v-telegram-ads-cherez-elama/"},
 {id:"g6",s:2,t:"Настройка объявления через eLama",k:"видео, 2 мин",d:"Медиа, посадочные, креативы",u:"https://ppc.world/course/kak-nastroit-obyavlenie-v-telegram-ads-cherez-elama/"},
 {id:"g7",s:2,t:"Уроки за 5 минут: Telegram Ads и VK",k:"видео",d:"Таргетинги по каналам и ключевым словам",u:"https://ppc.world/news/na-ppcworld-vyshli-pyat-novyh-urokov-za-5-minut-po-telegram-ads-i-vk-reklame/"},
 {id:"g8",s:3,t:"Все материалы ppc.world по Telegram Ads",k:"раздел",d:"Кейсы, креативы, видеобаннеры",u:"https://ppc.world/categories/telegram-ads/"},
 {id:"g9",s:3,t:"eLama",k:"YouTube",d:"Вебинары и цикл про Telegram Ads",u:"https://www.youtube.com/@ElamaRu"},
 {id:"g10",s:3,t:"Павликов про маркетинг",k:"YouTube",d:"Разборы каналов и практика",u:"https://www.youtube.com/@potok-ads"}]},
{id:"eng",t:"Английский",m:"anon",ls:[]}
];
var S={scr:"home",sec:null,les:null,tab:"learn",u:"tanya",done:{},hw:[]};
var $=function(s){return document.querySelector(s)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function toast(t){var e=$("#toast");e.textContent=t;e.className="on";clearTimeout(toast.h);toast.h=setTimeout(function(){e.className=""},2200)}
function findLes(id){for(var i=0;i<SECS.length;i++)for(var j=0;j<SECS[i].ls.length;j++)if(SECS[i].ls[j].id===id)return{s:SECS[i],l:SECS[i].ls[j]}}
var D={tanya:{},eva:{},angela:{}},LB={tanya:[],eva:[],angela:[]},NT={tanya:[],eva:[],angela:[]},BK={tanya:[],eva:[],angela:[]},GL={tanya:3,eva:3,angela:3},TR={tanya:[],eva:[],angela:[]},GT={tanya:120,eva:120,angela:120},CHD={tanya:{},eva:{},angela:{}},EX=[],DEL=[];STEPS.x="Добавлено Таней";
function save(){try{localStorage.setItem("akad1",JSON.stringify({D:D,LB:LB,NT:NT,BK:BK,GL:GL,TR:TR,GT:GT,CHD:CHD,EX:EX,DEL:DEL,hw:S.hw,E:E,sn:S.snd}))}catch(e){}}
function load(){try{var j=JSON.parse(localStorage.getItem("akad1")||"{}");D=j.D||D;LB=j.LB||LB;NT=j.NT||NT;BK=j.BK||BK;GL=j.GL||GL;TR=j.TR||TR;GT=j.GT||GT;CHD=j.CHD||CHD;EX=j.EX||EX;S.hw=j.hw||S.hw;E=j.E||E;DEL=j.DEL||DEL;S.snd=j.sn||0}catch(e){}Object.keys(USERS).forEach(function(k){E[k]=Object.assign({d:"",s:0,f:0,p:0,m:{},w:[]},E[k])});EX.forEach(function(x){SECS.filter(function(s){return s.id===x.sec})[0].ls.push(x)})}
function setU(u){S.u=u;S.done=D[u]}
function wk(){var c=0,w=Date.now()-6048e5;for(var k in S.done)if(S.done[k]>w)c++;return c}
function cms(){var n=0;BK[S.u].forEach(function(b){b.c.forEach(function(c){if(c.u===S.u)n++})});return n}
function aura(){return ao(S.u)}
function val(id){return $("#"+id).value.trim()}
function ach(){var d=tot()[0];return[["🏁","Первая кровь","+1000 AURA: первый урок",d>=1],["🔥","Разгон","5 уроков",d>=5],["🗿","МОГГИНГ","10 уроков, прокрастинация намоггана",d>=10],["🎯","Цель недели","выполнена",wk()>=GL[S.u]],["📝","Мыслитель","первая заметка",NT[S.u].length>0],["📌","Коллекционер","первая ссылка",LB[S.u].length>0],["📖","Книжный червь","первый комментарий",cms()>0]]}
var E={},AC,WORDS=[["traffic","трафик"],["conversion","конверсия"],["budget","бюджет"],["audience","аудитория"],["click","клик"],["reach","охват"],["brand","бренд"],["target","цель, таргет"]].map(function(w,i){return{id:i,a:w[0],b:w[1]}});
function day(){return new Date().toISOString().slice(0,10)}
function sd(){return new Date().setHours(0,0,0,0)}
function snd(t){if(!S.snd)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var n=AC.currentTime,b=t==="boom";(b?[[110,0]]:[[523,0],[659,.12],[784,.24]]).forEach(function(p){var o=AC.createOscillator(),g=AC.createGain();o.type=b?"sine":"triangle";o.frequency.setValueAtTime(p[0],n+p[1]);if(b)o.frequency.exponentialRampToValueAtTime(35,n+.6);g.gain.setValueAtTime(.5,n+p[1]);g.gain.exponentialRampToValueAtTime(.001,n+p[1]+(b?.7:.3));o.connect(g);g.connect(AC.destination);o.start(n+p[1]);o.stop(n+p[1]+.8)})}catch(e){}}
function ao(u){var e=E[u],n=0,c=0;for(var k in D[u])if(D[u][k])n++;Object.keys(BK).forEach(function(k){BK[k].forEach(function(b){b.c.forEach(function(x){if(x.u===u)c++})})});
 return Math.max(0,n*1000+NT[u].length*100+LB[u].length*100+c*200+e.f*500+Object.keys(e.m).length*300+e.w.length*50-e.p)}
function ov(h){var o=$("#ov");o.innerHTML=h;o.classList.add("on")}
function visit(){var e=E[S.u],t=day();if(e.d===t)return;var g=e.d?Math.round((Date.parse(t)-Date.parse(e.d))/864e5):0;
 if(!e.d||g===1){e.s=(e.s||0)+1;S.msg="Серия: "+e.s+" дн. 🔥"}else{if(g>=3){var p=Math.min(g*100,1000);e.p+=p;S.msg="Тебя не было "+g+" дн. AURA −"+p}else S.msg="Серия сброшена";e.s=1}
 e.d=t;save();setTimeout(cap,900)}
var MS=[["Пройди один урок",function(u){for(var k in D[u])if(D[u][k]>sd())return 1}],["Запиши одну идею",function(u){return NT[u].some(function(n){return n.id>sd()})}],["Сохрани ссылку в библиотеку",function(u){return LB[u].some(function(n){return n.id>sd()})}],["Оставь комментарий к книге",function(u){var r=0;Object.keys(BK).forEach(function(k){BK[k].forEach(function(b){b.c.forEach(function(c){if(c.u===u&&c.ts>sd())r=1})})});return r}],["Досиди фокус-таймер до конца",function(u){return E[u].fd===day()}],["Добавь слово в карточки",function(u){return E[u].w.some(function(n){return n.id>sd()})}]];
function fmt(ms){var t=Math.max(0,Math.ceil(ms/1000));return("0"+Math.floor(t/60)).slice(-2)+":"+("0"+t%60).slice(-2)}
var GY={tg:"◎",eng:"Aa",lib:"❏",notes:"✎",read:"▤",prog:"▲"};
function mv(e){var n=e.target.closest&&e.target.closest(".nv");if(!n)return;var r=n.getBoundingClientRect();n.style.setProperty("--mx",(e.clientX-r.left)/r.width*100+"%");n.style.setProperty("--my",(e.clientY-r.top)/r.height*100+"%")}
var NV=[
["tg","ТАРГЕТИНГ","Курсы, уроки и материалы по рекламе","ты точно знаешь, куда льёшь трафик?","#ff2a3d","big"],
["eng","АНГЛИЙСКИЙ","Уроки и полезные ресурсы","ай спик инглиш. почти.","#ff7a45",""],
["lib","МОЯ БИБЛИОТЕКА","Видео, ссылки, статьи","сохранено, чтобы никогда не открыть","#d6247a",""],
["notes","ЗАМЕТКИ","Записи, идеи, конспекты","ночью гениально, утром странно","#ff9a8a",""],
["read","ЧТЕНИЕ","Твоя подборка книг и комментарии","прочитал книгу? мог бы и дважды","#ff5c7a",""],
["prog","МОЙ ПРОГРЕСС","Уроки, цели, достижения","галочки не врут","#ffb347","wide"]];
var OPEN={tg:"заходи. трафик сам не польётся",eng:"welcome. проблемы?"};
var DONE=["+1000 AURA","+1000 AURA. Прокрастинация намоггана","MOGGING: ты vs прошлое «я», 1:0","+1000 AURA. Система одобряет"];
var TQ=["Problem?","не нажимай на меня","я просто смотрю","ты тут надолго?","осторожно, я записываю"];
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function tot(){var a=0,d=0;SECS.forEach(function(s){a+=s.ls.length;s.ls.forEach(function(l){if(S.done[l.id])d++})});return[d,a]}
function lvl(d){return d<1?"01 НОВИЧОК":d<4?"02 СТАЖЁР":d<8?"03 АГЕНТ":"04 МАСТЕР"}
var TS={tg:"Таргетинг",eng:"Английский",read:"Чтение",other:"Другое"},MN=["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];
function ld(d){d=d||new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
function fm(m){var h=Math.floor(m/60);return h?h+" ч"+(m%60?" "+m%60+" мин":""):m+" мин"}
function streak(sc){var ds={};TR[S.u].forEach(function(e){if(!sc||e.s===sc)ds[e.d]=1});var d=new Date(),n=0;if(!ds[ld(d)])d.setDate(d.getDate()-1);while(ds[ld(d)]){n++;d.setDate(d.getDate()-1)}return n}
var TL={"":"Трекер занятий",read:"Трекер чтения",eng:"Трекер английского",tg:"Трекер таргетинга"};
function trkRow(){return TRBTN("","rv")}
function TKITEMS(sc){if(sc==="read")return BK[S.u].map(function(b){return b.t});var s=SECS.filter(function(x){return x.id===sc})[0];return s?s.ls.map(function(l){return l.t}):[]}
function wmin(){var f=new Date();f.setDate(f.getDate()-6);var s=ld(f);return TR[S.u].reduce(function(a,e){return e.d>=s?a+e.m:a},0)}
function wks(d){d=d||new Date();var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return ld(x)}
function mystat(){var s=wks(),m=0,ds={};TR[S.u].forEach(function(e){if(e.d>=s){m+=e.m;ds[e.d]=1}});return{m:m,d:Object.keys(ds).length,s:streak("")}}
function chal(){var c=CHD[S.u];return{t:c.t||"Недельный марафон",g:c.g||150}}
function cpy(js){var ta=$("#chc");ta.value=js;ta.select();try{navigator.clipboard.writeText(js).then(function(){toast("Скопировано. Отправь в чат")},function(){toast("Код в поле. Скопируй вручную")})}catch(e){toast("Код в поле. Скопируй вручную")}}
var cine=$("#cine"),veil=$("#veil"),went=0;
function goPick(){if(went)return;went=1;veil.style.opacity=1;
 setTimeout(function(){$("#intro").style.visibility="hidden";$("#pick").classList.add("show");veil.style.transition="opacity 1.3s ease";veil.style.opacity=0},950)}
