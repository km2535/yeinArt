import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import MoveControl from "../../../components/common/btns/addContents/addContents";
import history from "../../../components/common/history/history";
import { deleteData } from "../../../service/delete";
import styles from "./noticeDetail.module.css";

export default function NoticeDetail() {
  const navigate = useNavigate();
  const [fileTag, setFileTag] = useState(false);
  const [fileName, setfileName] = useState("");
  const [imgTag, setImgTag] = useState(false);
  const { fbuser } = useOutletContext();
  const preventClose = (e) => {
    e.preventDefault();
    //e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  };
  const {
    state: { id, value },
  } = useLocation();
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    history.push("/notice");
  }, []);
  useEffect(() => {
    value.urls.forEach((v) => {
      v.imgUrl && setImgTag(v.imgUrl);
      v.fileUrl && urlDecoding(v.fileUrl);
    });
    return history.listen((action) => {
      //console.log(action);
      if (history.action === "POP") {
        history.push("/notice");
      }
    });
  }, [value.urls]);
  const urlDecoding = (fileUrl) => {
    const url = decodeURI(fileUrl);
    const fileName = url.split("file%2F")[1].split("?alt")[0];
    setfileName(fileName);
    setFileTag(fileUrl);
  };

  // 조회수 상승 컨트롤러

  // 삭제 컨트롤러
  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteData(id);
      navigate("/", { replace: true });
    }
  };
  return (
    <>
      <div id={id} className={styles.container}>
        <div className={styles.title}>{value.title}</div>
        <div className={styles.subTitle}>
          <div className={styles.sub}>
            <div className={styles.subject}>번호</div>
            <div className={styles.subdata}>{value.num}</div>
          </div>
          <div className={styles.sub}>
            <div className={styles.subject}>작성일</div>
            <div className={styles.subdata}>{value.date}</div>
          </div>
          <div className={styles.sub}>
            <div className={styles.subject}>글쓴이</div>
            <div className={styles.subdata}>관리자</div>
          </div>
          <div className={styles.sub}>
            <div className={styles.subject}>조회수</div>
            <div className={styles.subdata}>{value.read}</div>
          </div>
        </div>
        <div className={styles.main}>
          {fileTag && (
            <div className={styles.file}>
              <div className={styles.fileTitle}>첨부파일 : </div>
              <div className={styles.fileLink}>
                <a href={fileTag} target={"_blank"} rel="noreferrer">
                  [{fileName}]
                </a>
              </div>
            </div>
          )}
          {imgTag && (
            <div className={styles.img}>
              <img src={imgTag} alt="img" />
            </div>
          )}
          <div className={styles.content}>{value.content}</div>
        </div>
      </div>
      {fbuser && fbuser.isAdmin && (
        <div style={{ height: "50px" }}>
          <MoveControl
            imgId={id}
            moveRoot={"noticeEdit"}
            styleOption={[{ top: "0" }, { left: "43%" }]}
            buttonName={"수정하기"}
          />
          <MoveControl
            doNotMove={true}
            galleryEdit={"/"}
            styleOption={[{ top: "0" }, { left: "48%" }]}
            buttonName={"삭제하기"}
            deleteHandler={deleteHandler}
          />
        </div>
      )}
    </>
  );
}
