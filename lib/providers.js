import Web3 from "web3";

export function getProvider(host) {
    return new Web3.providers.HttpProvider(host);
}

export function getPolygonProvider() {
  return getProvider("https://polygon-rpc.com");
}

export function getPolygonWeb3Instance() {
    return new Web3(getPolygonProvider());
}