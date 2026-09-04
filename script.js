const panels = [...document.querySelectorAll('.panel')];
const counter = document.querySelector('.counter b');
const progress = document.querySelector('.progress');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      counter.textContent = entry.target.dataset.number;
    }
  });
}, { threshold: 0.55 });

panels.forEach((panel) => observer.observe(panel));

let ticking = false;
addEventListener('scroll', () => {
  if (!ticking) requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
    ticking = false;
  });
  ticking = true;
}, { passive: true });

addEventListener('keydown', (event) => {
  if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
  event.preventDefault();
  const current = panels.findIndex((p) => p.getBoundingClientRect().top > -innerHeight / 2 && p.getBoundingClientRect().top < innerHeight / 2);
  const next = event.key === 'ArrowDown' ? Math.min(current + 1, panels.length - 1) : Math.max(current - 1, 0);
  panels[next].scrollIntoView({ behavior: 'smooth' });
});
