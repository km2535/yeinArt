import React, { useEffect, useState } from "react";
import styles from "./footer.module.css";
import Term from "../../politic/term/term";
import PI from "../../politic/pi/pi";

export default function Footer() {
  const [ft, setFt] = useState([]);
  useEffect(() => {
    setFt({ backgroundImage: 'url("./images/footer.png")' });
  }, []);
  const [visibleTerm, setvisibleTerm] = useState("none");
  const [visiblePI, setvisiblePI] = useState("none");
  const isModalHandler = (e) => {
    const targetName = e.target.innerHTML;
    if (targetName === "이용약관") {
      setvisibleTerm("block");
    }
    if (targetName === "개인정보취급방침") {
      setvisiblePI("block");
    }
  };

  return (
    <>
      <Term visibleTerm={visibleTerm} setvisibleTerm={setvisibleTerm} />
      <PI visiblePI={visiblePI} setvisiblePI={setvisiblePI} />
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.palleraxImg} style={ft}></div>
        </div>
        <div className={styles.ftContent}>
          <div className={styles.ftCopy}>
            <p className={styles.ftCont} onClick={isModalHandler}>
              이용약관
            </p>
            <p className={styles.ftIndi} onClick={isModalHandler}>
              개인정보취급방침
            </p>
          </div>
          <div className={styles.ftInfo}>
            <div className={styles.ftLogo}>
              <a href="/">예인아트</a>
            </div>
            <div className={styles.ftAddr}>
              <p>
                예인아트 | 사업자등록번호 : 123-02-215632 | 대표 : 김영수 |
                서울특별시 성북구 성북로4길 52 스카이프라자 상가 동관 631호
              </p>
              <p>
                전화 :
                <a className={styles.phone1} href="tel:02-764-3931">
                  (02)764-3931
                </a>
                |
                <a className={styles.phone2} href="tel:010-3725-2211">
                  010-3725-2211
                </a>
              </p>
            </div>
          </div>
          <div className={styles.ftCompany}>
            ⓒ2022 YEINART.co.kr. ALL RIGHT RESERVED
          </div>
        </div>
      </div>
    </>
  );
}
