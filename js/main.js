/**
 * LOGOS & EXISTENCE · MAIN CONTROLLER (AEGEAN DAWN & CLARITY EDITION)
 * 哲学史殿堂 · 破晓晨光粒子系统、主题切换、阅读进度与全局交互
 * “神秘是入口，光明是过程，觉醒是抵达”
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  initCosmosCanvas();
  initScrollProgress();
  initHeaderScroll();
  initMobileMenu();
  initTriadInteractivity();
  initTimelineScroller();
  initPhilosophyModal();
});

/* --------------------------------------------------------------------------
   1. 主题管理器 (Theme Manager: Aegean Dawn vs Cosmic Night)
   -------------------------------------------------------------------------- */
function initThemeManager() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('philosophia_theme') || 'dawn';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<span class="theme-icon">🌌</span><span class="theme-label">沉夜星宿</span>';
        toggleBtn.setAttribute('title', '当前：沉夜星宿模式 · 点击切换为爱琴海破晓');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<span class="theme-icon">🌅</span><span class="theme-label">破晓之光</span>';
        toggleBtn.setAttribute('title', '当前：破晓之光模式 · 点击切换为沉夜星宿');
      }
    }
  }

  // 初始化主题
  applyTheme(storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'dawn';
      const nextTheme = currentTheme === 'dark' ? 'dawn' : 'dark';
      localStorage.setItem('philosophia_theme', nextTheme);
      applyTheme(nextTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. 动态破晓微光与思想几何粒子系统 (Interactive Dawn & Cosmos Canvas)
   -------------------------------------------------------------------------- */
function initCosmosCanvas() {
  const canvas = document.getElementById('cosmos-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, active: false };

  const particles = [];
  const particleCount = Math.floor((width * height) / 14000); // 典雅轻盈密度

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      velocity: {
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2 - 0.05 // 略微向上漂浮，象征晨风与觉醒升华
      },
      pulseSpeed: Math.random() * 0.02 + 0.006,
      hue: Math.random() > 0.6 ? 'gold' : (Math.random() > 0.5 ? 'azure' : 'rose')
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.velocity.x;
      p.y += p.velocity.y;

      // 边界循环
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // 呼吸脉动
      p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.006;
      const displayAlpha = Math.max(0.12, Math.min(0.85, p.alpha));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      if (isDark) {
        // 暗夜模式：冷金与星辉
        if (p.hue === 'gold') {
          ctx.fillStyle = `rgba(212, 175, 55, ${displayAlpha})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
          ctx.shadowBlur = 5;
        } else {
          ctx.fillStyle = `rgba(226, 232, 240, ${displayAlpha * 0.75})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
          ctx.shadowBlur = 3;
        }
      } else {
        // 破晓模式：暖金日光孢子、爱琴海天青与朝霞粉
        if (p.hue === 'gold') {
          ctx.fillStyle = `rgba(217, 119, 6, ${displayAlpha * 0.75})`;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.35)';
          ctx.shadowBlur = 4;
        } else if (p.hue === 'azure') {
          ctx.fillStyle = `rgba(2, 132, 199, ${displayAlpha * 0.65})`;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.25)';
          ctx.shadowBlur = 3;
        } else {
          ctx.fillStyle = `rgba(225, 29, 72, ${displayAlpha * 0.45})`;
          ctx.shadowColor = 'rgba(251, 113, 133, 0.2)';
          ctx.shadowBlur = 3;
        }
      }

      ctx.fill();
    }

    // 绘制微光几何连线（象征概念之网与思维逻辑网）
    const maxDist = 105;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / maxDist) * (isDark ? 0.08 : 0.06);
          ctx.strokeStyle = isDark
            ? `rgba(212, 175, 55, ${lineAlpha})`
            : `rgba(180, 83, 9, ${lineAlpha})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
}

/* --------------------------------------------------------------------------
   3. 页面顶部阅读进度条 (Reading Progress Bar)
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) return;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* --------------------------------------------------------------------------
   4. 导航栏滚动阴影与微光效果 (Header Scrolled State)
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   5. 移动端抽屉菜单 (Mobile Menu Drawer)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
}

/* --------------------------------------------------------------------------
   6. 哲学心境三阶交互 (神秘是入口，光明是过程，觉醒是抵达)
   -------------------------------------------------------------------------- */
function initTriadInteractivity() {
  const cards = document.querySelectorAll('.triad-card');
  if (!cards || cards.length === 0) return;

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      cards.forEach(c => c.style.opacity = '0.7');
      card.style.opacity = '1';
    });
    card.addEventListener('mouseleave', () => {
      cards.forEach(c => c.style.opacity = '1');
    });
  });
}

/* --------------------------------------------------------------------------
   7. 横向时间轴左右平滑滚动控制器 (Horizontal Timeline Scroller)
   -------------------------------------------------------------------------- */
function initTimelineScroller() {
  const track = document.getElementById('world-timeline-track');
  const prevBtn = document.getElementById('timeline-prev-btn');
  const nextBtn = document.getElementById('timeline-next-btn');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 360;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   8. 哲学史深度文献详览浮窗系统 (Philosophy Modal Controller)
   -------------------------------------------------------------------------- */
function initPhilosophyModal() {
  const modal = document.getElementById('philosophy-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const backdrop = modal.querySelector('.phil-modal-backdrop');

  const eraBadge = modal.querySelector('.modal-era-badge');
  const traditionsList = modal.querySelector('.modal-traditions-list');
  const modalTitle = modal.querySelector('.modal-title');
  const questionBox = modal.querySelector('.modal-question-box');
  const summaryText = modal.querySelector('.modal-summary-text');
  const sectionsBody = modal.querySelector('.modal-sections-body');

  function openModal(dataId) {
    if (!window.PHILOSOPHY_DATA || !window.PHILOSOPHY_DATA[dataId]) {
      console.warn('No philosophy data found for ID:', dataId);
      return;
    }

    const data = window.PHILOSOPHY_DATA[dataId];

    if (eraBadge) eraBadge.textContent = data.era || '历史长河';
    if (modalTitle) modalTitle.textContent = data.title || '';

    // 渲染文明标签
    if (traditionsList) {
      traditionsList.innerHTML = '';
      if (data.traditions && data.traditions.length) {
        data.traditions.forEach(t => {
          const pill = document.createElement('span');
          pill.className = 'tradition-pill';
          pill.textContent = t;
          traditionsList.appendChild(pill);
        });
      }
    }

    // 核心问题与概述
    if (questionBox) questionBox.innerHTML = `<span>❖ 核心叩问：</span>${data.question || ''}`;
    if (summaryText) summaryText.textContent = data.summary || '';

    // 章节详情与原典结构
    if (sectionsBody) {
      sectionsBody.innerHTML = '';
      if (data.sections && data.sections.length) {
        data.sections.forEach(sec => {
          const secDiv = document.createElement('div');
          secDiv.className = 'modal-section';
          secDiv.innerHTML = `<h4>✦ ${sec.heading}</h4>${sec.content}`;
          sectionsBody.appendChild(secDiv);
        });
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // 绑定所有具有 data-modal-id 的按钮或卡片
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-id]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-modal-id');
      openModal(id);
    }
  });

  // 键盘回车与空格展开考辨详情
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const trigger = e.target.closest('[data-modal-id]');
      if (trigger && !modal.classList.contains('active')) {
        e.preventDefault();
        const id = trigger.getAttribute('data-modal-id');
        openModal(id);
      }
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
