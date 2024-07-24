// Zmiana wyglądu nagłówka przy przewijaniu
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Obsługa menu mobilnego
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('nav');

mobileMenuToggle.addEventListener('click', function () {
    nav.classList.toggle('active');
    this.classList.toggle('active');
});

// Funkcje pomocnicze
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animacje przy przewijaniu
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-item, .portfolio-item, .stat-item, .about-text, .about-image, .skill-item');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

// Poprawiona animacja liczników
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000; // 2 sekundy
        let startTime = null;

        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = Math.round(progress * target);

            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        if (isElementInViewport(counter)) {
            requestAnimationFrame(updateCounter);
        }
    });
}

// Animacja pasków umiejętności
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (isElementInViewport(bar)) {
            bar.style.width = width;
        }
    });
}

// Obsługa przewijania do sekcji
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Obsługa formularza kontaktowego
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Pobierz dane z formularza
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Pobierz zaznaczone usługi
        const services = Array.from(document.querySelectorAll('input[name="service"]:checked'))
            .map(checkbox => checkbox.value);

        // Walidacja formularza
        let isValid = true;

        if (name.trim() === '') {
            showError(document.getElementById('name'), 'Imię jest wymagane');
            isValid = false;
        }

        if (email.trim() === '') {
            showError(document.getElementById('email'), 'Email jest wymagany');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(document.getElementById('email'), 'Podaj prawidłowy adres email');
            isValid = false;
        }

        if (message.trim() === '') {
            showError(document.getElementById('message'), 'Wiadomość jest wymagana');
            isValid = false;
        }

        if (isValid) {
            // Tutaj możesz dodać kod do wysłania danych na serwer
            console.log('Dane z formularza:', {
                name,
                email,
                phone,
                message,
                services
            });
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');

            // Zresetuj formularz
            this.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Animacja dla elementów portfolio przy najechaniu myszką
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    item.addEventListener('mouseleave', () => {
        item.querySelector('.portfolio-overlay').style.opacity = '0';
    });
});

// Lazy loading dla obrazów
const images = document.querySelectorAll('img[data-src]');
const config = {
    rootMargin: '0px 0px 50px 0px',
    threshold: 0
};

let imageObserver = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            preloadImage(entry.target);
            self.unobserve(entry.target);
        }
    });
}, config);

images.forEach(image => {
    imageObserver.observe(image);
});

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
        return;
    }
    img.src = src;
}

// Animacja wprowadzania tekstu
const typingTexts = document.querySelectorAll('.typing-text');
typingTexts.forEach(text => {
    const content = text.textContent;
    text.textContent = '';
    let i = 0;
    const typing = setInterval(() => {
        if (i < content.length) {
            text.textContent += content.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
});

// Dodaj animację dla przycisków
const buttons = document.querySelectorAll('button, .cta-button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const x = e.clientX - button.getBoundingClientRect().left;
        const y = e.clientY - button.getBoundingClientRect().top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Inicjalizacja wszystkich animacji i efektów
window.addEventListener('load', () => {
    handleScrollAnimations();
    animateCounters();
    animateSkillBars();
});

// Nasłuchiwanie zdarzeń scroll dla ciągłej aktualizacji animacji
window.addEventListener('scroll', () => {
    handleScrollAnimations();
    animateSkillBars();
});
