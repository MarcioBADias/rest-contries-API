const input = document.querySelector('input');
const select = document.querySelector('select');
const cardsArea = document.querySelector('.cards');
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
    const cardImg = createElement('img', 'card-img-top');
    const cardBody = createElement('div', 'card-body');
    const cardTitle = createElement('h5', 'card-title');
    const cardPopulation = createElement('p', 'card-text');
    const cardRegion = createElement('p', 'card-text');
    const cardCapital = createElement('p', 'card-text');


    card.style.width = '18rem';
    card.setAttribute('data-region', `${countryName} ${countryRegion}`)

    cardImg.setAttribute('src', `${img}`);
    cardImg.style.height = '100%';

    cardTitle.textContent = `${countryName}`
    cardPopulation.innerHTML = textInfo('Population', countryPopulation)
    cardRegion.innerHTML = textInfo('Region', countryRegion)
    cardCapital.innerHTML = textInfo('Capital', countryCapital)
    
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPopulation);
    cardBody.appendChild(cardRegion);
    cardBody.appendChild(cardCapital);
    cardsArea.appendChild(card);
}

const textInfo = (textTile, info) => {
    const el = `<strong>${textTile}</strong>: ${info}`
    return el;
}

const populateCards = async () => {
    const infos = await openAPI(countryAPI);
    infos.forEach((_,index) => {
        createCard(infos[index].flags.svg,infos[index].name.common, infos[index].population, infos[index].region, infos[index].capital[index]);
    });
}

createOpt = (el, region) => {
    const option = createElement('option',`dropdown-item ${region}`);
    option.textContent = el;
    select.appendChild(option)
}

createList = async () => {
    let region = [];
    const infos = await openAPI(countryAPI);
    infos.forEach((_,index) => {
        if(region.includes(infos[index].region)){
            return;
        }
        region.push(infos[index].region);
        createOpt(infos[index].region,infos[index].region);
    })
}

const filterCards = (value,el) => {
    el.forEach(item => {
        item.classList.add('d-none');
        if(item.dataset.region.toLowerCase().includes(value.toLowerCase())){
            item.classList.remove('d-none')
        }
    })
}

createList();
populateCards();
openAPI(countryAPI);

input.addEventListener('keyup', e => {
    const cards = document.querySelectorAll('.card');
    e.preventDefault();
    filterCards(e.target.value,cards);
})

select.addEventListener('click', (e) => {
    const cards = document.querySelectorAll('.card');
    filterCards(e.target.value,cards);
})
