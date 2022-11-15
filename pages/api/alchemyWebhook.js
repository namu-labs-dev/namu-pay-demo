import {getOrder, getPayments, setOrder} from "../../lib/dataIO";
import {checkSumAddress, getBlockchainExplorer} from "../../lib/utils";
import axios from "axios";
import {getWebhookURL} from "../../lib/webhook";

export default async function handler(req, res) {
    let body = req.body;

    if (typeof body === "string") body = JSON.parse(body);

    const { hash: txid, from, chainId } = body.event.transaction;

    const walletAddress = checkSumAddress(from);

    let payments = await getPayments(walletAddress);

    const payment = JSON.parse(payments.filter(p => {
        return JSON.parse(p).txid === txid
    }).pop());

    const { uuid } = payment;

    let order = await getOrder(uuid);

    let status = "failed";
    let failReason = "unknown";

    if (body.type === "MINED_TRANSACTION") {
        // TODO : txid 검증 코드
        status = "succeed";
        order = {
            ...order,
            approvedAt: new Date().toISOString(),
            receipt: {
                txid,
                explorer: `${getBlockchainExplorer(Number(chainId))}${txid}`
            }
        }
    } else {
        failReason = "Transaction has dropped";
    }

    order = {
        ...order,
        status,
        failReason: status === "failed" ? failReason : null
    }

    await setOrder(uuid, order);

    try {
        await axios.post(await getWebhookURL(order.companyName), {
            succeed: status,
            orderUuid: uuid,
        });
    } catch (e) {
        console.error(e);
        // TODO : retry send webhook
    }

    res.status(200).json({...order});
}
