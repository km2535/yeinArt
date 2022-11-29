import React from "react";
import { useEnquireContext } from "../../../context/EnquireContext";
import styles from "../addContents/addContents.module.css";

export default function EnquireBtn() {
  const { setEnquire } = useEnquireContext();

  const enquireHandler = () => {
    setEnquire((prev) => !prev);
  };
  return (
    <button className={styles.btn} onClick={enquireHandler}>
      견적문의
    </button>
  );
}
