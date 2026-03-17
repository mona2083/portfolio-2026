// localStorageから保存された言語を読み込む（なければ英語）
let currentLang = localStorage.getItem('preferredLang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('preferredLang', lang); // 選択した言語を保存
  
  // 各HTMLファイルに残された変数から翻訳データを読み込む
  const translationsData = window.TRANSLATIONS || window.T || window.PAGE_TRANSLATIONS;
  
  if (translationsData) {
    const t = translationsData[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t && t[key] !== undefined) {
        el.innerHTML = t[key].replace(/\n/g, '<br>');
      }
    });
  }

  document.documentElement.lang = lang;
  
  // 言語によって最適なフォントに切り替え
  document.body.style.fontFamily = lang === 'ja'
    ? "'DM Sans', 'Noto Sans JP', sans-serif"
    : "'DM Sans', sans-serif";

  // ボタンのActive状態を同期（全ページで正しい言語ボタンがハイライトされる）
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    if (btn.getAttribute('data-lang-btn') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// 言語トグルボタンの挙動
document.querySelectorAll('[data-lang-btn]').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang-btn');
    applyLang(lang);
  });
});

// スクロール時のふわっと表示アニメーション
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

// トップへ戻るボタンの生成と制御
function initBackToTop() {
  const bttBtn = document.createElement('button');
  bttBtn.className = 'back-to-top';
  bttBtn.innerHTML = '↑';
  bttBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(bttBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      bttBtn.classList.add('show');
    } else {
      bttBtn.classList.remove('show');
    }
  });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // 初期化時に保存されていた言語を適用
  applyLang(currentLang);
  initBackToTop();
  
  // アニメーション対象の要素を監視
  const animatedElements = document.querySelectorAll('.project-card, .skill-group, .stat-card, .timeline-item, .tech-card, .flow-step, .why-card, .biz-card, .card-base, .fade-up');
  animatedElements.forEach(el => {
    if(!el.classList.contains('fade-up')) { 
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    observer.observe(el);
  });
});