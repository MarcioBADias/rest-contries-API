const cards = document.querySelector('.cards');
const countryAPI = 'https://restcountries.com/v3.1/all'
const countryInfos = `Some quick example text to build on the card title and make up the bulk of the card's content.`

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

const createCard = (img, countryName, countryPopulation, countryRegion, countryCapital) => {
    const card = createElement('div', 'card mb-4');
    card.style.width = '18rem';
    const cardImg = createElement('img', 'card-img-top');
    cardImg.setAttribute('src', `${img}`);
    cardImg.style.maxHeight = '140px';
    const cardBody = createElement('div', 'card-body');
    const cardTitle = createElement('h5', 'card-title');
    cardTitle.textContent = `${countryName}`
    const cardPopulation = createElement('p', 'card-text');
    cardPopulation.textContent = `${countryPopulation}`
    const cardRegion = createElement('p', 'card-text');
    cardRegion.textContent = `${countryRegion}`
    const cardCapital = createElement('p', 'card-text');
    cardCapital.textContent = `${countryCapital}`
    
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPopulation);
    cardBody.appendChild(cardRegion);
    cardBody.appendChild(cardCapital);
    cards.appendChild(card);
}

const textInfo = (textTile, info) => {
    const el = `${textTile}: ${info}`
    return el;
}

const populateCards = async () => {
    const infos = await openAPI(countryAPI);
    console.log(infos)
    infos.forEach((info,index) => {
        createCard(infos[index].flags.svg,infos[index].name.common, textInfo('Population',infos[index].population), textInfo('Region',infos[index].region), textInfo('Capital' ,infos[index].capital[index]));
    });
}
populateCards();
openAPI(countryAPI);