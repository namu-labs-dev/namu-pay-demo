import addCors from "../../lib/addCors";

const upstash = require("../../lib/upstash");

const Web3 = require("web3");

function getAddress(publicKey) {
  const web3 = new Web3();
  const addr = web3.utils.keccak256(Buffer.from(publicKey, "hex")).slice(-40);
  return web3.utils.toChecksumAddress(addr);
}
export default async function handler(req, res) {
  await addCors(req, res)
  const { publicKey } = req.query;

  const address = getAddress(publicKey);
  console.log("pubkeyOf:" + address, publicKey);
  await upstash.set("pubkeyOf:" + address, publicKey);

  res.status(200).json({ address });
}
