export default async function handler(req, res) {
    const body = req.body;

    console.log("webhook", body);

    res.status(200).json({ok:true});
}
