// Website JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeLazyLoading();
    initializeFormHandling();
    initializeSmootherScrolling();
    
    console.log('Al Mahruqi website loaded successfully');
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    } else {
        console.warn(`Section with id "${sectionId}" not found`);
    }
}

// Enhanced smooth scrolling for anchor links
function initializeSmootherScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

// Show/hide expandable content
function showMore(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden');
        
        // Scroll to element if it was just shown
        if (!element.classList.contains('hidden')) {
            setTimeout(() => {
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        }
    } else {
        console.warn(`Element with id "${elementId}" not found`);
    }
}

// Service details modal functionality
function showServiceDetails(serviceType) {
    const serviceDetails = {
        consulting: {
            title: 'Business Consulting',
            description: 'Our comprehensive business consulting services help organizations optimize their operations, develop strategic plans, and achieve sustainable growth.',
            features: [
                'Strategic Planning & Analysis',
                'Market Research & Analysis',
                'Business Process Optimization',
                'Financial Planning & Forecasting',
                'Risk Assessment & Management',
                'Change Management Support'
            ]
        },
        optimization: {
            title: 'Performance Optimization',
            description: 'We help businesses improve their efficiency and productivity through advanced process optimization and technology integration.',
            features: [
                'Process Analysis & Improvement',
                'Technology Integration',
                'Workflow Optimization',
                'Performance Metrics & KPIs',
                'Automation Solutions',
                'Team Productivity Enhancement'
            ]
        },
        quality: {
            title: 'Quality Assurance',
            description: 'Our quality assurance services ensure your business maintains the highest standards of excellence in all operations.',
            features: [
                'Quality Management Systems',
                'ISO Certification Support',
                'Process Documentation',
                'Quality Audits & Reviews',
                'Continuous Improvement Programs',
                'Staff Training & Development'
            ]
        }
    };

    const service = serviceDetails[serviceType];
    if (service) {
        // Create and show modal
        showModal(service.title, service.description, service.features);
    } else {
        console.warn(`Service type "${serviceType}" not found`);
    }
}

// Portfolio details functionality
function showPortfolioDetails(projectId) {
    const projectDetails = {
        project1: {
            title: 'Strategic Planning Initiative',
            description: 'A comprehensive 6-month strategic planning project for a growing technology company.',
            details: [
                'Conducted thorough market analysis and competitive research',
                'Developed 3-year strategic roadmap with clear milestones',
                'Implemented new performance metrics and KPIs',
                'Result: 25% increase in operational efficiency',
                'Client satisfaction: 95%'
            ]
        },
        project2: {
            title: 'Process Optimization Project',
            description: 'Streamlined operations for a manufacturing company resulting in significant efficiency improvements.',
            details: [
                'Analyzed existing workflows and identified bottlenecks',
                'Implemented lean manufacturing principles',
                'Introduced automated quality control systems',
                'Result: 40% reduction in production time',
                'Cost savings: $500,000 annually'
            ]
        },
        project3: {
            title: 'Quality Management System Implementation',
            description: 'Complete quality management system implementation for ISO 9001 certification.',
            details: [
                'Developed comprehensive quality management procedures',
                'Trained staff on quality standards and protocols',
                'Implemented continuous improvement processes',
                'Result: Successful ISO 9001 certification',
                'Zero quality incidents in first year'
            ]
        }
    };

    const project = projectDetails[projectId];
    if (project) {
        showModal(project.title, project.description, project.details);
    } else {
        console.warn(`Project "${projectId}" not found`);
    }
}

// Generic modal functionality
function showModal(title, description, items) {
    // Remove existing modal if present
    const existingModal = document.getElementById('modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modalHTML = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <ul class="modal-list">
                        ${items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="closeModal()">Close</button>
                    <button class="btn btn-outline" onclick="scrollToSection('contact')">Get in Touch</button>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add modal styles if not already present
    if (!document.getElementById('modal-styles')) {
        const modalStyles = `
            <style id="modal-styles">
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 10px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    animation: slideUp 0.3s ease;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e5e7eb;
                }
                
                .modal-header h2 {
                    margin: 0;
                    color: #1f2937;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #6b7280;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
                
                .modal-body p {
                    margin-bottom: 1rem;
                    color: #4b5563;
                    line-height: 1.6;
                }
                
                .modal-list {
                    list-style: none;
                    padding: 0;
                }
                
                .modal-list li {
                    padding: 0.5rem 0;
                    color: #4b5563;
                    border-bottom: 1px solid #f3f4f6;
                    position: relative;
                    padding-left: 1.5rem;
                }
                
                .modal-list li:before {
                    content: "✓";
                    color: #10b981;
                    font-weight: bold;
                    position: absolute;
                    left: 0;
                }
                
                .modal-footer {
                    padding: 1.5rem;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @media (max-width: 768px) {
                    .modal-footer {
                        flex-direction: column;
                    }
                    
                    .modal-footer .btn {
                        width: 100%;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }

    // Close modal when clicking outside
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Form submission handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(e);
        });
    }
}

// Handle form submission
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Basic form validation
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.className = `notification ${type === 'error' ? 'error' : ''}`;
        notification.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideNotification();
        }, 5000);
    }
}

// Hide notification
function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('hidden');
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    animateElements.forEach(el => observer.observe(el));
}

// Lazy loading for images (future enhancement)
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            let loadTime;
            const navEntries = performance.getEntriesByType && performance.getEntriesByType('navigation');
            if (navEntries && navEntries.length > 0) {
                // Use Navigation Timing Level 2 API
                loadTime = navEntries[0].loadEventEnd - navEntries[0].startTime;
            } else if (performance.timing) {
                // Fallback for older browsers
                loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            } else {
                loadTime = undefined;
            }
            if (typeof loadTime === 'number' && !isNaN(loadTime)) {
                console.log(`Page load time: ${loadTime}ms`);
            } else {
                console.log('Page load time: unavailable');
            }
            
            // Track if load time is too slow
            if (loadTime > 3000) {
                console.warn('Page load time is slower than recommended (>3s)');
            }
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Error handling for missing elements
function handleMissingElements() {
    const criticalElements = ['nav-toggle', 'nav-menu', 'contact-form'];
    criticalElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`Critical element #${id} not found`);
        }
    });
}

// Call error handling
handleMissingElements();

// Add click handlers for dynamic content
document.addEventListener('click', function(e) {
    // Handle dynamic button clicks
    if (e.target.matches('[onclick]')) {
        try {
            // The onclick handlers are already defined in the HTML
            // This is just to ensure they're properly bound
        } catch (error) {
            console.error('Error handling click:', error);
        }
    }
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
        hideNotification();
    }
});

// Add loading state management
window.addEventListener('beforeunload', function() {
    // Show loading indicator if needed
    document.body.classList.add('loading');
});

// Ensure smooth experience on page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
        // Refresh any time-sensitive content if needed
    }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showMore = showMore;
window.showServiceDetails = showServiceDetails;
window.showPortfolioDetails = showPortfolioDetails;
window.submitForm = submitForm;
window.hideNotification = hideNotification;
window.closeModal = closeModal;