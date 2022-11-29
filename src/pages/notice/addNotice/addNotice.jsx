import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./addNotice.module.css";
import "moment/locale/ko";
import moment from "moment/moment";
import { useNavigate, useOutletContext } from "react-router-dom";
import { uploadNotice } from "../../../service/upload";
export default function AddNotice({ prevdata }) {
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState("");
  const [textarea, setTextarea] = useState("");
  const valueRef = useRef([]);
  const { totalData } = useOutletContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const now = moment().format("YY-MM-DD HH:mm:ss");
    //console.log(now);
    valueRef.current.forEach((v) =>
      name === v.name ? (v.value = files[0] && files[0].name) : ""
    );
    name === "title" && setTitle(value);
    name === "content" && setTextarea(value);
    textarea.length > 800 && setTextarea(textarea.substring(0, 800));
    if (name !== "title" && name !== "content") {
      const option = {
        id: uuidv4(),
        date: now,
        loader: name,
        file: files[0],
      };
      setFile((prev) => [...prev, option]);
    }
  };
  const uploadHandler = async (e) => {
    e.preventDefault();
    //prevdata[0]
    uploadNotice(file, title, textarea, totalData.length + 1).then(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <form onSubmit={uploadHandler}>
        <div className={styles.content}>
          <div className={styles.subject}>
            <span className={styles.title}>제목 </span>
            <div className={styles.txtInput}>
              <input
                placeholder="제목을 입력해 주세요."
                className={styles.inputTitle}
                type="text"
                name="title"
                value={title || ""}
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.txtareaInput}>
            <textarea
              name="content"
              value={textarea || ""}
              placeholder="내용을 입력해 주세요. 800자 내외"
              className={styles.textarea}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className={styles.file}>
          <div className={styles.input}>
            <input
              className={styles.inputFile}
              type="text"
              disabled
              name="file1"
              placeholder="첨부이미지"
              ref={(el) => (valueRef.current[0] = el)}
            />
            <input
              className={styles.file}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="file1"
              name="file1"
              onChange={handleChange}
            />
            <label htmlFor="file1">+</label>
          </div>
          <div className={styles.input}>
            <input
              className={styles.inputFile}
              type="text"
              disabled
              name="file2"
              placeholder="첨부파일"
              ref={(el) => (valueRef.current[1] = el)}
            />
            <input
              className={styles.file}
              style={{ display: "none" }}
              type="file"
              accept=".txt, .hwp, .pdf, .show"
              id="file2"
              name="file2"
              onChange={handleChange}
            />
            <label htmlFor="file2">+</label>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.uploadBtn}>
            업로드하기
          </button>
        </div>
      </form>
    </div>
  );
}
