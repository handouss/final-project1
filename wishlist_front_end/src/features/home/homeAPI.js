async function fetchCurrencyRatio() {
    
    const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=594db725a01d54ba26bc4853cb93b5e5&base=EUR&symbols=USD,TND'

    // const settings = {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin' : '*',
    //     },
    // }

    try {
      
        const response = await fetch(url);
        console.log(response)
        return response.json()

    } catch (error) {
        return console.error(error)
    }
}

export {fetchCurrencyRatio}