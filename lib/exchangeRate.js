const axios = require("axios");

const ethers = require("ethers");

function getContract(address, abi) {
    const RPC_URL = "https://polygon-rpc.com/";
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    return new ethers.Contract(address, abi, provider);
}

function getWrappedTokenAddress() {
    return "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
}

exports.getPoolExchangeRates = async(tokenAddress = "") => {
    const factoryAbi = require("../abi/factoryABI");
    const poolAbi = require('../abi/poolABI');
    const tokenAbi = require('../abi/erc20ABI');

    const factoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

    const factoryContract = getContract(factoryAddress, factoryAbi.ABI);

    const poolContractAddress = (await factoryContract.functions.getPool(tokenAddress || getWrappedTokenAddress(), "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", 100))[0];

    const poolContract = getContract(poolContractAddress, poolAbi.ABI);

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
        updateTime: (new Date()).getTime() / 1000
    };
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