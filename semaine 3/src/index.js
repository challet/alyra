import './styles.css'

const BASE_URL = 'https://source.unsplash.com/random';
const SEARCH_URL = 'https://source.unsplash.com/featured/';

let list = [];
let current_index = 0;

document.getElementById('keyword').addEventListener('keypress', (event) => {
  if (event.charCode == 13) {
    event.preventDefault();
    getImage();
  }
});

document.getElementById('prev').addEventListener('click', (event) => {
  event.preventDefault();
  if (current_index > 0) {
    displayImage(current_index - 1);
  } else {
    throw `No previous image`;
  }
});

document.getElementById('next').addEventListener('click', (event) => {
  event.preventDefault();
  if (current_index < list.length - 1) {
    displayImage(current_index + 1);
  } else {
    getImage();
  }
});

const getImage = () => {
  let search = document.getElementById('keyword').value;
  let url = search != '' ? (SEARCH_URL + '?' + search) : BASE_URL;

  fetch(url)
    .then((data) => {
      list.push(data.url);
      displayImage(list.length - 1);
    });
};

const displayImage = (index) => {
  if (typeof list[index] == 'undefined') {
    throw `No image at index ${index}`;
  }
  document.querySelector('img').src = list[index];
  current_index = index;
}

window.addEventListener('load', getImage, false );