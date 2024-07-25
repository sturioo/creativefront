// Zmiana wyglądu nagłówka przy przewijaniu
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Obsługa menu mobilnego
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', function () {
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
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Zbierz dane formularza
        const formData = new FormData(this);

        // Wyślij dane do Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                this.reset(); // Zresetuj formularz
            } else {
                alert('Ups! Coś poszło nie tak. Spróbuj ponownie później.');
            }
        }).catch(error => {
            alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
            console.error('Error:', error);
        });
    });
}

// Modal dla projektów w portfolio
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const closeModal = document.querySelector('.close');

portfolioItems.forEach(item => {
    item.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.querySelector('img').src;
    });
});

closeModal.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
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

// Inicjalizacja animacji przy załadowaniu strony
window.addEventListener('load', () => {
    animateCounters();
    animateSkillBars();
});

// Obserwator przecięcia dla sekcji "O nas"
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        animateSkillBars();
        aboutObserver.unobserve(aboutSection);
    }
}, {
    threshold: 0.5
});

aboutObserver.observe(aboutSection);

// Animacja "fadeIn" dla sekcji przy przewijaniu
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Dodaj klasę "active" do aktualnej sekcji w nawigacji
const navLinks = document.querySelectorAll('nav a');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    navObserver.observe(section);
});
// Obsługa kafelków 3D w sekcji O nas
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
        tile.classList.toggle('active');
    });
});
