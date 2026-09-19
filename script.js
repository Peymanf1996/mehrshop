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
  /* ============================================================
   اسلایدر بنر اصلی (Hero Slider)
   ============================================================ */

const heroSlides = document.querySelectorAll('.hero__slide');
const heroDots   = document.querySelectorAll('.hero__dot');
const heroPrev   = document.getElementById('heroPrev');
const heroNext   = document.getElementById('heroNext');
const heroSection = document.getElementById('hero');

let currentSlide = 0;
let slideInterval = null;
const SLIDE_DURATION = 6000; // ۶ ثانیه

/* تابع نمایش اسلاید */
function goToSlide(index) {
  // حذف کلاس active از همه
  heroSlides.forEach(s => s.classList.remove('active'));
  heroDots.forEach(d => d.classList.remove('active'));

  // محاسبه ایندکس چرخشی
  currentSlide = (index + heroSlides.length) % heroSlides.length;

  // اضافه کردن کلاس active
  heroSlides[currentSlide].classList.add('active');
  heroDots[currentSlide].classList.add('active');

  // ریست انیمیشن‌های متن
  const activeText = heroSlides[currentSlide].querySelector('.hero__text');
  const activeImage = heroSlides[currentSlide].querySelector('.hero__image');

  if (activeText) {
    activeText.style.animation = 'none';
    void activeText.offsetWidth;
    activeText.style.animation = '';
  }
  if (activeImage) {
    activeImage.style.animation = 'none';
    void activeImage.offsetWidth;
    activeImage.style.animation = '';
  }
}

/* اسلاید بعدی */
function nextSlide() {
  goToSlide(currentSlide + 1);
}

/* اسلاید قبلی */
function prevSlide() {
  goToSlide(currentSlide - 1);
}

/* شروع پخش خودکار */
function startAutoPlay() {
  stopAutoPlay();
  slideInterval = setInterval(nextSlide, SLIDE_DURATION);
}

/* توقف پخش خودکار */
function stopAutoPlay() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

/* رویدادها */
if (heroNext) heroNext.addEventListener('click', () => {
  nextSlide();
  startAutoPlay();
});

if (heroPrev) heroPrev.addEventListener('click', () => {
  prevSlide();
  startAutoPlay();
});

/* کلیک روی نقطه‌ها */
heroDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index, 10);
    goToSlide(index);
    startAutoPlay();
  });
});

/* توقف هنگام هاور روی بنر */
if (heroSection) {
  heroSection.addEventListener('mouseenter', stopAutoPlay);
  heroSection.addEventListener('mouseleave', startAutoPlay);
}

/* پشتیبانی از سوایپ موبایل */
let touchStartX = 0;
let touchEndX = 0;

if (heroSection) {
  heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  const threshold = 50;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // سوایپ به چپ → اسلاید بعدی (RTL)
      prevSlide();
    } else {
      // سوایپ به راست → اسلاید قبلی (RTL)
      nextSlide();
    }
    startAutoPlay();
  }
}

/* شروع پخش خودکار در بارگذاری */
if (heroSlides.length > 0) {
  startAutoPlay();
}
/* ============================================================
   تایمر شمارش معکوس پیشنهاد ویژه
   ============================================================ */

const cdHours   = document.getElementById('cdHours');
const cdMinutes = document.getElementById('cdMinutes');
const cdSeconds = document.getElementById('cdSeconds');

/* تبدیل اعداد به فارسی */
function toPersian(num) {
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return String(num).padStart(2, '0').replace(/\d/g, d => persianDigits[d]);
}

/* زمان پایان: ۵ ساعت و ۲۳ دقیقه از حالا */
let dealEndTime = new Date().getTime() + (5 * 60 * 60 * 1000) + (23 * 60 * 1000) + (11 * 1000);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = dealEndTime - now;

  // اگر زمان تمام شد، ریست کن
  if (distance < 0) {
    dealEndTime = new Date().getTime() + (5 * 60 * 60 * 1000);
    return;
  }

  const hours   = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (cdHours)   cdHours.textContent   = toPersian(hours);
  if (cdMinutes) cdMinutes.textContent = toPersian(minutes);
  if (cdSeconds) cdSeconds.textContent = toPersian(seconds);
}

