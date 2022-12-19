import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./head.module.css";
import { useState } from "react";
import Navbar from "../../../common/navbar/navbar";
import { useEffect } from "react";
import { useEnquireContext } from "../../../context/EnquireContext";
export default function Head({
  fbuser,
  kauser,
  firebaseLogout,
  sessionLogout,
}) {
  const [isMenu, setIsMenu] = useState(false);
  const [logo, setLogo] = useState([]);
  const { enquire } = useEnquireContext();
  const onMenu = () => {
    setIsMenu((prev) => !prev);
  };
  useEffect(() => {
    setLogo("./images/logo.jpg");
  }, []);
  return (
    <div
      className={styles.head}
      style={isMenu ? { overflow: "visible" } : { overflow: "hidden" }}
    >
      <Link className={styles.imgContent} to="/">
        <img
          className={styles.img}
          style={enquire ? { zIndex: "5" } : {}}
          src={logo}
          alt=""
        />
      </Link>
      <div className={styles.mbMenu} style={enquire ? { zIndex: "5" } : {}}>
        <FontAwesomeIcon icon={faBars} onClick={onMenu} />
      </div>
      <div
        className={styles.mbContainer}
        style={
          isMenu
            ? { transform: "translateX(0)" }
            : { transform: "translateX(150%)" }
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
                  {kauser.properties?.nickname
                    ? kauser.properties?.nickname
                    : kauser.kakao_account?.email}
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
          <Navbar onMenu={onMenu} />
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
                {kauser.properties?.nickname
                  ? kauser.properties?.nickname
                  : kauser.kakao_account?.email}
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
