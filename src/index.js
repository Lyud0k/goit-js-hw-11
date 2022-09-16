
import axios from "axios";
import { Notify } from "notiflix";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const findSubmit = document.querySelector('button[type="submit"]');
const findInput = document.querySelector('input[name="searchQuery"]');
const findDiv = document.querySelector('.all_box');
const findClick = document.querySelector('.load-more');
const findForm = document.querySelector('.search-form');

findForm.addEventListener('submit', searchPicture);
findClick.addEventListener('click', searchMore);

findClick.disabled = true;
let num = 1;

const BASE_URL = "https://pixabay.com/api/"
const key = "29818615-eeef91044a0285c2bbb309d67"
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';

class NewCont {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // fetchCont() {
  //   const url =
  //     axios.get(`https://pixabay.com/api/?key=29818615-eeef91044a0285c2bbb309d67&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
  //   return fetch(url).then(response => response.json())
  //     .then(data => {
  //       this.incrementPage();
  //       return data;
  //     });
  // }

  async getCont() {
    const options = {
      params: {
      key,
      q: this.searchQuery,
      image_type: imageType,
      orientation,
      safesearch,
      page: this.page,
      per_page: 40,
      }
      }
  try {
    const data = await axios.get(BASE_URL, options);
        
        this.incrementPage();
        return data;
      
  } catch (error) {
    console.error(error);
  }
}
  
    incrementPage() {
    this.page += 1;
  }
    resetPage() {
    this.page = 1;
  }
  get query() {
    return this.name;
  }
  set query(newName) {
    this.name = newName;
  }
}

const newCont = new NewCont();

function searchPicture(evt) {
  evt.preventDefault();
  newCont.query = evt.currentTarget.searchQuery.value;
  newCont.resetPage();
  newCont.getCont().then(data => outputPictures(data));
}

function searchMore() {
  newCont.getCont().then(data => outputPictures(data));
  // newCont.incrementPage();
}

async function outputPictures(pictures) {
  const data = await newCont.getCont();
  const allPictures = data.hits;
  const amountPictures = data.totalHits;
  findClick.disabled = false;
  if (pictures.length === 0) {
       Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    findClick.disabled = true;
  }
     const markup = allPictures
         .map((picture) => {num += 1;
           return `<div class="photo-card">
        <a href="${picture.largeImageURL}">
    <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy"  class="gallery__image" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes </b>${picture.likes}</p>
      <p class="info-item">
        <b>Views </b>${picture.views}</p>
      <p class="info-item">
        <b>Comments</b>${picture.comments}</p>
      <p class="info-item">
        <b>Downloads</b>${picture.downloads}</p>
    </div>
  </div>`;    
    })
       .join("");
  // findDiv.innerHTML = markup;
    num -= 1;
  if (num < 40) {
    findClick.disabled = true;
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
 notification(num, amountPictures);
  num = 1;
  if (newCont.page === 1) {
    findDiv.innerHTML = markup;
  }
  if (newCont.page !== 1) {
    findDiv.insertAdjacentHTML('beforeend', markup);
  }
  let gallery = new SimpleLightbox('.photo-card a');
findDiv.addEventListener('click', evt => {
  evt.preventDefault();
})
gallery.on('show.simplelightbox', function () {
	gallery.defaultOptions.captionDelay = 250;
});
gallery.refresh();
};
function notification(totalImg, totalHits) {
  if (newCont.page > 1 && totalImg === 40) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}

