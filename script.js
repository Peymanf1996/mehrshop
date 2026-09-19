// ===== هدر چسبان =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== داده‌های نمونه محصولات =====
const products = [
  { title: 'رژ لب مدادی گلدن رز مدل مات', brand: 'Golden Rose', price: 138750, old: 216000, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', badge: '۳۶٪' },
  { title: 'خط چشم رنگی گلدن رز مدل Flash', brand: 'Golden Rose', price: 212000, old: 249000, img: 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=400', badge: '۱۵٪' },
  { title: 'ریمل رنگی گلدن رز مدل Flash', brand: 'Golden Rose', price: 219500, old: 249000, img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', badge: '۱۲٪' },
  { title: 'سرم ویتامین C روشن‌کننده', brand: 'The Ordinary', price: 320000, old: 410000, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', badge: '۲۲٪' },
  { title: 'کرم آبرسان پوست چرب', brand: 'La Roche', price: 450000, old: 550000, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', badge: '۱۸٪' },
  { title: 'عطر زنانه رز گلد', brand: 'Dior', price: 1250000, old: 1500000, img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', badge: '۱۷٪' },
];

// رندر محصولات
const wrapper = document.getElementById('productsWrapper');
wrapper.innerHTML = products.map(p => `
  <div class="swiper-slide">
    <div class="product-card">
      <div class="product-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <span class="product-badge">${p.badge}</span>
      </div>
      <div class="product-info">
        <span class="product-brand">${p.brand}</span>
        <h3 class="product-title">${p.title}</h3>
        <div class="product-price">
          <span class="price-new">${p.price.toLocaleString('fa-IR')} تومان</span>
          <span class="price-old">${p.old.toLocaleString('fa-IR')}</span>
        </div>
        <button class="add-to-cart" onclick="addToCart(this)">افزودن به سبد 🛒</button>
      </div>
    </div>
  </div>
`).join('');

// ===== اسلایدر محصولات =====
new Swiper('.products-swiper', {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: {
    0: { slidesPerView: 1.3, spaceBetween: 12 },
    480: { slidesPerView: 2, spaceBetween: 14 },
    768: { slidesPerView: 3, spaceBetween: 16 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
  }
});

// ===== مقالات =====
const blogs = [
  { title: 'بهترین ماسک صورت؛ راهنمای انتخاب ماسک مناسب', date: '۱۳ شهریور', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500' },
  { title: 'بهترین آبرسان برای پوست چرب', date: '۱۳ شهریور', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500' },
  { title: 'تفاوت آبرسان و مرطوب‌کننده', date: '۱۲ شهریور', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500' },
];
document.getElementById('blogGrid').innerHTML = blogs.map(b => `
  <article class="blog-card">
    <img src="${b.img}" alt="${b.title}" loading="lazy" />
    <div class="blog-content">
      <div class="blog-date">📅 ${b.date}</div>
      <h3 class="blog-title">${b.title}</h3>
      <a href="#" class="blog-read">ادامه مطلب ←</a>
    </div>
  </article>
`).join('');

// ===== تایمر شمارش معکوس =====
const endTime = new Date();
endTime.setHours(23, 59, 59, 0);
function updateCountdown() {
  const diff = endTime - new Date();
  if (diff <= 0) return;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('hh').textContent = String(h).padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  document.getElementById('mm').textContent = String(m).padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  document.getElementById('ss').textContent = String(s).padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ===== افزودن به سبد =====
let cartCount = 0;
function addToCart(btn) {
  cartCount++;
  document.querySelector('.cart-count').textContent = cartCount.toLocaleString('fa-IR');
  btn.textContent = '✅ اضافه شد';
  btn.style.background = '#2BB673';
  setTimeout(() => {
    btn.textContent = 'افزودن به سبد 🛒';
    btn.style.background = '';
  }, 1500);
}

// ===== انیمیشن ورود با اسکرول =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = 'all 0.6s ease';
  observer.observe(sec);
});
