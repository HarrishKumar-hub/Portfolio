/* ── LOADER ── */
const loader=document.getElementById('loader');
const ldfill=document.getElementById('ldfill');
const ldpct=document.getElementById('ldpct');
let p=0;
const li=setInterval(()=>{
  p+=Math.random()*20;
  if(p>=100){p=100;clearInterval(li);}
  ldfill.style.width=p+'%';
  ldpct.textContent=Math.floor(p)+'%';
  if(p===100) setTimeout(()=>{loader.classList.add('out');setTimeout(()=>{loader.style.display='none';},800);},200);
},100);

/* ── SCROLL PROGRESS ── */
const sprog=document.getElementById('sprog');
window.addEventListener('scroll',()=>{
  const pct=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
  sprog.style.width=pct+'%';
},{ passive:true });

/* ── CURSOR ── */
const cdot=document.getElementById('cdot'),cring=document.getElementById('cring'),clabel=document.getElementById('clabel');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function ac(){
  cdot.style.left=mx+'px';cdot.style.top=my+'px';
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
  cring.style.left=rx+'px';cring.style.top=ry+'px';
  clabel.style.left=(rx+28)+'px';clabel.style.top=(ry-20)+'px';
  requestAnimationFrame(ac);
})();
document.querySelectorAll('a,button,.ws,.svc-row,.soc-card,.stat-card').forEach(el=>{
  const lbl=el.getAttribute('data-cursor')||el.getAttribute('title')||'';
  el.addEventListener('mouseenter',()=>{document.body.classList.add('ch');if(lbl)clabel.textContent=lbl;});
  el.addEventListener('mouseleave',()=>{document.body.classList.remove('ch');clabel.textContent='';});
});
document.addEventListener('mousedown',()=>document.body.classList.add('ck'));
document.addEventListener('mouseup',()=>document.body.classList.remove('ck'));

/* ── NAV SCROLL ── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>80),{passive:true});

/* ── PARALLAX HERO ── */
const orb1=document.getElementById('orb1'),orb2=document.getElementById('orb2'),hinit=document.getElementById('hinit');
document.addEventListener('mousemove',e=>{
  const x=(e.clientX/window.innerWidth-.5)*40,y=(e.clientY/window.innerHeight-.5)*25;
  if(orb1) orb1.style.transform=`translate(${x*.5}px,${y*.5}px)`;
  if(orb2) orb2.style.transform=`translate(${x*.3}px,${y*.3}px)`;
  if(hinit) hinit.style.transform=`translateY(-50%) translate(${x*.18}px,${y*.1}px)`;
});

/* ── SCROLL REVEAL ── */
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');}});
},{threshold:0.07});
document.querySelectorAll('.rv,.rvl,.ws').forEach(el=>ro.observe(el));

/* ── SKILL BARS ── */
const bo=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.sk-fill').forEach((b,i)=>{
        setTimeout(()=>{b.style.width=b.dataset.w+'%';},i*80+200);
      });
      bo.unobserve(e.target);
    }
  });
},{threshold:0.2});
document.querySelectorAll('.sk-col').forEach(c=>bo.observe(c));

/* ── TILT CARDS ── */
document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*18;
    const y=((e.clientY-r.top)/r.height-.5)*18;
    card.style.transform=`perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(600px) rotateY(0) rotateX(0) translateZ(0)';
  });
});

/* ── SERVICE ROW HOVER PREVIEW ── */
const prev=document.getElementById('svc-preview'),prevTxt=document.getElementById('svc-prev-txt');
const svcMap={'Website Building':'Web Design · UI','App Development':'Mobile · Web Apps','3D Modelling':'3D · Renders · Vis','UI Design':'UI · UX · Figma','Logo Design':'Brand · Identity','Poster Design':'Graphics · Social'};
document.querySelectorAll('.svc-row').forEach(row=>{
  row.addEventListener('mouseenter',()=>{prevTxt.textContent=svcMap[row.dataset.svc]||row.dataset.svc;prev.classList.add('show');});
  row.addEventListener('mousemove',e=>{prev.style.left=e.clientX+'px';prev.style.top=e.clientY+'px';});
  row.addEventListener('mouseleave',()=>prev.classList.remove('show'));
});

/* ── TEXT SCRAMBLE on hero h1 hover ── */
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&';
function scramble(el){
  const orig=el.textContent;
  let frame=0;
  const total=18;
  const iv=setInterval(()=>{
    el.textContent=orig.split('').map((c,i)=>{
      if(c===' ')return ' ';
      if(frame/total>i/orig.length)return c;
      return chars[Math.floor(Math.random()*chars.length)];
    }).join('');
    if(++frame>=total){el.textContent=orig;clearInterval(iv);}
  },40);
}
document.querySelectorAll('.svc-name').forEach(el=>{
  el.addEventListener('mouseenter',()=>scramble(el));
});

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-p,.nav-cta,.fsub').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.25;
    const y=(e.clientY-r.top-r.height/2)*.25;
    btn.style.transform=`translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
});

/* ── SOC CARD TILT ── */
document.querySelectorAll('.soc-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*12;
    const y=((e.clientY-r.top)/r.height-.5)*12;
    card.style.transform=`perspective(500px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='translateY(0)';});
});

/* ── FORM SUBMIT ── */
document.getElementById('fsub').addEventListener('click',()=>{
  const n=document.getElementById('fn').value;
  const e=document.getElementById('fe').value;
  const s=document.getElementById('fs').value;
  const m=document.getElementById('fm').value;
  if(!n||!e)return;
  const sub=encodeURIComponent(`Portfolio Inquiry — ${s||'General'}`);
  const bod=encodeURIComponent(`Hi Harrish,\n\nName: ${n}\nEmail: ${e}\nService: ${s}\n\n${m}`);
  window.location.href=`mailto:harishchronicles@gmail.com?subject=${sub}&body=${bod}`;
});
