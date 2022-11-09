import addCors from "../../lib/addCors";

const upstash = require("../../lib/upstash");
const EthCrypto = require("eth-crypto");
const { v4: uuidv4 } = require("uuid");

async function getPubkey(address) {
  return await upstash.get("pubkeyOf:" + address);
}
export default async function handler(req, res) {
  await addCors(req, res)
  const { uuid } = req.query;

  const data = JSON.parse(await upstash.get(uuid));

  res.status(200).json(data);
}
