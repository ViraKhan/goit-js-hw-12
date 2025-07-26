import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.btn-load');

let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 15;
let totalHits = 0;
let loadedImagesCount = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  const query = input.value.trim();
  currentQuery = query;
  currentPage = 1;
  loadedImagesCount = 0;

  if (query === '') {
    iziToast.warning({
      message: 'Введіть назву зображення!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();
  loadMoreBtn.disabled = true;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#ffffff',
      });
      return;
    }

    createGallery(data.hits);

    loadedImagesCount = data.hits.length;

    if (totalHits > loadedImagesCount) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }

    currentPage += 1;
  } catch {
    iziToast.error({
      message: 'Сталася помилка при завантаженні зображень!',
      position: 'topRight',
    });
  } finally {
    loadMoreBtn.disabled = false;
    hideLoader();
  }
}

async function handleLoadMore() {
  showLoader();
  loadMoreBtn.disabled = true;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    loadedImagesCount += data.hits.length;

    if (loadedImagesCount >= totalHits || data.hits.length < PER_PAGE)  {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    currentPage += 1;

    scrollGallerySmoothly();
  } catch {
    iziToast.error({
      message: 'Помилка при завантаженні наступної сторінки!',
      position: 'topRight',
    });
  } finally {
    loadMoreBtn.disabled = false;
    hideLoader();
  }
}

function scrollGallerySmoothly() {
  const card = document.querySelector('.gallery__item');
  const cardHeight = card?.getBoundingClientRect().height || 0;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
