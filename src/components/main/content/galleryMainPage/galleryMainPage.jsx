import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { readGallery } from "../../../../service/gallery/readGallery";
import Loading from "../../../common/loading/loading";
import styles from "./galleryMainPage.module.css";

export default function GalleryMainPage() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    readGallery(0, 6, setPageData).then(() => {
      setIsLoading(false);
    });
  }, []);
  const mainSettings = {
    centerMode: true,
    centerPadding: "-5px",
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    nextArrow: <ArrowNone />,
    prevArrow: <ArrowNone />,
  };

  return (
    <>
      {isLoading && <Loading />}
      {pageData &&
        pageData.map((Item) => (
          <div className={styles.imgContent} key={Item.ID}>
            <div
              className={styles.container}
              onClick={() => {
                const { ID } = Item;
                navigate(`/gallery/${ID}`, { state: { Item } });
              }}
            >
              <img
                className={styles.img}
                src={`${process.env.REACT_APP_API_GALLERY}/${Item.ID}/${Item.THUMBNAIL_IMG}`}
                alt={Item.TITLE}
              />
              <p className={styles.des}>{Item.TITLE}</p>
            </div>
          </div>
        ))}
      <div className={styles.mbImgs}>
        <Slider {...mainSettings}>
          {pageData.map((Item) => (
            <div key={Item.ID} className={styles.mbImgDiv}>
              <img
                src={`${process.env.REACT_APP_API_GALLERY}/${Item.ID}/${Item.THUMBNAIL_IMG}`}
                className={styles.mbImg}
                alt="img"
                onClick={() => {
                  const { ID } = Item;
                  navigate(`/gallery/${ID}`, { state: { Item } });
                }}
              />
              <div>{Item.TITLE}</div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
function ArrowNone() {
  return <></>;
}
