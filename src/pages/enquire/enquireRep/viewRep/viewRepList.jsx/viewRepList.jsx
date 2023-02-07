import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import styles from "./viewRepList.module.css";
import { readReplyList } from "../../../../../service/reply/readReplyList";
import ViewReplyItem from "../viewRepItem/viewRepItem";

export default function ViewRepList({ FK_ID, reply, setReply }) {
  useEffect(() => {
    readReplyList(FK_ID, setReply);
  }, [FK_ID, setReply]);
  return (
    <div className={styles.container}>
      {reply.map((item) => (
        <ViewReplyItem
          item={item}
          key={uuidv4()}
          FK_ID={FK_ID}
          setReply={setReply}
        />
      ))}
    </div>
  );
}
