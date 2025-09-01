// Navbar scroll effect
        const navbar = document.getElementById('navbar');
        const heroSection = document.getElementById('hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled > heroHeight - 100) {
                navbar.classList.add('navbar-scroll');
            } else {
                navbar.classList.remove('navbar-scroll');
            }
            
            // Parallax effect
            const parallaxElements = document.querySelectorAll('.parallax-slow');
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.setProperty('--scroll-y', `${scrolled * speed}px`);
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

        // Event listeners
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

        // Scroll animations for hero content
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

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

        // Scroll animations for sections
        document.addEventListener("DOMContentLoaded", () => {
            const sections = document.querySelectorAll("section");

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const elements = entry.target.querySelectorAll(".scroll-animate");
                    elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add("visible");
                    }, index * 150);
                    });
                    observer.unobserve(entry.target);
                }
                });
            }, { threshold: 0.15 });

            sections.forEach((section) => {
                section.querySelectorAll("*:not(script)").forEach((el) => {
                el.classList.add("scroll-animate");
                });
                observer.observe(section);
            });
        });

