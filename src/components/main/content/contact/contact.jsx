import React, { useEffect, useState } from "react";
import Reqbtn from "../../../common/btns/reqbtn/reqbtn";
import styles from "./contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Mail from "../../../mail/mail";
import Copy from "../../../common/copy/copy";
import kakaoMessage from "../../../../service/kakaoChannel";
import MessageLoading from "../../../common/messageLoading/messageLoading";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [isMail, setIsMail] = useState(false);
  const [copy, setCopy] = useState("");
  const [isCopy, setisCopy] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const copySomting = () => {
    setCopy("yeinartdev");
  };
  useEffect(() => {
    copy && navigator.clipboard?.writeText(copy);
    setisCopy(true);
    setTimeout(() => {
      setisCopy((prev) => !prev);
    }, 2000);
  }, [copy]);
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);
  const mailInput = () => {
    setIsMail((prev) => !prev);
  };
  const sendingMessage = () => {
    setIsSendingMessage(true);
    kakaoMessage(setIsSendingMessage, navigate);
  };
  return (
    <>
      {isMail && <Mail setIsMail={setIsMail} />}
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
            <div className={styles.mail} onClick={mailInput} id="mail">
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.mailIcon}
              ></FontAwesomeIcon>
            </div>
            <div className={styles.kakaoContainer}>
              {isSendingMessage ? (
                <div className={styles.kakaoLoading}>
                  <MessageLoading />
                </div>
              ) : (
                <div
                  className={styles.kakao}
                  style={{
                    backgroundImage: 'url("./images/kakaoChannelWithe.png")',
                  }}
                  id="kakao-linkbtn"
                  onClick={sendingMessage}
                ></div>
              )}
              <div className={styles.kakaoId} onClick={copySomting} id="kakao">
                yeinartdev
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
