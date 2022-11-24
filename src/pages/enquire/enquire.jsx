import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/navbar/navbar";
import { useAuthContext } from "../../components/context/AuthContext";
import Footer from "../../components/main/footer/footer";
import Head from "../../components/main/header/head/head";
import styles from "./enquire.module.css";
export default function Enquire() {
  const { fbuser, kauser, firebaseLogout, sessionLogout } = useAuthContext();
  const [bg, setBg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    setBg({ backgroundImage: 'url("./images/contract.png")' });
  }, []);
  return (
    <div>
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
        <div className={styles.subTitle}>
          <p className={styles.mainTxt}>Enquire</p>
          <p className={styles.line}></p>
        </div>
      </div>
      <Outlet context={{ totalData, fbuser, isLoading }} />
      <div>
        <Footer />
      </div>
    </div>
  );
}
