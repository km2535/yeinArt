import React from "react";
import { Link } from "react-router-dom";
import styles from "./head.module.css";
export default function Head({
  fbuser,
  kauser,
  firebaseLogout,
  sessionLogout,
}) {
  return (
    <div className={styles.head}>
      <Link className={styles.imgContent} to="/">
        <img className={styles.img} src="./images/logo.jpg" alt="" />
      </Link>
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
