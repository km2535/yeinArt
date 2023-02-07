import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import styles from "./inputRep.module.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { useEffect } from "react";
import { uploadRely } from "../../../../service/reply/uploadRely";
import { uploadReplyFile } from "../../../../service/reply/uploadReplyFile";
import Button from "../../../../ui/Button";
import { readReplyList } from "../../../../service/reply/readReplyList";

export default function InputRep({ user, ID, SetReadReply }) {
  const [reply, setReply] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [file, setFile] = useState([]);
  const [previewFile, setPreviewFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [newId, setNewId] = useState(uuidv4());

  useEffect(() => {
    setReply((prev) => ({ ...prev, ID: newId, FK_ID: ID, WRITER: user }));
  }, [ID, newId, user]);
  useEffect(() => {
    setReply((prev) => ({ ...prev, FILE_URLS: fileUrl }));
  }, [fileUrl]);
  useEffect(() => {
    setReply((prev) => ({ ...prev, IMAGE_URLS: imgUrl }));
  }, [imgUrl]);
  useEffect(() => {
    setFileUrl([]);
    for (let i = 0; i < previewFile.length; i++) {
      setFileUrl((prev) => [...prev, `${previewFile[i]?.name}`]);
    }
  }, [previewFile, previewFile.length]);

  useEffect(() => {
    setImgUrl([]);
    for (let i = 0; i < previewImg.length; i++) {
      setImgUrl((prev) => [...prev, `${previewImg[i]?.name}`]);
    }
  }, [previewImg, previewImg.length]);
  const changeHandler = (e) => {
    const { id, value, files } = e.target;
    if (id === "files") {
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.includes("image")) {
          setFileUrl((prev) => [...prev, `${files[i]?.name}`]);
          const uuid = uuidv4();
          setPreviewFile((prev) => [
            ...prev,
            {
              url: URL.createObjectURL(files[i]),
              name: files[i].name,
              uuid: uuid,
              lastModified: files[i].lastModified,
            },
          ]);
          setFile((prev) => [...prev, files[i]]);
        }
      }
    } else if (id === "images") {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes("image")) {
          setImgUrl((prev) => [...prev, `${files[i]?.name}`]);
          const uuid = uuidv4();
          setPreviewImg((prev) => [
            ...prev,
            {
              url: URL.createObjectURL(files[i]),
              name: files[i].name,
              uuid: uuid,
              lastModified: files[i].lastModified,
            },
          ]);
          setImgFiles((prev) => [...prev, files[i]]);
        }
      }
    } else {
      setReply((product) => ({ ...product, [id]: value }));
    }
  };
  const removeFile = (e) => {
    const { id } = e.target;
    setFile((prev) => [...prev].filter((v) => v.uuid !== id));
    setPreviewFile((prev) => [...prev].filter((v) => v.uuid !== id));
  };
  const removeImg = (e) => {
    const { id } = e.target;
    setImgFiles((prev) => [...prev].filter((v) => v.uuid !== id));
    setPreviewImg((prev) => [...prev].filter((v) => v.uuid !== id));
  };
  const boardSubmit = (e) => {
    e.preventDefault();
    const text = window.document.getElementById("DESCRIPTION");
    uploadReplyFile(file, imgFiles, reply);
    uploadRely(reply).finally(() => {
      setTimeout(() => {
        readReplyList(ID, SetReadReply);
      }, 1000);
    });
    alert("댓글이 추가되었습니다.");
    text.value = "";
    setReply("");
    setPreviewFile([]);
    setPreviewImg([]);
    setImgFiles([]);
    setFile([]);
    setImgFiles([]);
    setNewId(uuidv4());
  };
  return (
    <form onSubmit={boardSubmit} id="formdata" className={styles.form}>
      <div className={styles.container}>
        <div className={styles.detail}>
          <textarea
            type="text"
            placeholder="댓글을 작성해주세요"
            id="DESCRIPTION"
            className={styles.detailInput}
            cols="50"
            required
            onChange={changeHandler}
          />
          <div className={styles.btn}>
            <Button title="작성" type={"submit"} />
          </div>
        </div>
        <div className={styles.downloadFile}>
          <div className={styles.fileTitle}>
            <div className={styles.downloadTitle}>파일 추가하기</div>
            <label className={styles.plusBtn} htmlFor="files">
              <FaPlusSquare />
            </label>
          </div>
          <input
            className={styles.inputFile}
            type={"file"}
            id="files"
            accept=".pdf, .hwp, .show, .xlsx, .xlsm,.xlsb, .xls,  .doc, .hwpx, .ppt, .pptm, .pptx, .txt"
            name="files[]"
            multiple={"multiple"}
            onChange={changeHandler}
          />
          <div className={styles.uploadContainer}>
            <div className={styles.fileList}>
              {previewFile.map((v) => (
                <div key={v.uuid} className={styles.fileContent}>
                  <div className={styles.files}>{v?.name}</div>
                  <AiOutlineCloseSquare
                    className={styles.close}
                    id={v.uuid}
                    onClick={removeFile}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.downloadFile}>
          <div className={styles.fileTitle}>
            <div className={styles.downloadTitle}>이미지 추가하기</div>
            <label className={styles.plusBtn} htmlFor="images">
              <FaPlusSquare />
            </label>
          </div>
          <input
            className={styles.inputFile}
            type={"file"}
            id="images"
            name="files[]"
            accept="image/*"
            multiple={"multiple"}
            onChange={changeHandler}
          />
          <div className={styles.uploadContainer}>
            <div className={styles.imgList}>
              {previewImg.map((v) => (
                <div key={v.uuid} className={styles.imgContent}>
                  <div className={styles.imgs}>
                    <img src={v?.url} alt="" className={styles.img} />
                  </div>
                  <AiOutlineCloseSquare
                    className={styles.close}
                    id={v.uuid}
                    onClick={removeImg}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
