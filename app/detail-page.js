const cardsArea = document.querySelector('.cards');
const countryName = localStorage.getItem('countryName');
const countryAPI = 'https://restcountries.com/v3.1/all';

import { openAPI } from '../app/app.js';

const onload = (api) => {
    openAPI(api);
}

onload(countryAPI);


