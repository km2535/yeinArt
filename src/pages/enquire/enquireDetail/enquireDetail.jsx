import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./enquireDetail.module.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import EmailLoading from "../../../components/common/emailLoading/emailLoading";
import { useEffect } from "react";
import EnquireRep from "../enquireRep/enquireRep";
import { removeEnquireItem } from "../../../service/enquire/removeEnquireItem";
import { removeEnquireImg } from "../../../service/enquire/removeEnquireImg";
import { removeEnquireFile } from "../../../service/enquire/removeEnquireFile";
import Button from "../../../ui/Button";
import { useAuthContext } from "../../../components/context/AuthContext";
import { updateEnquireReadCnt } from "../../../service/enquire/updateEnquireReadCnt";
import { readEnquireDetail } from "../../../service/enquire/readEnquireDetail";

export default function EnquireDetail() {
  const { fbuser } = useAuthContext();
  const [isBtn, setIsBtn] = useState(false);
  const navigate = useNavigate();
  const {
    state: { enquireId },
  } = useLocation();
  const [img, setImg] = useState([]);
  const [file, setfile] = useState([]);
  const [enquire, setEnquire] = useState([]);
  const [enquireItem, setEnquireItem] = useState([]);

  useEffect(() => {
    setEnquireItem(enquire?.pop());
  }, [enquire]);

  useEffect(() => {
    readEnquireDetail({ enquireId, setEnquire });
    enquireItem?.READ_CNT >= 0 &&
      updateEnquireReadCnt({
        enquireId,
        READ_CNT: Number(enquireItem?.READ_CNT) + 1,
      });
  }, [enquireId, enquireItem?.READ_CNT]);

  useEffect(() => {
    setImg(() => enquireItem?.IMAGE_URLS?.split(","));
    setfile(() => enquireItem?.FILE_URLS?.split(","));
  }, [enquireItem?.IMAGE_URLS, enquireItem?.FILE_URLS]);

  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsBtn(true);
      removeEnquireImg(enquireItem);
      removeEnquireFile(enquireItem);
      removeEnquireItem(enquireItem).finally(() => setIsBtn(false));
      navigate(-1);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.name}>제목</div>
            <div className={styles.titleContent}>{enquireItem?.TITLE}</div>
          </div>
          <div className={styles.date}>
            <div className={styles.name}>작업요청일</div>
            <div className={styles.workdateContent}>
              {enquireItem?.WORK_DATE}
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.name}>의뢰인</div>
            <div className={styles.userEmail}>{enquireItem?.WRITER}</div>
          </div>
          <div className={styles.enquireContent}>
            <div className={styles.name}>작업내용</div>
            <div className={styles.contContent}>{enquireItem?.DESCRIPTION}</div>
          </div>
          <div className={styles.departure}>
            <div className={styles.name}>출발지</div>
            <div className={styles.arrAddrContent}>
              {enquireItem?.DEPART_ADDRESS || ""}
            </div>
          </div>
          <div className={styles.arrival}>
            <div className={styles.name}>도착지</div>
            <div className={styles.depAddrContent}>
              {enquireItem?.ARRIVAL_ADDRESS || ""}
            </div>
          </div>
          <div className={styles.name}>이미지 목록</div>
          <div className={styles.imgs}>
            {enquireItem?.IMAGE_URLS &&
              img?.map((v) => (
                <div className={styles.imgFiles} key={uuidv4()}>
                  <a
                    href={`${process.env.REACT_APP_API_ENQUIRE}/images/${enquireId}/${v}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className={styles.img}
                      src={`${process.env.REACT_APP_API_ENQUIRE}/images/${enquireId}/${v}`}
                      alt=""
                    ></img>
                  </a>
                </div>
              ))}
          </div>
          <div className={styles.name}>파일 목록</div>
          <div className={styles.files}>
            <ul className={styles.file}>
              {enquireItem?.FILE_URLS &&
                file?.map((v) => (
                  <li className={styles.fileList} key={uuidv4()}>
                    <a
                      href={`${process.env.REACT_APP_API_ENQUIRE}/images/${enquireId}/${v}`}
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      {v}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            {isBtn ? (
              <EmailLoading />
            ) : (
              <div className={styles.deletBtn}>
                <Button
                  title="수정하기"
                  type={"button"}
                  sub={true}
                  callback={() =>
                    navigate(`enquireEdit`, { state: { enquireItem } })
                  }
                />
                <Button
                  sub={true}
                  title="삭제하기"
                  type={"button"}
                  callback={deleteHandler}
                />
                <Button
                  title="목 록"
                  type={"button"}
                  sub={false}
                  callback={() => navigate("/enquire")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <EnquireRep
        enquireId={enquireId}
        userName={enquireItem?.WRITER}
        fbuser={fbuser}
      />
    </>
  );
}
