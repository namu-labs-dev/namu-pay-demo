const upstash = require("../../lib/upstash");
const EthCrypto = require("eth-crypto");
const { v4: uuidv4 } = require("uuid");

async function getPubkey(address) {
  return await upstash.get("pubkeyOf:" + address);
}
export default async function handler(req, res) {
  const { walletAddress, tokenAddress, tokenAmount, password } = req.query;
  const publicKey = await getPubkey(walletAddress);
  const paymentLength = await upstash.llen(walletAddress);

  console.log(publicKey);
  const payment = {
    uuid: uuidv4(),
    paymentId: paymentLength,
    walletAddress,
    tokenAddress,
    tokenAmount,
    password,
  };

  const enc_payment = await EthCrypto.encryptWithPublicKey(
    publicKey,
    JSON.stringify(payment)
  );

  const paymentId =
    -1 + (await upstash.rpush(walletAddress, JSON.stringify(enc_payment)));

  res.status(200).json({ paymentId: paymentId });
}
