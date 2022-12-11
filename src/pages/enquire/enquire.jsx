import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NewNavbar from "../../components/common/navbar/newNavbar";
import { useAuthContext } from "../../components/context/AuthContext";
import { useEnquireContext } from "../../components/context/EnquireContext";
import Footer from "../../components/main/footer/footer";
import Head from "../../components/main/header/head/head";
import { readData } from "../../service/database";
import AddEnquire from "./addEnquire/addEnquire";
import styles from "./enquire.module.css";
export default function Enquire() {
  const { fbuser, kauser, firebaseLogout, sessionLogout } = useAuthContext();
  const { enquire } = useEnquireContext();
  const [bg, setBg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    setBg({ backgroundImage: 'url("./images/contract.png")' });
    const session = window.sessionStorage.getItem("allEnquire");
    if (fbuser !== null || kauser !== undefined) {
      setIsLoading(true);
      readData("enquire", "allEnquire")
        .then((v) => setTotalData(v))
        .then(() => setIsLoading(false));
    } else if (JSON.parse(session) !== null) {
      setTotalData(JSON.parse(session));
    } else if (JSON.parse(session) === null) {
      setIsLoading(true);
      readData("enquire", "allEnquire")
        .then((v) => setTotalData(v))
        .then(() => setIsLoading(false));
    }
  }, [fbuser, kauser, enquire]);
  return (
    <div className={enquire ? styles.rockPage : styles.release}>
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
          <NewNavbar
            navigationTo={[
              {
                name: "회사소개",
                to: "/#companyIntro",
              },
              {
                name: "주요업무",
                to: "/#majorWork",
              },
              { name: "운송의뢰·문의", to: "/enquire" },
              { name: "갤러리", to: "/gallery" },
            ]}
          />
        </div>
        <div className={styles.subTitle}>
          <p className={styles.mainTxt}>운송의뢰&문의</p>
          <p className={styles.line}></p>
        </div>
      </div>
      <AddEnquire />
      <Outlet context={{ totalData, kauser, fbuser, isLoading }} />
      <div>
        <Footer />
      </div>
    </div>
  );
}
