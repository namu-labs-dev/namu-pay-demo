export default async function handler(req, res) {
    const {name} = req.query;

    console.log("webhook", name);

    res.status(200).json({ok:process.env});
}
