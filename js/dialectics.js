/**
 * LOGOS & EXISTENCE · DIALECTICS CONTROLLER
 * 哲学史殿堂 · 辩证推导链与哲思论难交互组件
 */

document.addEventListener('DOMContentLoaded', () => {
  initProofStepHighlight();
  initQuoteActionToast();
});

/* 辩证推导步骤点击高亮与沉思模式 */
function initProofStepHighlight() {
  const proofSteps = document.querySelectorAll('.proof-step');
  proofSteps.forEach((step) => {
    step.addEventListener('mouseenter', () => {
      proofSteps.forEach(s => s.style.opacity = '0.5');
      step.style.opacity = '1';
      step.style.borderColor = 'var(--border-gold-focus)';
      step.style.background = 'rgba(212, 175, 55, 0.05)';
    });

    step.addEventListener('mouseleave', () => {
      proofSteps.forEach(s => {
        s.style.opacity = '1';
        s.style.borderColor = 'rgba(255, 255, 255, 0.04)';
        s.style.background = 'rgba(0, 0, 0, 0.25)';
      });
    });
  });
}

/* 哲学引文一键引用与沉浸提示 */
function initQuoteActionToast() {
  const quoteCards = document.querySelectorAll('.thesis-main-quote');
  quoteCards.forEach((card) => {
    card.style.cursor = 'pointer';
    card.setAttribute('title', '点击复制此经典哲学原典论题');

    card.addEventListener('click', () => {
      const textToCopy = card.innerText;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showPhilosophyToast(`已镌刻至剪贴板：“${textToCopy.slice(0, 24)}...”`);
        });
      }
    });
  });
}

function showPhilosophyToast(message) {
  let toast = document.getElementById('philosophy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'philosophy-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: rgba(16, 21, 32, 0.95);
      border: 1px solid var(--gold-primary);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.3);
      color: #fae69e;
      padding: 0.85rem 1.5rem;
      border-radius: 8px;
      font-family: var(--font-serif);
      font-size: 0.9rem;
      letter-spacing: 0.05em;
      z-index: 10000;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateY(20px);
      opacity: 0;
      backdrop-filter: blur(10px);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
  }, 2800);
}
