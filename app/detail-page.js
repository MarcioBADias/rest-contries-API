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
    languanges: 'languanges'
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
    const imgArea = createElement('div', 'img-area');
    const cardImg = createElement('img', 'card-img');
    const infosArea = createElement('div', 'infos-area flex-column flex-wrap');
    const countrytitle = createElement('h2', 'common-name');
    const nativeName = createElement('p', 'name');
    const population = createElement('p', 'population');
    const region = createElement('p', 'region');
    const subRegion = createElement('p', 'sub-ragion');
    const capital = createElement('p', 'capital');
    const countryDomain = createElement('p','domain');
    const countryCurrencies = createElement('p', 'text-info');
    const countryLanguages = createElement('p', 'languages');

    
    cardImg.setAttribute('src', img);

    countrytitle.innerHTML = `${countryName}`
    nativeName.innerHTML = textInfo('Native Name', countryName);
    population.innerHTML = textInfo('Population', countryPopulation);
    region.innerHTML = textInfo('Region', countryRegion);
    subRegion.innerHTML = textInfo('Sub-Region', countrySubRagion);
    capital.innerHTML = textInfo('Capital', countryCapital);
    countryCurrencies.innerHTML = textInfo('Currencies', currencies);
    countryLanguages.innerHTML = textInfo('Languages', languanges)

    imgArea.style.width = '30%';
    imgArea.style.heigth = '16rem';

    infosArea.style.maxHeigth = '50px';
    infosArea.style.width = '60%';



    infosArea.appendChild(countrytitle);
    infosArea.appendChild(nativeName);
    infosArea.appendChild(population);
    infosArea.appendChild(region);
    infosArea.appendChild(subRegion);
    infosArea.appendChild(capital);
    infosArea.appendChild(countryDomain);
    infosArea.appendChild(countryCurrencies);
    infosArea.appendChild(countryLanguages);

    imgArea.appendChild(cardImg);
    cardsArea.appendChild(imgArea);
    cardsArea.append(infosArea);
}

const textInfo = (textTile, info) => {
    const el = `<strong>${textTile}</strong>: ${info}`
    return el;
}

const onload = async (api) => {
    const responses = await openAPI(api);
    const cardInEvidency = responses.filter((_, index) => responses[index].name.common === countryName);
    const data = cardInEvidency[0];
    console.log(data)
    createCard({
        img:data.flags.svg,
        countryName:data.name.common, 
        countryPopulation:data.population,
        countryRegion:data.region,
        countrySubRagion:data.subregion,
        countryCapital:data.capital,
        domain:'domain',
        currencies:data.currencies.name,
        languanges:data.languages
    })
    // cardsArea.innerHTML = `<h1>Exiba dos dados de <strong>${cardInEvidency[0].name.common}</strong></h1>`;
}

onload(countryAPI);


