const upstash = require("../../lib/upstash");
const EthCrypto = require("eth-crypto");
const { v4: uuidv4 } = require("uuid");

async function getPubkey(address) {
  return await upstash.get("pubkeyOf:" + address);
}
export default async function handler(req, res) {
  const { uuid, password } = req.query;

  const payment = JSON.parse(await upstash.get(uuid));
  payment["password"] = password;

  // console.log(payment);
  const publicKey = await getPubkey(payment.walletAddress);
  const enc_payment = await EthCrypto.encryptWithPublicKey(
    publicKey,
    JSON.stringify(payment)
  );

  const paymentId =
    -1 +
    (await upstash.rpush(payment.walletAddress, JSON.stringify(enc_payment)));

  res.status(200).json({ paymentId: paymentId });
}
