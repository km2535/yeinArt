import React from "react";
import styles from "./content.module.css";
import MajorWork from "./majorWork/majorWork";
import History from "./history/history";
import Location from "./location/location";
import Contact from "./contact/contact";
import Ment from "./ment/ment";
import Top from "../../common/btns/top/top";
import GalleryMainPage from "./galleryMainPage/galleryMainPage";
import { useLocation } from "react-router-dom";

export default function Content({ workList, historiesRef, majorWorkRef }) {
  const location = useLocation();

  const moveContent = () => {
    location.hash === "#companyIntro" &&
      historiesRef.current.scrollIntoView({
        block: "start",
      });
    location.hash === "#majorWork" &&
      majorWorkRef.current.scrollIntoView({
        block: "start",
      });
  };
  return (
    <>
      <div className={styles.container}>
        <Top />
        <div className={styles.content}>
          <div className={styles.title}>
            <p className={styles.mainTxt}>work with us</p>
            <p className={styles.line}></p>
            <p className={styles.subTxt}>
              지금까지 수 많은 작가분들과 함께하였습니다.
            </p>
          </div>
        </div>
        <div className={styles.galleryList} onLoad={() => moveContent()}>
          <GalleryMainPage />
        </div>
        <History workList={workList} historiesRef={historiesRef} />
        <MajorWork majorWorkRef={majorWorkRef} />
        <Location />
        <Contact />
        <Ment />
      </div>
    </>
  );
}
