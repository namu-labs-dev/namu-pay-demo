import addCors from "../../lib/addCors";
import { addPayment, getOrder, getPublicKey, setOrder, updatePayment } from "../../lib/dataIO";
import axios from "axios";
import { getWebhookURL } from "../../lib/webhook";
import { sleep } from "../../lib/utils";

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

  const paymentId = await addPayment(signaturePayment.walletAddress, null);


  sleep(10).then(async () => {
    // TODO: temp receipt, status added, After remove -> updatePayment move
    // TODO: 실패했을 때도 추가해줘야 함.
    const payment = await getOrder(uuid);
    const receipt = {
      txid: "0x6d2fb62eeaccac786a5e4f92b1afb046efdbdf6fb8894332af46c5d697029eeb",
      explorer: "https://polygonscan.com/tx/0x6d2fb62eeaccac786a5e4f92b1afb046efdbdf6fb8894332af46c5d697029eeb"
    }

    await setOrder(uuid, {
      ...payment,
      receipt,
      status: "succeed",
      approvedAt: new Date().toISOString(),
      paymentId
    });
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
    /* when Tx was succeed */
    .then(async () => {
      const enc_payment = await EthCrypto.encryptWithPublicKey(
        publicKey,
        JSON.stringify({
          ...signaturePayment,
          paymentId
        })
      );

      await updatePayment(signaturePayment.walletAddress, paymentId, enc_payment);

      // res.status(200).json({ paymentId: paymentId });
    })
    /* when Tx was failed */
    .catch(async (e) => {
      // do something, when Tx was failed
      // TODO: 실패 이유 추가, 고도화 시 error message에 따른 실패 문구 분류 필요
      await setOrder(uuid, {
        ...payment,
        receipt,
        status: "failed",
        falureMessage: "결제에 실패했습니다.",
        approvedAt: new Date().toISOString(),
        paymentId
      });
      // TODO: Webhook mockup. After remove
      try {
        await axios.post(await getWebhookURL(""), {
          succeed: "failed",
          orderUuid: uuid,
        });
      } catch (e) {
        console.error(e);
      }
    })
    .finally(() => res.status(200).json({
      ...payment // 지금은 모든 데이터 전송, 고도화 시 데이터 정제 필요
      // paymentId: paymentId,
      // succeedUrl: payment.urlFailure,
      // failedUrl: payment.urlSuccess,
    }))
}


/**
 */