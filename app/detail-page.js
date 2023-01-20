const cardsArea = document.querySelector('.cards');
const countryName = localStorage.getItem('countryName');
const countryAPI = 'https://restcountries.com/v3.1/all';

let cardInfos = {
    img:'img', 
    countryName:'countryName', 
    countryPopulation: 'countryPopulation', 
    countryRegion: 'countryRegion',
    countrySubRagion: 'subregion',
    countryCapital: 'countryCapital',
    domain: 'domain',
    currencies: 'currencies',
    languanges: 'languages'
    }

const getAPI = async url => {
    const response = await fetch(url)
    try {
        if(!response.ok){
            throw new Error('dados não obtidos com sucesso.')
        }
        const json = await response.json()
        return json;
    } catch ({ name, message }) {
        alert(`${name} ${message}`)
    }
}

const openAPI = async url => {
    const api = await getAPI(url);
    return api;
}

const createElement = (tag, className) => {
    const el = document.createElement(tag);
    el.className = (className);
    return el;
}

const createCard = ({ img, countryName, countryPopulation, countryRegion, countrySubRagion, countryCapital, domain, currencies, languanges }) => {
    const card = createElement('div', 'card mb-4');
    const cardImg = createElement('img', 'card-img-top');
    const cardBody = createElement('div', 'card-body');
    const cardTitle = createElement('h5', 'card-title');
    const cardPopulation = createElement('p', 'card-text');
    const cardRegion = createElement('p', 'card-text');
    const cardCapital = createElement('p', 'card-text');
}
const onload = async (api) => {
    const responses = await openAPI(api);
    const cardInEvidency = responses.filter((_, index) => responses[index].name.common === countryName);
    cardsArea.innerHTML = `<h1>Exiba dos dados de <strong>${cardInEvidency[0].name.common}</strong></h1>`;
}

onload(countryAPI);


