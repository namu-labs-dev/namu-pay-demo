export default async function handler(req, res) {
  const { fiatPrice, fiatName, tokenName } = req.query;

  res.status(200).json({
    fiatPrice,
    fiatName,
    tokenPrice: String(fiatPrice * 10.03),
    tokenName,
  });
}
