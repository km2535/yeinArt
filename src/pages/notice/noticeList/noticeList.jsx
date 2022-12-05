import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import MoveControl from "../../../components/common/btns/addContents/addContents";
import MbEditBtn from "../../../components/common/btns/mbEditBtn/mbEditBtn";
import Loading from "../../../components/common/loading/loading";
import Pagination from "../../../components/common/pagination/pagination";
import styles from "./noticeList.module.css";
export default function NoticeList() {
  const { totalData, fbuser, isLoading } = useOutletContext();
  const [pageData, setPageDate] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const firstData = totalData.slice(0, 10);
    setPageDate(firstData);
  }, [totalData]);
  return (
    <>
      <div className={styles.container}>
        {isLoading && <Loading />}
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {pageData.map((v) => (
              <tr key={v.id}>
                <td className={styles.num}>{v.value.num}</td>
                <td
                  className={styles.title}
                  id={v.id}
                  onClick={() => {
                    navigate(`/notice/${v.id}`, { state: v });
                  }}
                >
                  {v.value.title}
                </td>
                <td className={styles.userName}>관리자</td>
                <td className={styles.date}>{v.value.date}</td>
                <td className={styles.read}>{v.value.read}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className={styles.tfoot}>
            <tr>
              <td colSpan={5}>
                <div className={styles.deskTopBtn}>
                  {fbuser && fbuser.isAdmin && (
                    <MoveControl
                      moveRoot={"addNotice"}
                      styleOption={[{ top: "0" }, { left: "45%" }]}
                      buttonName={"게시글 추가하기"}
                    />
                  )}
                </div>
                <div className={styles.mobileBtn}>
                  {fbuser && fbuser.isAdmin && (
                    <MbEditBtn
                      moveRoot={"addNotice"}
                      styleOption={[{ top: "0" }, { left: "45%" }]}
                    />
                  )}
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={5} style={{ border: "none" }}>
                <Pagination
                  totalData={totalData}
                  setPageDate={setPageDate}
                  showCnt={10}
                />
              </td>
              <td style={{ border: "none" }}></td>
              <td style={{ border: "none" }}></td>
              <td style={{ border: "none" }}></td>
              <td style={{ border: "none" }}></td>
              <td style={{ border: "none" }}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
