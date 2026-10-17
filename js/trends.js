/**
 * LOGOS & EXISTENCE · TRENDS CONTROLLER
 * 当代与未来哲学趋势判断 · 互动洞察探针
 */

document.addEventListener('DOMContentLoaded', () => {
  initTrendCardEffects();
});

function initTrendCardEffects() {
  const trendCards = document.querySelectorAll('.trend-card');
  trendCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.trend-icon-box');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        icon.style.borderColor = 'var(--gold-primary)';
      }
    });

    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.trend-icon-box');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.borderColor = 'var(--border-gold-subtle)';
      }
    });
  });
}
