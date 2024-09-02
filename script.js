// Animacje GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero h1, .hero p', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2
});

// Modyfikujemy animację dla sekcji usług
gsap.from('.service-item', {
    scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
        once: true // Animacja wykona się tylko raz
    },
    opacity: 0,
    y: 50,
    duration: 0.5,

    onComplete: () => {
        // Po zakończeniu animacji upewniamy się że wszystkie elementy są widoczne
        gsap.set('.service-item', {
            clearProps: 'all'
        });
    }
});

gsap.from('.portfolio-item', {
    scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 80%'
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.1
});

// Interaktywne kafelki usług
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        icon.classList.toggle('fa-chevron-up');
        icon.classList.toggle('fa-chevron-down');
    });
});

// Menu hamburgerowe
const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Automatyczny slider opinii
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;

function showNextSlide() {
    testimonialSlides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    testimonialSlides[currentSlide].style.display = 'block';
}

// Inicjalizacja pierwszego slajdu
testimonialSlides[0].style.display = 'block';

// Automatyczne przełączanie co 6 sekund
setInterval(showNextSlide, 6000);

// Scrollowanie menu
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter-value');

    counters.forEach(counter => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText;

            const increment = target / 400;

            if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}`;
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 1.0
        });

        observer.observe(counter);
    });
});
