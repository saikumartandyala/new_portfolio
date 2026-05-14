document.addEventListener("DOMContentLoaded", () => {
    /* Active Nav Highlighting based on pathname */
    const currentPage = location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll("nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    /* Page Exit Animation */
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            const target = link.getAttribute("target");
            const href = link.getAttribute("href");
            
            // Only animate if it's an internal link
            if (href && !href.startsWith('#') && target !== "_blank" && !href.endsWith('.pdf')) {
                e.preventDefault();
                document.body.classList.add("page-exit");
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    /* Scroll Reveal Animation */
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        const h = window.innerHeight * 0.85;
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < h) {
                el.classList.add("active");
            }
        });
    };
    
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on load

    /* Scroll to Top Logic */
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* Form Validation & Submission Logic */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Basic Validation
            const email = document.getElementById("email").value;
            if (!email || !email.includes("@")) {
                alert("Please enter a valid email address.");
                return;
            }

            // Prepare Data for Formspree
            const formData = new FormData(contactForm);
            
            // Submit using fetch
            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Show success modal
                    document.getElementById("successModal").classList.add("show");
                    contactForm.reset();
                } else {
                    alert("Oops! There was a problem submitting your form");
                }
            }).catch(error => {
                alert("Oops! There was a problem submitting your form");
            });
        });
    }

    /* Close Modal Logic */
    const modalCloseBtn = document.getElementById("closeModalBtn");
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", () => {
            document.getElementById("successModal").classList.remove("show");
        });
    }

    /* Particles.js initialization */
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#8b5cf6" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#8b5cf6", "opacity": 0.3, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 3 } }
            },
            "retina_detect": true
        });
    }
});
