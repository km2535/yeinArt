import React from "react";
import Reqbtn from "../../common/btns/reqbtn/reqbtn";
import NewNavbar from "../../common/navbar/newNavbar";
import Head from "./head/head";
import styles from "./header.module.css";

export default function Header({
  fbuser,
  kauser,
  firebaseLogout,
  sessionLogout,
  historiesRef,
  majorWorkRef,
}) {
  return (
    <div id="top">
      <Head
        fbuser={fbuser}
        kauser={kauser}
        firebaseLogout={firebaseLogout}
        sessionLogout={sessionLogout}
      />
      <div className={styles.background}>
        <div
          className={styles.palleraxImg}
          style={{ backgroundImage: 'url("./images/main.jpg")' }}
        ></div>
      </div>
      <div className={styles.title} id="title">
        <div className={styles.mainTitle}>
          <div className={styles.yein}>
            <span className={styles.y}>Y</span>ein art
          </div>
          <div className={styles.mainSub}>
            <span>미술품 포장, 운송, 설치서비스</span>
          </div>
        </div>
        <div className={styles.subTitle}>
          <span>
            미술품, 회화, 조각, 전시작품의 포장, 운송, 설치 전문 서비스
            예인아트입니다.
            <br /> 개인전시, 초대전, 기획전, 기업전시 등 미술품 반출입을
            전문으로 하고 있으며, 미술작품을 일반 포장, 박스포장도 서비스합니다.
            <br /> 전시장소와 작품의 형태에 맞게 작품의 진가가 최대한 발휘 될수
            있도록 각 전시에 적합하게 설치해 드립니다.
            <br /> 지방 차량 이용이나 설치,포장 문의를 하실 경우 전화나 이메일,
            문자, 카카오톡을 이용하여 문의 해 주시면 성심껏 친절하게 답변해
            드리겠습니다. 감사합니다.
            <br />
          </span>
        </div>
      </div>
      <div className={styles.btnContent}>
        <Reqbtn />
      </div>
      <div className={styles.contactInfo}>
        <p className={styles.phoneNumber}>
          <a className={styles.phone1} href="tel:02-764-3931">
            (02)764-3931
          </a>
          |
          <a className={styles.phone2} href="tel:010-3725-2211">
            010-3725-2211
          </a>
        </p>
      </div>
      <div className={styles.nav} id="gnb">
        <NewNavbar
          navigationTo={[
            {
              name: "회사소개",
              to: "/#companyIntro",
              ref: historiesRef,
            },
            {
              name: "주요업무",
              to: "/#majorWork",
              ref: majorWorkRef,
            },
            { name: "운송의뢰·문의", to: "/enquire" },
            { name: "갤러리", to: "/gallery" },
          ]}
        />
      </div>
    </div>
  );
}
