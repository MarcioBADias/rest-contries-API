const countryAPI = 'https://restcountries.com/v3.1/all'

const getAPI = async () => {
    const response = await fetch(countryAPI)
    const json = await response.json()
    console.log(json[0])
    console.log('nome: ',json[0].name.common)
    console.log('capital: ',json[0].capital[0])
    console.log('região: ',json[0].region)
    console.log('bandeira: ',json[0].flags.svg)
    console.log('população: ',json[0].population)
}

getAPI()
