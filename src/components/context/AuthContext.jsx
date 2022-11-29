import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  googleLogin,
  firebaseLogout,
  onUserStateChange,
  sessionLogout,
} from "../../service/login";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [fbuser, setFbuser] = useState();
  const [kauser, setKauser] = useState();
  const navigate = useNavigate();
  const historiesRef = useRef();
  const majorWorkRef = useRef();
  useEffect(() => {
    if (window.sessionStorage.getItem("kakao")) {
      //카카오톡 로그인
      setKauser(JSON.parse(window.sessionStorage.getItem("kakao")));
    }
    if (onUserStateChange) {
      onUserStateChange((user) => {
        navigate("/");
        setFbuser(user);
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fbuser,
        kauser,
        googleLogin,
        firebaseLogout,
        sessionLogout,
        historiesRef,
        majorWorkRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  return useContext(AuthContext);
}
