import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../common/logo/logo";
import styles from "./login.module.css";
import { useAuthContext } from "../../context/AuthContext";
import KAKAO_AUTH_URL from "../../../service/login";
import Slider from "react-slick";
import { readGallery } from "../../../service/gallery/readGallery";

export default function Login() {
  const { googleLogin, user } = useAuthContext();
  const [pageData, setPageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    readGallery(0, 6, setPageData);
  }, [user, navigate]);

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
        {pageData?.length !== 0 && (
          <Slider {...mainSettings}>
            {pageData?.map((Item) => (
              <div key={Item.ID} className={styles.imgContent}>
                <img
                  src={`${process.env.REACT_APP_API_GALLERY}/${Item.ID}/${Item.THUMBNAIL_IMG}`}
                  alt="img"
                  className="img"
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
