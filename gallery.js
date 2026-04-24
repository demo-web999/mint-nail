document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.pageYOffset > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  navToggle?.addEventListener("click", () => {
    const isOpen = siteNav?.classList.toggle("open");
    navToggle.classList.toggle("open", Boolean(isOpen));
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  const images = [
    "2025-12-12.jpg",
    "2025-12-14.jpg",
    "2025-12-17.jpg",
    "2026-01-07.png",
    "2026-01-08.jpg",
    "2026-01-11.jpg",
    "2026-01-12.jpg",
    "2026-01-13.jpg",
    "2026-01-14.png",
    "2026-01-15.jpg",
    "2026-01-18.png",
    "2026-01-19.png",
    "2026-01-20.png",
    "2026-01-22.png",
    "2026-01-26.png",
    "2026-01-27.jpg",
    "2026-01-29.jpg",
    "2026-02-01.jpg",
    "2026-02-02.jpg",
    "2026-02-03.png",
    "2026-02-05.png",
    "2026-02-08.png",
    "2026-02-09.png",
    "2026-02-10.png",
    "2026-02-11.jpg",
    "2026-02-12.png",
    "2026-02-15.jpg",
    "2026-02-16.jpg",
    "2026-02-17.jpg",
    "2026-02-18.jpg",
    "2026-02-19.jpg",
    "2026-02-22.png",
    "2026-02-23.jpg",
    "2026-02-23.png",
    "2026-02-24.jpg",
    "2026-02-231.png"
  ];

  const masonry = document.getElementById("galleryMasonry");
  const highlightShots = [...document.querySelectorAll(".gallery-highlight-card[data-full]")];
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("galleryLightboxImage");
  const lightboxCount = document.getElementById("galleryLightboxCount");
  const closeBtn = document.getElementById("galleryLightboxClose");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");

  if (!masonry) return;

  masonry.innerHTML = images
    .map(
      (file, index) => `
        <button class="gallery-shot" type="button" data-index="${index}" data-full="image/${file}" aria-label="Open gallery image ${index + 1}">
          <img src="image/${file}" alt="Nail design ${index + 1}" loading="lazy" />
          <span class="gallery-shot-meta">Gallery #${String(index + 1).padStart(2, "0")}</span>
        </button>
      `
    )
    .join("");

  const shots = [...document.querySelectorAll(".gallery-shot")];
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImage.src = `image/${images[index]}`;
    lightboxImage.alt = `Nail design ${index + 1}`;
    lightboxCount.textContent = `${index + 1} / ${images.length}`;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  };

  const showNext = () => openLightbox((currentIndex + 1) % images.length);
  const showPrev = () => openLightbox((currentIndex - 1 + images.length) % images.length);

  shots.forEach((shot, index) => {
    shot.addEventListener("click", () => openLightbox(index));
  });

  highlightShots.forEach((shot) => {
    shot.addEventListener("click", () => {
      const full = shot.getAttribute("data-full") || "";
      const alt = shot.getAttribute("data-alt") || "Featured image";
      const matchedIndex = images.findIndex((file) => `image/${file}` === full);
      if (matchedIndex >= 0) {
        openLightbox(matchedIndex);
        return;
      }
      lightboxImage.src = full;
      lightboxImage.alt = alt;
      lightboxCount.textContent = "Featured";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn?.addEventListener("click", closeLightbox);
  nextBtn?.addEventListener("click", showNext);
  prevBtn?.addEventListener("click", showPrev);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrev();
  });
});
