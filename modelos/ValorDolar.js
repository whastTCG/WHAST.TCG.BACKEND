const { timer, repeat } = require('rxjs');
const axios = require("axios");

let _valorDolar = 0;

timer(1000 * 60 * 60 * 3).pipe(repeat()).subscribe(xd => {
    setValorDolar();
})

const valorDolar = () =>{``
    return _valorDolar;
}


const setValorDolar = async() =>{
    
    try {
        const {data} = await axios.default.get("https://open.er-api.com/v6/latest/USD")

        _valorDolar = data.rates.CLP;
        console.log(_valorDolar);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    valorDolar,
    setValorDolar
}
