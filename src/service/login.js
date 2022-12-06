//import { v4 as uuid } from "uuid";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, database, provider } from "./firebase";
import { ref, get } from "firebase/database";

const REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN_REST_API;
const REDIRECT_URI = "http://www.kangmin.shop";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default KAKAO_AUTH_URL;

export const googleLogin = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const firebaseLogout = () => {
  signOut(auth).catch(console.error);
};

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
};

async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export const getProfile = async () => {
  try {
    // Kakao SDK API를 이용해 사용자 정보 획득
    let data = await window.Kakao.API.request({
      url: "/v2/user/me",
    });
    // 사용자 정보 변수에 저장
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const sessionLogout = () => {
  window.sessionStorage.clear();
  window.location.href = "/";
};
