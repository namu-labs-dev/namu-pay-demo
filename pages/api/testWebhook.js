import {updateWebhookLog} from "../../lib/dataIO";

export default async function handler(req, res) {
    const body = req.body;

    console.log(await updateWebhookLog(body));

    res.status(200).json({ok:true});
}
