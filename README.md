# The Hive Community Website

A modern, responsive website built with HTML, CSS, and vanilla JavaScript for The Hive Community.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for mobile, tablet, and desktop
- **Semantic HTML**: Clean, accessible markup with proper heading hierarchy
- **Modern CSS**: Flexbox and Grid layouts with CSS custom properties
- **Vanilla JavaScript**: No frameworks, just clean, modular JS
- **Accessibility**: WCAG compliant with ARIA labels, keyboard navigation, and skip links
- **Interactive Components**: Mobile navigation, smooth scrolling, form validation, and scroll animations

## Getting Started

### Prerequisites

No build tools or dependencies required! Just a web browser.

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/The-Hive-Community/the-hive-website.git
cd the-hive-website
```

2. Open `index.html` in your browser, or use a simple HTTP server:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## Project Structure

```
the-hive-website/
├── index.html      # Main HTML file with semantic structure
├── styles.css      # Mobile-first CSS with custom properties
├── script.js       # Vanilla JavaScript for interactivity
└── README.md       # Project documentation
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Key Technologies

- **HTML5**: Semantic markup, forms, and accessibility features
- **CSS3**: Grid, Flexbox, custom properties, media queries, animations
- **JavaScript ES6+**: Modules, arrow functions, IntersectionObserver, FormData

## Features Breakdown

### Navigation
- Responsive sticky header
- Mobile hamburger menu with smooth slide-in animation
- Active link highlighting based on scroll position
- Keyboard accessible (Tab, Escape)

### Sections
- **Hero**: Gradient background with call-to-action buttons
- **About**: Introduction to The Hive Community
- **Features**: 6 feature cards in responsive grid layout
- **Community**: Statistics cards with gradient backgrounds
- **Contact**: Form with client-side validation
- **Footer**: Multi-column layout with links

### JavaScript Functionality
- Mobile navigation toggle
- Smooth scrolling to sections
- Active navigation highlighting
- Form validation and submission
- Scroll reveal animations
- Respects `prefers-reduced-motion`

## Accessibility

- Semantic HTML elements (header, nav, main, section, article, footer)
- ARIA labels and landmarks
- Skip to main content link
- Keyboard navigation support
- Focus indicators
- Form labels and required field indicators
- Reduced motion support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

© 2026 The Hive Community. All rights reserved.

## Contact

- GitHub: [@The-Hive-Community](https://github.com/The-Hive-Community)

---

Built with ❤️ by The Hive Community