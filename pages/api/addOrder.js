import addCors from "../../lib/addCors";
import {setOrder} from "../../lib/dataIO";

const { v4: uuidv4 } = require("uuid");

export default async function handler(req, res) {
  await addCors(req, res)
  const {
    companyName,
    urlFailure,
    urlSuccess,
    fiatPrice: stringFiatPrice,
    orderNumber,
    goodsNumber,
    goodsName,
    tokenAddress,
    tokenAmount: stringTokenAmount,
    tokenName,
    walletAddress,
  } = req.query;

  const processTestAmount = (amount, min = 0.01) => {
    let result = Number(amount);

    result /= 1000000;

    if (result > 1) result = 1;
    if (result < 0.01) result = min;

    return result;
  }

  let fiatPrice = Number(stringFiatPrice);
  let tokenAmount = Number(stringTokenAmount);

  fiatPrice = processTestAmount(fiatPrice, 0.001);
  tokenAmount = processTestAmount(tokenAmount);

  const uuid = uuidv4();
  const order = {
    uuid,
    companyName,
    urlFailure,
    urlSuccess,
    fiatPrice,
    orderNumber,
    goodsNumber,
    goodsName,
    tokenAddress: tokenAddress.replace("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", ""),
    tokenAmount,
    tokenName,
    walletAddress,
    receipt: {
      txid: null,
      explorer: null
    },
    status: "pending",
    requestedAt: null, // 결제 요청 시간
    approvedAt: null, // 결제 승인 시간
  };

  await setOrder(uuid, order);

  res.status(200).json({ uuid });
}
