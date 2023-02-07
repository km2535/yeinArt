import React from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import styles from "./viewRepItem.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { deleteReply } from "../../../../../service/reply/deleteReply";
import { readReplyList } from "../../../../../service/reply/readReplyList";
export default function ViewReplyItem({ item, FK_ID, setReply }) {
  const [fileUrl, setFileUrl] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const { ID, WRITER, DESCRIPTION, FILE_URLS, IMAGE_URLS, DATE } = item;
  useEffect(() => {
    FILE_URLS && setFileUrl(FILE_URLS.split(","));
    IMAGE_URLS && setImgUrl(IMAGE_URLS.split(","));
  }, [FILE_URLS, IMAGE_URLS]);

  const deleteRep = () => {
    if (window.confirm("댓글을 삭제합니다.")) {
      deleteReply(ID).then(() =>
        setTimeout(() => {
          readReplyList(FK_ID, setReply);
        }, 1000)
      );
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.WRITER}>{WRITER}</div>
        <div className={styles.DATE}>{DATE}</div>
        <div className={styles.close} onClick={deleteRep}>
          <AiOutlineClose />
        </div>
      </div>
      <div className={styles.DESCRIPTION}>{DESCRIPTION}</div>
      <div className={styles.download}>
        <div className={styles.FILE_URLS}>
          <div className={styles.fileTitle}>
            {fileUrl?.length > 0 && "[첨부된 파일]"}
          </div>
          {fileUrl?.map((file) => (
            <a
              className={styles.file}
              key={uuidv4()}
              type="media_type"
              href={`${process.env.REACT_APP_API_REPLY}/files/${ID}/${file}`}
              download
            >
              {file}
            </a>
          ))}
        </div>
        <div className={styles.IMAGE_URLS}>
          <div className={styles.fileTitle}>
            {imgUrl?.length > 0 && "[첨부된 이미지]"}
          </div>
          <div className={styles.imgContent}>
            {imgUrl?.map((img) => (
              <a
                href={`${process.env.REACT_APP_API_REPLY}/images/${ID}/${img}`}
                target="_blink"
                key={uuidv4()}
              >
                <img
                  className={styles.img}
                  src={`${process.env.REACT_APP_API_REPLY}/images/${ID}/${img}`}
                  alt=""
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
