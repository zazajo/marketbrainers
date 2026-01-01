// Image configuration for MarketBrainers
const MB_IMAGES = {
    logos: {
        abstract: '/static/images/logo/abstract-logo.png',
        typography: '/static/images/logo/typography-logo.png',
        favicon: '/static/images/logo/favicon.ico'
    },
    hero: {
        background: '/static/images/hero/hero-section-bg.jpg'
    },
    features: {
        threeD: '/static/images/features/3d-element.jpg',
        dataViz: '/static/images/features/data-visualization.jpg',
        icons: '/static/images/features/feature-icons.png',
        infographic: '/static/images/features/infographic-style.jpg',
        service: '/static/images/features/service.jpg'
    },
    team: {
        about: '/static/images/team/team-about.jpg'
    },
    misc: {
        cover: '/static/images/misc/cover-image.jpg'
    }
};

// Preload critical images
function preloadCriticalImages() {
    const criticalImages = [
        MB_IMAGES.logos.abstract,
        MB_IMAGES.hero.background,
        MB_IMAGES.features.threeD
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Lazy load images when they enter viewport
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize image handling when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    preloadCriticalImages();
    lazyLoadImages();
});