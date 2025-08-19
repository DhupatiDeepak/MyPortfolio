// script.js
// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Scroll animations (fade / slide)
const fadeElements = document.querySelectorAll('.fade-in');
const slideElements = document.querySelectorAll('.slide-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12 });
fadeElements.forEach((el) => observer.observe(el));
slideElements.forEach((el) => observer.observe(el));

// Floating particles animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
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
document.addEventListener('DOMContentLoaded', createParticles);

// Smooth scrolling for anchor links & close mobile menu
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('light');
    this.innerHTML = document.body.classList.contains('light') ? '<i class="fa-solid fa-sun mr-2"></i> Toggle Theme' : '<i class="fa-solid fa-moon mr-2"></i> Toggle Theme';
});

// Modal for images
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const closeBtn = document.getElementsByClassName("close")[0];

document.querySelectorAll('.cert-img').forEach(img => {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }
});

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}