window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero parallax
    document.querySelectorAll('.parallax-slow').forEach(el => {
        el.style.setProperty('--scroll-y', `${scrolled * 0.5}px`);
    });

    // Image parallax (move upward)
    document.querySelectorAll('.parallax-image').forEach(el => {
        el.style.setProperty('--scroll-y', `${scrolled * -0.07}px`);
    });
});

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuOpenIcon = document.getElementById('menu-open-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

let isMobileMenuOpen = false;

// Toggle mobile menu
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;

    if (isMobileMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

// Open mobile menu
function openMobileMenu() {
    isMobileMenuOpen = true;
    mobileMenu.classList.remove('hidden');
    menuOpenIcon.classList.add('hidden');
    menuCloseIcon.classList.remove('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'true');
}

// Close mobile menu
function closeMobileMenu() {
    isMobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    menuOpenIcon.classList.remove('hidden');
    menuCloseIcon.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
}

// Event listener for mobile menu
mobileMenuButton.addEventListener('click', toggleMobileMenu);

// Close menu when clicking on mobile menu links
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuButton = mobileMenuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

// Close menu on window resize if it gets too wide
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

// Carousel
document.addEventListener('DOMContentLoaded', function () {
    new Splide('#oven-carousel', {
        type      : 'loop',
        perPage   : 1,
        autoplay  : true,
        interval  : 3000,
        speed     : 600,
        easing    : 'ease-in-out',
        pagination: false,
        arrows    : false,
    }).mount();
});

// Scroll-triggered animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.2 }); // trigger when 20% is visible

  sections.forEach(section => {
    section.classList.add("scroll-animate");
    observer.observe(section);
  });
});

// Valid footer date
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll up button
const btn = document.getElementById('scrollUpBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 2000) {
      btn.classList.remove('hidden');
    } else {
      btn.classList.add('hidden');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

// Submit form alert message
document.getElementById('contactForm').addEventListener('submit', function() {
    document.getElementById('successMessage').classList.remove('hidden');
  });