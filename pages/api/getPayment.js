import addCors from "../../lib/addCors";
import {getPayments} from "../../lib/dataIO";

export default async function handler(req, res) {
  await addCors(req, res)
  const { walletAddress, paymentId } = req.query;

  const result = await getPayments(walletAddress, paymentId);

  res.status(200).json(result);
}
