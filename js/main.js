document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // Product Carousels
  // =========================
  document.querySelectorAll('section[data-products]').forEach(section => {
    const products = JSON.parse(section.dataset.products || '[]');

    const nameEl  = section.querySelector('.product-name');
    const priceEl = section.querySelector('.product-price');
    const descEl  = section.querySelector('.product-description');

    const updateProductInfoByIndex = (productIndex) => {
      const p = products[productIndex];
      if (!p) return;

      nameEl.textContent  = p.name || '';
      priceEl.textContent = p.price || '';
      descEl.innerHTML = Array.isArray(p.description)
        ? `<ul class="list-disc pl-5 marker:text-cyan-500">
             ${p.description.map(i => `<li>${i}</li>`).join('')}
           </ul>`
        : (p.description || '');
    };

    const main = new Splide(section.querySelector('.main-carousel'), {
      type      : 'fade',
      rewind    : true,
      pagination: false,
      arrows    : false,
      drag      : true,
    });

    const thumbs = new Splide(section.querySelector('.thumb-carousel'), {
      fixedWidth  : 100,
      fixedHeight : 90,
      gap         : 10,
      rewind      : true,
      pagination  : false,
      isNavigation: true,
      focus       : 'center',
      arrows      : true,
      breakpoints : {
        640: { fixedWidth: 66, fixedHeight: 40 },
      },
    });

    main.sync(thumbs);
    main.mount();
    thumbs.mount();

    // =========================
    // Initialise with first slide
    // =========================
    const firstSlide = section.querySelector('.main-carousel .splide__slide');
    if (firstSlide) {
      updateProductInfoByIndex(parseInt(firstSlide.dataset.productIndex, 10));
    }

    // Update on slide change
    main.on('move', (newIndex) => {
      const slide = main.Components.Slides.getAt(newIndex).slide;
      updateProductInfoByIndex(parseInt(slide.dataset.productIndex, 10));
    });
  });

  // =========================
  // Navbar Scroll Effect
  // =========================
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  if (navbar && heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = heroSection.offsetHeight;

      navbar.classList.toggle('navbar-scroll', scrolled > heroHeight - 100);
    });
  }

  // =========================
  // Mobile Menu
  // =========================
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu       = document.getElementById('mobile-menu');
  const menuOpenIcon     = document.getElementById('menu-open-icon');
  const menuCloseIcon    = document.getElementById('menu-close-icon');
  const mobileMenuLinks  = document.querySelectorAll('.mobile-menu-link');

  let isMobileMenuOpen = false;

  const openMobileMenu = () => {
    isMobileMenuOpen = true;
    mobileMenu.classList.remove('hidden');
    menuOpenIcon.classList.add('hidden');
    menuCloseIcon.classList.remove('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    isMobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    menuOpenIcon.classList.remove('hidden');
    menuCloseIcon.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  };

  const toggleMobileMenu = () => {
    isMobileMenuOpen ? closeMobileMenu() : openMobileMenu();
  };

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }

  mobileMenuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('click', (event) => {
    if (isMobileMenuOpen &&
        !mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });

  // =========================
  // Oven Carousel
  // =========================
  const ovenCarousel = document.getElementById('oven-carousel');
  if (ovenCarousel) {
    new Splide(ovenCarousel, {
      type      : 'loop',
      perPage   : 1,
      autoplay  : true,
      interval  : 3000,
      speed     : 600,
      easing    : 'ease-in-out',
      pagination: false,
      arrows    : false,
    }).mount();
  }

  // =========================
  // Scroll Animations
  // =========================
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.classList.add('scroll-animate');
    observer.observe(section);
  });

  // =========================
  // Footer Year
  // =========================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================
  // Contact Form
  // =========================
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent actual submission if needed
      successMessage.classList.remove('hidden');
    });
  }

  // =========================
  // Image Modal
  // =========================
  const modal    = document.getElementById('imgModal');
  const modalImg = document.getElementById('imgModalContent');
  const gallery  = document.querySelector('.gallery');

  if (gallery && modal && modalImg) {
    gallery.addEventListener('click', e => {
      if (e.target.tagName === 'IMG') {
        modalImg.src = e.target.src;
        modal.classList.remove('hidden');
      }
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modalImg.src = '';
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        modal.classList.add('hidden');
        modalImg.src = '';
      }
    });
  }
});