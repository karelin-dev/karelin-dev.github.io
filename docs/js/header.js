// Шапка: тень при прокрутке и мобильное меню

const mobileNav = window.matchMedia('(max-width: 859.98px)');

export function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const updateShadow = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateShadow();
  window.addEventListener('scroll', updateShadow, { passive: true });

  initMenu(header);
}

function initMenu(header) {
  const toggle = header.querySelector('[data-menu-toggle]');
  const nav = header.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  const isOpen = () => header.classList.contains('is-menu-open');

  const setOpen = (open) => {
    header.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Переход по пункту меню закрывает его
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });

  // На десктопе меню всегда видно, состояние «открыто» сбрасываем
  mobileNav.addEventListener('change', (event) => {
    if (!event.matches) setOpen(false);
  });
}
