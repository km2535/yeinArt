import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./enquireEdit.module.css";
import { v4 as uuidv4 } from "uuid";
import EmailLoading from "../../../components/common/emailLoading/emailLoading";
import Button from "../../../ui/Button";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import DatePicker from "react-datepicker";
import moment from "moment";
import { ko } from "date-fns/esm/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { kakaoPostcode } from "../../../service/address";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { updateEnquire } from "../../../service/enquire/updateEnquire";
import { removeEnquireFileOnce } from "../../../service/enquire/removeEnquireFileOnce";
import { removeEnquireImgOnce } from "../../../service/enquire/removeEnquireImgOnce";
import { uploadEnquireFile } from "../../../service/enquire/uploadEnquireFile";

export default function EnquireEdit() {
  const [isBtn, setIsBtn] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [enquireData, setEnquireData] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [previewFile, setPreviewFile] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [file, setFile] = useState([]);
  const navigate = useNavigate();
  const {
    state: {
      Item: { ID, TITLE, WRITER, DESCRIPTION, FILE_URLS, IMAGE_URLS },
      Item,
    },
  } = useLocation();

  useEffect(() => {
    setEnquireData(Item);
  }, [Item]);

  useEffect(() => {
    setEnquireData((service) => ({
      ...service,
      FILE_URLS: fileUrl,
      IMAGE_URLS: imgUrl,
    }));
  }, [fileUrl, imgUrl]);

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

  useEffect(() => {
    const urls = FILE_URLS ? FILE_URLS?.split(",") : null;
    urls?.map((name) =>
      setPreviewFile((prev) => [
        ...prev,
        {
          url: `${process.env.REACT_APP_API_ENQUIRE}/images/${ID}/${name}`,
          name: name,
          uuid: uuidv4(),
          lastModified: Math.ceil(Math.random() * 10000),
        },
      ])
    );
  }, [FILE_URLS, ID]);

  useEffect(() => {
    const urls = IMAGE_URLS ? IMAGE_URLS?.split(",") : null;
    urls?.map((name) =>
      setPreviewImg((prev) => [
        ...prev,
        {
          url: `${process.env.REACT_APP_API_ENQUIRE}/images/${ID}/${name}`,
          name: name,
          uuid: uuidv4(),
          lastModified: Math.ceil(Math.random() * 10000),
        },
      ])
    );
  }, [ID, IMAGE_URLS]);

  const removeFile = (e) => {
    const { id } = e.target;
    const fileName = e.target.previousElementSibling.innerHTML;
    setFile((prev) => [...prev].filter((v) => v.uuid !== id));
    setPreviewFile((prev) => [...prev].filter((v) => v.uuid !== id));
    updateEnquire(enquireData).then(() =>
      removeEnquireFileOnce({ id: ID, fileName: fileName })
    );
  };
  const removeImg = (e) => {
    const { id } = e.target;
    const fileName = e.target.parentElement.id;
    setFile((prev) => [...prev].filter((v) => v.uuid !== id));
    setPreviewImg((prev) => [...prev].filter((v) => v.uuid !== id));
    updateEnquire(enquireData).then(() =>
      removeEnquireImgOnce({ id: ID, fileName: fileName })
    );
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
    } else if (id === "DESCRIPTION") {
      setEnquireData((prev) => ({
        ...prev,
        [id]: value?.replaceAll("\n", "<br/>"),
      }));
    } else {
      setEnquireData((prev) => ({ ...prev, [id]: value }));
    }
  };
  const enquireSubmit = (e) => {
    e.preventDefault();
    setIsBtn(true);
    uploadEnquireFile(file, imgFiles, enquireData);
    updateEnquire(enquireData).then(() => setIsBtn(false));
    alert("게시글이 수정되었습니다.");
    navigate("/enquire");
  };
  return (
    <form onSubmit={enquireSubmit} id="formdata" className={styles.form}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.name}>제목</div>
            <div className={styles.titleContent}>
              <input
                type={"text"}
                id="TITLE"
                defaultValue={TITLE}
                className={styles.titleInput}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className={styles.date}>
            <div className={styles.name}>작업요청일</div>
            <div className={styles.workdateContent}>
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
            <div className={styles.userEmail}>{WRITER}</div>
          </div>
          <div className={styles.enquireContent}>
            <div className={styles.name}>작업내용</div>
            <div className={styles.contContent}>
              <textarea
                type={"text"}
                id="DESCRIPTION"
                defaultValue={DESCRIPTION}
                className={styles.titleInput}
                onChange={changeHandler}
              />
            </div>
          </div>
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
              name="ARRIVAL_ADDRESS"
              defaultValue={enquireData?.ARRIVAL_ADDRESS || ""}
              disabled
              placeholder="우측 아이콘을 눌러 주소를 검색해주세요"
              className={styles.addrInput}
              required
            />
            <label htmlFor="ARRIVAL_ADDRESS" className={styles.awsomeIcon}>
              <FontAwesomeIcon
                onClick={ArrTo}
                id="ARRIVAL_ADDRESS"
                className={styles.icon}
                icon={faMagnifyingGlassLocation}
              />
            </label>
          </div>
          <div className={styles.name}>
            이미지 목록{" "}
            <label className={styles.plusBtn} htmlFor="images">
              <FaPlusSquare />
            </label>
          </div>
          <div className={styles.imgs}>
            <input
              className={styles.inputFile}
              type={"file"}
              id="images"
              name="files[]"
              accept="image/*"
              multiple={"multiple"}
              onChange={changeHandler}
            />
            {IMAGE_URLS &&
              previewImg?.map((v) => (
                <div className={styles.imgFiles} key={uuidv4()}>
                  <div className={styles.imgContent}>
                    <img className={styles.img} src={v?.url} alt=""></img>
                  </div>
                  <div>
                    <AiOutlineCloseSquare
                      className={styles.removeIcon}
                      id={v.uuid}
                      onClick={removeImg}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.name}>
            파일 목록{" "}
            <label className={styles.plusBtn} htmlFor="files">
              <FaPlusSquare />
            </label>
          </div>
          <div className={styles.files}>
            <input
              className={styles.inputFile}
              type={"file"}
              id="files"
              accept=".pdf, .hwp, .show, .xlsx, .xlsm,.xlsb, .xls,  .doc, .hwpx, .ppt, .pptm, .pptx, .txt"
              name="files[]"
              multiple={"multiple"}
              onChange={changeHandler}
            />
            <ul className={styles.file}>
              {previewFile?.map((v) => (
                <div className={styles.fileList} key={uuidv4()}>
                  <div className={styles.files}>{v?.name}</div>
                  <AiOutlineCloseSquare
                    className={styles.removeIcon}
                    id={v.uuid}
                    onClick={removeFile}
                  />
                </div>
              ))}
            </ul>
          </div>
          <div>
            {isBtn ? (
              <EmailLoading />
            ) : (
              <div className={styles.deletBtn}>
                <Button title="수정하기" type={"submit"} sub={true} />
                <Button
                  title="뒤 로"
                  type={"button"}
                  sub={false}
                  callback={() => navigate(-1)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
