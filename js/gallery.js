/* ============================================================
   gallery.js  –  The Her Economy | Gallery Page
   Handles: filter buttons, lightbox open/close
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Filter Logic ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        var categories = item.getAttribute('data-category') || '';

        if (filter === 'all' || categories.split(' ').indexOf(filter) !== -1) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- Lightbox Logic ---------- */
  var overlay   = document.getElementById('lightbox-overlay');
  var lbImg     = document.getElementById('lightbox-img');
  var closeBtn  = document.getElementById('lightbox-close');

  // Open on item click
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close on overlay click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) {
      closeLightbox();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLightbox(); }
  });

  // Prevent image click from bubbling to overlay close
  lbImg.addEventListener('click', function (e) { e.stopPropagation(); });

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }
})();