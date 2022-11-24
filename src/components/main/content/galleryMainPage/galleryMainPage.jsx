import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firstRead } from "../../../../service/database";
import Loading from "../../../common/loading/loading";
import styles from "./galleryMainPage.module.css";

export default function GalleryMainPage() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const session = window.sessionStorage.getItem("firstImgs");
    if (JSON.parse(session) !== null && JSON.parse(session).length > 0) {
      setPageData(JSON.parse(session));
    } else {
      setIsLoading(true);
      firstRead(setPageData).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

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
                console.log(id);
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
    </>
  );
}
