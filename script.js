document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const preloaderBackground = document.querySelector('.preloader-background');
    
    // Create advanced background effects
    createDataGrid();
    createHolographicLines();
    createParticles();
    createRadarEffect();
    
    // Play sound (optional)
    // playSound();
    
    // After 30 seconds
    setTimeout(() => {
        // Add exit animation
        preloader.style.transition = 'all 2s ease-in-out';
        preloader.style.opacity = '0';
        preloader.style.transform = 'scale(1.1)';
        preloader.style.backdropFilter = 'blur(20px)';
        
        // Remove preloader after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 2000);
    }, 30000); // 30 seconds total duration
});

function createDataGrid() {
    const grid = document.createElement('div');
    grid.classList.add('data-grid');
    document.querySelector('.preloader-background').appendChild(grid);
}

function createHolographicLines() {
    const background = document.querySelector('.preloader-background');
    const lineCount = 8; // Increased number of lines
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.classList.add('holographic-line');
        
        // Random positioning
        const topPos = Math.random() * 100;
        const delay = Math.random() * 15; // Longer delay range
        const duration = 30 + Math.random() * 15; // 30-45 second duration
        const thickness = Math.random() * 2 + 0.5;
        
        line.style.top = `${topPos}%`;
        line.style.height = `${thickness}px`;
        line.style.animation = `hologramScan ${duration}s linear ${delay}s infinite`;
        
        // Random color variation
        const colorVariant = Math.random() > 0.5 ? '#1DB954' : '#00FFD1';
        line.style.background = `linear-gradient(90deg, transparent, ${colorVariant}, transparent)`;
        line.style.boxShadow = `0 0 ${Math.random() * 5 + 3}px ${colorVariant}`;
        
        background.appendChild(line);
    }
}

function createParticles() {
    const background = document.querySelector('.preloader-background');
    const particleCount = 100; // More particles
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 30;
        const duration = 60 + Math.random() * 30;
        const opacity = Math.random() * 0.6 + 0.1;
        const blur = Math.random() * 4 + 1;
        
        // Random shape (circle, square, or triangle)
        const shapeType = Math.random();
        let borderRadius = '50%';
        if (shapeType > 0.7) {
            borderRadius = '2px';
        } else if (shapeType > 0.4) {
            borderRadius = '0';
            particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        }
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        particle.style.borderRadius = borderRadius;
        particle.style.filter = `blur(${blur}px)`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Random color between green and cyan with gradient
        const colorValue = Math.random() > 0.5 ? 
            `radial-gradient(circle, rgba(29, 185, 84, ${opacity}), transparent 70%)` : 
            `radial-gradient(circle, rgba(0, 255, 209, ${opacity}), transparent 70%)`;
        particle.style.background = colorValue;
        
        background.appendChild(particle);
    }
}

function createRadarEffect() {
    const logoContainer = document.querySelector('.logo-container');
    const circleCount = 6; // More circles
    
    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        circle.classList.add('radar-circle');
        
        // Size increases with each circle
        const size = 120 + (i * 100);
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        
        // Stagger the animation with different properties
        circle.style.animationDelay = `${i * 5}s`;
        circle.style.animationDuration = `${30 + (i * 5)}s`;
        
        // Vary the border color and style
        const borderColor = i % 2 === 0 ? 
            `rgba(29, 185, 84, ${0.3 - (i * 0.03)})` : 
            `rgba(0, 255, 209, ${0.3 - (i * 0.03)})`;
        circle.style.border = `${1 + (i * 0.2)}px solid ${borderColor}`;
        
        // Add some circles with dashed borders
        if (i % 3 === 0) {
            circle.style.borderStyle = 'dashed';
        }
        
        logoContainer.appendChild(circle);
    }
}

function playSound() {
    // This would be implemented with Web Audio API in a real scenario
    console.log("Playing extended futuristic tech hum sound");
    // Example implementation:
    // const audio = new Audio('sound.mp3');
    // audio.loop = true;
    // audio.volume = 0.3;
    // audio.play();
    // setTimeout(() => { audio.pause(); }, 30000);
}


