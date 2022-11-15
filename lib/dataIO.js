const upstash = require("./upstash");
const {getFiatExchangeRate} = require("./exchangeRate");

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

exports.getFiatExchangeRate = async (currency) => {
    let result = await upstash.get("exchangeRate");

    if (typeof result === "string") result = JSON.parse(result);

    let hasUpdated = true;

    if (!!result) {
        (result).forEach(item => {
            if (item.base === currency) {
                hasUpdated = ((new Date().getTime() / 1000) - item.updateTime) > 60 * 60 * 3;
            }
        })
    }

    if (hasUpdated) {
        result = await getFiatExchangeRate();
        console.log("perfect!! update exchangeRate");
        await upstash.set("exchangeRate", JSON.stringify(result));
    }

    if (typeof result === "string") result = JSON.parse(result);

    let late = 0;

    result.forEach(item => {
        if(item.base === currency) {
            late = item.rate;
        }
    })

    return late;
}