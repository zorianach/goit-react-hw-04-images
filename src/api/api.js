import axios from 'axios';
import { Notify } from 'notiflix';
import { paramsForNotify } from 'components/Notify/Notify';

axios.defaults.baseURL = 'https://pixabay.com/api/';


async function getImages(searchQuery, page) {
    const API_KEY = "40320013-0b58b3814b292a6d5e83f5f83"
    const params = new URLSearchParams({
        key: API_KEY,   
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        q: searchQuery,
        per_page: 12,
        page,
        
})
    return await axios.get(`?${params}`)
        .then (response => {
    if (response.status !== 200) {
        throw new Error (response.statusText);}
    return response.data;
})
}

function onFetchError() {
    Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', paramsForNotify);
  };

// getImages("cat", 1)
// .then((data) => {
//     console.log(data)});

export {getImages, onFetchError};