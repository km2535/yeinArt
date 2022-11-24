import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../common/logo/logo";
import styles from "./login.module.css";
import { useAuthContext } from "../../context/AuthContext";
import KAKAO_AUTH_URL from "../../../service/login";

export default function Login() {
  const { googleLogin, user } = useAuthContext();

  const navigate = useNavigate();
  //console.log(user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
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
          <div className={styles.googlebtn} onClick={googleLogin}>
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
