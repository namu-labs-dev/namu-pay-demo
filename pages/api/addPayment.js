import addCors from "../../lib/addCors";
import {addPayment, getOrder, getPublicKey, setOrder} from "../../lib/dataIO";
import axios from "axios";
import {getWebhookURL} from "../../lib/webhook";
import {sleep} from "../../lib/utils";

const EthCrypto = require("eth-crypto");

export default async function handler(req, res) {
  await addCors(req, res)
  const { uuid, password } = req.query;

  const payment = await getOrder(uuid);
  payment["requestedAt"] = new Date().toISOString();
  payment["status"] = "requested";

  await setOrder(uuid, payment);

  const signaturePayment = {
    ...payment,
    password
  }

  const publicKey = await getPublicKey(signaturePayment.walletAddress);
  const enc_payment = await EthCrypto.encryptWithPublicKey(
    publicKey,
    JSON.stringify(signaturePayment)
  );

  const paymentId = await addPayment(signaturePayment.walletAddress, enc_payment);
  sleep(10).then(async() => {
    // TODO: temp receipt, status added, After remove -> updatePayment move
    const payment = await getOrder(uuid);
    payment["receipt"] = {
      txid: "0x6d2fb62eeaccac786a5e4f92b1afb046efdbdf6fb8894332af46c5d697029eeb",
      explorer: "https://polygonscan.com/tx/0x6d2fb62eeaccac786a5e4f92b1afb046efdbdf6fb8894332af46c5d697029eeb"
    }
    payment["status"] = "succeed";
    payment["approvedAt"] = new Date().toISOString();

    await setOrder(uuid, payment);
    // TODO: Webhook mockup. After remove
    try {
      await axios.post(await getWebhookURL(""), {
        succeed: "succeed",
        orderUuid: uuid,
      });
    } catch (e) {
      console.error(e);
    }
  })

  res.status(200).json({ paymentId: paymentId });
}
