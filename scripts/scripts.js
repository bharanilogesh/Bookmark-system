'use strict';

const inputNameEl = document.getElementById('input-name');
const inputUrlEl = document.getElementById('input-url');
const msgEl1 = document.getElementById('msg1');
const msgEl2 = document.getElementById('msg2');
const submitEl = document.getElementById('submit');
const searchInputEl = document.getElementById('search-input');
const outputData = document.getElementById('output-data');

let data = localStorage.getItem('data');
data = data ? JSON.parse(data) : [];
let validateName = null;
let validateUrl = null;

const init = () => {
  msgEl1.classList.add('hidden');
  msgEl2.classList.add('hidden');
  outputData.innerHTML = '';
};

submitEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputName = String(inputNameEl.value);
  const inputUrl = String(inputUrlEl.value);

  if (inputName && inputUrl) {
    inputValidation(inputName, inputUrl);
    if (validateName && validateUrl) {
      const formData = {
        id: Math.random(),
        name: validateName,
        url: validateUrl,
      };
      data.push(formData);
      addItem(data);
      localStorage.setItem('data', JSON.stringify(data));
    }
  } else {
    alert('Input Text Is Mandatory');
  }
  inputNameEl.value = null;
  inputUrlEl.value = null;
  validateName = null;
  validateUrl = null;
});

searchInputEl.addEventListener('input', () => {
  let result = [];
  const searchInput = searchInputEl.value.toLowerCase();

  if (data.length) {
    result = data.filter((item) => {
      return item.name.toLowerCase().includes(searchInput);
    });
  }
  addItem(result);
});

const urlValidation = (url) => {
  const splitUrl = url.split('.');
  if (
    splitUrl[0] === 'www' &&
    splitUrl[1] === splitUrl[1].toLowerCase() &&
    splitUrl[2] === 'com'
  ) {
    return true;
  } else return false;
};

const inputValidation = (inputName, inputUrl) => {
  const name = inputName[0].toUpperCase() + inputName.slice(1);

  if (name === inputName) {
    validateName = name;
  } else {
    msgEl1.classList.remove('hidden');
  }
  if (urlValidation(inputUrl)) {
    validateUrl = inputUrl;
  } else {
    msgEl2.classList.remove('hidden');
  }
};

const nameFunction = () => {
  msgEl1.classList.add('hidden');
};

const urlFunction = () => {
  msgEl2.classList.add('hidden');
};

const addItem = (lists) => {
  init();
  lists.forEach((item, index) => {
    const { id, name, url } = item;
    const liEl = document.createElement('li');
    liEl.id = id;
    liEl.innerHTML = `
      <div>${index + 1}</div>
      <div>${name}</div>
      <div><a href=${url} target="_blank">${url}</a></div>
      <div class="icon-container">
        <i class="far fa-trash-alt" id="deleteIcon" onclick="deleteItem(${id})"></i>
      </div>`;
    outputData.appendChild(liEl);
  });
};

const deleteItem = (id) => {
  data = data.filter((item) => item.id !== id);
  localStorage.setItem('data', JSON.stringify(data));
  addItem(data);
};

init();
addItem(data);
