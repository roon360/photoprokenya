// Configuration
const WHATSAPP_NUMBER = '254792265306'; // Replace with actual WhatsApp number

// WhatsApp Message Templates
const messageTemplates = {
    hero: 'Hi! I want to transform my photos. Can you help me?',
    services: 'Hi! I\'d like to know more about your photo editing services.',
    process: 'Hi! I\'m ready to get started with photo editing.',
    pricing: (packageName) => `Hi! I\'m interested in the ${packageName} package. Can we discuss?`,
    final: 'Hi! I need professional photo editing services. Let\'s talk!'
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButtons();
    initFAQ();
    initScrollAnimations();
    initSmoothScroll();
    initHeaderScroll();
});

// WhatsApp Button Handlers
function initWhatsAppButtons() {
    // Hero WhatsApp button
    const heroBtn = document.getElementById('heroWhatsappBtn');
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp(messageTemplates.hero);
        });
    }

    // Services WhatsApp button
    const servicesBtn = document.getElementById('servicesWhatsappBtn');
    if (servicesBtn) {
        servicesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp(messageTemplates.services);
        });
    }

    // Process WhatsApp button
    const processBtn = document.getElementById('processWhatsappBtn');
    if (processBtn) {
        processBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp(messageTemplates.process);
        });
    }

    // Final CTA WhatsApp button
    const finalBtn = document.getElementById('finalWhatsappBtn');
    if (finalBtn) {
        finalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp(messageTemplates.final);
        });
    }

    // Pricing package buttons
    const pricingBtns = document.querySelectorAll('.whatsapp-btn');
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const packageName = btn.getAttribute('data-package') || 'a';
            openWhatsApp(messageTemplates.pricing(packageName));
        });
    });

    // Floating WhatsApp button
    const floatingBtn = document.querySelector('.whatsapp-float');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp(messageTemplates.hero);
        });
    }
}

// Open WhatsApp with pre-filled message
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Track conversion (you can add analytics here)
    trackConversion('whatsapp_click', message);
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => observer.observe(card));

    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => observer.observe(card));

    // Observe pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => observer.observe(card));

    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => observer.observe(item));

    // Observe steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => observer.observe(step));
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#" or if it's a WhatsApp button being handled elsewhere
            if (href === '#' || link.classList.contains('whatsapp-btn')) {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });
}

// Conversion Tracking (placeholder - integrate with your analytics)
function trackConversion(event, data) {
    console.log('Conversion:', event, data);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            'event_category': 'engagement',
            'event_label': data
        });
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: data
        });
    }
    
    // You can add other tracking services here
}

// Service Worker Registration (for PWA capabilities - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}

// Performance optimization: Lazy load images (if you add real images)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading if needed
// initLazyLoading();

// Add touch feedback for mobile buttons
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevent zoom on double tap for better UX
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add loading state to buttons when clicked
document.querySelectorAll('a[href], button').forEach(element => {
    element.addEventListener('click', function(e) {
        // Add subtle feedback
        this.style.opacity = '0.8';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 200);
    });
});

// Emergency contact fallback (if WhatsApp fails)
window.addEventListener('error', function(e) {
    if (e.message.includes('WhatsApp')) {
        alert('Having trouble opening WhatsApp? Please call us directly or try again.');
    }
});

// Page visibility tracking (to understand user engagement)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User left page');
    } else {
        console.log('User returned to page');
    }
});

// Track time on page (for optimization)
let pageLoadTime = Date.now();
window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
    console.log(`User spent ${timeOnPage} seconds on page`);
    // You can send this to your analytics
});

// Add entrance animation to hero on load
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Console easter egg for developers
console.log('%cLooking for a developer?', 'color: #FF6B6B; font-size: 20px; font-weight: bold;');
console.log('%cThis site was built with ❤️ for PhotoPro Kenya', 'color: #4ECDC4; font-size: 14px;');

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openWhatsApp,
        trackConversion
    };
}









