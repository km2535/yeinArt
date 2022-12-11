import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
export default function Navbar({ historiesRef, majorWorkRef, onMenu }) {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    onMenu && onMenu();
    switch (e.target.innerHTML) {
      case "홈":
        navigate("/", { replace: true });
        break;
      case "운송의뢰·문의":
        navigate("/enquire", { replace: true });
        break;
      case "갤러리":
        navigate("/gallery", { replace: true });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={clickHandler}>
          홈
        </li>
        <li className={styles.li} onClick={clickHandler}>
          운송의뢰·문의
        </li>
        <li className={styles.community} onClick={clickHandler}>
          갤러리
        </li>
      </ul>
    </>
  );
}
