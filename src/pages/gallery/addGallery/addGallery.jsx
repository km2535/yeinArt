import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./addGallery.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import { uploadGallery } from "../../../service/gallery/uploadGallery";
import { uploadGalleryFile } from "../../../service/gallery/uploadGalleryFile";

export default function AddGallery() {
  const navigate = useNavigate();
  const { setIsLoading, fbuser } = useOutletContext();
  const [previewImg, setPreviewImg] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const ID = uuidv4();
    setGallery((prev) => ({ ...prev, ID: ID, WRITER: fbuser?.email }));
  }, [fbuser.email]);

  useEffect(() => {
    setGallery((prev) => ({ ...prev, IMAGE_URLS: imgUrl }));
  }, [imgUrl]);

  useEffect(() => {
    setImgUrl([]);
    for (let i = 0; i < previewImg.length; i++) {
      setImgUrl((prev) => [...prev, `${previewImg[i]?.name}`]);
    }
    setGallery((product) => ({
      ...product,
      THUMBNAIL_IMG: `${previewImg[0]?.name}`,
    }));
  }, [previewImg, previewImg.length]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "images") {
      const options = {
        maxSizeMb: 1,
        maxWidthOrHeight: 800,
      };
      for (let i = 0; i < files.length; i++) {
        //이미지의 경로를 지정함.
        setImgUrl((prev) => [...prev, `${files[i]?.name}`]);
        //이미지 압축하고 이미지를 나열함.
        const uuid = uuidv4();
        imageCompression(files[i], options).then((v) => {
          setPreviewImg((prev) => [
            ...prev,
            {
              url: URL.createObjectURL(v),
              name: v.name,
              uuid: uuid,
              lastModified: v.lastModified,
            },
          ]);
          setImgFiles((prev) => [...prev, v]);
        });
      }
      setGallery((product) => ({
        ...product,
        THUMBNAIL_IMG: `${files[0]?.name}`,
      }));
    } else {
      setGallery((product) => ({ ...product, [id]: value }));
    }
  };

  const removeImg = (e) => {
    const { id } = e.target;
    setImgFiles((prev) =>
      [...prev].filter((v) => v.lastModified !== Number(id))
    );
    setPreviewImg((prev) =>
      [...prev].filter((v) => v.lastModified !== Number(id))
    );
  };
  const uploadHandler = (e) => {
    e.preventDefault();
    uploadGalleryFile(imgFiles, gallery);
    uploadGallery(gallery).then(() => setIsLoading(false));
    alert("게시글이 추가되었습니다.");
    navigate(-1);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={uploadHandler} className={styles.form}>
        <div className={styles.subject}>
          <div className={styles.title}>제목 :</div>
          <div className={styles.input}>
            <input
              className={styles.inputTitle}
              type="text"
              id="TITLE"
              placeholder="제목을 입력하세요"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.textContent}>
          <span className={styles.title}>내용 :</span>
          <div className={styles.input}>
            <textarea
              className={styles.contentInput}
              type="text"
              id="DESCRIPTION"
              placeholder="내용을 입력하세요"
              name="content"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.downloadFile}>
            <div className={styles.downloadTitle}>이미지 추가</div>
            <div className={styles.imgSub}>※ 첫 이미지가 썸네일 사진</div>
          </div>
          <input
            className={styles.inputFile}
            type={"file"}
            id="images"
            name="files[]"
            accept="image/*"
            multiple={"multiple"}
            required
            onChange={handleChange}
          />
          <div className={styles.uploadContainer}>
            <div className={styles.boarder}>
              <div className={styles.imgList}>
                {previewImg.map((v) => (
                  <div key={v.uuid} className={styles.imgContent}>
                    <div className={styles.imgs}>
                      <img src={v?.url} alt="" className={styles.img} />
                    </div>
                    <AiOutlineCloseSquare
                      id={v.lastModified}
                      onClick={removeImg}
                    />
                  </div>
                ))}
              </div>
            </div>
            <label className={styles.plusBtn} htmlFor="images">
              <FaPlusSquare />
            </label>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.uploadBtn}>
            업로드하기
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.uploadBtn}
          >
            목록가기
          </button>
        </div>
      </form>
    </div>
  );
}
