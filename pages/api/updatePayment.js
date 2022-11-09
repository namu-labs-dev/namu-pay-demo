import addCors from "../../lib/addCors";

const upstash = require("../../lib/upstash");
const EthCrypto = require("eth-crypto");
const { v4: uuidv4 } = require("uuid");

async function getPubkey(address) {
  return await upstash.get("pubkeyOf:" + address);
}
export default async function handler(req, res) {
  await addCors(req, res);
  const { walletAddress, result, signature } = req.query;
  const paymentId = JSON.parse(result).paymentId;
  const signer = EthCrypto.recover(signature, EthCrypto.hash.keccak256(result));
  if (signer !== walletAddress)
    return res.status(401).json({ error: "forbidden" });

  await upstash.lset(walletAddress, paymentId, result);
  // console.log(publicKey);
  // const payment = {
  //   uuid: uuidv4(),
  //   walletAddress,
  //   tokenAddress,
  //   tokenAmount,
  //   password,
  // };

  // const payment = await EthCrypto.dec (
  //   publicKey,
  //   JSON.stringify(payment)
  // );

  // const paymentId =
  //   -1 + (await upstash.rpush(walletAddress, JSON.stringify(enc_payment)));

  res.status(200).json(result);
}
