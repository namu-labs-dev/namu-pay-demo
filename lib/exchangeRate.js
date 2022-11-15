const axios = require("axios");

const Curren = require("@namu-labs/x2easy/lib/asset/currency_price");

async function getPoolExchangeRates() {
    const factoryAbi = require("../abi/factoryABI");
    const poolAbi = require('../abi/poolABI');
    const tokenAbi = require('../abi/erc20ABI');

    const poolContract = getContract(this._poolContractAddress, poolAbi.ABI);

    const token0Contract = getContract((await poolContract.functions.token0())[0], tokenAbi.ABI);

    const token1Contract = getContract((await poolContract.functions.token1())[0], tokenAbi.ABI);

    const token0Decimals = ethers.BigNumber.from((await token0Contract.functions.decimals())[0]);
    const token1Decimals = ethers.BigNumber.from((await token1Contract.functions.decimals())[0]);

    const token0Symbol = (await token0Contract.functions.symbol())[0];
    const token1Symbol = (await token1Contract.functions.symbol())[0];

    const sqrtRatioX96 = (await poolContract.functions.slot0())[0];

    const subDecimal =
        ethers.BigNumber.from(10) ** token0Decimals / ethers.BigNumber.from(10) ** token1Decimals;

    const token1ToToken0Rate = 2 ** 192 / sqrtRatioX96 ** 2 / subDecimal;
    const token0ToToken1Rate = 1 / token1ToToken0Rate;

    return {
        [token0Symbol]: token1ToToken0Rate,
        [token1Symbol]: token0ToToken1Rate,
    };
}

exports.getCryptoExchangeRate = async(tokenAddress = "") => {
    // TODO : get crypto exchange rate

    new X2Easy()
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