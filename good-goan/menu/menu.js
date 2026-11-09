const front=document.querySelector('#front'),back=document.querySelector('#back'),cards=document.querySelector('#cards');
document.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>{const view=button.dataset.view;front.hidden=view==='back';back.hidden=view==='front';cards.classList.toggle('both',view==='both');document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))});
document.querySelector('#print-menu').onclick=()=>window.print();
