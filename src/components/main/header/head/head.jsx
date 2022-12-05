import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./head.module.css";
import { useState } from "react";
import Navbar from "../../../common/navbar/navbar";
import { useEffect } from "react";
export default function Head({
  fbuser,
  kauser,
  firebaseLogout,
  sessionLogout,
}) {
  const [isMenu, setIsMenu] = useState(false);
  const [logo, setLogo] = useState([]);
  const onMenu = () => {
    setIsMenu((prev) => !prev);
  };
  useEffect(() => {
    setLogo("./images/logo.jpg");
  }, []);
  return (
    <div
      className={styles.head}
      style={
        isMenu
          ? { transform: "translateX(0)" }
          : { height: "10vh", zIndex: "5" }
      }
    >
      <Link className={styles.imgContent} to="/">
        <img className={styles.img} src={logo} alt="" />
      </Link>
      <div className={styles.mbMenu}>
        <FontAwesomeIcon icon={faBars} onClick={onMenu} />
      </div>
      <div
        className={styles.mbContainer}
        style={
          isMenu
            ? { transform: "translateX(0)" }
            : { transform: "translateX(150%)", height: "20vh" }
        }
      >
        <div className={styles.close}>
          <FontAwesomeIcon icon={faClose} onClick={onMenu} />
        </div>
        <div className={styles.mbForm}>
          {fbuser || kauser ? (
            fbuser ? (
              <div>
                <span className={styles.welcome}>
                  {fbuser.displayName}님 환영합니다.
                </span>{" "}
                |{" "}
                <span onClick={firebaseLogout} className={styles.logout}>
                  logout
                </span>
              </div>
            ) : (
              <div onClick={sessionLogout}>
                <span className={styles.welcome}>
                  {kauser.properties.nickname
                    ? kauser.properties.nickname
                    : kauser.kakao_account.email}
                  님 환영합니다.{" "}
                </span>
                |{" "}
                <span onClick={sessionLogout} className={styles.logout}>
                  logout
                </span>
              </div>
            )
          ) : (
            <>
              <Link className={styles.login} to="/login">
                login
              </Link>
              <Link className={styles.join} to="/join">
                join
              </Link>
            </>
          )}
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <div className={styles.form}>
        {fbuser || kauser ? (
          fbuser ? (
            <div>
              <span className={styles.welcome}>
                {fbuser.displayName}님 환영합니다.
              </span>{" "}
              |{" "}
              <span onClick={firebaseLogout} className={styles.logout}>
                logout
              </span>
            </div>
          ) : (
            <div onClick={sessionLogout}>
              <span className={styles.welcome}>
                {kauser.properties.nickname
                  ? kauser.properties.nickname
                  : kauser.kakao_account.email}
                님 환영합니다.{" "}
              </span>
              |{" "}
              <span onClick={sessionLogout} className={styles.logout}>
                logout
              </span>
            </div>
          )
        ) : (
          <>
            <Link className={styles.login} to="/login">
              login
            </Link>
            <Link className={styles.join} to="/join">
              join
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
