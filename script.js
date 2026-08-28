const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

const syncHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu?.classList.toggle('is-open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
  });
});

const schedule = {
  segunda: {
    label: 'Segunda-feira',
    items: [
      ['11:00', 'Jiu Jitsu Adulto'],
      ['17:30', 'FIT Kids'],
      ['18:00', 'Muay Thai Feminino'],
      ['18:30', 'CrossFit'],
      ['19:00', 'Muay Thai Masculino'],
      ['19:30', 'Ritmos'],
    ],
  },
  terca: {
    label: 'Terça-feira',
    items: [
      ['06:00', 'Funcional'],
      ['11:00', 'Jiu Jitsu Adulto'],
      ['17:00', 'Flashback'],
      ['18:00', 'CrossFit'],
      ['18:20', 'Jiu Jitsu Kids'],
      ['19:10', 'Jump'],
      ['19:30', 'Jiu Jitsu Adulto'],
    ],
  },
  quarta: {
    label: 'Quarta-feira',
    items: [
      ['11:00', 'Jiu Jitsu Adulto'],
      ['17:30', 'FIT Kids'],
      ['18:00', 'Muay Thai Feminino'],
      ['18:30', 'CrossFit'],
      ['19:00', 'Muay Thai Masculino'],
      ['19:30', 'Ritmos'],
    ],
  },
  quinta: {
    label: 'Quinta-feira',
    items: [
      ['06:00', 'Funcional'],
      ['11:00', 'Jiu Jitsu Adulto'],
      ['17:00', 'Flashback'],
      ['18:00', 'CrossFit'],
      ['18:20', 'Jiu Jitsu Kids'],
      ['19:10', 'Jump'],
      ['19:30', 'Jiu Jitsu Adulto'],
    ],
  },
  sexta: {
    label: 'Sexta-feira',
    items: [
      ['11:00', 'Jiu Jitsu Adulto'],
      ['18:00', 'Muay Thai Feminino'],
      ['19:00', 'Muay Thai Masculino'],
      ['19:30', 'Ritmos'],
    ],
  },
};

const scheduleTabs = document.querySelectorAll('[data-day]');
const scheduleDay = document.querySelector('[data-schedule-day]');
const scheduleCount = document.querySelector('[data-schedule-count]');
const scheduleItems = document.querySelector('[data-schedule-items]');

const renderSchedule = (day) => {
  const selected = schedule[day];
  if (!selected || !scheduleItems) return;

  scheduleTabs.forEach((tab) => {
    const active = tab.dataset.day === day;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    const tabSchedule = schedule[tab.dataset.day];
    const tabCount = tab.querySelector('span');
    if (tabSchedule && tabCount) tabCount.textContent = `${tabSchedule.items.length} turmas`;
  });

  if (scheduleDay) scheduleDay.textContent = selected.label;
  if (scheduleCount) scheduleCount.textContent = `${selected.items.length} turmas`;
  scheduleItems.innerHTML = selected.items.map(([time, name]) => `
    <a class="schedule-item" href="#contato">
      <strong>${time}</strong>
      <span>${name}</span>
      <i aria-hidden="true">&#8599;&#65038;</i>
    </a>
  `).join('');
};

scheduleTabs.forEach((tab) => {
  tab.addEventListener('click', () => renderSchedule(tab.dataset.day));
});

renderSchedule('segunda');

const revealItems = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const hashLinks = document.querySelectorAll('a[href^="#"]');
hashLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});
