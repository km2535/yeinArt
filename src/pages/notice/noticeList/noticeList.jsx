import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import MoveControl from "../../../components/common/btns/addContents/addContents";
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
      {fbuser && fbuser.isAdmin && (
        <MoveControl
          moveRoot={"addNotice"}
          styleOption={[{ top: "-100px" }, { left: "85%" }]}
          buttonName={"게시글 추가하기"}
        />
      )}
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
                <td>{v.value.num}</td>
                <td
                  className={styles.title}
                  id={v.id}
                  onClick={() => {
                    navigate(`/notice/${v.id}`, { state: v });
                  }}
                >
                  {v.value.title}
                </td>
                <td>예인아트 관리자</td>
                <td>{v.value.date}</td>
                <td>{v.value.read}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className={styles.tfoot}>
            <tr>
              <td colSpan={5}>
                <Pagination
                  totalData={totalData}
                  setPageDate={setPageDate}
                  showCnt={10}
                />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
