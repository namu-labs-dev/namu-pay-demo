const upstash = require("../../lib/upstash");
const EthCrypto = require("eth-crypto");
const { v4: uuidv4 } = require("uuid");

async function getPubkey(address) {
  return await upstash.get("pubkeyOf:" + address);
}
export default async function handler(req, res) {
  const {
    companyName,
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
    fiatPrice,
    goodsName,
    tokenAmount,
    tokenAddress,
    tokenName,
    walletAddress,
  };

  await upstash.set(uuid, JSON.stringify(order));

  res.status(200).json({ uuid });
}
