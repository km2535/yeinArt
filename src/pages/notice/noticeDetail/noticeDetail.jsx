import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import MoveControl from "../../../components/common/btns/addContents/addContents";
import history from "../../../components/common/history/history";
import { noticeRead, readData } from "../../../service/database";
import { deleteData } from "../../../service/delete";
import styles from "./noticeDetail.module.css";

export default function NoticeDetail() {
  const navigate = useNavigate();
  const [fileTag, setFileTag] = useState(false);
  const [fileName, setfileName] = useState("");
  const [imgTag, setImgTag] = useState(false);
  const { fbuser, setTotalData, setIsLoading } = useOutletContext();
  const preventClose = (e) => {
    e.preventDefault();
  };
  const {
    state: { id, value },
  } = useLocation();

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    history.push("/");
  }, []);

  useEffect(() => {
    value.urls.forEach((v) => {
      v.imgUrl && setImgTag(v.imgUrl);
      v.fileUrl && urlDecoding(v.fileUrl);
    });
    return history.listen(() => {
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

  useEffect(() => {
    noticeRead(id, Number(value.read) + 1).then(() => {
      window.sessionStorage.removeItem("allItems");
    });
  }, [id, value]);

  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsLoading(true);
      deleteData(id).then(() => {
        navigate("/notice");
        setTimeout(
          () =>
            readData("notice", "allItems")
              .then((v) => setTotalData(v))
              .finally(() => setIsLoading(false)),
          1000
        );
      });
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
            <div className={styles.subject}>글쓴이</div>
            <div className={styles.subdata}>관리자</div>
          </div>
          <div className={styles.sub}>
            <div className={styles.subject}>작성일</div>
            <div className={styles.subdata}>{value.date}</div>
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
              <img src={imgTag} className={styles.imgSrc} alt="img" />
            </div>
          )}
          <div className={styles.content}>{value.content}</div>
        </div>
      </div>
      <div style={{ height: "50px" }} className={styles.btn}>
        {fbuser && fbuser?.isAdmin && (
          <>
            <MoveControl
              imgId={id}
              value={value}
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
          </>
        )}
      </div>
    </>
  );
}
