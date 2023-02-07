import React, { useState } from "react";
import styles from "./galleryEdit.module.css";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { useEffect } from "react";
import Button from "../../../ui/Button";
import { updateGallery } from "../../../service/gallery/updateGallery";
import { removeGalleryImgOnce } from "../../../service/gallery/removeGalleryImgOnce";
import { uploadGalleryFile } from "../../../service/gallery/uploadGalleryFile";
export default function GalleryEdit() {
  const navigate = useNavigate();
  const { setIsLoading, fbuser } = useOutletContext();
  const [previewImg, setPreviewImg] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [gallery, setGallery] = useState([]);
  const {
    state: {
      Item: { ID, TITLE, DESCRIPTION, IMAGE_URLS },
      Item,
    },
  } = useLocation();
  useEffect(() => {
    setGallery(Item);
  }, [Item]);

  useEffect(() => {
    setGallery((prev) => ({ ...prev, ID: ID, WRITER: fbuser?.email }));
  }, [ID, fbuser?.email]);

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

  useEffect(() => {
    const urls = IMAGE_URLS ? IMAGE_URLS?.split(",") : null;
    urls?.map((name) =>
      setPreviewImg((prev) => [
        ...prev,
        {
          url: `${process.env.REACT_APP_API_GALLERY}/${ID}/${name}`,
          name: name,
          uuid: uuidv4(),
          lastModified: Math.ceil(Math.random() * 10000),
        },
      ])
    );
  }, [ID, IMAGE_URLS]);

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
    const fileName = e.target.parentElement.id;

    setImgFiles((prev) =>
      [...prev].filter((v) => v.lastModified !== Number(id))
    );
    setPreviewImg((prev) =>
      [...prev].filter((v) => v.lastModified !== Number(id))
    );
    updateGallery(gallery).then(() =>
      removeGalleryImgOnce({ id: ID, fileName: fileName })
    );
  };
  const uploadHandler = async (e) => {
    e.preventDefault();
    //수정하는 함수
    uploadGalleryFile(imgFiles, gallery);
    updateGallery(gallery).then(() => setIsLoading(false));
    alert("게시글이 수정되었습니다.");
    navigate(`/gallery`);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={uploadHandler} className={styles.form}>
        <div className={styles.subject}>
          <span className={styles.title}>제목 :</span>
          <div className={styles.input}>
            <input
              className={styles.inputTitle}
              type="text"
              id="TITLE"
              defaultValue={TITLE}
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
              defaultValue={DESCRIPTION}
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
            onChange={handleChange}
          />
          <div className={styles.uploadContainer}>
            <div className={styles.boarder}>
              <div className={styles.imgList}>
                {previewImg.map((v) => (
                  <div key={v.uuid} id={v.name} className={styles.imgContent}>
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
          <Button title="수정하기" sub={true} type={"submit"} />
          <Button
            title="목록으로"
            type={"button"}
            callback={() => navigate("/gallery")}
          />
        </div>
      </form>
    </div>
  );
}
