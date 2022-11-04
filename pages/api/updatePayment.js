const EthCrypto = require("eth-crypto");
// const Web3 = require("web3");

// import Web3 from "web3";

const main = async () => {
  const alice = EthCrypto.createIdentity();

  console.log(alice);

  // const unSignMessage = web3.eth.accounts.recover()
};

main();
