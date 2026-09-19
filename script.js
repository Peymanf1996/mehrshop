document.addEventListener('DOMContentLoaded', () => {

  /* ===== المنت‌ها ===== */
  const header     = document.getElementById('header');
  const hamburger  = document.getElementById('hamburger');
  const nav        = document.getElementById('nav');
  const overlay    = document.getElementById('overlay');
  const catBtn     = document.getElementById('catBtn');
  const megaMenu   = document.getElementById('megaMenu');
  const searchInput = document.getElementById('searchInput');
  const searchSuggest = document.getElementById('searchSuggest');

  /* ===== ۱. هدر Sticky با افکت اسکرول ===== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ===== ۲. باز و بسته کردن منوی موبایل ===== */
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow =
      nav.classList.contains('active') ? 'hidden' : '';
  });

  overlay.addEventListener('click', closeMenu);

  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ===== ۳. باز کردن مگا منو در موبایل ===== */
  catBtn.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      megaMenu.classList.toggle('active');
    }
  });

  /* ===== ۴. جستجوی هوشمند (پیشنهاد خودکار) ===== */
  const products = [
    'رژ لب مدادی گلدن رز',
    'خط چشم رنگی گلدن رز',
    'ریمل رنگی گلدن رز',
    'کرم پودر تروکاور',
    'سرم ویتامین C',
    'ماسک صورت آبرسان',
    'کرم دور چشم ضد چروک',
    'ضد آفتاب SPF50',
    'شامپو ضد ریزش مو',
    'عطر زنانه گل محمدی'
  ];

  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();

    if (value.length < 2) {
      searchSuggest.classList.remove('active');
      searchSuggest.innerHTML = '';
      return;
    }

    const matches = products.filter(p =>
      p.includes(value)
    );

    if (matches.length === 0) {
      searchSuggest.innerHTML =
        '<li style="color:#999;">نتیجه‌ای یافت نشد</li>';
    } else {
      searchSuggest.innerHTML = matches
        .map(m => `<li>🔍 ${m}</li>`)
        .join('');
    }

    searchSuggest.classList.add('active');
  });

  // انتخاب از پیشنهادها
  searchSuggest.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      searchInput.value = e.target.textContent.replace('🔍 ', '');
      searchSuggest.classList.remove('active');
    }
  });

  // بستن پیشنهادها با کلیک بیرون
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) {
      searchSuggest.classList.remove('active');
    }
  });

  /* ===== ۵. بستن منو با کلید Escape ===== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      searchSuggest.classList.remove('active');
    }
  });

  /* ===== ۶. بستن منو هنگام تغییر سایز ===== */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

});
