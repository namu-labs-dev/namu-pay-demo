import addCors from "../../lib/addCors";
import {getOrder, setOrder, updatePayment} from "../../lib/dataIO";

const EthCrypto = require("eth-crypto");

export default async function handler(req, res) {
  await addCors(req, res);
  const { walletAddress, result, signature } = req.query;

  const jsonResult = JSON.parse(result);

  const paymentId = jsonResult.paymentId;

  const signer = EthCrypto.recover(signature, EthCrypto.hash.keccak256(result));
  if (signer !== walletAddress)
    return res.status(401).json({ error: "forbidden" });

  if (jsonResult.error) {
    await updatePayment(walletAddress, paymentId, {
      ...jsonResult,
      status: "failed",
      failReason: jsonResult.error,
    });

    let order = await getOrder(jsonResult.uuid);
    order = {
        ...order,
        status: "failed",
        failReason: jsonResult.error,
    }

    await setOrder(jsonResult.uuid, order);
  } else {
    await updatePayment(walletAddress, paymentId, result);
  }


  res.status(200).json(result);
}
