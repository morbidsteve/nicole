// ==========================================
// PURELY PLANNED CONSULTING
// Main JavaScript File
// ==========================================

// ==========================================
// NAVIGATION & MOBILE MENU
// ==========================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Only close menu for same-page navigation
        if (link.getAttribute('href').startsWith('#')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');

function highlightNavigation() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// CONTACT FORM HANDLING (Quick Inquiry)
// ==========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone')?.value.trim() || '',
            message: document.getElementById('message').value.trim()
        };

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (Replace with actual API call)
        setTimeout(() => {
            // Success message
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you for contacting Purely Planned Consulting! We will respond within 24 hours.';

            // Reset form
            contactForm.reset();

            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            // Hide message after 7 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 7000);

            // Log form data (for development - remove in production)
            console.log('Quick inquiry submitted:', formData);

            // TODO: Replace with actual form submission
            // Example with FormSpree:
            /*
            try {
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Thank you for contacting Purely Planned Consulting! We will respond within 24 hours.';
                    contactForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Sorry, there was an error sending your message. Please email directly at nicole.mcallister.mgmt@gmail.com';
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
            */
        }, 1500);
    });
}

// ==========================================
// FORM VALIDATION & ENHANCEMENT
// ==========================================

// Prevent empty form submission
const formInputs = document.querySelectorAll('input[required], textarea[required]');
formInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.style.borderColor = '#c00';
    });

    input.addEventListener('input', () => {
        input.style.borderColor = '';
    });
});

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#c00';
            emailInput.setCustomValidity('Please enter a valid email address');
        } else {
            emailInput.style.borderColor = '';
            emailInput.setCustomValidity('');
        }
    });
}

// Phone formatting (US format)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        e.target.value = value;
    });
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .highlight-item');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavigation, 100);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Trap focus in mobile menu when open
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            // Focus first link when menu opens
            setTimeout(() => {
                navLinks[0]?.focus();
            }, 100);
        }
    });
}

// Escape key closes mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.focus();
    }
});

// ==========================================
// PAGE LOAD OPTIMIZATIONS
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('%cPurely Planned Consulting', 'font-size: 20px; font-weight: bold; color: #000;');
    console.log('%cWhite Glove Lifestyle Management', 'font-size: 12px; color: #4a4a4a;');

    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Smooth scroll to top function (can be used for back-to-top button)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { scrollToTop };
}
