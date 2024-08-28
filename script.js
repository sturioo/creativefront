// Animacja liczników
const counters = document.querySelectorAll('.stat-number');
const speed = 300; // Zwiększona wartość dla wolniejszej animacji

const animateCounters = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const increment = target / (speed / 1.5);
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            requestAnimationFrame(updateCount);
            observer.unobserve(counter);
        }
    });
};

const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Aktywna nawigacja podczas przewijania
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
    threshold: 0.5
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeSection = entry.target.id;
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${activeSection}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Animacja wejścia elementów
const fadeInElements = document.querySelectorAll('.fade-in');

const fadeInOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px"
};

const fadeInObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.transitionDelay = `${Math.random() * 0.5}s`;
            }
            observer.unobserve(entry.target);
        }
    });
}, fadeInOptions);

fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Walidacja i obsługa formularza
const form = document.getElementById('contactForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm()) {
        // Tutaj można dodać kod do wysyłania formularza, np. za pomocą fetch API
        alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
        form.reset();
    }
});

function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value.trim() === '') {
        setErrorFor(name, 'Imię i nazwisko jest wymagane');
        isValid = false;
    } else {
        setSuccessFor(name);
    }

    if (email.value.trim() === '') {
        setErrorFor(email, 'Email jest wymagany');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        setErrorFor(email, 'Podaj poprawny adres email');
        isValid = false;
    } else {
        setSuccessFor(email);
    }

    if (message.value.trim() === '') {
        setErrorFor(message, 'Wiadomość jest wymagana');
        isValid = false;
    } else {
        setSuccessFor(message);
    }

    return isValid;
}

function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    formGroup.className = 'form-group error';
    if (small) {
        small.innerText = message;
    } else {
        const errorMessage = document.createElement('small');
        errorMessage.innerText = message;
        formGroup.appendChild(errorMessage);
    }
}

function setSuccessFor(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    const small = formGroup.querySelector('small');
    if (small) {
        small.remove();
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Animacja dla sekcji "O nas"
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// Animacja dla sekcji "Nasze usługi"
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Animacja dla portfolio
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));
