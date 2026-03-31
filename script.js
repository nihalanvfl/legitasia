// Carousel functionality
let currentSlideIndex = 1;
let autoSlideTimer;

function changeSlide(n) {
    clearInterval(autoSlideTimer);
    showSlide(currentSlideIndex += n);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(autoSlideTimer);
    showSlide(currentSlideIndex = n);
    startAutoSlide();
}

function showSlide(n) {
    let slides = document.getElementsByClassName('carousel-slide');
    let dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
}

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 8000);
}

// Initialize carousel
showSlide(currentSlideIndex);
startAutoSlide();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const message = this.querySelector('textarea[placeholder="Your Message"]').value;
        
        // Simple validation
        if (name && email && message) {
            // Here you would typically send the data to a server
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you shortly.`);
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #d4a574;
        border-bottom: 2px solid #d4a574;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);
