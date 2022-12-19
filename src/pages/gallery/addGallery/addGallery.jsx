import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { upload } from "../../../service/upload";
import styles from "./addGallery.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { readData } from "../../../service/database";
import { useEffect } from "react";

export default function AddGallery() {
  const { setTotalData, setIsLoading, delay, setDelay } = useOutletContext();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [cont, setCont] = useState([]);
  const valueRef = useRef([]);
  useEffect(() => {
    titleRef?.current.scrollIntoView(true);
    setFile([]);
    if (delay) {
      setTimeout(
        () =>
          readData("gallery", "allImgs")
            .then((v) => {
              setTotalData(v);
              window.sessionStorage?.setItem(
                "firstRead",
                JSON.stringify(v.slice(0, 6))
              );
              navigate("/gallery");
              setDelay(false);
            })
            .finally(() => setIsLoading(false)),
        1000
      );
    }
  }, [delay, setDelay, setIsLoading, setTotalData, navigate]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    valueRef.current.forEach((v) =>
      name === v.name ? (v.value = files[0].name) : ""
    );

    if (name !== "title" && name !== "content") {
      const option = {
        id: uuidv4(),
        date: Date(),
        loader: name,
        file: files[0],
        thumbnail: name === "thumbnailImg" ? true : false,
      };
      setFile((prev) =>
        file.length > 3
          ? [...prev.filter((v) => v.loader !== name), option]
          : [...prev, option]
      );
      return;
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(() => [value]);
    }
  };
  useEffect(() => {
    setCont(content.map((v) => v.replaceAll("\n", "<br/>")));
  }, [content]);
  const uploadHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    upload(file, title, cont, undefined, setDelay).then(() => {
      window.sessionStorage?.removeItem("allImgs");
      window.sessionStorage?.removeItem("firstRead");
    });
  };
  return (
    <div className={styles.container} ref={titleRef}>
      <form onSubmit={uploadHandler} className={styles.form}>
        <div className={styles.subject}>
          <span className={styles.title}>제목 :</span>
          <div className={styles.input}>
            <input
              className={styles.inputTitle}
              type="text"
              name="title"
              value={title ?? ""}
              placeholder="제목을 입력하세요"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.content}>
          <span className={styles.title}>내용 :</span>
          <div className={styles.input}>
            <textarea
              className={styles.contentInput}
              type="content"
              placeholder="내용을 입력하세요"
              name="content"
              value={content ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.otherwise}>
          <span className={styles.title}> 메인 / 썸네일 사진 :</span>
          <div className={styles.input}>
            <input
              className={styles.inputFile}
              type="text"
              disabled
              name="thumbnailImg"
              ref={(el) => (valueRef.current[0] = el)}
            />
            <input
              className={styles.file}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="thumbnail"
              name="thumbnailImg"
              required
              onChange={handleChange}
            />
            <label htmlFor="thumbnail">+</label>
          </div>
        </div>
        <div className={styles.otherwise}>
          <span className={styles.title}> 기타 사진 :</span>
          <div className={styles.input}>
            <input
              type="text"
              name="subImg1"
              disabled
              className={styles.inputFile}
              ref={(el) => (valueRef.current[1] = el)}
            />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              id="subImg1"
              name="subImg1"
              onChange={handleChange}
            />
            <label htmlFor="subImg1">+</label>
          </div>
          <div className={styles.input}>
            <input
              type="text"
              disabled
              className={styles.inputFile}
              name="subImg2"
              ref={(el) => (valueRef.current[2] = el)}
            />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="subImg2"
              id="subImg2"
              onChange={handleChange}
            />
            <label htmlFor="subImg2">+</label>
          </div>
          <div className={styles.input}>
            <input
              type="text"
              disabled
              name="subImg3"
              className={styles.inputFile}
              ref={(el) => (valueRef.current[3] = el)}
            />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="subImg3"
              id="subImg3"
              onChange={handleChange}
            />
            <label htmlFor="subImg3">+</label>
          </div>
          <div className={styles.input}>
            <input
              type="text"
              disabled
              name="subImg4"
              className={styles.inputFile}
              ref={(el) => (valueRef.current[4] = el)}
            />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="subImg4"
              id="subImg4"
              onChange={handleChange}
            />
            <label htmlFor="subImg4">+</label>
          </div>
          <div className={styles.input}>
            <input
              type="text"
              disabled
              name="subImg5"
              className={styles.inputFile}
              ref={(el) => (valueRef.current[5] = el)}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              name="subImg5"
              id="subImg5"
              onChange={handleChange}
            />
            <label htmlFor="subImg5">+</label>
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
