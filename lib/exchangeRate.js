const axios = require("axios");


exports.getCryptoExchangeRate = async(tokenAddress = "") => {
    // TODO : get crypto exchange rate
}

exports.getFiatExchangeRate = async() => {
    const url = "https://api.manana.kr/exchange/rate.json"

    const symbols = [
        "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD", "SEK", "KRW", "SGD", "NOK", "MXN", "INR", "RUB", "ZAR", "TRY", "BRL", "TWD", "DKK", "PLN", "THB", "IDR", "HUF", "CZK", "ILS", "CLP", "PHP", "AED", "COP", "SAR", "MYR", "RON", "UAH", "VND", "ARS", "ISK", "KZT", "KWD", "QAR", "CRC", "UYU", "PKR", "EGP", "NGN", "BOB", "PEN", "PYG", "VEF", "BDT", "LKR", "HRK", "LTL", "NPR", "RON", "RSD", "XDR", "XAG", "XAU", "XPT", "XPD"
    ]
    const responseData = (await axios.get(url)).data;

    const result = []

    responseData.forEach((item) => {
        let base = "";
        let quote = "";

        const pairName = `${item.name}`.split("=")[0];

        symbols.forEach(symbol => {
            if (pairName.startsWith(symbol)) {
                base = symbol;
                quote = pairName.replace(symbol, "");
            }
        })

        result.push({
            base,
            quote,
            rate: item.rate,
            timestamp: item.timestamp,
            updateTime: (new Date()).getTime() / 1000
        })
    })

    return result;
}