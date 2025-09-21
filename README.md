# Al Mahruqi - Professional Services Website

A modern, responsive website for Al Mahruqi professional consulting services.

## Features

- **Fully Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling navigation with active link highlighting
- **Functional Contact Form**: Working contact form with validation and user feedback
- **Service Details Modals**: Interactive modals showing detailed service information
- **Portfolio Showcase**: Project gallery with detailed case studies
- **Performance Optimized**: Fast loading with optimized assets and smooth animations
- **Cross-browser Compatible**: Works on all modern browsers

## Technical Implementation

### Fixed Issues

1. **✅ Broken Links**: All internal navigation links now work with smooth scrolling
2. **✅ Non-functional Buttons**: All buttons have proper JavaScript functionality
3. **✅ Layout Problems**: Responsive grid layout prevents content override
4. **✅ Page Loading Issues**: Optimized performance with lazy loading and efficient CSS
5. **✅ Non-functional Menu**: Mobile hamburger menu works correctly

### Technologies Used

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern CSS with Grid, Flexbox, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and smooth user experience
- **PHP**: Server-side redirect handling

### File Structure

```
├── index.html          # Main website homepage
├── style.css           # Main stylesheet with responsive design
├── script.js           # JavaScript functionality
├── index.php           # PHP redirect to main page
├── backup.sh           # Website backup script
├── multi-timezone-clock.html  # Additional timezone clock utility
├── README.md           # This documentation
├── LICENSE             # Software license
└── .gitignore          # Git ignore rules
```

## Setup and Installation

1. **Web Server Setup**: Place files in your web server document root
2. **PHP Support**: Ensure PHP is enabled for redirect functionality
3. **File Permissions**: Make backup.sh executable: `chmod +x backup.sh`

### Local Development

To run locally for testing:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Or using PHP's built-in server
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Features Detail

### Navigation
- Fixed header with backdrop blur effect
- Smooth scrolling to sections
- Active link highlighting based on scroll position
- Mobile-responsive hamburger menu

### Contact Form
- Client-side validation
- Success/error notifications
- Form reset after successful submission
- Responsive design

### Service Modals
- Detailed service information
- Keyboard accessible (ESC to close)
- Click outside to close
- Responsive design

### Performance Optimizations
- Optimized CSS with efficient selectors
- JavaScript event delegation
- Smooth transitions and animations
- Responsive images with proper sizing

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where appropriate
- Color contrast compliance
- Screen reader friendly

## SEO Optimization

- Semantic HTML structure
- Meta tags for description and viewport
- Proper heading hierarchy
- Clean URL structure
- Fast loading performance

## Backup

Use the included backup script:

```bash
./backup.sh
```

This creates a compressed backup in `/tmp/almahruqi_backup/` with timestamp.

## Contact Information

- **Email**: info@almahruqi.com
- **Phone**: +968 1234 5678
- **Office Hours**: Sunday - Thursday: 8:00 AM - 6:00 PM

## License

This project is released into the public domain under the Unlicense. See LICENSE file for details.