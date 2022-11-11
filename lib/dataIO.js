const upstash = require("./upstash");

exports.setPublicKey = (address, publicKey) => {
    return upstash.set("pubkeyOf:" + address, publicKey);
}

exports.getPublicKey = (address) => {
    return upstash.get("pubkeyOf:" + address);
}

exports.setOrder = (uuid, order) => {
    let result = order;
    if (typeof result === "object") result = JSON.stringify(result);
    return upstash.set(uuid, result);
}

exports.getOrder = async(uuid, parse=true) => {
    let result = await upstash.get(uuid);
    if (parse) return JSON.parse(result);
    return result;
}

exports.addPayment = async (walletAddress, end_payment) => {
    let result = end_payment;
    if (typeof result === "object") result = JSON.stringify(result);

    return (await upstash.rpush(walletAddress, result)) - 1;
}

exports.getPayments = (walletAddress, paymentId) => {
    if (paymentId) return upstash.lrange(walletAddress, paymentId, paymentId);
    return upstash.lrange(walletAddress, -10, -1);
}

exports.updatePayment = (walletAddress, paymentId, payment) => {
    let result = payment;
    if (typeof result === "object") result = JSON.stringify(result);

    return upstash.lset(walletAddress, paymentId, result);
}