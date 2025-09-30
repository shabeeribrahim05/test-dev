# AlMahruqi Premium Car Dealership Website

This website showcases a premium car dealership with a fully functional mobile menu and responsive navigation system.

## Features

### ✅ Fixed Issues
- **Mobile Menu**: Hamburger menu now opens properly on mobile devices
- **High Contrast Text**: Menu labels are clearly visible with dark text on white background
- **Visible Labels**: Both icons and labels are displayed in the mobile menu
- **Interactive Elements**: All menu items are tappable and responsive to touch
- **Navigation**: "Explore" button correctly navigates to the inventory section
- **Smooth Scrolling**: All navigation links scroll smoothly to their target sections

### 📱 Mobile Menu Features
- Opens from the right side when hamburger icon is clicked
- Displays all menu items with icons and labels
- High contrast for readability (dark text on white background)
- Touch-friendly with minimum 50px tap targets
- Closes when:
  - A menu item is clicked
  - The close (×) button is clicked
  - User clicks outside the menu
- Prevents page scrolling when menu is open
- Smooth slide-in/slide-out animation

### 🎨 Responsive Design
- **Desktop (>768px)**: 
  - Horizontal navigation menu in header
  - Multi-column car grid
  - Full-width hero section
  
- **Tablet (768px)**: 
  - Hamburger menu appears
  - Single-column car grid
  - Optimized spacing
  
- **Mobile (<480px)**: 
  - Full-width mobile menu
  - Stack layout
  - Touch-optimized buttons

### 📄 Pages
1. **Homepage** (`index.html`)
   - Hero section with call-to-action buttons
   - Inventory showcase
   - About section
   - Contact information
   
2. **Listing Page** (`listings/2022-mercedes-benz-e300l.html`)
   - Detailed car specifications
   - Feature list
   - Image gallery
   - Contact CTA

## Files Structure

```
almahruqi-website/
├── index.html                              # Homepage
├── almahruqi-styles.css                    # All styles
├── almahruqi-scripts.js                    # Interactive functionality
└── listings/
    └── 2022-mercedes-benz-e300l.html      # Car listing page
```

## Technical Implementation

### CSS Architecture
- Mobile-first approach
- CSS Grid for layouts
- Flexbox for components
- Smooth transitions and animations
- Media queries for breakpoints

### JavaScript Features
- Event delegation for menu interactions
- Smooth scroll navigation
- Body scroll lock when menu is open
- Touch event handling
- Clean, maintainable code structure

### Accessibility
- ARIA labels on buttons
- Semantic HTML structure
- Keyboard navigation support
- High contrast ratios
- Clear focus states

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Usage

1. Open `index.html` in a web browser
2. On mobile/tablet, click the hamburger icon (☰) to open the menu
3. Click any menu item to navigate to that section
4. Click "Explore" to scroll to the inventory section
5. Click on any car to view its detailed listing

## Future Enhancements
- Add more car listings
- Implement search functionality
- Add filtering options (price, make, model)
- Contact form integration
- Image galleries with lightbox
- Virtual tour integration