document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.background = 'rgba(0, 0, 0, 0.25)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 4px 12px rgba(0, 255, 209, 0.05)';
        } 
        
        if (currentScroll > lastScroll && currentScroll > 50) {
            // Scroll down
            header.style.transform = 'translateY(-100%)';
            header.style.background = 'rgba(0, 0, 0, 0)';
            header.style.boxShadow = 'none';
        } else if (currentScroll < lastScroll) {
            // Scroll up
            header.style.transform = 'translateY(0)';
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 4px 12px rgba(0, 255, 209, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle (for future responsive implementation)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    header.appendChild(mobileMenuToggle);
    
    // Login Button Effect Enhancement
    const loginBtn = document.getElementById('login-btn');
    
    loginBtn.addEventListener('mouseenter', function() {
        const particles = 5;
        for (let i = 0; i < particles; i++) {
            createButtonParticle(this);
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Add active state to clicked link
                document.querySelectorAll('.nav-menu ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Header Background Gradient Animation
    let hueRotation = 0;
    setInterval(() => {
        hueRotation = (hueRotation + 0.5) % 360;
        header.style.setProperty('--hue-rotate', `${hueRotation}deg`);
    }, 50);
});

// Helper function for button particle effect
function createButtonParticle(button) {
    const particle = document.createElement('div');
    particle.className = 'btn-particle';
    
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width/2 + (Math.random() - 0.5) * 20;
    const y = rect.top + rect.height/2 + (Math.random() - 0.5) * 10;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.background = Math.random() > 0.5 ? '#1DB954' : '#00FFD1';
    particle.style.opacity = Math.random() * 0.5 + 0.5;
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 2 + 1;
    const xVel = Math.cos(angle) * velocity;
    const yVel = Math.sin(angle) * velocity;
    
    let posX = x;
    let posY = y;
    let opacity = parseFloat(particle.style.opacity);
    
    const animate = () => {
        posX += xVel;
        posY += yVel;
        opacity -= 0.02;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', function() {
    // Hero Section Elements
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // Background Parallax Effect
    function setupParallax() {
        const bg = heroSection.querySelector('.hero-background');
        if (!bg) return;

        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const limit = bg.offsetTop + bg.offsetHeight;
            
            if (scrollPosition > bg.offsetTop && scrollPosition <= limit) {
                const yPos = -(scrollPosition * 0.3);
                bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }

    // Button Ripple Effect
    function setupButtonEffects() {
        const buttons = [
            document.getElementById('get-started-btn'),
            document.getElementById('watch-demo-btn')
        ];

        buttons.forEach(btn => {
            if (!btn) return;

            btn.addEventListener('click', function(e) {
                // Remove any existing ripples
                const existingRipples = this.querySelectorAll('.btn-ripple');
                existingRipples.forEach(ripple => ripple.remove());

                // Create new ripple
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                
                // Position ripple at click location
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size/2;
                const y = e.clientY - rect.top - size/2;
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                // Add color based on button
                ripple.style.background = btn.id === 'get-started-btn' ? 
                    'radial-gradient(circle, rgba(29,185,84,0.4), transparent)' : 
                    'radial-gradient(circle, rgba(255,255,255,0.2), transparent)';
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => ripple.remove(), 1000);
            });
        });
    }

    // Scroll Down Indicator
    function setupScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-down';
        scrollIndicator.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        heroSection.appendChild(scrollIndicator);

        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: heroSection.offsetHeight,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for Scroll Animations
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Initialize all functionalities
    setupParallax();
    setupButtonEffects();
    setupScrollIndicator();
    setupScrollAnimations();

    // Fallback for browsers that don't support backdrop-filter
    if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
        document.querySelectorAll('.hero-overlay, .demo-btn').forEach(el => {
            el.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Feature Cards Animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    featureCards.forEach((card, index) => {
        observer.observe(card);
        
        // Staggered animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Modal Functionality
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const modal = document.createElement('div');
    modal.className = 'feature-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="close-modal"></div>
            <div class="modal-header">
                <div class="modal-icon"></div>
                <h3 class="modal-title"></h3>
            </div>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Modal Content Data
    const featureData = {
        'crop-advisor': {
            title: 'AI Crop Advisor',
            icon: 'ai-icon.svg',
            content: `
                <p>Our AI-powered crop advisor analyzes multiple data points to provide personalized recommendations:</p>
                <ul>
                    <li>Soil composition and nutrient levels</li>
                    <li>Local climate patterns and microclimate data</li>
                    <li>Historical yield data from your farm</li>
                    <li>Market demand predictions</li>
                    <li>Water availability projections</li>
                </ul>
                <p>The system continuously learns from your farming outcomes to refine its suggestions over time.</p>
            `
        },
        'irrigation': {
            title: 'Smart Irrigation',
            icon: 'water-drop-icon.svg',
            content: `
                <p>Optimize your water usage with our intelligent irrigation system:</p>
                <ul>
                    <li>Real-time soil moisture monitoring</li>
                    <li>Weather forecast integration</li>
                    <li>Crop-specific water requirements</li>
                    <li>Automated scheduling with manual override</li>
                    <li>Water conservation analytics</li>
                </ul>
                <p>Reduce water waste by up to 30% while improving crop health.</p>
            `
        },
        // Add similar data objects for other features
        'pest-detection': {
            title: 'Pest Detection',
            icon: 'leaf-bug-icon.svg',
            content: `
                <p>Early detection system for pests and diseases:</p>
                <ul>
                    <li>Image recognition from smartphone photos</li>
                    <li>Automated field monitoring with drone imagery</li>
                    <li>Species identification and threat level assessment</li>
                    <li>Organic and chemical treatment recommendations</li>
                    <li>Prevention strategies</li>
                </ul>
            `
        },
        'yield-prediction': {
            title: 'Yield Prediction',
            icon: 'graph-icon.svg',
            content: `
                <p>Accurate yield forecasting using advanced algorithms:</p>
                <ul>
                    <li>Combines satellite, drone, and ground sensor data</li>
                    <li>Historical performance analysis</li>
                    <li>Weather impact modeling</li>
                    <li>Crop growth stage tracking</li>
                    <li>Risk assessment reports</li>
                </ul>
            `
        },
        'market-insights': {
            title: 'Market Insights',
            icon: 'market-icon.svg',
            content: `
                <p>Real-time market data to maximize your profits:</p>
                <ul>
                    <li>Local and national price trends</li>
                    <li>Demand forecasting</li>
                    <li>Best time to sell recommendations</li>
                    <li>Buyer network access</li>
                    <li>Transportation and logistics insights</li>
                </ul>
            `
        },
        'weather-alerts': {
            title: 'Weather Alerts',
            icon: 'cloud-icon.svg',
            content: `
                <p>Hyper-local weather monitoring and alerts:</p>
                <ul>
                    <li>Field-specific microclimate tracking</li>
                    <li>Early warning for frost, hail, and extreme weather</li>
                    <li>Rainfall predictions and irrigation recommendations</li>
                    <li>Historical weather pattern analysis</li>
                    <li>Customizable alert thresholds</li>
                </ul>
            `
        }
    };
// Hero Section Elements
    const heroSection = document.querySelector('.hero');
    const getStartedBtn = document.getElementById('get-started-btn');
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    
    // Get Started button scroll to features
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = featuresSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Learn More Button Click Handler
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            const data = featureData[feature];
            
            if (data) {
                // Update modal content
                modal.querySelector('.modal-icon').style.backgroundImage = `url(${data.icon})`;
                modal.querySelector('.modal-title').textContent = data.title;
                modal.querySelector('.modal-body').innerHTML = data.content;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Modal
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Search functionality (optional)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search features...';
    searchInput.className = 'feature-search';
    document.querySelector('.features').insertBefore(searchInput, document.querySelector('.features-grid'));

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        featureCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const text = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || text.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Hero Section Elements
    const heroSection = document.querySelector('.hero');
    const getStartedBtn = document.getElementById('get-started-btn');
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    
    // Get Started button scroll to features
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = featuresSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Rest of your existing hero section code...
    // (video play button, button effects, etc.)
});

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = featuresSection.offsetTop - headerHeight - 20; // 20px extra spacing
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes when page loads
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
      card.classList.add('animate-card');
    });
  
    // Smooth hover effects for cards
    solutionCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  
    // Button click effects
    const buttons = document.querySelectorAll('.learn-more-btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        // Get click position
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position ripple
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 600);
        
        // For demo purposes - in a real app, this would navigate to the solution page
        const cardTitle = this.closest('.solution-card').querySelector('h4').textContent;
        console.log(`Exploring ${cardTitle} solution...`);
      });
    });
  
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-card');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Observe all solution cards
    solutionCards.forEach(card => {
      observer.observe(card);
    });
  });
  
  // Add ripple effect styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
    }
    
    @keyframes ripple {
      to {
        transform: scale(10);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);


  document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    function initAOS() {
      const cards = document.querySelectorAll('.solution-card');
      const windowHeight = window.innerHeight;
      
      function checkPosition() {
        cards.forEach((card, index) => {
          const positionFromTop = card.getBoundingClientRect().top;
          
          if (positionFromTop - windowHeight <= -100) {
            card.classList.add('aos-animate');
            // Remove event listener after animation
            if (index === cards.length - 1) {
              window.removeEventListener('scroll', checkPosition);
            }
          }
        });
      }
      
      window.addEventListener('scroll', checkPosition);
      checkPosition(); // Check on load
    }
    
    initAOS();
    
    // Mobile scroll animations (fallback for AOS)
    function mobileScrollAnimations() {
      if (window.innerWidth <= 768) {
        const cards = document.querySelectorAll('.solution-card');
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
          observer.observe(card);
        });
      }
    }
    
    mobileScrollAnimations();
    
    // Button hover effects
    const buttons = document.querySelectorAll('.learn-more-btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
      
      // Ripple effect
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
        
        // Demo action
        const cardTitle = this.closest('.solution-card').querySelector('h4').textContent;
        console.log(`Exploring ${cardTitle} solution...`);
      });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.solution-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
    
    // Add ripple effect styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .ripple-effect {
        position: absolute;
        background: rgba(0, 255, 157, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
      }
      
      @keyframes ripple {
        to {
          transform: scale(15);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Testimonials Carousel
    const carousel = document.querySelector('.testimonials-grid');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let autoScrollInterval;
    
    // Create navigation dots if they don't exist
    if (!document.querySelector('.carousel-nav')) {
      const nav = document.createElement('div');
      nav.className = 'carousel-nav';
      
      cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        nav.appendChild(dot);
      });
      
      document.querySelector('.testimonials').appendChild(nav);
    }
    
    // Update dots
    function updateDots(index) {
      document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    
    // Scroll to card
    function scrollToCard(index) {
      currentIndex = index;
      const card = cards[index];
      carousel.scrollTo({
        left: card.offsetLeft - carousel.offsetLeft - (carousel.offsetWidth - card.offsetWidth) / 2,
        behavior: 'smooth'
      });
      updateDots(index);
    }
    
    // Handle dot clicks
    document.querySelector('.testimonials').addEventListener('click', function(e) {
      if (e.target.classList.contains('carousel-dot')) {
        clearInterval(autoScrollInterval);
        scrollToCard(parseInt(e.target.dataset.index));
        startAutoScroll();
      }
    });
    
    // Handle scroll events
    carousel.addEventListener('scroll', function() {
      const cardWidth = cards[0].offsetWidth + 32; // width + gap
      const scrollPos = carousel.scrollLeft + (carousel.offsetWidth / 2);
      const newIndex = Math.round(scrollPos / cardWidth);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
        currentIndex = newIndex;
        updateDots(currentIndex);
      }
    });
    
    // Start auto-scroll
    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % cards.length;
        scrollToCard(nextIndex);
      }, 5000);
    }
    
    // Initialize auto-scroll
    startAutoScroll();
    
    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('mouseleave', startAutoScroll);
    
    // Typewriter effect for CTA
    const ctaText = "Join the 1000+ smart farmers";
    const ctaElement = document.createElement('span');
    ctaElement.className = 'typewriter';
    ctaElement.textContent = ctaText;
    
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'testimonials-cta';
    ctaContainer.innerHTML = `
      <p style="margin-bottom: 1.5rem; font-size: 1.2rem;">${ctaText}</p>
      <button class="cta-button">Get Started Now</button>
    `;
    
    document.querySelector('.testimonials').appendChild(ctaContainer);
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
        
        console.log('Get Started button clicked!');
      });
    });
    
    // Add ripple effect styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .ripple-effect {
        position: absolute;
        background: rgba(0, 255, 157, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
      }
      
      @keyframes ripple {
        to {
          transform: scale(15);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching Functionality
    const tabs = document.querySelectorAll('.pricing-tab');
    const tables = document.querySelectorAll('.pricing-table');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and tables
        tabs.forEach(t => t.classList.remove('active'));
        tables.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding table
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-plans`).classList.add('active');
      });
    });
  
    // Card Hover Effects
    const pricingTiers = document.querySelectorAll('.pricing-tier');
    
    pricingTiers.forEach(tier => {
      tier.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
      });
      
      tier.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
          this.style.transform = '';
        } else {
          this.style.transform = 'translateY(-5px)';
        }
        this.style.boxShadow = '';
      });
    });
  
    // Button Click Effects
    const buttons = document.querySelectorAll('.select-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        // Get click position
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position ripple
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 600);
        
        // Get plan details
        const planName = this.closest('.pricing-tier').querySelector('h3').textContent;
        const planPrice = this.closest('.pricing-tier').querySelector('.price').textContent;
        console.log(`Selected plan: ${planName} at ${planPrice}`);
      });
    });
  
    // Featured Card Animation
    const featuredCards = document.querySelectorAll('.featured');
    
    function pulseFeaturedCards() {
      featuredCards.forEach(card => {
        card.style.transform = 'translateY(-5px)';
        setTimeout(() => {
          card.style.transform = 'translateY(-8px)';
        }, 1000);
      });
    }
    
    // Continuous pulsing animation
    setInterval(pulseFeaturedCards, 2000);
  
    // Add ripple effect styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .ripple {
        position: absolute;
        background: rgba(0, 255, 157, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
      }
      
      @keyframes ripple {
        to {
          transform: scale(10);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">AGRIJARVIS</div>
    `;
    document.body.prepend(loadingScreen);
    
    // Simulate loading
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.remove();
      }, 600);
    }, 2000);
    
    // Founder Carousel
    const foundersGrid = document.querySelector('.founders-grid');
    const founderCards = document.querySelectorAll('.founder-card');
    let currentFounderIndex = 0;
    let autoScrollInterval;
    
    function scrollToFounder(index) {
      currentFounderIndex = index;
      const card = founderCards[index];
      foundersGrid.scrollTo({
        left: card.offsetLeft - foundersGrid.offsetLeft - (foundersGrid.offsetWidth - card.offsetWidth) / 2,
        behavior: 'smooth'
      });
    }
    
    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        const nextIndex = (currentFounderIndex + 1) % founderCards.length;
        scrollToFounder(nextIndex);
      }, 4000);
    }
    
    // Initialize auto-scroll
    startAutoScroll();
    
    // Pause auto-scroll on hover
    foundersGrid.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    foundersGrid.addEventListener('mouseleave', startAutoScroll);
    
    // Sticky Navigation
    const header = document.createElement('header');
    header.className = 'sticky-nav';
    header.innerHTML = `
      <a href="#" class="nav-logo">AGRI<span>JARVIS</span></a>
      <div class="nav-links">
        <a href="#solutions" class="nav-link">Solutions</a>
        <a href="#pricing" class="nav-link">Pricing</a>
        <a href="#founders" class="nav-link">Team</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
    `;
    document.body.prepend(header);
    
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        header.classList.add('visible');
      } else {
        header.classList.remove('visible');
      }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Message sent successfully!';
        successMsg.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: var(--primary-color);
          color: var(--dark-bg);
          padding: 1rem 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 255, 157, 0.3);
          z-index: 1001;
          transform: translateX(200%);
          transition: transform 0.4s ease;
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
          successMsg.style.transform = 'translateX(0)';
        }, 10);
        
        // Reset form
        this.reset();
        
        // Hide message after 3 seconds
        setTimeout(() => {
          successMsg.style.transform = 'translateX(200%)';
          setTimeout(() => {
            successMsg.remove();
          }, 400);
        }, 3000);
      });
    }
    
    // Add ripple effect to buttons
    function addRippleEffect(button) {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    }
    
    document.querySelectorAll('.send-btn, .social-link').forEach(button => {
      addRippleEffect(button);
    });
    
    // Add ripple effect styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .ripple-effect {
        position: absolute;
        background: rgba(0, 255, 157, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
      }
      
      @keyframes ripple {
        to {
          transform: scale(15);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Create full footer structure
    const footer = document.querySelector('.footer');
    
    // Only enhance if footer exists
    if (footer) {
      // Create container div
      const container = document.createElement('div');
      container.className = 'footer-container';
      
      // Logo and tagline section
      const logoSection = document.createElement('div');
      logoSection.innerHTML = `
        <div class="footer-logo">AgriJarvis</div>
        <p class="tagline">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Made with ❤️ in India
        </p>
        <div class="footer-social">
          <a href="#" class="social-icon">
            <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="#" class="social-icon">
            <svg viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
          <a href="#" class="social-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
        <div class="language-selector">
          <select>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
      `;
      
      // Links sections
      const linksSection1 = document.createElement('div');
      linksSection1.className = 'footer-links';
      linksSection1.innerHTML = `
        <h3>Company</h3>
        <a href="#">About Us</a>
        <a href="#">Careers</a>
        <a href="#">Blog</a>
        <a href="#">Press</a>
      `;
      
      const linksSection2 = document.createElement('div');
      linksSection2.className = 'footer-links';
      linksSection2.innerHTML = `
        <h3>Support</h3>
        <a href="#">Contact Us</a>
        <a href="#">Help Center</a>
        <a href="#">FAQs</a>
        <a href="#">Community</a>
      `;
      
      const linksSection3 = document.createElement('div');
      linksSection3.className = 'footer-links';
      linksSection3.innerHTML = `
        <h3>Legal</h3>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Cookie Policy</a>
        <a href="#">GDPR</a>
      `;
      
      const newsletterSection = document.createElement('div');
      newsletterSection.className = 'footer-newsletter';
      newsletterSection.innerHTML = `
        <h3>Stay Updated</h3>
        <input type="email" class="newsletter-input" placeholder="Your email address">
        <button class="newsletter-btn">Subscribe</button>
      `;
      
      // Copyright section
      const copyright = document.createElement('div');
      copyright.className = 'footer-copyright';
      copyright.innerHTML = `© ${new Date().getFullYear()} AgriJarvis. All rights reserved.`;
      
      // Build the footer structure
      container.appendChild(logoSection);
      container.appendChild(linksSection1);
      container.appendChild(linksSection2);
      container.appendChild(linksSection3);
      container.appendChild(newsletterSection);
      
      // Clear existing content and add new structure
      footer.innerHTML = '';
      footer.appendChild(container);
      footer.appendChild(copyright);
      
      // Newsletter form handling
      const newsletterForm = newsletterSection.querySelector('.newsletter-btn');
      if (newsletterForm) {
        newsletterForm.addEventListener('click', function(e) {
          e.preventDefault();
          const emailInput = newsletterSection.querySelector('.newsletter-input');
          if (emailInput.value.includes('@')) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.textContent = 'Thank you for subscribing!';
            successMsg.style.cssText = `
              position: fixed;
              bottom: 20px;
              right: 20px;
              background: var(--footer-accent);
              color: var(--footer-bg);
              padding: 1rem 2rem;
              border-radius: 4px;
              font-weight: 600;
              z-index: 1000;
              animation: slideIn 0.3s ease-out;
            `;
            
            document.body.appendChild(successMsg);
            
            // Remove after 3 seconds
            setTimeout(() => {
              successMsg.style.animation = 'slideOut 0.3s ease-out';
              setTimeout(() => {
                successMsg.remove();
              }, 300);
            }, 3000);
            
            // Reset input
            emailInput.value = '';
          } else {
            emailInput.style.borderColor = '#ff4757';
            setTimeout(() => {
              emailInput.style.borderColor = 'var(--footer-border)';
            }, 2000);
          }
        });
      }
      
      // Add animation styles dynamically
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  });


