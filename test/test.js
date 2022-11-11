const EthCrypto = require("eth-crypto");
const axios = require("axios");

function sleep(sec) {
    const seconds = typeof sec === "number" ? sec : (sec ? 1 : 0);
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

const [address, privateKey, publicKey] = [
    "0xE6427421278D711b0Aa03E1D38039e0c38ce50f0",
    "0x66a0e8033fe3caaf4f5dba58420eb66214b140c3036fb29f492f1e040e39a9a7",
    "56ecfdf462ce53951b8199b47b62dd62da076d82217ff45a3b9c4bd1d27a557eb07dfa0959b7f064e809d4cb3daf12e9c91cf3d1e1f59c9078df8a1cce049162"
]

const addOrderData = {
    companyName: "더콕",
    urlFailure: "https://token.thekoc.io/",
    urlSuccess: "https://token.thekoc.io/",
    fiatPrice: "113000",
    orderNumber: "1010101",
    goodsNumber: "3039281",
    goodsName: "구찌안경",
    tokenAddress: "0x4F81a7Be7e01c98C96d72Ab8F754880100c921Fb",
    tokenAmount: "35332.23",
    tokenName: "TTN",
    walletAddress: address,
}

const getReq = async (url, queryParams) => {
    const result = await axios.get(`http://localhost:3000/api/${url}`, {
        params: queryParams
    });
    return result.data;
}

const options = {
    registerPublicKey: false,
    addOrder: false,
    getOrder: false,
    addPayment: false,
    getPayment: false,
    updatePayment: false,
}

const prettyJSON = (json) => {
    return JSON.stringify(json, null, 2);
}

async function main(test = options) {
    if (test.registerPublicKey) {
        const result = await getReq("registerPublicKey", {
            address,
            publicKey
        });
        console.log(`registerPublicKey: ${prettyJSON(result)}`);
    }

    await sleep(test.registerPublicKey);

    const uuid = (test.addOrder)
        ? await getReq("addOrder", addOrderData)
        : "dca5dd95-aca9-457e-9024-03de9c209e8e";

    console.log("addOrder:", uuid);

    await sleep(test.addOrder);

    if (test.getOrder) {
        const order = await getReq("getOrder", { uuid });
        console.log(`getOrder: ${prettyJSON(order)}`);
    }

    const paymentId = (test.addPayment)
        ? (await getReq("addPayment", {
        uuid,
        password: "123456"
    })).paymentId : 6;

    console.log("addPayment:", paymentId);

    await sleep(test.addPayment);

    if (test.getPayment) {
        const payment = await getReq("getPayment", { walletAddress: address });
        // console.log(`getPayment: ${prettyJSON(payment)}`);
        if (payment.length > 0) {
            const lastPayment = JSON.parse(payment[payment.length - 1]);
            console.log(`getPayment: ${prettyJSON(lastPayment)}`);

            if(typeof lastPayment.txid === 'undefined') {
                const resultData = JSON.parse(await EthCrypto.decryptWithPrivateKey(privateKey, lastPayment));
                console.log(`decryptWithPrivateKey: ${prettyJSON(resultData)}`);
            }
        }
    }

    if (test.updatePayment) {
        const payload = {
            paymentId,
            uuid,
            status: "success",
            walletAddress: address,
            tokenAddress: addOrderData.tokenAddress,
            tokenAmount: addOrderData.tokenAmount,
            txid: "0x1234567890",
        }

        const result = await getReq("updatePayment", {
            walletAddress: address,
            result: JSON.stringify({
                ...payload
            }),
            signature: EthCrypto.sign(
                privateKey,
                EthCrypto.hash.keccak256(JSON.stringify({
                    ...payload
                }))
            )
        });
        console.log(`updatePayment: ${prettyJSON(result)}`);
    }
}

main({
    ...options,
    getPayment: true
});
