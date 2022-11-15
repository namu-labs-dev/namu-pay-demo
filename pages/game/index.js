import Head from "next/head";
import { Container } from "../../components/Container";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useEffect, useRef, useState} from "react";

import X2Easy from "@namu-labs/x2easy";

import InGame from "https://framer.com/m/inGame-ByOr.js@Z1K8bp1tYsQZBBYlsC16";

const hasLocal = true;

const privateKey = "3143c309b31d076bfe499025804a3a725cf7659c638ac95204cd9d905649f4c8";

const namupayURL = hasLocal ?
    "http://localhost:3000" :
    "https://namupay.namu-labs.dev";

// useInterval
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function Game() {

    const test = async() => {
        if (typeof window !== "undefined") {
            // Client-side-only code
            window.open("https://statree.net/vin_chang?walletAddress=0x4F81a7Be7e01c98C96d72Ab8F754880100c921Fb&tokenAddress=0x4F81a7Be7e01c98C96d72Ab8F754880100c921Fb&tokenName=TTN&roundingDigits=2")
        }
    }

    useInterval(async() => {
        const {namuPay} = X2Easy.instance;

        const payments = await namuPay.getPayment(privateKey);

        payments.reverse().forEach((payment) => {
            const data = JSON.parse(payment);

            namuPay.pay(data.uuid, data.paymentId, data.tokenAddress, data.tokenAmount, data.fiatPrice, data.usdPrice, privateKey, "123456").then((res) => {
                    console.log(`DONE: ${res}`);
                })
        })
    }, 5000)

    useEffect(() => {
        ["p", "a",].forEach((name) => {
            document.querySelectorAll(name).forEach((ele) => {
                ele.classList.add("framer-text");
            });
        });

        if (typeof window !== "undefined") {
            new X2Easy();

            const {
                wallet
            } = X2Easy.instance;

            wallet.importWallet(privateKey, "123456");
        }
    }, []);

    return (
        <>
            <Head>
                <title>NamuPAY</title>
                <meta name="description" content="Modules" />
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Head>
            <Container>
                <InGame
                    openShop={() => test()} // 여기서 와드 오픈
                />
            </Container>
        </>
    )
}