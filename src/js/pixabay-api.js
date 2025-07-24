
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51416080-d2904871fd7ba0d85f04cdd30';


export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
