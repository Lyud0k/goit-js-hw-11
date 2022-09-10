import axios from "axios";
import { Notify } from "notiflix";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const findSubmit = document.querySelector('');
const findInput = document.querySelector('');

// {
// "total": 4692,
// "totalHits": 500,
// "hits": [
//     {
//         "tags": "blossom, bloom, flower",
//         "webformatURL": "https://pixabay.com/get/35bbf209e13e39d2_640.jpg",
//         "largeImageURL": "https://pixabay.com/get/ed6a99fd0a76647_1280.jpg",
//         "views": 7671,
//         "downloads": 6439,
//         "likes": 5,
//         "comments": 2,
//     },
//     {
//         "id": 73424,
//         ...
//     },
//     ...
// ]
// }