// Revolution Slider JavaScript
class RevolutionSlider {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        // Configuration
        this.options = {
            autoplay: options.autoplay !== undefined ? options.autoplay : true,
            autoplayDelay: options.autoplayDelay || 5000,
            transitionDuration: options.transitionDuration || 600,
            ...options
        };

        // State
        this.currentSlide = 0;
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.autoplayTimer = null;
        this.progressTimer = null;
        this.progressStartTime = null;

        // Initialize
        this.init();
    }

    init() {
        if (this.totalSlides === 0) return;

        // Set up event listeners
        this.setupNavigation();
        this.setupPagination();
        this.setupKeyboard();
        this.setupTouch();

        // Start autoplay if enabled
        if (this.options.autoplay) {
            this.startAutoplay();
        }

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoplay());

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else if (this.options.autoplay) {
                this.resumeAutoplay();
            }
        });

        // Preload images
        this.preloadImages();
    }

    setupNavigation() {
        const prevBtn = this.container.querySelector('.slider-arrow.prev');
        const nextBtn = this.container.querySelector('.slider-arrow.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
    }

    setupPagination() {
        const dots = this.container.querySelectorAll('.pagination-dot');
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    setupTouch() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const minSwipeDistance = 50;
        const swipeDistance = endX - startX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;

        this.isAnimating = true;
        this.pauseAutoplay();

        const currentSlideElement = this.slides[this.currentSlide];
        const nextSlideElement = this.slides[index];

        // Add exit class to current slide
        currentSlideElement.classList.add('exit');

        // Wait a brief moment for exit animation
        setTimeout(() => {
            // Remove active and exit from current
            currentSlideElement.classList.remove('active', 'exit');

            // Add active to next
            nextSlideElement.classList.add('active');

            // Update state
            this.currentSlide = index;

            // Update pagination
            this.updatePagination();

            // Reset animation flag
            setTimeout(() => {
                this.isAnimating = false;
                this.resumeAutoplay();
            }, this.options.transitionDuration);

        }, 100);
    }

    updatePagination() {
        const dots = this.container.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoplay() {
        this.stopAutoplay();
        this.startProgress();
        
        this.autoplayTimer = setInterval(() => {
            this.nextSlide();
        }, this.options.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
        this.stopProgress();
    }

    pauseAutoplay() {
        this.stopAutoplay();
    }

    resumeAutoplay() {
        if (this.options.autoplay && !this.isAnimating) {
            this.startAutoplay();
        }
    }

    startProgress() {
        this.stopProgress();
        const progressBar = this.container.querySelector('.progress-bar');
        if (!progressBar) return;

        progressBar.style.width = '0%';
        this.progressStartTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - this.progressStartTime;
            const progress = Math.min((elapsed / this.options.autoplayDelay) * 100, 100);
            
            progressBar.style.width = progress + '%';

            if (progress < 100) {
                this.progressTimer = requestAnimationFrame(updateProgress);
            }
        };

        this.progressTimer = requestAnimationFrame(updateProgress);
    }

    stopProgress() {
        if (this.progressTimer) {
            cancelAnimationFrame(this.progressTimer);
            this.progressTimer = null;
        }
        
        const progressBar = this.container.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }

    preloadImages() {
        // Images are now CSS gradients, no preloading needed
        // This method is kept for potential future image additions
    }

    // Public methods
    destroy() {
        this.stopAutoplay();
        // Remove event listeners if needed
    }

    play() {
        this.options.autoplay = true;
        this.startAutoplay();
    }

    pause() {
        this.options.autoplay = false;
        this.stopAutoplay();
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const slider = new RevolutionSlider('.slider-container', {
        autoplay: true,
        autoplayDelay: 5000,
        transitionDuration: 600
    });

    // Make slider globally accessible for debugging
    window.revSlider = slider;
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (window.revSlider) {
            window.revSlider.pause();
        }
    } else {
        // Resume animations when page is visible
        if (window.revSlider && window.revSlider.options.autoplay) {
            window.revSlider.play();
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy load images with Intersection Observer (for future image additions)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance monitoring (optional - can be removed in production)
if (window.performance && window.performance.measure) {
    window.addEventListener('load', () => {
        // Log performance metrics
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}
