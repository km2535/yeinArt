import React, { useEffect, useState } from "react";
import styles from "./addEnquire.module.css";
import { useEnquireContext } from "../../../components/context/EnquireContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../components/context/AuthContext";
import { kakaoPostcode } from "../../../service/address";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import crypto from "crypto-js";
import EmailLoading from "../../../components/common/emailLoading/emailLoading";
import { v4 as uuidv4 } from "uuid";
import { uploadEnquire } from "../../../service/enquire/uploadEnquire";
import { uploadEnquireFile } from "../../../service/enquire/uploadEnquireFile";
import { readEnquire } from "../../../service/enquire/readEnquire";
import { mailfromEnquire } from "../../../service/sendMail";

export default function AddEnquire() {
  const { enquire, setEnquire, setBoards } = useEnquireContext();
  const navigate = useNavigate();
  const { kauser, fbuser } = useAuthContext();
  const [enquireData, setEnquireData] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [file, setFile] = useState([]);
  const [previewFile, setPreviewFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [enquireId, setEnquireId] = useState("");
  const [isBtn, setIsBtn] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const ID = uuidv4();
    setEnquireId(ID);
    //작성자는 로그인 한 사용자가 되도록 한다.
    fbuser &&
      setEnquireData((prev) => ({ ...prev, WRITER: fbuser.displayName }));
    kauser &&
      setEnquireData((prev) => ({
        ...prev,
        WRITER: kauser.properties.nickname,
      }));
    setEnquireData((prev) => ({
      ...prev,
      ID: ID,
      WORK_DATE: moment(startDate).format("YYYY년MM월DD일"),
      DEPART_ADDRESS: "",
      ARRIVAL_ADDRESS: "",
    }));
  }, [fbuser, kauser, startDate, enquire]);

  useEffect(() => {
    setEnquireData((prev) => ({ ...prev, FILE_URLS: fileUrl }));
  }, [fileUrl]);

  useEffect(() => {
    setEnquireData((prev) => ({ ...prev, IMAGE_URLS: imgUrl }));
  }, [imgUrl]);

  useEffect(() => {
    setFileUrl([]);
    for (let i = 0; i < previewFile.length; i++) {
      setFileUrl((prev) => [...prev, `${previewFile[i]?.name}`]);
    }
  }, [previewFile, previewFile.length]);

  useEffect(() => {
    setImgUrl([]);
    for (let i = 0; i < previewImg.length; i++) {
      setImgUrl((prev) => [...prev, `${previewImg[i]?.name}`]);
    }
  }, [previewImg, previewImg.length]);

  const closeHandelre = () => {
    setEnquire(false);
  };

  const datePicker = (e) => {
    const date = moment(e).format("YYYY년MM월DD일");
    setEnquireData((prev) => ({ ...prev, WORK_DATE: date }));
    setStartDate(e);
  };
  const departTo = () => {
    kakaoPostcode("DEPART_ADDRESS", setEnquireData);
  };

  const ArrTo = () => {
    kakaoPostcode("ARRIVAL_ADDRESS", setEnquireData);
  };

  const removeFile = (e) => {
    const { id } = e.target;
    setFile((prev) => [...prev].filter((v) => v.uuid !== id));
    setPreviewFile((prev) => [...prev].filter((v) => v.uuid !== id));
  };

  const removeImg = (e) => {
    const { id } = e.target;
    setImgFiles((prev) => [...prev].filter((v) => v.uuid !== id));
    setPreviewImg((prev) => [...prev].filter((v) => v.uuid !== id));
  };

  const changeHandler = (e) => {
    const { id, value, files } = e.target;
    if (id === "files") {
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.includes("image")) {
          setFileUrl((prev) => [...prev, `${files[i]?.name}`]);
          const uuid = uuidv4();
          setPreviewFile((prev) => [
            ...prev,
            {
              url: URL.createObjectURL(files[i]),
              name: files[i].name,
              uuid: uuid,
              lastModified: files[i].lastModified,
            },
          ]);
          setFile((prev) => [...prev, files[i]]);
        }
      }
    } else if (id === "images") {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes("image")) {
          setImgUrl((prev) => [...prev, `${files[i]?.name}`]);
          const uuid = uuidv4();
          setPreviewImg((prev) => [
            ...prev,
            {
              url: URL.createObjectURL(files[i]),
              name: files[i].name,
              uuid: uuid,
              lastModified: files[i].lastModified,
            },
          ]);
          setImgFiles((prev) => [...prev, files[i]]);
        }
      }
    } else if (id === "PASSWORD") {
      setEnquireData((product) => ({
        ...product,
        [id]: crypto.AES.encrypt(value, enquireId).toString(),
      }));
    } else {
      setEnquireData((product) => ({ ...product, [id]: value }));
    }
  };
  const boardSubmit = (e) => {
    e.preventDefault();
    setIsBtn(true);
    uploadEnquireFile(file, imgFiles, enquireData);
    uploadEnquire(enquireData)
      .then(() => navigate("/enquire"))
      .finally(() => mailfromEnquire(enquireData));
    alert("문의 내용이 추가되었습니다.");
    readEnquire(0, 10, setBoards);
    setIsBtn(false);
    setEnquire(false);
  };
  return (
    <>
      {enquire && (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={boardSubmit}>
            <div className={styles.content}>
              <div className={styles.close}>
                <FontAwesomeIcon icon={faClose} onClick={closeHandelre} />
              </div>
              <div className={styles.date}>
                <div className={styles.name}>작업일</div>
                <div className={styles.datePicker}>
                  <DatePicker
                    id={"WORK_DATE"}
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    minDate={new Date()}
                    selected={startDate}
                    onChange={datePicker}
                  />
                </div>
                <div className={styles.awsomeIcon}>
                  <label htmlFor="WORK_DATE">
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
                    defaultValue={enquireData?.WRITER || ""}
                    placeholder="홍길동"
                    onChange={changeHandler}
                    id="WRITER"
                  />
                  님
                </div>
              </div>
              <div className={styles.password}>
                <div className={styles.passwordTitle}>비밀번호</div>
                <input
                  type="password"
                  onChange={changeHandler}
                  name="password"
                  id="PASSWORD"
                  className={styles.titleInput}
                  placeholder="게시글 비밀번호를 입력하세요"
                  required
                />
              </div>
              <div className={styles.title}>
                <div className={styles.name}>제목</div>
                <input
                  type="text"
                  id="TITLE"
                  onChange={changeHandler}
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
                  id="DESCRIPTION"
                  placeholder="내용을 입력하세요"
                  name="content"
                  className={styles.contentInput}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div>
                <div className={styles.downloadFile}>
                  <div className={styles.fileName}>
                    파일 추가하기
                    <div className={styles.description}>
                      우측의 아이콘을 클릭하세요
                    </div>
                  </div>
                  <input
                    className={styles.inputFile}
                    type={"file"}
                    id="files"
                    accept=".pdf, .hwp, .show, .xlsx, .xlsm,.xlsb, .xls,  .doc, .hwpx, .ppt, .pptm, .pptx, .txt"
                    name="files[]"
                    multiple={"multiple"}
                    onChange={changeHandler}
                  />
                  <div className={styles.uploadFileContainer}>
                    <div className={styles.fileList}>
                      {previewFile.map((v) => (
                        <div key={v.uuid} className={styles.fileContent}>
                          <div className={styles.files}>{v?.name}</div>
                          <AiOutlineCloseSquare
                            className={styles.removeIcon}
                            id={v.uuid}
                            onClick={removeFile}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <label className={styles.plusBtn} htmlFor="files">
                    <FaPlusSquare />
                  </label>
                </div>
              </div>
              <div>
                <div className={styles.downloadFile}>
                  <div className={styles.fileName}>
                    이미지 추가하기
                    <div className={styles.description}>
                      우측의 아이콘을 클릭하세요
                    </div>
                  </div>

                  <input
                    className={styles.inputFile}
                    type={"file"}
                    id="images"
                    name="files[]"
                    accept="image/*"
                    multiple={"multiple"}
                    onChange={changeHandler}
                  />
                  <div className={styles.uploadContainer}>
                    <div className={styles.imgList}>
                      {previewImg.map((v) => (
                        <div key={v.uuid} className={styles.imgContent}>
                          <div className={styles.imgs}>
                            <img src={v?.url} alt="" className={styles.img} />
                          </div>
                          <AiOutlineCloseSquare
                            className={styles.removeIcon}
                            id={v.uuid}
                            onClick={removeImg}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <label className={styles.plusBtn} htmlFor="images">
                    <FaPlusSquare />
                  </label>
                </div>
              </div>
              <div className={styles.board}>아래는 선택사항입니다.</div>
              <div className={styles.departure}>
                <div className={styles.name}>출발지</div>
                <input
                  type="text"
                  id="DEPART_ADDRESS"
                  name="DEPART_ADDRESS"
                  defaultValue={enquireData?.DEPART_ADDRESS || ""}
                  disabled
                  placeholder="우측 아이콘을 눌러 주소를 검색해주세요"
                  className={styles.addrInput}
                  required
                />
                <label htmlFor="DEPART_ADDRESS" className={styles.awsomeIcon}>
                  <FontAwesomeIcon
                    onClick={departTo}
                    id="DEPART_ADDRESS"
                    className={styles.icon}
                    icon={faMagnifyingGlassLocation}
                  />
                </label>
              </div>
              <div className={styles.arrival}>
                <div className={styles.name}>도착지</div>
                <input
                  type="text"
                  id="ARRIVAL_ADDRESS"
                  name="arrivalAddress"
                  defaultValue={enquireData?.ARRIVAL_ADDRESS || ""}
                  disabled
                  placeholder="우측 아이콘을 눌러 주소를 검색해주세요"
                  className={styles.addrInput}
                  required
                />

                <label htmlFor="ARRIVAL_ADDRESS" className={styles.awsomeIcon}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    id="ARRIVAL_ADDRESS"
                    onClick={ArrTo}
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
