import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../../../../components/context/AuthContext";
import { insertDataRepeat } from "../../../../service/localDatabase";
import styles from "./inputRep.module.css";

export default function InputRep({ enquireNum, userName, setData }) {
  const { fbuser } = useAuthContext();
  const [user, setUser] = useState("");
  const [text, setText] = useState([]);
  const textHandle = (e) => {
    setText([e.target.value]);
  };
  const submitHandle = (e) => {
    e.preventDefault();
    const now = moment().format("YYYY년MM월DD일 HH:MM:SS");
    if (text.length !== 0) {
      //전송데이터
      let formElem = document.getElementById("formdata");
      insertDataRepeat(now, formElem, setData, enquireNum);
    }
    setText("");
  };
  useEffect(() => {
    if (fbuser?.isAdmin === true) {
      setUser("관리자");
    } else {
      setUser(userName);
    }
  }, [fbuser, userName]);
  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        action="post"
        onSubmit={submitHandle}
        id="formdata"
      >
        <div className={styles.title}>댓글</div>
        <input type="hidden" name="enquireNum" value={enquireNum} />
        <input type="hidden" name="user" value={user} />
        <input type="hidden" name="content" value={text} />
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            type="text"
            value={text}
            onChange={textHandle}
          />
        </div>
        <input className={styles.btn} type="submit" value="댓글달기" />
      </form>
    </div>
  );
}
