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
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);
async function handleSubmit(event) {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Введіть назву зображення!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

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
    currentPage += 1;

    if (data.hits.length < 15 || data.totalHits <= 15) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({
      message: 'Сталася помилка при завантаженні зображень!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    currentPage++;

    const alreadyLoaded = (currentPage - 1) * 15;

    if (alreadyLoaded >= totalHits) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    // Прокручування вниз на висоту 2 карток
    scrollGallerySmoothly();
  } catch {
    iziToast.error({
      message: 'Помилка при завантаженні наступної сторінки!',
      position: 'topRight',
    });
  } finally {
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