// Get the modal elements
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');

// Get the close modal buttons
const closeLoginModal = loginModal.querySelector('.close-modal');
const closeSignupModal = signupModal.querySelector('.close-modal');

// Get the switch authentication links
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');

// Get the login and signup forms
const loginForm = loginModal.querySelector('.email-login');
const signupForm = signupModal.querySelector('.email-signup');


// Function to open the login modal
function openLoginModal() {
    loginModal.style.display = 'block';
}

// Function to open the signup modal
function openSignupModal() {
    signupModal.style.display = 'block';
}

// Function to close the modals
function closeModals() {
    loginModal.style.display = 'none';
    signupModal.style.display = 'none';
}

// Event listeners for opening and closing modals
showSignupLink.addEventListener('click', (event) => {
    event.preventDefault();
    closeModals();
    openSignupModal();
});

showLoginLink.addEventListener('click', (event) => {
    event.preventDefault();
    closeModals();
    openLoginModal();
});

closeLoginModal.addEventListener('click', closeModals);
closeSignupModal.addEventListener('click', closeModals);


// Event listener for login form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Here you would typically make an API call to authenticate the user
    // For this example, we'll just simulate a successful login
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;



    // Replace this with your actual authentication logic
    if (email === "test@example.com" && password === "password") {
        // Redirect to dashboard on success
        window.location.href = "dashboard.html";

    } else {
       alert("Login Failed, Please check your credentials");
    }


});


