// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Sticky Navbar Background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll Animations (Intersection Observer)
// This makes elements fade in when you scroll to them
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger Skill Bars animation if looking at skills section
            if (entry.target.classList.contains('skill-item')) {
                const bar = entry.target.querySelector('.progress-bar-fill');
                // Read the width from the css variable we set in HTML
                const targetWidth = bar.style.getPropertyValue('--w');
                bar.style.width = targetWidth;
            }
        }
    });
}, observerOptions);

// Start observing all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
// Start observing skill items specifically
document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));

// Form Submission Handler (Mock)
function handleForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    // Simulate sending state
    btn.innerText = "Sending...";
    btn.style.opacity = "0.7";
    
    // Simulate success after 1.5 seconds
    setTimeout(() => {
        btn.innerText = "Message Sent!";
        btn.style.backgroundColor = "#10b981"; // Green color
        e.target.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = ""; 
            btn.style.opacity = "1";
        }, 3000);
    }, 1500);
}