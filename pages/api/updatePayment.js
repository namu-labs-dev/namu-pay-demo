import addCors from "../../lib/addCors";
import {updatePayment} from "../../lib/dataIO";

const EthCrypto = require("eth-crypto");

export default async function handler(req, res) {
  await addCors(req, res);
  const { walletAddress, result, signature } = req.query;
  const paymentId = JSON.parse(result).paymentId;

  const signer = EthCrypto.recover(signature, EthCrypto.hash.keccak256(result));
  if (signer !== walletAddress)
    return res.status(401).json({ error: "forbidden" });

  await updatePayment(walletAddress, paymentId, result);

  res.status(200).json(result);
}
