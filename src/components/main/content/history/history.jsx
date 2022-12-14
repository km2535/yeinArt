import React, { useEffect, useState } from "react";
import styles from "./history.module.css";
import HistoryList from "./historyList";

export default function History({ historiesRef }) {
  const [historyView, setIshistoryView] = useState(false);
  const [mainTitle, setmainTitle] = useState(false);
  const [subTitle, setsubTitle] = useState(false);
  useEffect(() => {
    const scrollElement = document.getElementById("companyIntro");
    const historyTitle = document.getElementById("historyTitle");
    const subTitle = document.getElementById("subTitle");
    const scroll = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => setIshistoryView(ent.isIntersecting));
      },
      {
        rootMargin: "0px",
        threshold: 0.01,
      }
    );
    const titleMain = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => setmainTitle(ent.isIntersecting));
      },
      {
        rootMargin: "0px",
        threshold: 0.8,
      }
    );
    const titleSub = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => setsubTitle(ent.isIntersecting));
      },
      {
        rootMargin: "0px",
        threshold: 0.8,
      }
    );
    scroll.observe(scrollElement);
    titleMain.observe(historyTitle);
    titleSub.observe(subTitle);
  }, []);

  return (
    <div className={styles.container} id="companyIntro" ref={historiesRef}>
      <div className={styles.background}>
        <div
          className={styles.palleraxImg}
          style={{ backgroundImage: 'url("./images/history.png")' }}
        ></div>
      </div>
      <div className={styles.title} id="history">
        <div
          className={historyView ? styles.histories : styles.historieNone}
          id="histories"
        >
          <HistoryList />
          <HistoryList />
        </div>
        <div className={styles.description}>
          <div className={styles.mainTitle}>
            <div
              className={styles.mainInnerTitle}
              style={
                mainTitle ? { opacity: "1", transform: "translateY(10%)" } : {}
              }
              id="historyTitle"
            >
              <p className={styles.txt}>
                ????????? ????????? ???<br />
              </p>
              <p className={styles.mainSub}>????????? ???????????????.</p>
            </div>
          </div>
          <div className={styles.subTitle}>
            <div
              className={styles.subInnerTitle}
              style={
                subTitle
                  ? {
                      opacity: "1",
                      marginRight: " 5rem",
                    }
                  : {}
              }
              id="subTitle"
            >
              <p>
                ??????????????? ?????? ???????????? ????????????,
                <br /> ??????????????? ????????? ????????? ??????
                <br /> ???????????? ???????????????.
                <br /> ?????? ?????? ??????????????? ?????? ????????????
                <br />
                ?????? ?????? ?????? ????????? ??????????????????.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
