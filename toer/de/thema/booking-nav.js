document.querySelector('#menu-toggle').onclick=()=>{const open=document.querySelector('#nav').classList.toggle('open');document.querySelector('#menu-toggle').setAttribute('aria-expanded',open)};document.querySelector('#detail-close').onclick=()=>document.querySelector('#detail').close();

try{const plan=JSON.parse(localStorage.getItem('toer-plan')||'[]');document.querySelector('.plan-count').textContent=Array.isArray(plan)?plan.length:0}catch{}
