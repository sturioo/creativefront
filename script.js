'use strict';

function initWebsite() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const counters = document.querySelectorAll('.stat-number');
    const skillBars = document.querySelectorAll('.skill-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.querySelector('.close');
    const contactForm = document.querySelector('.contact-form');

    // Obsługa przewijania i zmiana wyglądu nagłówka
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    });

    // Obsługa menu mobilnego
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded',
            hamburger.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });

    // Animacja liczników
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 sekundy na animację
            const step = target / (duration / 16); // 60 fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.round(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Animacja pasków umiejętności
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // Obsługa przewijania do sekcji
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Obsługa formularza kontaktowego
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
                    this.reset();
                } else {
                    throw new Error('Coś poszło nie tak');
                }
            } catch (error) {
                alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
                console.error('Error:', error);
            }
        });
    }

    // Obsługa modalu dla projektów w portfolio
    function setupPortfolioModal() {
        portfolioItems.forEach(item => {
            item.addEventListener('click', function () {
                modal.style.display = "block";
                modalImg.src = this.querySelector('img').src;
                modalImg.alt = this.querySelector('img').alt;
            });
        });

        closeModal.onclick = () => {
            modal.style.display = "none";
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    // Nowa funkcja do obsługi kafelków
    function setupTiles() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.addEventListener('click', () => {
                tile.classList.toggle('active');
            });
        });
    }

    // Obserwator przecięcia dla sekcji
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.id === 'about') {
                    animateCounters();
                    animateSkillBars();
                }
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });

    // Dodaj klasę "active" do aktualnej sekcji w nawigacji
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').slice(1) === entry.target.id);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Inicjalizacja wszystkich funkcji
    setupPortfolioModal();
    setupTiles(); // Dodane wywołanie nowej funkcji
}

// Uruchomienie inicjalizacji po załadowaniu strony
document.addEventListener('DOMContentLoaded', initWebsite);
