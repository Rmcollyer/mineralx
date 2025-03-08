/**
 * MineralX - Main JavaScript
 * Handles animations, interactions, and scroll effects
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading animation
    initLoadingAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize revenue projection chart
    initRevenueChart();
    
    // Add pitch deck to navigation
    addPitchDeckToNav();
});

/**
 * Loading Animation
 * Shows a loading screen when the page first loads
 */
function initLoadingAnimation() {
    // Hide loading overlay after 2.5 seconds
    setTimeout(() => {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            
            // Remove from DOM after transition completes
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }, 2500);
}

/**
 * Scroll Animations
 * Reveals elements as they enter the viewport
 */
function initScrollAnimations() {
    // Intersection Observer configuration
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stop observing after element is visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with reveal-on-scroll class
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .timeline-item');
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Header Scroll Effect
 * Changes header appearance when scrolling down
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Form Handling
 * Handles newsletter form submission
 */
function initFormHandling() {
    const newsletterForm = document.querySelector('.newsletter-form form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = e.target.querySelector('input[type="text"]');
            const emailInput = e.target.querySelector('input[type="email"]');
            
            if (nameInput.value && emailInput.value) {
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                
                // Clear form
                nameInput.value = '';
                emailInput.value = '';
                
                // Here you would typically send data to a server
                console.log('Newsletter signup:', {
                    name: nameInput.value,
                    email: emailInput.value
                });
            }
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Parallax Effect for Hero Section
 */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    }
});

/**
 * Revenue Projection Chart
 * Initializes the bar chart in the revenue projection section
 */
function initRevenueChart() {
    // Set initial height to 0 to enable animation
    document.querySelectorAll('.bar').forEach(bar => {
        const height = bar.getAttribute('data-height');
        bar.style.setProperty('--data-height', height);
        bar.style.height = '0';
    });
    
    // Add animation when chart becomes visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const revenueProjection = document.querySelector('.revenue-projection');
                if (revenueProjection) {
                    revenueProjection.classList.add('visible');
                    
                    // Animate bars with slight delay between each
                    const bars = document.querySelectorAll('.bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.height = `${bar.getAttribute('data-height')}%`;
                        }, index * 150);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const revenueSection = document.querySelector('.revenue-projection');
    if (revenueSection) {
        observer.observe(revenueSection);
    }
}

/**
 * Add Pitch Deck to Navigation
 * Adds the pitch deck link to the navigation menu
 */
function addPitchDeckToNav() {
    const navLinks = document.querySelector('.nav-links');
    const roadmapLink = document.querySelector('.nav-links a[href="#roadmap"]');
    
    if (navLinks && roadmapLink) {
        const pitchDeckLink = document.createElement('a');
        pitchDeckLink.href = '#pitch-deck';
        pitchDeckLink.textContent = 'Invest';
        
        navLinks.insertBefore(pitchDeckLink, roadmapLink);
    }
}

/**
 * Data Decorations Animation
 * Adds random movement to the decorative data elements
 */
function animateDataDecorations() {
    const decorations = document.querySelectorAll('.data-decoration');
    
    decorations.forEach(decoration => {
        // Get current position
        const computedStyle = window.getComputedStyle(decoration);
        let top = parseInt(computedStyle.top);
        let left = parseInt(computedStyle.left);
        
        // Add small random movement
        const topChange = Math.random() * 2 - 1; // -1 to 1
        const leftChange = Math.random() * 2 - 1; // -1 to 1
        
        decoration.style.top = `${top + topChange}px`;
        decoration.style.left = `${left + leftChange}px`;
    });
    
    // Continue animation
    requestAnimationFrame(animateDataDecorations);
}

// Start data decoration animation
requestAnimationFrame(animateDataDecorations);
