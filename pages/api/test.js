const EthCrypto = require("eth-crypto");

async function main(req, res) {
  // const payment = await EthCrypto.decryptWithPrivateKey(
  //   "0xd78666e581e73b533d90d2f064b8f302bb17d21b34d6833012c197e6e97d874a",
  //   JSON.parse(
  //     '{"iv":"28b3f2977cd43bf437c38553dce23141","ephemPublicKey":"046bc558248fcec9a4493669ee88c400d786e29f0991ceee4c489cc881e8c8dbcb1552ed2c59f0d8c2ec8ff41482fee92aa7c622a812702c197c43ec68dc9ed4d8","ciphertext":"6b18d3c925b26ddd8d8196f6388eb5cf0ed055e486aa424235cdb3374960a7962cc889583cce9427e2c8d1c9146bd9c1d98feab4d01bde3180845b2dd3294317c5af6cf4a4ba244b72db8b4229ae7824c30313408a938388ab41b38b1e8f67262beef26dbe237bb0e2c5c1436ac60862f2d3266ba939335eb9fe9398404dbe96fbd9b7be14367106fbcec672cd9135abae44dc1bcfe377b5c2d95f80402e5402f42b788955551817deb92395da8dba7c560d4ca24a779ff3309fc5f3c0ed9a813272cbd013a252f965da86b3533f676f160d5d6141bc43fb274095d5a815d91c","mac":"d8c5dc700e58c83952aa29baec386b094ead57d78a82297d4d98756277f960e1"}'
  //   )
  // );
  // console.log(payment);
  // > 0bfbde7e-7010-4cbc-8033-86636bf205c9
  // const payment = {
  //   uuid: "0bfbde7e-7010-4cbc-8033-86636bf205c9",
  //   walletAddress: "0x4F81a7Be7e01c98C96d72Ab8F754880100c921Fb",
  //   tokenAddress: "0x56789",
  //   tokenAmount: "100",
  //   password: "123456",
  //   txid: "0x123456",
  // };
  console.log(
    await EthCrypto.sign(
      "0xd78666e581e73b533d90d2f064b8f302bb17d21b34d6833012c197e6e97d874a",
      EthCrypto.hash.keccak256(
        JSON.stringify({
          uuid: "a56ac68d-1ec7-4f05-bd19-2df6dd09eef0",
          paymentId: 0,
          walletAddress: "0x4F81a7Be7e01c98C96d72Ab8F754880100c921Fb",
          tokenAddress: "0x345A498CB9fE450D602a68e3Eb4ee8e755D29ef4",
          tokenAmount: "122",
          txid: "0x000000",
        })
      )
    )
  );
}
// 해독값에서 password  삭제
// 해독값에서 txid를 추가

main();
