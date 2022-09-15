
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

class NewCont {
  constructor() {
    this.name = '';
    this.page = 1;
  }

  fetchCont() {
    console.log(this.data);
    const url = `https://pixabay.com/api/?key=29818615-eeef91044a0285c2bbb309d67&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    return fetch(url).then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
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
// const pr = newCont.fetchCont();
// console.log(pr);
// const et = pr.totalHits;
// console.log(et);

function searchPicture(evt) {
  evt.preventDefault();
  newCont.query = evt.currentTarget.searchQuery.value;
  newCont.resetPage();
  newCont.fetchCont().then(data => outputPictures(data.hits));
}

function searchMore() {
  newCont.fetchCont().then(data => outputPictures(data.hits));
  console.log(data.totalHits);
  
}

function outputPictures(pictures) {
  // const data = newCont.fetchCont();
  // const hit = data.totalHits;
  // console.log(hit);

  
  // const put = newCont.fetchCont();
  // console.log(put);
  // const data = put.data;
  // console.log(data);
  // const kolTotal = data.totalHits;
  // console.log(kolTotal);

  findClick.disabled = false;
  if (pictures.length === 0) {
       Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    findClick.disabled = true;
  }
     const markup = pictures
         .map((picture) => {num += 1;
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
  // console.log(pictures.length);
    num -= 1;
  if (num < 40) {
    findClick.disabled = true;
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
};