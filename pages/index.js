import Head from "next/head";
import { useRouter } from "next/router";
import { Tip } from "../components/Tip";
import { Container } from "../components/Container";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";

import { useEffect, useState } from "react";

// A Smart Component from Framer
// import Toggle from "https://framer.com/m/Toggle-B5iT.js@52zFaz7rN7Bt3pjtYxWH";
import NamuPay from "https://framer.com/m/NamuPay-UHD3.js@fVe231tZcSsp4Z4R7eBW";
// import TEst from "https://framer.com/m/TEst-bD0l.js";
import Test1 from "https://framer.com/m/Test1-HGIJ.js@kyq8lQTH9ewgjecUblLG";

function addComma(num) {
  if (num.toString().indexOf(".") === -1)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num.toString().replace(/\B(?=(\d{3})+(?!\d)(\.){1,})/g, ",");
}
// /?companyName=회사이름&fiatPrice=34234&goodsName=구찌%20시계&tokenAmount=3432.4342&tokenName=TTN&walletAddress=0x96bf3708F3E6ab83b56aa2f7A71F4Ea0a53Ec7E6
function ellipsisWalletAddress(addr) {
  return `${addr.substring(0, 6)}....${addr.substring(addr.length - 4)}`;
}

export default function Home() {
  const router = useRouter();
  const [password, SetPassword] = useState("");
  const [waitingPayment, setWaitingPayment] = useState(0);
  const [txid, setTxid] = useState(null);
  const [data, setData] = useState({
    companyName: "",
    fiatPrice: "0",
    goodsName: "",
    tokenAmount: "0",
    tokenName: "",
    walletAddress: "",
  });
  const [element, setElement] = useState(null);

  useEffect(() => {
    setElement(document.getElementsByTagName("body"));
  }, []);

  useEffect(() => {
    // Get order info from uuid
    const { uuid } = router.query;
    const URL = window.location.origin || "http://localhost:3000";
    if (uuid)
      axios.get(URL + "/api/getOrder?uuid=" + uuid).then((res) => {
        if (res.data) setData(res.data);
      });
    // }
  }, [router.query]);

  useEffect(() => {
    checkPassword();
    SetPassword(password.substring(0, 6));
  }, [password]);

  useEffect(() => {
    [
      "p",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "li",
      "ol",
      "ul",
      "span",
    ].forEach((name) => {
      document.querySelectorAll(name).forEach((ele) => {
        ele.classList.add("framer-text");
      });
    });
  }, []);

  const close = () => {
    window.close();
  };

  const checkPassword = () => {
    if (password.length > 6) {
      alert("Password is too long", "error");
    }
  };

  const alert = (message, type) => {
    // type: info, success, warning, error or default
    toast(message, { hideProgressBar: false, autoClose: 2000, type: type });
  };

  const addPayment = async () => {
    if (waitingPayment) clearInterval(waitingPayment);
    let ret = await axios({
      method: "get",
      url: `http://localhost:3000/api/addPayment?walletAddress=${data.walletAddress}&tokenAddress=${data.tokenAddress}&tokenAmount=${data.tokenAmount}&password=${password}`,
      headers: {},
    });
    let { paymentId } = ret.data;

    const id = setInterval(async () => {
      let ret = await axios({
        method: "get",
        url: `http://localhost:3000/api/getPayment?walletAddress=${data.walletAddress}&paymentId=0`, //${paymentId}`,
        headers: {},
      });
      if (typeof JSON.parse(ret.data[0]).txid !== "undefined")
        setTxid(JSON.parse(ret.data[0]).txid);
    }, 1000);
    setWaitingPayment(id);
  };
  useEffect(() => {
    clearInterval(waitingPayment);
  }, [txid]);

  if (!element) return <></>;

  console.log(data);
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
        {/* <Toggle /> */}
        <NamuPay
          close={close}
          clickNumber={
            (e) =>
              password.length < 6
                ? SetPassword(password + e.path[0].innerText)
                : alert("Password is too long", "error")
            // hey, paste this url
            //// localhost:3000/?companyName=회사이름&fiatPrice=34234&goodsName=구찌%20시계&tokenAmount=3432.4342&tokenName=TTN&walletAddress=0x96bf3708F3E6ab83b56aa2f7A71F4Ea0a53Ec7E6
          }
          clearAll={() => SetPassword("")}
          clear={() => SetPassword(password.substring(0, password.length - 1))}
          openTxInfo={() => {
            window.open(`https://polygonscan.com/tx/${txid}`);
          }}
          txid={txid ? ellipsisWalletAddress(txid) : ""}
          className="NamuPay"
          // Using default values:
          password={password}
          companyName={data.companyName}
          fiatPrice={addComma(data.fiatPrice)}
          goodsName={data.goodsName}
          tokenAmount={addComma(data.tokenAmount)}
          tokenName={data.tokenName}
          variant={txid ? "finish" : "Confirm"}
          walletAddress={ellipsisWalletAddress(data.walletAddress)}
          purchaseEvent={() => addPayment()}
        />
      </Container>
      <ToastContainer />
    </>
  );
}
