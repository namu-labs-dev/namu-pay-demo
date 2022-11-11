import addCors from "../../lib/addCors";
import {getOrder} from "../../lib/dataIO";

export default async function handler(req, res) {
  await addCors(req, res)
  const { uuid } = req.query;

  const data = await getOrder(uuid);

  res.status(200).json(data);
}
