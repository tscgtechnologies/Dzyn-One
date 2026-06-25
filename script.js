document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNavigation() {
        let scrollPosition = window.scrollY + 150; // offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navAnchors.forEach(anchor => {
                    anchor.classList.remove('active');
                    if (anchor.getAttribute('href') === `#${sectionId}`) {
                        anchor.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // 4. Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from other buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // First fade out
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        // Small trigger timeout for rendering then fade in
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.classList.add('hidden');
                    }
                }, 300); // matches fade-out duration
            });
        });
    });

    // Initialize gallery transition inline styling
    galleryItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });

    // 5. Contact Form Validation and WhatsApp Redirection
    const enquiryForm = document.getElementById('enquiry-form');

    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve field values
        const name = document.getElementById('form-name').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const location = document.getElementById('form-location').value.trim();
        const service = document.getElementById('form-service').value;
        const budget = document.getElementById('form-budget').value;
        const message = document.getElementById('form-message').value.trim();

        // Phone validation (simple 10 digit check)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit mobile number starting with 6-9.');
            return;
        }

        // Construct message
        const whatsappNumber = '918790752589';
        const baseText = `Hello Dzyn One, my name is ${name}. I am from ${location}. I need help with ${service}. My budget range is ${budget}.`;
        const extraText = message ? ` Message: ${message}` : '';
        const fullMessage = baseText + extraText;

        // Encode and redirect
        const encodedMessage = encodeURIComponent(fullMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    });

    // 6. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 7. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // stops observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // animate slightly before entering screen center
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