/* اجرای اولیه و هر ثانیه */
if (cdHours && cdMinutes && cdSeconds) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ============================================================
   دکمه افزودن به سبد خرید (پیشنهاد ویژه)
   ============================================================ */

const dealAddBtn = document.getElementById('dealAddBtn');

if (dealAddBtn) {
  dealAddBtn.addEventListener('click', function () {
    const originalText = this.innerHTML;
    this.innerHTML = '✅ به سبد اضافه شد';
    this.style.background = '#4CAF50';

    // به‌روزرسانی Badge سبد خرید
    const cartBadge = document.querySelector('.action-btn[aria-label="سبد خرید"] .badge');
    if (cartBadge) {
      const currentCount = parseInt(
        cartBadge.textContent.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
      ) || 0;
      cartBadge.textContent = toPersian(currentCount + 1);

      // انیمیشن Badge
      cartBadge.style.transform = 'scale(1.4)';
      setTimeout(() => cartBadge.style.transform = 'scale(1)', 300);
    }

    // برگرداندن متن دکمه
    setTimeout(() => {
      this.innerHTML = originalText;
      this.style.background = '';
    }, 2000);
  });
}

/* ============================================================
   دکمه علاقه‌مندی
   ============================================================ */

const dealWishBtn = document.querySelector('.deal__wish-btn');

