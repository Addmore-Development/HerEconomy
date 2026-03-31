// ============================================================
// HEADER SCROLL EFFECT
// ============================================================
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        if (scrollY > 40) {
            const opacity = Math.max(0.82, 1 - scrollY / 600);
            header.style.background = 'rgba(255,255,255,' + opacity + ')';
            header.style.backdropFilter = 'blur(8px)';
            header.style.webkitBackdropFilter = 'blur(8px)';
            header.classList.add('scrolled');
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
            header.style.webkitBackdropFilter = 'none';
            header.classList.remove('scrolled');
        }
    });
}

// ============================================================
// MOBILE TOGGLE
// ============================================================
function initMobileToggle() {
    const toggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (!toggle || !navMenu) return;
    toggle.addEventListener('click', function () {
        navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('open');
        });
    });
}

// ============================================================
// COUNTDOWN TIMER (index.html)
// ============================================================
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    if (!daysEl) return;

    const targetDate = new Date(2026, 4, 21, 0, 0, 0);

    function updateCountdown() {
        const now = new Date();
        const timeRemaining = targetDate - now;
        if (timeRemaining <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        const totalSeconds = Math.floor(timeRemaining / 1000);
        const days    = Math.floor(totalSeconds / 86400);
        const hours   = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        daysEl.textContent    = days    < 10 ? '0' + days    : days.toString();
        hoursEl.textContent   = hours   < 10 ? '0' + hours   : hours.toString();
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes.toString();
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds.toString();
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================================
// YEAR TABS (about.html)
// ============================================================
function initYearTabs() {
    const tabBtns   = document.querySelectorAll('.year-tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    if (!tabBtns.length) return;
    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = btn.dataset.tab;
            tabBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            tabPanels.forEach(function (panel) {
                panel.classList.toggle('active', panel.id === 'tab-' + target);
            });
        });
    });
}

// ============================================================
// GALLERY FILTER + LIGHTBOX (gallery.html)
// ============================================================
function initGallery() {
    const filterBtns   = document.querySelectorAll('.gallery-filter button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox     = document.getElementById('lightbox');
    const lightboxImg  = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev  = document.getElementById('lightboxPrev');
    const lightboxNext  = document.getElementById('lightboxNext');
    if (!filterBtns.length && !lightbox) return;

    let visibleItems = [];
    let currentIndex = 0;

    function buildVisible() {
        visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
    }

    function openLightbox(index) {
        currentIndex = index;
        const img = visibleItems[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            galleryItems.forEach(function (item) {
                const cat = item.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
            buildVisible();
        });
    });

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            buildVisible();
            const visIdx = visibleItems.indexOf(item);
            if (visIdx >= 0) openLightbox(visIdx);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev)  lightboxPrev.addEventListener('click',  function (e) { e.stopPropagation(); showPrev(); });
    if (lightboxNext)  lightboxNext.addEventListener('click',  function (e) { e.stopPropagation(); showNext(); });
    if (lightbox)      lightbox.addEventListener('click',      function (e) { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'Escape')     closeLightbox();
        if (e.key === 'ArrowLeft')  showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    buildVisible();
}

// ============================================================
// STAKEHOLDER MARQUEE (stakeholders.html)
// ============================================================
function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    const isSubPage = window.location.pathname.includes('/pages/');
    const imgBase   = isSubPage ? '../' : '';

    const logos = [
        { src: 'images/2025/02/dbsa.png',                    alt: 'DBSA' },
        { src: 'images/2025/02/gp.png',                      alt: 'Gauteng Provincial Government' },
        { src: 'images/2025/02/jhb.png',                     alt: 'City of Johannesburg' },
        { src: 'images/2025/02/SA.png',                      alt: 'South Africa' },
        { src: 'images/2025/02/world-bank.png',              alt: 'World Bank' },
        { src: 'images/2025/02/dtic.png',                    alt: 'DTIC' },
        { src: 'images/2025/02/transnet.png',                alt: 'Transnet' },
        { src: 'images/2025/02/infrastructure-sa.png',       alt: 'Infrastructure SA' },
        { src: 'images/2025/02/sabc.png',                    alt: 'SABC' },
        { src: 'images/2025/02/sacci.png',                   alt: 'SACCI' },
        { src: 'images/2025/02/sacommerce.png',              alt: 'SA Commerce' },
        { src: 'images/2025/02/rrsa.png',                    alt: 'RRSA' },
        { src: 'images/2025/02/uj.png',                      alt: 'University of Johannesburg' },
        { src: 'images/2025/02/GIBS-Logo-02-01-300x123.png', alt: 'GIBS' },
        { src: 'images/2025/02/brics.png',                   alt: 'BRICS' },
        { src: 'images/2025/02/afcta.png',                   alt: 'AfCTA' },
        { src: 'images/2025/02/cnbc.png',                    alt: 'CNBC Africa' },
        { src: 'images/2025/02/edu.png',                     alt: 'Education Partner' },
        { src: 'images/2025/02/men.png',                     alt: 'MENA Partner' },
        { src: 'images/2025/02/mogale.png',                  alt: 'Mogale' },
        { src: 'images/2025/02/bus.png',                     alt: 'Business Partner' },
        { src: 'images/2025/02/VodacomLogo1-300x141.jpg',   alt: 'Vodacom' },
    ];

    function buildCards(list) {
        return list.map(function (logo) {
            const card = document.createElement('div');
            card.className = 'logo-card';
            const img = document.createElement('img');
            img.src     = imgBase + logo.src;
            img.alt     = logo.alt;
            img.loading = 'lazy';
            card.appendChild(img);
            return card;
        });
    }

    buildCards(logos).forEach(function (c) { track.appendChild(c); });
    buildCards(logos).forEach(function (c) { track.appendChild(c); });
}

// ============================================================
// BACKGROUND VIDEO (speakers.html)
// ============================================================
function initBgVideo() {
    const video = document.getElementById('bgVideo');
    if (!video) return;
    video.play().catch(function () {
        console.warn('Background video autoplay was prevented.');
    });
}

// ============================================================
// TICKET FORM (ticket.html)
// ============================================================
function initTicketForm() {
    const ticketForm = document.getElementById('ticketForm');
    if (!ticketForm) return;
    ticketForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const required = this.querySelectorAll('input[required]');
        let valid = true;
        required.forEach(function (field) {
            if (field.type === 'checkbox') {
                if (!field.checked) {
                    valid = false;
                    field.closest('.checkbox-label').style.color = '#F04438';
                } else {
                    field.closest('.checkbox-label').style.color = '';
                }
            } else {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = '#F04438';
                } else {
                    field.style.borderColor = '';
                }
            }
        });
        if (!valid) { alert('Please fill in all required fields.'); return; }
        this.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// INIT ALL ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initMobileToggle();
    initCountdown();
    initYearTabs();
    initGallery();
    initMarquee();
    initBgVideo();
    initTicketForm();
});