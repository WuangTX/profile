// Exact Figma Recreation - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load placeholder images if Figma assets don't load
    loadFallbackImages();
    
    // Setup interactions
    setupContactButton();
    setupNavigation();
    setupSmoothScroll();
    
    // Add hover effects
    addHoverEffects();
    
    // Initialize skill animations
    initSkillAnimations();
    
    // Check if we need to scroll to a specific section
    checkScrollTarget();
});

// Load fallback images if Figma assets fail
function loadFallbackImages() {
    // Check profile image
    const profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.onerror = function() {
            console.log('Profile image failed to load, using placeholder');
            this.src = createPlaceholderImage(200, 200, 'Profile', '#333', '#FFE97B');
        };
    }
    
    // Check hero image
    const heroImg = document.querySelector('.hero-image img');
    if (heroImg) {
        heroImg.onerror = function() {
            console.log('Hero image failed to load, using placeholder');
            this.src = createPlaceholderImage(686, 938, 'Developer', '#444', '#FFE97B');
        };
    }
    
    // Handle SVG fallbacks only on error
    const svgImages = document.querySelectorAll('img[src*=".svg"]');
    svgImages.forEach(img => {
        img.onerror = function() {
            console.log('SVG failed to load:', this.src);
            // Create a simple colored div as fallback for SVGs
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, #FFE97B, #333);
                border-radius: 4px;
            `;
            this.parentNode.replaceChild(fallback, this);
        };
    });
}

// Create placeholder image using canvas
function createPlaceholderImage(width, height, text, bgColor = '#333', textColor = '#FFE97B') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Text
    ctx.fillStyle = textColor;
    ctx.font = `${Math.min(width, height) / 8}px 'Be Vietnam Pro', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    
    return canvas.toDataURL();
}

// Setup contact button functionality
function setupContactButton() {
    const contactButton = document.querySelector('.contact-elip');
    if (contactButton) {
        // Check if it's a link or should scroll
        const contactLink = contactButton.querySelector('a');
        if (!contactLink) {
            contactButton.addEventListener('click', function() {
                // Scroll to about section or show contact info
                const aboutSection = document.querySelector('.about-title-container');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        }
        
        // Add hover effect
        contactButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        contactButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Setup navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.navbar-frame > div');
    
    navItems.forEach(item => {
        // Only add click event if there's no link inside
        const link = item.querySelector('a');
        if (!link) {
            item.addEventListener('click', function() {
                const text = this.textContent.trim().toLowerCase();
                scrollToSection(text);
            });
        }
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            if (!link) {
                this.style.color = '#FFE97B';
                this.style.transform = 'scale(1.1)';
                this.style.transition = 'all 0.3s ease';
                this.style.cursor = 'pointer';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!link) {
                this.style.color = '#ffffff';
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// Setup smooth scroll for all anchor links
function setupSmoothScroll() {
    // Smooth scroll for navigation links
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
    
    // Handle navigation clicks with smooth scroll
    const navLinks = document.querySelectorAll('.navbar-frame a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a hash link for current page
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Check if we need to scroll to a specific section (when coming from contact page)
function checkScrollTarget() {
    const targetSection = sessionStorage.getItem('scrollToSection');
    if (targetSection) {
        // Clear the stored target
        sessionStorage.removeItem('scrollToSection');
        
        // Wait a bit for page to load then scroll
        setTimeout(() => {
            const target = document.querySelector(`#${targetSection}`);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 500);
    }
}

// Scroll to specific sections
function scrollToSection(sectionName) {
    let target;
    
    switch(sectionName) {
        case 'home':
            target = document.querySelector('.main-title-container') || document.querySelector('.contact-hero-section');
            break;
        case 'about':
            target = document.querySelector('.about-title-container') || document.querySelector('.contact-info-section');
            break;
        case 'skill':
            target = document.querySelector('.skills-title-container') || document.querySelector('.contact-form-section');
            break;
        case 'contact':
            target = document.querySelector('.contact-elip') || document.querySelector('.contact-hero-section');
            break;
        default:
            target = document.querySelector('.main-title-container') || document.querySelector('.contact-hero-section');
    }
    
    if (target) {
        target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Add hover effects to various elements
function addHoverEffects() {
    // Stats hover effects
    const statBoxes = document.querySelectorAll('[class^="stat-"]');
    statBoxes.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Profile image hover effect
    const profileImg = document.querySelector('.profile-image');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Hero image hover effect
    const heroImg = document.querySelector('.hero-image');
    if (heroImg) {
        heroImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        heroImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Add smooth scroll behavior for the whole page
document.documentElement.style.scrollBehavior = 'smooth';

// Add a simple fade-in animation on load
window.addEventListener('load', function() {
    const container = document.querySelector('.desktop-1');
    if (container) {
        container.style.opacity = '0';
        container.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case '1':
            scrollToSection('home');
            break;
        case '2':
            scrollToSection('about');
            break;
        case '3':
            scrollToSection('skill');
            break;
        case '4':
            scrollToSection('contact');
            break;
    }
});

// Simple parallax effect for background elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.background-image, .hero-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Console message
console.log('🎨 Figma Design Recreation Loaded Successfully!');
console.log('📐 Exact positioning and styling applied');
console.log('🖼️ Image assets loaded from Figma localhost server');
console.log('⌨️ Use keys 1-4 to navigate sections');
