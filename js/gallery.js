// ============================================
// DIVINE FASHION — Gallery & Filter JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Category Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Animate items
        galleryItems.forEach((item, i) => {
          const itemCat = item.dataset.category;
          const show = category === 'all' || itemCat === category;

          item.style.transition = `opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s`;

          if (show) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            item.style.display = 'block';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              });
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => { item.style.display = 'none'; }, 400);
          }
        });
      });
    });
  }

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  let visibleItems = [];

  function openLightbox(index) {
    visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    currentIndex = index;
    showLightboxItem(currentIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showLightboxItem(index) {
    const item = visibleItems[index];
    if (!item) return;
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    if (lightboxImg && img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }
    if (lightboxCaption && caption) {
      lightboxCaption.textContent = caption.textContent;
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Attach click to gallery items
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      visibleItems = Array.from(galleryItems).filter(it => it.style.display !== 'none');
      const visibleIndex = visibleItems.indexOf(item);
      openLightbox(visibleIndex >= 0 ? visibleIndex : i);
    });
    item.style.cursor = 'pointer';
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      showLightboxItem(currentIndex);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      showLightboxItem(currentIndex);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });
});
