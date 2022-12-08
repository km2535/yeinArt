import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { getProfile } from "../../../service/login";

export const Authkakao = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN_REST_API;
  const REDIRECT_URI = "https://www.kangmin.shop";
  const CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: AUTHORIZE_CODE,
      client_secret: CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );

      // Kakao Javascript SDK 초기화
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
      }
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      //access token 받음
      if (res.data.access_token) {
        //console.log(res.data.access_token);
        getProfile()
          .then((user) => {
            window.sessionStorage.setItem("kakao", JSON.stringify(user));
          })
          .then(() => (window.location.href = "/"));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  });

  return <></>;
};
