import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/navbar/navbar";
import { useAuthContext } from "../../components/context/AuthContext";
import Footer from "../../components/main/footer/footer";
import Head from "../../components/main/header/head/head";
import { readData } from "../../service/database";
import styles from "./gallery.module.css";

export default function Gallery() {
  const { fbuser, kauser, firebaseLogout, sessionLogout } = useAuthContext();
  const [totalData, setTotalData] = useState([]);
  const [bg, setBg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBg({ backgroundImage: 'url("./images/gallery.jpg")' });
    const session = window.sessionStorage.getItem("allImgs");

    if (JSON.parse(session) !== null) {
      setTotalData(JSON.parse(session));
    } else if (JSON.parse(session) === null) {
      setIsLoading(true);
      readData("gallery", "allImgs")
        .then((v) => setTotalData(v))
        .then(() => setIsLoading(false));
    }
  }, [fbuser, kauser]);
  return (
    <>
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
        <div className={styles.title}>
          <div className={styles.mainTitle}>
            <div className={styles.yein}>
              <span className={styles.g}>G</span>ellary
            </div>
            <div className={styles.mainSub}>갤러리</div>
          </div>
          <div className={styles.subTitle}>
            <span className={styles.describe}>
              우리가 추구하는 가치는 당신의 작품이 어디서든 그 가치를 지킬 수
              있도록 작가를 위해 헌신하는 겁니다.
              <br /> 수년간 추구해온 가치로 오늘도 당신의 작품을 위해
              헌신하겠습니다.
              <br />
            </span>
          </div>
          <div className={styles.nav}>
            <Navbar />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.subTitleContent}>
            <p className={styles.mainTxt}>Gallery</p>
            <p className={styles.line}></p>
            <p className={styles.subTxt}>
              당신의 작품이 어디서든 그 빛을 바랄 수 있도록
            </p>
          </div>
        </div>
        <Outlet
          context={{ totalData, setTotalData, fbuser, isLoading, setIsLoading }}
        />
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}
