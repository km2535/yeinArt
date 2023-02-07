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

export default function EnquireDetail() {
  const { fbuser } = useAuthContext();
  const [isBtn, setIsBtn] = useState(false);
  const navigate = useNavigate();
  const {
    state: {
      Item: {
        ID,
        TITLE,
        WORK_DATE,
        WRITER,
        DESCRIPTION,
        DEPART_ADDRESS,
        ARRIVAL_ADDRESS,
        FILE_URLS,
        IMAGE_URLS,
      },
      Item,
    },
  } = useLocation();
  const [img, setImg] = useState([]);
  const [file, setfile] = useState([]);
  useEffect(() => {
    setImg(() => IMAGE_URLS?.split(","));
    setfile(() => FILE_URLS?.split(","));
  }, [IMAGE_URLS, FILE_URLS]);
  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsBtn(true);
      removeEnquireImg(Item);
      removeEnquireFile(Item);
      removeEnquireItem(Item).finally(() => setIsBtn(false));
      navigate(-1);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.name}>제목</div>
            <div className={styles.titleContent}>{TITLE}</div>
          </div>
          <div className={styles.date}>
            <div className={styles.name}>작업요청일</div>
            <div className={styles.workdateContent}>{WORK_DATE}</div>
          </div>
          <div className={styles.user}>
            <div className={styles.name}>의뢰인</div>
            <div className={styles.userEmail}>{WRITER}</div>
          </div>
          <div className={styles.enquireContent}>
            <div className={styles.name}>작업내용</div>
            <div className={styles.contContent}>{DESCRIPTION}</div>
          </div>
          <div className={styles.departure}>
            <div className={styles.name}>출발지</div>
            <div className={styles.arrAddrContent}>{DEPART_ADDRESS || ""}</div>
          </div>
          <div className={styles.arrival}>
            <div className={styles.name}>도착지</div>
            <div className={styles.depAddrContent}>{ARRIVAL_ADDRESS || ""}</div>
          </div>
          <div className={styles.name}>이미지 목록</div>
          <div className={styles.imgs}>
            {IMAGE_URLS &&
              img?.map((v) => (
                <div className={styles.imgFiles} key={uuidv4()}>
                  <a
                    href={`${process.env.REACT_APP_API_ENQUIRE}/images/${ID}/${v}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className={styles.img}
                      src={`${process.env.REACT_APP_API_ENQUIRE}/images/${ID}/${v}`}
                      alt=""
                    ></img>
                  </a>
                </div>
              ))}
          </div>
          <div className={styles.name}>파일 목록</div>
          <div className={styles.files}>
            <ul className={styles.file}>
              {FILE_URLS &&
                file?.map((v) => (
                  <li className={styles.fileList} key={uuidv4()}>
                    <a
                      href={`${process.env.REACT_APP_API_ENQUIRE}/images/${ID}/${v}`}
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
                  callback={() => navigate(`enquireEdit`, { state: { Item } })}
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
                  callback={() => navigate(-1)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <EnquireRep enquireId={ID} userName={WRITER} fbuser={fbuser} />
    </>
  );
}
