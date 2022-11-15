import addCors from "../../lib/addCors";
import {setOrder} from "../../lib/dataIO";

const { v4: uuidv4 } = require("uuid");

export default async function handler(req, res) {
  await addCors(req, res)
  const {
    companyName,
    urlFailure,
    urlSuccess,
    fiatPrice,
    orderNumber,
    goodsNumber,
    goodsName,
    tokenAddress,
    tokenAmount,
    tokenName,
    walletAddress,
  } = req.query;

  const uuid = uuidv4();
  const order = {
    uuid,
    companyName,
    urlFailure,
    urlSuccess,
    fiatPrice: Number(fiatPrice) < 1000000 ? (Number(fiatPrice) / 1000000) : 1,
    orderNumber,
    goodsNumber,
    goodsName,
    tokenAddress,
    tokenAmount: Number(tokenAmount) < 1000000 ? (Number(tokenAmount) / 1000000) : 1,
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
