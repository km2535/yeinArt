import React, { useEffect, useState } from "react";
import Reqbtn from "../../../common/btns/reqbtn/reqbtn";
import styles from "./contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Copy from "../../../common/copy/copy";

export default function Contact() {
  //메일 기능 ,카카오 아이디 복사하기 기능 추후 추가
  const [copy, setCopy] = useState(null);
  const [isCopy, setisCopy] = useState(false);
  const copySomting = (e) => {
    let value = e.currentTarget.id;
    switch (value) {
      case "mail":
        setCopy("yeinart22@naver.com");
        break;
      case "kakao":
        setCopy("dinelkim");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (copy) {
      navigator.clipboard.writeText(copy);
      setisCopy(true);
      setTimeout(() => {
        setisCopy((prev) => !prev);
      }, 2000);
    }
  }, [copy]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <div
            className={styles.palleraxImg}
            style={{ backgroundImage: 'url("./images/sns.png")' }}
          ></div>
        </div>
        <div className={styles.content}>
          {isCopy ? <Copy /> : ""}
          <div className={styles.snsTitle}>
            <div className={styles.snstxt}>CONTACT US</div>
            <div className={styles.facebook}>
              <a
                className={styles.facebookA}
                href="https://www.facebook.com/YeinArt22"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
            <div className={styles.blogContainer}>
              <a
                href="https://blog.naver.com/NBlogTop.naver?isHttpsRedirect=true&blogId=speedkim22"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={styles.blog}
                  style={{ backgroundImage: 'url("./images/blog.png")' }}
                ></div>
              </a>
            </div>
            <div className={styles.mail} onClick={copySomting} id="mail">
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.mailIcon}
              ></FontAwesomeIcon>
            </div>
            <div className={styles.kakaoContainer}>
              <div
                className={styles.kakao}
                style={{ backgroundImage: 'url("./images/kakao.png")' }}
              ></div>
              <div className={styles.kakaoId} onClick={copySomting} id="kakao">
                dinelkim
              </div>
            </div>
          </div>
          <div className={styles.btnContent}>
            <Reqbtn />
          </div>
        </div>
      </div>
    </>
  );
}
