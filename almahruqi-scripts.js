// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Open mobile menu
    hamburger.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close mobile menu
    function closeMenuHandler() {
        mobileMenuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    closeMenu.addEventListener('click', closeMenuHandler);
    
    // Close menu when clicking on a menu item
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // Smooth scroll to section
            const href = item.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    closeMenuHandler();
                    setTimeout(function() {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            }
        });
    });
    
    // Close menu when clicking outside
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMenuHandler();
        }
    });
    
    // Handle Explore button navigation
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const inventorySection = document.getElementById('inventory');
            if (inventorySection) {
                inventorySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Handle all navigation links in desktop menu
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a, .hero-buttons a');
    desktopNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
