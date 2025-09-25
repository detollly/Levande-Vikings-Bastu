document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('section[data-products]').forEach(section => {
    const products = JSON.parse(section.dataset.products);

    const nameEl  = section.querySelector('.product-name');
    const priceEl = section.querySelector('.product-price');
    const descEl  = section.querySelector('.product-description');

    function updateProductInfoByIndex(productIndex) {
      const p = products[productIndex];
      if (!p) return;
      nameEl.textContent  = p.name || '';
      priceEl.textContent = p.price || '';
      descEl.innerHTML = Array.isArray(p.description)
        ? `<ul class="list-disc pl-5 marker:text-cyan-500">${p.description.map(i => `<li>${i}</li>`).join('')}</ul>`
        : (p.description || '');
    }

    const main = new Splide(section.querySelector('.main-carousel'), {
      type      : 'fade',
      rewind    : true,
      pagination: false,
      arrows    : false,
      drag      : true,
    });

    const thumbs = new Splide(section.querySelector('.thumb-carousel'), {
      fixedWidth  : 100,
      fixedHeight : 90,
      gap         : 10,
      rewind      : true,
      pagination  : false,
      isNavigation: true,
      focus       : 'center',
      arrows      : true,
      breakpoints : {
        640: { fixedWidth: 66, fixedHeight: 40 },
      },
    });

    main.sync(thumbs);
    main.mount();
    thumbs.mount();

    // Initialise with first slide's product index
    const firstSlide = section.querySelector('.main-carousel .splide__slide');
    updateProductInfoByIndex(parseInt(firstSlide.dataset.productIndex, 10));

    // Update on slide change
    main.on('move', function (newIndex) {
      const slide = main.Components.Slides.getAt(newIndex).slide;
      const productIndex = parseInt(slide.dataset.productIndex, 10);
      updateProductInfoByIndex(productIndex);
    });
  });
});


// Image enlargement / lightbox
const modal     = document.getElementById('imgModal');
const modalImg  = document.getElementById('imgModalContent');
const gallery   = document.querySelector('.gallery');
const closeBtn  = document.getElementById('closeModal');

function closeModal() {
  modal.classList.add('hidden');
  modalImg.src = '';
}

if (gallery && modal && modalImg && closeBtn) {
  gallery.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
      modalImg.src = e.target.src;
      modal.classList.remove('hidden');
      closeBtn.focus(); // accessibility
    }
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      e.stopPropagation();
      closeModal();
    }
  });
}


