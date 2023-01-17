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

const createCard = (img, countryName, countryInfos) => {
    const card = createElement('div', 'card mb-4');
    card.style.width = '18rem';
    const cardImg = createElement('img', 'card-img-top');
    cardImg.setAttribute('src', `${img}`);
    const cardBody = createElement('div', 'card-body');
    const cardTitle = createElement('h5', 'card-title');
    cardTitle.textContent = `${countryName}`
    const cardText = createElement('p', 'card-text');
    cardText.textContent = `${countryInfos}`
    
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cards.appendChild(card);
}

const populateCards = async () => {
    const infos = await openAPI(countryAPI);
    console.log(infos)
    infos.forEach((info,index) => {
        createCard(infos[index].flags.svg,infos[index].name.common, countryInfos);
    });
}
populateCards();
openAPI(countryAPI);


// console.log('capital: ',api[0].capital[0])
// console.log('região: ',api[0].region)
// console.log('população: ',api[0].population)