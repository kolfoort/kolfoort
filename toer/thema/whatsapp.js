const chat = document.querySelector('.tt-chat');
if (chat) {
  const toggle = chat.querySelector('.tt-chat-toggle');
  const panel = chat.querySelector('.tt-chat-panel');
  const close = chat.querySelector('.tt-chat-close');

  function setOpen(open, returnFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    if (open) close.focus();
    else if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false, true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false, true);
  });
}
