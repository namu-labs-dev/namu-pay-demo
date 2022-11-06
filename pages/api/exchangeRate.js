export default async function handler(req, res) {
  const { fiatAmount, fiatName, tokenName } = req.query;

  res
    .status(200)
    .json({
      fiatAmount,
      fiatName,
      tokenName,
      tokenAmount: String(fiatAmount * 10.03),
    });
}
