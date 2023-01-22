const input = document.querySelector('input');
const select = document.querySelector('select');
const cardsArea = document.querySelector('.cards');
const countryAPI = 'https://restcountries.com/v3.1/all';

let cardInfos = {
    img:'img', 
    countryName:'countryName', 
    countryPopulation: 'countryPopulation', 
    countryRegion: 'countryRegion', 
    countryCapital: 'countryCapital'
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

adjustingCardSizes = (card, img, apiName, apiRegion,apiFlag) => {
    card.style.width = '18rem';
    card.setAttribute('data-region', `${apiName} ${apiRegion}`);
    img.style.height = '100%';
    img.setAttribute('src', `${apiFlag}`);
}

const setDataCountryName = (img,title,infos,body,apiName) => {
    img.setAttribute('data-country', `${apiName}`);
    title.setAttribute('data-country', `${apiName}`);
    infos.setAttribute('data-country', `${apiName}`);
    body.setAttribute('data-country', `${apiName}`);
}

const setInnerHTML = (el, content) => {
    el.innerHTML = content;
}

// const setCardAttribute = (card,img,title,infosArea,cardBody)

const createCard = ({ img, countryName,countryPopulation,countryRegion,countryCapital }) => {
    const card = createElement('div', 'card mb-4');
    const cardImg = createElement('img', 'card-img-top');
    const cardBody = createElement('div', 'card-body');
    const cardTitle = createElement('h5', 'card-title');
    const cardPopulation = createElement('p', 'card-text');
    const cardRegion = createElement('p', 'card-text');
    const cardCapital = createElement('p', 'card-text');

    adjustingCardSizes(card, cardImg, countryName, countryRegion, img);
    setDataCountryName(cardImg, cardTitle, cardPopulation, cardBody, countryName);
    
    // populando informações
    cardTitle.innerHTML = `${countryName}`
    cardPopulation.innerHTML = textInfo('Population', countryPopulation)
    cardRegion.innerHTML = textInfo('Region', countryRegion)
    cardCapital.innerHTML = textInfo('Capital', countryCapital)
    
    //montagem do card
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
        createCard({img:infos[index].flags.svg, 
            countryName:infos[index].name.common, 
            countryPopulation:infos[index].population, 
            countryRegion:infos[index].region, 
            countryCapital:infos[index].capital});
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

const onload = (api) => {
    createList();
    populateCards(api);
    openAPI(api);
}

onload(countryAPI);

input.addEventListener('keyup', e => {
    const cards = document.querySelectorAll('.card');
    e.preventDefault();
    filterCards(e.target.value,cards);
})

select.addEventListener('change', e => {
    const cards = document.querySelectorAll('.card');
    filterCards(e.target.value,cards);
})

cardsArea.addEventListener('click', ({ target }) => {
    const countryName = target.dataset.country;
    if(target.className.includes('card')){
        localStorage.setItem('countryName',countryName);
        window.location = 'pages/detail-page.html';
    }
})