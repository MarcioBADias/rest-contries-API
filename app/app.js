const getAPI = async url =>{
    const response = await fetch(url).json()
    return await response;
}

const countryDatas = async url => {
    const datas = await getAPI(url);
    console.log(data)
}

countryDatas('')