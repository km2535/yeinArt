import React from "react";
import styles from "./history.module.css";

export default function History({ workList, historiesRef }) {
  return (
    <div className={styles.container} id="companyIntro" ref={historiesRef}>
      <div className={styles.background}>
        <div
          className={styles.palleraxImg}
          style={{ backgroundImage: 'url("./images/history.png")' }}
        ></div>
      </div>
      <div className={styles.title}>
        <div className={styles.histories} id="histories">
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
            <p className={styles.txt}>
              당신이 원하는 곳<br />
            </p>
            <p className={styles.mainSub}>어디든 함께합니다.</p>
          </div>
          <div className={styles.subTitle}>
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
  );
}
