import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./galleryLists.module.css";
import MoveControl from "../../../components/common/btns/addContents/addContents";
import Loading from "../../../components/common/loading/loading";
import MbEditBtn from "../../../components/common/btns/mbEditBtn/mbEditBtn";
import { galleryCount } from "../../../service/gallery/readGalleryCnt";
import ReactPaginate from "react-paginate";
import { readGallery } from "../../../service/gallery/readGallery";
import { useAuthContext } from "../../../components/context/AuthContext";

export default function GalleryLists({ isLoading }) {
  const { fbuser } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(() => {
    galleryCount(setTotalCnt);
  }, []);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.mainSection}>
        <BoardListItems page={currentPage} totalPage={totalCnt} />
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
      <ReactPaginate
        breakLabel={"..."}
        previousLabel={"<"}
        nextLabel={">"}
        onPageChange={handlePageClick}
        pageCount={Math.ceil(totalCnt / 6)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        containerClassName={styles.pagination}
        activeClassName={styles.current}
        pageClassName={styles.item}
        previousClassName={styles.prev}
        nextClassName={styles.next}
      />
    </>
  );
}

function BoardListItems({ page }) {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const startPage = (page - 1) * 6;
    const endPage = 6;
    readGallery(startPage, endPage, setBoards);
  }, [page]);
  return (
    <>
      {boards?.map((Item) => (
        <List key={Item?.ID} Item={Item} />
      ))}
    </>
  );
}

function List({ Item }) {
  const { ID, TITLE, THUMBNAIL_IMG } = Item;
  const navigate = useNavigate();

  return (
    <div className={styles.imgList}>
      <div
        className={styles.container}
        onClick={() => {
          navigate(`/gallery/${ID}`, { state: { Item } });
        }}
      >
        <img
          alt="img"
          src={`${process.env.REACT_APP_API_GALLERY}/${ID}/${THUMBNAIL_IMG}`}
          className={styles.imgDetail}
        ></img>
        <p className={styles.des}>{TITLE}</p>
      </div>
    </div>
  );
}
