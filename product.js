// ===== گالری تصاویر =====
const thumbs = document.querySelectorAll('#thumbs img');
const mainImg = document.querySelector('#mainImage img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

thumbs.forEach(t => {
  t.addEventListener('click', () => {
    thumbs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    mainImg.src = t.src.replace('w=200', 'w=700');
  });
});

// زوم
document.querySelector('#mainImage').addEventListener('click', () => {
  lightboxImg.src = mainImg.src;
  lightbox.classList.add('active');
});
lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

// ===== انتخاب رنگ =====
document.querySelectorAll('.color-swatch').forEach(sw => {
  sw.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach(x => x.classList.remove('active'));
    sw.classList.add('active');
    document.querySelector('.selected-color b').textContent = sw.dataset.name;
  });
});

// ===== تعداد =====
const toFa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
let qty = 1;
function changeQty(delta) {
  qty = Math.max(1, qty + delta);
  document.getElementById('qty').value = toFa(qty);
}

// ===== تب‌ها =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ===== افزودن به سبد =====
let cartCount = 0;
function addToCart() {
  cartCount += qty;
  document.querySelector('.cart-count').textContent = toFa(cartCount);
  const btn = document.querySelector('.btn.big');
  const original = btn.innerHTML;
  btn.innerHTML = '✅ به سبد اضافه شد';
  btn.style.background = '#2BB673';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
  }, 1500);
}

// ===== محصولات مشابه =====
const similar = [
  { title: 'رژ لب مایع مات', brand: 'Golden Rose', price: 158000, old: 198000, img: 'https://images.unsplash.com/photo-1631214540242-3cd8c4b0b4c8?w=400', badge: '۲۰٪' },
  { title: 'خط لب مدادی', brand: 'Golden Rose', price: 98000, old: 128000, img: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400', badge: '۲۳٪' },
  { title: 'براق کننده لب', brand: 'Golden Rose', price: 128000, old: 158000, img: 'https://images.unsplash.com/photo-1583241800698-e8ab01c85b6a?w=400', badge: '۱۹٪' },
  { title: 'رژ لب جامد مات', brand: 'Golden Rose', price: 145000, old: 185000, img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', badge: '۲۱٪' },
];
document.getElementById('similarWrapper').innerHTML = similar.map(p => `
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
        <button class="add-to-cart" onclick="addToCart()">افزودن به سبد 🛒</button>
      </div>
    </div>
  </div>
`).join('');

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

// ===== هدر چسبان =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});
