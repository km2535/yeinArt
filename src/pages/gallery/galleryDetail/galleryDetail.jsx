import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import "./galleryDetail.css";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import history from "../../../components/common/history/history";

import styles from "./galleryDetail.module.css";
import { removeGalleryImg } from "../../../service/gallery/removeGalleryImg";
import { removeGalleryItem } from "../../../service/gallery/removeGalleryItem";
import Button from "../../../ui/Button";

export default function GalleryDetail() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const { fbuser, setIsLoading } = useOutletContext();
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  };
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    history.push("/");
  }, []);
  useEffect(() => {
    return history.listen(() => {
      if (history.action === "POP") {
        history.push("/gallery");
      }
    });
  }, []);
  const {
    state: {
      Item: { TITLE, DESCRIPTION, IMAGE_URLS, ID },
      Item,
    },
  } = useLocation();
  const [img, setImg] = useState([]);
  const [slide, setSlide] = useState({ nav1: null, nav2: null });
  let slide1 = useRef();
  let slide2 = useRef();
  useEffect(() => {
    titleRef?.current.scrollIntoView(true);
    setSlide({ nav1: slide1, nav2: slide2 });
  }, []);
  useEffect(() => {
    setImg(() => IMAGE_URLS?.split(","));
  }, [IMAGE_URLS]);
  const subSettings = {
    slidesToShow: img.length > 3 ? 3 : img.length > 1 ? 2 : 1,
    centerPadding: "-10px",
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <ArrowNone />,
    prevArrow: <ArrowNone />,
  };
  const mainSettings = {
    centerMode: true,
    centerPadding: "-5px",
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // 삭제 컨트롤러
  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsLoading(true);

      removeGalleryItem(Item)
        .then(() => {
          removeGalleryImg(Item);
        })
        .finally(() => navigate(-1));
    }
  };
  return (
    <>
      <div className="galleryDetail">
        <h1 className="galleryTitle" ref={titleRef}>
          {TITLE}
        </h1>
        <div className={styles.content}>
          <div>{DESCRIPTION}</div>
        </div>
        <Slider
          asNavFor={slide.nav2}
          ref={(slider) => (slide1 = slider)}
          {...mainSettings}
        >
          {img.map((image) => (
            <div key={image} className="imgContainer">
              <img
                src={`${process.env.REACT_APP_API_GALLERY}/${ID}/${image}`}
                alt="img"
                className="galleryImg"
              />
            </div>
          ))}
        </Slider>

        <div className="subGalleryContainer">
          <Slider
            asNavFor={slide.nav1}
            ref={(slider) => (slide2 = slider)}
            {...subSettings}
          >
            {img.map((image) => (
              <div key={image} className="subContainer">
                <img
                  src={`${process.env.REACT_APP_API_GALLERY}/${ID}/${image}`}
                  alt="img"
                  className="subGalleryImg"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className={styles.deskTopBtn}>
        <div className={styles.deskTopBtn}>
          {fbuser && fbuser.isAdmin && (
            <>
              <Button
                title="수정하기"
                type={"button"}
                sub={true}
                callback={() => navigate(`galleryEdit`, { state: { Item } })}
              />
              <Button
                sub={true}
                title="삭제하기"
                type={"button"}
                callback={deleteHandler}
              />
            </>
          )}
          <Button
            title="목록으로"
            type={"button"}
            callback={() => navigate(-1)}
          />
        </div>
      </div>
      <div className={styles.mobileBtn}>
        <div className={styles.mobileBtn}>
          {fbuser && fbuser.isAdmin && (
            <>
              <Button
                title="수정하기"
                type={"button"}
                sub={true}
                callback={() => navigate(`galleryEdit`, { state: { Item } })}
              />
              <Button
                sub={true}
                title="삭제하기"
                type={"button"}
                callback={deleteHandler}
              />
            </>
          )}
          <Button
            title="목록으로"
            type={"button"}
            callback={() => navigate(-1)}
          />
        </div>
      </div>
    </>
  );
}

//arrow
function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <FontAwesomeIcon
      className={className}
      icon={faCircleChevronLeft}
      onClick={onClick}
    />
  );
}
function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <FontAwesomeIcon
      className={className}
      icon={faCircleChevronRight}
      onClick={onClick}
    />
  );
}
function ArrowNone() {
  return <></>;
}
