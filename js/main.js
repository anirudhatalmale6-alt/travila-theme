/* ============================================
   TRAVILA — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Theme Toggle ----
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('travila-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('travila-theme', next);
    });

    // ---- Header Scroll ----
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    });

    // ---- Mobile Navigation ----
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // ---- Active Nav on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ---- Search Tab Switching ----
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // ---- Filter Buttons ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ---- Testimonials Slider ----
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    const dots = document.querySelectorAll('.test-dot');
    let currentSlide = 0;
    const totalSlides = dots.length;

    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;

        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });

    // Auto-advance testimonials
    let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

    // Pause on hover
    const sliderEl = document.querySelector('.testimonials-slider');
    sliderEl.addEventListener('mouseenter', () => clearInterval(autoSlide));
    sliderEl.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });

    // ---- Countdown Timer ----
    function updateTimer() {
        // Set deadline 12 days from now
        const now = new Date();
        const deadline = new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000);

        // Use a fixed offset based on page load time
        if (!window._timerDeadline) {
            window._timerDeadline = deadline;
        }

        const diff = window._timerDeadline - new Date();
        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('timerDays');
        const hoursEl = document.getElementById('timerHours');
        const minsEl = document.getElementById('timerMins');
        const secsEl = document.getElementById('timerSecs');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    // ---- Counter Animation ----
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        counters.forEach(counter => {
            if (counter.dataset.counted) return;

            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString();
                    counter.dataset.counted = 'true';
                }
            };

            update();
        });
    }

    // ---- Scroll Animations ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.delay || 0);

                setTimeout(() => {
                    el.classList.add('animated');
                }, delay);

                // Trigger counter animation when counter row is visible
                if (el.closest('.counter-row') || el.querySelector('.counter-number')) {
                    setTimeout(animateCounters, delay + 200);
                }

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // ---- Back to Top ----
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Newsletter Form ----
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input.value) {
            // Backend integration point
            alert('Thank you for subscribing! You will receive our latest updates.');
            input.value = '';
        }
    });

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 4}px;
                height: ${3 + Math.random() * 4}px;
                background: var(--primary);
                border-radius: 50%;
                opacity: ${0.1 + Math.random() * 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add float keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-10px) translateX(-10px); }
                75% { transform: translateY(-30px) translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }

    // ---- Wishlist Heart Toggle ----
    document.querySelectorAll('.tour-heart').forEach(heart => {
        heart.addEventListener('click', () => {
            heart.classList.toggle('active');
            const svg = heart.querySelector('svg');
            if (heart.classList.contains('active')) {
                svg.setAttribute('fill', 'currentColor');
                heart.style.background = 'var(--accent-rose)';
            } else {
                svg.setAttribute('fill', 'none');
                heart.style.background = 'rgba(255,255,255,0.2)';
            }
        });
    });

    // ---- Smooth anchor scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
