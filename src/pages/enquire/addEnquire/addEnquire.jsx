import React, { useEffect, useState } from "react";
import styles from "./addEnquire.module.css";
import { useEnquireContext } from "../../../components/context/EnquireContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faClose, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../components/context/AuthContext";
import { calDistance, kakaoPostcode } from "../../../service/address";
import EnquireProduct from "./enquireProduct";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { writeEnquire } from "../../../service/database";

export default function AddEnquire() {
  const { enquire, setEnquire } = useEnquireContext();
  const { kauser, fbuser } = useAuthContext();
  const [userEmail, setUserEmail] = useState("");
  const [addressDepart, setAddressDepart] = useState("");
  const [addressArr, setAddressArr] = useState("");
  const [distance, setDistance] = useState("");
  const [addProduct, setAddProduct] = useState([uuidv4()]);
  const [startDate, setStartDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [products, setProducts] = useState([]);
  const closeHandelre = () => {
    setEnquire(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (enquire === true && kauser === undefined && fbuser === null) {
      alert("로그인 후 이용해주세요");
      setEnquire(false);
      navigate("/login");
    }
    fbuser && setUserEmail(fbuser.email);
    kauser && setUserEmail(kauser.kakao_account.email);
    addressDepart &&
      addressArr &&
      calDistance(addressDepart.coords, addressArr.coords, setDistance);
  }, [
    fbuser,
    kauser,
    addressDepart,
    addressArr,
    navigate,
    enquire,
    setEnquire,
  ]);

  const departHandle = () => {
    kakaoPostcode(setAddressDepart);
  };
  const arrHandle = () => {
    kakaoPostcode(setAddressArr);
  };
  const addProductHandler = () => {
    setAddProduct((prev) => [...prev, uuidv4()]);
  };
  const textHandler = (e) => {
    const { id, value } = e.target;
    id === "title" && setTitle(value);
    id === "textarea" && setContent(value);
  };
  const uploadHandler = async (e) => {
    e.preventDefault();
    //문의하기 올리기
    const datepicker = document.getElementById("datepicker");
    const productInfo = document.querySelectorAll(".productInfo");
    const count = document.querySelectorAll(".count");
    const weight = document.querySelectorAll(".weight");
    const price = document.querySelectorAll(".price");
    const date = datepicker.value || "";
    const arrivalAddress = addressArr.addr || "";
    const departAddress = addressDepart.addr || "";
    const distanceTo = distance && distance.distance;
    const durationTo = distance && distance.duration;
    const datas = [];
    productInfo.forEach(
      (v) =>
        datas.push({
          productInfo: v.options[v.options.selectedIndex].innerHTML,
        })
      //console.log(v.options[v.options.selectedIndex].innerHTML)
    );
    count.forEach((v, i) => (datas[i].count = v.value));
    weight.forEach(
      (v, i) => (datas[i].weight = v.options[v.options.selectedIndex].innerHTML)
    );
    price.forEach((v, i) => (datas[i].price = v.value));

    setProducts(() => [
      {
        workdate: date,
        title,
        content,
        userEmail,
        departAddress,
        arrivalAddress,
        distanceTo,
        durationTo,
        datas,
        totalPrice,
      },
    ]);
  };
  useEffect(() => {
    if (enquire && products.length !== 0) {
      writeEnquire(products);
      setEnquire(false);
      navigate("/enquire");
    }
  }, [products, navigate, setEnquire, enquire]);
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
                <label htmlFor="datepicker" className={styles.awsomeIcon}>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </label>
              </div>
              <div className={styles.user}>
                <div className={styles.name}>의뢰인</div>
                <div className={styles.userEmail}>{userEmail}</div>
              </div>
              <div className={styles.title}>
                <div className={styles.name}>제목</div>
                <input
                  type="text"
                  id="title"
                  onChange={textHandler}
                  placeholder="제목을 입력하세요"
                  className={styles.titleInput}
                  required
                />
              </div>
              <div className={styles.enquireContent}>
                <div className={styles.name}>내용</div>
                <textarea
                  type="text"
                  id="textarea"
                  placeholder="내용을 입력하세요"
                  className={styles.contentInput}
                  required
                  onChange={textHandler}
                />
              </div>
              <div className={styles.board}>아래는 선택사항입니다.</div>
              <div className={styles.departure}>
                <div className={styles.name}>출발지</div>
                <input
                  type="text"
                  id="departure"
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
              <div className={styles.distance}>
                <div className={styles.name}>총 거리 / 이동시간</div>
                <input
                  type="text"
                  placeholder="출발지와 도착지를 먼저 입력하세요"
                  value={
                    distance && distance.distance + " / " + distance.duration
                  }
                  disabled
                />
              </div>
              <div className={styles.name}>제품 정보</div>
              {addProduct.map((id) => (
                <EnquireProduct
                  key={id}
                  setTotalPrice={setTotalPrice}
                  addProduct={addProduct}
                  setAddProduct={setAddProduct}
                  id={id}
                />
              ))}

              <div onClick={addProductHandler} className={styles.plus}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>

              <div className={styles.totalInfo}>
                예상비용
                <input type="text" disabled value={totalPrice + " + a"} />원
                입니다.
              </div>
              <div className={styles.summation}></div>
              <div className={styles.btnContainer}>
                <button type="submit" className={styles.uploadBtn}>
                  문의하기
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
