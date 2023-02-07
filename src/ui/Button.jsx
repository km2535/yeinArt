import React from "react";
import styles from "./Button.module.css";
export default function Button({ title, callback, type, sub }) {
  return (
    <>
      <button
        className={sub ? styles.subBtn : styles.btn}
        type={type}
        onClick={callback}
      >
        {title}
      </button>
    </>
  );
}
