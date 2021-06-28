import './sass/main.scss';

import galleryItems from './js/gallery-items';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modalLightbox: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  btnModalClose: document.querySelector('[data-action="close-lightbox"]'),
};

refs.galleryList.addEventListener('click', onTargetImageClick);

const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
  })
  .join('');

refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

function onTargetImageClick(event) {
  event.preventDefault();
  const isGalleryImage = event.target.classList.contains('gallery__image');

  if (!isGalleryImage) {
    return;
  }

  appearedImage(event.target);
  onOpenModal();

  refs.btnModalClose.addEventListener('click', onCloseModal);
  refs.modalOverlay.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onTargetEscapeClick);
}

function onOpenModal() {
  refs.modalLightbox.classList.add('is-open');
}

function onCloseModal() {
  refs.modalLightbox.classList.remove('is-open');
  setImageAttribute('', '');

  refs.btnModalClose.removeEventListener('click', onCloseModal);
  refs.modalOverlay.removeEventListener('click', onCloseModal);
}

function onTargetEscapeClick(event) {
  if (event.key === 'Escape') {
    onCloseModal();
  }
}

function appearedImage(element) {
  setImageAttribute(element.dataset.source, element.alt);
}

function setImageAttribute(src, alt) {
  (refs.modalImage.src = src), (refs.modalImage.alt = alt);
}
