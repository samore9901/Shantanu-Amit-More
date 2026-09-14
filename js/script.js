/* Navigation and enlarged figures; all page content also works without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('site-nav');
  const header = document.querySelector('.site-header');
  if (toggle && navigation) {
    toggle.hidden = false;
    const mobile = window.matchMedia('(max-width: 800px)');
    const setMenu = (open, returnFocus = false) => {
      navigation.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (returnFocus) toggle.focus();
    };
    setMenu(false);
    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false, true);
      }
    });
    document.addEventListener('click', event => {
      if (mobile.matches && header && !header.contains(event.target)) setMenu(false);
    });
    const resetMenu = () => setMenu(false);
    if (mobile.addEventListener) mobile.addEventListener('change', resetMenu);
    else if (mobile.addListener) mobile.addListener(resetMenu);
  }

  // Highlight only links to sections on this page. Existing page-level
  // aria-current values (for example a Projects link) stay intact.
  const localLinks = Array.from(document.querySelectorAll('.site-nav a, .project-toc a'))
    .filter(link => link.getAttribute('href')?.startsWith('#'));
  const sections = localLinks.map(link => {
    const id = decodeURIComponent(link.getAttribute('href').slice(1));
    return { link, element: document.getElementById(id) };
  }).filter(item => item.element);
  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sections.forEach(({ link, element }) => {
          const selected = element === entry.target;
          link.classList.toggle('is-active', selected);
        });
      });
    }, { rootMargin: '-18% 0px -65% 0px', threshold: 0 });
    sections.forEach(({ element }) => observer.observe(element));
  }

  // A normal image link is retained if native modal dialogs are unavailable.
  const figureLinks = Array.from(document.querySelectorAll('a[data-lightbox]'));
  if (!figureLinks.length || typeof HTMLDialogElement === 'undefined' ||
      typeof HTMLDialogElement.prototype.showModal !== 'function') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'figure-dialog';
  dialog.setAttribute('aria-label', 'Enlarged project figure');
  dialog.setAttribute('aria-describedby', 'figure-dialog-caption');

  const close = document.createElement('button');
  close.className = 'dialog-close';
  close.type = 'button';
  close.textContent = 'Close ×';
  close.setAttribute('aria-label', 'Close enlarged figure');
  close.autofocus = true;

  const enlargedImage = document.createElement('img');
  enlargedImage.className = 'dialog-image';
  const caption = document.createElement('p');
  caption.className = 'dialog-caption';
  caption.id = 'figure-dialog-caption';
  dialog.append(close, enlargedImage, caption);
  document.body.append(dialog);

  let lastTrigger = null;
  figureLinks.forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      // Keep browser shortcuts such as Ctrl/Cmd-click and middle-click working.
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const thumbnail = link.querySelector('img');
      if (!thumbnail) return;
      lastTrigger = link;
      enlargedImage.src = link.href;
      enlargedImage.alt = thumbnail.alt || 'Project result figure';
      const figureCaption = link.closest('figure')?.querySelector('figcaption');
      caption.textContent = figureCaption ? figureCaption.textContent.replace(/\s+/g, ' ').trim() : enlargedImage.alt;
      try {
        dialog.showModal();
        event.preventDefault();
        document.body.classList.add('dialog-open');
        close.focus();
      } catch (_) {
        // The original anchor still opens its full image if a dialog cannot open.
      }
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (event.target === dialog && outside) dialog.close();
  });
  // Native dialogs support Escape and trap keyboard focus. Explicitly restore
  // the opener after every close, including Escape and backdrop clicks.
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
    enlargedImage.removeAttribute('src');
  });
})();
