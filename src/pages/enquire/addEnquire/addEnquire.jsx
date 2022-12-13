import React, { useEffect, useState } from "react";
import styles from "./addEnquire.module.css";
import { useEnquireContext } from "../../../components/context/EnquireContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../components/context/AuthContext";
import { kakaoPostcode } from "../../../service/address";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import crypto from "crypto-js";
import EmailLoading from "../../../components/common/emailLoading/emailLoading";
import { useRef } from "react";
import { enquireUpload } from "../../../service/upload";

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
  const [content, setContent] = useState("");
  const [file, setFile] = useState([]);
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
  }, [fbuser, kauser, navigate, enquire, setEnquire]);

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
    id === "textarea" && setContent(value);
    id === "password" && setPassword(value);
  };
  useEffect(() => {
    const date = moment(startDate).format("YYYY년MM월DD일");
    setProducts({
      workdate: date,
      title,
      content,
      userEmail,
      userName,
      departAddress,
      arrivalAddress,
      password: crypto.AES.encrypt(password, "abcd").toString(),
    });
  }, [
    startDate,
    title,
    content,
    userEmail,
    userName,
    departAddress,
    arrivalAddress,
    password,
  ]);
  const uploadHandler = async (e) => {
    e.preventDefault();
    //문의하기 올리기
    let delay = file.length * 1000 + 500;
    setIsBtn(true);
    enquireUpload(file, products).finally(() => {
      window.sessionStorage.removeItem("allEnquire");
      setTimeout(() => {
        setEnquire(false);
        setIsBtn(false);
        navigate("/enquire");
      }, delay);
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
                <div className={styles.name}>작업일</div>
                <div className={styles.datePicker}>
                  <DatePicker
                    id={"datepicker"}
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
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
                <div className={styles.name}>의뢰인</div>
                <div className={styles.userName}>
                  <input
                    type={"text"}
                    required
                    value={userName}
                    placeholder="홍길동"
                    onChange={textHandler}
                    id="userName"
                  />
                  님
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
                <div className={styles.passwordTitle}>비밀번호</div>
                <input
                  type="password"
                  onChange={textHandler}
                  name="password"
                  id="password"
                  className={styles.titleInput}
                  placeholder="게시글 비밀번호를 입력하세요"
                  required
                />
              </div>
              <div className={styles.title}>
                <div className={styles.name}>제목</div>
                <input
                  type="text"
                  id="title"
                  onChange={textHandler}
                  name="title"
                  placeholder="제목을 입력하세요"
                  className={styles.titleInput}
                  required
                />
              </div>
              <div className={styles.enquireContent}>
                <div className={styles.name}>작업내용</div>
                <textarea
                  type="text"
                  id="textarea"
                  placeholder="내용을 입력하세요"
                  name="content"
                  className={styles.contentInput}
                  required
                  onChange={textHandler}
                />
              </div>
              <div className={styles.name}>이미지 / 파일 첨부</div>
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
                    <label htmlFor={`file${v}`}>+</label>
                  </div>
                ))}
              </div>
              <div className={styles.board}>아래는 선택사항입니다.</div>
              <div className={styles.departure}>
                <div className={styles.name}>출발지</div>
                <input
                  type="text"
                  id="departure"
                  name="departAddress"
                  value={addressDepart.addr || ""}
                  disabled
                  placeholder="우측 아이콘을 눌러 주소를 검색해주세요"
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
                <div className={styles.name}>도착지</div>
                <input
                  type="text"
                  id="arrival"
                  name="arrivalAddress"
                  value={addressArr.addr || ""}
                  disabled
                  placeholder="우측 아이콘을 눌러 주소를 검색해주세요"
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
                    문의하기
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
