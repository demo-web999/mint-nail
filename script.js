document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  const animateElements = document.querySelectorAll('.section, .card, .g-item, .price-item, .hero-text, .hero-media, .pricing-wrapper, .booking-wrapper');
  animateElements.forEach((el, index) => {
    if (el.classList.contains('card')) {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${index * 0.1}s`;
    } else if (el.classList.contains('g-item')) {
      el.classList.add('scale-in');
      el.style.transitionDelay = `${index * 0.05}s`;
    } else if (el.classList.contains('hero-text')) {
      el.classList.add('slide-in-left');
    } else if (el.classList.contains('hero-media')) {
      el.classList.add('slide-in-right');
    } else if (el.classList.contains('pricing-image')) {
      el.classList.add('slide-in-left');
    } else if (el.classList.contains('pricing-content')) {
      el.classList.add('slide-in-right');
    } else if (el.classList.contains('booking-image')) {
      el.classList.add('slide-in-left');
    } else if (el.classList.contains('booking-content')) {
      el.classList.add('slide-in-right');
    } else {
      el.classList.add('fade-in');
    }
    observer.observe(el);
  });

  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Banner Carousel
  const carousel = document.querySelector('.banner-carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  const showSlide = (index) => {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
  };
  
  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
  };
  
  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
  };
  
  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  // Auto-play (optional)
  let autoPlayInterval;
  const startAutoPlay = () => {
    autoPlayInterval = setInterval(nextSlide, 4000);
  };
  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
  };
  
  // Start auto-play
  startAutoPlay();
  
  // Pause on hover
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const toTop = document.querySelector(".to-top");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a link (mobile)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scroll for on-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Back to top
  if (toTop) {
    const toggleToTop = () => {
      if (window.scrollY > 400) {
        toTop.style.display = "flex";
        toTop.classList.add('visible');
      } else {
        toTop.style.display = "none";
        toTop.classList.remove('visible');
      }
    };
    toggleToTop();
    window.addEventListener("scroll", toggleToTop);
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toTop.style.transform = "scale(0.9)";
      setTimeout(() => {
        toTop.style.transform = "";
      }, 200);
    });
  }

  // Booking form toggle
  const bookingToggleBtn = document.getElementById('bookingToggleBtn');
  const bookingFormContainer = document.getElementById('bookingFormContainer');
  
  if (bookingToggleBtn && bookingFormContainer) {
    bookingToggleBtn.addEventListener('click', () => {
      const isHidden = bookingFormContainer.style.display === 'none';
      
      if (isHidden) {
        bookingFormContainer.style.display = 'block';
        bookingToggleBtn.textContent = 'Hide booking form';
        
        // Smooth scroll to form
        setTimeout(() => {
          bookingFormContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      } else {
        bookingFormContainer.style.display = 'none';
        bookingToggleBtn.textContent = 'Book Now';
      }
    });
  }

  // Booking form
  const form = document.querySelector(".booking-form");
  const status = document.querySelector(".form-status");
  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const service = (data.get("service") || "").toString();
      const date = (data.get("date") || "").toString();
      const time = (data.get("time") || "").toString();

      // Simple validation
      if (!name || !phone || !service || !date || !time) {
        status.textContent = "Please complete all required fields.";
        status.style.color = "#c00";
        return;
      }

      // Simulate submission with animation
      status.textContent = "Sending your request...";
      status.style.color = "#6b6b6b";
      status.style.transform = "scale(0.95)";
      status.style.opacity = "0.8";
      
      setTimeout(() => {
        status.textContent = `Thank you, ${name}! We will contact you soon to confirm your appointment.`;
        status.style.color = "#0a0a0a";
        status.style.transform = "scale(1)";
        status.style.opacity = "1";
        status.style.animation = "bounce 0.5s ease";
        form.reset();
        
        // Reset animation after it completes
        setTimeout(() => {
          status.style.animation = "";
        }, 500);
      }, 800);
    });
  }

  // Gallery Lightbox
  const galleryItems = document.querySelectorAll('.g-item');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  const totalImages = galleryItems.length;
  
  const openLightbox = (index) => {
    currentImageIndex = index;
    const imageSrc = galleryItems[index].getAttribute('data-image');
    const imageAlt = galleryItems[index].getAttribute('aria-label');
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    lightboxCounter.textContent = `${index + 1} / ${totalImages}`;
    lightboxOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    
    // Add animation
    lightboxImage.style.opacity = '0';
    lightboxImage.style.transform = 'scale(0.8)';
    setTimeout(() => {
      lightboxImage.style.transition = 'all 0.3s ease';
      lightboxImage.style.opacity = '1';
      lightboxImage.style.transform = 'scale(1)';
    }, 10);
  };
  
  const closeLightbox = () => {
    lightboxOverlay.hidden = true;
    document.body.style.overflow = '';
  };
  
  const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    lightboxImage.style.transform = 'translateX(50px) scale(0.8)';
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
      openLightbox(currentImageIndex);
    }, 150);
  };
  
  const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    lightboxImage.style.transform = 'translateX(-50px) scale(0.8)';
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
      openLightbox(currentImageIndex);
    }, 150);
  };
  
  // Event listeners
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.style.cursor = 'pointer';
  });
  
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightboxOverlay && !lightboxOverlay.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    }
  });

  // Floating Contact Panel
  const bookingItem = document.querySelector('.booking-item');
  if (bookingItem) {
    bookingItem.addEventListener('click', (e) => {
      e.preventDefault();
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Auto-open booking form if it's hidden
        setTimeout(() => {
          const bookingToggleBtn = document.getElementById('bookingToggleBtn');
          if (bookingToggleBtn && bookingToggleBtn.textContent === 'Book Now') {
            bookingToggleBtn.click();
          }
        }, 500);
      }
    });
  }

  // Testimonials toggle
  const testimonialsToggleBtn = document.getElementById('testimonialsToggleBtn');
  const extraTestimonials = document.querySelectorAll('.extra-testimonial');
  if (testimonialsToggleBtn && extraTestimonials.length) {
    testimonialsToggleBtn.addEventListener('click', () => {
      const isExpanded = testimonialsToggleBtn.getAttribute('aria-expanded') === 'true';
      extraTestimonials.forEach((item) => {
        item.hidden = isExpanded;
      });
      testimonialsToggleBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      testimonialsToggleBtn.textContent = isExpanded ? 'Show More Reviews' : 'Show Less Reviews';
      if (!isExpanded) {
        setTimeout(() => {
          extraTestimonials[0]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 80);
      }
    });
  }

  // Service cards now are links; no modal logic needed
});
