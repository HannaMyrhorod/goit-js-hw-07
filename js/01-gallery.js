import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

insertGalleryMarkup(createGalleryMarkup(galleryItems));
gallery.addEventListener('click', onGalleryItemClick);

function createGalleryMarkup(galleryItems) {
    return galleryItems.reduce((acc, { preview, original, description }) => acc +
        `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`, "");
};

function insertGalleryMarkup(markup) {
    gallery.insertAdjacentHTML('beforeend', markup);
};

function onGalleryItemClick(event) {
    event.preventDefault();
    
    if (!event.target.classList.contains('gallery__image')) {
        return;
    };

    const fullSizeImg = event.target.dataset.source;
    manageModalWindow(fullSizeImg);
};

function manageModalWindow(img) {
    const instance = basicLightbox.create(`<img src="${img}">`, {
            onShow: () => addEventListener('keydown', onEscKeyPress),
            onClose: () => removeEventListener('keydown', onEscKeyPress),
        })
    
    instance.show();

    function onEscKeyPress(event) {
        if (event.code === 'Escape') {
            instance.close()
        };
    };
};
