import React from "react";
import { useEnquireContext } from "../../../context/EnquireContext";
import styles from "./enquireBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
export default function EnquireBtn() {
  const { setEnquire } = useEnquireContext();

  const enquireHandler = () => {
    setEnquire((prev) => !prev);
  };
  return (
    <>
      <button className={styles.btn} onClick={enquireHandler}>
        견적문의
      </button>

      <FontAwesomeIcon
        icon={faPenToSquare}
        onClick={enquireHandler}
        className={styles.mbBtn}
      />
    </>
  );
}
