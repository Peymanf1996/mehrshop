// ===== گرفتن ID محصول از URL =====
const params = new URLSearchParams(window.location.search);
const productId = params.get('id') || '1';
const p = PRODUCTS[productId];

// اگر محصول پیدا نشد
if (!p) {
  document.body.innerHTML = '<h1 style="text-align:center;padding:50px">محصول یافت نشد ❌</h1>';
  throw new Error('Product not found');
}

// ===== ابزار تبدیل اعداد =====
const toFa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

// ===== عنوان صفحه =====
document.title = p.title + ' | مهرشاپ';

// ===== بردکرامب =====
document.getElementById('breadcrumbBrand').textContent = p.brand;
document.getElementById('breadcrumbTitle').textContent = p.title;

// ===== اطلاعات اصلی =====
document.getElementById('brand').textContent = p.brand;
document.getElementById('title').textContent = p.title;
document.getElementById('ratingText').textContent = `${toFa(p.rating)} از ۵ (${toFa(p.reviews)} نظر)`;

// ===== ویژگی‌ها =====
document.getElementById('features').innerHTML = p.features
  .map(f => `<li>${f}</li>`)
  .join('');

// ===== گالری =====
const mainImage = document.getElementById('mainImage');
const thumbs = document.getElementById('thumbs');

mainImage.src = p.images[0];
thumbs.innerHTML = p.images.map((img, i) =>
  `<img src="${img}" class="${i === 0 ? 'active' : ''}" data-src="${img}" />`
).join('');

thumbs.querySelectorAll('img').forEach(t => {
  t.addEventListener('click', () => {
    thumbs.querySelectorAll('img').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    mainImage.src = t.dataset.src;
  });
});

// ===== رنگ‌ها =====
const colorsBox = document.getElementById('colors');
const colorName = document.getElementById('colorName');

if (p.colors && p.colors.length) {
  colorsBox.innerHTML = p.colors.map((c, i) =>
    `<button class="color ${i === 0 ? 'active' : ''}" 
             style="background:${c.hex}" 
             data-name="${c.name}"></button>`
  ).join('');
  colorName.textContent = p.colors[0].name;

  colorsBox.querySelectorAll('.color').forEach(sw => {
    sw.addEventListener('click', () => {
      colorsBox.querySelectorAll('.color').forEach(x => x.classList.remove('active'));
      sw.classList.add('active');
      colorName.textContent = sw.dataset.name;
    });
  });
} else {
  document.getElementById('colorPicker').style.display = 'none';
}

// ===== قیمت =====
document.getElementById('priceOld').textContent = toFa(p.oldPrice.toLocaleString()) + ' تومان';
document.getElementById('discount').textContent = toFa(p.discount) + '٪';
document.getElementById('priceNew').innerHTML = 
  `${toFa(p.price.toLocaleString())} <small>تومان</small>`;
document.getElementById('installment').textContent = 
  `💳 یا ۴ قسط ماهانه ${toFa(p.price.toLocaleString())} تومان (بدون سود)`;

// ===== توضیحات =====
document.getElementById('description').textContent = p.description;
document.getElementById('specsList').innerHTML = p.specs
  .map(s => `<li>${s.key}: ${s.value}</li>`)
  .join('');

// ===== تعداد =====
let qty = 1;
function changeQty(delta) {
  qty = Math.max(1, qty + delta);
  document.getElementById('qty').value = toFa(qty);
}

// ===== افزودن به سبد =====
let cartCount = 0;
function addToCart() {
  cartCount += qty;
  document.querySelector('.cart-count').textContent = toFa(cartCount);
  const btn = document.querySelector('.btn-add');
  const original = btn.innerHTML;
  btn.innerHTML = '✅ اضافه شد';
  btn.style.background = '#2BB673';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
  }, 1500);
}
