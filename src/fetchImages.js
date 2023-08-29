import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39117010-188e78dbd91dcd6bc7f235c58';

export async function fetchImages(name, page = 1, per_page = 40) {
  const response = axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  return await response;
}
