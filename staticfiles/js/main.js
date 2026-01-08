// MarketBrainers Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Initializing MarketBrainers site...');
    
    // ========== PRELOADER FUNCTIONALITY WITH LOADING % ==========
    const preloader = document.getElementById('preloader');
    const percentageElement = document.querySelector('.preloader-percentage');
    const statusElement = document.querySelector('.preloader-status');
    const progressBar = document.querySelector('.preloader-progress-bar');
    
    let loadingProgress = 0;
    let loadingInterval = null;
    
    function updateLoadingProgress() {
        loadingProgress += Math.random() * 15;
        
        // Ensure we don't go over 100%
        if (loadingProgress > 100) {
            loadingProgress = 100;
        }
        
        // Update percentage display
        if (percentageElement) {
            percentageElement.textContent = Math.floor(loadingProgress) + '%';
        }
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = loadingProgress + '%';
        }
        
        // Update status messages
        if (statusElement) {
            const statusMessages = [
                { threshold: 0, message: 'Initializing system...' },
                { threshold: 20, message: 'Loading AI modules...' },
                { threshold: 40, message: 'Preparing analytics...' },
                { threshold: 60, message: 'Optimizing performance...' },
                { threshold: 80, message: 'Finalizing components...' },
                { threshold: 95, message: 'Almost ready...' }
            ];
            
            // Find appropriate message
            for (let i = statusMessages.length - 1; i >= 0; i--) {
                if (loadingProgress >= statusMessages[i].threshold) {
                    statusElement.textContent = statusMessages[i].message;
                    break;
                }
            }
        }
        
        // Stop when we reach 100%
        if (loadingProgress >= 100 && loadingInterval) {
            clearInterval(loadingInterval);
            loadingInterval = null;
        }
    }
    
    function hidePreloader() {
        if (preloader && !preloader.classList.contains('loaded')) {
            console.log('Hiding preloader...');
            
            // Ensure we show 100% before hiding
            if (percentageElement) percentageElement.textContent = '100%';
            if (progressBar) progressBar.style.width = '100%';
            if (statusElement) statusElement.textContent = 'Ready!';
            
            // Stop the loading interval if it's still running
            if (loadingInterval) {
                clearInterval(loadingInterval);
                loadingInterval = null;
            }
            
            // Add slight delay before starting fade out
            setTimeout(() => {
                preloader.classList.add('loaded');
                
                // Remove from DOM after animation completes
                setTimeout(() => {
                    if (preloader && preloader.parentNode) {
                        preloader.style.display = 'none';
                        console.log('Preloader removed from DOM');
                    }
                    
                    // Mark page as loaded for any post-load animations
                    document.body.classList.add('page-loaded');
                    
                    // Trigger any animations that should start after loading
                    const postLoadElements = document.querySelectorAll('.animate-after-load');
                    postLoadElements.forEach(el => {
                        el.classList.add('animate-in');
                    });
                }, 500); // Match CSS transition time
            }, 300);
        }
    }
    
    // Start loading progress animation
    if (percentageElement || progressBar || statusElement) {
        loadingInterval = setInterval(updateLoadingProgress, 150);
    }
    
    // Hide preloader when everything is loaded
    if (document.readyState === 'complete') {
        // Page already loaded
        console.log('Page already loaded, hiding preloader...');
        setTimeout(hidePreloader, 1000); // Brief delay for UX
    } else {
        window.addEventListener('load', function() {
            console.log('Window loaded, hiding preloader...');
            setTimeout(hidePreloader, 800); // Brief delay for UX
        });
    }
    
    // Fallback: Hide preloader after max 3 seconds even if some assets fail
    setTimeout(hidePreloader, 3000);
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animating to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements you want to animate
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    console.log(`Found ${animatedElements.length} elements to animate on scroll`);
    animatedElements.forEach(el => observer.observe(el));
    
    // ========== PARTICLE ANIMATION ==========
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('bg-particle');
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration and delay
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Random opacity
        const opacity = Math.random() * 0.7 + 0.3;
        particle.style.opacity = opacity;
        
        // Add to animated background
        const animatedBg = document.querySelector('.animated-bg');
        if (animatedBg) {
            animatedBg.appendChild(particle);
            
            // Remove after animation completes
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }
    }
    
    // Create particles periodically
    let particleInterval = setInterval(createParticle, 2000);
    
    // Initial particles
    for (let i = 0; i < 12; i++) {
        setTimeout(createParticle, i * 250);
    }
    
    // Stop particles when page is not visible (for performance)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(particleInterval);
        } else {
            particleInterval = setInterval(createParticle, 2000);
        }
    });
    
    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ========== ACTIVE NAV LINK ON SCROLL ==========
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${currentSection}` || 
                (currentSection === '' && (href === '/' || href === '#home'))) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll with debounce for performance
    const debouncedUpdate = debounce(updateActiveNavLink, 100);
    window.addEventListener('scroll', debouncedUpdate);
    
    // Initial update
    updateActiveNavLink();
    
    // ========== FORM VALIDATION (if forms exist) ==========
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                    
                    // Add error message
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '5px';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.style.borderColor = '';
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
    // ========== LAZY LOAD IMAGES ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    
                    // Update loading progress when images load
                    if (loadingInterval) {
                        loadingProgress = Math.min(loadingProgress + 5, 95);
                        updateLoadingProgress();
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ========== BACK TO TOP BUTTON ==========
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.title = 'Back to top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-gold);
            color: var(--black-primary);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            transition: all 0.3s ease;
        `;
        
        backToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.5)';
        });
        
        backToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    }
    
    // Create back to top button
    createBackToTopButton();
    
    // ========== COUNTER ANIMATIONS ==========
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '');
                    setTimeout(updateCounter, 30);
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
            
            observer.observe(counter);
        });
    }
    
    // Initialize counters if they exist
    if (document.querySelector('.counter')) {
        animateCounters();
    }
    
    console.log('MarketBrainers JS initialized successfully');
});

// ========== HELPER FUNCTIONS ==========
// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for animations if not already in CSS file
if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-after-load {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
        }
        
        .page-loaded .animate-after-load {
            opacity: 1;
            transform: translateY(0);
        }
        
        img.loaded {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Counter animation */
        .counter {
            display: inline-block;
        }
        
        /* Back to top button styles */
        #backToTop:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 6px 20px rgba(255, 215, 0, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========== GLOBAL UTILITIES ==========
// Add a utility to format numbers with commas
window.formatNumber = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Add a utility to detect mobile devices
window.isMobile = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Add a utility to detect touch devices
window.isTouchDevice = function() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Initialize when page is fully ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('MarketBrainers utilities loaded');
    });
} else {
    console.log('MarketBrainers utilities loaded');
}