const upstash = require("./upstash");
const {getFiatExchangeRate, getPoolExchangeRates} = require("./exchangeRate");

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

exports.updateWebhookLog = async (data) => {
    let latestLog = await upstash.get("webhookLog") || "[]";

    if (typeof latestLog === "string") latestLog = JSON.parse(latestLog);

    latestLog.push(data);

    return upstash.set("webhookLog", JSON.stringify(latestLog));
}

exports.updatePayment = (walletAddress, paymentId, payment) => {
    let result = payment;
    if (typeof result === "object") result = JSON.stringify(result);

    return upstash.lset(walletAddress, paymentId, result);
}

exports.getCryptoExchangeRate = async (tokenAddress = "") => {
    let result = await upstash.get("cryptoExchangeRate:" + tokenAddress.toLowerCase());

    if (typeof result === "string") result = JSON.parse(result);

    let hasUpdated = true;

    if (!!result) {
        hasUpdated = ((new Date().getTime() / 1000) - result.updateTime) > 30;
    }

    if (hasUpdated) {
        try {
            result = await getPoolExchangeRates(tokenAddress)
            await upstash.set("cryptoExchangeRate:" + tokenAddress.toLowerCase(), JSON.stringify(result));
        } catch (e) {
            result = result || {
                "USDC": 0,
            };
        }
    }

    if (typeof result === "string") result = JSON.parse(result);

    return result;
}

exports.getFiatExchangeRate = async (currency) => {
    let result = await upstash.get("exchangeRate");

    if (typeof result === "string") result = JSON.parse(result);

    let hasUpdated = true;

    if (!!result) {
        (result).forEach(item => {
            if (item.base === currency) {
                hasUpdated = ((new Date().getTime() / 1000) - item.updateTime) > 60;
            }
        })
    }

    if (hasUpdated) {
        result = await getFiatExchangeRate();
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