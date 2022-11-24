import addCors from "../../lib/addCors";
import {toFixed} from "../../lib/deciamls";
import {getCryptoExchangeRate, getFiatExchangeRate} from "../../lib/dataIO";

export default async function handler(req, res) {
  await addCors(req, res)
  const { fiatPrice, fiatName, tokenName, tokenAddress = "" } = req.query;

  const slippage = 3;

  const usdRate = Number(fiatPrice) / Number(await getFiatExchangeRate("USD"));
  const tokenRate = await getCryptoExchangeRate(tokenAddress);

  let result = usdRate / Number(tokenRate['USDC']) * ((100 + slippage)/100);

  res.status(200).json({
    fiatPrice,
    fiatName,
    tokenPrice: result,
    tokenAddress,
    tokenName,
  });
}

