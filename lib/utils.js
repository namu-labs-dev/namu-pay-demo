const Web3 = require("web3");
exports.sleep = (sec) => {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

exports.checkSumAddress = (address) => {
    const web3 = new Web3();
    const checksumAddress = web3.utils.toChecksumAddress(address);
    return checksumAddress;
}

exports.getBlockchainExplorer = (chainId) => {
    switch (chainId) {
        case 1:
            return "https://etherscan.io/tx/";
        case 3:
            return "https://ropsten.etherscan.io/tx/";
        case 4:
            return "https://rinkeby.etherscan.io/tx/";
        case 5:
            return "https://goerli.etherscan.io/tx/";
        case 42:
            return "https://kovan.etherscan.io/tx/";
        case 137:
            return "https://polygonscan.com/tx/";
        case 80001:
            return "https://mumbai.polygonscan.com/tx/";
        default:
            return "https://etherscan.io/tx/";
    }
}