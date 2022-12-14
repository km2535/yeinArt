import React, { useEffect, useState } from "react";
import styles from "./addEnquire.module.css";
import { useEnquireContext } from "../../../components/context/EnquireContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  faMagnifyingGlassLocation,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../components/context/AuthContext";
import { kakaoPostcode } from "../../../service/address";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import crypto from "crypto-js";
import EmailLoading from "../../../components/common/emailLoading/emailLoading";
import { useRef } from "react";
import { enquireUpload } from "../../../service/upload";
import { mailfromEnquire } from "../../../service/sendMail";

export default function AddEnquire() {
  const valueRef = useRef([]);
  const { enquire, setEnquire } = useEnquireContext();
  const { kauser, fbuser } = useAuthContext();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [addressDepart, setAddressDepart] = useState("");
  const [addressArr, setAddressArr] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState([]);
  const [cont, setCont] = useState([]);
  const [file, setFile] = useState([]);
  const [delay, setDelay] = useState(false);
  const [products, setProducts] = useState({
    workdate: "",
    title: "",
    content: "",
    userEmail: "",
    userName: "",
    departAddress: "",
    arrivalAddress: "",
    password: "",
  });
  const [isBtn, setIsBtn] = useState(false);
  const closeHandelre = () => {
    setEnquire(false);
  };
  const navigate = useNavigate();

  const arrivalAddress = addressArr.addr || "";
  const departAddress = addressDepart.addr || "";
  const inputLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    fbuser && setUserName(fbuser.displayName);
    kauser && setUserName(kauser.properties.nickname);
    fbuser && setUserEmail(fbuser.email);
    kauser && setUserEmail(kauser.kakao_account.email);
    setFile([]);
    if (delay) {
      setTimeout(() => {
        setEnquire(false);
        setIsBtn(false);
        navigate("/enquire");
        setDelay(false);
      }, 1000);
    }
  }, [fbuser, kauser, navigate, enquire, setEnquire, delay]);

  const departHandle = () => {
    kakaoPostcode(setAddressDepart);
  };
  const arrHandle = () => {
    kakaoPostcode(setAddressArr);
  };
  const textHandler = (e) => {
    const { id, value } = e.target;
    id === "title" && setTitle(value);
    id === "userName" && setUserName(value);
    id === "textarea" && setContent(() => [value]);
    id === "password" && setPassword(value);
  };
  useEffect(() => {
    setCont(content.map((v) => v.replaceAll("\n", "<br/>")));
  }, [content]);
  useEffect(() => {
    const date = moment(startDate).format("YYYY???MM???DD???");
    setProducts({
      workdate: date,
      title,
      cont,
      userEmail,
      userName,
      departAddress,
      arrivalAddress,
      password: crypto.AES.encrypt(password, "abcd").toString(),
    });
  }, [
    startDate,
    title,
    cont,
    userEmail,
    userName,
    departAddress,
    arrivalAddress,
    password,
  ]);
  const uploadHandler = async (e) => {
    e.preventDefault();
    //???????????? ?????????
    setIsBtn(true);
    enquireUpload(file, products, setDelay)
      .then(() => {
        window.sessionStorage.removeItem("allEnquire");
      })
      .then(() => {
        //???????????? ?????????
        mailfromEnquire(title, cont, userName);
      });
  };
  const fileHandler = (e) => {
    const { name, files } = e.target;
    valueRef.current.forEach((v) =>
      name === v.name ? (v.value = files[0]?.name) : ""
    );
    setFile((prev) => [...prev.filter((v) => v.loader !== name), files[0]]);
  };
  return (
    <>
      {enquire && (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={uploadHandler}>
            <div className={styles.content}>
              <div className={styles.close}>
                <FontAwesomeIcon icon={faClose} onClick={closeHandelre} />
              </div>
              <div className={styles.date}>
                <div className={styles.name}>?????????</div>
                <div className={styles.datePicker}>
                  <DatePicker
                    id={"datepicker"}
                    locale={ko}
                    dateFormat="yyyy??? MM??? dd???"
                    minDate={new Date()}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className={styles.awsomeIcon}>
                  <label htmlFor="datepicker">
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </label>
                </div>
              </div>
              <div className={styles.user}>
                <div className={styles.name}>?????????</div>
                <div className={styles.userName}>
                  <input
                    type={"text"}
                    required
                    value={userName}
                    placeholder="?????????"
                    onChange={textHandler}
                    id="userName"
                  />
                  ???
                </div>
                <input
                  type="text"
                  hidden
                  onChange={textHandler}
                  value={userName}
                  name="name"
                />
              </div>
              <div className={styles.password}>
                <div className={styles.passwordTitle}>????????????</div>
                <input
                  type="password"
                  onChange={textHandler}
                  name="password"
                  id="password"
                  className={styles.titleInput}
                  placeholder="????????? ??????????????? ???????????????"
                  required
                />
              </div>
              <div className={styles.title}>
                <div className={styles.name}>??????</div>
                <input
                  type="text"
                  id="title"
                  onChange={textHandler}
                  name="title"
                  placeholder="????????? ???????????????"
                  className={styles.titleInput}
                  required
                />
              </div>
              <div className={styles.enquireContent}>
                <div className={styles.name}>????????????</div>
                <textarea
                  type="text"
                  id="textarea"
                  placeholder="????????? ???????????????"
                  name="content"
                  className={styles.contentInput}
                  required
                  onChange={textHandler}
                />
              </div>
              <div className={styles.fileName}>????????? / ?????? ??????</div>
              <div className={styles.fileInputs}>
                {inputLength.map((v) => (
                  <div className={styles.input} key={v}>
                    <input
                      type="text"
                      disabled
                      name={`file${v}`}
                      className={styles.inputFile}
                      ref={(el) => (valueRef.current[v - 1] = el)}
                    />
                    <input
                      onChange={fileHandler}
                      type="file"
                      accept="*"
                      style={{ display: "none" }}
                      name={`file${v}`}
                      id={`file${v}`}
                    />
                    <label htmlFor={`file${v}`}>
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={faCirclePlus}
                      />
                    </label>
                  </div>
                ))}
              </div>
              <div className={styles.board}>????????? ?????????????????????.</div>
              <div className={styles.departure}>
                <div className={styles.name}>?????????</div>
                <input
                  type="text"
                  id="departure"
                  name="departAddress"
                  value={addressDepart.addr || ""}
                  disabled
                  placeholder="?????? ???????????? ?????? ????????? ??????????????????"
                  className={styles.addrInput}
                  required
                />
                <label htmlFor="departure" className={styles.awsomeIcon}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    onClick={departHandle}
                    icon={faMagnifyingGlassLocation}
                  />
                </label>
              </div>
              <div className={styles.arrival}>
                <div className={styles.name}>?????????</div>
                <input
                  type="text"
                  id="arrival"
                  name="arrivalAddress"
                  value={addressArr.addr || ""}
                  disabled
                  placeholder="?????? ???????????? ?????? ????????? ??????????????????"
                  className={styles.addrInput}
                  required
                />

                <label htmlFor="arrival" className={styles.awsomeIcon}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    onClick={arrHandle}
                    icon={faMagnifyingGlassLocation}
                  />
                </label>
              </div>
              <div className={styles.btnContainer}>
                {isBtn ? (
                  <div className={styles.loadingContainer}>
                    <EmailLoading />
                  </div>
                ) : (
                  <button type="submit" className={styles.uploadBtn}>
                    ????????????
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
