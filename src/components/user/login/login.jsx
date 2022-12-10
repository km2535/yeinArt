import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../common/logo/logo";
import styles from "./login.module.css";
import { useAuthContext } from "../../context/AuthContext";
import KAKAO_AUTH_URL from "../../../service/login";
import { firstRead } from "../../../service/database";
import Slider from "react-slick";

export default function Login() {
  const { googleLogin, user } = useAuthContext();
  const [pageData, setPageData] = useState([]);
  const [img, setImg] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    const session = window.sessionStorage.getItem("firstImgs");
    if (JSON.parse(session) !== null && JSON.parse(session).length > 0) {
      setPageData(JSON.parse(session));
    } else {
      firstRead(setPageData);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (pageData.length !== 0) {
      const arr = [];
      pageData.map((v) => arr.push(v.value.tumbnailUrl));
      setImg(arr);
    }
  }, [pageData]);
  const mainSettings = {
    centerMode: true,
    centerPadding: "-5px",
    slidesToShow: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: "",
    prevArrow: "",
  };
  const googleLoginHandler = () => {
    googleLogin();
    navigate("/");
  };

  return (
    <div className={styles.background}>
      <div className={styles.imgContainer}>
        {img.length !== 0 && (
          <Slider {...mainSettings}>
            {img.map((v) => (
              <div key={v} className={styles.imgContent}>
                <img
                  src={v}
                  alt="img"
                  className="img"
                  // style={{ width: "750px", height: "800px" }}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.mblogoContainer}>
          <a href="/" className={styles.mblogo}>
            <img src="/images/logo.jpg" alt="kakao" />
          </a>
        </div>
        <div className={styles.logo}>
          <Link to={"/"}>
            <Logo props={{ width: "300", height: "220" }} />
          </Link>
        </div>
        <div className={styles.btns}>
          <div className={styles.kakaobtn}>
            <a href={KAKAO_AUTH_URL}>
              <img src="/images/kakaologin.png" alt="kakao" />
            </a>
          </div>
          <div className={styles.googlebtn} onClick={googleLoginHandler}>
            <div className={styles.google}>
              <div className={styles.googleLogo}>
                <img src="/images/google.png" alt="google" />
              </div>
              <div className={styles.txt}>구글 로그인</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
