import React from "react";
import styles from "./emailLoading.module.css";
export default function EmailLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinnerBorder} role="status"></div>
    </div>
  );
}
