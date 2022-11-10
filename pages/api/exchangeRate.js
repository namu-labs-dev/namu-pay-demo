import addCors from "../../lib/addCors";
import {toFixed} from "../../lib/deciamls";

export default async function handler(req, res) {
  await addCors(req, res)
  const { fiatPrice, fiatName, tokenName } = req.query;

  res.status(200).json({
    fiatPrice,
    fiatName,
    tokenPrice: toFixed(fiatPrice * (Math.random()+10),3),
    tokenName,
  });
}

