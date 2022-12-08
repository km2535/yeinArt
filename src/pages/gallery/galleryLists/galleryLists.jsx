import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import styles from "./galleryLists.module.css";
import Pagination from "../../../components/common/pagination/pagination";
import MoveControl from "../../../components/common/btns/addContents/addContents";
import Loading from "../../../components/common/loading/loading";
import MbEditBtn from "../../../components/common/btns/mbEditBtn/mbEditBtn";

export default function GalleryLists() {
  const { totalData, fbuser, isLoading } = useOutletContext();
  const [pageData, setPageDate] = useState([]);

  useEffect(() => {
    const firstData = totalData.slice(0, 6);
    setPageDate(firstData);
  }, [totalData]);
  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.mainSection}>
        {pageData != null
          ? pageData.map((img) => <List key={img.id} img={img} />)
          : ""}
      </div>
      <div className={styles.deskTopBtn}>
        {fbuser && fbuser?.isAdmin && (
          <MoveControl
            moveRoot={"addGallery"}
            styleOption={[{ top: "0px" }, { left: "85%" }]}
            buttonName={"이미지 추가하기"}
          />
        )}
      </div>
      <div className={styles.mobileBtn}>
        {fbuser && fbuser?.isAdmin && (
          <MbEditBtn
            moveRoot={"addGallery"}
            styleOption={[{ top: "0px" }, { left: "85%" }]}
          />
        )}
      </div>
      <Pagination totalData={totalData} setPageDate={setPageDate} showCnt={6} />
    </>
  );
}

function List({ img }) {
  const { id, value } = img;
  const navigate = useNavigate();

  return (
    <div id={id} className={styles.imgList}>
      <div
        className={styles.container}
        onClick={() => {
          navigate(`/gallery/${id}`, { state: { id, value } });
        }}
      >
        <img
          alt="img"
          src={value.tumbnailUrl}
          className={styles.imgDetail}
        ></img>
        <p className={styles.des}>{value.title}</p>
      </div>
    </div>
  );
}
