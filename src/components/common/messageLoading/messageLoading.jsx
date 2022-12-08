import React from "react";
import styles from "./messageLoading.module.css";
export default function MessageLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinnerBorder} role="status"></div>
    </div>
  );
}
