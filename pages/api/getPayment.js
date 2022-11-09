import addCors from "../../lib/addCors";

const upstash = require("../../lib/upstash");

export default async function handler(req, res) {
  await addCors(req, res)
  const { walletAddress, paymentId } = req.query;
  let ret;
  if (paymentId) {
    ret = await upstash.lrange(walletAddress, paymentId, paymentId);
  } else {
    ret = await upstash.lrange(walletAddress, -10, -1);
  }
  res.status(200).json(ret);
}
