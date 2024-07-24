// Zmiana wyglądu nagłówka przy przewijaniu
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
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
    const sections = document.querySelectorAll('.services, .about, .portfolio, .contact');
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('animate');
        }
    });
}

// Animacja liczników
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 2000; // 2 sekundy
        const increment = target / (duration / 16); // 60 FPS

        function updateCount() {
            if (count < target) {
                count += increment;
                counter.textContent = Math.round(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        }

        updateCount();
    });
}

// Animacja pasków umiejętności
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
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

// Inicjalizacja animacji
window.addEventListener('load', () => {
    handleScrollAnimations();
    animateCounters();
    animateSkillBars();
    addExtraAnimations();
});

window.addEventListener('scroll', handleScrollAnimations);

// Obsługa formularza kontaktowego
document.querySelector('.contact-form').addEventListener('submit', function(e) {
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
    // Na potrzeby tego przykładu, wyświetlimy alert z zebranymi danymi
    const formData = {
        name,
        email,
        phone,
        message,
        services
    };

    console.log('Dane z formularza:', formData);
    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');

    // Zresetuj formularz
    this.reset();
});

// Dodatkowe animacje dla elementów strony
function addExtraAnimations() {
    // Animacja dla elementów usług
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Animacja dla elementów portfolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 200 * index);
    });
}

// Obsługa efektu parallax dla sekcji hero
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Animacja dla liczb w sekcji "O nas"
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // 2 sekundy
        const interval = duration / target;

        const counter = setInterval(() => {
            count++;
            number.textContent = count;
            if (count === target) {
                clearInterval(counter);
            }
        }, interval);
    });
}

// Wywołaj animację liczb, gdy sekcja "O nas" jest widoczna
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateNumbers();
        observer.unobserve(aboutSection);
    }
});
observer.observe(aboutSection);

// Dodaj efekt hover dla przycisków
const buttons = document.querySelectorAll('button, .btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Dodaj animację dla logo
const logo = document.querySelector('.logo');
logo.addEventListener('mouseover', () => {
    logo.style.transform = 'scale(1.1)';
});
logo.addEventListener('mouseout', () => {
    logo.style.transform = 'scale(1)';
});
