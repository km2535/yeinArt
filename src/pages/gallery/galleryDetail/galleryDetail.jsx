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
import MoveControl from "../../../components/common/btns/addContents/addContents";
import { deleteImage } from "../../../service/delete";

export default function GalleryDetail() {
  const navigate = useNavigate();
  const { fbuser } = useOutletContext();
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  };
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    history.push("/gallery");
  }, []);
  useEffect(() => {
    return history.listen((action) => {
      //console.log(action);
      if (history.action === "POP") {
        history.push("/gallery");
      }
    });
  }, []);
  const {
    state: {
      id,
      value: {
        title,
        subUrl1,
        subUrl2,
        subUrl3,
        subUrl4,
        subUrl5,
        tumbnailUrl,
      },
    },
  } = useLocation();
  const [img, setImg] = useState([]);
  const [slide, setSlide] = useState({ nav1: null, nav2: null });
  let slide1 = useRef();
  let slide2 = useRef();
  useEffect(() => {
    setSlide({ nav1: slide1, nav2: slide2 });
    //const arr = Object.keys(value).filter((v) => "date" !== v && "title" !== v);
    const arr = [tumbnailUrl, subUrl1, subUrl2, subUrl3, subUrl4, subUrl5];
    setImg(arr.filter((v) => v !== ""));
  }, [tumbnailUrl, subUrl1, subUrl2, subUrl3, subUrl4, subUrl5]);

  const subSettings = {
    slidesToShow: img.length > 3 ? 3 : 2,
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <ArrowNone />,
    prevArrow: <ArrowNone />,
  };
  const mainSettings = {
    centerMode: true,
    centerPadding: "-5px",
    slidesToShow: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // 삭제 컨트롤러
  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteImage(id);
      navigate("/");
    }
  };
  return (
    <>
      <div>
        <h1 className="title">{title}</h1>
        <Slider
          asNavFor={slide.nav2}
          ref={(slider) => (slide1 = slider)}
          {...mainSettings}
        >
          {img.map((v) => (
            <div key={v} className="container">
              <img
                src={v}
                alt="img"
                className="img"
                style={{ width: "1000px", height: "800px" }}
              />
            </div>
          ))}
        </Slider>
        <Slider
          asNavFor={slide.nav1}
          ref={(slider) => (slide2 = slider)}
          {...subSettings}
        >
          {img.map((v) => (
            <div key={v} className="subContainer">
              <img
                src={v}
                key={v}
                alt="img"
                className="subimg"
                style={{ width: "300px", height: "300px" }}
              />
            </div>
          ))}
        </Slider>
      </div>
      {fbuser && fbuser.isAdmin && (
        <div style={{ height: "50px" }}>
          <MoveControl
            imgId={id}
            moveRoot={"galleryEdit"}
            styleOption={[{ top: "0" }, { left: "43%" }]}
            buttonName={"수정하기"}
          />
          <MoveControl
            doNotMove={true}
            galleryEdit={"/"}
            styleOption={[{ top: "0" }, { left: "48%" }]}
            buttonName={"삭제하기"}
            deleteHandler={deleteHandler}
          />
        </div>
      )}
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
