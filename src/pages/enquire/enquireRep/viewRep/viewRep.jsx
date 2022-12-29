import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import {
  deleteDataRepeat,
  readDataRepeat,
} from "../../../../service/localDatabase";
import styles from "./viewRep.module.css";

export default function ViewRep({ setData, data, enquireNum }) {
  useEffect(() => {
    readDataRepeat(setData, enquireNum);
  }, [setData, enquireNum]);
  const deleteHandle = (repeatId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteDataRepeat(repeatId, setData, enquireNum);
    } else {
      return;
    }
  };
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.title}>
            <p className={styles.user}>{item.user}</p>
            <p className={styles.date}>{item.date}</p>
          </div>
          <div className={styles.content}>
            {item.content.split("\r\n").map((p) => (
              <p className={styles.txt}>{p}</p>
            ))}
          </div>
          <div className={styles.trash}>
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => deleteHandle(item.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
