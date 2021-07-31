import axios from "axios";

const MY_KEY = '22651071-f9099fec57830f45a4a02f8b5';
const BASE_URL = 'https://pixabay.com/api';

export default class FetchImgAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

   async fetchImg() {
    const urlParams = `key=${MY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    const url = `${BASE_URL}/?${urlParams}`;

    this.incrementPage();

    const response = await axios.get(url);
    return response.data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}