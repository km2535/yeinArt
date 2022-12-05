import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
export default function Navbar({ historiesRef, majorWorkRef }) {
  const navigate = useNavigate();
  const historyView = () => {
    navigate("/#companyIntro", { replace: true });
    if (historiesRef)
      historiesRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const majorWorkView = () => {
    navigate("/#majorWork", { replace: true });
    if (majorWorkRef)
      majorWorkRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const contract = () => {
    navigate("/enquire", { replace: true });
  };
  return (
    <>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={historyView}>
          회사소개
        </li>

        <li className={styles.li} onClick={majorWorkView}>
          주요업무
        </li>

        <li className={styles.li} onClick={contract}>
          운송의뢰·문의
        </li>
        <li className={styles.community} id="community">
          <span>커뮤니티</span>
          <div className={styles.submenu}>
            <div className={styles.board}>
              <Link to="/notice">공지사항</Link>
            </div>
            <div className={styles.gallery}>
              <Link to="/gallery">갤러리</Link>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}
