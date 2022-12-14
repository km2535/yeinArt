import React, { useEffect, useState } from "react";
import styles from "./history.module.css";

export default function History({ workList, historiesRef }) {
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
          {workList.map((workList) => (
            <p className={styles.workList} key={workList.id}>
              {workList.workplace}
            </p>
          ))}
          {workList.map((workList) => (
            <p className={styles.workList} key={workList.id}>
              {workList.workplace}
            </p>
          ))}
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
                당신이 원하는 곳<br />
              </p>
              <p className={styles.mainSub}>어디든 함께합니다.</p>
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
                작품운송은 전국 어디에나 가능하며,
                <br /> 지방전시를 끝내고 이동할 때도
                <br /> 차량이용 가능합니다.
                <br /> 또한 지방 작가님들의 서울 전시에도
                <br />
                차량 예약 받고 있으니 상담바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
