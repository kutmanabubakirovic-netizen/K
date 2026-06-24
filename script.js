// Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            navMenu.classList.remove('active');
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Portfolio Modal Functions
function openPortfolioModal(image, title, description) {
    const modal = document.getElementById('portfolioModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    modal.style.display = 'block';
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('portfolioModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Contact Form Handler
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name && email && phone && subject && message) {
        // Show success message
        const successMsg = `Спасибо за сообщение!\n\nИмя: ${name}\nEmail: ${email}\nТема: ${subject}\n\nМы получили ваше сообщение и свяжемся с вами в течение 24 часов.`;
        alert(successMsg);
        
        // Reset form
        this.reset();
        
        // Optional: Log form data (in real app, send to server)
        console.log('Форма отправлена:', {name, email, phone, subject, message});
    } else {
        alert('Пожалуйста, заполните все поля помеченные *');
    }
});

// Alert Function
function showAlert(title, message) {
    alert(`${title}\n\n${message}`);
}

// Subscribe Newsletter
function subscribeNewsletter() {
    const input = document.querySelector('.newsletter input');
    const email = input.value;
    
    if (email && email.includes('@')) {
        showAlert('Успешно!', `Вы подписались на рассылку с email: ${email}`);
        input.value = '';
    } else {
        showAlert('Ошибка', 'Пожалуйста, введите корректный email');
    }
}

// Scroll Animation Trigger
window.addEventListener('scroll', () => {
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    // Animate stats on scroll into view
    const statsSection = document.querySelector('.stats');
    if (statsSection && isElementInViewport(statsSection)) {
        animateStats();
    }
});

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight &&
        rect.bottom >= 0
    );
}

// Animate Stats Counter
let statsAnimated = false;
function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    
    const stats = [
        { id: 'stat1', target: 150 },
        { id: 'stat2', target: 89 },
        { id: 'stat3', target: 12 },
        { id: 'stat4', target: 50 }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (!element) return;
        
        const numberElement = element.querySelector('.stat-number');
        let current = 0;
        const increment = stat.target / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(counter);
            }
            
            let displayValue = Math.floor(current);
            if (stat.id === 'stat2') {
                numberElement.textContent = displayValue + '%';
            } else {
                numberElement.textContent = displayValue + '+';
            }
        }, 30);
    });
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const shapes = document.querySelectorAll('.animated-shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Add active class to nav items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Service Cards Click Handler
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add fade-in animation to elements
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = `fadeInUp 0.6s ease-out forwards`;
        }, index * 100);
    });
});

// Add fade-in-up animation
const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(animStyle);

// Typing animation for hero title (optional)
function typewriterEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for lazy animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .team-member, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePortfolioModal();
    }
    
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search functionality
    }
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Console message for fun
console.log('%cDigitalWave', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cСпасибо, что посетили наш сайт!', 'color: #764ba2; font-size: 14px;');
console.log('%cОтправляйте резюме: careers@digitalwave.ru', 'color: #f5576c; font-size: 12px;');

// Dark mode toggle (optional feature)
let darkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    applyDarkMode();
}

function applyDarkMode() {
    if (darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    applyDarkMode();
});
