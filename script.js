// Zmiana wyglądu nagłówka przy przewijaniu
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Obsługa menu mobilnego
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
    this.classList.toggle('active');
});

// Animacja liczników
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Animacja pasków umiejętności
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Obsługa przewijania do sekcji
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Obsługa formularza kontaktowego
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Pobierz dane z formularza
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Pobierz zaznaczone usługi
        const services = Array.from(document.querySelectorAll('input[name="service"]:checked'))
            .map(checkbox => checkbox.value);

        // Tutaj możesz dodać kod do wysłania danych na serwer
        console.log('Dane z formularza:', { name, email, phone, message, services });
        alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');

        // Zresetuj formularz
        this.reset();
    });
}

// Obsługa kafelków 3D w sekcji O nas
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
        tile.classList.toggle('active');
    });
});

// Modal dla projektów w portfolio
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const closeModal = document.querySelector('.close');

portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.querySelector('img').src;
    });
});

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Obsługa FAQ
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

// Animacje przy scrollowaniu
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Inicjalizacja animacji przy załadowaniu strony
window.addEventListener('load', () => {
    animateCounters();
    animateSkillBars();
    animateOnScroll();
});

// Animacja dla elementów "Dlaczego warto wybrać CreativeFront?"
const whyUsItems = document.querySelectorAll('.why-us-item');
whyUsItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Obserwator przecięcia dla sekcji "O nas"
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        animateSkillBars();
        aboutObserver.unobserve(aboutSection);
    }
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
