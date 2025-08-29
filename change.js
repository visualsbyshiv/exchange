let amount = document.getElementById('amount');
let btn = document.getElementById('convert');
let msg = document.getElementById('msg');

let fromCurrency = '';
let toCurrency = '';

function selectExchange(currency, type) {
    if (type === "forButton") {
        fromCurrency = currency;
        document.getElementById('forButton').innerText = currency;

    } else if (type === "ToButton") {
        toCurrency = currency;
        document.getElementById('ToButton').innerText = currency;
    }
}
btn.addEventListener('click', async () => {
    let amtValue = amount.value;
    if (amtValue === "" || toCurrency === "" || fromCurrency === "") {
        msg.innerText = "Pleas Enter Amount & Select currency !";
        return;
    }
    try {
        let url = `https://api.frankfurter.app/latest?amount=${amtValue}&from=${fromCurrency}&to=${toCurrency}`;
        let response = await fetch(url);
        let data = await response.json();

        let result = data.rates[toCurrency];
        if (result) {
            msg.innerText = `${amtValue} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        } else {
            msg.innerText = "Coversion is fail tryy Again";
        }
    } catch (error) {
        msg.innerText = "Api error" + error;
    }


});