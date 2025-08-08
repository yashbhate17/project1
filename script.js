// Initialize AOS (Animate On Scroll) with optimized settings
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        mirror: false,
        offset: 100,
        delay: 50
    });
});

// Optimized photo interaction effects with modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const photoContainers = document.querySelectorAll('.photo-container');
    const wishModal = document.getElementById('wishModal');
    const wishText = document.getElementById('wishText');
    const closeModal = document.getElementById('closeModal');
    const pylonContainer = document.querySelector('.pylon-container');
    
    // Ensure scroll functionality works
    function initializeScroll() {
        if (pylonContainer) {
            // Add scroll indicators
            addScrollIndicators();
            
            // Ensure first images are visible
            setTimeout(() => {
                pylonContainer.scrollLeft = 0;
            }, 100);
        }
    }
    
    function addScrollIndicators() {
        // Add scroll buttons for better navigation
        const scrollLeftBtn = document.createElement('button');
        const scrollRightBtn = document.createElement('button');
        
        scrollLeftBtn.innerHTML = '‹';
        scrollRightBtn.innerHTML = '›';
        
        scrollLeftBtn.className = 'scroll-btn scroll-left';
        scrollRightBtn.className = 'scroll-btn scroll-right';
        
        scrollLeftBtn.onclick = () => {
            pylonContainer.scrollBy({ left: -300, behavior: 'smooth' });
        };
        
        scrollRightBtn.onclick = () => {
            pylonContainer.scrollBy({ left: 300, behavior: 'smooth' });
        };
        
        // Add buttons to container
        const container = document.querySelector('.main-container');
        if (container) {
            container.style.position = 'relative';
            container.appendChild(scrollLeftBtn);
            container.appendChild(scrollRightBtn);
        }
    }
    
    photoContainers.forEach((container, index) => {
        const img = container.querySelector('img');
        const frame = container.querySelector('.photo-frame');
        
        // Add optimized click effect with modal functionality
        container.addEventListener('click', function(event) {
            // Create simple ripple effect
            createSimpleRipple(this, event);
            
            // Add simple click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show wish modal
            const wish = this.getAttribute('data-wish');
            if (wish) {
                showWishModal(wish);
            }
        });
        
        // Optimized loading effect for images
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.style.transition = 'all 0.6s ease';
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 50 + (index * 50));
        });
        
        // Enhanced error handling with placeholder
        img.addEventListener('error', function() {
            this.src = createPlaceholderImage();
            this.alt = 'Photo placeholder - Add your image here';
        });
        
        // Simplified mouse movement effect
        let isHovering = false;
        container.addEventListener('mouseenter', function() {
            isHovering = true;
        });
        
        container.addEventListener('mouseleave', function() {
            isHovering = false;
            frame.style.transform = '';
        });
        
        container.addEventListener('mousemove', function(e) {
            if (!isHovering) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            frame.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Modal functionality
    function showWishModal(wish) {
        wishText.textContent = wish;
        wishModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Create simple floating hearts
        createSimpleModalHearts();
    }
    
    function hideWishModal() {
        wishModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Close modal on button click
    closeModal.addEventListener('click', hideWishModal);
    
    // Close modal on background click
    wishModal.addEventListener('click', function(e) {
        if (e.target === wishModal) {
            hideWishModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wishModal.classList.contains('show')) {
            hideWishModal();
        }
    });
    
    // Create simple floating hearts around modal
    function createSimpleModalHearts() {
        const heartCount = 4;
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'modal-floating-heart';
                heart.innerHTML = '♥';
                heart.style.cssText = `
                    position: fixed;
                    color: #ff6b6b;
                    font-size: 1.2rem;
                    pointer-events: none;
                    z-index: 10001;
                    animation: simpleHeartFloat 2s ease-out forwards;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                `;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.remove();
                    }
                }, 2000);
            }, i * 300);
        }
    }
    
    // Initialize scroll functionality
    initializeScroll();
});

// Create simple ripple effect
function createSimpleRipple(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 105, 135, 0.3) 50%, transparent 100%);
        border-radius: 50%;
        transform: scale(0);
        animation: simple-ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Create placeholder image
function createPlaceholderImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
    
    // Add camera icon
    ctx.fillStyle = '#999';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('📷', 100, 120);
    
    // Add text
    ctx.fillStyle = '#666';
    ctx.font = '14px Arial';
    ctx.fillText('Add Photo', 100, 150);
    
    return canvas.toDataURL();
}

