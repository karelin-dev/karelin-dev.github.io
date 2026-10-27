// Подсвечивает в меню раздел, который сейчас на экране

export function initNavSpy() {
  const links = [...document.querySelectorAll('.nav__link[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

  const setCurrent = (id) => {
    links.forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  // Раздел считается текущим, когда пересекает середину экрана
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  sections.forEach((section) => observer.observe(section));
}
