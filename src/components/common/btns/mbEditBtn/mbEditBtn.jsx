import React from "react";
import styles from "./mbEditBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function MbEditBtn({ moveRoot, styleOption }) {
  const navigate = useNavigate();
  const moveOther = () => {
    navigate(`${moveRoot}`);
  };
  const [top, left] = styleOption;
  return (
    <div
      className={styles.btn}
      style={{ top: top.top, left: left.left }}
      onClick={moveOther}
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </div>
  );
}
