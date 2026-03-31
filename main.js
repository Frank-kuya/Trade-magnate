document.addEventListener('DOMContentLoaded', () => {
    // ===== RIPPLE EFFECT ON BUTTONS =====
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ===== WATER RIPPLE ANIMATION ON CTA =====
    const ctaBubble = document.querySelector('.cta-ripple .water-ripple');
    if (ctaBubble) {
        const animateDrop = () => {
            const droplet = document.createElement('span');
            const box = ctaBubble.getBoundingClientRect();
            const x = Math.random() * box.width;
            const y = Math.random() * box.height;

            droplet.style.left = `${x}px`;
            droplet.style.top = `${y}px`;
            droplet.style.width = droplet.style.height = `${12 + Math.random() * 18}px`;

            ctaBubble.appendChild(droplet);

            setTimeout(() => droplet.remove(), 1400);
        };

        setInterval(animateDrop, 500);
    }

    // ===== WATER RIPPLE ANIMATION ON TECH STACK BANNER =====
    const techStackRipple = document.querySelector('.tech-stack-ripple .water-ripple');
    if (techStackRipple) {
        const animateBannerRipple = () => {
            const droplet = document.createElement('span');
            const box = techStackRipple.getBoundingClientRect();
            const x = Math.random() * box.width;
            const y = Math.random() * box.height;

            droplet.style.left = `${x}px`;
            droplet.style.top = `${y}px`;
            droplet.style.width = droplet.style.height = `${15 + Math.random() * 20}px`;

            techStackRipple.appendChild(droplet);

            setTimeout(() => droplet.remove(), 1400);
        };

        setInterval(animateBannerRipple, 600);
    }

// ===== THEME MANAGEMENT (forced bright theme) =====
    const themeBtn = document.querySelector('.theme-toggle');
    const toggleIcon = themeBtn ? themeBtn.querySelector('i') : null;

    const currentTheme = 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeBtn) {
        themeBtn.style.display = 'none';
    }
    if (toggleIcon) {
        toggleIcon.className = 'fa-solid fa-sun';
    }

    function updateThemeIcon(theme) {
        if (!toggleIcon) return;
        toggleIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // ===== HEADER SCROLL STATE =====
    const header = document.querySelector('header');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            updateMenuIcon();
        });

        // Close menu on link click or outside click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                updateMenuIcon();
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('header')) {
                navLinks.classList.remove('active');
                updateMenuIcon();
            }
        });
    }

    function updateMenuIcon() {
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
            document.body.style.overflow = 'hidden';
        } else {
            icon.className = 'fa-solid fa-bars';
            document.body.style.overflow = '';
        }
    }

    // ===== ACTIVE NAV LINK =====
    const updateActiveNav = () => {
        const navItems = document.querySelectorAll('.nav-links a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };
    
    updateActiveNav();

    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // ===== SMOOTH SCROLL BEHAVIOR =====
    document.documentElement.style.scrollBehavior = 'smooth';

    // ===== PREFERS REDUCED MOTION =====
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
});
