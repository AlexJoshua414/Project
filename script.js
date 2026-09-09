const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}});
function cursorLoop(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(cursorLoop)}cursorLoop();
document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{if(innerWidth<801)return;const r=el.getBoundingClientRect();const x=(e.clientX-(r.left+r.width/2))*.16,y=(e.clientY-(r.top+r.height/2))*.16;el.style.transform=`translate(${x}px,${y}px)`;ring?.classList.add('hover')});el.addEventListener('pointerleave',()=>{el.style.transform='';ring?.classList.remove('hover')})});
document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{if(innerWidth<801)return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${y*-2}deg) rotateY(${x*2}deg) translateY(-4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduced){document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
