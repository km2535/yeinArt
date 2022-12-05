import React, { useEffect, useState } from "react";
import styles from "./majorWork.module.css";

export default function MajorWork({ majorWorkRef }) {
  const [mainTitle, setmainTitle] = useState(false);
  const [subTitle, setsubTitle] = useState(false);

  useEffect(() => {
    const mainTitle = document.getElementById("mainMajorTitle");
    const subTitle = document.getElementById("subMajorTitle");
    const titleMain = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => setmainTitle(ent.isIntersecting));
      },
      {
        rootMargin: "0px",
        threshold: 0.9,
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
    titleMain.observe(mainTitle);
    titleSub.observe(subTitle);
  }, []);
  return (
    <>
      <div className={styles.title} id="majorWork" ref={majorWorkRef}>
        <p className={styles.mainTxt}>work for you</p>
        <p className={styles.line}></p>
        <p className={styles.subTxt}>
          우리 예인아트는 오직 작가를 위해 존재합니다.
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.background}>
          <div
            className={styles.palleraxImg}
            style={{ backgroundImage: 'url("./images/intro.jpg")' }}
          ></div>
        </div>
        <div className={styles.description}>
          <div className={styles.mainTitle}>
            <div
              className={styles.mainInnerTitle}
              style={
                mainTitle ? { opacity: "1", transform: "translateY(0%)" } : {}
              }
              id="mainMajorTitle"
            >
              <p className={styles.maintxt}>특별한 작가를 위한</p>
              <p className={styles.maintxt}>특별한 노하우</p>
            </div>
          </div>
          <div className={styles.subTitle}>
            <div
              className={styles.subInnerTitle}
              id="subMajorTitle"
              style={subTitle ? { opacity: "1", marginRight: " 3rem" } : {}}
            >
              <p className={styles.subtxt}>
                작가 작업실 이사는 더욱 전문 작업자가 필요합니다.
              </p>
              <p className={styles.subtxt}>작가님의 소중한 중요작품들을 </p>
              <p className={styles.subtxt}>
                포장지,에어캡, 담요를 이용하여 꼼꼼하고
              </p>
              <p className={styles.subtxt}>안전한 이사를 도와드리며, </p>
              <p className={styles.subtxt}>
                작가님의 요청이 있을 경우 전문보조 인력을 다수 동원하여
              </p>
              <p className={styles.subtxt}>
                신속하고 빠르게 작업실 이사, 이전해 드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
