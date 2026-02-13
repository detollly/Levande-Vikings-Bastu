document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------
  // CAROUSELS
  // -----------------------------

  
  // Packages
  const sections = document.querySelectorAll("section[data-products]");

  sections.forEach((section) => {
    // Main
    const mainEmbla = EmblaCarousel(
      section.querySelector(".mainEmbla .embla__viewport"),
      {
        align: "start",
        containScroll: "trimSnaps",
        dragFree: false,
        loop: false,
      }
    );

    // Thumbs
    const thumbEmbla = EmblaCarousel(
      section.querySelector(".thumbEmbla .embla__viewport"),
      {
        containScroll: "trimSnaps",
        dragFree: true,
        align: "start",
      }
    );

    const thumbSlides = section.querySelectorAll(
      ".thumbEmbla .embla__slide img"
    );

    function updateActiveThumb(index) {
      thumbSlides.forEach((img, i) => {
        img.style.borderColor = i === index ? "#5A7543" : "transparent";
        img.style.transform = "scale(0.8)";
      });
    }

    function updateProductInfo(index) {
      const products = JSON.parse(section.dataset.products);
      const p = products[index];
      section.querySelector(".product-name").textContent = p.name;
      section.querySelector(".product-price").textContent = p.price;
      section.querySelector(".product-description").innerHTML = Array.isArray(
        p.description
      )
        ? p.description.map((i) => `<p>${i}</p>`).join("")
        : p.description;
    }

    mainEmbla.on("select", () => {
      const index = mainEmbla.selectedScrollSnap();
      updateActiveThumb(index);
      thumbEmbla.scrollTo(index);
      updateProductInfo(index);
    });

    thumbSlides.forEach((img, index) => {
      img.addEventListener("click", () => mainEmbla.scrollTo(index));
    });

    // Arrows
    const left = section.querySelector(".arrow-left");
    const right = section.querySelector(".arrow-right");
    if (left) left.onclick = () => mainEmbla.scrollPrev();
    if (right) right.onclick = () => mainEmbla.scrollNext();

    // Init
    updateProductInfo(0);
    updateActiveThumb(0);
  });

  // Bottom gallery
  const emblaNode = document.querySelector(".embla-projects");
  if (!emblaNode) return;

  const viewportNode = emblaNode.querySelector(".embla__viewport");
  const dotsNode = emblaNode.querySelector(".embla__dots");
  const prevBtn = emblaNode.querySelector(".embla__prev");
  const nextBtn = emblaNode.querySelector(".embla__next");

  const embla = EmblaCarousel(viewportNode, {
    loop: false,
    align: "start",
    dragFree: true,
  });

  const slideCount = embla.slideNodes().length;
  const dots = [];

  function createDots() {
    dotsNode.innerHTML = "";
    dots.length = 0;

    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className =
        "w-2 h-2 rounded-full bg-gray-300 transition-colors duration-200";
      dot.addEventListener("click", () => embla.scrollTo(i));
      dotsNode.appendChild(dot);
      dots.push(dot);
    }
  }

  function updateDots() {
    const selected = embla.selectedScrollSnap();
    dots.forEach((dot, i) => {
      dot.className =
        "w-2 h-2 rounded-full transition-colors duration-200 " +
        (i === selected ? "bg-[#5A7543]" : "bg-gray-300");
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => embla.scrollPrev());
  if (nextBtn) nextBtn.addEventListener("click", () => embla.scrollNext());

  createDots();
  updateDots();

  embla.on("select", updateDots);
  embla.on("reInit", () => {
    createDots();
    updateDots();
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
      closeBtn.focus();
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