import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./top.module.css";

export default function Top() {
  return (
    <a href="#top" className={styles.top}>
      <div className={styles.topBtn}>
        <div className={styles.arrow}>
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
        <div className={styles.text}>top</div>
      </div>
    </a>
  );
}
