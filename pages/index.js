import Head from "next/head";
import { useRouter } from "next/router";
import { Tip } from "../components/Tip";
import { Container } from "../components/Container";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NamuPay from "https://framer.com/m/NamuPay-UHD3.js@2swm0NJVZLlnSDczyS9E"

const hasLocal = false;
const namupayURL = hasLocal ?
  "http://localhost:3000" :
  "https://namupay.namu-labs.dev";

function addComma(num) {
  if (num.toString().indexOf(".") === -1)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num.toString().replace(/\B(?=(\d{3})+(?!\d)(\.){1,})/g, ",");
}
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
    orderNumber: "",
    failReason: ""
  });
  const [element, setElement] = useState(null);
  const [status, setStatus] = useState("Confirm");
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

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

  const redirectHandler = (isSucceed) => {
    window.location.href = isSucceed
      ? data.urlSuccess + '?orderId=' + data.orderNumber + '&settlePrice=' + data.tokenAmount
      : data.urlFailure + '?orderId=' + data.orderNumber + '&message=' + data.failReason
  }

  const addPayment = async () => {
    setIsLoading(true);

    if (waitingPayment) clearInterval(waitingPayment);
    const { uuid } = router.query;

    await axios({
      method: "get",
      url: `${namupayURL}/api/addPayment?uuid=${uuid}&password=${password}`,
      headers: {},
    });
    // let { paymentId } = ret.data;

    const id = setInterval(async () => {
      let ret = await axios({
        method: "get",
        url: `${namupayURL}/api/getOrder?uuid=${uuid}`,
        headers: {},
      });

      if (ret.data.status !== "requested" && ret.data.status !== "pending") {
        setResult(ret.data)
      }
    }, 1000);

    setWaitingPayment(id);
  };

  const numHandler = (num) => {
    password.length < 6
      ? SetPassword(password + num)
      : alert("Password is too long", "error")
  }

  useEffect(() => {
    console.log("clearInterval")
    clearInterval(waitingPayment);

    setIsLoading(false);
    if (result?.status === "succeed") {
      setStatus("succeed");
      setData(result)
      setTxid(result?.receipt?.txid)
    } else if (result?.status === "failed") {
      setStatus("failed")
      setData(result)
      setTxid(result?.receipt?.txid)
    }
  }, [result]);


  const motionTestHandler = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000)
    setStatus("succeed");
  }

  if (!element) return <></>;

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
          variant={isLoading ? "loading" : status} // Confirm | tx 발송 후 "loading" | tx 성공 시 "succeed" | tx 실패 시 "failed"
          // clickNumber={
          //   (e) =>
          //     password.length < 6
          //       ? SetPassword(password + e.target.textContent)
          //       : alert("Password is too long", "error")
          //   // hey, paste this url
          //   //// localhost:3000/?companyName=회사이름&fiatPrice=34234&goodsName=구찌%20시계&tokenAmount=3432.4342&tokenName=TTN&walletAddress=0x96bf3708F3E6ab83b56aa2f7A71F4Ea0a53Ec7E6
          // }
          clickNumber0={(e) => numHandler(e.target.textContent)}
          clickNumber1={(e) => numHandler(e.target.textContent)}
          clickNumber2={(e) => numHandler(e.target.textContent)}
          clickNumber3={(e) => numHandler(e.target.textContent)}
          clickNumber4={(e) => numHandler(e.target.textContent)}
          clickNumber5={(e) => numHandler(e.target.textContent)}
          clickNumber6={(e) => numHandler(e.target.textContent)}
          clickNumber7={(e) => numHandler(e.target.textContent)}
          clickNumber8={(e) => numHandler(e.target.textContent)}
          clickNumber9={(e) => numHandler(e.target.textContent)}
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
          walletAddress={ellipsisWalletAddress(data.walletAddress)}
          purchaseEvent={() => addPayment()}
          // purchaseEvent={() => motionTestHandler()}

          orderNumber={data.orderNumber}
          errorMessage={data.failReason}
          succeedRedirect={() => redirectHandler(true)}
          failedRedirect={() => redirectHandler(false)}
        />
      </Container>
      <ToastContainer />
    </>
  );
}
