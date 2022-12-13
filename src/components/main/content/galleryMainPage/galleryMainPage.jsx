import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { firstRead } from "../../../../service/database";
import Loading from "../../../common/loading/loading";
import styles from "./galleryMainPage.module.css";

export default function GalleryMainPage() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const session = window.sessionStorage?.getItem("firstRead");
    if (JSON.parse(session) !== null) {
      setPageData(JSON.parse(session));
    } else if (JSON.parse(session) === null) {
      setIsLoading(true);
      firstRead(setPageData).then(() => {
        setIsLoading(false);
      });
    }
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
        pageData.map((data) => (
          <div className={styles.imgContent} key={data.id}>
            <div
              className={styles.container}
              onClick={() => {
                const { id, value } = data;
                navigate(`/gallery/${id}`, { state: { id, value } });
              }}
            >
              <img
                className={styles.img}
                src={data.value.tumbnailUrl}
                alt={data.value.title}
              />
              <p className={styles.des}>{data.value.title}</p>
            </div>
          </div>
        ))}
      <div className={styles.mbImgs}>
        <Slider {...mainSettings}>
          {pageData.map((data) => (
            <div key={data.id} className={styles.mbImgDiv}>
              <img
                src={data.value.tumbnailUrl}
                className={styles.mbImg}
                alt="img"
                onClick={() => {
                  const { id, value } = data;
                  navigate(`/gallery/${id}`, { state: { id, value } });
                }}
              />
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
