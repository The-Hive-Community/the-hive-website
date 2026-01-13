/**
 * The Hive Website - Main JavaScript
 * Handles mobile navigation, smooth scrolling, and form interactions
 */

(function() {
    'use strict';

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    
    const initMobileNav = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navToggle || !navMenu) return;
        
        // Toggle menu on button click
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            if (navMenu.classList.contains('active')) {
                hamburgers[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                hamburgers[1].style.opacity = '0';
                hamburgers[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                hamburgers[0].style.transform = '';
                hamburgers[1].style.opacity = '';
                hamburgers[2].style.transform = '';
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers[0].style.transform = '';
                hamburgers[1].style.opacity = '';
                hamburgers[2].style.transform = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers[0].style.transform = '';
                hamburgers[1].style.opacity = '';
                hamburgers[2].style.transform = '';
            }
        });
        
        // Handle escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
                
                // Reset hamburger animation
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers[0].style.transform = '';
                hamburgers[1].style.opacity = '';
                hamburgers[2].style.transform = '';
            }
        });
    };

    // ===================================
    // Smooth Scroll Enhancement
    // ===================================
    
    const initSmoothScroll = () => {
        // Get all links that point to sections on the page
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignore empty hash or hash-only links
                if (!href || href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    // Calculate offset for sticky header
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                    
                    // Set focus to target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    };

    // ===================================
    // Active Navigation Link Highlighting
    // ===================================
    
    const initActiveNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const highlightNavigation = () => {
            const scrollPosition = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.style.color = '';
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.style.color = 'var(--color-primary)';
                        }
                    });
                }
            });
        };
        
        window.addEventListener('scroll', highlightNavigation);
        highlightNavigation(); // Run once on load
    };

    // ===================================
    // Form Handling
    // ===================================
    
    const initFormHandling = () => {
        const form = document.querySelector('.contact-form');
        
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Validate form
            if (!data.name || !data.email || !data.message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(data.email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Form submitted successfully
            // In production, this would be replaced with an actual API call
            showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            form.reset();
        });
    };

    // ===================================
    // Message Display Helper
    // ===================================
    
    const showMessage = (message, type = 'success') => {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        messageEl.setAttribute('role', 'alert');
        
        // Style the message
        Object.assign(messageEl.style, {
            padding: '1rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: type === 'success' ? 'var(--color-success)' : 'var(--color-error)',
            color: 'white',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease'
        });
        
        // Insert message after form
        const form = document.querySelector('.contact-form');
        form.parentNode.insertBefore(messageEl, form.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transition = 'opacity 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    };

    // ===================================
    // Scroll Reveal Animation
    // ===================================
    
    const initScrollReveal = () => {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe feature cards and stat cards
        const cards = document.querySelectorAll('.feature-card, .stat-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    };

    // ===================================
    // Initialize All Features
    // ===================================
    
    const init = () => {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initMobileNav();
                initSmoothScroll();
                initActiveNavigation();
                initFormHandling();
                initScrollReveal();
            });
        } else {
            initMobileNav();
            initSmoothScroll();
            initActiveNavigation();
            initFormHandling();
            initScrollReveal();
        }
    };

    // Start the application
    init();

})();
