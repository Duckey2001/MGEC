// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
// Set active class based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// CONTACT FORM VALIDATION (only on contact page)
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex (basic - allows international formats)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;

    function validateEmail(email) {
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        if (!phone) return true; // Phone is optional
        return phoneRegex.test(phone);
    }

    function showError(input, show) {
        const formGroup = input.parentElement;
        if (show) {
            formGroup.classList.add('error');
        } else {
            formGroup.classList.remove('error');
        }
    }

    // Real-time validation
    emailInput.addEventListener('blur', () => {
        showError(emailInput, !validateEmail(emailInput.value));
    });

    phoneInput.addEventListener('blur', () => {
        showError(phoneInput, !validatePhone(phoneInput.value));
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, true);
            isValid = false;
        } else {
            showError(nameInput, false);
        }

        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, true);
            isValid = false;
        } else {
            showError(emailInput, false);
        }

        // Validate phone (optional)
        if (phoneInput.value && !validatePhone(phoneInput.value)) {
            showError(phoneInput, true);
            isValid = false;
        } else {
            showError(phoneInput, false);
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, true);
            isValid = false;
        } else {
            showError(messageInput, false);
        }

        if (isValid) {
            // Form is valid - show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            
            // In production, you would send this data to a backend
            // Example: fetch('/api/contact', { method: 'POST', body: formData })
        }
    });
}

// ============================================
// ANIMATION ON SCROLL (Simple fade-in)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.about-card, .service-card, .product-card, .project-card, .partner-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
