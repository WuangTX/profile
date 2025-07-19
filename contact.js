// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Vui lòng nhập email hợp lệ!');
            return;
        }
        
        // Simulate form submission
        submitForm(name, email, subject, message);
    });
    
    function submitForm(name, email, subject, message) {
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Đang gửi...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            
            // Log form data (in real app, this would be sent to server)
            console.log('Form submitted:', {
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString()
            });
        }, 2000);
    }
    
    function showSuccessMessage() {
        successMessage.style.display = 'flex';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            hideSuccessMessage();
        }, 3000);
        
        // Click to close
        successMessage.addEventListener('click', function(e) {
            if (e.target === successMessage) {
                hideSuccessMessage();
            }
        });
    }
    
    function hideSuccessMessage() {
        successMessage.style.display = 'none';
    }
    
    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
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
    
    // Handle external navigation links (to index.html with hash)
    document.querySelectorAll('a[href*="index.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const hash = href.split('#')[1];
            
            // Store the target section in sessionStorage
            sessionStorage.setItem('scrollToSection', hash);
            
            // Navigate to index.html
            window.location.href = 'index.html';
        });
    });
    
    // Smooth scroll within contact page for any internal links
    const navLinks = document.querySelectorAll('.navbar-frame a[href*="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a link to index.html with hash
            if (href.includes('index.html#')) {
                e.preventDefault();
                const hash = href.split('#')[1];
                sessionStorage.setItem('scrollToSection', hash);
                window.location.href = 'index.html';
            }
            // If it's just a hash link for current page
            else if (href.startsWith('#')) {
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
    
    // Contact info items hover effect
    const contactInfoItems = document.querySelectorAll('.contact-info-item');
    
    contactInfoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click functionality to contact info items
    contactInfoItems.forEach(item => {
        item.addEventListener('click', function() {
            const details = this.querySelector('.contact-details p').textContent;
            const type = this.querySelector('.contact-details h3').textContent.toLowerCase();
            
            switch(type) {
                case 'email':
                    window.open(`mailto:${details}`, '_blank');
                    break;
                case 'phone':
                    window.open(`tel:${details}`, '_blank');
                    break;
                case 'linkedin':
                    window.open(`https://${details}`, '_blank');
                    break;
                case 'github':
                    window.open(`https://${details}`, '_blank');
                    break;
                default:
                    // For location, you could open Google Maps
                    if (type === 'location') {
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(details)}`, '_blank');
                    }
            }
        });
    });
    
    // Keyboard navigation for form
    contactForm.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const formElements = Array.from(contactForm.elements);
            const currentIndex = formElements.indexOf(e.target);
            const nextElement = formElements[currentIndex + 1];
            
            if (nextElement && nextElement.type !== 'submit') {
                nextElement.focus();
            } else if (nextElement && nextElement.type === 'submit') {
                nextElement.click();
            }
        }
    });
    
    // Add subtle animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.contact-info-item, .contact-form');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility function for copying text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        return new Promise((resolve, reject) => {
            document.execCommand('copy') ? resolve() : reject();
            textArea.remove();
        });
    }
}
