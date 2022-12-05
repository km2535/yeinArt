import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import EnquireBtn from "../../../components/common/btns/enquireBtn/enquireBtn";
import Loading from "../../../components/common/loading/loading";
import Pagination from "../../../components/common/pagination/pagination";
import Search from "../../../components/common/search/search";
import styles from "./enquireList.module.css";

export default function EnquireList() {
  const { totalData, kauser, fbuser, isLoading } = useOutletContext();
  const [pageData, setPageDate] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const firstData = totalData.slice(0, 10);
    setPageDate(firstData);
  }, [totalData]);
  //console.log(pageData);
  return (
    <>
      <div className={styles.container}>
        {isLoading && <Loading />}
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>작업요청일</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {pageData.map((v) => (
              <tr key={v.id}>
                <td
                  className={styles.title}
                  id={v.id}
                  onClick={() => {
                    navigate(`/enquire/${v.id}`, { state: v });
                  }}
                >
                  {v.value.title}
                </td>
                <td className={styles.userName}>
                  {v.value.userName &&
                    v.value.userName.replace(v.value.userName.charAt(1), "*")}
                </td>
                <td className={styles.date}>{v.value.date}</td>
                <td className={styles.workdate}>{v.value.workdate}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className={styles.tfoot}>
            <tr className={styles.search} style={{ height: "55px" }}>
              <td colSpan={5}>
                <Search totalData={totalData} setPageDate={setPageDate} />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className={styles.editBtn}>
              <td colSpan={5}>
                {(fbuser || kauser) && (
                  <>
                    <div className={styles.enquireBtn}>
                      <EnquireBtn />
                    </div>
                  </>
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
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
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
