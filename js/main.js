// ========== MOBILE MENU TOGGLE ==========
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('.nav-menu a, .btn-buy, .btn-view').forEach(link => {
        link.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                const navMenu = document.getElementById('navMenu');
                if (navMenu) navMenu.classList.remove('show');
            }
        });
    });
}

// ========== COUNTDOWN TIMER ==========
function initCountdown(targetDate) {
    function updateCountdown() {
        const target = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (86400000)) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========== PARTNER MARQUEE ==========
function initPartnerMarquee(partners) {
    const marquee = document.getElementById('marqueeTrack');
    if (!marquee) return;

    let logosHtml = '';
    for (let i = 0; i < 2; i++) {
        partners.forEach(p => {
            logosHtml += `<img src="https://placehold.co/120x60/4E342E/FFC425?text=${p.replace(/ /g, '+')}" alt="${p}">`;
        });
    }
    marquee.innerHTML = logosHtml;
}

// ========== SPEAKERS GRID ==========
function initSpeakers(speakersList, containerId) {
    const speakersGrid = document.getElementById(containerId);
    if (!speakersGrid) return;

    speakersList.forEach(sp => {
        const card = document.createElement('div');
        card.className = 'speaker-card';
        card.innerHTML = `
            <div class="speaker-img" style="background-image: url('${sp.img}');"></div>
            <h4>${sp.name}</h4>
            <p style="font-size:13px;">${sp.title}</p>
        `;
        speakersGrid.appendChild(card);
    });
}

// ========== GALLERY ==========
function initGallery(galleryItems, containerId) {
    const galleryContainer = document.getElementById(containerId);
    if (!galleryContainer) return;

    function renderGallery(filter) {
        galleryContainer.innerHTML = '';
        const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter);
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="${item.src}" alt="gallery">`;
            div.addEventListener('click', () => window.open(item.src, '_blank'));
            galleryContainer.appendChild(div);
        });
    }

    renderGallery('all');

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.filter);
        });
    });
}

// ========== TICKET FORM ==========
function initTicketForm(formId, messageId) {
    const form = document.getElementById(formId);
    const msgDiv = document.getElementById(messageId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('fullname')?.value.trim();
        const email = document.getElementById('email')?.value.trim();

        if (!name || !email) {
            if (msgDiv) {
                msgDiv.innerHTML = '<div style="background:#f8d7da; padding:12px; border-radius:12px; color:#721c24;">Please fill in required fields.</div>';
            }
            return;
        }

        if (msgDiv) {
            msgDiv.innerHTML = '<div style="background:#d4edda; padding:12px; border-radius:12px; color:#155724;">✅ Thank you! A payment link has been sent to your email (demo). Our team will contact you shortly.</div>';
        }
        form.reset();
        setTimeout(() => {
            if (msgDiv) msgDiv.innerHTML = '';
        }, 5000);
    });
}

// ========== SET ACTIVE NAVIGATION ==========
function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== INITIALIZE ALL ==========
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    setActiveNav();
});