// Event listener for signup form submission
signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission


        // Get form values
    const fullName = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const username = signupForm.querySelector('input[type="text"][placeholder="Username"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const confirmPassword = signupForm.querySelector('input[type="password"][placeholder="Confirm Password"]').value;

    if (password !== confirmPassword) {
        alert("Password and confirm password doesn't match");
        return;
    }


     // Simulate successful signup and redirect. Replace with your actual API call

    window.location.href = "dashboard.html";


});


window.addEventListener('click', (event) => {
    if (event.target == loginModal || event.target == signupModal)
     {
        closeModals();
    }
});


// Authentication System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const loginBtn = document.getElementById('login-btn');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const loginForm = document.querySelector('.email-login');
    const signupForm = document.querySelector('.email-signup');
    
    // Social login/signup buttons
    const socialLoginButtons = document.querySelectorAll('.social-login button');
    const socialSignupButtons = document.querySelectorAll('.social-signup button');

    // Open Login Modal
    function openLoginModal() {
        // Smooth scroll to top and show modal
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            loginModal.classList.add('modal-active');
        }, 300);
    }

    // Open Signup Modal
    function openSignupModal() {
        // Smooth scroll to top and show modal
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
            signupModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            signupModal.classList.add('modal-active');
        }, 300);
    }

    // Close Modal
    function closeModal() {
        loginModal.classList.remove('modal-active');
        signupModal.classList.remove('modal-active');
        
        setTimeout(() => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Event Listeners
    loginBtn.addEventListener('click', openLoginModal);
    
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('modal-active');
        setTimeout(() => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'block';
            setTimeout(() => signupModal.classList.add('modal-active'), 50);
        }, 300);
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.classList.remove('modal-active');
        setTimeout(() => {
            signupModal.style.display = 'none';
            loginModal.style.display = 'block';
            setTimeout(() => loginModal.classList.add('modal-active'), 50);
        }, 300);
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', function(e) {
        if (e.target === loginModal || e.target === signupModal) {
            closeModal();
        }
    });

    // Form Validation and Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        if (!email || !password) {
            showFormError(this, 'Please fill in all fields');
            return;
        }
        
        const submitBtn = this.querySelector('.login-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            authenticateUser(email, password, 'login');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[placeholder="Full Name"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const username = this.querySelector('input[placeholder="Username"]').value;
        const password = this.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
        
        if (!name || !email || !username || !password || !confirmPassword) {
            showFormError(this, 'Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            showFormError(this, 'Passwords do not match');
            return;
        }
        
        const submitBtn = this.querySelector('.signup-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            createAccount(name, email, username, password);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Social Auth Handlers
    socialLoginButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.textContent.replace('Login with ', '').toLowerCase();
            handleSocialAuth(provider, 'login');
        });
    });
    
    socialSignupButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.textContent.replace('Sign up with ', '').toLowerCase();
            handleSocialAuth(provider, 'signup');
        });
    });

    // Authentication Functions
    function authenticateUser(email, password, type) {
        // In a real app, this would be an API call
        console.log(`${type} attempt with:`, { email, password });
        
        // Simulate successful authentication
        setTimeout(() => {
            closeModal();
            showNotification(`${type === 'login' ? 'Login' : 'Signup'} successful! Redirecting...`);
            
            // Store user session (simplified - use proper auth in production)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 1000);
    }

    function createAccount(name, email, username, password) {
        // In a real app, this would be an API call
        console.log('Creating account:', { name, email, username, password });
        
        // Simulate account creation
        setTimeout(() => {
            authenticateUser(email, password, 'signup');
        }, 1000);
    }

    function handleSocialAuth(provider, type) {
        const buttons = type === 'login' ? socialLoginButtons : socialSignupButtons;
        buttons.forEach(btn => btn.disabled = true);
        
        showNotification(`Connecting with ${provider}...`);
        
        // Simulate social auth
        setTimeout(() => {
            closeModal();
            showNotification(`${provider} authentication successful!`);
            
            // Store user session
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('authProvider', provider);
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
            buttons.forEach(btn => btn.disabled = false);
        }, 2000);
    }

    // UI Helpers
    function showFormError(form, message) {
        let errorElement = form.querySelector('.form-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            form.insertBefore(errorElement, form.lastElementChild);
        }
        
        errorElement.textContent = message;
        errorElement.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            errorElement.style.opacity = '0';
            setTimeout(() => errorElement.remove(), 300);
        }, 3000);
    }

    function showNotification(message) {
        let notificationContainer = document.querySelector('.notification-container');
        
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .auth-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-active {
            opacity: 1;
        }
        
        .modal-content {
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }
        
        .modal-active .modal-content {
            transform: translateY(0);
        }
        
        .form-error {
            color: #ff3333;
            margin: 10px 0;
            font-size: 14px;
            transition: opacity 0.3s;
        }
        
        .notification-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
        }
        
        .notification {
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            margin-bottom: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: all 0.3s;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});

// Dashboard Initialization (for dashboard.html)
function initDashboard() {
    // Check authentication
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load user data
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('profile-email').textContent = userEmail;
    }
    
    console.log('Dashboard initialized');
}

// Initialize dashboard if we're on that page
if (document.getElementById('dashboard')) {
    document.addEventListener('DOMContentLoaded', initDashboard);
}
