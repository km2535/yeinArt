import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/navbar/navbar";
import { useAuthContext } from "../../components/context/AuthContext";
import Footer from "../../components/main/footer/footer";
import Head from "../../components/main/header/head/head";
import styles from "./notice.module.css";
import { readData } from "../../service/database";

export default function Notice() {
  const { fbuser, kauser, firebaseLogout, sessionLogout } = useAuthContext();
  const [totalData, setTotalData] = useState([]);
  const [bg, setBg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBg({ backgroundImage: 'url("./images/gallery.jpg")' });
    const session = window.sessionStorage.getItem("allItems");
    if (JSON.parse(session) !== null) {
      setTotalData(JSON.parse(session));
    } else if (JSON.parse(session) === null) {
      setIsLoading(true);
      readData("notice", "allItems")
        .then((v) => setTotalData(v))
        .then(() => setIsLoading(false));
    }
  }, [fbuser, kauser]);
  return (
    <div>
      <Head
        fbuser={fbuser}
        kauser={kauser}
        firebaseLogout={firebaseLogout}
        sessionLogout={sessionLogout}
      />
      <div className={styles.background}>
        <div className={styles.palleraxImg} style={bg}></div>
      </div>
      <div className={styles.nav}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <div className={styles.subTitle}>
          <p className={styles.mainTxt}>Notice</p>
          <p className={styles.line}></p>
        </div>
      </div>
      <Outlet
        context={{ totalData, fbuser, isLoading, setTotalData, setIsLoading }}
      />
      <div>
        <Footer />
      </div>
    </div>
  );
}
