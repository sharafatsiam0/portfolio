// ===== Siam Portfolio — Interactive Engine =====

// ---------- Start at top on first visit (fix: never open in Live Lab) ----------
if('scrollRestoration' in history) history.scrollRestoration='manual';
if(!location.hash) window.scrollTo(0,0);
addEventListener('load',()=>{ if(!location.hash) window.scrollTo(0,0); });

// ---------- Cursor ----------
const dot=document.getElementById('cursorDot'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function animateRing(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animateRing);})();
document.querySelectorAll('a,button,.bug').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hovering'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hovering'));
});

// ---------- Background particles ----------
const cvs=document.getElementById('bgCanvas'),ctx=cvs.getContext('2d');
let W,H,parts=[];
function resize(){W=cvs.width=innerWidth;H=cvs.height=innerHeight;}
addEventListener('resize',resize);resize();
for(let i=0;i<70;i++)parts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+0.5});
(function drawBG(){
  ctx.clearRect(0,0,W,H);
  parts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(34,197,94,.35)';ctx.fill();
  });
  parts.forEach((a,i)=>parts.slice(i+1).forEach(b=>{
    const d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<120){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(79,70,229,${(1-d/120)*.12})`;ctx.stroke();}
  }));
  requestAnimationFrame(drawBG);
})();

// ---------- Nav ----------
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));
document.getElementById('burger').addEventListener('click',()=>document.getElementById('navLinks').classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open')));

// ---------- Theme ----------
const root=document.documentElement;
document.getElementById('themeToggle').addEventListener('click',e=>{
  const light=root.getAttribute('data-theme')==='light';
  root.setAttribute('data-theme',light?'dark':'light');
  e.target.textContent=light?'☀️':'🌙';
});

// ---------- Typing effect ----------
const phrases=['WordPress bug fixes 🐛','Custom WP plugins 🧩','Site maintenance 🛡️','WooCommerce rescues 🛒','Clean PHP code ✨'];
const typedEl=document.getElementById('typed');let pi=0,ci=0,del=false;
(function type(){
  const p=phrases[pi];
  typedEl.textContent=p.slice(0,ci);
  if(!del){ci++;if(ci>p.length){del=true;return setTimeout(type,1600);}}
  else{ci--;if(ci===0){del=false;pi=(pi+1)%phrases.length;}}
  setTimeout(type,del?38:75);
})();

// ---------- Counters ----------
const counterObs=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.target;let v=0;
  const iv=setInterval(()=>{v+=Math.ceil(target/40);if(v>=target){v=target;clearInterval(iv);}el.textContent=v;},30);
  counterObs.unobserve(el);
}),{threshold:.5});
document.querySelectorAll('.counter').forEach(el=>counterObs.observe(el));

// ---------- Reveal on scroll ----------
const revObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// ---------- Tilt ----------
document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(800px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});

// ---------- Copy code ----------
document.getElementById('copyBtn').addEventListener('click',e=>{
  navigator.clipboard.writeText(document.querySelector('.code-body').innerText);
  e.target.textContent='✅ Copied';setTimeout(()=>e.target.textContent='📋 Copy',1500);
});

// ---------- Marquee ----------
const items=['PHP 8.3','WordPress','WooCommerce','MySQL','REST API','WP-CLI','JavaScript','Security','Performance','Bug Fixing'];
const marq=document.getElementById('marquee');
marq.innerHTML=[...items,...items].map(i=>`<span>${i}</span><span style="color:var(--accent)">✦</span>`).join('');

// ---------- Skills ----------
const skills=[
  {name:'PHP / OOP',pct:96,cat:'php',note:'My first love since day one'},
  {name:'WordPress Core',pct:95,cat:'wp',note:'Hooks, filters, REST — I know them all'},
  {name:'Plugin Development',pct:94,cat:'wp',note:'Secure, scalable, WP-standard'},
  {name:'Bug Fixing & Debugging',pct:97,cat:'php',note:'WSOD? Bring it on'},
  {name:'MySQL / Optimization',pct:90,cat:'php',note:'Slow query hunter'},
  {name:'WooCommerce',pct:92,cat:'wp',note:'Checkout, hooks, extensions'},
  {name:'JavaScript / AJAX',pct:78,cat:'js',note:'Good, not my focus'},
  {name:'HTML / CSS',pct:75,cat:'js',note:'Enough to make it pretty'}
];
const grid=document.getElementById('skillsGrid');
grid.innerHTML=skills.map(s=>`<div class="skill-card" data-cat="${s.cat}"><div class="skill-top"><span class="skill-name">${s.name}</span><span class="skill-pct">${s.pct}%</span></div><div class="skill-bar"><div class="skill-fill" data-pct="${s.pct}"></div></div><p class="skill-note">${s.note}</p></div>`).join('');
const skillObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.style.width=e.target.dataset.pct+'%';}),{threshold:.4});
document.querySelectorAll('.skill-fill').forEach(el=>skillObs.observe(el));
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('.skill-card').forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.cat!==f));
}));

// ---------- Terminal ----------
const termBody=document.getElementById('termBody'),termInput=document.getElementById('termInput');
function printLine(html){const d=document.createElement('div');d.className='term-line';d.innerHTML=html;termBody.insertBefore(d,termBody.lastElementChild);termBody.scrollTop=termBody.scrollHeight;}
const termCmds={
  help:()=>[`<b>Available commands:</b>`,'<b>skills</b> — my tech stack','<b>fix</b> — what I can fix for you','<b>hire</b> — how to work with me','<b>php</b> — PHP version info','<b>clear</b> — clear terminal'],
  skills:()=>['<b>PHP:</b> 96% · <b>WP Core:</b> 95% · <b>Plugins:</b> 94%','<b>Debugging:</b> 97% · <b>MySQL:</b> 90% · <b>JS:</b> 78%','Backend first. Always.'],
  fix:()=>['I fix: WSOD, 500 errors, plugin conflicts,','slow sites, checkout bugs, malware, broken updates.','<b>Scroll to Services</b> or hit the contact form!'],
  hire:()=>['Great choice! Scroll to <b>#contact</b> —','fill the form, I reply within 24h. Done.'],
  php:()=>['<b>PHP 8.3.12</b> — Zend OPcache with JIT','WordPress 6.7 · WooCommerce 9.x · MySQL 8'],
  whoami:()=>['Siam — backend PHP dev who lives in WordPress.','I fix bugs at 2am so your site doesn\'t break at 9am.'],
  sudo:()=>['Nice try 😄 — I\'m the root here. Try "hire" instead.'],
  hello:()=>['Hello, human! Type "help" to see what I can do.'],
  cost:()=>['Bug fix from $49 · Plugin from $399 · Maintenance $79/mo','Support $29/hr — honest pricing, no surprises.']
};
function runCmd(raw){
  const cmd=raw.trim().toLowerCase();
  printLine(`<span class="prompt">php&gt;</span> ${raw}`);
  if(!cmd)return;
  if(cmd==='clear'){termBody.innerHTML='<div class="term-line input-line"><span class="prompt">php&gt;</span><input id="termInput" type="text" placeholder="try: help, skills, fix, hire..." autocomplete="off" spellcheck="false"></div>';bindInput(true);return;}
  (termCmds[cmd]?termCmds[cmd]():[`command not found: ${cmd} — type "help"`]).forEach(l=>printLine(l));
}
function bindInput(autoFocus=false){const i=document.getElementById('termInput');if(autoFocus)i.focus({preventScroll:true});i.addEventListener('keydown',e=>{if(e.key==='Enter'){runCmd(i.value);i.value='';}});}
bindInput();
document.querySelectorAll('.term-hints button[data-cmd]').forEach(b=>b.addEventListener('click',()=>runCmd(b.dataset.cmd)));
document.getElementById('termClear').addEventListener('click',()=>runCmd('clear'));
termBody.addEventListener('click',()=>document.getElementById('termInput')?.focus({preventScroll:true}));

// ---------- Bug Hunt Game ----------
const gameArea=document.getElementById('gameArea'),startScreen=document.getElementById('gameStart');
const scoreEl=document.getElementById('bugScore'),timerEl=document.getElementById('bugTimer'),resultEl=document.getElementById('gameResult'),resetBtn=document.getElementById('resetGameBtn');
let score=0,timeLeft=30,gameTimer,spawnTimer,playing=false;
function spawnBug(){
  const bug=document.createElement('div');bug.className='bug';bug.textContent='🐛';
  bug.style.left=Math.random()*85+'%';bug.style.top=Math.random()*80+'%';
  bug.addEventListener('click',()=>{
    bug.textContent='✅';score++;scoreEl.textContent=score;
    setTimeout(()=>bug.remove(),250);
    if(score===15)printLine('<b>15 bugs squashed!</b> That\'s basically me on a slow Tuesday. 🐛');
  });
  gameArea.appendChild(bug);
  setTimeout(()=>bug.remove(),2200);
}
function endGame(){
  playing=false;clearInterval(gameTimer);clearInterval(spawnTimer);
  document.querySelectorAll('.bug').forEach(b=>b.remove());
  const msg=score>=20?'🏆 Elite debugger! Hire me before someone else does.':score>=10?'🔥 Solid work — that\'s a real day of bug-fixing.':'🐛 Tough round! Real bugs hide better. Try again?';
  resultEl.innerHTML=`<b>${score} bugs fixed!</b> ${msg}`;
  resetBtn.style.display='block';
}
function startGame(){
  score=0;timeLeft=30;scoreEl.textContent=0;timerEl.textContent=30;
  resultEl.textContent='';resetBtn.style.display='none';startScreen.style.display='none';playing=true;
  spawnBug();spawnTimer=setInterval(spawnBug,700);
  gameTimer=setInterval(()=>{timeLeft--;timerEl.textContent=timeLeft;if(timeLeft<=0)endGame();},1000);
}
document.getElementById('startGameBtn').addEventListener('click',startGame);
resetBtn.addEventListener('click',()=>{startScreen.style.display='flex';startGame();});

// ---------- Testimonials ----------
const testis=[
  {stars:'★★★★★',quote:'"Siam saved our store at 2am when checkout died. Fixed, explained, and it never broke again. Worth every cent."',author:'— Sarah K., WooCommerce Store Owner'},
  {stars:'★★★★★',quote:'"The only dev I trust with our agency\'s 40 client sites. Quiet, fast, and brutally good at debugging."',author:'— Mark T., Agency Founder'},
  {stars:'★★★★★',quote:'"Our plugin went from messy prototype to a product clients love. Clean PHP, proper hooks — rare these days."',author:'— Lena R., SaaS Founder'}
];
let ti=0;const tCard=document.getElementById('testiCard'),tDots=document.getElementById('testiDots');
function showTesti(i){ti=(i+testis.length)%testis.length;const t=testis[ti];
  tCard.innerHTML=`<div class="testi-stars">${t.stars}</div><p class="testi-quote">${t.quote}</p><p class="testi-author">${t.author}</p>`;
  tDots.innerHTML=testis.map((_,j)=>`<span class="${j===ti?'active':''}" data-i="${j}"></span>`).join('');
  tDots.querySelectorAll('span').forEach(s=>s.addEventListener('click',()=>showTesti(+s.dataset.i)));}
document.getElementById('prevTesti').addEventListener('click',()=>showTesti(ti-1));
document.getElementById('nextTesti').addEventListener('click',()=>showTesti(ti+1));
showTesti(0);setInterval(()=>showTesti(ti+1),6000);

// ---------- Copy email ----------
document.getElementById('copyEmailBtn').addEventListener('click',()=>{
  navigator.clipboard.writeText('siamweb@yahoo.com');
  document.getElementById('emailCopied').textContent='✅ Copied! See you in the inbox.';
  setTimeout(()=>document.getElementById('emailCopied').textContent='',2500);
});

document.getElementById('year').textContent=new Date().getFullYear();

// ---------- Developer Life Gallery (GIFs) ----------
const lifeItems = [
  {
    img: "https://i.postimg.cc/jSy0yRNd/When-Code-Works-First-Try.gif",
    title: "When the code works first try",
    cap: "It happens once a year. I document it.",
  },
  {
    img: "https://i.postimg.cc/rspM97T3/Works-on-My-Machine-Deployment-Journey.gif",
    title: 'Debugging: "Works on my machine"',
    cap: "Localhost is a parallel universe. Production is the real one.",
  },
  {
    img: "https://i.postimg.cc/7PN5ny3g/Friday-Deploy-Never-Again.gif",
    title: "Friday deploy at 5pm",
    cap: "Never. EVER. I learned this the hard way.",
  },
  {
    img: "https://i.postimg.cc/X7TQKFck/Coffee-Code-Coffee-The-Bug-Fix-Loop.gif",
    title: "Coffee → Code → Coffee",
    cap: "The real tech stack behind every bug fix.",
  },
  {
    img: "https://i.postimg.cc/4dsxQD7w/Simple-Change-Three-Day-Ordeal.gif",
    title: 'When the client says "simple change"',
    cap: '"Simple" is dev-speak for 3 days of work.',
  },
  {
    img: "https://i.postimg.cc/x1vyKZ1F/Word-Press-White-Screen-Showdown.gif",
    title: "Me vs. WordPress white screen",
    cap: "WSOD? I've seen darker corners of the internet.",
  },
];
const lifeGrid=document.getElementById('lifeGrid');
if(lifeGrid){
  lifeGrid.innerHTML=lifeItems.map(it=>`
    <div class="life-card reveal" data-tilt>
      <div class="life-img"><img src="${it.img}" alt="${it.title}" loading="lazy" onerror="this.parentElement.classList.add('img-fallback')"></div>
      <div class="life-body"><h3>${it.title}</h3><p>${it.cap}</p></div>
    </div>`).join('');
  const lifeObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.12});
  document.querySelectorAll('#lifeGrid .reveal').forEach(el=>lifeObs.observe(el));
  document.querySelectorAll('#lifeGrid [data-tilt]').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(800px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
}
