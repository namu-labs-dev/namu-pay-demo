import addCors from "../../lib/addCors";
import {getOrder, getPayments, updatePayment} from "../../lib/dataIO";

export default async function handler(req, res) {
    await addCors(req, res)
    const { uuid } = req.query;

    const payment = await getOrder(uuid);

    const { paymentId, walletAddress } = payment;

    if (paymentId >= 0) {
        const payments = await getPayments(walletAddress, paymentId);
        if (payments.length > 0) {
            const data = JSON.parse(payments[0]);

            data['selected'] = true;
            data['expiredAt'] = new Date().getTime() + 1000 * 60 * 30;

            await updatePayment(walletAddress, paymentId, data);
        }

    }

    res.status(200).json({ok:true});
}
