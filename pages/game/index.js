import Head from "next/head";
import { useRouter } from "next/router";
// import { Tip } from "../../components/Tip";
import { Container } from "../../components/Container";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

import InGame from "https://framer.com/m/inGame-ByOr.js@Z1K8bp1tYsQZBBYlsC16";

const hasLocal = true;

const namupayURL = hasLocal ?
    "http://localhost:3000" :
    "https://namupay.namu-labs.dev";

export default function Game() {

    const test = () => {
        console.log("success!!!")
    }

    useEffect(() => {
        ["p", "a",].forEach((name) => {
            document.querySelectorAll(name).forEach((ele) => {
                ele.classList.add("framer-text");
            });
        });
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