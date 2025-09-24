 // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-slow');
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.setProperty('--scroll-y', `${scrolled * speed}px`);
    });

// Scroll animations for hero content
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};