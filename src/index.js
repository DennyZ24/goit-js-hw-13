import Notiflix from "notiflix";
import FetchImgAPI from "./js/fetch-img";
import imgCardTpl from "./templates/image-card.hbs";
import './sass/main.scss';

const formEl = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more')
const imagesGallery =document.querySelector('.gallery')

formEl.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

const fetchImgAPI = new FetchImgAPI();

function onSubmit(evt) {
  evt.preventDefault();

  const query = evt.currentTarget.elements.searchQuery.value;

  fetchImgAPI.searchQuery = query;

  if (fetchImgAPI.searchQuery.trim() === '') {
    clearMarkup();
    invisibleBtnLoadMore();

    return Notiflix.Notify.warning('Write something');
  };
  
  fetchImgAPI.resetPage();

  clearMarkup();

  invisibleBtnLoadMore();

  fetchImgAPI.fetchImg().then(img => {                        
    if (img.length === 0) {
      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    addVisibleBtnLoadMore();

    addImagesMurkup(img)
  }).catch(error => console.log(error));
}

function onLoadMoreBtn() {
  if (fetchImgAPI.page > fetchImgAPI.maxPage) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");

    invisibleBtnLoadMore();
    return
    }

  fetchImgAPI.fetchImg().then(img => addImagesMurkup(img)).catch();
}

function addImagesMurkup(images) {
  const murkup = imgCardTpl(images);

  imagesGallery.insertAdjacentHTML('beforeend', murkup)
};

function clearMarkup() {
  imagesGallery.innerHTML = '';
}

function addVisibleBtnLoadMore() {
  loadMoreBtn.classList.remove('invisible');
}

function invisibleBtnLoadMore() {
  loadMoreBtn.classList.add('invisible');
}