// Optimized parallax scroll effect with throttling
let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', function() {
    lastScrollY = window.pageYOffset;
    
    if (!ticking) {
        requestAnimationFrame(function() {
            const scrolled = lastScrollY;
            const rate = scrolled * -0.2;
            const backgroundElement = document.querySelector('.background-animation');
            
            if (backgroundElement) {
                backgroundElement.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// Simplified text animation for title
function animateTitle() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    const text = title.textContent;
    title.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        span.style.animationDelay = `${i * 0.1}s`;
        span.style.display = 'inline-block';
        span.classList.add('letter-animate');
        title.appendChild(span);
    }
}

// Optimized CSS animations
const optimizedStyle = document.createElement('style');
optimizedStyle.textContent = `
    @keyframes simple-ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes simpleHeartFloat {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        50% {
            transform: scale(1) translateY(-20px);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-40px);
            opacity: 0;
        }
    }
    
    .letter-animate {
        animation: letterBounce 0.6s ease forwards;
        opacity: 0;
        transform: translateY(-20px);
    }
    
    @keyframes letterBounce {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal-floating-heart {
        filter: drop-shadow(0 0 3px rgba(255, 107, 107, 0.3));
    }
    
    /* Scroll button styles */
    .scroll-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.9);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        color: #333;
        cursor: pointer;
        z-index: 100;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    .scroll-btn:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateY(-50%) scale(1.1);
    }
    
    .scroll-left {
        left: 10px;
    }
    
    .scroll-right {
        right: 10px;
    }
    
    @media (max-width: 768px) {
        .scroll-btn {
            width: 35px;
            height: 35px;
            font-size: 18px;
        }
    }
`;
document.head.appendChild(optimizedStyle);

// Initialize title animation
document.addEventListener('DOMContentLoaded', animateTitle);

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Optimized page transition effect
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Optimized mobile touch interactions
if ('ontouchstart' in window) {
    let touchTimer;
    
    document.addEventListener('touchstart', function(e) {
        const target = e.target.closest('.photo-container');
        if (target) {
            target.style.transition = 'transform 0.1s ease';
            target.style.transform += ' scale(0.98)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        const target = e.target.closest('.photo-container');
        if (target) {
            clearTimeout(touchTimer);
            touchTimer = setTimeout(() => {
                target.style.transition = 'all 0.4s ease';
                target.style.transform = target.style.transform.replace(' scale(0.98)', '');
            }, 100);
        }
    });
}

// Optimized Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements with delay to prevent performance issues
setTimeout(() => {
    document.querySelectorAll('.photo-container, .message-card').forEach(el => {
        observer.observe(el);
    });
}, 1000);

// Simple scroll hint for mobile users
function showScrollHint() {
    const container = document.querySelector('.pylon-container');
    if (container && container.scrollWidth > container.clientWidth) {
        const hint = document.createElement('div');
        hint.textContent = '← Swipe to see more photos →';
        hint.style.cssText = `
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
            animation: fadeInOut 3s ease-in-out;
            background: rgba(0, 0, 0, 0.3);
            padding: 8px 16px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        `;
        
        container.style.position = 'relative';
        container.appendChild(hint);
        
        setTimeout(() => {
            if (hint.parentNode) {
                hint.remove();
            }
        }, 3000);
    }
}

// Show scroll hint on mobile with delay
if (window.innerWidth <= 768) {
    setTimeout(showScrollHint, 2000);
}

// Optimized keyboard navigation
document.addEventListener('keydown', function(e) {
    const photoContainers = document.querySelectorAll('.photo-container');
    const currentIndex = Array.from(photoContainers).findIndex(container => 
        container === document.activeElement
    );
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + direction + photoContainers.length) % photoContainers.length;
        photoContainers[nextIndex].focus();
    }
    
    if (e.key === 'Enter' && document.activeElement.classList.contains('photo-container')) {
        document.activeElement.click();
    }
});

// Add focus styles for accessibility
document.querySelectorAll('.photo-container').forEach(container => {
    container.setAttribute('tabindex', '0');
    container.addEventListener('focus', function() {
        this.style.outline = '3px solid #ffd93d';
        this.style.outlineOffset = '5px';
    });
    
    container.addEventListener('blur', function() {
        this.style.outline = '';
    });
});

// Prevent memory leaks by cleaning up event listeners
window.addEventListener('beforeunload', function() {
    // Clean up any remaining elements
    const floatingHearts = document.querySelectorAll('.modal-floating-heart');
    floatingHearts.forEach(heart => heart.remove());
});

