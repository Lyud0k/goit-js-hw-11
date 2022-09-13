
import axios from "axios";
import { Notify } from "notiflix";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const findSubmit = document.querySelector('button[type="submit"]');
const findInput = document.querySelector('input[name="searchQuery"]');
const findDiv = document.querySelector('.all_box');
const findClick = document.querySelector('button[type="button"]');
const findForm = document.querySelector('.search-form');

findForm.addEventListener('submit', searchPicture);
findClick.addEventListener('click', searchMore);

class NewCont {
  constructor() {
    this.name = '';
    this.page = 1;

  }
  fetchCont() {
    const url = `https://pixabay.com/api/?key=29818615-eeef91044a0285c2bbb309d67
      &q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    return fetch(url).then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.pictures;
      });
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
  newCont.query = evt.target.value;
  newCont.resetPage();
  newCont.fetchCont().then(outputPictures);
}

function searchMore() {
   newCont.fetchCont().then(outputPictures);
}

function outputPictures(pictures) {
  console.log(pictures);
     const markup = pictures
         .map((picture) => {
        return `<div class="photo-card">
    <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy"  class="gallery__image" />
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
    findDiv.innerHTML = markup;
};
