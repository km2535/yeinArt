import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { v4 as uuidv4 } from "uuid";

export default function NewNavbar({ onMenu, navigationTo }) {
  const navigate = useNavigate();
  function callback(v) {
    navigate(v.to);
    v.ref?.current.scrollIntoView({ behavior: "smooth" });
  }
  const clickHandler = (e) => {
    onMenu && onMenu();
    navigationTo
      .filter((v) => v.name === e.target.innerHTML)
      .map((v) => callback(v));
  };

  return (
    <ul className={styles.ul}>
      {navigationTo.map((v) => (
        <li className={styles.li} key={uuidv4()} onClick={clickHandler}>
          <div className={styles.content}>{v.name}</div>
        </li>
      ))}
    </ul>
  );
}