if (dealWishBtn) {
  dealWishBtn.addEventListener('click', function () {
    this.classList.toggle('active');

    if (this.classList.contains('active')) {
      this.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;
    } else {
      this.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor"
            d="M12 21s-6.7-4.35-9.33-8.5C.9 9.8 2.5 6 6 6c2 0 3.3 1.2 4 2.2C10.7 7.2 12 6 14 6c3.5 0 5.1 3.8 3.33 6.5C18.7 16.65 12 21 12 21z"/>
        </svg>`;
    }
  });
}
/* ============================================================
   تعاملات کارت محصول
   ============================================================ */

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {

  /* ===== ۱. دکمه علاقه‌مندی ===== */
  const wishBtn = card.querySelector('.product-card__wish');
  if (wishBtn) {
    wishBtn.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('active');

      // انیمیشن ضربان قلب
      this.style.transform = 'scale(1.3)';
      setTimeout(() => this.style.transform = '', 300);
    });
  }

  /* ===== ۲. انتخاب رنگ ===== */
  const colorDots = card.querySelectorAll('.color-dot:not(.color-dot--more)');
  colorDots.forEach(dot => {
    dot.addEventListener('click', function (e) {
      e.preventDefault();

      // حذف فعال از بقیه
      colorDots.forEach(d => d.style.boxShadow = '');

      // فعال کردن رنگ انتخاب‌شده
      this.style.boxShadow = '0 0 0 3px var(--primary)';
    });
  });

  /* ===== ۳. افزودن به سبد خرید ===== */
  const addBtn = card.querySelector('.product-card__add-btn:not(.product-card__add-btn--notify)');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      const originalHTML = this.innerHTML;

      // تغییر به حالت موفق
      this.innerHTML = '✅ اضافه شد';
      this.style.background = '#4CAF50';

      // به‌روزرسانی Badge سبد خرید
      updateCartBadge(1);

      // بازگشت به حالت اولیه
      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.style.background = '';
      }, 1800);
    });
  }

  /* ===== ۴. افزودن سریع ===== */
  const quickAdd = card.querySelector('.product-card__quick-add');
  if (quickAdd) {
    quickAdd.addEventListener('click', function (e) {
      e.preventDefault();

      this.innerHTML = '✅ اضافه شد';
      this.style.background = '#4CAF50';

      updateCartBadge(1);

      setTimeout(() => {
        this.innerHTML = '🛒 افزودن سریع';
        this.style.background = '';
      }, 1500);
    });
  }

  /* ===== ۵. دکمه اطلاع از موجودی ===== */
  const notifyBtn = card.querySelector('.product-card__add-btn--notify');
  if (notifyBtn) {
    notifyBtn.addEventListener('click', function () {
      const email = prompt('ایمیل خود را وارد کنید تا هنگام موجود شدن اطلاع‌رسانی شود:');
      if (email) {
        this.innerHTML = '✅ ثبت شد';
        this.style.background = '#4CAF50';
        setTimeout(() => {
          this.innerHTML = '🔔 اطلاع از موجودی';
          this.style.background = '';
        }, 2000);
      }
    });
  }
});

/* ============================================================
   به‌روزرسانی Badge سبد خرید
   ============================================================ */

function updateCartBadge(count) {
  const cartBadge = document.querySelector('.action-btn[aria-label="سبد خرید"] .badge');
  if (!cartBadge) return;

  // تبدیل اعداد فارسی به انگلیسی
  const currentText = cartBadge.textContent;
  const persianToEnglish = currentText.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  const currentCount = parseInt(persianToEnglish) || 0;

  // عدد جدید
  const newCount = currentCount + count;

  // تبدیل به فارسی
  const toPersian = (num) => String(num).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

  cartBadge.textContent = toPersian(newCount);

  // انیمیشن
  cartBadge.style.transform = 'scale(1.5)';
  setTimeout(() => cartBadge.style.transform = 'scale(1)', 300);

  // افکت لرزش روی آیکون سبد
  const cartIcon = cartBadge.closest('.action-btn');
  if (cartIcon) {
    cartIcon.style.transform = 'scale(1.15)';
    setTimeout(() => cartIcon.style.transform = '', 300);
  }
}
/* ============================================================
   سبد خرید کشویی (Cart Drawer)
   ============================================================ */

const cartDrawer   = document.getElementById('cartDrawer');
const cartOverlay  = document.getElementById('cartOverlay');
const cartClose    = document.getElementById('cartClose');
const cartBody     = document.getElementById('cartBody');
const cartEmpty    = document.getElementById('cartEmpty');
const cartFooter   = document.getElementById('cartFooter');
const cartIcon     = document.querySelector('.action-btn[aria-label="سبد خرید"]');
const continueBtn  = document.getElementById('continueShopping');
const continueFooter = document.getElementById('continueShoppingFooter');

/* ===== باز کردن سبد ===== */
function openCart() {
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ===== بستن سبد ===== */
function closeCart() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* رویدادها */
if (cartIcon) {
  cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  });
}

if (cartClose)    cartClose.addEventListener('click', closeCart);
if (cartOverlay)  cartOverlay.addEventListener('click', closeCart);
if (continueBtn)  continueBtn.addEventListener('click', closeCart);
if (continueFooter) continueFooter.addEventListener('click', closeCart);

/* بستن با کلید Escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cartDrawer.classList.contains('active')) {
    closeCart();
  }
});

/* ============================================================
   مدیریت تعداد و قیمت
   ============================================================ */

/* تبدیل اعداد به فارسی */
function toPersian(num) {
  return String(num).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

/* فرمت‌دهی قیمت با کاما */
function formatPrice(num) {
  return toPersian(num.toLocaleString('en-US'));
}

/* ===== به‌روزرسانی تعداد ===== */
function updateQuantity(btn, delta) {
  const cartItem = btn.closest('.cart-item');
  const qtyNum = cartItem.querySelector('.cart-item__qty-num');

  // تبدیل عدد فارسی به انگلیسی
  const currentText = qtyNum.textContent.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  let qty = parseInt(currentText) || 1;

  qty += delta;

  if (qty < 1) {
    // حذف محصول اگر تعداد صفر شد
    removeCartItem(cartItem);
    return;
  }

  qtyNum.textContent = toPersian(qty);

  // انیمیشن
  qtyNum.style.transform = 'scale(1.3)';
  setTimeout(() => qtyNum.style.transform = '', 200);

  updateCartTotals();
}

/* ===== حذف محصول ===== */
function removeCartItem(cartItem) {
  cartItem.classList.add('removing');

  setTimeout(() => {
    cartItem.remove();
    updateCartTotals();
    checkCartEmpty();
  }, 400);
}

/* ===== بررسی خالی بودن سبد ===== */
function checkCartEmpty() {
  const items = cartBody.querySelectorAll('.cart-item');
  if (items.length === 0) {
    cartBody.style.display = 'none';
    cartFooter.style.display = 'none';
    cartEmpty.style.display = 'flex';
  } else {
    cartBody.style.display = 'flex';
    cartFooter.style.display = 'block';
    cartEmpty.style.display = 'none';
  }
}

/* ===== محاسبه جمع کل ===== */
function updateCartTotals() {
  const items = cartBody.querySelectorAll('.cart-item');
  let subtotal = 0;
  let totalItems = 0;

  items.forEach(item => {
    const price = parseInt(item.dataset.price) || 0;
    const qtyText = item.querySelector('.cart-item__qty-num').textContent;
    const qty = parseInt(qtyText.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))) || 1;

    subtotal += price * qty;
    totalItems += qty;
  });

  // تخفیف فرضی (۱۰٪)
  const discount = Math.floor(subtotal * 0.1);
  const total = subtotal - discount;

  // به‌روزرسانی نمایش
  const subtotalEl  = document.getElementById('cartSubtotal');
  const discountEl  = document.getElementById('cartDiscount');
  const totalEl     = document.getElementById('cartTotal');
  const countEl     = document.getElementById('cartItemCount');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal) + ' تومان';
  if (discountEl) discountEl.textContent = formatPrice(discount) + ' تومان';
  if (totalEl)    totalEl.textContent    = formatPrice(total) + ' تومان';
  if (countEl)    countEl.textContent    = `(${toPersian(totalItems)} کالا)`;

  // به‌روزرسانی Badge هدر
  const headerBadge = document.querySelector('.action-btn[aria-label="سبد خرید"] .badge');
  if (headerBadge) {
    headerBadge.textContent = toPersian(totalItems);
  }

  // به‌روزرسانی نوار ارسال رایگان
  updateShippingBar(subtotal);
}

/* ===== نوار ارسال رایگان ===== */
function updateShippingBar(subtotal) {
  const freeShippingThreshold = 500000;
  const shippingFill = document.getElementById('shippingFill');
  const shippingText = document.getElementById('shippingText');
  const shippingPercent = document.getElementById('shippingPercent');

  if (!shippingFill) return;

  const percent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  shippingFill.style.width = percent + '%';
  if (shippingPercent) shippingPercent.textContent = toPersian(Math.round(percent)) + '٪';

  if (subtotal >= freeShippingThreshold) {
    if (shippingText) shippingText.textContent = '🎉 ارسال شما رایگان است!';
    if (shippingPercent) shippingPercent.textContent = '۱۰۰٪';
  } else {
    const remaining = freeShippingThreshold - subtotal;
    if (shippingText) {
      shippingText.textContent = `تا ارسال رایگان ${formatPrice(remaining)} تومان باقی مانده`;
    }
  }
}

/* ============================================================
   رویدادهای دکمه‌های تعداد و حذف
   ============================================================ */

/* استفاده از Event Delegation برای کارایی بهتر */
if (cartBody) {
  cartBody.addEventListener('click', (e) => {

    // دکمه افزایش
    if (e.target.closest('.cart-item__qty-plus')) {
      updateQuantity(e.target.closest('.cart-item__qty-plus'), 1);
    }

    // دکمه کاهش
    if (e.target.closest('.cart-item__qty-minus')) {
      updateQuantity(e.target.closest('.cart-item__qty-minus'), -1);
    }

    // دکمه حذف
    if (e.target.closest('.cart-item__remove')) {
      const item = e.target.closest('.cart-item');
      if (confirm('آیا از حذف این محصول مطمئن هستید؟')) {
        removeCartItem(item);
      }
    }
  });
}

/* ============================================================
   کد تخفیف
   ============================================================ */

const couponApply = document.getElementById('couponApply');
const couponInput = document.getElementById('couponInput');

if (couponApply) {
  couponApply.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();

    if (!code) {
      showToast('لطفاً کد تخفیف را وارد کنید', 'warning');
      return;
    }

    // کدهای نمونه
    const validCodes = {
      'MEHR10':  { discount: 10, message: '۱۰٪ تخفیف اعمال شد!' },
      'WELCOME': { discount: 15, message: '۱۵٪ تخفیف خوش‌آمدگویی!' },
      'BEAUTY20':{ discount: 20, message: '۲۰٪ تخفیف ویژه اعمال شد!' }
    };

    if (validCodes[code]) {
      const data = validCodes[code];
      couponApply.textContent = '✅';
      couponApply.style.background = '#4CAF50';
      showToast(data.message, 'success');

      // اعمال تخفیف واقعی
      applyCouponDiscount(data.discount);
      couponInput.disabled = true;

    } else {
      couponApply.textContent = '❌';
      couponApply.style.background = '#FF3B30';
      showToast('کد تخفیف نامعتبر است', 'error');

      setTimeout(() => {
        couponApply.textContent = 'اعمال';
        couponApply.style.background = '';
      }, 2000);
    }
  });
}

/* اعمال تخفیف کد */
function applyCouponDiscount(percent) {
  const items = cartBody.querySelectorAll('.cart-item');
  let subtotal = 0;

  items.forEach(item => {
    const price = parseInt(item.dataset.price) || 0;
    const qtyText = item.querySelector('.cart-item__qty-num').textContent;
    const qty = parseInt(qtyText.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))) || 1;
    subtotal += price * qty;
  });

  const discount = Math.floor(subtotal * percent / 100);
  const total = subtotal - discount;

  const discountEl = document.getElementById('cartDiscount');
  const totalEl = document.getElementById('cartTotal');

  if (discountEl) discountEl.textContent = formatPrice(discount) + ' تومان';
  if (totalEl)    totalEl.textContent    = formatPrice(total) + ' تومان';
}

/* ============================================================
   سیستم اعلان (Toast Notification)
   ============================================================ */

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================================
   مقداردهی اولیه
   ============================================================ */

/* محاسبه اولیه جمع کل هنگام بارگذاری */
updateCartTotals();
/* ============================================================
   فیلتر مقالات (Blog Filter)
   ============================================================ */

const blogTabs  = document.querySelectorAll('.blog__tab');
const blogCards = document.querySelectorAll('.blog-card');

blogTabs.forEach(tab => {
  tab.addEventListener('click', () => {

    // حذف active از بقیه تب‌ها
    blogTabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    const filter = tab.dataset.filter;

    // فیلتر کارت‌ها
    blogCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.classList.add('filtering');
        setTimeout(() => card.classList.remove('filtering'), 500);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ============================================================
   انیمیشن ورود کارت‌های مقاله (Scroll Reveal)
   ============================================================ */

const blogObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      blogObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

/* تنظیم حالت اولیه و رصد */
blogCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease';
  blogObserver.observe(card);
});
/* ============================================================
   اسلایدر نظرات مشتریان (Testimonials Slider)
   ============================================================ */

const testiSlider = document.getElementById('testiSlider');
const testiPrev   = document.getElementById('testiPrev');
const testiNext   = document.getElementById('testiNext');
const testiDots   = document.getElementById('testiDots');
const testimonialCards = document.querySelectorAll('.testimonial-card');

if (testiSlider && testimonialCards.length > 0) {

  let testiIndex = 0;
  let testiAutoPlay = null;
  const TESTI_INTERVAL = 5000;

  /* ===== محاسبه تعداد کارت‌های قابل نمایش ===== */
  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  /* ===== محاسبه تعداد کل اسلایدها ===== */
  function getMaxIndex() {
    const visible = getVisibleCount();
    return Math.max(0, testimonialCards.length - visible);
  }

  /* ===== ساخت نقطه‌ها ===== */
  function buildDots() {
    if (!testiDots) return;
    testiDots.innerHTML = '';
    const maxIndex = getMaxIndex();

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonials__dot';
      dot.setAttribute('aria-label', `نظر ${i + 1}`);
      dot.dataset.index = i;
      if (i === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        testiIndex = i;
        scrollToCard(testiIndex);
        updateDots();
        startTestiAutoPlay();
      });

      testiDots.appendChild(dot);
    }
  }

  /* ===== اسکرول به کارت مورد نظر ===== */
  function scrollToCard(index) {
    const card = testimonialCards[index];
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * index;

    testiSlider.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  /* ===== به‌روزرسانی نقطه‌های فعال ===== */
  function updateDots() {
    if (!testiDots) return;
    const dots = testiDots.querySelectorAll('.testimonials__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === testiIndex);
    });

    // غیرفعال کردن دکمه‌ها در ابتدا/انتها
    if (testiPrev) testiPrev.disabled = testiIndex === 0;
    if (testiNext) testiNext.disabled = testiIndex >= getMaxIndex();
  }

  /* ===== اسلاید بعدی ===== */
  function testiNextSlide() {
    const maxIndex = getMaxIndex();
    testiIndex = testiIndex >= maxIndex ? 0 : testiIndex + 1;
    scrollToCard(testiIndex);
    updateDots();
  }

  /* ===== اسلاید قبلی ===== */
  function testiPrevSlide() {
    const maxIndex = getMaxIndex();
    testiIndex = testiIndex <= 0 ? maxIndex : testiIndex - 1;
    scrollToCard(testiIndex);
    updateDots();
  }

  /* ===== پخش خودکار ===== */
  function startTestiAutoPlay() {
    stopTestiAutoPlay();
    testiAutoPlay = setInterval(testiNextSlide, TESTI_INTERVAL);
  }

  function stopTestiAutoPlay() {
    if (testiAutoPlay) {
      clearInterval(testiAutoPlay);
      testiAutoPlay = null;
    }
  }

  /* ===== رویدادها ===== */
  if (testiNext) testiNext.addEventListener('click', () => {
    testiNextSlide();
    startTestiAutoPlay();
  });

  if (testiPrev) testiPrev.addEventListener('click', () => {
    testiPrevSlide();
    startTestiAutoPlay();
  });

  /* توقف هنگام هاور */
  testiSlider.addEventListener('mouseenter', stopTestiAutoPlay);
  testiSlider.addEventListener('mouseleave', startTestiAutoPlay);

  /* تشخیص اسکرول دستی کاربر */
  let scrollTimeout;
  testiSlider.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // محاسبه ایندکس بر اساس موقعیت اسکرول
      const card = testimonialCards[0];
      if (!card) return;
      const cardWidth = card.offsetWidth + 20; // + gap
      const newIndex = Math.round(testiSlider.scrollLeft / cardWidth);

      if (newIndex !== testiIndex && newIndex >= 0 && newIndex <= getMaxIndex()) {
        testiIndex = newIndex;
        updateDots();
      }
    }, 100);
  });

  /* ===== پشتیبانی از سوایپ موبایل ===== */
  let touchStartX = 0;
  testiSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopTestiAutoPlay();
  }, { passive: true });

  testiSlider.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // سوایپ چپ (RTL: بعدی)
        testiPrevSlide();
      } else {
        // سوایپ راست (RTL: قبلی)
        testiNextSlide();
      }
    }
    startTestiAutoPlay();
  }, { passive: true });

  /* ===== راه‌اندازی اولیه ===== */
  buildDots();
  updateDots();
  startTestiAutoPlay();

  /* ===== بازسازی با تغییر اندازه صفحه ===== */
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      testiIndex = 0;
      buildDots();
      updateDots();
      scrollToCard(0);
    }, 300);
  });
}
/* ============================================================
   فرم خبرنامه (Newsletter Form)
   ============================================================ */

const newsletterForm  = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = newsletterEmail.value.trim();

    // اعتبارسنجی ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast('لطفاً ایمیل معتبر وارد کنید', 'error');
      newsletterEmail.focus();
      return;
    }

    // شبیه‌سازی ارسال (در واقعیت به سرور ارسال می‌شود)
    const submitBtn = newsletterForm.querySelector('.newsletter__btn');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '⏳ در حال ثبت...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '✅ ثبت شد';
      submitBtn.style.background = '#4CAF50';
      showToast('عضویت شما با موفقیت ثبت شد! 🎉', 'success');

      // پاک کردن فرم
      newsletterEmail.value = '';

      // بازگشت به حالت اولیه
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 2500);

    }, 1200);
  });
}

/* ============================================================
   انیمیشن ورود ستون‌های فوتر (Scroll Reveal)
   ============================================================ */

const footerCols = document.querySelectorAll('.footer__col');

const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      footerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

footerCols.forEach(col => {
  col.style.opacity = '0';
  col.style.transform = 'translateY(20px)';
  col.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  footerObserver.observe(col);
});

/* ============================================================
   دکمه بازگشت به بالا (Back to Top)
   ============================================================ */

// ایجاد دکمه
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'بازگشت به بالا');
backToTop.innerHTML = `
  <svg viewBox="0 0 24 24" width="22" height="22">
    <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"/>
  </svg>
`;
document.body.appendChild(backToTop);

/* نمایش/مخفی کردن با اسکرول */
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

/* اسکرول نرم به بالا */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
});
