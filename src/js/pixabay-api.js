import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51416080-d2904871fd7ba0d85f04cdd30';

const perPage = 15;

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
