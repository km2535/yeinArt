import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./enquireDetail.module.css";
import MoveControl from "../../../components/common/btns/addContents/addContents";
import { deleteEnquire, readData } from "../../../service/database";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import EmailLoading from "../../../components/common/emailLoading/emailLoading";
import { useEffect } from "react";
import EnquireRep from "../enquireRep/enquireRep";

export default function EnquireDetail() {
  const { setTotalData, setIsLoading, data, setData } = useOutletContext();
  const navigate = useNavigate();
  const [cont, setCont] = useState([]);
  const [isBtn, setIsBtn] = useState(false);
  const {
    state: {
      id,
      value: {
        title,
        workdate,
        userName,
        content,
        arrivalAddress,
        departAddress,
        fileUrls,
        imgUrls,
      },
    },
  } = useLocation();
  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsBtn(true);
      deleteEnquire(id).finally(() => {
        setTimeout(() => {
          setIsBtn(false);
          navigate("/enquire");
          readData("enquire", "allEnquire")
            .then((v) => setTotalData(v))
            .finally(() => setIsLoading(false));
        }, 1500);
      });
    }
  };
  useEffect(() => {
    setCont(content[0]?.split("<br/>"));
  }, [content]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.name}>제목</div>
            <div className={styles.titleContent}>{title}</div>
          </div>
          <div className={styles.date}>
            <div className={styles.name}>작업요청일</div>
            <div className={styles.workdateContent}>{workdate}</div>
          </div>
          <div className={styles.user}>
            <div className={styles.name}>의뢰인</div>
            <div className={styles.userEmail}>{userName}</div>
          </div>
          <div className={styles.enquireContent}>
            <div className={styles.name}>작업내용</div>
            <div className={styles.contContent}>
              {cont?.map((v, i) => (
                <div key={i}>{v}</div>
              ))}
            </div>
          </div>
          <div className={styles.departure}>
            <div className={styles.name}>출발지</div>
            <div className={styles.arrAddrContent}>{arrivalAddress}</div>
          </div>
          <div className={styles.arrival}>
            <div className={styles.name}>도착지</div>
            <div className={styles.depAddrContent}>{departAddress}</div>
          </div>
          <div className={styles.name}>이미지 목록</div>
          <div className={styles.imgs}>
            {imgUrls.map((v) => (
              <div className={styles.imgFiles} key={uuidv4()}>
                <a href={v.imgUrl} target="_blank" rel="noreferrer">
                  <img className={styles.img} src={v.imgUrl} alt=""></img>
                </a>
              </div>
            ))}
          </div>
          <div className={styles.name}>파일 목록</div>
          <div className={styles.files}>
            <ul className={styles.file}>
              {fileUrls?.map((v) => (
                <li className={styles.fileList} key={uuidv4()}>
                  <a
                    href={v?.fileUrl[1]}
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    {v?.fileUrl[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.deletBtn}>
            {isBtn ? (
              <EmailLoading />
            ) : (
              <MoveControl
                doNotMove={true}
                styleOption={[{ top: "0" }, { left: "80%" }]}
                buttonName={"삭제하기"}
                deleteHandler={deleteHandler}
              />
            )}
          </div>
        </div>
      </div>
      <EnquireRep
        data={data}
        setData={setData}
        enquireId={id}
        userName={userName}
      />
    </>
  );
}
