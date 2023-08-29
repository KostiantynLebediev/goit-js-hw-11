import './css/styles.css';
import { fetchImages } from './fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.Load-more');

button.style.display = 'none';
form.addEventListener('submit', handleSubmit);
button.addEventListener('click', clickBtn);

let page = 1;

async function handleSubmit(e) {
  e.preventDefault();
  let inputValue = form.elements.searchQuery.value.trim();
  page = 1;
  cleanGallary();

  if (inputValue === '') {
    return;
  }
  if (!inputValue) {
    Notiflix.Notify.failure('Please, fill search field');
    cleanGallary();

    button.style.display = 'block';
    return;
  }

  try {
    const pages = await fetchImages(inputValue, page);

    let totalPage = pages.data.totalHits;

    renderCountry(pages.data.hits);
    gallerySimpleLightbox.refresh();
    button.style.display = 'block';
    Notiflix.Notify.success(`Hooray! We found ${totalPage} images.`);
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function clickBtn() {
  page++;

  let inputValue = form.elements.searchQuery.value.trim();

  try {
    const pages = await fetchImages(inputValue, page);

    const pageAll = pages.data.totalHits;
    if (page > pageAll) {
      Notiflix.Notify.info(
        'Were sorry, but you ve reached the end of search results.'
      );
      button.style.display = 'none';
      form.reset();
    }
    renderCountry(pages.data.hits);
    gallerySimpleLightbox.refresh();
    button.style.display = 'block';
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function renderCountry(users) {
  const markup = users
    .map(image => {
      return `<div class="photo-card">
      <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width='200'/>
      <div class="info">
      <p class="info-item">
<b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
</p>
       <p class="info-item">
           <b>Views</b> <span class="info-item-api">${image.views}</span>  
       </p>
       <p class="info-item">
           <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
       </p>
       <p class="info-item">
           <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
       </p>
    </div>
      </a>
    
    </div>
    `;
    })
    .join('');
  return gallery.insertAdjacentHTML('beforeend', markup);
}

function cleanGallary() {
  gallery.innerHTML = '';
  button.style.display = 'none';
}
