// ========================================
// COMPLETE PORTFOLIO JAVASCRIPT - CONSOLIDATED
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Respect saved theme preference first
    const savedThemePref = localStorage.getItem('theme');
    const body = document.body;
    if (savedThemePref === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else if (savedThemePref === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        // Default to dark-mode if nothing saved
        if (!body.classList.contains('light-mode') && !body.classList.contains('dark-mode')) {
            body.classList.add('dark-mode');
        }
    }

    // Helper to remove all color theme classes
    function clearColorThemes() {
        body.classList.remove(
            'color-theme-blue', 'color-theme-green', 'color-theme-red',
            'color-theme-orange', 'color-theme-pink', 'color-theme-cyan',
            'color-theme-indigo', 'color-theme-teal', 'color-theme-violet',
            'color-theme-emerald', 'color-theme-rose'
        );
    }

    // Apply saved color theme only in dark mode
    const savedColorTheme = localStorage.getItem('selectedColorTheme');
    if (body.classList.contains('dark-mode')) {
        if (savedColorTheme && savedColorTheme !== 'purple') {
            body.classList.add(`color-theme-${savedColorTheme}`);
        }
    } else {
        clearColorThemes();
    }

    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        // Mobile Menu Toggle
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
            body.classList.toggle('menu-open');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                body.classList.remove('menu-open');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
            body.classList.remove('menu-open');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // ========================================
    // THEME TOGGLE (Desktop & Mobile)
    // ========================================
    
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        
        const toggles = [themeToggle, themeToggleMobile].filter(Boolean);
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const bodyEl = document.body;
                const goingLight = !bodyEl.classList.contains('light-mode');

                bodyEl.classList.toggle('light-mode');
                bodyEl.classList.toggle('dark-mode');

                // If switching to light, force-remove any color themes (light mode is fixed gold)
                if (goingLight) {
                    bodyEl.classList.remove(
                        'color-theme-blue', 'color-theme-green', 'color-theme-red',
                        'color-theme-orange', 'color-theme-pink', 'color-theme-cyan',
                        'color-theme-indigo', 'color-theme-teal', 'color-theme-violet',
                        'color-theme-emerald', 'color-theme-rose'
                    );
                } else {
                    // Switching back to dark: re-apply saved theme if any
                    const saved = localStorage.getItem('selectedColorTheme');
                    if (saved && saved !== 'purple') {
                        bodyEl.classList.add(`color-theme-${saved}`);
                    }
                }
                
                const icon = this.querySelector('i');
                if (icon) {
                    if (document.body.classList.contains('light-mode')) {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    } else {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    }
                }
                
                // Save preference
                localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
            });
        });
    }
    setupThemeToggle();

    // ========================================
    // COLOR PICKER (Desktop & Mobile)
    // ========================================
    
    function setupColorPicker() {
        const colorPickerBtn = document.getElementById('color-picker-btn');
        const colorPickerBtnMobile = document.getElementById('color-picker-btn-mobile');
        const colorPickerModal = document.getElementById('colorPickerModal');
        const closeColorPicker = document.getElementById('closeColorPicker');
        const colorOptions = document.querySelectorAll('.color-option');
        
        const openBtns = [colorPickerBtn, colorPickerBtnMobile].filter(Boolean);
        
        // Open color picker modal
        openBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (colorPickerModal) {
                    colorPickerModal.classList.remove('hidden');
                    colorPickerModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close color picker modal
        if (closeColorPicker) {
            closeColorPicker.addEventListener('click', () => {
                if (colorPickerModal) {
                    colorPickerModal.classList.add('hidden');
                    colorPickerModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Close modal when clicking outside
        if (colorPickerModal) {
            colorPickerModal.addEventListener('click', (e) => {
                if (e.target === colorPickerModal) {
                    colorPickerModal.classList.add('hidden');
                    colorPickerModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Color theme selection
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;

                // Always persist choice
                localStorage.setItem('selectedColorTheme', color);

                // Apply only if in dark mode
                const bodyEl = document.body;
                bodyEl.classList.remove(
                    'color-theme-blue', 'color-theme-green', 'color-theme-red',
                    'color-theme-orange', 'color-theme-pink', 'color-theme-cyan',
                    'color-theme-indigo', 'color-theme-teal', 'color-theme-violet',
                    'color-theme-emerald', 'color-theme-rose'
                );
                if (bodyEl.classList.contains('dark-mode') && color !== 'purple') {
                    bodyEl.classList.add(`color-theme-${color}`);
                }

                // Update selected state visual
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Close modal
                if (colorPickerModal) {
                    colorPickerModal.classList.add('hidden');
                    colorPickerModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Set default selected state
        const savedTheme = localStorage.getItem('selectedColorTheme');
        if (savedTheme) {
            colorOptions.forEach(opt => {
                if (opt.dataset.color === savedTheme) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });
        } else if (colorOptions[0]) {
            colorOptions[0].classList.add('selected');
        }
    }
    setupColorPicker();

    // ========================================
    // SMOOTH SCROLLING & MOBILE MENU CLOSE
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({ 
                        top: targetElement.offsetTop - 80, 
                        behavior: 'smooth' 
                    });
                    
                    // Close mobile menu
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('active');
                        body.classList.remove('menu-open');
                        const icon = menuToggle?.querySelector('i');
                        if (icon) {
                            icon.classList.add('fa-bars');
                            icon.classList.remove('fa-times');
                        }
                    }
                }
            }
        });
    });

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.12 }
    );
    
    fadeElements.forEach(el => observer.observe(el));
    slideElements.forEach(el => observer.observe(el));

    // Project cards staggered animation
    document.querySelectorAll('.project-card').forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 150);
    });

    // ========================================
    // FLOATING PARTICLES
    // ========================================
    
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            const particleCount = 30;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                const duration = Math.random() * 20 + 10;
                particle.style.setProperty('--float-duration', `${duration}s`);
                particle.style.setProperty('--float-delay', `${Math.random() * 10}s`);
                particlesContainer.appendChild(particle);
            }
        }
    }
    createParticles();

    // ========================================
    // STARFIELD ANIMATION
    // ========================================
    
    function createStars() {
        const starfield = document.querySelector('.starfield');
        if (starfield) {
            const starCount = 100;
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.width = `${Math.random() * 2 + 1}px`;
                star.style.height = star.style.width;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.setProperty('--twinkle-duration', `${Math.random() * 5 + 5}s`);
                star.style.setProperty('--twinkle-delay', `${Math.random() * 5}s`);
                starfield.appendChild(star);
            }
        }
    }
    createStars();

    // ========================================
    // AWARDS CAROUSEL
    // ========================================
    
    const carousels = document.querySelectorAll('.card-carousel');
    carousels.forEach(carousel => {
        let images = carousel.querySelectorAll('img');
        let currentIndex = 0;
        let intervalId;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            if (images[index]) images[index].classList.add('active');
            currentIndex = index;
        }

        function startAutoSlide() {
            intervalId = setInterval(() => {
                showImage((currentIndex + 1) % images.length);
            }, 4000);
        }

        function stopAutoSlide() {
            clearInterval(intervalId);
        }

        if (images.length > 0) {
            showImage(0);
            startAutoSlide();
            
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
            
            images.forEach(img => {
                img.addEventListener('click', (e) => e.stopPropagation());
            });
        }
    });

    // Awards horizontal scroll arrows
    const awardsTrack = document.getElementById('awardsTrack');
    const awardsPrev = document.getElementById('awardsPrev');
    const awardsNext = document.getElementById('awardsNext');

    function updateArrowState() {
        if (!awardsTrack || !awardsPrev || !awardsNext) return;
        const scrollLeft = awardsTrack.scrollLeft;
        const maxScroll = awardsTrack.scrollWidth - awardsTrack.clientWidth;
        awardsPrev.disabled = scrollLeft <= 0;
        awardsNext.disabled = scrollLeft >= maxScroll - 1;
    }

    function getScrollAmount() {
        const firstCard = awardsTrack?.querySelector('.award-card');
        return firstCard ? firstCard.getBoundingClientRect().width + 24 : 280;
    }

    if (awardsPrev && awardsNext && awardsTrack) {
        awardsPrev.addEventListener('click', () => {
            awardsTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            setTimeout(updateArrowState, 300);
        });

        awardsNext.addEventListener('click', () => {
            awardsTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            setTimeout(updateArrowState, 300);
        });

        awardsTrack.addEventListener('scroll', updateArrowState);
        updateArrowState();
    }

    // ========================================
    // MODAL LOGIC (Certificates & Awards)
    // ========================================
    
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = modal?.querySelector('button[onclick="closeModal()"]');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let modalImages = [];
    let modalIndex = 0;

    function openModal(images, index) {
        if (modal && modalImg) {
            modal.classList.remove('hidden');
            modalImages = Array.from(images);
            modalIndex = index;
            showModalImage();
            document.body.style.overflow = 'hidden';
            modal.focus();
            updateModalArrowState();
        }
    }

    function showModalImage() {
        if (modalImg && modalImages[modalIndex]) {
            modalImg.src = modalImages[modalIndex].src;
            modalImg.alt = modalImages[modalIndex].alt || 'Expanded image';
        }
    }

    function updateModalArrowState() {
        if (prevBtn && nextBtn) {
            prevBtn.disabled = modalImages.length <= 1 || modalIndex === 0;
            nextBtn.disabled = modalImages.length <= 1 || modalIndex === modalImages.length - 1;
        }
    }

    // Global functions for inline onclick handlers
    window.openModal = function(imageSrc) {
        if (modal && modalImg) {
            openModal([{ src: imageSrc, alt: 'Certificate or Award' }], 0);
        }
    };

    window.openAwardModal = function(card) {
        if (modal && modalImg) {
            const images = card.querySelectorAll('.card-carousel img');
            openModal(images, 0);
        }
    };

    window.closeModal = function() {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    // Event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (modalImages.length > 0) {
                modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
                showModalImage();
                updateModalArrowState();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (modalImages.length > 0) {
                modalIndex = (modalIndex + 1) % modalImages.length;
                showModalImage();
                updateModalArrowState();
            }
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('hidden')) {
                if (e.key === 'Escape') {
                    modal.classList.add('hidden');
                    document.body.style.overflow = '';
                } else if (e.key === 'ArrowLeft' && !prevBtn?.disabled) {
                    if (modalImages.length > 0) {
                        modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
                        showModalImage();
                        updateModalArrowState();
                    }
                } else if (e.key === 'ArrowRight' && !nextBtn?.disabled) {
                    if (modalImages.length > 0) {
                        modalIndex = (modalIndex + 1) % modalImages.length;
                        showModalImage();
                        updateModalArrowState();
                    }
                }
            }
        });
    }

    // ========================================
    // CONTACT FORM (EmailJS)
    // ========================================
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_9h1mavu', 'template_2oli97l', formData)
                    .then(() => {
                        alert('Message sent successfully!');
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error('EmailJS error:', error);
                        alert('Failed to send message. Please try again later.');
                    });
            } else {
                alert('Email service not loaded. Please try again later.');
            }
        });
    }
});