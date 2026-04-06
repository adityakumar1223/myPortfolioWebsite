/* =========================================
   ADITYA KUMAR PORTFOLIO — script.js
   ========================================= */

/* --- THEME TOGGLE --- */
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

/* --- CUSTOM CURSOR --- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
        // Follower lags slightly via CSS transition
        follower.style.left = e.clientX + 'px';
        follower.style.top  = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .project-card, .about-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
    });
}

/* --- NAVBAR SCROLL BEHAVIOR --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* --- MOBILE MENU --- */
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* --- SCROLL ANIMATIONS (Intersection Observer) --- */
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animObserver.unobserve(entry.target); // Fire once
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-in').forEach(el => animObserver.observe(el));

/* --- SKILL BARS (triggered when skills section is visible) --- */
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-fill');
            const pct  = entry.target.getAttribute('data-skill');
            if (fill && pct) fill.style.width = pct + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

/* --- PROJECT FILTER --- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            const show = filter === 'all' || cat === filter;
            // Animate out/in
            if (show) {
                card.style.display = '';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = '';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

/* --- PROJECT MODAL --- */
const overlay    = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalImg   = document.getElementById('modal-img');
const modalTags  = document.getElementById('modal-tags');
const modalTitle = document.getElementById('modal-title');
const modalDesc  = document.getElementById('modal-desc');
const modalLive  = document.getElementById('modal-live');
const modalGH    = document.getElementById('modal-github');

function openModal(card) {
    modalImg.src  = card.querySelector('.card-img img').src;
    modalImg.alt  = card.getAttribute('data-title');
    modalTitle.textContent = card.getAttribute('data-title');
    modalDesc.textContent  = card.getAttribute('data-desc');
    modalLive.href  = card.getAttribute('data-live');
    modalGH.href    = card.getAttribute('data-github');

    // Build tag pills
    const tags = card.getAttribute('data-tags').split(',');
    modalTags.innerHTML = tags.map(t => `<span class="tag">${t.trim()}</span>`).join('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

projectCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
    // Keyboard support
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* --- CONTACT FORM --- */
function handleForm(e) {
    e.preventDefault();
    const btn  = document.getElementById('submit-btn');
    const text = document.getElementById('btn-text');

    btn.disabled = true;
    text.textContent = 'Sending...';
    btn.style.opacity = '0.75';

    // Simulate network request
    setTimeout(() => {
        text.textContent = '✓ Message Sent!';
        btn.style.opacity = '1';
        btn.style.background = '#10B981';
        e.target.reset();

        setTimeout(() => {
            text.textContent = 'Send Message';
            btn.style.background = '';
            btn.disabled = false;
        }, 3500);
    }, 1500);
}

/* --- ACTIVE NAV LINK (highlight on scroll) --- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => {
                a.style.color = '';
                if (a.getAttribute('href') === '#' + entry.target.id) {
                    a.style.color = 'var(--accent)';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));