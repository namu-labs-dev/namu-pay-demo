import addCors from "../../lib/addCors";
import {addPayment, getOrder, getPublicKey, setOrder} from "../../lib/dataIO";

const EthCrypto = require("eth-crypto");

export default async function handler(req, res) {
  await addCors(req, res)
  const { uuid, password } = req.query;

  const payment = await getOrder(uuid);
  payment["requestedAt"] = new Date().toISOString();
  payment["status"] = "requested";

  await setOrder(uuid, payment);

  payment["password"] = password;

  const publicKey = await getPublicKey(payment.walletAddress);
  const enc_payment = await EthCrypto.encryptWithPublicKey(
    publicKey,
    JSON.stringify(payment)
  );

  const paymentId = await addPayment(payment.walletAddress, enc_payment);

  res.status(200).json({ paymentId: paymentId });
}
