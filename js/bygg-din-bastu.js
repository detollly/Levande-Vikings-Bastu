document.addEventListener('DOMContentLoaded', function () {
  const productName        = document.getElementById('product-name');
  const productPrice       = document.getElementById('product-price');
  const productDescription = document.getElementById('product-description');

  function updateProductInfo(index) {
    const p = products[index];
    if (!p) return;
    productName.textContent  = p.name || '';
    productPrice.textContent = p.price || '';
    productDescription.innerHTML = Array.isArray(p.description)
      ? `<ul class="list-disc pl-5 marker:text-cyan-500">${p.description.map(i => `<li>${i}</li>`).join('')}</ul>`
      : (p.description || '');
  }

  const main = new Splide('#main-carousel', {
    type      : 'fade',
    rewind    : true,
    pagination: false,
    arrows    : false,
    drag      : true,
  });

  const thumbs = new Splide('#thumb-carousel', {
    fixedWidth  : 100,
    fixedHeight : 60,
    gap         : 10,
    rewind      : true,
    pagination  : false,
    isNavigation: true,
    focus       : 'center',
    arrows      : false,
    breakpoints : {
      640: { fixedWidth: 66, fixedHeight: 40 },
    },
  });

  main.sync(thumbs);
  main.mount();
  thumbs.mount();

  updateProductInfo(0);

  main.on('move', function (newIndex) {
    updateProductInfo(newIndex);
  });
});