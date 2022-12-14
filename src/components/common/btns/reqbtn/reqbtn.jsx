import React from "react";
import { useEnquireContext } from "../../../context/EnquireContext";
import styles from "./reqbtn.module.css";

export default function Reqbtn() {
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
