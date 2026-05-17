document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: 'vertical',
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize TargetCursor
    const cursor = new TargetCursor({
        targetSelector: '.cursor-target',
        spinDuration: 2,
        hideDefaultCursor: true,
        parallaxOn: true
    });

    // Add cursor-target class to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .team-member, .value-card, input, textarea');
    interactiveElements.forEach(el => el.classList.add('cursor-target'));

    // 3. Magnetic Button Effect
    const magneticButtons = document.querySelectorAll('.cta-button');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 4. Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // 5. GSAP Hero Timeline
    const tl = gsap.timeline();
    
    tl.from(".hero-title", {
        y: 150,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        skewY: 7
    })
    .from(".tagline", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .from(".cta-buttons", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.8");

    // 6. Initialize Vanilla Tilt for Service Cards (Disable on touch)
    if (!('ontouchstart' in window)) {
        VanillaTilt.init(document.querySelectorAll(".service-card, .feature-card, .benefit-card, .solution-card, .mission-card, .vision-card, .team-member, .value-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
        });
    }

    // 7. Sticky Header & Mobile Menu Logic
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 8. Form Submission Logic
    const supabaseUrl = 'https://qjjmmllxddhgboonzagp.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqam1tbGx4ZGRoZ2Jvb256YWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4ODE1NTksImV4cCI6MjA5MzQ1NzU1OX0.otbSpUlg0vZX3D9WpvIhRuI7dKAGmboKHG4wTUyv9sw';

    // 10. Toast Notification System
    function showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'error' : ''}`;
        
        const span = document.createElement('span');
        span.textContent = message;
        toast.appendChild(span);

        const closeBtn = document.createElement('i');
        closeBtn.className = 'fas fa-times toast-close';
        toast.appendChild(closeBtn);

        container.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('active'), 100);

        // Auto remove
        const timer = setTimeout(() => {
            removeToast(toast);
        }, 5000);

        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timer);
            removeToast(toast);
        });
    }

    function removeToast(toast) {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 600);
    }

    // Replace old alerts in the form submission logic
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Transmitting...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // --- HONEYPOT SPAM PROTECTION ---
            if (data._honeypot && data._honeypot !== '') {
                console.log('Spam detected via honeypot.');
                setTimeout(() => {
                    showToast('Transmission Successful. Our technicians will contact you shortly.');
                    contactForm.reset();
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }, 1000);
                return;
            }
            
            // Determine Service Type based on current page or form class
            let serviceType = 'general';
            if (window.location.pathname.includes('solar')) serviceType = 'solar';
            else if (window.location.pathname.includes('cctv')) serviceType = 'cctv';
            else if (window.location.pathname.includes('wifi')) serviceType = 'wifi';

            // Extract specialized fields into a 'details' object
            const details = {};
            
            // Capture Location if present
            const locationInput = contactForm.querySelector('input[placeholder*="Location"]');
            if (locationInput) details['Location'] = locationInput.value;

            // Specific handling for select elements
            const selects = contactForm.querySelectorAll('select');
            selects.forEach((select) => {
                const label = select.options[0].text;
                details[label] = select.value;
            });

            const textarea = contactForm.querySelector('textarea');
            const message = textarea ? textarea.value : '';

            const payload = {
                name: contactForm.querySelector('input[placeholder="Your Name"]').value,
                email: contactForm.querySelector('input[placeholder="Your Email"]').value,
                phone: contactForm.querySelector('input[placeholder="Your Phone"]').value,
                service_type: serviceType,
                details: details,
                message: message
            };

            // 1. Attempt Supabase Logging (Non-blocking)
            try {
                const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': supabaseKey,
                        'Authorization': `Bearer ${supabaseKey}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(payload)
                });

                if (!supabaseResponse.ok) {
                    console.warn('Supabase logging failed, continuing with email...');
                }
            } catch (supabaseError) {
                console.warn('Supabase connection error:', supabaseError.message);
                // We don't throw here so the email still attempts to send
            }

            try {
                // 2. Send Instant Email via PHP
                const response = await fetch('mail.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const text = await response.text();
                    console.error('Server response:', text);
                    throw new Error(`Server Error: ${response.status} ${response.statusText}. Ensure you are running "php -S localhost:8000" and not a static Live Server.`);
                }

                const result = await response.json();

                if (result.status === 'success') {
                    showToast(result.message);
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Transmission failed.');
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('Transmission Failed. Please check your connection or try again.', 'error');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }

        });
    }


    // 9. Hero Scroll Image Sequence Function
    function initHeroScrollAnimation(canvasId, framePath, frameCount) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const context = canvas.getContext("2d");
        
        const currentFrame = index => (
            `${framePath}ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
        );

        const images = [];
        const animationState = {
            frame: 1
        };

        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        gsap.registerPlugin(ScrollTrigger);

        gsap.to(animationState, {
            frame: frameCount,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-sticky-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            onUpdate: render
        });

        images[0].onload = render;

        function render() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const img = images[animationState.frame - 1];
            if (img && img.complete) {
                // Cover behavior
                const canvasAspect = canvas.width / canvas.height;
                const imgAspect = img.width / img.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspect > imgAspect) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspect;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgAspect;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }
                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        }

        // Handle Resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        });
        
        // Initial setup
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Initialize based on page
    if (window.location.pathname.includes('solar')) {
        initHeroScrollAnimation("hero-scroll-canvas", "SolarFrames/", 240);
    } else if (window.location.pathname.includes('cctv')) {
        initHeroScrollAnimation("hero-scroll-canvas", "cameraFrames/", 146);
    } else if (window.location.pathname.includes('wifi')) {
        initHeroScrollAnimation("hero-scroll-canvas", "WIFI-Frames/", 240);
    }
});
