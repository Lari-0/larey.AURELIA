/* =========================
   NAVBAR — затемнение при скролле
========================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* =========================
   SCROLL ANIMATION
========================= */
const animatedItems = document.querySelectorAll(
    '.menu-item, .gallery-item, .experience-overlay, .stat-card'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.12 });

animatedItems.forEach(item => observer.observe(item));

/* =========================
   BOOKING MODAL
========================= */
const bookingModal    = document.getElementById('bookingModal');
const bookingOverlay  = document.getElementById('modalOverlay');
const closeBtn        = document.getElementById('closeModal');
const confirmBtn      = document.getElementById('confirmBooking');

// Кнопки «Забронировать» — их может быть несколько (navbar + секция)
document.querySelectorAll('.reserve-btn').forEach(btn => {
    btn.addEventListener('click', openBookingModal);
});

function openBookingModal() {
    bookingModal.classList.add('active');
    bookingOverlay.classList.add('active');
}

function closeBookingModal() {
    bookingModal.classList.remove('active');
    bookingOverlay.classList.remove('active');
}

if (closeBtn)       closeBtn.addEventListener('click', closeBookingModal);
if (bookingOverlay) bookingOverlay.addEventListener('click', closeBookingModal);

// Подтверждение бронирования
if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        const inputs = bookingModal.querySelectorAll('input');
        let valid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) valid = false;
        });
        if (!valid) {
            confirmBtn.textContent = 'Заполните все поля';
            confirmBtn.style.background = '#9ca3af';
            setTimeout(() => {
                confirmBtn.textContent = 'Подтвердить бронь';
                confirmBtn.style.background = '';
            }, 2000);
            return;
        }
        confirmBtn.textContent = '✓ Бронь подтверждена!';
        confirmBtn.style.background = '#059669';
        setTimeout(() => {
            closeBookingModal();
            confirmBtn.textContent = 'Подтвердить бронь';
            confirmBtn.style.background = '';
        }, 1800);
    });
}

/* =========================
   MENU MODAL
========================= */
const menuModal  = document.getElementById('menuModal');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose  = document.getElementById('menuClose');

const modalImg   = document.getElementById('menuModalImg');
const modalTitle = document.getElementById('menuModalTitle');
const modalDesc  = document.getElementById('menuModalDesc');

document.querySelectorAll('.menu-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        modalImg.src       = btn.dataset.img;
        modalTitle.textContent = btn.dataset.title;
        modalDesc.textContent  = btn.dataset.desc;
        menuModal.classList.add('active');
        menuOverlay.classList.add('active');
    });
});

function closeMenuModal() {
    menuModal.classList.remove('active');
    menuOverlay.classList.remove('active');
}

if (menuClose)   menuClose.addEventListener('click', closeMenuModal);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenuModal);

/* =========================
   LOCATION MODAL
========================= */
const locationModal   = document.getElementById('locationModal');
const locationOverlay = document.getElementById('locationOverlay');
const openLocation    = document.getElementById('openLocation');
const locationClose   = document.getElementById('locationClose');

function openLocationModal() {
    locationModal.classList.add('active');
    locationOverlay.classList.add('active');
}

function closeLocationModal() {
    locationModal.classList.remove('active');
    locationOverlay.classList.remove('active');
}

if (openLocation)    openLocation.addEventListener('click', openLocationModal);
if (locationClose)   locationClose.addEventListener('click', closeLocationModal);
if (locationOverlay) locationOverlay.addEventListener('click', closeLocationModal);

/* =========================
   SCROLL TO TOP
========================= */
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =========================
   ЗАКРЫТИЕ МОДАЛОК ПО ESC
========================= */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingModal();
        closeMenuModal();
        closeLocationModal();
    }
});