document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu');
        menu?.classList.toggle('hidden');
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        },
        { threshold: 0.12 }
    );
    fadeElements.forEach((el) => observer.observe(el));
    slideElements.forEach((el) => observer.observe(el));

    // Project cards animation
    document.querySelectorAll('.project-card').forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 150);
    });

    // Floating particles animation
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
                particle.style.animation = `float ${duration}s linear infinite`;
                particle.style.animationDelay = `${Math.random() * 10}s`;
                particlesContainer.appendChild(particle);
                const keyframes = `@keyframes float { 0% { transform: translate(0,0) rotate(0deg); opacity: 1; } 100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg); opacity: 0; } }`;
                const style = document.createElement('style');
                style.innerHTML = keyframes;
                document.head.appendChild(style);
            }
        }
    }
    createParticles();

    // Smooth scrolling for anchor links & close mobile menu
    document.querySelectorAll('a[href^="#"]')?.forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Award card carousels - automatic image slider for each card
    const carousels = document.querySelectorAll('.card-carousel');
    carousels.forEach((carousel) => {
        let images = carousel.querySelectorAll('img');
        let currentIndex = 0;
        let intervalId;

        function showImage(index) {
            images.forEach((img) => img.classList.remove('active'));
            images[index].classList.add('active');
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

        startAutoSlide();

        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        images.forEach((img) => {
            img.addEventListener('click', (e) => e.stopPropagation());
        });
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

    // Modal Logic (for Certificates and Awards)
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

    window.openModal = function (imageSrc) {
        if (modal && modalImg) {
            openModal([{ src: imageSrc, alt: 'Certificate or Award' }], 0);
        }
    };

    window.openAwardModal = function (card) {
        if (modal && modalImg) {
            const images = card.querySelectorAll('.card-carousel img');
            openModal(images, 0);
        }
    };

    window.closeModal = function () {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

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
                } else if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
                    if (modalImages.length > 0) {
                        modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
                        showModalImage();
                        updateModalArrowState();
                    }
                } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
                    if (modalImages.length > 0) {
                        modalIndex = (modalIndex + 1) % modalImages.length;
                        showModalImage();
                        updateModalArrowState();
                    }
                }
            }
        });
    }

   // EmailJS functionality
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Initialize EmailJS with your public key
        emailjs.init('X-ud7RB3C-r97TyLR'); // Replace with your EmailJS public key

        // Prepare form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Send email using EmailJS
        emailjs.send('service_9h1mavu', 'template_2oli97l', formData)
            .then(() => {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                alert('Failed to send message. Please try again later.');
            });
    });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

});