let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  
  // HTML側で定義された PAGE_TRANSLATIONS を読み込む
  if (typeof PAGE_TRANSLATIONS !== 'undefined') {
    const t = PAGE_TRANSLATIONS[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t && t[key] !== undefined) {
        el.innerHTML = String(t[key]).replace(/\n/g, '<br>');
      }
    });
  }

  document.documentElement.lang = lang;
  document.body.style.fontFamily = lang === 'ja'
    ? "'DM Sans', 'Noto Sans JP', sans-serif"
    : "'DM Sans', sans-serif";
}

document.addEventListener('DOMContentLoaded', () => {
  // 言語切り替えボタンのイベント
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang-btn');
      document.querySelectorAll('[data-lang-btn]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyLang(lang);
    });
  });

  // 初期言語の設定
  applyLang('en');

  // スクロール時のフェードインアニメーション
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  // アニメーション対象のクラスを一括指定
  const animatedElements = document.querySelectorAll(`
    .fade-up, .project-card, .skill-group, .stat-card, .timeline-item, 
    .tech-card, .flow-step, .why-card, .biz-card, .constraint-card, .category-card
  `);
  
  animatedElements.forEach(el => observer.observe(el));
});